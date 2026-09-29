---
title: Workload Flexibility with MongoDB
lesson_number: 0
skill: workload-flexibility
kind: video_script
word_count: 1829
date_updated: 2026-09-28
learning_objectives:
  - Identify workload patterns (e.g. spiky/unpredictable, storage-heavy, competing-workload, and unpredictable AI/agent) and the observable signals that distinguish each one.
  - Classify a given workload against those patterns using evidence from monitoring, billing, and incident history.
  - Determine which trade-off a classified workload is currently paying — scaling lag, idle over-provisioned capacity, premature sharding, or workload contention — and name the architectural constraint that produces it.
  - Match each workload pattern to the Atlas Infinite Database mechanism that addresses it, and apply the stated boundary criteria to determine whether a given workload should run on Atlas Infinite Database or Atlas Core Database.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/workload-flexibility-with-mongodb
---

1. Your application is growing and, at some point, you start noticing patterns. For example, your traffic spikes suddenly, but your infrastructure takes twenty minutes to scale and, by the time it does, the spike is over.

2. Or your data grows constantly, but your queries stay light, so you're scaling compute just to keep up with the storage you need.

3. In both of these brief examples, you never know how much capacity you really need, whether that’s compute or storage.

4. Paying for extra storage when you really need more compute, or vice versa, can be frustrating. But if you can identify and understand the workload pattern you're dealing with, you can make a better architectural choice.

5. In this video, you'll learn four common patterns, how to recognize them in your systems, and what your options for addressing those patterns are.

6. Let's start with the fundamentals. Every workload is defined by three independent dimensions. First: how does traffic arrive? Is it steady and predictable, does it cycle on a schedule, or does it spike without warning? Second: how does your data volume, query load, and operational throughput grow? Do they all scale with traffic, or do data and queries grow independently of one another? Third: which queries matter most to your business? Are you optimizing for latency, throughput, or are you just looking for consistency? These three dimensions are completely independent. Any combination can happen and when you understand which combination you have, you understand your trade-offs.

7. Let’s take a look at our first workload pattern. Imagine a scenario where traffic to your app explodes without warning. Here's what you see when this pattern hits your systems: scaling takes twenty minutes or more, but the spike itself lasts only minutes. You request more capacity, and by the time it arrives, the surge is over.

8. Looking at your incident retro, you see "we couldn't scale fast enough" cited as a contributing factor. So what are your options to deal with this scenario?

9. First, you could pay for peak capacity year-round, maintaining infrastructure sized for spikes that happen a few times a year. Or you could accept that scaling takes too long and risk losing transactions, revenue, or customers when the spike hits. Neither choice is good. You're either wasting money or accepting business risk.

10. Our next workload pattern involves storage-heavy workloads that grow data fast. For example, IoT sensors logging millions of events per day. While this data is constantly growing, queries against that data are light. This can result in CPU utilization staying flat while the dataset climbs steeply. Storage costs rise, but query latency doesn’t degrade.

11. The trade-off here is painful. You can buy oversized compute instances just to obtain the storage capacity you need, but then you're paying for computational power you never actually use. Ten terabytes of data requires capacity that forces you to buy instances sized for throughput you don't have.

12. Our third pattern is when multiple workloads need to run on the same data without slowing down your live application. For example, you may want to scale reads or support analytics-oriented queries without affecting your primary transactional workload. When those demands compete for the same resources, costs can rise and customer experience can suffer. In these cases, performance issues are tied to infrastructure and operational cycles rather than user activity.

13. For 24/7 platforms, there is no true off-peak. The trade-off in this case is to accept periodic performance degradation during maintenance, or scale compute much larger than your live workload needs, just so background operations have room to run without impacting users.

14. Finally, AI agents and autonomous systems generate load that resists traditional forecasting. A single user query triggers dozens of backend fetches so request volume doesn't correlate with user count or time-of-day patterns.

15. Like the previous workload pattern, the trade-off here is to over-provision for worst-case agent behavior, maintaining expensive idle capacity you rarely use. Or accept degraded performance under bursts and hope it doesn't cost you customers.

16. It’s important to note that most production workloads are combinations of these patterns. A 24/7 e-commerce platform has steady transactional traffic, heavy nightly backups, and growing historical data all competing on the same infrastructure. A fintech platform has spiky trading volume and end-of-month reconciliation batch jobs. An AI platform has unpredictable agent traffic plus storage-heavy context and embedding data. The point of naming these patterns individually is to identify which trade-off is costing you the most right now.

17. To address the problems posed by these patterns, we need to achieve three goals: First: absorb spikes without paying for peak capacity year-round. Second: hold very large datasets without oversizing the rest of the deployment. Third: run multiple kinds of work on one foundation without workloads interfering with each other. But how do you do that?

18. Ultimately, all four patterns create the same fundamental problem. Most database architectures provision compute and storage capacity as a single unit. That's simple, and it's why every pattern ends in a compromise. The only available moves are: scale everything, scale nothing, or accept degradation. You can't scale just compute when you need it. You can't scale just storage when data grows. You can't provision dedicated storage or compute for read and analytical workloads while still isolating it from live application traffic.

19. Imagine two layers: one for compute, one for storage. Right now, they're bound together. What if you could separate them? Let them scale on their own schedules for their own reasons. That's the architecture we need. And that's exactly what MongoDB has built.

20. Atlas Infinite Database is a new edition of the database within the Atlas platform. It's built on an architecture that separates compute from storage so each scales independently. There is no change to the MongoDB API, drivers, query language, transactions and replication semantics, security protocols, or same operational tooling. There’s no application rewrite so no need to migrate to a new system. You choose this edition when you create a new database.

21. Now, let's see how this architecture solves each pattern.

22. Returning to our first workload pattern, with Atlas Infinite you can simply add compute when your app experiences traffic spikes. You don’t need to scale your storage, copy data, pre-warm the cache. When the spike ends, you scale compute back down. You pay for compute only when you use it.

23. Storage-heavy workloads grow data fast. MongoDB still scales horizontally when your throughput demands it, but with decoupled storage, you can hold more data without scaling compute just because your dataset got bigger. Infinite gives you more choice and flexibility, so you can shard when you want to, not simply when storage fills up. That means you can start small and grow to terabytes or even petabytes on the same foundation. The storage scales independently of your query needs.

24. Atlas Infinite also allows us to separate background operations from live traffic. Backups, replication, maintenance, analytics sync run on the storage layer now with dedicated resources. The live application lives on the compute layer. When your backup runs at night in one location, it doesn't compete with your customers placing orders in a different time zone. When end-of-month reconciliation runs, it doesn't slow down live transactions. It's on a separate path, so customers get consistent performance.

25. Finally, AI agents can generate sudden bursts of parallel requests. With decoupled compute and storage, compute can scale independently when demand spikes, while the storage layer scales separately without requiring the same level of pre-provisioning. That lets customers align capacity more closely to actual usage instead of maintaining worst-case infrastructure year-round.

26. MongoDB’s document model is also a natural fit for agent workflows, because agent state, interactions, and long-term memory can be stored and retrieved flexibly in the same platform. That flexibility carries through to how you choose a database, too.

27. The Atlas experience you’re already familiar with, Atlas Core Database, and Atlas Infinite Database are both database editions within the same Atlas platform. When you create a new database, you simply choose which one fits your workload. While Atlas Infinite Database offers powerful capabilities, Atlas Core Database remains the right choice for many use cases.

28. Let’s explore the criteria that point to Atlas Core Database.

29. First, some workloads require absolute resource isolation where every compute resource is dedicated to a single tenant. If your workload requires this degree of complete control and predictability, maybe for compliance, regulatory, or because your customer contract demands it, Atlas Core Database is the answer.

30. Cost is the next thing we need to consider. Some teams need infrastructure costs that are completely predictable and budgeted. If your traffic is steady, your data growth is forecasted, and you want fixed monthly costs with no variability, Atlas Core Database gives you that certainty. You provision exactly what you need and you pay a fixed price. Atlas Infinite Database uses consumption-based pricing: you pay for the compute and storage you actually use. That's efficient if demand is variable. But if demand is steady and predictability matters most, Atlas Core Database is the better fit.

31. Next, if your application needs Atlas Search running on the same cluster as live transactional data, then Atlas Core Database is the right choice.

32. Next, some workloads are so latency-sensitive that network latency matters.

33. Atlas Core Database can provide NVMe storage attached directly to compute nodes and network latency between nodes and storage is minimal. Atlas Infinite Database separates storage from compute without sacrificing strong performance for most workloads. If you need microsecond-level latency or more specific infrastructure tuning, Atlas Core Database offers more configuration options.

34. If your queries are sub-millisecond sensitive and that latency would materially degrade performance, Atlas Core Database's attached storage is the better choice.

35. Finally, Atlas Infinite Database requires MongoDB 9.0 or later. If your application is on MongoDB 8.0 or earlier, or depends on 8.0-era drivers and you can’t upgrade yet, Atlas Core Database remains available.

36. If none of these criteria apply to your workload, Atlas Infinite Database is likely the better choice. If your traffic is spiky or unpredictable, if your data is growing fast, if background operations matter, if you're building AI agents, if you want to avoid over-provisioning, Atlas Infinite Database adapts to all of that with one architecture.

37. You now have four workload patterns and the observable signals that identify each one. You understand the common root cause: compute and storage provisioned as a single unit. You know how decoupling addresses each pattern. Now let’s look at how to apply this framework end-to-end.

38. First, you observe a workload. You identify which of the four patterns it matches using the signals you've learned: incident history, monitoring dashboards, billing trends, capacity planning conversations. You match that pattern to its architectural solution.

39. Then you apply the boundary criteria. If any of these is a requirement, use Atlas Core Database. If none of them apply, Atlas Infinite Database is the answer.

40. Understanding this architecture helps your organization choose the right database edition and explain why that choice makes sense to your team.
