---
title: Auditability and Incident Response
lesson_number: 4
skill: governance-for-ai-agents
kind: video_script
word_count: 1065
date_updated: 2026-09-02
learning_objectives:
  - Describe the evidence required for accountable agent behavior
  - Explain how to capture and structure audit artifacts across the agent lifecycle
  - Explain governance responsibilities when an agent fails mid-task, including ownership of rollback and cleanup
  - Define the governance process for detecting, containing, and remediating a policy violation
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/governance-for-ai-agents
  lesson: https://learn.mongodb.com/learn/course/governance-for-ai-agents/governance-for-ai-agents/auditability-and-incident-response
---

1. It’s 2 AM, and Branch, our 24/7 AI support agent, has issued a $10,000 refund. Action gating defined in LeafyBank’s governance policy should have prevented this from happening, but they did not properly define or enforce it, so now they must respond to the incident. Now the question is: how will the team detect what happened, contain the impact, and analyze the incident so the team can decide what to do next?

2. In this video, we’ll follow the incident through detection, containment, analysis, and remediation. In our example, LeafyBank’s response starts with detection.

3. The team might detect the incident through an alert for an unusually large refund, when a support representative notices the transaction, or when a customer contacts support. But detection only identifies a signal. To explain what happened, the team needs evidence.

4. Auditability provides the evidence needed to move through each stage of incident response. It helps answer four essential questions: What did the agent access? What did it do? Why was the action allowed? And which identity performed the action: a person, a service account, or the agent, acting on a user’s behalf? Knowing only that a refund occurred tells LeafyBank what happened. Knowing which policy, identity, approval, and evidence allowed it tells LeafyBank whether the system worked as designed.

5. Audit logs and traces are the main tools for incident response. Think of audit evidence as a flight recorder. It does not prevent a problem in the air, but it captures enough detail for investigators to reconstruct the sequence: the route, the instruments, the warnings, and the decisions. Without that record, the investigation becomes guesswork.

6. In LeafyBank’s case, that record needs to capture the agent’s work as it happens: agent-specific logs and traces showing the sequence, agent identity and delegated authority, model and prompt versions, retrieved-context references, policy evaluations, tool calls and their inputs and outputs, approvals, memory activity, and outcomes.

7. Agentic platforms should extend established audit capabilities, such as Database Auditing, so these records can be centralized and correlated with agent traces.

8. Existing database audit records may show agent access as ordinary human or programmatic activity, so they should not be treated as a complete agent trace. Capture the evidence behind each action, not just the final response.

9. With that record in place, the team can correlate the evidence and reconstruct how the incident unfolded. In Branch’s case, the evidence shows that the agent retrieved a support document, called the refund tool, and sent a confirmation email. The trace shows that a prompt-injection string in the retrieved support document influenced Branch’s decision. Because LeafyBank had not established an enforceable action gate, the $10,000 refund proceeded.

10. Those records give LeafyBank the evidence they need to effectively investigate a control failure. The team preserves that evidence and moves to containment.

11. Agent decisions may not be perfectly reproducible. The same prompt can produce a completely different path on another run. As a result, rather than proving the same outcome would occur from the same prompt every time, the evidence needs to prove that the relevant inputs, decisions, policies, and actions were captured accurately the first time.

12. Agentic observability is complex and continues to evolve, but its fundamentals remain: capture enough context to connect inputs, decisions, policies, actions, identities, and outcomes. That evidence remains useful even when an agent’s exact path cannot be replayed.

13. Once the incident is detected, the next stage is containment. Containment should limit further impact while the team preserves evidence and investigates. It doesn’t always mean shutting the agent down completely. It could mean pausing high-value refunds, disabling a tool, narrowing the agent’s permissions, or routing every request to a human. The right action depends on the scope and severity of the incident, but the decision should align with your incident playbook.

14. Containment also has to address tasks that were already in progress. Agents can also fail halfway through a task. Suppose an agent updates a subscription but times out before receiving confirmation. The update may have failed or succeeded, and a multi-step task may have left the account partially changed.

15. Containment requires a safe recovery path for partial changes. If the action is idempotent, the system can retry it safely when it uses a defined idempotency key or equivalent design. Before retrying, the team should reconcile the current state. If the effect cannot be undone, the recovery plan should define a compensating action.

16. LeafyBank should decide in advance whether the agent team, platform team, or a defined on-call process owns rollback and cleanup. A support specialist may need to correct the account manually, notify the customer, and document what automation could not safely repair.

17. Finally, we have stage 3: Analyze and remediate. The evidence now supports root-cause analysis. Once the incident is contained, the team uses the evidence to determine why the control failed and what needs to change. The logs show what the agent accessed. The policy record shows why the refund was allowed. The tool record shows the exact amount and the account. The trace shows the injected instruction.

18. Those artifacts help identify whether the root cause was a policy gap, an access error, a parsing defect, or an adversarial input. The actions you’ll take to remediate are informed by this evidence, and your incident playbook.

19. The incident is not finished when the refund is reversed. LeafyBank needs a post-incident review. Tighten the refund policy, correct the retrieval boundary, update the prompt-injection defense, review the agent’s permissions, and add the failure to regression tests. A good incident ends with a change to the system, not only a ticket marked resolved.

20. Auditability and incident response are therefore the accountability half of governance. Evidence and response let the team answer for the failure when it still happens. Without that evidence, LeafyBank is not managing an incident. It is guessing at one.

21. Awesome job. Let’s take a moment to recap what we learned. Auditability provides the evidence that makes incident response possible. First, detect the signal and preserve that evidence. Second, contain the impact by pausing risky actions, narrowing permissions, or routing work to a person. Finally, analyze and remediate: identify the root cause, fix the control that failed, and improve the system so the incident is less likely to happen again.

22. Up next, we’ll look at continuous governance. Change is inevitable: the model will be updated, permissions will evolve, and the policies that fit today may not fit tomorrow, so it's vital that we think of governance as an ongoing process. I’ll see you there.
