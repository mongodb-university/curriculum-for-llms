---
title: Governance Architecture and Policy Enforcement
lesson_number: 3
skill: governance-for-ai-agents
kind: video_script
word_count: 1170
date_updated: 2026-09-02
learning_objectives:
  - Explain where governance controls live in the system and who owns them
  - Select the appropriate core runtime governance control (action gating, rate and budget limits, data handling rules, memory policy, or human escalation) for a given agent risk
  - Describe how MongoDB Atlas can support governed agent architectures through database access controls, encryption, auditing and logging, retrieval scoping, and environment separation
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/governance-for-ai-agents
  lesson: https://learn.mongodb.com/learn/course/governance-for-ai-agents/governance-for-ai-agents/governance-architecture-and-policy-enforcement
---

1. LeafyBank has decided that its AI agent, Branch, may autonomously issue refunds under $25. Larger refunds require approval from a support specialist. That policy is useful only when a control evaluates the request before Branch calls the refund tool. A sentence in a policy document cannot enforce a tool call by itself.

2. In this video, we’ll examine where those controls live and how they work together. Here we'll discuss why you need to establish controls for access, permitted actions, approvals, data handling, budge guardrails, and memory storage. We’ll also discuss how to plan for rollbacks and take corrective action, when necessary.

3. A typical architecture distributes governance controls across several layers. The application expresses business intent, while the data platform provides controls around identity, data access, storage, and evidence.

4. In our example case, LeafyBank’s AI agent, Branch, issued a refund. Let’s trace the path of that action. The application layer is where the application decides whether the request follows business policy. The platform layer limits the data available to the agent and records relevant database activity. Both layers work together, in tandem. Neither should be treated as a substitute for the other.

5. Each layer becomes enforceable through **specific controls**. Let's start with **access controls** which define and enforce an agent's permissions. For example, an **allowlist** defines the types of actions an agent may take, while a **denylist** blocks action types it must never take. Together, they establish the agent’s action boundary. For our AI agent, Branch, the allowlist might include looking up an order, checking subscription status, issuing a refund, sending a confirmation, and escalating to a human. The denylist could block actions such as deleting an account or changing a stored payment method. But some allowed actions are still too risky to run without a second check.

6. That second check is **action gating**. An allowlist says what the agent may do, and action gating checks whether this request satisfies additional policy conditions, such as the amount, time, account state, or approval status.

7. Let’s say a customer requests a refund for $300. A $300 refund exceeds LeafyBank’s $25 threshold, so the agent pauses and routes the request to an assigned support specialist for review. The approval must route to a real owner, not an unattended queue.

8. **Approval controls** decide whether a sensitive action may proceed. When a gate requires review, the approval control pauses execution, routes the request, records the decision, and releases or rejects the action.

9. Other controls limit what the agent can receive, use, and produce. Input, output, and context constraints reduce unnecessary data exposure. Rate limits control how often the agent can act, while action caps limit operations in a request or time window. These limits help to contain retries and tool failures.

10. Limiting actions is only part of the boundary. **Data handling controls** govern which data the agent can access, where it is processed and stored, how long it is retained, and where it may be sent.

11. In our example, LeafyBank must also meet residency and sovereignty requirements. That means the deployment and processing path must satisfy those requirements. A correct answer can still violate policy if the underlying data was processed in the wrong place.

12. Each model call and tool invocation consumes resources. If the agent sends a full knowledge base article, twenty messages of history, and a raw tool payload on every turn, cost rises and relevant facts become harder to find. Branch should receive the relevant, authorized context, not every bit of context available.

13. **Budget guardrails** turn resource concerns into enforceable limits. They can cap tokens or spend per request or session, alert when usage crosses a threshold, and limit expensive tool calls. Note that while a budget limit constrains runaway cost and can protect context, it does not replace an action gate or rate limit.

14. Budget controls manage each request, but governance also needs to cover what persists between requests.

15. **Memory** is information an agent keeps so it can use it later. That continuity can help the agent, but storing too much or keeping it for too long can create privacy, cost, and decision-quality risks, so we need a policy for agent memory.

16. In our example, LeafyBank must decide what their AI agent Branch may store, how long it may retain it, who may retrieve it, and how stale or incorrect information is removed. Memory retrieved for a new request must also respect that request’s authorization.

17. Even with these controls, actions can fail or be retried. Safe action design, such as **rollbacks or compensating actions**, limits the damage.

18. For instance: refunds should be idempotent, retrying the same request identifier should not create two refunds. Not every action can be reversed: a refund may be reversible, but an email cannot be unsent. When rollback is impossible, LeafyBank needs a predefined compensating action, such as a correction message, credit, or a follow-up from a person.

19. MongoDB enables you to establish these controls and more, through database permissions, encryption, auditing and logging, retrieval scoping, and environment separation. Role Based Access Control can limit the access privileges available to an AI agent’s database identity. Application authorization and query filters can constrain the actions an agent can take, by defining which records or search results the agent retrieves. Database auditing, MongoDB logs, and Atlas activity records can provide evidence of database and platform activity when the agent uses an attributable identity.

20. Of course, application logs still need to capture policy decisions, approvals, tool calls, and outcomes.

21. Encryption can protect sensitive fields, while a secrets manager keeps credentials out of prompts, code, and logs. Separate projects, credentials, and network controls can reduce the risk of a test agent reaching production. These controls provide enforceable boundaries and evidence. The application still defines the business policy.

22. These controls work together to form an enforcement chain. In our example, LeafyBank has an application allowlist which permits a refund, the action gate checks the amount, and an approval owner reviews the $300 request. The agent’s identity receives only the database privileges it needs. Authorization-aware retrieval limits the customer data in context. Encryption and secrets management protect sensitive data and credentials. Idempotency protects against retries, budget and rate limits contain loops, and application and database evidence records the path.

23. Okay, let's recap what we've learned: Control points help you define what your agent can access, how it can act, and help you capture the data you need for ongoing monitoring. Governance is typically distributed across layers. Action boundaries describe what an agent may do, and action gates check whether a permitted action meets additional conditions.

24. MongoDB can support data governance through access controls, encryption, auditing and logging, retrieval design, and environment separation. Business rules typically belong to the Application team, foundational access and evidence to the Platform or Data team, and approvals to Support operations. Each control point needs an enforcement point and an accountable owner.

25. In the next video, we’ll examine what happens when a governed system still fails: what evidence exists, who responds, and how LeafyBank contains and repairs the incident. I’ll see you there!
