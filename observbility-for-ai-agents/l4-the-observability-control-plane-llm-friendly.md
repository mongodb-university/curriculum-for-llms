---
title: The Observability Control Plane
lesson_number: 4
skill: observability-for-ai-agents
kind: video_script
word_count: 1335
date_updated: 2026-06-01
learning_objectives:
  - Explain the distinction between the agent application, agent framework, and runtime, and why it matters for observability.
  - Describe the four layers of the observability control plane and the role each one plays.
  - Identify common architecture options for assembling an observability stack and the tradeoffs of each.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/observability-for-ai-agents
  lesson: https://learn.mongodb.com/learn/course/observability-for-ai-agents/observability-for-ai-agents/the-observability-control-plane
---

1. We now know what we need to observe: logs, metrics, and traces. Each answers a different question, and together they give us a fine grained picture of the system. But knowing which signals you need and actually having them available when something goes wrong are two very different things.

2. In this video, we'll look at the architecture that sits between your running agent and the dashboards and alerts your team uses to keep it healthy: the observability control plane. Underneath a wide variety of tools, most production stacks follow the same four-layer structure, and understanding those layers is how you make sense of any stack you inherit or build.

3. Before we walk through the layers, we need to distinguish between the agent application, the framework, and the runtime.

4. The agent application is the specific autonomous system you built. It's the thing that receives requests, reasons about them, calls tools, and produces responses. The agent framework is the library or SDK you used to structure that application. Frameworks like LangGraph, Mastra, or an Agent Development Kit manage state, tools, and multi-step workflows. The runtime is the infrastructure that deploys, runs, and scales your agents in production: scheduling, resource management, and failure handling.

5. For observability, this matters because all three emit different kinds of signals: the application about what it decided and why, the framework about how those decisions were executed, and the runtime about the infrastructure they ran on. All three contribute to the full picture, and knowing where a given signal comes from helps you interpret it correctly during an incident.

6. Now that we've clarified where signals come from, we can map the observability control plane itself. Most production stacks can be divided into four layers: Application, Instrumentation and Collection, Storage and Processing, and Analysis, Visualization, and Alerting.

7. Layer 1 is the application itself and everything it directly interacts with: LLM APIs, tools, and databases. This is where your application actually runs, and where telemetry signals are generated before they are collected or processed by additional observability infrastructure.

8. Your agent is already making API calls, receiving responses, invoking tools, and handling results; every one of those interactions is a potential signal you can capture.

9. This layer is also where the most sensitive activity happens: tokens are consumed, tools are called on behalf of users, and sensitive data like queries and retrieved documents enter the system.

10. That makes the Application Layer the place where access control, data governance, and observability intersect most directly.

11. One practice that pays off everywhere else is consistent tagging: every event, span, and metric from this layer should carry core identifiers like user ID, session ID, and request ID. Those tags let you correlate a log entry with a trace span or attribute token cost to a specific user or tenant; if tagging is inconsistent here, every downstream layer inherits that inconsistency.

12. Layer 2, Instrumentation and Collection, is the pipeline between your running agent and the backends that store and analyze its signals. It receives telemetry from Layer 1, processes it by filtering, enriching, and batching, and exports it to one or more destinations.

13. Architecturally, this is the most important layer for long-term flexibility, because it decouples your application code from any particular backend. If your application is wired directly to a specific storage or analysis tool, swapping that backend later means editing your agent code.

14. With a proper collection layer, your agent emits telemetry in a standard format, and the collection layer handles routing it to whatever backends you choose, now or in the future.

15. This is why vendor-neutral instrumentation standards are so popular and have become the default in most cases: they define a common format and API for telemetry that any compliant backend can consume. Layer 2 also plays a critical security role: before telemetry leaves your application boundary, this is where you enforce consistent metadata and redact sensitive fields from user queries or tool responses.

16. Layer 3, Storage and Processing, is where your telemetry lands and lives. It comprises the storage systems that make logs, metrics, and traces queryable and useful. Because these signal types have fundamentally different shapes, they're stored in fundamentally different ways.

17. Metrics are a good fit for time-series storage optimized for timestamped numerical values, high write throughput, and aggregations over time windows. Logs are typically placed into full-text search storage where you can search large volumes of text quickly, match patterns, and filter by structured fields—JSON logs are strongly preferred for field-based indexing. Traces go into distributed trace storage indexed by trace ID, service name, latency, and error status, so you can reconstruct full request chains and quickly surface slow or failing traces.

18. Each of these storage types is a specialized system with its own scaling and operational demands, which is one reason observability stacks carry real operational weight.

19. Layer 4, Analysis, Visualization, and Alerting, is where your team actually interacts with the observability stack. It's the interface between stored telemetry and the people keeping the system healthy.

20. Visualization is the most visible part: real-time dashboards surface the metrics that matter most, like agent health, tool success rates, latency, token consumption, and cost per interaction. A well-designed dashboard lets an on-call engineer understand system state at a glance, without having to write queries.

21. Alerting is how the stack reaches out to you instead of waiting for you to check it, using simple thresholds, SLO-based alerts, and anomaly detection.

22. Threshold alerts fire when a metric crosses a fixed limit; SLO alerts fire when reliability targets are at risk over time; anomaly detection flags behavior that's unusual even if it hasn't crossed a hard threshold. All of these should route to on-call channels with enough context about what fired and why.

23. The most valuable capability at this layer is signal correlation—the ability to move from a spike on a dashboard directly to the relevant traces, and from a trace span directly to its log records.

24. Correlating your signals to discover the entire story works much more smoothly if metrics, traces, and logs are all navigable in a single interface. If metrics are in one tool, traces in another, and logs in a third, you spend valuable time switching tabs and manually matching IDs instead of fixing the problem.

25. A unified analysis layer compresses time-to-resolution dramatically and can turn a two-hour incident into a five-minute one.

26. Once you understand the four layers, the next question is how to assemble them into a real stack. There are four broad approaches, each with real tradeoffs: self-managed platforms, commercially managed platforms, cloud-native services, and purpose-built agent platforms.

27. Self-management gives you full control and no vendor lock-in: you choose every component and own the configuration. The cost is operational complexity: you're responsible for upgrades, capacity planning, high availability, and incidents for the observability stack itself, which requires dedicated expertise.

28. Commercially managed platforms offer an integrated experience with managed infrastructure and pre-connected layers, but at production scale they can become expensive and you're tied to the vendor's pricing and roadmap.

29. Cloud-native managed services from major cloud providers have low operational overhead and integrate naturally with workloads in that cloud, but cross-environment observability, across multiple clouds or on-prem, is more of a challenge.

30. Purpose-built agent platforms are designed specifically for agentic systems, treating tool invocations, reasoning steps, and multi-turn workflows as first-class concepts instead of custom attributes.

31. There's no universal right choice; the best choice for you depends on your team's operational capacity, your scale, your compliance requirements, and how much of the agent-specific complexity you want the platform to understand natively.

32. Okay, let's recap what we've learned!

33. The observability control plane has four layers: Application, Instrumentation & Collection, Storage & Processing, and Analysis, Visualization & Alerting. Each layer has a distinct role, and the decisions you make at each one: what to tag, how to route, where to store, which interface to use, shape how useful your observability stack is when you actually need it.

34. Excellent work! Next, we'll explore distributed tracing in depth, and see how traces let you reconstruct exactly what happened inside a complex, multi-step agent request. See you in the next video!
