---
title: Introduction
lesson_number: 0
skill: governance-for-ai-agents
kind: video_script
word_count: 727
date_updated: 2026-08-31
learning_objectives:
  - Explain why governance is a production requirement for AI agents
  - Identify the core governance themes covered in this skill
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/governance-for-ai-agents
---

1. It’s 2 AM at LeafyBank. A customer has reported a duplicate charge. The support agent, Branch, reads the account history, decides a refund is appropriate, and issues a $10,000 refund. Unfortunately, the customer was mistaken, but the refund was still granted. Without a defined governance policy to follow, which might prevent the autonomous approval of refunds over a certain dollar amount, or require an accountable person to approve such requests, this is a very possible outcome.

2. Of course, this is exactly the kind of outcome we want to prevent. To do so, it’s not enough to just ask: “How do we stop the agent from making a mistake?” We must also ask: “How do we control what the agent is allowed to do, who is accountable, and what happens when prevention fails?”

3. That is what governance is for. Governance is the set of policies, responsibilities, controls, evidence, and response practices that keep an autonomous system accountable as it takes on real work. It includes both the technical policies that constrain the agent, and the policies that define the behavior of the people involved in the workflow.

4. The root problem is the same whether an action is taken by a person or an AI agent: if there is no governance defining what is allowed, who is accountable, or what evidence must be kept, mistakes and abuse are far more likely to occur.

5. Think of the agent, Branch, as a new employee who can work at machine speed. It has a corporate card, access to customer records, and the ability to call other systems. You wouldn’t give a brand new employee every key and ask them to “use good judgment.” You would define the job, limit their access, require approval for high-impact actions, and keep a record of what happened.

6. Branch can answer questions and fulfill requests by retrieving data, choosing tools, and changing state in LeafyBank’s systems. Its capabilities might include looking up an order, issuing a refund, updating a subscription, sending an email, or handing the request to a person.

7. That is what makes agent governance different from governing a more predictable application. With traditional software, we have the opportunity to review and test behavior before deployment. An agent’s behavior is shaped at runtime by its prompt, the data it retrieves, the tools available to it, and the model’s interpretation of the situation. A unit test can verify a fixed path, but it cannot cover every path the agent may take when the prompt, retrieved context, or model changes. Governance for AI Agents therefore combines pre-deployment testing with runtime controls and evidence.

8. For agents, governance must cover more than the service account or database. It must cover the instructions that shape the agent, the records it can retrieve, the tools it can call, the actions it may take, the people who approve exceptions, and the evidence captured along the way.

9. Across this skill, we will follow our LeafyBank example. We’ll begin by defining governance, distinguishing it from safety, security, compliance, and observability, and identifying key agent-workflow risks. Then we’ll discuss autonomy boundaries, least-privilege access, traceable identities, and meaningful approval for high-impact actions.

10. Next, we’ll enforce policy across application and platform layers with action gates, data and budget guardrails, governed memory, safe actions, and platform controls such as RBAC and auditing. We’ll capture evidence and respond to failures through detection, containment, analysis, remediation, and accountable recovery. Finally, we’ll keep governance current through versioning, evaluations, red-teaming, exception review, regression tests, drift monitoring, and risk-based tradeoffs.

11. By the end of this skill, you should be able to look at an agent and ask practical questions: What can it access? What can it change? When must a person intervene? What evidence of an incident will exist tomorrow morning? And how will the team know when yesterday’s controls no longer fit today’s agent?

12. Agents that access real data, call real tools, and take action without waiting for approval from a person are already a reality. Governance is what makes that autonomy bounded, visible, and accountable.

13. Once you’ve completed this skill, you’ll be ready to apply these concepts by earning the Governance for AI Agents skill badge through Credly. It’s more than just a digital badge that you can share on LinkedIn: it’s proof that you understand how to make agent autonomy bounded, visible, and accountable. I’ll see you in the next video.
