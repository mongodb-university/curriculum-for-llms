---
title: The Unique Challenges of Observability for Agents
lesson_number: 2
skill: observability-for-ai-agents
kind: video_script
word_count: 1021
date_updated: 2026-05-27
learning_objectives:
  - Describe the four major failure categories for agents.
  - Explain why these failures are often silent and hard to detect.
  - Understand how errors compound across multi-step agent workflows.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/observability-for-ai-agents
  lesson: https://learn.mongodb.com/learn/course/observability-for-ai-agents/observability-for-ai-agents/the-unique-challenges-of-observability-for-agents
---

1. In the introduction to this skill badge, we used an example of something in the agent's workflow going wrong 4% of the time Here's the question: when your agent gives incorrect output, where did the failure actually come from?

2. Was it the model's reasoning? A tool call? The data you retrieved? Or the infrastructure underneath it all? Or a combination of them?

3. In this video, we'll look closely at each of those failure categories, why they're not always straightforward to spot, and how they quietly compound across multi-step workflows.

4. The first failure category is agent reasoning failure. This is where the model simply thinks its way to the wrong place. It might misinterpret the user's intent, follow a flawed chain of reasoning, or hallucinate details that aren't grounded in any real data.

5. In models with explicit reasoning capabilities, the model may generate a multi-step plan to address the query, but that plan itself could be flawed or incomplete. In some cases, warnings may even surface indicating that the reasoning didn't fully complete, although this doesn't always occur. There may not be an error code or exception at all, the agent could just produce a confident, but wrong output.

6. The second category from our list is tool failures. Agents get their power from tools, but every tool call is another chance for things to go wrong. An API might time out, return stale records, or send back a response that technically parses but doesn't match what the agent needed. The agent typically continues anyway, treating that response as truth.

7. The third failure category is context and data failure. This failure could come from poor context or data within a prompt or by a user. It could also come from a retrieval process. Retrieval-augmented agents depend heavily on what they pull from search or vector stores. If retrieval returns low-relevance documents, if the input is ambiguous, or if the conversation state has drifted, the agent is reasoning from bad inputs. Again, no error gets raised. The agent just works with whatever context it was given.

8. The fourth failure category is infrastructure failure. Latency spikes, slow disks, rate limits, and resource contention all degrade what the agent can do.

9. One of the most common silent failures in AI applications concerns the context window: when a long conversation or complex workflow pushes content beyond the model's context window's fixed length, the model silently loses access to earlier information. Maybe retrieval times out and proceeds with less context than it needs, maybe it falls back to a simpler query. Maybe a tool call hits a rate limit and returns partial data. From the agent's perspective, a response arrived. From the user's perspective, the final output is wrong.

10. All four of these failure modes: reasoning, tools, context, and infrastructure, can ultimately present the same outcome: incorrect output. The core reason these failures can be easy to overlook comes down to one word: silence.

11. Deterministic software tends to fail loudly. A service throws an exception, a database returns an error code, a network call times out with a clear stack trace. Those signals flow through your monitoring stack and trigger alerts. You know something broke, and you usually know where.

12. Because of the non-deterministic nature of the LLMs at their core, Agents often behave differently. When the model reasons incorrectly, no exception is thrown. When a tool returns contextually wrong data, the agent may stop the process, or it may accept it and move on. When retrieval brings back low-relevance documents, they may still become part of the context. Since it's a black box, you have no view into what's happening in between.

13. The output that reaches the user looks perfectly normal: well-structured, grammatical, and confidently stated. The only real signal is that the output is wrong. And your infrastructure metrics don't know the difference between right and wrong.

14. This is what we mean by silent failure: everything in your monitoring stack says "healthy", while users quietly get bad answers. Silent failures would be bad enough on their own, but agent workflows are rarely a single step. They're multi-step chains. An error early in the workflow doesn't just affect that one step—it shapes every step that comes after it.

15. Here's a concrete example. Your agent receives a user query and, as the first step, runs a search. That search returns documents with low relevance. Not an outright failure, just "good enough" from the system's perspective. Then the agent uses those documents to decide which tool to call, and it picks the wrong tool because its context is just "good enough". Later steps process and summarize the results of that wrong tool call, and eventually the agent generates a final answer based on the entire flawed chain.

16. At no point did anything throw an exception. Every component reported success. From the outside, all you see is the final wrong output. Internally, a small quality issue at step one quietly cascaded through the entire workflow.

17. To make this more concrete, imagine a ten-step workflow where each step has a 95% chance of doing the right thing. That might sound okay in isolation, but when you multiply those probabilities across the whole chain, the chance of everything going right drops to around 60%. In other words, roughly four out of ten end-to-end requests will have at least one step go wrong, even though every component looks healthy on its own.

18. This is why per-step observability is not a nice-to-have for agents, it's a hard requirement. You need visibility into what happened at each step of a request: which tools were called, what data was retrieved, and what the model's context looked like. Without that, you can't pinpoint where the chain broke, or which category of failure you're actually dealing with.

19. Let's recap: agentic systems fail in ways that traditional monitoring was never built to catch. They commonly fail silently, and those failures compound across multi-step workflows.

20. The four major failure categories we have covered: reasoning, tools, context and data, and infrastructure, all collapse into the same external symptom: inaccurate output. Without per-step observability, you're left guessing about root causes and blindly trying fixes.

21. Great work! Next we'll take a look at the three pillars of meaningful observability: logs, metrics, and traces. See you in the next video!
