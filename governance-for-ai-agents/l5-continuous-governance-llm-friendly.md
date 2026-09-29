---
title: Continuous Governance
lesson_number: 5
skill: governance-for-ai-agents
kind: video_script
word_count: 1311
date_updated: 2026-09-02
learning_objectives:
  - Explain how governance policies and validation practices keep pace with a changing agent
  - Distinguish behavioral drift, configuration drift, and permissions creep
  - Evaluate key governance tradeoffs when operating AI agents at scale
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/governance-for-ai-agents
  lesson: https://learn.mongodb.com/learn/course/governance-for-ai-agents/governance-for-ai-agents/continuous-governance
---

1. LeafyBank has contained the $10,000 refund incident and updated the agent's controls.

2. While this incident is resolved, the work is not finished. The model will be upgraded. The prompt will be revised. A temporary permission may be widened during the incident and forgotten afterward. Governance is not a launch checklist. It is an ongoing, operating practice.

3. In this video, we’ll see how to keep governance current as our AI agent and its operating environment change. We’ll track changes, validate behavior, monitor drift, balance controls with risk, and use incidents to improve governance.

4. Think of your AI agent like a vehicle that's driven every day. Passing an inspection once does not mean the vehicle remains safe forever. Parts wear, software changes, routes change, and maintenance records matter.

5. Continuous governance is the maintenance program that keeps the system inside its intended operating envelope. That maintenance follows a continuous loop: track what changes, validate behavior, watch for drift, balance controls with risk, and use incidents to improve governance.

6. One way we can track changes is through versioning. Versioning means recording changes so they can be reviewed, tested, and traced. This may sound familiar since it’s already a common practice when developing software. We can easily extend this practice to our AI agents.

7. For LeafyBank’s AI Agent Branch, that applies to both the model and the prompt: track which model runs in each environment, and review prompt changes before they ship. Treat either change like a production-code change, because even a small update can change how Branch interprets a refund request or handles an exception.

8. Versioning is necessary, but it is not complete until the governance artifacts stay aligned with the system. A refund threshold written for last quarter’s model does not automatically remain sufficient for this quarter’s model. Versioning also needs to account for changes outside of LeafyBank’s control.

9. In our example, if LeafyBank uses a third-party model provider, the provider may also change behavior on its own schedule, sometimes with limited notice. The same is true of any third-party tool Branch depends on: a payment processor or shipping API can change its behavior without warning too. LeafyBank inherits that change, so it needs visibility into what changed, and monitoring after vendor updates rather than assuming prior validation still applies.

10. After changes to a model, prompt, policy, or dependency, validation asks whether the agent still behaves as intended. Does it respect the allowlist? Does it route refunds above $25 for approval? Does it remain inside the customer’s tenant? Does it resist the injected instruction from the support article?

11. Two common complementary practices help test whether the autonomy boundaries and agent controls defined in our governance policy continue to function as intended: red-teaming and exception review. **Red-teaming** deliberately probes those boundaries with prompt injection, tool abuse, malformed data, and unusual sequences of requests. **Exception review** examines human overrides and waived approvals to show where the workflow may be working around a control.

12. Agents can assist with either practice, but accountable owners still interpret the results and decide what changes. Together, these practices reveal whether the controls are resilient under pressure and workable in real operations. A growing pattern of exceptions may show that the policy is wrong, the workflow has changed, or the team is bypassing a control that no longer fits.

13. The weaknesses found through red-teaming and exception review should become repeatable tests whenever they can be expressed as a test case. Regression testing, part of the broader practice known as evals, provides a consistent comparison. LeafyBank can run its AI agent Branch through representative tasks and high-risk cases before and after a change, including the failure modes identified during review: a routine order lookup, a $20 refund, a $300 refund, a cross-tenant query, a prompt-injection attempt, and a subscription update interrupted by a timeout.

14. Tests can cover failure modes we can describe, and red-teaming can expose weaknesses we did not anticipate. We also need to watch for changes that happen quietly in the background. This is known as **drift**. In this video, we’ll focus on four forms of drift: behavioral, configuration, memory, and documentation drift. Let’s go through each of these to get a better idea of what they are.

15. Behavioral drift occurs when the model’s responses or judgments change, even when the written policy has not. For example, a model update may make the agent more lenient about refund requests even though nobody changed the refund policy.

16. Configuration drift occurs when deployed settings, permissions, or dependencies diverge from the intended source of truth. Permissions creep is a common example. During the incident, LeafyBank temporarily gives its AI agent Branch broader access to investigate. The incident ends, but nobody removes the access. The exception quietly becomes a standing permission.

17. Periodic access review exists to catch exactly this problem. This can be done by comparing the permissions the agent has with the permissions it actually needs. Remove unused tools, narrow broad roles, expire temporary grants, and verify that downstream agents have not become an indirect route around the original policy.

18. Memory drift occurs when retained context becomes stale, loses value, or becomes poisoned by incorrect or manipulated information. LeafyBank needs rules for retention, review, correction, and deletion to ensure that old context does not continue to shape new decisions as though it were current fact.

19. Finally, documentation drift occurs when the runbook, escalation contacts, policy records, or ownership information no longer match how the agent actually operates. The drift may not change the agent’s behavior directly, but it can delay detection, containment, or recovery when another problem occurs. Documentation needs a review cadence and a clear owner, just like the other governance artifacts.

20. The practices we just covered: testing, access reviews, memory review, and documentation updates, help to control drift, but they also require tradeoffs. More checks can increase latency. More human review can reduce speed. Centralized policy ownership can improve consistency but become a bottleneck. Decentralized ownership can move quickly but produce variation. There is no universal setting; the governance design should match the impact and reversibility of the action.

21. The most important comparison is not the cost of governance versus zero cost. It is the cost of governance versus the cost of an ungoverned failure: a wrongful refund, a data exposure, a runaway loop, or the loss of customer trust. Developer speed matters, but so does preventing a fast-moving system from outrunning its oversight.

22. Now let’s apply the governance loop to the LeafyBank example, and see how their governance policies and practices have changed since the incident.

23. The original $10,000 refund revealed a control gap. The response created new evidence requirements and containment steps. The model upgrade created a regression test. The temporary permission created an access-review rule. Each response resulted in a concrete governance improvement, with the incident providing valuable data, informing the new governance policy.

24. In practice, continuous governance means defining boundaries, enforcing them, capturing evidence, responding when something fails, and validating as the agent changes. Governance is neither a single control nor the responsibility of a single team. It is the ongoing work of keeping autonomy within accountable boundaries.

25. Let’s recap what we covered: Continuous governance keeps an agent’s controls aligned with how the system changes. Versioning and validation help us evaluate model, prompt, policy, and dependency changes. Red-teaming, exception review, and regression tests expose weaknesses, while drift monitoring helps us catch behavioral, configuration, memory, and documentation changes. Finally, governance tradeoffs should match the impact of the action, and incidents should inform the next policy revision. That is how LeafyBank, and you, can keep governance aligned with AI agents as both continue to change.

26. Great job! You now know what governance looks like for AI agents: how to establish autonomy boundaries, enforce identity and access, build runtime controls, investigate incidents, and manage drift and tradeoffs over time. Build the system this way, and your AI agent can be useful without becoming unaccountable. Now it’s time to earn your skill badge!
