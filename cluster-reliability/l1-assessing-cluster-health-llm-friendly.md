---
title: Assessing Cluster Health
lesson_number: 1
skill: cluster-reliability
kind: video_script
word_count: 1176
date_updated: 2025-06-24
learning_objectives:
  - Assess a cluster's overall health
  - Identify key metrics to monitor
  - Establish a baseline of performance to help identify potential issues
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/cluster-reliability
  lesson: https://learn.mongodb.com/learn/course/cluster-reliability/cluster-reliability/video-assessing-cluster-health
---

1. Before you start to analyze or address issues with your cluster, you'll want to be familiar with how your cluster typically operates when it's healthy. While some issues may be readily apparent, we can often identify warning signs before they develop into more serious issues. For this reason, it's important to establish a performance baseline.

2. In this video, we'll show you how to establish that baseline, assess the health of your cluster, and follow a trail of clues to identify an issue.

3. In a healthy cluster, all nodes can communicate with each other, and network and hardware resources have enough overhead to handle spikes in activity. This prevents slowdowns and delays. For sharded clusters, documents should be distributed relatively evenly throughout the available shards, and the workload should be routed between the shards in a balanced manner.

4. One way that we can establish a baseline and assess our cluster's health is by analyzing metrics. With these helpful data points, you can get a closer look at what's going on in your cluster.

5. Some key cluster health metrics we'll focus on are OpCounters, Disk IOPS, Disk Latency, Disk Queue Depth, Replication Lag, and Oplog Gigabytes per hour. We'll discuss each of these in more detail, when we use them to analyze cluster health.

6. Let's begin by looking at how our cluster typically performs. Remember - a healthy cluster should have plenty of overhead available, and not be pushed to its limits.

7. Here we can see a typical 24 hour sample of our opcounter data for the primary member of one of our replica sets. This measures the total number of operations performed on the cluster. Note that opcounters separately track command operations, queries, updates, delete operations, and more.

8. Aside from a relatively small spike in command traffic a little before 6 PM, the pattern is very stable, and the query traffic is so low, you can barely see it. This is expected of a test cluster which is not handling queries from active applications. This is normal activity that matches my understanding of the baseline for this test cluster.

9. If you prefer using command line tools, you can use the db.serverStatus() method to return an overview of the database's state and various metrics, including opcounters. Add "dot opcounters" to the end of the command, to return only the opcounters field.

10. This data show operations performed since the last mongod process restart. We can see that the test cluster hasn't been very active, with no write operations since the last restart. Again, this aligns with my understanding of this test cluster's baseline performance. There are some read queries that were performed, and many commands. Background processes like scheduled backups, and monitoring operations likely make up the vast majority of what this test cluster has been doing.

11. Next, let's look at three metrics that allow us to track how replication is functioning.

12. Replication Lag indicates the time delay between the primary performing a write operation, and the secondaries replicating it. The oplog window shows how long a secondary node could lag behind the primary before older write operations are truncated from the oplog. Replication headroom shows you the difference between the primary's oplog window and the secondary's replication lag. Here we can see that this node has no data for Replication Headroom, since it's the primary node.

13. You can find the same information in the MongoDB shell, mongosh, with rs-dot-print-replication-info, which will print a report on replication from the perspective of the primary node. We can see the size of the oplog, the time between the first and last oplog entries in seconds and hours, and the date and time for those first and last entries.

14. If you wish to see a report on replication from the perspective of the secondaries, use rs-dot-print-secondary-replication-info. This will show you how far each secondary node is behind the primary. It looks like my secondaries are completely caught up with the primary.

15. Okay, so we've established a simple baseline for what our cluster looks like when everything is working as it should. Of course, in a production environment, things will be more complex. Let's take a look at some metrics captured during an incident, and see how they compare.

16. Let's say I receive reports of laggy performance in my app. I'll see if I can spot anything unusual in the metrics. The first thing I notice are the large spikes in opcounters, page faults, network traffic, and replication lag. Immediately after, we see a pronounced dip in network connections. What might this indicate? The red vertical line in our graphs confirms - we've had a server restart.

17. Let's take a closer look at the opcounters and replication lag metrics for all three nodes.

18. We can learn quite a bit just from these two metrics. First, we can see that while the first secondary and the primary show a red line at the time of the incident, the other secondary has an orange line just after. This indicates that an election has occurred, and this former secondary is now the primary.

19. Finally, let's look at network connections and page faults for all three nodes around the time of the incident and just after.

20. Once again, the failover and subsequent election are clearly evident. The network connections for both the first secondary and the original primary see a dip in network connections following the election, and then stabilize.

21. The new primary sees an increase in network connections, because it's now handling the incoming write and read operations. Page faults occur when requested data is not in memory, requiring the node to read the data from disk. A spike in page faults just before the server restart and election suggests increased disk activity due to insufficient available memory.

22. This could indicate that the primary node experienced an out-of-memory event, which caused the server to restart, triggering the resulting election.

23. When we correlate the data, we can piece together a story. First, we observed that our application was experiencing lag. Here, alerts can play a critical role. You can learn more about configuring alerts in our monitoring skill. We checked our metrics, and saw indicators of memory pressure, which took our primary offline. And we compared the current metrics to our baseline.

24. This confirms that I should analyze my network traffic patterns, and consider scaling my cluster, so I don't run into this problem again.

25. So, what have we learned?

26. It's important to establish a baseline of performance for your cluster, so you have something to compare current metrics against.

27. Which metrics are most useful will depend on your situation, but it's often helpful to track opcounters, CPU, RAM, and network usage, as well as replication info.

28. Finally, if you're not using MongoDB Ops Manager, Cloud Manager, or Atlas, or if you just prefer using a terminal, you should familiarize yourself with the console commands that can provide you with these metrics.

29. Great work! With a good understanding of how to assess your cluster's health and follow the clues, you're ready to identify issues, and hopefully stop them before they become too disruptive. See you in the next video!
