---
title: Atlas Considerations
lesson_number: 8
skill: cluster-reliability
kind: video_script
word_count: 1241
date_updated: 2025-06-30
learning_objectives:
  - Identify important alerts and metrics available via MongoDB Atlas
  - Enable automatic tier scaling and storage scaling
  - Schedule a backup and take an ad-hoc snapshot
  - Be able to conduct a restore
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/cluster-reliability
  lesson: https://learn.mongodb.com/learn/course/cluster-reliability/cluster-reliability/video-atlas-considerations
---

1. Up to this point, we've discussed some issues you may encounter while managing your cluster. Issues with replication and sharding, and restoring from backups. We've mostly been looking at these issues from the perspective of self-managed clusters, so let's take a few minutes to talk about some features of MongoDB Atlas which can help you overcome these issues, or avoid them before they occur!

2. In this video, we'll be discussing Atlas' automated monitoring features, auto-scaling, and how to backup and restore with Atlas.

3. As we've discussed previously in this skill, one of the best ways to identify issues - and prevent them from occurring, is to keep an eye on key metrics. It's important to establish a baseline for what is typical for your instance, so you can tell when something has changed. It's also important to have alerts set up, so you know when metrics exceed certain thresholds, or important events occur.

4. Fortunately, MongoDB Atlas can help you with all of this! Let's take a look at metrics first.

5. To view metrics for your cluster, you can click on View Monitoring next to the cluster name on the Projects Page. If you're already looking at your cluster, you can click on Cluster Metrics in the left frame.

6. Once you're on the Cluster Metrics page, you'll see this layout, with a chart. You can use the menu above the chart to change the granularity of the sampled data, date and time charted, what nodes you're charting, and what the chart displays.

7. On the Cluster Metrics page, you can track many metrics which are helpful in assessing the health and performance of your cluster. To learn more, review the metrics mentioned in previous videos, our skill on Monitoring Tools, and our documentation.

8. Atlas also provides alerts, which can be customized and configured, to let you know when events occur, or certain thresholds are crossed.

9. Any triggered alerts will be sent out via email, SMS, or whatever other method you may have configured. And, when you look on your Organization page, you'll see active alerts listed. You can view them by clicking here.

10. On the Project Alerts page, we can see an alert, and acknowledge it, if we so choose.

11. Okay, we've looked at our metrics and alerts, now let's discuss auto-scaling.

12. Throughout this skill, we've discussed issues and situations like replication lag, or unbalanced workloads in sharded clusters, where scaling your cluster is a good strategy for mitigating negative impact, or to remediate your cluster.

13. With auto-scaling, Atlas can automatically take action to scale your cluster up or down, based on sustained CPU, memory, or IOPS usage. Remember - autoscaling is designed to scale the cluster based on sustained resource usage, not to respond instantly to large, sudden spikes. Please make sure you leave overhead to handle fluctuations in traffic.

14. If auto-scaling is not enabled on your cluster, and you'd like to enable it, you can edit the configuration of your cluster. Once on the configuration page, you'll find auto-scaling options under the "Cluster Tier" menu. From here, you can enable auto-scaling, toggle whether or not the cluster can be auto-scaled down, and set your minimum and maximum cluster tiers.

15. You can also enable storage scaling, if it's not already on. Note that both auto-scaling and auto storage scaling are enabled by default unless explicitly disabled when you created the cluster.

16. Scaling resources automatically can significantly reduce the performance impact of issues discussed in this skill. However, what happens if the problem affects the entire system? What if the entire cluster is compromised?

17. For example, corrupted data, accidental deletions, and ransomware are all disasters which can be recovered from by restoring from backup data.

18. Let's take a closer look at how to backup and restore with MongoDB Atlas.

19. First, let's click on "Backup" in the lefthand frame. This takes us to the Backup page, where we can see all the databases being backed up, and view their most recent snapshot, when the next snapshot is scheduled to be taken, and the oldest snapshot for each instance.

20. If we click on our cluster, we can see data for all of the snapshots for this cluster, including when they were created, the cloud provider and region, retention period, and frequency of the backup. By clicking on the chevron next to a snapshot, we can get more details, like the cluster type, whether the config server is embedded or dedicated, and the total size of the data that would be restored, if we restored from this snapshot. We can also see the version and encryption key.

21. Beyond your scheduled backup policy, we can create an on-demand snapshot by clicking "take snapshot now". This brings up a modal window which will allow you to set the retention period for the snapshot, and write a description. Click take snapshot, and a message will tell you that an email will be sent when the snapshot is in progress. Here we can see that the snapshot is currently being taken.

22. Remember that with storage auto-scaling enabled, MongoDB Atlas will automatically scale your cluster to ensure that you have enough disk space available to keep your backups functioning and your cluster healthy.

23. Once the snapshot is complete, we can recreate the scenario we discussed at the beginning of this course. Let's "accidentally" drop the entire customers collection. We can confirm that the data is gone by performing a findOne or show collections. Oh no! Our collection is gone!

24. Fortunately, we've been backing up our data, and just happen to have a recent snapshot to restore from. Note that if you're making use of Continuous Cloud Backup, you can also conduct a Point-In-Time restore, which allows you to select a date and time, and will then restore from the most recent snapshot prior to that point, then replay the backed up oplog operations and recreate the changes made since the snapshot to bring your data back to that specific point in time. In our example, we have an extremely recent snapshot, and because it's a test environment, no data has changed since it was taken, so we'll conduct a standard restore.

25. Click on the three dot menu, and then Restore, and a modal window will appear. Here you can specify the target project and cluster you wish to restore to - you might address performance issues by restoring to a different cluster with more compute resources. In this case, we'll restore to the same location, but in a production environment you may wish to restore to a different cluster to reduce downtime, or for other reasons. Type I Agree in the warning field, if you agree. This is here to advise that all existing data will be deleted, as we are restoring the entire cluster.

26. Once the restore has successfully completed, our cluster will be back online, and in exactly the same state it was when it was backed up. We can confirm that the collection and the data therein have been restored by once again using the findOne() method.

27. As you can see, Atlas makes identifying issues simple, with monitoring and alerts. It's also much easier to mitigate and remediate issues with tools like auto-scaling, auto-storage scaling, and the ease of restoring from backups. Having said that, it's of course important to know how to manually check your cluster's performance, and understand what your baseline looks like.

28. If you'd like to know more, please see our other badges, online documentation, and other MongoDB University content. See you next time!
