---
title: Get Started Quickly with Atlas Ephemeral Clusters
lesson_number: 0
skill: atlas-ephemeral-clusters
kind: video_script
word_count: 817
date_updated: 2026-09-29
learning_objectives:
  - Describe Atlas Ephemeral Clusters and identify the development and AI-agent workflows they support.
  - Explain how to provision an ephemeral cluster and handle its connection details securely.
  - Distinguish the active, paused, claimed, and deleted lifecycle states and the actions available in each state.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link: 
    course: https://learn.mongodb.com/courses/ephemeral-clusters
---

1. Imagine an AI coding agent building an application for you. It has generated the data model and written the application code, but then it reaches a familiar barrier: the application needs a database, and creating one requires a browser signup flow that the agent cannot complete on its own.
2. Atlas Ephemeral Clusters address that gap. They give developers and coding agents a temporary MongoDB Atlas cluster through a programmatic request, so development can begin before someone completes the standard Atlas registration flow.
3. In this video, you'll learn what Atlas Ephemeral Clusters are, how to create and claim one, how their lifecycle works, and which security and product boundaries you need to consider before using them.
4. An Atlas Ephemeral Cluster is a temporary Atlas Free (M0) cluster. One unauthenticated API request returns cluster details, a connection string, an expiration time, and a unique claim URL.
5. No Atlas login, API key, or organization is required for that initial provisioning request. This removes the human registration step from the beginning of a development workflow while preserving a path for a person to take ownership later.
6. This flow is designed for development and testing. It works well when an autonomous coding agent needs a database while completing a task, or when a developer works with an AI coding agent on a new project or prototype.
7. A developer can also use an ephemeral cluster to test an idea before deciding whether to keep the cluster.
8. Provisioning begins with a POST request to the Atlas ephemeral-cluster endpoint: `/api/atlas/v2/unauth/ephemeralClusters:create`. The request uses the Atlas preview media type and can include a JSON payload with a cluster name.
9. A successful request returns HTTP status `201`. The response includes the claim URL, cluster ID, connection string, `expiresAt` timestamp, current status, and terms-of-service notice.
10. Treat the `connectionString`, `claimUrl`, and `clusterId` as secrets. The connection string allows read and write access to cluster data, the claim URL allows someone to claim the cluster, and the cluster ID can be used to retrieve the claim URL.
11. Save all three values in a secure location where the person who will claim the cluster can retrieve them.
12. The create response reports the cluster's status. When the cluster is active, connect to it using the returned connection string.
13. The `expiresAt` field tells you when an unclaimed cluster is expected to pause, two days after creation. It is a pause timestamp, not the deletion deadline.
14. To keep the cluster, a human must open its unique claim URL and sign in to Atlas or create an account. The claim URL is valid for seven days after cluster creation.
15. Before the cluster is claimed, it allows connections from any IP address through `0.0.0.0/0`. During claiming, you can remove that rule and allow only your current IP address.
16. The connection string authenticates as an automatically generated database user with read and write access to the cluster.
17. Restrict IP access during claiming when appropriate. You can also restrict it later in the project's Network Access settings.
18. Claiming converts the ephemeral cluster into a standard Atlas Free cluster with no expiration date. It keeps its data and the connection string continues to work with the same credentials.
19. If the cluster reaches `expiresAt` without being claimed, Atlas pauses it. A paused cluster is inaccessible until it is claimed.
20. The cluster's claim URL is valid for seven days after creation. Claiming it converts the cluster into a standard Free cluster.
21. If it is not claimed within seven days after creation, Atlas deletes the cluster.
22. Keep the lifecycle boundaries distinct: Atlas pauses an unclaimed cluster after two days and deletes it after seven days.
23. An unclaimed ephemeral cluster uses the Free (M0) tier in AWS `us-east-1`. Until you claim it, you cannot scale its tier, add database users, restrict IP access, or perform other administrative operations.
24. After claiming, you can manage the cluster through Atlas and scale it to a higher tier.
25. Before choosing this flow, consider whether a temporary cluster meets the project's needs, whether the workflow can protect the returned secrets, and whether a human can claim the cluster within seven days if it needs to remain available.
26. Remember an ephemeral cluster provides a temporary Free database for development, testing, or prototyping. A human can claim it to keep it as a standard Atlas Free cluster.
27. You now know how to create and connect to an Atlas Ephemeral Cluster, how a human can claim it, and how its two-day pause and seven-day deletion timeline works.
28. Remember that an unclaimed cluster uses M0 in AWS `us-east-1`, allows connections from any IP address, and is paused after two days and deleted after seven days. Protect the `connectionString`, `claimUrl`, and `clusterId`.
29. Finally, an agent can create and connect to the cluster without an Atlas account or API key. A human must sign in to Atlas to claim it.
30. Great job! You now have a solid understanding of ephemeral clusters in MongoDB Atlas.
