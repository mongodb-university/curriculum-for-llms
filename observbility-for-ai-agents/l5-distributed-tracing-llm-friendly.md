---
title: Distributed Tracing
lesson_number: 5
skill: observability-for-ai-agents
kind: video_script
word_count: 1584
date_updated: 2026-05-29
learning_objectives:
  - Explain the core components of a distributed trace and how they fit together.
  - Walk through an end-to-end trace to identify bottlenecks and failure points.
  - Describe how traces enable silent error detection, decision auditing, and agent-aware sampling.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/observability-for-ai-agents
  lesson: https://learn.mongodb.com/learn/course/observability-for-ai-agents/observability-for-ai-agents/distributed-tracing
---

1. When your agent gives an incorrect output or performs poorly, how do you know what the agent actually did? Which steps were run? Which tools were called? Where did things go wrong?

2. Traces connect a request's full journey from end to end. They show you the causal chain, not just isolated snapshots. We've discussed how a trace can help you to pinpoint a failing span that metrics alone could only hint at.

3. In this video, we're going to explore the trace itself, in the context of agentic AI workflows. We'll look at the components that make up a trace, walk through a real end-to-end example, and explore what traces can do that logs and metrics alone can't.

4. A distributed trace is built from a small set of components, each with a specific role. The trace itself is the top-level container. It represents one complete end-to-end request: everything that happened from the moment a query arrived to the moment a response was returned.

5. Every span that belongs to that request shares the same trace ID, which is what lets you reconstruct the full picture later.

6. A span is a single named operation within that trace. Here we start with the user request, then "Classify intent", "Select the relevant tool", which results in "Calling the flight search API", and finally, a "response is generated".

7. Each span records a start time, a duration, a reference to its parent span, and a status such as OK or error. Spans are organized into a parent-child tree, giving you a hierarchical view of how one operation triggered others.

8. Span attributes are structured key-value metadata attached to a span. Attributes turn a span from a simple timing record into a meaningful piece of evidence.

9. For an LLM call, attributes might include model name, input tokens, output tokens, and total cost. For a tool call, attributes might include tool name, input parameters, HTTP status, and retry count.

10. Span events are timestamped records attached to a span, similar to log entries, scoped to a single operation. They capture discrete moments within a span's lifetime that you want to see separately from its overall attributes.

11. Span links are references to causally related spans that sit outside the normal parent-child hierarchy. They're especially useful for asynchronous workflows, multi-turn conversations, and agent-to-agent calls, where one agent invokes a sub-agent and that downstream work needs to be connected back to the originating trace.

12. Finally, trace context is the mechanism that makes all of this work across service boundaries. The trace ID and current span ID travel with every outbound call—headers, message metadata, or function arguments—so downstream services can attach their spans to the same trace. Without trace context propagation, each service only sees its own piece. With it, you can reconstruct the full chain.

13. Let's walk through a full trace.

14. The user's query is: "Find the cheapest flight to Tokyo next month." The total request takes 3,287 milliseconds. The root span is the User Request, the full 3.3 seconds from query received to response delivered. Every other span is a child of this root.

15. The first child span is for Intent Classification at 80 milliseconds. It's an LLM call that interprets the query and decides what the agent needs to do. Next is Tool Selection at 12 milliseconds, where the agent decides which tool or agent to call based on the classified intent.

16. Then comes the span that tells the real story: an agent-to-call to the Travel Search Agent at 2,340 milliseconds. That single span accounts for 71% of the total request time. Attached to that span is a downstream trace, as the receiving agent creates its own request, and that downstream trace, in turn, has spans of its own. The downstream agent hit a rate limit and retried three times before finally getting a response. Every one of those retries is captured as a span event within the child trace.

17. Back in the primary trace, there's Result Processing, sorting and processing the results returned by the sub-agent, at 235 milliseconds. Finally, Response Generation, another LLM call that formats the final answer for the user, takes 620 milliseconds.

18. Now consider what you can learn from this trace that logs and metrics alone can't give you. A common instinct when an agentic workflow performs poorly is to assume that the LLM is at fault. The trace tells a more precise story: Your latency metric told you the request took 3.3 seconds. The trace tells you that 71% of that time was spent on one agent-to-agent call, slowed down by rate limiting and retries. It also shows that your own agent's LLM calls were fast. That means your model isn't the bottleneck, it's the other agent.

19. The bottleneck is an external dependency, and you see it only because the trace captured it span by span with events attached. Without the trace, you'd likely be optimizing the wrong part of the system.

20. The flight search example showed a performance problem: slow response because of rate limiting. Now let's look at something harder: a wrong answer with no error anywhere in the trace.

21. The user asks a question. The agent completes all its steps. No span has an error status. The response arrives with normal latency and structure, but the answer is wrong.

22. Without a trace, you have no easy path to follow to the root cause. You know the output was bad, but not where in the workflow it went wrong. But with a trace, you can inspect span attributes at each step.

23. As an example, let's say we have an agent that uses Retrieval Augmented Generation to access internal company documentation in order to answer questions about company policy, and help employees request time off and perform other actions. A user inquires about the PTO policy, and the information retrieved in has a similarity score attribute of 0.41, well below your quality threshold of 0.70. The documents retrieved were low-confidence matches. They weren't bad enough to raise an error, but they weren't relevant enough to support accurate reasoning.

24. The agent incorporated that context into every downstream step: tool selection, result interpretation, and response generation. By the time the final output is generated, the wrong answer was the inevitable outcome of a chain that started drifting almost immediately.

25. This is what silent error detection looks like in practice. The failure was visible only because span attributes captured a quality signal. Logs didn't; latency metrics didn't. A trace without meaningful attributes is just timing data. A trace with well-chosen attributes is a powerful investigative tool.

26. Performance debugging and silent error detection are reactive uses of traces: you look at them after something goes wrong.

27. But traces also serve a deliberate, ongoing function in high-stakes or regulated environments: decision auditing. Not in a debugging sense, but in an accountability sense. What documents did it retrieve? What tools did it call? What system prompt or instructions was it operating under when it generated that response?

28. A trace answers all of those questions by telling the entire story of a request. Each trace contains many spans, and each span carries attributes documenting what the agent accessed at that step: document identifiers and source metadata, tool output summaries, and instruction context.

29. Span links let you connect spans across multiple turns of a conversation, so a multi-step interaction can be reconstructed as a single auditable chain, even when it spans multiple traces. These traces can be exported and retained as compliance evidence.

30. In regulated industries, being able to produce a complete record of what an AI system did and why is not optional, it's a requirement. Traces also intersect with access control. They document not just what the agent said, but what it accessed: which data sources, which tools, and which users' information.

31. For organizations that need to enforce data access policies at the agent level and prove after the fact that those policies were respected, traces are the evidentiary foundation. Because agent traces are often significantly deeper and more complex than traditional application traces, observability systems must use intelligent sampling strategies. Let's take a closer look.

32. Head-based sampling samples traces probabilistically, making retention decisions before the outcome of the request is known. That can result in a significant loss of high-value traces, when agent traces are this information-dense. Tail-based sampling is better suited to agent traces because it decides which traces to sample after the trace completes. Traditional tail-based triggers keep traces with errors or high latency. For agents, you also want triggers based on agent-specific signals: low retrieval confidence, excessive tool retries, or anomalous token usage.

33. For example, consider a trace where infrastructure looks normal but retrieval confidence is, say, 0.31. That's a high-value trace.

34. This connects back to security as well. Anomalous token usage is a sampling trigger worth keeping for the same reason it's a security signal: it may indicate prompt injection or unauthorized access, and the trace records exactly what happened.

35. Let's recap what we've learned: Distributed tracing gives you something logs and metrics cannot: the complete causal chain of a single request, with evidence for what happened at every step. Traces are useful for more than just debugging: they provide a record of what your agent did, what it accessed, and why. Head-based sampling works well for traditional high-volume systems, where retaining a fixed percentage of traces is often sufficient. Tail-based sampling, by contrast, makes retention decisions after the trace completes, ensuring the traces most likely to contain valuable signals are the ones that are retained. This makes them well-suited to agentic AI systems.

36. Great work! Now you know how distributed tracing works, and how it helps you build accountability and insight into your agentic AI system. Next, we'll look at the real-world challenges of running observability at scale, and survey the tools and standards the industry is building to meet those challenges. See you in the next video!
