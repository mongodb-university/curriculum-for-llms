---
title: Upgrade to MongoDB 9.0 with Atlas
lesson_number: 2
skill: mongodb-9-overview
kind: video_script
word_count: 931
date_updated: 2026-08-11
learning_objectives:
  - Explain why Atlas teams should distinguish between major version MongoDB 9.0 and Atlas Auto Upgrade before planning their upgrade approach.
  - Identify the key readiness checks, rollout considerations, and validation steps for upgrading Atlas deployments to MongoDB 9.0 safely.
  - Describe the post-upgrade validation steps and Atlas maintenance-window controls that ensure a safe move to 9.0.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/90-overview
  lesson: https://learn.mongodb.com/learn/course/90-overview/90-overview/upgrade-to-mongodb-90-with-atlas
---

1. You've seen what's new in MongoDB 9.0 and you're ready to move. But before you schedule that upgrade, there are real questions to answer: which upgrade path is right for your Atlas deployment and what checks do you need to run first?
2. In this video, we'll walk through how to plan and validate a safe upgrade to MongoDB 9.0 on Atlas. We'll cover how to choose between versioned 9.0 and Atlas Auto Upgrade, how to prepare your cluster for the change, and what to validate once the upgrade is complete. Let's get started!
3. Before you plan your Atlas upgrade, there's an important distinction to get right.
4. As we covered earlier, MongoDB 9.0 is available to Atlas customers through two release cadence options: the MongoDB major version 9.0 and Atlas Auto Upgrade. For upgrade planning purposes, these are not the same thing, and your approach depends on which one you're using. If you're on the MongoDB 9.0 major version path, you're scheduling a planned upgrade to a specific major version on a timeline you control. Atlas Auto Upgrade works differently. Atlas progressively rolls out validated improvements to your cluster within the maintenance windows you already control. There's no single upgrade day to coordinate. Where supported, you can defer deployment for up to 30 days, and you can tag clusters as production or non-production to stagger adoption across your environment.
5. On Dedicated Atlas clusters, you can switch between a pinned major version and Latest Version With Auto Upgrade. Switching back from Auto Upgrade is only available during a limited window after the next major release becomes available.
6. The rollout itself works in three stages: first the binary, then incremental feature flags, and then setting the FCV, or Feature Compatibility Version, to 9.0. FCV enables or disables new features that persist data incompatible with earlier versions of MongoDB. This allows you to upgrade the binary first, validate your deployment, and set FCV to 9.0 when you’re ready. A cluster running the 9.0 binary may not yet have every 9.0 capability enabled.
7. Some features are gated by feature flags or FCV, and your availability of specific capabilities depends on where your cluster sits in that rollout sequence, its eligibility, and its deployment type.
8. Regardless of which path you're on, a safe upgrade starts with verifying cluster eligibility, driver compatibility, and maintenance window settings. The first thing to confirm is cluster eligibility.
9. We need to know if the Atlas cluster is actually able to receive the planned upgrade path. Not every Atlas cluster receives 9.0 at the same time. Availability depends on your cluster tier, deployment type, and where your cluster falls in the rollout wave.
10. Check your Atlas dashboard and the official upgrade guidance to understand where your cluster stands before you schedule anything.
11. From there, confirm that your application drivers are compatible with MongoDB 9.0. If your current driver version is not compatible, update to a compatible version and test your application before upgrading the cluster.
12. Verify that any deployment-specific constraints, such as Atlas Search configurations or integrations with other Atlas services, are accounted for. If there are dependency gaps, resolve them before moving forward.
13. Finally, confirm maintenance windows. Atlas upgrades run within the windows you've defined. If you're on the major version 9.0 path, schedule your upgrade during a window that gives your team time to monitor the rollout. If you're on Atlas Auto Upgrade, review your window settings and confirm they match your operational expectations.
14. Before touching production, validate in a non-production environment. Run your application workloads against a 9.0 cluster in staging and confirm that nothing in your stack breaks with the new version. This step is not optional for a major version change.
15. Once your preparation is in place, execution is about coordination and observation, not just clicking a button.
16. Start by aligning your application and operations teams on the upgrade plan. Everyone involved should know the timing, their responsibilities, what signals to watch for, and the escalation path if something unexpected happens.
17. During the rollout, watch your cluster health signals closely. Atlas provides monitoring and alerting to surface performance, replication, and connectivity signals in real time. Use them.
18. A healthy upgrade should look routine, but you want the instrumentation in place to catch anything that isn't.
19. Post-upgrade validation is where teams often underinvest. Once the version change is complete, verify that your application workloads are behaving as expected. Check your observability signals for any anomalies in query performance or resource utilization. If your deployment uses security-sensitive features like Queryable Encryption or X.509 authentication, confirm those are functioning correctly. And if there are specific 9.0 capabilities you're relying on, validate that they're active and performing as expected on your cluster.
20. Treat the upgrade as both a version change and an operational-readiness exercise. The version change is the technical event. The operational-readiness piece is about confirming that your monitoring, alerting, and rollback plans work in practice.
21. Know ahead of time whether a rollback is possible for your upgrade path, and under what conditions you would trigger it. Once FCV is set to 9.0, binary downgrade options are more limited, so understand those limits before changing FCV.
22. A well-executed upgrade ends not when the version number changes, but when your team has confirmed that production behavior matches your expectations.
23. That wraps up our look at upgrading to MongoDB 9.0 on Atlas. Let's recap what we covered. We started by distinguishing between the major version MongoDB 9.0 and Atlas Auto Upgrade, and how the staged rollout works in practice.
24. We walked through what to verify before scheduling your upgrade: cluster eligibility, driver compatibility, and maintenance window settings.
25. And we covered post-upgrade validation: checking workloads, observability signals, and security features, and knowing your rollback options before you need them.
26. Validate in non-production first, understand how your rollout is staged, and go into production with clear expectations.
27. When you're ready to start, visit the official MongoDB documentation for the release notes, upgrade guidance, and full steps for your cluster type.
28. Upgrading to MongoDB 9.0 with Atlas is manageable when you plan it carefully.
