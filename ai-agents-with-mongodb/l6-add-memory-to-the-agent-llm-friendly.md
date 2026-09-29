---
title: Add Memory to the Agent
lesson_number: 6
skill: building-ai-agents-with-mongodb
kind: video_script
word_count: 1187
date_updated: 2025-05-15
learning_objectives:
  - Define what short-term and long-term is for AI-agents
  - Implement short-term memory for AI-agent using MongoDB
  - Distinguish the difference between short-term and long-term memory for AI-Agents
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/ai-agents-with-mongodb
  lesson: https://learn.mongodb.com/learn/course/ai-agents-with-mongodb/ai-agents-with-mongodb/add-memory-to-the-agent
---

1. One of the most powerful features we can give our agent is the ability to remember. Whether it's recalling the current conversation or past interactions, memory capabilities dramatically enhance how an agent understands and responds to queries.
2. In our previous work, we configured state - which represents the current workflow information. Memory works alongside state to create a more coherent experience. While state handles immediate processing needs, memory provides continuous context across multiple interactions.
3. Think of it like the difference between what you're actively thinking about right now versus what you've stored away but can recall when needed.
4. In this lesson, we'll explore what memory means in the context of AI agents. Then, we'll implement memory capabilities into our agent using MongoDB as the storage layer. This will allow the agent to maintain conversation context and respond intelligently to follow-up questions.
5. Let's begin by understanding the different types of memory agents can use.
6. When we talk about memory for AI agents, we're talking about how they store and recall information across time. Just like humans, agents need different types of memory to function effectively.
7. Memory for AI agents generally falls into two categories: short-term and long-term memory.
8. Short-term memory refers to the storage of information that's relevant for immediate use. This allows the agent to maintain context within a single interaction or session. For example, when you ask a follow-up question like "What about that first option?", short-term memory helps the agent understand what "that first option" refers to.
9. Long-term memory, on the other hand, involves storing information persistently across multiple interactions or sessions. This enables the agent to learn from past experiences and maintain continuity over time. Long-term memory might include user preferences, previous conversation summaries, or records of actions taken days or weeks ago.
10. Both types of memory are important for creating agents that feel natural and helpful. Without memory, an agent would treat each message as if it were the first interaction, lacking the contextual awareness that makes conversations flow naturally.
11. The implementation of memory varies widely depending on the agent's purpose and technical architecture. Some simple agents might only need basic conversation history, while sophisticated agents might require the ability to store detailed interaction records and learned behaviors.
12. For our agent, we'll implement short-term memory so that it can maintain context throughout a conversation within the same session. This will enable the agent to handle follow-up questions or elaborate on past responses naturally.
13. To give our agent the ability to remember, we'll employ `LangGraph's` `checkpointer API`, utilizing MongoDB to store the memory. Within `LangGraph`, a `checkpointer` captures the state of the graph at each iteration of the nodes.
14. For this, we need to import the MongoDB saver from LangGraph in the main.py file.
15. Next, we'll update the `init_graph` function to include the `checkpointer`. Since we're using MongoDB as the memory store, we need to pass in the MongoDB client. Now you might be wondering if we need to create a database and collection to store this data. LangGraph automatically does this for us, and after we build the memory functionality, we'll review the data stored in MongoDB. As you can see, we've added the `MongoDBSaver`. This creates a `checkpointer` using the MongoDB client.
16. Once we've set up the checkpointer, we need to provide a thread_id every time we execute the graph. This thread_id acts as an identifier for the conversation session, allowing the agent to access previous messages from the same session. In an application, a session ID is a suitable choice for a thread ID. This is because it corresponds to an active exchange between the user and the agent. When the user ends the session, the conversation is over.
17. To track the thread id in our demo, we need to update the `execute_graph` function to receive the thread_id. Next, we create a config variable that holds the thread_id. Finally, we’ll pass in the config along with the user’s input every time we initiate our graph.
18. Finally, we need to get back to our main function to update the `init_graph` method call, providing the `mongodb_client`, properly configured to access our cluster.
19. Let's see how our main function looks with the changes to init and execute functions. Here, we’ll pass in the MongoDB client as the final argument.
20. In addition to updating `init_graph`, let's also update `execute_graph`by passing in the `thread_id`. We’re hard-coding the thread id for demonstration purposes. In a production application, this would likely be a session id generated when the user enters the chat. Last, let’s update the query to something that will test the agent's memory. First, we’ll ask about MongoDB Backups, and then we’ll ask a follow-up question - "What did I just ask you?" to make sure the agent remembers.
21. Now that we've implemented short-term memory in the agent, let's test if it's working as intended.
22. When we run the code, we should see the agent answering the first question about MongoDB backup best practices. And then we confirm that the agent remembers our original question when we asked "What did I just ask you?" It responds stating that we asked about backup best practices in MongoDB. It's able to do this because it can leverage the thread ID in conjunction with our MongoDB database.
23. As we can see, the agent correctly remembered the previous question. This demonstrates that the short term memory implementation is working as expected.
24. Let's take a quick look at what's being stored in the MongoDB database. The `LangGraph` `checkpointer` automatically creates a database and collections for us. We have the `checkpoints` and `checkpoint_writes` collections in a database called `checkpointing_db`. The documents in these collections store conversation history and agent state. Each document is associated with a specific thread ID, which is how the agent knows which conversation context to load when responding to a query.
25. This is the power of using MongoDB as a memory store - our agent's memory persistence is handled seamlessly behind the scenes, allowing continuous conversations to feel natural and contextually aware.
26. What we've built together is just scratching the surface of what's possible with AI agents and MongoDB. We've implemented short-term memory, allowing our agent to maintain context throughout a conversation session. But this foundation opens the door to more advanced capabilities.
27. I encourage you to build on this example. You might want to try implementing long-term memory or adding another specialized tool to your agent, such as a tool for monitoring database metrics. Each new tool you add expands your agent's capabilities and makes it more versatile in responding to different types of queries.
28. Before we go, let's recap what we've learned in this lesson:
29. First, we examined the role of short term and long term memory for AI agents. Then we implemented short-term memory in our agent using LangGraph's checkpointer API. We configured MongoDB as our memory store, which allows the agent to recall previous messages within the same conversation. By updating the code to support thread IDs, we created a way to identify specific conversation sessions.
30. Our testing confirmed that the agent can remember previous questions and maintain conversation context, making interactions more natural.
