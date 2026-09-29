---
title: Introducing MongoDB 9.0
lesson_number: 1
skill: mongodb-9-overview
kind: video_script
word_count: 1156
date_updated: 2026-09-23
learning_objectives:
  - Describe what MongoDB 9.0 is and where it's available.
  - Identify which release approach — major version 9.0 or Atlas Auto Upgrade — fits a given customer's needs.
  - Recognize why delaying database upgrades creates risk and how MongoDB 9.0 focuses on safer, simpler upgrades.
  - Describe how Intelligent Workload Management keeps clusters stable under load (prioritization, queuing, backpressure).
  - Identify the MongoDB 9.0 security improvements and what they enable (Queryable Encryption prefix and suffix queries, WebAssembly JavaScript engine, X.509 authorization).
  - Identify the MongoDB 9.0 observability improvements (Query Stats across all CRUD operations, OpenTelemetry metrics, change stream shard targeting).
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/90-overview
  lesson: https://learn.mongodb.com/learn/course/90-overview/90-overview/introducing-mongodb-90
---

1. Have you ever postponed upgrading your database because the current version still works? You're not alone. The perceived risk and disruption feel bigger than the benefit, so you stay put.

2. But here's the thing: staying on old versions compounds risk over time. You miss out on security patches, bug fixes, and new capabilities that could make your workloads faster, more reliable, and cheaper to run.

3. In this video, we'll introduce you to MongoDB 9.0. We'll discuss who it’s for, the different upgrade paths, and the new improvements in performance, security, and observability make upgrading worthwhile. Let’s get started!

4. MongoDB 9.0 is a major release of the MongoDB server. It's going to be available across MongoDB Atlas, Enterprise Advanced, and Community Edition, which means it's designed for teams regardless of how they run MongoDB. But what's different is that MongoDB 9.0 isn't a single upgrade path anymore. Instead, it's delivered through two separate release cadence and support lifecycles.

5. The first is the traditional major version approach. This is available for all three deployment models: MongoDB Atlas, Enterprise Advanced, and Community Edition.

6. Use the major version approach if you want to control when you upgrade to a new major version, for example, if you need to plan it, test it, and schedule it around your maintenance windows, you'll upgrade to MongoDB 9.0 just like you've done with past releases.

7. You get a stable version number, predictable support timelines, and five years of planned support.

8. The second is Atlas Auto Upgrade, which is exclusive to MongoDB Atlas. Instead of one large upgrade event, Atlas progressively delivers validated improvements to your cluster over time. There's no discrete version jump. Each roll out occurs within maintenance windows you control, so Atlas keeps your cluster current while respecting your operational schedule.

9. So, if you run on MongoDB Atlas, you can choose between major version 9.0 or Atlas Auto Upgrade. Choose major version 9.0 when you need strict control over version adoption. Maybe you have change-control processes, compliance requirements, or you prefer planning upgrades yourself. Choose Atlas Auto Upgrade when you want faster access to validated improvements while Atlas manages the rollout within the maintenance windows you configure.

10. If you run Enterprise Advanced or community, the major version 9.0 path is your only option.

11. Now let's walk through what's new and why these changes make upgrading worth prioritizing sooner rather than later.

12. Let's start with performance. One of the biggest challenges teams face is keeping their database responsive under load. When traffic spikes hit, clusters either slow down dramatically or fail over. MongoDB 9.0 addresses this with Intelligent Workload Management.

13. Think of it as a traffic control system for your database. MongoDB 9.0 helps direct traffic more smoothly with operation prioritization, smart queuing, and backpressure, to keep your cluster stable. Critical operations get priority, less urgent work gets queued, and the system gracefully handles overload rather than becoming overwhelmed. The result is more predictable, responsive behavior even when traffic doubles unexpectedly.

14. Beyond that, MongoDB 9.0 improves how you transform and filter data. New query expressions let you reshape documents, compute new fields, and filter data natively in aggregation pipelines.

15. Historically, teams would write custom JavaScript code to do this work. The aggregation pipeline still ran on the server, but JavaScript-based transformations were not handled natively by the database engine. That made them slower, harder to secure, and more difficult to maintain. A team using JavaScript to convert JSON into a string, like in this example, could replace that logic with native `$toString` in the aggregation pipeline. With native query expressions, the same work runs faster in the database engine itself, with better security and cleaner code.

16. Let’s move on to security which is non-negotiable in production. MongoDB 9.0 strengthens the security posture across several fronts.

17. Queryable Encryption is a feature that lets you search on encrypted data without decrypting it on the server. In version 8.0, MongoDB introduced basic queryable encryption. Now in 9.0, it adds support for prefix and suffix queries on encrypted fields. This is critical for real-world use cases like customer service workflows where you need to search for names or account identifiers that are personally identifiable information.

18. You can search "John*" to find all customers whose names start with John, and their actual data stays encrypted. It's a powerful way to maintain privacy while keeping your operational workflows intact.

19. On the platform side, MongoDB 9.0 also upgrades its JavaScript engine to WebAssembly-based execution and improves ex five oh nine authorization controls. These changes strengthen the overall security posture for both self-managed and Atlas deployments, giving you better isolation, faster execution, and more granular access control.

20. Now let's talk about observability and diagnostics. One of the hardest problems in production is figuring out which operations are driving load and consuming resources.

21. MongoDB 9.0 expands Query Stats beyond read operations to cover the full set of CRUD operations, including inserts, updates, and deletes. Paired with native OpenTelemetry metrics support, this means you can see exactly which queries and collections are driving load, and you can plug that data directly into your existing observability stack.

22. MongoDB 9.0 also improves change streams, making them an even more powerful feature for detecting data changes in your database as they happen.

23. With better shard targeting, change streams no longer wait for shards that have no data to contribute, reducing latency. They also provide richer signals for change events. This helps power diagnostics, alerting, and downstream processing like syncing data to search engines or analytics platforms. It's all flowing from a single, consistent event stream.

24. Finally, let's talk about making the lives of your development team easier, especially teams modernizing legacy applications.

25. MongoDB 9.0 introduces first-class Hibernate support. Hibernate is the standard object-relational mapping framework for Java. For Java teams with existing relational applications, this is a game changer.

26. Instead of rewriting your entire data access layer to switch to MongoDB, you can map your Hibernate entities directly to MongoDB collections. It's a smoother path for teams modernizing away from relational databases.

27. Together, the combination of richer query expressions, improved observability, and intelligent workload management gives your teams a more modern, database-centered toolkit. Your application code becomes simpler, and your operational team has better visibility and control.

28. Now that you know what's new, you're ready to plan and execute your upgrade!

29. First, let’s recap what we covered in this lesson. We introduced you to MongoDB 9.0 and showed you how it's delivered through two release cadence and support lifecycles: the traditional major version approach and Atlas Auto Upgrade for Atlas customers.

30. We walked you through the improvements that 9.0 includes in performance and workload management, security, observability, and developer productivity. Staying on old database versions compounds risk, and MongoDB 9.0 is designed to make upgrading simpler and safer whether you're on Atlas, Enterprise Advanced, or Community Edition.
