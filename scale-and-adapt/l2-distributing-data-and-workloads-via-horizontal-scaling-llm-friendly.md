---
title: Distributing Data and Workloads via Horizontal Scaling
lesson_number: 2
skill: scale-and-adapt
kind: video_script
word_count: 911
date_updated: 2026-06-05
learning_objectives:
  - Understand horizontal scaling and sharding architecture as a strategic capability
  - Explain dynamic workload isolation using the moveCollection command
  - Apply distributed scaling concepts to multi-tenant architectures
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/scale-and-adapt
  lesson: https://learn.mongodb.com/learn/course/scale-and-adapt/scale-and-adapt/distributing-data-and-workloads-via-horizontal-scaling?page=1
---

1. Retail Screen Dynamics, or RSD, had reached a turning point. The business could no longer keep forcing more data and more traffic through one centralized system.  The real challenge for RSD was how to split a massive 100-billion-request workload without destabilizing the platform underneath or forcing their engineering teams to completely rewrite their application.  They decided to migrate to MongoDB to address these concerns.

2. In this lesson, we'll see why RSD chose MongoDB for its horizontal scaling capabilities and how that changes the ability to scale. We'll see how distributing data and workload via sharding across multiple servers protects both performance and business predictability. And we'll understand why this shift is not just a technical upgrade, but a strategic pivot.

3. Horizontal scaling is the strategic pivot because it changes the ability to scale. Instead of asking one larger machine to absorb everything, the system begins distributing both data and workload across multiple servers. The pressure that was accumulating in one place now spreads across many.

4. MongoDB supports that shift through sharding. Sharding is a scale-out architecture designed for deployments with very large datasets and high-throughput operations. It allows the database to grow beyond the limits of any single server. In practical terms, that means RSD is no longer dependent on a single system's ability to scale vertically. The platform can start dividing the overall load so that each machine handles only a subset of the total workload. No single server has to carry everything. No single server becomes the bottleneck for the entire business.

5. This is what makes horizontal scaling strategically different from buying bigger hardware. With vertical scaling, expansion means repeatedly replacing one machine with a larger and more expensive one. Each upgrade is a major event. Each upgrade has diminishing returns as you approach the ceiling of what hardware can provide.

6. With horizontal scaling, expansion can happen incrementally. You add servers as needed. You grow capacity in smaller steps rather than large, disruptive jumps. Ultimately, horizontal scaling fundamentally shifts the economics and the risk profile of growth.

7. Capacity becomes more adaptable as demand changes. RSD is no longer locked into predicting exactly how much they will need years in advance. And  they're no longer betting the business on a single, oversized hardware investment. The architecture bends with demand instead of breaking under it.

8. MongoDB distributes data and aggregate workload across shards. Each shard processes only a subset of operations rather than forcing every read and write through one central bottleneck.

9. That distribution depends on sharding strategy and shard\-key design. Utilizing a high\-cardinality shard key like device\_ID or store\_ID matters because it ensures data is spread evenly across the cluster. When data is distributed evenly, performance stays consistent as workloads expand.

10. For RSD, this can be framed in business terms. Instead of concentrating every advertiser, every bid request, and every campaign surge into one place, the platform can route growth across multiple independent nodes. Traffic from individual devices can land on different shards. Campaigns from different regions can be processed in parallel. The architecture stops being a funnel and starts being a distribution network.

11. A common concern when deciding to scale horizontally is whether or not that means every engineering team has to become experts in distributed systems. The short answer to that is no. And that is a significant part of the value.

12. Engineers do not have to absorb all of the distributed-systems complexity directly. Applications still connect through a single routing layer.  In MongoDB, the `mongos` router manages incoming requests across the cluster, directing each query to the right shard without requiring the application to know where the data lives.

13. That single connection point matters because it protects developer velocity while the architecture becomes more distributed. Teams can keep building features and shipping code without having to redesign how their applications talk to the database.

14. The developer experience remains consistent, but the underlying data layer still has to answer a harder question: what happens when tenants scale at different rates?

15. In a multi-tenant environment, not all growth is evenly distributed. Some tenants or collections can become noisy neighbors that consume disproportionate resources.

16. RSD had to think about what would happen when a premium advertiser launched a major campaign. Traffic could spike, queries would undoubtedly multiply, and in a centralized system, that spike would affect everyone else sharing the same infrastructure.

17. MongoDB provides the ability to move collections when necessary, giving their operators a way to respond to that uneven growth. It allows them to relocate unsharded collections or isolate noisy tenants across shards completely without application downtime, preventing one volatile workload from degrading the performance of others.

18. For RSD, that means they don't have to destabilize service for everyone else.

19. The business value of being able to control data distribution across shards goes beyond flexibility. It reduces the need to over-provision the entire cluster uniformly just to protect against one hotspot or one tenant with exceptional demand. RSD can respond to localized pressure more precisely, rather than throwing capacity at the entire system and hoping it is enough.

20. Great job\! In this lesson, we defined horizontal scaling and explored how migrating to a distributed architecture using MongoDB sharding fundamentally changes a platform's growth model, economics, and adaptability. We broke down how a single routing layer, the `mongos` router, protects developer velocity by handling the complexity of distributed systems behind the scenes, allowing teams to keep shipping code without redesigning their applications. Finally, we saw how capabilities like `moveCollection` help organizations manage uneven, multi-tenant growth, giving operations the optionality to isolate noisy neighbors and precisely rebalance capacity as demand shifts. When circumstances change, the architecture can adapt. And when demand shifts, capacity can follow.
