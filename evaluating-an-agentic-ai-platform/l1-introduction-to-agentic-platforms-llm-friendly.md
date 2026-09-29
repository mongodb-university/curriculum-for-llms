---
title: Introduction to Agentic Platforms
lesson_number: 1
skill: evaluating-an-agentic-ai-platform
kind: video_script
word_count: 1384
date_updated: 2026-08-19
learning_objectives:
  - Differentiate individual agent frameworks from agentic platforms using the "Golden Rule."
  - Explain why robust infrastructure, rather than the underlying AI model alone, bridges the "demo-to-production gap."
  - Describe the 6 components of an agentic harness (Runtime / Execution Layer, Orchestration / Workflow Control, State and Memory, Data and Retrieval Layer, Lifecycle Management, Observability and Evals, Cost Controls) and how they relate to a platform.
  - Analyze how Governance, Data Architecture, and Deployment Architecture shape runtime environments.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/evaluating-an-agentic-platform
  lesson: https://learn.mongodb.com/learn/course/evaluating-an-agentic-platform/evaluating-an-agentic-platform/introduction-to-agentic-platforms
---

1. Welcome! Imagine you've built an AI agent for your financial operations that works beautifully in development. Whether it's automating invoice processing or handling corporate transfers, everybody's excited, and the demo looks flawless. But then someone asks the million-dollar question: *"How are we actually going to run this safely in production?"* That exact moment is where most AI projects hit a brick wall. Because here's the reality: the difference between a cool prototype and a reliable production system isn't the AI model itself. It's the infrastructure built around it.

2. In this video, we'll break down the difference between agent frameworks and agentic platforms by introducing the **"Golden Rule."** We'll map out the three critical dimensions: governance, data, and deployment, that define a platform's architectural boundaries, then we'll finish by walking through the six core components every production system needs. Let's get started.

3. To set the stage, the single most important concept you'll take away today is the **Golden Rule: Build agents with frameworks; operate agents with platforms.**

4. Let's unpack what that actually means. A **framework** like LangGraph or CrewAI is essentially a development toolkit. These libraries supply the foundational architecture needed to build, orchestrate, and execute autonomous agents, giving developers the inner cognitive loops for perception, context, planning, and action. Frameworks are fantastic for building one thing really well.

5. A **platform**, on the other hand, is the infrastructure needed to run *many* agents reliably over time across multiple teams. Platforms handle durable execution, identity management, governance, cost tracking, and observability. Sitting inside that platform is the agentic harness. They work together, but operate at completely different scopes. The harness is the runtime for an individual agent. It executes the agent loop, coordinates tool calls, manages execution state, and connects framework logic to external systems. When we scale, the platform becomes the shared operating environment running many harnesses across many teams.

6. To frame how an agentic platform operates, let's look at three primary dimensions that define our platform's architectural boundaries:

7. The first is Governance, or what agents are allowed to do. Because agents should never operate with unlimited power, the platform enforces built-in least-privilege access, robust identity management, strict tool-use controls, and end-to-end auditability. A mature governance layer must be explicit, centralized, and completely transparent.

8. The second is Data Architecture, or what agents actually know. The platform provides durable persistence, on-demand search capabilities, and an Operational Data Layer that connects directly into our existing systems of record, like our core financial ledgers. This prevents data fragmentation without forcing costly, time-consuming migrations.

9. And finally we have the **Deployment Architecture,** or where and how agents run. Meeting strict compliance, latency, and data residency requirements often demands run-anywhere flexibility across cloud, on-prem, or hybrid environments. This keeps agents physically closer to the data they rely on, while maintaining model neutrality and minimizing vendor lock-in.

10. Ultimately, a platform isn't just a collection of scattered features. It's the unifying container that keeps Governance, Data, and Deployment in dynamic equilibrium.

11. So, what happens when teams skip the platform layer entirely?

12. If three separate teams use three different frameworks and each hand-roll their own custom harnesses, we end up with what we call a **"sprawl threat."** Over time, this uncoordinated, framework-only development creates an unmanageable and highly vulnerable operational surface. We're left with incompatible audit trails, broken cost tracking, and a massive security nightmare.

13. Many organizations get into this mess because they get stuck on their AI maturity journey.

14. This journey usually starts with Prompt Wrappers. These are thin, stateless application layers built on top of an LLM, framework, and database. They work great for a quick demo, but since they completely lack governance and constantly lose context they fall apart the moment we introduce real business logic.

15. As teams realize those limitations, they advance to **Stage 2** of their journey: **Stateful Orchestration.** Here, teams build sophisticated harnesses complete with state persistence and local memory. But there's a catch: operational requirements like security policies, logging, and cost tracking are hand-rolled independently by every single team. This creates massive technical debt, which is why most enterprise engineering teams stall right here.

16. The goal of the AI maturity journey is **Stage 3: A Governed Fleet.** At this stage, a centralized platform natively handles durable execution, cost controls, and audit trails. Developers simply deploy their agents directly to the platform and inherit all of those enterprise capabilities automatically.

17. Bridging this **demo-to-production gap** proves that success depends far more on the agentic platform's surrounding infrastructure than on the underlying model alone.

18. Whether we're building in-house or evaluating an external vendor, every agentic platform requires six core building blocks to succeed, bringing our three dimensions into operational reality.

19. First, anchoring our Data Dimension, we need **State and Persistence.** While the harness creates checkpoints and resumes execution, the agentic platform provides durable storage and crash recovery services. We need to ask ourselves: if a long-running agent hits a network timeout, can it seamlessly resume from step three, or does it crash, restart, and lose everything?

20. Completing the data dimension, the platform must turn enterprise data into useful, secure, and searchable context for agents. This is the **Memory layer.** As the harness retrieves context during execution, strict access control is essential to prevent sensitive information from becoming a security risk, while clear structure ensures agents can find relevant context without being overwhelmed by noise. Access must be role-aware, and stored context must be easy to query.

21. That requirement for role-aware access brings us directly to **Security and Governance**, the first block in our Governance dimension, where platform capabilities constrain and manage many harnesses. Here, the platform must clearly identify the user behind every sensitive action and record what they did. This is precisely where most enterprise projects stall. Every high-risk action, like executing a wire transfer or modifying a ledger, must be logged and explicitly tied to a specific user identity. It should never simply be tied to a generic "agent" account.

22. Next in governance, the platform must show not only where an agent responded, but also how and why it reached a decision. This is the **Observability layer.** While the harness emits execution traces, the platform aggregates them across the technology stack so teams understand whether a decision was correct and why the agent made that specific choice.

23. To round out governance, the platform must provide a reliable way of testing whether an agent is ready for production. This is the **evaluation layer or evals.** While individual harnesses emit evaluation signals, the platform applies fleet-wide quality gates using automated test suites that measure accuracy, safety, and reliability to determine if an agent is truly ready for production. As of early 2026, there is still no single, widely accepted industry framework for agent evaluation.

24. And finally, powering our deployment dimension, our platform must control how agents use external tools and services. This is the orchestration layer: it decides which calls to make and routes them to the right systems. Protocols such as MCP provide connectivity, but the platform still needs to enforce limits on how often tools can be used and control which tools each agent can access.

25. Here's the challenge: most engineering teams can build two or three of these components on their own. But a true platform provides all six components as an integrated infrastructure. On top of these capabilities, the platform must also control and track costs across the agent fleet. It needs guardrails for overall budgets and clear visibility into how each agent spends.

26. Great job! In this video, we established the **Golden Rule**: build agents with frameworks, but operate them with platforms. We then mapped out the **AI Maturity Scale**, showing why so many organizations stall at Stage 2 and need a true platform to reach a fully governed fleet. After that, we explored how **Governance, Data Architecture, and Deployment Architecture** define a platform's full capability. And finally, we broke down the **demo-to-production gap** and defined the **six core building blocks** needed to bridge it.

27. For that financial operations agent we mentioned at the beginning of this video, this means automated invoices and wire transfers finally get the safety, auditing, and state persistence they need for production.

28. At the end of the day, remember this: infrastructure, not the AI model, is often the decisive factor in your production success.
