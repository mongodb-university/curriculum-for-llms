---
title: Restoring Data From Backup
lesson_number: 7
skill: cluster-reliability
kind: video_script
word_count: 1610
date_updated: 2025-06-30
learning_objectives:
  - Identify issues with backups before needing to restore
  - Select an appropriate backup schedule/recovery strategy
  - Test backups to ensure they are usable in the event of disaster
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/cluster-reliability
  lesson: https://learn.mongodb.com/learn/course/cluster-reliability/cluster-reliability/video-restoring-data-from-backup
---

1. Throughout this skill, we've discussed various issues you may encounter, and the ways that you can mitigate their impact and remediate your cluster to resolve them. But what do you do if something occurs that you cannot fix?

2. Imagine this: you're trying to remove some documents which are no longer needed, and you begin to write out a deleteMany() query. Your terminal auto-completes the parentheses.

3. You move your hand to hit the backspace key, but suddenly someone bumps into you, moving your arm forward, and your finger hits the Enter key! You have just asked MongoDB to delete every document in the collection.

4. You move quickly, trying to see if you can stop replication, but it's a low latency environment and a low traffic period, and nothing else is queued in the oplog. The operation replicates swiftly to your secondary nodes, and your replica set does its job, faithfully reproducing the write operation on each node. There's nothing to roll back, because this was a logical delete operation which has been replicated successfully.

5. That's why backup and recovery are so important! Sometimes our database may suffer from unexpected events, like attacks, bugs, hardware or network issues, and we need to be ready to restore our data quickly. This scenario might sound a little far-fetched, but this kind of thing does happen.

6. In this video, we'll discuss backup strategies, best practices for configuring backups, how to troubleshoot backups, and how to restore. Let's get started!

7. When planning your backup strategy, you have 3 options: continuous backup, file system snapshots, or using command line tools like mongodump and mongorestore Let's discuss the pros and cons of each so you can select the right strategy for your use case.

8. For most production environments, Continuous Backup on Ops Manager or Cloud Manager, or Continuous Cloud Backup on MongoDB Atlas will be the best choice. This approach allows for Point-in-Time recovery, where you can select a snapshot and then recreate recorded write operations in the oplog to bring your cluster back to a specific point-in-time. Importantly, this method is supported by MongoDB, and continuous backup is easy to schedule and monitor with Ops Manager, Cloud Manager, or Atlas. While this option is strongly recommended, you should be sure to leave enough storage overhead for data migration and groom jobs. We'll discuss those in more detail a little later.

9. Another option is to back up via file system snapshots. This approach can be fast, and it's typically reliant on functionality that's native to the operating system you're using. On the other hand, file system snapshots require you to use db.fsyncLock to lock the system and thus can require significant scheduled maintenance, and they offer no point-in-time recovery options. Perhaps most importantly, file system snapshots are not suited to backing up sharded clusters.

10. We *could* use mongodump and mongorestore. These command line tools are simple to use, allow you to restore to different hardware, and they're available immediately when you install MongoDB. However, this method isn't ideal for replica sets that are under load, it doesn't offer point-in-time recovery, and it can be slow and resource intensive, especially for large data sets. This method is really best suited to development and testing environments.

11. Since it's ideal for applications with strong point-in-time recovery needs, we'll show you how to perform a continuous backup. For additional information on all backup strategies, check out our online documentation, and MongoDB University.

12. Now let's look at the details of managing backups and restoring our data.

13. First, let's talk about backup size. It's best to keep your replica set size to below 2 terabytes if possible. Again, this is a best practice. It's not a practical limitation, but remember, the larger the replica set or shard, the longer it will take to perform a full backup and to restore. If your replica set is larger than 2 terabytes, you should shard the database and ensure that each shard is less than 2 terabytes. Where very rapid restores are required, it can be helpful to consider even smaller replica sets or shards.

14. Restore time, specifically, is something to keep in mind. Restoring from a backup is something you hope you never have to do, but when you have to do it, you certainly want it to complete as quickly as possible.

15. You'll also want to confirm that your network bandwidth and write speed on your backup storage and your replica set are sufficient to allow for fast backup, and fast restore operations.

16. You should ensure that there is enough free space available on your blockstore to allow groom jobs to run. Groom jobs remove unused blocks in blockstores to reclaim storage space. The groom job must first copy all used blocks to a new target blockstore, and update references to the blocks, before dropping the original source database.

17. This means that, in order for groom jobs to be able to run, you'll need to have enough space available on your backup storage location to accommodate two copies of the used blocks, which can be significant. It's a best practice to leave 15 to 25 percent of your disk space available at all times.

18. Finally, be sure to identify potential backup issues by monitoring and confirming your backup activity. Confirm your backups are successful using monitoring tools and logs, and perform test restores to make sure you can restore from your backups.

19. By default, you'll be alerted if a backup has failed - whether you're using Ops Manager, Cloud Manager or Atlas. Be sure to review your backups. While some alerts are transitory, others may indicate a persistent problem. You can always review our documentation or reach out to our support team for help.

20. As I mentioned, you should examine the log files to gain insight into your backup activity. In addition to the mongod and mongos logs, MongoDB also keeps logs for the backup agent. See this slide and the code summary for the default locations of Linux and Windows.

21. You can look in the logs around the time of the failed backup attempt to gain some additional context into what might be causing the issue. If you've identified that there is an issue with your backup, you can take the following steps to resolve it:

22. First, make sure that the MongoDB agent is running on the deployment being backed up. You can confirm this by running ps aux pipe grep mms in a Linux environment. If the agent is not running, you may start it via sudo systemctl start mongodb hyphen mms hyphen automation hyphen agent dot service

23. You should also confirm that the backup daemon is running on the Ops Manager host by navigating to /etc/init.d and running mongodb-mms-backup-daemon status. You can restart the backup daemon by running mongodb-mms-backup-daemon restart, from the same location. Likewise, you can stop the backup daemon with mongodb-mms-backup-daemon stop. And if it's stopped, you can start the backup daemon with mongodb-mms-backup-daemon start.

24. If you've verified that the MongoDB agent and the Backup Daemon are both running and are still experiencing an issue, you should contact Support. Before doing so, download the diagnostic archive for the project in question.

25. To do this in Ops Manager, navigate to the project page, click the three-dot menu at the end of the row for the cluster in question, and select Request Logs. You'll see a modal window which will allow you to choose which logs you'd like to request.

26. Contact MongoDB Support and include the diagnostic archives, and the backup daemon logs - check our documentation for the default log locations for your Operating System.

27. So, you've confirmed your backup is functioning, and now you need to restore data - how can you do this with minimal impact to your application's performance?

28. Restoring an entire cluster is time-consuming. Sometimes, you just want to recover a particular database or collection. While it's not an automated granular restore process, MongoDB does allow you to recover data from a queryable snapshot, and manually write it onto a database.

29. As the name implies, queryable snapshots may be queried to compare data in the snapshots against your current production data. While snapshots are read only, you can use commands like mongodump and mongorestore to copy the collection or database and write it to your cluster. See our online documentation for more details on how to do this.

30. If you need to restore a replica set or an entire sharded cluster, you can navigate to the deployment, then click on Continuous Backup, which will take you to the Overview tab.

31. Select your deployment, then click the three dot menu for the snapshot you wish to restore from. Click Restore. You can choose a snapshot, a point-in-time, or an oplog timestamp. Select the cluster to which you wish to restore - note that if you're conducting a test restore, or you wish to restore with little to no downtime, you can restore to another cluster, rather than your active cluster. Confirm that you agree and finally, click restore.

32. Great job! We've successfully initiated our restore!

33. Let's quickly recap what we've learned here today: Follow the best practices we discussed in this lesson to ensure that your backup functions as intended. Should a restore be deemed necessary, consider what data needs to be restored, and select a restore strategy that best aligns with this goal. If you encounter an issue, ensure that the MongoDB Agent and MongoDB Backup Daemon are running, and contact Support if you need assistance. When contacting Support, gather the project diagnostic archives, backup daemon logs, and agent verbose logs.

34. Great work! We've almost reached the end of this skill. Our final video will be concerned with information specific to users of MongoDB Atlas. See you there!
