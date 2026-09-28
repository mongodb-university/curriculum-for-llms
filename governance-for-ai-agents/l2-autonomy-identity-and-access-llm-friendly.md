---
title: Autonomy, Identity, and Access
lesson_number: 2
skill: governance-for-ai-agents
kind: video_script
word_count: 1149
date_updated: 2026-08-24
learning_objectives:
  - Understand agent actions as autonomous, approval-required, or prohibited
  - Apply least-privilege principles to agent access and permissions
  - Distinguish delegated user identity from service account identity in agent requests
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/governance-for-ai-agents
  lesson: https://learn.mongodb.com/learn/course/governance-for-ai-agents/governance-for-ai-agents/autonomy-identity-and-access
---

1. In our LeafyBank example, our AI agent Branch doesn't need the same level of freedom for every support request. Different Support tasks require different autonomy boundaries. Looking up an order seems low risk, but returning the wrong customer’s data can create a serious data leak. Issuing a large refund can also be risky. Closing an account for suspected fraud may be too consequential for the agent to decide at all.

2. A useful analogy for access permissions is a hotel keycard. A guest may enter their room and perhaps the fitness center, but not every room, the safe, or the server room. The Principle of Least Privilege works the same way for an AI agent as it does for people: give it the smallest set of permissions needed for the task, rather than permanent, full access.

3. In this video, we’ll define autonomy boundaries, apply least-privilege thinking to agent access, and examine identity and authorization, to help us distinguish delegated user identity from service account identity. Let’s get started.

4. An autonomy boundary defines what an AI agent may do independently, what requires human approval, and what it must never do. These boundaries should be decided before launch, but of course you’ll need to continue to evaluate them as the agent and its access and functionality changes.

5. Autonomy boundaries define the decision rights, specifying who, or what, has the right to make specific kinds of decisions. An access policy enforces the autonomy boundaries. It scopes and enforces what resources, data, and tools those decisions can reach.

6. The Principle of Least Privilege applies here: access should typically be denied by default, and granted only for the current task. Let’s look at a couple of examples:

7. First, an agent may need access to many customers’ records in order to do its work. However, authorization must scope each request to the current customer or tenant, and the data service must enforce that scope. The agent must have no path to read or disclose another customer’s data, even through a poorly scoped query.

8. Here's another example: an agent allowed to look up an order should not automatically be able to modify billing information just because both functions happen to be available through the API.

9. In our LeafyBank example, we’ll define two boundaries: what information the agent may return, and what changes it may make. Let’s see what this looks like.

10. The agent can look up the current customer’s order and subscription. Returning customer data and issuing a refund are different actions that warrant different tools, scopes, and approval rules.

11. It may issue a refund under $25 without human approval. A refund of $25 or more gets routed to a support specialist for review. Changing a stored payment method, closing an account for fraud, or overriding a legal hold remain human-only actions, which are prohibited for the agent.

12. Once the agent’s access policy is defined, human approval provides an additional check when an action exceeds the agent’s autonomous authority. The reviewer should check the amount, customer, reason, and evidence before approving or denying the action. The approval record should also capture the originating actor, agent, requested action, customer, reviewer, decision, and policy basis.

13. But if a support representative clicks “approve” on every request without actually checking those details, LeafyBank has only created the appearance of oversight, without providing the real benefits.

14. When an action needs to be reviewed, it should identify both the originating actor and the agent. Identity tells us who initiated the request. Authorization tells us whether the agent may act on that user’s behalf and what it may reach. Let’s look at two common identity patterns: delegated user identity and service account identity.

15. First, delegated user identity: the agent acts on behalf of a specific support employee, carrying that employee's delegated authority constraints. Think of this like a key temporarily given to a friend: the friend can use it for the specific task, but does not gain permanent ownership of the key. When the task is complete, the key is returned and the access ends.

16. The other access pattern is service account identity, which has its own, defined role.

17. This is more like a company-owned badge labeled ‘maintenance.’ The badge has its own defined access because of the role it represents, not because it belongs to a particular employee. It can open approved areas, but it should not inherit any employee’s personal access or be treated as the employee’s identity. The badge, the agent, and the action should all remain visible in the logs.

18. These patterns are not interchangeable: delegated authority is bounded by the originating user’s permissions, while a service account acts under its own role and must never be presented as a human user’s authority.

19. Credentials authenticate identity. Verified tokens or policy decisions convey authority and scope to downstream tools. If a credential leaks or the request takes an unexpected turn, a narrow, temporary permission limits the blast radius.

20. Those identities must remain visible in the logs. If every action is logged only under a generic service identity, LeafyBank may lose the ability to show who initiated the request.

21. If an AI agent is allowed to act under a human identity while retaining broader standing permissions, it can exceed what that user is actually allowed to do. Governance needs both the originating actor and the agent identity to remain visible.

22. Identity and authorization must remain visible when one agent calls another. Suppose the AI agent cannot access internal pricing negotiations, so it calls a research subagent that can. If the subagent returns a restricted document, the delegation path has become a way around the original boundary.

23. To prevent that, the original caller’s identity and authorization must travel with the request in a verifiable form. Every downstream tool or agent should enforce the original caller’s permissions, and the delegation scope. That authority and identity should remain traceable through every hop. A downstream agent should never grant access that the original request did not have.

24. With identity and authorization carried through every hop, approval rules can be simple and explicit.

25. Our AI agent may autonomously issue refunds under $25, route larger refunds to a person for review, and stop entirely when the request involves a legal hold. Thresholds separate routine, autonomous work from work that deserves a second look.

26. For the highest-impact actions, approval thresholds may not be enough. Separation of duties adds another safeguard.

27. The agent that recommends a refund should not be the only actor that finalizes it. This is the same principle used when two people authorize a large financial transfer: no single actor should have unchecked authority over a consequential action.

28. Let’s recap what we’ve covered: Autonomy boundaries separate autonomous, approval-required, and prohibited actions. The Principle of Least Privilege limits the data, tools, and tenants an agent can reach. Identity and authorization must remain traceable through every hop.

29. These controls keep an AI agent’s freedom to act within the boundaries LeafyBank has defined. Next, we’ll move from defining the boundaries to enforcing them in the architecture. I’ll see you in the next video.
