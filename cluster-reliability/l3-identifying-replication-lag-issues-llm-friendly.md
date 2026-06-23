---
title: Identifying Replication Lag Issues
lesson_number: 3
skill: cluster-reliability
kind: video_script
word_count: 1502
date_updated: 2025-06-25
learning_objectives:
  - Describe common causes of replication lag
  - Identify metrics relevant to diagnosing replication lag
  - Identify the cause of replication lag using tools and logs
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/cluster-reliability
  lesson: https://learn.mongodb.com/learn/course/cluster-reliability/cluster-reliability/video-identifying-replication-lag-issues
---

1. In our troubleshooting methodology video, we discussed the following scenario: during a major sale that generated more traffic than anticipated, you receive complaints from customers who are seeing significant delay between placing orders, and receiving order confirmations. This is just one example of how replication lag can impact user experience.

2. In this lesson, we'll discuss how to identify replication lag and the various issues that can cause it. Let's start with a brief review of how replication works in MongoDB.

3. MongoDB replica sets are designed to ensure high availability and data redundancy. A replica set consists of multiple nodes, each with specific roles. One primary node will receive and execute all write operations, such as inserts, updates, and deletions. In most cases, your primary node will also receive read operations.

4. The primary node records write operations in a collection called the oplog. This data is then sent to the secondary nodes. Secondary nodes apply the write operations listed in the oplog logically to their own copy of the database, ensuring that data remains consistent across the replica set.

5. MongoDB replica set members send "heartbeats" to each other at regular two second intervals, to ensure they are able to communicate. If a particular node is unreachable via this heartbeat signal after a set period of time, it's marked as inaccessible by the other nodes. By default this period of time is set to 10 seconds. When this happens to a Primary node, an election is called to select the next primary.

6. Replication lag occurs when one or more of the secondary nodes falls behind the primary in replicating the write operations stored in the oplog.

7. A little replication lag isn't necessarily an issue. But if it accumulates, it can impact your application's response times or even cause timeouts, and potentially cause stale data reads, depending on your write and read concerns.

8. Additionally, if replication lag accumulates on a secondary node, it could be in danger of exceeding the oplog window. In which case, you'll need to perform an initial sync.

9. The oplog window represents the amount of time that the oplog can retain changes before overwriting the oldest entries, tracking the time span between the newest and oldest entries in the oplog. It should be noted that this time window is an estimate based on the current size of the oplog, the maximum oplog size setting, and the average workload. If a secondary falls too far behind, and its last replicated operation is older than the oldest entry in the oplog, it must undergo an initial sync, which can be time-consuming and impact performance.

10. By default, the oplog size is limited to the smaller of 5% of disk space or 50 GB. MongoDB automatically truncates the oldest entries to maintain this limit.

11. Administrators can increase the oplog size using the replSetResizeOplog command.

12. Increasing the oplog size can help you avoid the need to perform initial syncs on secondaries that are experiencing replication lag, but if the lag is significant enough to require this, there is likely an underlying issue that still needs to be addressed. As the oplog is a capped collection, increasing the oplog size will immediately allocate the designated space on your database storage. So be aware of your storage needs!

13. Additionally, you can set a minimum retention period using storage.oplogMinRetentionHours in the mongod configuration file. This ensures entries are only truncated if they exceed the set size *and* are older than the specified amount of hours, which helps prevent costly initial syncs, by temporarily allowing the oplog to exceed its maximum size. Please be aware of the additional space that may be required when enabling the minimum oplog retention period.

14. Now we understand what replication lag is, and how it can impact your user experience, including potential data loss and time intensive initial syncs. We've also discussed preventing initial syncs by changing the oplog size and setting minimum retention hours.

15. With that in mind, what are some potential causes of replication lag? Here are a few examples:

16. Network connectivity between your nodes may be intermittent or impeded, causing failed heartbeats, creating a bottleneck for incoming oplog write operations, or frequent failovers and elections, which could lead to further replication lag.

17. Additionally, heavy workloads can also cause replication lag, especially if the hardware hosting your nodes is taxed by the workload.

18. Being familiar with potential causes of replication lag will help you know where to look, should you experience it. This is also another example of how regularly monitoring your cluster, and having a good idea of your baseline metrics when your cluster is functioning as expected, can help you notice when something has changed.

19. Now that you understand what replication lag is, its potential consequences, and some common causes, how do you confirm it's actually happening and find out exactly what's causing it?

20. Let's open Ops Manager and click on our replica set. Then, we'll click on the "metrics" tab.

21. We see the metrics for our primary node and both of our secondary nodes. We can look at replication lag, replication oplog window, and other relevant metrics to get a good picture of how our cluster is performing. Here, we can see my test cluster is experiencing little to no replication lag, and my oplog window is over five days, this is ideal.

22. In addition to the Replication Lag and Oplog Window metrics we just looked at, you'll want to pay special attention to the Oplog gigabytes per hour, Network, and Replication Headroom metrics. It's also a good idea to track your Disk IOPS, Disk latency, and Disk queue depth, as higher than baseline values for these metrics can indicate likely hardware bottlenecks.

23. Now let's look at some useful methods available to you in mongodb shell to help you identify replication lag.

24. Let's run rs.printSecondaryReplicationInfo(), to get a report of the replica set status from the perspective of the secondary nodes.

25. We see that our server named m1 is only two seconds behind the primary. However, our server named m2 is two hours and ten seconds behind the primary! This may indicate a problem, and is worth investigating. Let's dive deeper into the data.

26. Let's look at the overall health of the replica set with rs.status()

27. rs.status shows the results for the entire replica set, but we'll just look at one node, here. First, we can see the id, name, and health of the node. A health value of 1 indicates that the node is healthy, and responding to heartbeats from other members of the replica set. Next, we can see that the "state" is listed as "2", indicating that this is a secondary node. This is echoed in the "state string" field.

28. Not far below is information about the timestamp of the latest operation applied to the member, as well as when the last heartbeat was received. By comparing the timestamp of the latest operation and the last heartbeat received on the primary to the same information on the secondary, we can see that m1, our first secondary, has no recorded latency for its ping response.

29. Interestingly, M2, our lagging secondary node, also shows no latency for its ping response, and its last heartbeat received was more or less in time with M1. HOWEVER, the timestamp of the latest written operation is over two hours behind M1. This indicates that the culprit here may be a hardware bottleneck, rather than network connectivity issues.

30. You can find additional information on rs.printSecondaryReplicationInfo, rs.status(), and other command line tools via our online documentation.

31. Additionally, if you need any further clarification, you can look at your log files. Within the context of identifying the cause of replication lag, we'll likely want to focus on the mongod.log files on the secondary node which is experiencing the lag, and possibly the mongod.log file on the primary node.

32. What you'll want to search for will vary depending on your situation, but given the common causes of replication lag we mentioned in this video, here are some helpful words and phrases to search for in the logs: If you suspect the replication lag is due to performance bottlenecks, you could try searching for "slow query" or "page fault". For network issues, you could search for "connection refused" or "timeout". Other helpful search terms might include "ServerHeartbeatFailed", "Can't see majority", or "error running oplog fetcher".

33. We've covered a lot of ground! Let's quickly recap what we've learned.

34. Use tools like rs.status(), rs.printSecondaryReplicationInfo() and Ops Manager or Cloud Manager to obtain useful information for assessing how your replica set is performing.

35. Establish a baseline for your cluster's metrics, so you can identify replication lag by comparing present performance to past performance.

36. Search log files for relevant terms to positively identify an issue that may be contributing to replication lag.

37. Great work! Now you should be able to quickly identify replication lag when it occurs, and pinpoint what is causing it or contributing to it. Next, we'll look at how we can mitigate the effects of replication lag, and remediate your cluster so it doesn't continue to be an issue.
