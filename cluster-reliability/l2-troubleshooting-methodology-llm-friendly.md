---
title: Troubleshooting Methodology
lesson_number: 2
skill: cluster-reliability
kind: video_script
word_count: 879
date_updated: 2025-06-24
learning_objectives:
  - Apply the Identify → Mitigate → Remediate methodology to cluster issues
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/cluster-reliability
  lesson: https://learn.mongodb.com/learn/course/cluster-reliability/cluster-reliability/video-troubleshooting-methodology
---

1. Imagine this: you're a database administrator for a successful e-commerce platform. In the middle of a major sale, customers experience delays in order confirmations.

2. You've also received an alert, letting you know that the number of active connections to your database has exceeded 80% of the configured maximum. Although you anticipated increased traffic, it looks like your sale has attracted more customers than you expected.

3. When a situation like this arises, it's important to have a good understanding of your cluster's baseline performance, so you can identify the cause. It's also important to have a plan in place for various contingencies, so when something happens, you know what to do.

4. In this video, we'll explore a troubleshooting methodology which involves identifying issues, mitigating their effects, and remediating your cluster, allowing you to resolve the issue, and prevent it from happening again.

5. The first step to resolving an issue is to correctly identify that issue. To do this, we must make observations and compare our cluster's behavior and metrics against our baseline of expected performance.

6. In our example, we already have some clues. We know that something is causing delays in order confirmations. We also have an alert telling us that we have exceeded a limit we set for connections, and we know this incident is coinciding with our sale.

7. All of this, taken together, paints a picture: our sale has attracted more traffic than we anticipated, and even though we prepared, we were caught off guard, and our cluster isn't currently able to handle the increase in traffic. Let's get to the bottom of this, so we can resolve it swiftly.

8. We know that replication lag can cause latency in application response times, depending on write concern settings. We also know that alerts, metrics, and log files can provide helpful details to assist us in identifying the cause of an issue. Especially if we have a good idea of what time frame to examine. Let's take a look.

9. We'll start by checking alerts. We'll open Ops Manager and find our project. We can see there is 1 active alert, which makes sense, since we received an email alerting us to the number of connections. We'll click here and take a closer look. As expected, we see the alert that was brought to our attention via email. There are no other alerts, but if there were, we'd want to carefully look through them and see if anything else might be going on.

10. Next, let's click on our replica set, and then metrics, to gather more information. Based on the symptoms we're experiencing - lag in response time for our application, and alerts for high numbers of connections, we know that replication lag is one likely cause. So let's click on Replication Lag to add that chart to our metrics page. Looking at our chart, the lag is significant, and there's a clear upward trend.

11. We also find our primary server is experiencing high CPU and memory usage, as well as page faults.

12. We've identified a likely culprit - replication lag, caused by a sudden increase in workload. How can we mitigate the impact to our application, and remediate our cluster to resolve the issue, and ensure it doesn't reoccur?

13. To mitigate the impact on our application's performance, we should vertically scale our cluster to handle the increase in traffic. This will result in a decrease in replication lag, which in turn will reduce the delay in order confirmations.

14. After the sale is over, we can analyze the traffic patterns and use them to create a new baseline for future sales events.

15. Ok, so now, how can we remediate our cluster, and ensure this issue doesn't happen again?

16. We've vertically scaled our cluster to deal with the immediate issue, but we need to analyze our long-term needs and remediate our cluster based on deeper analysis.

17. We should create new projections and traffic estimates, based on the data we gather from the incident. Whether we choose to further scale vertically, by adding compute resources to our nodes, horizontally, by sharding the cluster, or both, will depend on our workload and data set.

18. If we're self-managing our cluster, we'll want to preemptively scale by a larger amount when we anticipate increased traffic in the future. If we're hosting our cluster on MongoDB Atlas, we can use Atlas' auto-scaling features to help manage scaling for us. We'll discuss auto-scaling and other Atlas features in more detail later in this skill.

19. We can also create custom alerts for CPU and Memory usage, or network connections, with a lower threshold, to be alerted if the workload starts to tax our replica set again. This way we will be able to detect changes to our workload and scale the cluster before performance is impacted.

20. Let's quickly recap what we've learned. When troubleshooting issues with your cluster, you should first identify the issue and its probable cause, then take steps to mitigate the impact to your cluster's performance and your user experience. Finally, take the appropriate steps to remediate your cluster and resolve the issue permanently, to prevent it from happening again.

21. Great work! Now that you have a firm grasp of this troubleshooting methodology, you'll be able to apply it to any issues you may encounter. See you in the next video!
