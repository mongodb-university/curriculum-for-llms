---
title: Troubleshooting Sharding Issues
lesson_number: 6
skill: cluster-reliability
kind: video_script
word_count: 2054
date_updated: 2025-06-30
learning_objectives:
  - Identify sharding issues like unbalanced workload and jumbo chunks by using metrics and tools
  - Mitigate sharding issues by refining your shard key
  - Identify when re-sharding is appropriate and how to do it
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/cluster-reliability
  lesson: https://learn.mongodb.com/learn/course/cluster-reliability/cluster-reliability/video-troubleshooting-sharding-issues
---

1. While replication helps to keep your data highly available, sharding your collection allows you to scale horizontally, adding more shards, which can help take on additional data and workload.

2. The ideal scenario would be to have perfectly balanced data distribution AND a perfectly balanced workload that's distributed across all shards evenly. It's all about BALANCE.

3. But what do you do if your sharded cluster is experiencing an unbalanced workload?

4. An unbalanced workload often occurs when data distribution across shards is uneven, or when your query workload interacts with one shard more than others. When you shard your collection, you'll select a shard key which defines how the data in that collection is distributed across your cluster's shards.

5. MongoDB will automatically balance the data across shards, but sometimes the data can remain unbalanced. This could be caused by improper shard key selection or insufficient data migration due to factors like network or hardware bottlenecks, lack of available disk space, or jumbo chunks - which cannot be split using the current shard key. Any of these may lead to unbalanced data distribution, like we see here. Sometimes you'll also see unbalanced data because the primary shard hosts unsharded collections by default, in addition to sharded ones.

6. In our case, let's assume that the query workload your mongos router receives is proportional to the data on each shard. Let's also assume that our data set contains only sharded data, so there are no unsharded collections taking up space on shards A or C. In this example, that means Shard A is not only using more of its available disk space, but it's also experiencing a much higher proportion of the workload.

7. The result? Queries targeting Shard A will likely have slower response times, and that means your user satisfaction will go down.

8. So how can we identify an unbalanced workload in a sharded cluster?

9. If you're using a tool with a graphical user interface to manage your cluster, like MongoDB Atlas, Ops Manager, or Cloud Manager, you can observe metrics directly as graphs.

10. Some key metrics to keep in mind when assessing cluster workload balance are: Shard Data Size and Document Count, Query Metrics, oplog gigabytes per hour, disk write IOPS, and normalized system CPU. Let's take a look at these now.

11. First, let's view the shard data size. Here, we see the "customers" collection in the "bookstore" database. Note that the two shards are both growing in size, which means the data is split between the shards. But, the data on shard0 is growing faster than the data on shard1. This might not necessarily indicate an unbalanced workload, but it's our first indicator that something might need to be addressed.

12. By looking at the shard document count, we see the number of documents added to each shard is increasing proportionally with the amount of data added to each shard. In this case, I know that the documents are all more or less the same size. Comparing the shard data size and document count can help you determine if a discrepancy in shard size is due to larger documents, more frequent update operations, or a greater number of documents. In this case, we can see that the increase in data size and document count align, so it's pretty clear that shard0 is receiving more write operations.

13. Likewise, with query metrics, we view the distribution of all queries across all shards. The shards often experience equivalent workload, but there are spikes where shard0 is queried more actively.

14. Next, by looking at Oplog gigabytes per hour, we see shard0 generates more oplog data than shard1. This aligns with our other observations, and confirms that shard0 receives a heavier workload than shard1.

15. Disk write IOPS indicates the input operations per second, and shows how active the disks are on each shard. In this case, both shards perform nearly identically. This is a small test dataset, so it's likely you'll see greater differentiation with your own workload. You'll also want to check this metric to ensure it's not approaching the capacity of the node. I know that my hosts can handle around 3000 IOPS, so the shards are nowhere near being overloaded. This means I don't have to worry about disk writes being a bottleneck.

16. Another metric to consider is the Normalized System CPU. If it is pushing max capacity, it may indicate you need to further scale your cluster. On our test cluster, we don't see any issues, but if you're experiencing an unbalanced workload, one shard may consistently have considerably higher CPU usage.

17. If you don't have access to Ops Manager, Cloud Manager, or Atlas, you can still investigate using command line tools like sh.status and sh.getShardedDataDistribution.

18. sh.getShardedDataDistribution() returns a formatted report of the distribution of data across all sharded collections.

19. We see both the number of documents, and amount of data owned by each shard. By comparing the two, we see that shard0 has nearly 2/3rds of the documents and data for this collection. That's not catastrophic, but it's worth keeping an eye on!

20. Beyond these metrics, you'll also want to check the health of your individual nodes within a shard, which you can do by connecting to them via SSH and running OS tools like top, free, and df. And of course, if you have access to a tool with built-in metrics charts like Ops Manager, Cloud Manager, or MongoDB Atlas, it's always preferable to use that over command line tools, whenever possible.

21. Okay, we have an unbalanced workload and unbalanced data. What can we do to mitigate the impacts?

22. If you've determined that the unbalanced workload is caused by a hardware bottleneck, consider vertically scaling up the resources on the overloaded shard or cluster to compensate.

23. While mitigation might be possible, what we really want to do is address the underlying issue. So let's remediate the cluster, to balance the data and workload across all shards. Here, our options are to reshard with the same shard key, or reshard with a new shard key.

24. In our example, we had two shards with unbalanced data. Shard-0 has more data AND a larger workload than shard-1. If we add another shard using the same shard key, we could balance the data more evenly between the three shards.

25. This is a good example of a scenario where we can reshard to the same shard key. With this technique, you can use the same shard key to reshard your cluster, adding or removing shards as needed. This is a very helpful technique when the data imbalance is caused by slow or insufficient migrations.

26. In this case we've added a shard. We can reshard the collection with the same shard key and this creates a temporary collection. During this time, the original sharded collection is still active. The data and indexes from the active collection are copied to the new collection, and the data is distributed evenly across all shards. Once the new collection is ready, the original is deleted and the temporary collection is renamed to replace it.

27. In some situations, you may not want to further horizontally scale your cluster. In our example, although the data and workload were imbalanced, they weren't yet at the limits of what our machines could handle. It's more of a potential issue that we want to stop from growing into a serious issue. How could we do that?

28. Since the data is distributed according to a shard key, and in our scenario we've determined that the shard key is not distributing the data or workload adequately, the best way to resolve this is to re-shard our cluster with a new shard key.

29. If you've taken our skill on Sharding, you know that the ideal shard key consists of a field or fields which have high cardinality, low frequency, and values which do not increase or decrease monotonically, and of course, it should align with your critical queries.

30. Note that while we can reshard to a new key as often as you like, it is of course best to get it right the first time, so take the time to analyze your workload. We can do this by using the query analyzer. The query analyzer samples executed queries and collects diagnostic data about their behavior. We'll use this data to identify an appropriate shard key for our workload.

31. So let's run the configureQueryAnalyzer admin command.

32. Let's plug in our customers collection as the namespace. The next field is mode, which can accept a value of "full" or "off". Since we're enabling the analyzer, we'll set it to "full". Finally, if we set the analyzer to "full" mode, we'll need to tell it how many samples to take per second.

33. In this case, we'll set it to 20.

34. The longer we let the analyzer run, the more samples we can use to assess our shard key and identify a new one. But remember that high sample rates can rapidly accumulate data, so we shouldn't keep it running for too long.

35. After we've allowed the query analyzer to run for a few days, we can turn the analyzer off by running the command with the same namespace and setting the mode to "off". Note that samplesPerSecond is not required as a field here, since we're just stopping the analyzer.

36. Now we can query the sample data with the analyzeShardKey method to see how a new shard key might help us to distribute data.

37. This returns information about the characteristics of the shard key you added to the command, such as the most common values and monotonicity.

38. Once we've found a new shard key that better suits our workload, we'll stop the balancer with the sh dot stopBalancer method, then use the reshardCollection method, and specify the namespace and new shard key. Don't forget to start your balancer back up after the reshard is complete!

39. Note that this process will block write operations for about two seconds.

40. If your application can't tolerate blocked writes, and you don't need to change your entire sharding strategy, you should consider refining your existing shard key.

41. Refining a shard key allows you to add additional fields to your shard key, allowing for additional granularity and more even data and workload distribution. Let's say our current shard key is using the customer_id field only. By refining the key to include the order_id field as a second source of cardinality, we can allow for better splitting and organizing of our data. This is especially helpful for dealing with jumbo chunks.

42. A jumbo chunk is a chunk that exceeds the chunk size specified in the settings collection of your config database, and cannot be split into multiple chunks based on your current shard key.

43. Remember the keyCharacteristics from the analyzeShardKey command? If you saw a value with a very high frequency, it could potentially lead to jumbo chunks.

44. You can identify jumbo chunks by running sh.status - include the true boolean to return verbose results if you have 20 or more chunks. After running sh.status(), look for chunks marked with the "jumbo" flag.

45. Let's say that our current shard key is using customer_id as the sole shard key field. We've identified that one shard is queried more than the rest, and the data on it is growing faster, as well. Perhaps we have a single customer that is making a large number of purchases. By using the refine Collection Shard Key admin command, we can refine the shard key by adding the order_id field.

46. Now that we've refined the shard key with an additional field, the balancer can distribute data more evenly across shards, and this should also help distribute the query workload! Perfect!

47. So, what have we learned? Let's quickly recap. You can identify data or workload imbalances by paying close attention to your cluster metrics, and using tools like sh dot status, and sh dot getShardedDataDistribution to get more information.

48. You can mitigate the performance impact of unbalanced shards by upscaling the impacted nodes vertically, or scaling your entire cluster horizontally by adding shards.

49. Finally, you can remediate your cluster by refining your shard key, or resharding your collection to the same shard key or with a new key.

50. Great work! Now you're ready to monitor your sharded cluster's health and performance. You're also equipped to address data and workload balance issues. See you in the next video!
