---
title: Building an App with Code Agents and MongoDB
lesson_number: 1
skill: building-an-app-with-code-agents-and-mongodb
kind: video_script
word_count: 1135
date_updated: 2026-06-24
learning_objectives:
  - Identify the MongoDB Agent Skills and MCP Server used throughout the Builder Badge lab and describe how they work together to support AI-assisted development.
  - Describe the Builder Badge lab scenario and outline the four tasks required to move an MVP e-commerce application toward production quality.
  - Apply best practices for working with non-deterministic AI agents to complete tasks involving schema design, query optimization, vector search implementation, and production observability.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/building-an-app-with-code-agents-and-mongodb
  lesson: https://learn.mongodb.com/learn/course/building-an-app-with-code-agents-and-mongodb/building-an-app-with-code-agents-and-mongodb/overview-of-building-an-app-with-code-agents-and-mongodb
---

1. Proof of concept apps are built quickly to validate an idea, with collections that weren't carefully designed and queries that were written to get the job done rather than to perform well. Getting from that point to something you'd confidently put in front of real users takes a lot of effort.

2. What's changed is how fast you can get there. AI coding agents can now take on the heavy lifting that used to take days.

3. But speed alone isn't the goal. The real skill is knowing how to work with these agents effectively: prompting them well, evaluating what they surface, and making decisions you can stand behind.

4. In this skill badge, you'll do exactly that. You'll take an e-commerce app that was built quickly and use MongoDB Agent Skills to evaluate, improve and build on it. As you do this, you’ll  build the habit of reviewing, documenting, and defending your decisions along the way. Let’s get started.

5. The app you'll be working with is an e-commerce store that sells tech equipment. It was vibe-coded in order to create a MVP quickly. The collections weren't carefully designed, queries were written for speed rather than performance, and there is an opportunity to implement an AI feature that will make it easier for customers to search for products. It works, but it's not ready for scale.

6. Your job is to change that. You'll use MongoDB Agent Skills to improve it step by step, making the kinds of decisions a developer would make when moving from "shipped" to "solid."

7. You have four tasks to complete in this skill badge, and each one builds on the last. First  you'll work with the MongoDB Schema Design agent skill to evaluate and improve the app's data model and schema design.

8. The team that vibe-coded the app created six collections: orders, order_items, users, brands, categories, and products. None of these were designed with access patterns or best practices in mind.

9. You'll use the MongoDB Schema Design agent skill to analyze the current schema and propose alternatives. Schema design rarely has one correct answer, but you'll want to watch out for anti-patterns like unbounded arrays and bloated documents, and think carefully about where to embed or reference data. What matters is that you evaluate the options, choose one that fits your needs, and record your thought process at the end.

10. For the second task, you'll shift to query optimization. Now that you have a schema design in place, you’ll diagnose slow queries and implement targeted improvements using the MongoDB Query Optimizer agent skill.

11. The original queries were written without performance best practices in mind, and they weren't designed for the optimized schema you built in task 1.

12. You'll use the agent to analyze existing queries and propose improvements like adding indexes, restructuring queries, and reducing unnecessary data retrieval. Your job is to evaluate the options the agent presents, for example, considering the tradeoff between index overhead and read speed. Once you choose an approach, you’ll document your reasoning.

13. For the third task, you'll add a semantic search feature using MongoDB Vector Search, so users can search by meaning rather than just keywords.

14. You’ll use the MongoDB Vector Setup agent skill to create a vector search index on embedding fields and write the queries needed to search those embeddings. You don't need to have experience using MongoDB Vector Search to accomplish this task. The agent makes the implementation decisions and writes the code. Your job is to review the output, test it, and confirm it works as expected.

15. At the end of each of the first three tasks, you'll respond to prompts in the provided project notes file to record your decisions.

16. Record what you prompted the agent to do, what the agent recommended, what you accepted, what you changed, and why. This is an important step because developing that habit of reviewing, refining, and documenting is one of the core skills this badge is designed to build.

17. That documentation also sets you up for the final task: planning for production observability.

18. You'll use the agent to analyze the final state of the application and the documentation you produced as you developed the app. It will then identify items to track as the app grows in production. This step is crucial because shipping is not the finish line. A production-ready app requires visibility into how that code is performing.

19. Without observability, you won't know if your schema changes improved read performance, whether your indexes are actually being used, or when something quietly starts to degrade.

20. Before you dive in, here are a few things to know about the tools you'll be working with throughout this badge. The first is the MongoDB MCP Server, or Model Context Protocol Server. MCP is an open standard for connecting AI agents to external tools and data sources.

21. The MongoDB MCP server is the connectivity layer between your AI coding agent and your MongoDB deployment, allowing your agent to interact with your database directly, completing tasks like querying schemas, analyzing indexes, and inspecting collections, in plain language. The MongoDB agent skills used in this course rely on the MongoDB MCP server, which is already set up in your lab environment and ready to use.

22. You'll also use agent skills to complete each part of the skill.

23. The MongoDB Schema Design agent skill helps you evaluate your data model, identify anti-patterns, and propose alternatives. The MongoDB Query Optimizer agent skill analyzes your queries, flags performance issues, and suggests improvements. The MongoDB Vector Setup agent skill handles the implementation work for adding vector search to your application — setting up indexes, configuring embeddings, and wiring everything together.

24. It's important to know that these agents skills are non-deterministic. That means they may give you different recommendations each time you run them, and, with tasks like data modeling or query optimization, there often isn't one single correct answer.

25. Think of each agent skill as a knowledgeable collaborator that can suggest solutions, make changes, and answer your questions about MongoDB along the way. Use them to analyze, propose, and explain tradeoffs.

26. But it doesn't know how your priorities or constraints evolve over time. You do. Your job throughout this skill is to engage with the agent’s output critically. Read the output, weigh the options presented to you, challenge anything that doesn’t fit, and make a decision you can defend and explain. That is not a passive role. The agent gives you options; you give them meaning.

27. You now have the full picture: an POC app that needs work, a list of improvements that will move the app towards production quality, and a set of AI agents to help you get there. The agents will generate options. You'll evaluate them, make calls, and document your reasoning. Good luck!
