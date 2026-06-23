---
title: Troubleshooting Initial Sync and Failover Issues
lesson_number: 5
skill: cluster-reliability
kind: video_script
word_count: 1120
date_updated: 2025-06-26
learning_objectives:
  - Distinguish between an initial sync taking longer than anticipated and one which is stuck/stopped
  - Identify recurring failovers
  - Remediate a cluster which is experiencing recurring failovers
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/cluster-reliability
  lesson: https://learn.mongodb.com/learn/course/cluster-reliability/cluster-reliability/video-troubleshooting-initial-sync-and-failover-issues
---

1. We've seen how conducting an initial sync can help to recover from replication problems. An initial sync is necessary when certain conditions are met, such as when replication lag exceeds the oplog window. But what if an issue occurs during an initial sync? What if your cluster is regularly experiencing failovers, where a node repeatedly goes offline?

2. In this video, we'll explore these scenarios in detail so you can identify, mitigate, and recover from initial sync and failover issues.

3. Let's say you're a database administrator tasked with ensuring your company's MongoDB replica set functions properly. High availability is crucial to your objectives, and one of your nodes is experiencing serious replication lag.

4. You managed to resolve the issue causing the lag, but by that point, the node in question had exceeded the oplog window, and will now require an initial sync. You start the initial sync, and estimate it should take several hours, based on the size of the data being transferred, and your average data transfer rate between the source node and its sync target.

5. The time period you estimated elapses, and your initial sync still hasn't finished. How do you know if the sync has stalled? And more importantly, what do you do?

6. First, you'll need to be able to *identify* whether the sync is still making progress. You can use rs.status() to check the state of each replica set member.

7. While the initial sync is running, it will return a state of "STARTUP2". This will change to RECOVERING while it performs some checks to confirm everything is ready, and then SECONDARY, once it has rejoined the replica set as a secondary node.

8. During an initial sync, running rs.status() on the syncing node will provide initialSyncStatus information. Here we'll look at the information in initialSyncAttemps. durationMillis specifies the duration of the initial sync attempt. Here, we can see this attempt lasted just under a minute. Status indicates the status of the attempt. Here we see there was an error fetching the oplog.

9. syncSource indicates which of the other nodes in the replica set is being used as the source for this sync attempt. And operationsRetried lets you know the total number of all operation retry attempts. Here we see 120 retry attempts. Given the short duration of this sync attempt, that indicates a significant problem.

10. So we have a problem, let's discuss potential causes of slowed or stopped initial syncs: First, network latency between the syncing and source nodes will slow the initial sync, and if the connection is unstable enough, it could result in the sync failing.

11. Hardware bottlenecks could also be responsible - insufficient memory or CPU resources on a secondary node could lead to excessive page faults.

12. Then, look at the sync source's workload. A heavy load—perhaps from read preference directing queries to secondaries or many operations syncing from the primary—can slow down the initial sync.

13. Finally, if the mongod process on the syncing node is stopped or restarted during the initial sync, it will cause the sync to fail. If this occurs on the *source* node during the clone or oplog fetch stage of the sync, the sync can also stall or fail.

14. If you suspect that your initial sync is stalled completely and not just taking a while to complete, search your logs for error messages like: "error fetching oplog during initial sync", "Oplog start missing", or "Not found in oplog"

15. Of course, once you've identified an issue with the initial sync, you'll want to take steps to mitigate the impact. Here are two things you can do:

16. To speed up the initial sync, you can seed the initial sync using a snapshot of the data from the source node. This will accelerate data transfer and reduce the amount of data traveling over the network.

17. And to ensure the secondary has enough time to sync with the source, you can increase the size of your oplog to ensure any logged write operations are preserved during the initial sync.

18. Now that you've mitigated the issue, you'll want to take steps to ensure it doesn't happen again. Let's remediate our cluster! If you suspect hardware bottlenecks are the cause, take advantage of the downtime to scale the node's resources. Consider scaling horizontally by sharding your cluster to reduce the data size of initial syncs in the future. You can always stop and re-try the initial sync, but this is really only advisable if you can confirm it is stalled. Check the logs to be sure it's stalled, and no longer progressing. Finally, if you still need assistance, reach out to our Support team!

19. Now that you know how to handle issues with an initial sync, let's talk about frequent or recurring failovers.

20. With three members in your replica set, you should be able to tolerate a failover and still have a functioning secondary and primary. Occasional failovers are not a cause for concern, but if they occur regularly, frequent failovers indicate a larger issue which should be addressed.

21. To identify recurring failovers, regularly monitor the health of your cluster via rs.status(). Use monitoring and metrics from Ops Manager, Cloud Manager, or MongoDB Atlas to get insight into cluster health.

22. Here, we'll create an alert to let us know whenever a failover occurs, and an election is triggered. We'll select "replica set" as our category type, and "replica set elected new primary" as our trigger. If I start to receive these alerts on a regular basis, I'll know there's an underlying issue that needs to be addressed.

23. To remediate your cluster and resolve recurring failovers, you'll want to investigate your network configuration and latency between each node.

24. Take the time to address any hardware issues that might be causing failovers, and consider scaling to accommodate for increased workload. If the bottleneck is occurring on a single node, scaling that node vertically might be the solution. If the workload is just too much for your cluster, horizontally scaling by sharding your cluster will help distribute the workload more evenly.

25. Finally, once you've resolved the underlying issue or issues, be sure to continue to monitor your cluster's health and performance regularly via the tools and metrics we've discussed earlier. Remember: it's important to know your baseline, so you can easily notice when your cluster is not performing as expected.

26. Let's quickly recap what we've learned: Use rs.status() and metrics to identify both initial sync issues and recurring failovers. Additionally, search your logs for messages containing "oplog" or initial sync" to identify potential initial sync issues. Mitigate downtime from initial sync issues by seeding the sync, by restoring from a recent snapshot. Finally, to remediate your cluster, consider scaling it to accommodate increased workload, and addressing network issues.

27. Outstanding! Now you know how to handle issues with initial syncs, and frequent failovers.
