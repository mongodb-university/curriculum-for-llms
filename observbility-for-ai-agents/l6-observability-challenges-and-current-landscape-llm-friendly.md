---
title: Observability Challenges and Current Landscape
lesson_number: 6
skill: observability-for-ai-agents
kind: video_script
word_count: 1396
date_updated: 2026-06-11
learning_objectives:
  - Describe the major challenges of running an observability stack for agents, including data volume, instrumentation complexity, and alert calibration.
  - Identify agent-specific signal costs such as token usage and quality evaluation.
  - Describe the emerging standards and what an ideal agent observability platform would provide.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/observability-for-ai-agents
  lesson: https://learn.mongodb.com/learn/course/observability-for-ai-agents/observability-for-ai-agents/observability-challenges-and-current-landscape
---

1. By now, you understand just how important it is to configure and maintain your observability stack. But what unique challenges does that require you to overcome, and what does the current tooling landscape provide to help you do that? In this video, we'll look at the major challenges teams face when running observability at scale, survey the current tooling landscape, and identify what a genuinely capable agent observability platform needs to provide.

2. Let's start with the challenges you'll face when running observability at scale. Building and maintaining a mature system means managing a distributed observability stack under high signal volume, investing ongoing engineering effort to keep logs, metrics, and traces correlated end to end, calibrating alerts - potentially for both human operators and evaluation agents - and continuously tracking security and governance risks.

3. One major challenge is managing sheer data volume. Every step of an agent's workflow generates telemetry: logs, trace spans, and metric updates. A single request can involve intent classification, tool selection, one or more tool calls, result processing, and response generation—each producing its own signals. Multiply that across hundreds of concurrent users—plus agent-to-agent requests that may never involve a human at all—and data accumulates quickly, reaching the terabyte range at production scale.

4. Storage is only part of the cost. Volume also drives infrastructure complexity for the observability stack itself: every component needs capacity planning, high-availability configuration, upgrades, and backup and recovery. Your observability stack is a distributed system in its own right, and it needs its own monitoring too.

5. Another challenge is engineering time. Keeping instrumentation aligned with a changing agent architecture is a continuous process, not a one-time project. The agent framework, databases, each LLM integration, every tool - all need to emit signals consistently, with shared IDs and timestamps.

6. The key enabler here is trace context propagation: the trace ID and span ID must travel with every outbound call so downstream services can attach their spans to the same trace. If any component doesn't propagate context correctly, that branch of the trace is severed, and you lose the causal connection between steps.

7. Agent architectures rarely remain static. You add a new tool, swap out retrieval, or upgrade the framework, each change is a potential break in your instrumentation chain. Like so many aspects of observability, instrumentation isn't something you finish; it's something you maintain alongside the rest of your codebase.

8. Storing every trace at production volume is usually not realistic, so teams sample. As we discussed previously, for complex agentic systems, tail-based sampling is generally the best option: it decides which traces to keep after they complete, so you can prioritize those with errors, low retrieval confidence, or anomalous token usage.

9. A related challenge is signal correlation. To truly get a complete picture, metrics, traces, and logs must share consistent IDs, timestamps, and metadata. When any signal is missing those shared identifiers, correlation breaks. And in many stacks, each tool has its own query language, adding friction during incidents.

10. The next challenge is alert calibration. Set alerts too sensitive and you generate noise—pages for conditions that self-resolve. Alert fatigue follows: teams start muting alerts or raising thresholds, and eventually miss real incidents. Set alerts too loosely and real problems go unnoticed until a user reports them, which is the exact scenario observability is meant to prevent.

11. The calibration problem is harder for agents. Standard threshold alerts catch binary failures: error rate above X, latency above Y. They're not designed to detect gradual quality degradation. An agent whose output quality declines over days, or whose retrieval relevance drifts over a week, won't trigger a typical infrastructure alert.

12. Agent-aware alerting is the answer: alerts that fire on evaluation score degradation, rising guardrail hit rates, or dropping retrieval confidence. These require custom logic that most observability stacks don't provide out of the box, making them yet another ongoing item on the operational burden list.

13. One emerging approach to easing this burden is the agentic feedback loop: rather than always routing alerts to a human operator, the observability signals themselves feed into another agent that can take automated corrective action—adjusting thresholds, throttling requests, or flagging anomalies for review. It's observability closing the loop back into the system it's watching.

14. Agents also introduce signals with no equivalent in traditional systems. Token usage is the clearest example: you'd expect your platform to track it natively, but most don't. Token consumption data comes from each LLM provider's billing API, requiring custom integration work. If you use multiple providers, that's multiple integrations to build and maintain.

15. Quality signals are similarly expensive. Knowing whether a request completed is easy; knowing whether the output was actually good requires evaluation. Evaluation comes in the form of either human review pipelines that don't scale, or automated LLM-as-judge models scoring outputs for accuracy, relevance, and task completion. Both have cost implications, and the automated approach has its own reliability concerns: your evaluator model can be wrong too.

16. Token consumption also does double duty as a security and governance signal. Anomalous usage like a single request consuming 10x the usual tokens can indicate a prompt injection attempt, a runaway reasoning loop, or unauthorized access. Getting that signal requires the same custom integration work.

17. Now that you have a solid understanding of what a mature observability system requires, let's look at where the tooling landscape stands, and how the industry is working to meet the needs of agentic AI systems.

18. The foundational tooling for classic observability is mature and proven at scale: log storage, time-series metrics, distributed tracing backends, dashboards, and alerting platforms.

19. OpenTelemetry has emerged as the industry standard for vendor-neutral instrumentation. Alongside the classic stack, agent-native platforms have emerged, built specifically for agents, with first-class support for tool invocations, reasoning steps, and multi-turn workflows.

20. The challenge isn't the individual tools, it's assembling them into a coherent production stack. Each has its own data model and query language. Running them at scale is expensive, and because they're separate systems, they're siloed by default, which is exactly the fragmentation that makes incident response harder than it needs to be.

21. Even with capable tools, important gaps remain. The first is agent-native context: in a standard OpenTelemetry span, "reasoning step" and "tool invocation" aren't first-class concepts. Teams encode them as custom attributes, meaning every team reinvents the same conventions. The second is quality signals: traditional observability asks whether things worked; agent observability needs to ask how well they worked.

22. The third gap is cost visibility. Token tracking requires integrating each provider's billing API. Platforms like MongoDB Atlas are beginning to close this gap natively. The fourth is a unified experience: the metrics-to-traces-to-logs workflow is still a multi-tool investigation for most teams. And fifth: no agent-aware alerting out of the box. Detecting quality degradation and behavioral drift requires custom logic most teams have to write themselves.

23. The industry is actively working to address these gaps through open standards. OpenTelemetry established vendor-neutral instrumentation portability, but its data model doesn't natively understand LLM spans, tool invocations, or retrieval events. OpenInference addresses that directly: it defines semantic conventions for agent observability on top of OpenTelemetry, giving shared meaning to tool invocations, LLM spans, retrieval events, reasoning steps, token counts, and more. The goal is the same one that made OpenTelemetry valuable: instrument once, send anywhere.

24. Given these gaps and where the field is heading, what would a genuinely capable agent observability platform look like? It would be unified. Logs, metrics, and traces in one interface with automatic signal correlation. It would also be agent-native, with tool invocations, reasoning steps, and multi-turn workflows as first-class concepts. It would surface cost and quality signals natively, auto-instrument common frameworks and LLM APIs, support decision auditing by default, and be built on open standards so teams can swap backends without rewriting instrumentation.

25. Let's recap what we've learned: Agent observability is not an unsolved problem in concept. The three pillars are well understood, the control plane is established, and the standards are maturing. The real challenge is the complexity of doing it well: assembling a coherent stack, instrumenting every component, tuning sampling, calibrating alerts, and building quality signals on top of infrastructure not originally designed for them. It's a capability you build and maintain, not a project you finish.

26. Great job! You're now ready to pass your skill check and earn your Observability in Agentic AI Systems skill badge! I hope I'll see you in another skill down the road!
