---
title: Upgrade to MongoDB 9.0 with EA and Community Deployments
lesson_number: 3
skill: mongodb-9-overview
kind: video_script
word_count: 1019
date_updated: 2026-08-12
learning_objectives:
  - Identify the prerequisites and planning decisions for upgrading self-managed EA and Community deployments to MongoDB 9.0.
  - Distinguish the EA and Community Search Extensions workflows during a 9.0 upgrade.
  - Identify compatibility risks specific to self-managed deployments (application driver changes, Search Extension versions) and validation checkpoints for each.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/90-overview
  lesson: https://learn.mongodb.com/learn/course/90-overview/90-overview/upgrade-to-mongodb-90-with-ea-and-community-deployments
---

1. You've seen what MongoDB 9.0 offers. For teams running Enterprise Advanced or Community Edition, getting there safely means working through a structured plan before you ever touch a server. Unlike Atlas, there's no managed rollout to lean on. The versioned 9.0 release train is your path, and a successful upgrade depends on the preparation work you do before upgrade day arrives.
2. In this lesson, we'll cover how to plan your upgrade, how the EA and Community paths differ, and what to validate once the upgrade is complete. Let's get started!
3. To set the upgrade up for success, you need to prepare. Start by reviewing the release notes, checking for compatibility changes, auditing your dependency inventory, and identifying specific workloads that need attention. Before you run a single command, spend time in the documentation.
4. Start with the MongoDB 9.0 release notes, the compatibility changes page, the current support matrices, and the topology-specific upgrade procedure for your deployment. Together, they give you the full picture of what has changed, what is no longer supported, and what order to follow.
5. Next you need to check for compatibility changes. In order to do that, you need to know where you are starting from.
6. Check your current server version and Feature Compatibility Version or FCV. Remember that FCV controls features that persist data in a format incompatible with earlier versions, so it separates the binary upgrade from enabling compatibility-sensitive features. This gives you time to validate your deployment before setting FCV to the new version. MongoDB upgrades must follow a supported sequential path, so if you are more than one major version behind, you will need to plan for intermediate upgrades before you can reach 9.0.
7. Then, document your deployment topology and your management plane, whether that is Ops Manager, MongoDB Kubernetes Operator, or manual administration. This will help you choose the correct upgrade path and verify management-tool compatibility before you begin the production upgrade.
8. Next, work through your dependency inventory to confirm that upgrade-critical dependencies are supported for MongoDB 9.0.
9. First, make sure all of the key parts around your deployment are supported with MongoDB 9.0. That includes your operating system, architecture, packages or container images, repositories, drivers, Database Tools, Ops Manager and agents, MCK, and any other products your upgrade depends on.
10. If anything used to connect to, manage, monitor, back up, restore, or deploy the database is unsupported or has not been verified, stop there. Resolve the compatibility issue or choose a tested alternative before you continue with the upgrade.
11. Finally, identify workloads that need special attention so that you can flag anything likely to behave differently after a major version change for targeted validation.
12. Search and Vector Search configurations, time-series collections, Queryable Encryption, backups, monitoring integrations, and any custom administrative scripts all have the potential to behave differently after a major version change, so they should be flagged for targeted validation.
13. Two 9.0-specific risks are especially important to validate here because they can affect workload behavior and upgrade operations.
14. For time-series workloads, be aware that MongoDB 9.0 removes direct access to `system.buckets` collections. If any of your workloads or scripts use `system.buckets`, update them before you start the upgrade. Also make sure your database tools, such as `mongodump` and `mongorestore`, support MongoDB 9.0 before you depend on them during the upgrade.
15. Once your planning checklist is complete, the next decision is which upgrade path applies to your deployment: Enterprise Advanced or Community Edition. The planning steps we just covered apply to both, but the execution differs in important ways, especially if Search is part of your environment.
16. For Enterprise Advanced, the upgrade runs through your management plane, so any gaps in your management tooling's compatibility can block the upgrade itself.
17. If your EA deployment uses Search, the management workflow can automate the Search Extensions configuration after the binary upgrade. Once that completes, validate mongot connectivity, endpoints, certificates, the generated Search configuration, and that monitoring is reporting correctly.
18. For Community Edition, you are following the versioned server upgrade path without an automation layer. There is no Ops Manager or Automation Agent to coordinate the rollout, so each step in the topology-specific procedure is a manual operation.
19. If your Community deployment uses Search, the setup is also manual. Follow the documented Search Extensions setup for your operating environment and MongoDB deployment topology, which includes configuring the extension, setting the correct permissions, loading the extension, and verifying that the process restarts as expected.
20. The distinction between the two paths comes down to what is automated versus what you own directly. EA teams have tooling to manage the upgrade and Search configuration. Community teams have fewer moving parts to coordinate, but they are responsible for each step end to end.
21. Before you make changes in production, test your application workloads in a non-production environment, make sure you have a backup you’ve already tested, and confirm that your team knows the timing, who owns each step, and who to contact if something goes wrong.
22. Then, when you’re ready to upgrade in production, follow the documented order for your specific deployment type and check the health of the deployment after each step. Be especially careful about when you set the Feature Compatibility Version, or FCV.
23. Think of the binary upgrade and the FCV upgrade as two separate steps. First, install the new binaries and run your compatibility checks. Then, once those checks are complete, set FCV. After FCV is set to 9.0, rolling back becomes more limited and may require help from Support, so make sure you have an approved rollback plan before moving forward.
24. After the upgrade, take time to make sure everything is working normally. Check that replication is healthy, monitoring and alerts are working, backups and restores still work, and authentication is behaving as expected. Then run a few representative workloads and confirm that Search, Vector Search, and time-series features are all working the way you expect.
25. That wraps up upgrading to MongoDB 9.0 for Enterprise Advanced and Community deployments.
26. Let’s recap what we covered in this video. We discussed how to prepare to upgrade to MongoDB 9.0 by reviewing release notes, compatibility changes, your dependency inventory, and important workloads.
27. We looked at how EA and Community paths differ around Search Extensions.
28. And we walked through safe execution: separating the binary and FCV upgrades, testing in non-production, and validating thoroughly after the change.
29. When you are ready to start, visit the official MongoDB documentation for the 9.0 release notes and the upgrade guidance for your deployment type.
