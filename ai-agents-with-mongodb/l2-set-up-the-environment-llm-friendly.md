---
title: Set Up The Environment
lesson_number: 2
skill: building-ai-agents-with-mongodb
kind: video_script
word_count: 1209
date_updated: 2025-05-19
learning_objectives:
  - Plan what an AI Agent’s tasks will be and identify the data needed to perform the tasks.
  - Identify and collect data needed for an AI agent
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/ai-agents-with-mongodb
  lesson: https://learn.mongodb.com/learn/course/ai-agents-with-mongodb/ai-agents-with-mongodb/set-up-the-environment
---

1. Just like any other software, AI Agents need the correct data, environment, and dependencies to function properly. Even though they may seem intelligent, AI agents don't work through magic.
2. In this lesson, we'll examine the data our AI agent needs, install the packages needed for the environment, and create the basic scaffolding for the AI agent.
3. To recap, our goal is to build an AI agent that can answer questions about MongoDB and summarize documentation pages.
4. Before writing a single line of code for any AI agent, it's essential to plan what your agent will be doing.
5. There are a few things you need to consider: First, you need to plan the tasks that you want the agent to perform Next, define the data your agent will use: its type, sources, and how it will be processed. Lastly, establish the decision-making logic, outlining the agent's process and the data it uses for decisions. Keep in mind that careful planning results in efficient and effective AI agents that meet their objectives.
6. Okay, let’s start by identifying the kinds of tasks we want our agent to perform. For our agent, we want it to be a MongoDB expert.
7. To achieve this, it needs to be able to answer questions about MongoDB correctly. The agent will use vector search to semantically search the MongoDB documentation and use the returned information to answer questions.
8. Next, we want the agent to summarize particular MongoDB documentation pages. For this, we’ll extract the page title from the user’s query and perform a find query to return the entire doc’s page. Then we’ll use an LLM to summarize the returned page.
9. Now that we know which tasks our agent will perform, let's move on to identifying and collecting the right data. This will determine how effectively our agent can answer user questions.
10. In general, this part of the process most likely requires collaborations across many teams. Since this is a demonstration, I have gone ahead and prepared the data for us. Let’s take a moment to review it.
11. We'll be using two collections within our database: chunked_docs, and full_docs Let's break down the difference between these collections and how they will help us with the tasks we outlined.
12. The chunked_docs collection contains MongoDB documentation that has been split into smaller pieces or chunks. We've chunked the data to ensure the generative model receives the targeted, relevant information it needs to answer a question. The "body" field contains the content of the documentation chunk that'll be used by the model to answer questions. Also notice the "embedding" field at the end - that's a vector representation of the body field’s content, which allows us to perform a vector search.
13. To leverage vector search, we'll need to create a vector search index on the "embedding" field. We're using the voyage-3-lite model, which outputs embeddings with 512 dimensions, but you can use any embedding model you like. Finally, we're using the cosine similarity function to measure similarity.
14. With the vector search index in place we can perform a vector search on chunked docs. Now, what about the full_docs collection?
15. The full_docs collection contains complete, unchunked documentation pages. While it's structured like chunked_docs, it doesn't split the content into smaller chunks and it doesn't contain embeddings. This is important because the full_docs collection will be used when users want a summary of a specific documentation page. For example, if someone asks "Summarize the View Database Access History page," our agent will query for that page by title in the full_docs collection. The full page will be shared with the LLM for summarization. Chunking these documents would hinder effective summarization since we need all the content on the page to summarize it.
16. With these two collections, our agent should have the necessary data to perform its tasks correctly. Now that we have the data, let’s shift our attention to the packages we’re going to use.
17. We will describe our project configuration using a `.toml` file, which is a standard format to describe projects. Under the dependencies array we can see the list of packages. First up, is `LangChain`, the framework that gives the application its structure. Think of it as the backbone that supports all the language model capabilities. Then, to tap into the power of reasoning, we connect `LangChain` with OpenAI's advanced large language models using the `LangChain-OpenAI` integration. This is where the 'thinking' happens. To guide our agent's decision-making and actions, we use `LangGraph` to create dynamic workflows. This allows the agent to respond intelligently to different user inputs. And to give the agent a memory, we use `LangGraph-Checkpoint-MongoDB`. This handy package saves the agent’s state in a MongoDB database, so it can remember past interactions and maintain context across sessions. For seamless interaction with our database, we rely on `PyMongo`, the official MongoDB driver for Python. Finally, to enable the agent to perform a vector search and find relevant information to answer a query, we use `VoyageAI` and its embedding models. These models convert text into numerical representations that help us find the semantic meaning of the query and relevant content.
18. Together, these dependencies will allow our agent to take action. Keep in mind, you’re not limited to these packages. You can use MongoDB in most popular frameworks and libraries for creating agents. Or you can always build your own solution and use it with MongoDB.
19. Once we have all packages installed, we can begin writing the code that will ultimately become our agent.
20. To start, create a file named main.py and import the key_param file with your connection string and various api keys for the models. After that, import pymongo and openai.
21. Now that we’ve imported a couple packages, let's set them up.
22. Create a function below the imports named `init_mongodb`. In this function, we're configuring a connection to MongoDB using the `MongoClient` and the connection string stored in `key_param.mongodb_uri`. We're defining a database name "ai_agents" and getting references to two collections: "chunked_docs" and "full_docs". The function returns three things: the MongoDB client itself, the chunked_docs collection where we'll perform vector search, and the full_docs collection where we'll execute a find query. These will be used by our agent to retrieve the information it needs to answer questions.
23. Finally, let's create the entry point for our application.
24. For this, we’ll create a new function named main at the bottom of our file. Inside this function we’ll call the `init_mongodb` function to establish connections to our database and collections. This gives our agent access to the information it needs. Next, we initialize the language model that will power our agent's reasoning capabilities. We're using OpenAI's GPT-4o model but you can use whichever model you prefer.
25. Keep in mind that the main function is still incomplete - we'll be adding more functionality to it in future lessons as we build out our agent's capabilities. This is just the starting point.
26. Awesome job! Let's take a moment to recap what we've covered. First, we planned the agent's data needs, focusing on the chunked_docs for vector search and full_docs for summarization. After that, we reviewed the vector search index that will enable our agent to perform a vector search on the documents in the chunked_docs collection. Next, we reviewed the packages we’ll be using to build our AI Agent. Finally, we set up the basic structure of our application that we’ll be using throughout this skill.
