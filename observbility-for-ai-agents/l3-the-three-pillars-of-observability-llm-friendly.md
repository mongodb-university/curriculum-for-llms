---
title: The Three Pillars of Observability
lesson_number: 3
skill: observability-for-ai-agents
kind: video_script
word_count: 1168
date_updated: 2026-05-28
learning_objectives:
  - Define logs, metrics, and traces in the context of agentic systems.
  - Explain what question each pillar answers and where its blind spots are.
  - Describe how the three pillars work together to support debugging and decision auditing.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/observability-for-ai-agents
  lesson: https://learn.mongodb.com/learn/course/observability-for-ai-agents/observability-for-ai-agents/the-three-pillars-of-observability
---

1. We know that agents can fail silently, and that small issues in early steps can quietly cascade into bad outcomes. We know we need per-step visibility, but visibility into what, exactly?

2. In this video, we'll look at the three pillars of observability: logs, metrics, and traces. Together, they give you a complete picture of a running system. Think of the three pillars as complementary lenses, each revealing something the others can't.

3. Logs tell you what happened and when, at a very granular level. They're your detailed event history. Metrics tell you how your system is behaving over time—rates, errors, and durations, aggregated into time series. Traces connect the dots for a single request, so you can follow its full journey end-to-end.

4. Each pillar has blind spots. Logs are detailed but can't easily show trends. Metrics show trends but not individual stories. Traces show the full story of one request, but not whether that result indicates a pattern, happening at scale. For agentic systems, you need all three: metrics to surface anomalies, traces to investigate them, and logs to understand exactly what happened at each step.

5. Logs are timestamped records of discrete events: something happened, at a specific time, with specific inputs and outputs. In traditional services, you log HTTP requests, database queries, and exceptions. For agents, your logging scope needs to be broader.

6. You want to log every tool invocation: which tool was called, what inputs it received, and what response it returned. You also want to log every call to the model: the prompt or context, key metadata like model version, and a summary of the output. Every error or exception at every step of the workflow should be captured, along with contextual metadata like session ID, user ID, and agent version.

7. In many environments, these logs also form your access audit trail: who initiated a request, which tools ran on their behalf, and whether any guardrails triggered.

8. One important design choice is using structured logs, typically JSON, instead of free-form text. Structured logs are indexable and queryable by field. You can filter by session ID, tool name, error type, or model version with a simple query. Remember: logs help you answer the question: "What exactly happened, in what order, with what inputs and outputs?" Having structured logs helps you answer these questions much more easily.

9. Metrics are numerical values aggregated over time and stored as time series. They describe how your system is trending. Where logs capture individual events, metrics capture aggregate state: how many requests, how many errors, how long things take.

10. Two useful frameworks here are the USE method, for resources, and the RED method, for services.

11. USE stands for Utilization, Saturation, and Errors. For any resource—CPU, memory, disk—you want to know how much is used, how close it is to its limit, and how often it fails.

12. RED stands for Rate, Errors, and Duration. Rate is how many requests per second a service handles. Think agent requests per second, tool invocations per minute, LLM API calls per second. Errors are how many of those requests fail: tool failures, LLM API errors, retrieval failures. And Duration is how long they take: end-to-end response times, per-tool latency, LLM inference time.

13. Agents also introduce new metrics traditional services don't have: token consumption per request, cost, number of tool calls per request, and context window utilization.

14. Token usage in particular is powerful: unusual spikes can signal runaway reasoning loops, prompt injections, or quota abuse Cost per interaction is another critical one, tying observability directly to your costs. See our skill on Governance to learn more about setting thresholds and ensuring you stay within your budget.

15. The question metrics answer is: "Is the system healthy, is it trending in the right direction, and how does today compare to yesterday?"

16. While logs capture individual events and metrics capture aggregate behavior, traces do something neither can: they reconstruct the complete causal chain of a single request end-to-end. A trace is built from spans. Each span represents a single named operation: "retrieve documents", "LLM API call", "generate response".

17. Every span has a start time, duration, status, and metadata like tool name, model version, token count, or HTTP status code.

18. Spans are organized into a parent-child tree linked by trace IDs and span IDs that propagate across service boundaries.

19. For an agent workflow, you might have a root span for the entire user request, with child spans for each step: intent classification, tool selection, tool calls, result processing, and final response generation.

20. Each child span can have its own children. For example, a tool call that itself makes database queries or downstream API calls.

21. Without a trace, it is difficult to map the journey from the input to the final output. It requires correlating logs across systems, so everything in the middle is opaque. A "black box". With a trace, you can pinpoint exactly which span introduced a latency spike, which step produced an error, or where the agent's reasoning went off course.

22. Traces also play a critical role in high-stakes or regulated environments as both a decision auditing and troubleshooting mechanism. They can show which tools were called, what data was retrieved, and what the context looked like at each step, so you can explain why the agent did what it did. That's not just helpful for debugging incidents; it's often necessary to meet compliance requirements and to build user trust in AI-driven decisions.

23. Traces tell us what happened for a specific request: where did it slow down, where did it fail, and why did the agent make the decisions it did?

24. The three pillars are most powerful when you use them together. Let's walk through a quick example.

25. It's 2:47 AM, and your metrics dashboard suddenly shows an error-rate spike for your agent. The metric tells you there's a problem and can potentially help you pinpoint when it started, but not why. You pivot to traces for that time window and filter for failed requests. One trace stands out: a tool call span that normally takes 200 milliseconds is now taking 4 seconds and returning errors.

26. Now you know where in the workflow the failure is happening and how it's affecting the overall request. To understand exactly what went wrong, you get the span ID and look up the corresponding log records. In the logs, you see a rate-limit error from the upstream API, followed by three failed retries.

27. In just a few minutes, you've gone from "something's wrong" to "the upstream API hit its rate limit at 2:47 AM, retries exhausted, requests failed." Metrics surfaced the anomaly. Traces showed you where in the workflow it occurred. Logs told you exactly what happened and why.

28. Let's refresh what we've covered in this video: Logs, metrics, and traces are the three pillars of observability, and each one is irreplaceable. Logs tell you what happened at specific moments with specific inputs. Metrics tell you how the system behaves over time. Traces connect the full causal chain of an individual request.

29. For agentic systems, where failures are frequently silent, execution is non-deterministic, and workflows are multi-step, having all three is the foundation your observability stack is built on.

30. Good job! In the next video, we'll turn from signals to architecture, and look at how these signals are collected, stored, and surfaced in an observability control plane. I'll see you there!
