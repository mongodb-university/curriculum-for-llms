---
title: Introduction
lesson_number: 0
skill: mongodb-9-overview
kind: video_script
word_count: 325
date_updated: 2026-08-20
learning_objectives:
  - Explain the differences between versioned MongoDB 9.0 and Atlas Auto Upgrade to select the approach that fits your deployment and operational needs.
  - Apply compatibility checks, dependency reviews, staged testing, and deployment-specific procedures to plan and execute a safe MongoDB 9.0 upgrade.
  - Validate workloads, replication, monitoring, backups, authentication, Search, Vector Search, and time-series features after an upgrade, with rollback considerations in place.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/90-overview
---

1. Have you ever postponed upgrading your database because the current version still works? You’re not alone. The perceived risk and disruption can feel bigger than the benefit, so you stay put. But staying on older versions compounds risk over time. You miss out on security patches, bug fixes, and new capabilities that could make your workloads faster, more reliable, and cheaper to run.

2. MongoDB 9.0 changes that equation with improvements across performance, stability, security, observability, and developer productivity that make upgrading worthwhile.

3. Hi, I'm `instructor_name`, and I'm a `instructor_role` at MongoDB. In this skill, I’ll walk you through everything you need to know to upgrade to MongoDB 9.0 with confidence, whether you're running on Atlas, Enterprise Advanced, or Community Edition.

4. In our first lesson, we'll explore what MongoDB 9.0 is, where it's available, and why it matters. You'll learn the difference between the two release cadence options: the major version approach, which is available across deployments, and ongoing updates using Atlas Auto Upgrade.

5. We'll also look at the advances in performance, security, observability, and developer productivity that make upgrading worthwhile.

6. Next, we'll focus on planning and executing a safe upgrade on MongoDB Atlas. We'll clarify the difference between versioned 9.0 and Atlas Auto Upgrade so you can choose the right path for your deployment, then walk through the key steps to prepare, validate, and confirm a successful upgrade.

7. Finally, we'll cover how to upgrade Enterprise Advanced and Community Edition deployments to MongoDB 9.0. We'll walk through the planning, execution, and validation steps for self-managed environments, including the deployment-specific considerations that shape a safe and successful upgrade.

8. By the end of this skill, you will know what’s new in MongoDB 9.0, choose the upgrade path that fits your team, and feel confident planning a safe upgrade for your deployment.

9. Once you've completed this content, you'll be ready to apply your new knowledge and earn your MongoDB 9.0 skill badge. It's more than a digital badge to share on LinkedIn—it's verifiable proof that you understand MongoDB 9.0's new features and how to plan a safe upgrade.
