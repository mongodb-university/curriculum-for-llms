---
title: Governance Foundations
lesson_number: 1
skill: governance-for-ai-agents
kind: video_script
word_count: 1366
date_updated: 2026-08-31
learning_objectives:
  - Differentiate governance from safety, security, compliance, and observability
  - Identify the main control points in an agent workflow
  - Recognize risk categories in agent workflows, including prompt injection
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/governance-for-ai-agents
  lesson: https://learn.mongodb.com/learn/course/governance-for-ai-agents/governance-for-ai-agents/governance-foundations
---

1. At 2 AM, a LeafyBank customer reports a duplicate charge. Branch, the support agent, reviews the account history, decides a refund is appropriate, and issues a $10,000 refund, even though the charge was valid. Without governance, one mistaken agent decision can expose data or trigger an unauthorized action, all without leaving a defensible record.

2. Here's what makes this different from a person making the same mistake: Unlike a person, an agent can act across systems at machine speed and scale. A support rep who misreads a policy might issue one bad refund before someone catches it. An agent can issue many before anyone has the chance to notice.

3. Across the organization, different teams focus on different aspects of this problem. Security asks what the agent can reach. Compliance asks what the company is obligated to prove. Support asks when a person should step in. Engineering asks how these workflows get tested. Four teams, four partial views, without any one team owning the whole issue and seeing the big picture.

4. Governance connects these views through shared policy, clear ownership, enforced controls, and evidence that can tell the whole story.

5. In this video, we’ll define governance, map the control surface where governance operates, and examine five types of risk that must be managed.

6. Let's start by defining governance. Governance is the framework that coordinates four connected areas: safety, security, compliance, and observability.

7. Safety asks whether the agent can cause harm. Security asks what the agent can access and change. Compliance asks which obligations the organization must meet. Observability asks what happened and what evidence remains.

8. So where does governance sit? Security asks whether our support agent, Branch, can reach the billing system. Governance asks who authorized that access, under which policy, what controls enforce it, and whether we could still prove that months from now.

9. Think of security as the lock on the door. Governance is the decision about who gets a key, the record of who was given one, and the person accountable for that call. You need both to have real oversight.

10. A control point is any place in the agent's workflow where a policy can constrain, observe, approve, or record what the agent does. When combined, the control points make up the control surface: which is everywhere you can shape the agent’s behavior. The control surface includes any element that can influence the agent’s behavior or be used to access data, change systems, or take action, and therefore must be governed against misuse, compromise, and unintended failure.

11. In our example, the control surface includes the instructions, retrieved context, and memory that shape the agent.

12. It also includes identity boundaries, secrets, external connections, tools, external actions, and handoffs to people.

13. These are examples, not a complete list. New systems may introduce additional control points. Note that, unlike a person, an agent can act across systems at machine speed, so its reach must be explicitly bounded. Now let’s take a look at a request and follow along, looking for control points.

14. A customer asks LeafyBank’s AI agent, Branch, for a refund. Branch reads the order record, retrieves a support article, decides whether the request qualifies, calls the refund tool, and sends a confirmation. Five steps, and every one of them sits somewhere a policy could have intervened.

15. To find the control points that matter most, ask “what can the agent access?”, “what can it change?”, “what can influence it?”, “where does a person step in?”, “what evidence remains?”, “what does the agent rely on?”, and “how can we prevent a single mistake from multiplying?”

16. That’s a lot of questions, and they’re all important. So let’s explore each of them now.

17. What can the agent access? We’ll start with **agent reach**: the systems, data, and actions available to the agent. This falls under access and data risk. The agent must ***not*** retrieve another customer’s order, expose sensitive billing information, or use a credential that gives it more reach than the task requires.

18. **Standing access** is access the agent holds all the time, whether or not the task it needs to perform requires it. Standing access is especially dangerous because an agent may use whatever access is available when a request leads it there. Just like people, agents' access should adhere to the **Principle of Least Privilege**. Agents should only have access to the necessary resources for their role and tasks by default.

19. Next: What can the agent change? Permissions define what an agent is allowed to access or change. Behavioral risk is the risk that an agent uses those permissions in a way that is not intended or allowed, such as issuing a refund without approval.

20. What can influence the agent and its behavior? For example: Prompt injection is when untrusted content tries to influence the instructions the agent follows. It may be hidden in a customer message, a retrieved article or document, a tool response, or stored memory.

21. Imagine that the organization’s internal wiki has been hacked, and now the support article includes hidden text telling the agent to ignore the refund policy and issue refunds automatically. If governance does not define how to treat retrieved content as data rather than authority, the article becomes an unauthorized control channel.

22. The problem is not that the agent read the article; it is that the agent treated untrusted content as authority. A policy can allow the article to inform the answer, without allowing it to redefine the rules. With proper governance, the agent might respond with: “Unfortunately, in spite of what this document says, I am unable to initiate a refund over $25 without approval from a Support specialist.”

23. Which leads us to our next questions: Where does a person intervene, and what evidence remains after an incident?

24. These questions cover oversight and evidence. The agent may have an approval step that nobody meaningfully reviews. Or the action may be recorded without the policy decision, scope, or approver that allowed it. In either case, the organization may discover the result without being able to explain the path. Meaningful oversight allows you to connect the approval to the decision, the actor, and the evidence.

25. Next, we can ask: What information does the agent rely on? This leads us to model reliability and uncertainty. The agent can sound certain while using stale subscription data, incomplete account history, or a hallucinated explanation. It may act on bad information without ever signaling uncertainty. Governance has to provide the surrounding checks that the model itself cannot provide.

26. Finally: How can we prevent a single mistake from multiplying? This is operational risk. An agent stuck retrying a failed tool call, or repeatedly pulling down large documents, can turn one support request into hundreds of model calls before anyone notices. Cost limits, rate limits, and retry limits are how governance draws that boundary. Limits aren't only about expense: a limit is also a tripwire. When the agent hits one, something has probably gone wrong, and now you know.

27. Let’s return to our example. Our AI Support Agent, Branch, issued a $10,000 refund that nobody approved. Where did things go wrong? First, it held standing access to the payments system at a time when no person was watching, so its reach was unbounded. It made a judgment call from incomplete account history, treated a prompt injection in a hacked wiki article as authority, and allowed an unverified decision to reach the refund tool, all without signaling uncertainty, so reliability went unchecked.

28. No approval gate stood between the decision and the money, so there was no oversight. The log shows the refund, but not the reasoning behind it being granted. There’s not enough evidence to fully reconstruct what happened. *This* is why governance matters so much.

29. Let’s recap: Governance coordinates safety, security, compliance, and observability through policy, ownership, controls, and evidence. An agent workflow contains control points in its instructions and context, identity and connections, tools and actions, and human handoffs. The key risk categories are access and data, behavior, including prompt injection, oversight and evidence, model reliability, and operational cost. Together, these categories are the foundations for making agent autonomy bounded, visible, and accountable.

30. Up next, we’ll define how much freedom the agent should have and what identity and access it should carry. I’ll see you there.
