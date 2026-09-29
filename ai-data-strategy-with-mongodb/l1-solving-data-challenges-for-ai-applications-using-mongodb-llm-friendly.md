---
title: Solving Data Challenges for AI Applications Using MongoDB
lesson_number: 1
skill: ai-data-strategy-with-mongodb
kind: video_script
word_count: 1321
date_updated: 2025-12-09
learning_objectives:
  - Identify and describe Retrieval Augmented Generation (RAG) and AI Agents, explaining how they differ from traditional rule-based systems through autonomous decision-making and adaptive learning.
  - "Evaluate three data infrastructure requirements for building AI applications: managing diverse data types, enabling intelligent retrieval, and supporting real-time processing."
  - Explain how unified data platforms address AI challenges by integrating multiple data types, search capabilities, and real-time processing in a single system to reduce complexity and improve development speed.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/ai-data-strategy-with-mongodb
  lesson: https://learn.mongodb.com/learn/course/ai-data-strategy-with-mongodb/ai-data-strategy-with-mongodb/solving-data-challenges-for-ai-applications-using-mongodb?page=1
---

1. Imagine asking an application to analyze a photo of a damaged car bumper and instantly estimate repair costs. Or having it book your vacation while coordinating everyone's schedules. Traditional applications can’t do this—they are limited to predefined rules with no learning or adaptation.
2. Today's AI applications are fundamentally different. An AI-powered application consists of software that uses deep learning models that learn from data, recognize patterns, understand context, and make autonomous decisions. Instead of rigid if-then logic, these applications reason, learn, and improve over time.
3. Why build AI applications? Organizations build AI applications to improve efficiency through complex task automation, enhance decision-making with data insights, and deliver personalized experiences across industries like healthcare, finance, and insurance.
4. In this video, we'll examine two AI techniques - Retrieval Augmented Generation (RAG) and AI Agents. We’ll then explore three key data requirements that enable operational agility for these modern AI systems.
5. Let’s start with RAG. It combines large language models with your proprietary data sources. When a user asks a question, the application finds relevant information from your database and uses it to generate an accurate, context-aware response.
6. For example, a customer support chatbot can reference your latest documentation, previous support tickets, and product usage data to provide personalized responses.
7. The second technique is AI agents. These are autonomous applications that perform complex tasks by making adaptive decisions and taking actions on your behalf. Imagine an agent fully processing insurance claims, from gathering data and analyzing damage to generating settlement recommendations, all without manual intervention at each step. We can also take agents further by creating agentic systems which use multiple agents to perform large complex tasks.
8. Whether you're developing RAG applications or AI Agents at your organization, you're probably wondering - Can we build this, is it secure, and how fast can we do it? The answers depend entirely on your data foundation. Without the right data infrastructure, even the most sophisticated AI models can't deliver value.
9. To successfully build and scale advanced AI applications, organizations must first resolve three key data infrastructure requirements— that surpass the capabilities of traditional databases. To be successful, your solution will need to manage diverse data types, enable intelligent retrieval, and perform real-time processing.
10. Let’s dive into the first challenge of working with diverse data types
11. Both RAG and AI Agents need to work with various data types simultaneously: structured data (like customer records), unstructured data (like text, images, audio), and vector embeddings.
12. The complexity arises when these data types are stored separately, but they need to be handled together efficiently.
13. For example, an insurance claim might include policy data, text descriptions, damage photos, and embeddings that capture the meaning of all this information.
14. If these live in different databases, your AI agent must orchestrate queries across multiple systems, wait for synchronization, and handle inconsistencies when data gets out of sync. This architectural complexity slows development and increases the risk of errors.
15. MongoDB solves this problem with its flexible document model.
16. A single MongoDB document can natively include all these data types—structured records, unstructured data, and vector embeddings—in one place.
17. This unified storage approach eliminates the need for separate systems, simplifying your architecture. Your application accesses all related data in a single query. This reduces network calls and latency, and removes data synchronization issues.
18. The second AI application requirement is intelligent retrieval. Both RAG and AI agents rely on sophisticated search capabilities to find the right information at the right time.
19. This requires both lexical search, which is exact keyword matching, and semantic search, which identifies results based on their meaning.
20. For AI to access the semantic meaning of your data, you'll need embeddings. Embeddings are numerical representations of text, images, or other data, converted into vectors by specially trained embedding models. In this vector space, data with similar meanings (like “car accident” and “vehicle collision”) are located closer together.
21. Vector search uses these embeddings to find similar items. When a user asks about backup strategies, vector search retrieves relevant documentation, like disaster recovery, even without exact keyword matches. This ability to search by meaning, not just keywords, is what makes RAG applications work.
22. Reranking improves the quality of results using additional computing. After vector search retrieves relevant data, a re-ranking model scores and reorders the data for the best fit to the specific query. The most relevant information appears first.
23. This two-stage approach, broad retrieval followed by focused refinement, provides the precise information needed by RAG applications and AI agents.
24. These sophisticated retrieval capabilities enable another critical feature: memory. By storing past interactions as embeddings and using vector search, AI applications can recall relevant previous conversations.
25. Separating these capabilities with operational data in one database, vectors in another, and search in a third, creates integration and maintenance overhead. Synchronization becomes a major engineering challenge, slowing development and increasing latency.
26. MongoDB solves this by unifying Search and Vector Search in one platform. You can store your vector embeddings directly alongside your operational data in MongoDB documents, eliminating synchronization concerns.
27. V1: Simplifying retrieval even further, embedding and re-ranking models from Voyage AI by MongoDB will soon enable automatic embedding generation and refinement of search results directly within Atlas. V2: Simplifying retrieval even further, embedding and re-ranking models from Voyage AI by MongoDB enable automatic embedding generation and refinement of search results directly within Atlas.
28. Another way to improve the accuracy of your results, MongoDB also offers hybrid search, which combines traditional keyword-based text search with semantic vector search.
29. Beyond high quality retrieval, you can store memory, like conversation history and agent state, in the same MongoDB database. This gives AI applications instant, contextual access to past interactions.
30. The third AI application requirement is real-time processing. AI agents must respond immediately to new data to deliver on truly autonomous action.
31. Traditional batch processing approaches are insufficient for these dynamic AI agents. Your infrastructure must support event-driven workflows where applications respond to data changes as they happen.
32. MongoDB addresses this with Change Streams and real-time processing, which allow your application to receive an immediate notification whenever data is inserted, updated or deleted.
33. This enables event-driven AI workflows where your system can instantly respond to new information without constantly polling the database. Then your AI agents are always working with the most current data.
34. Great job, let's recap what you've learned. Applications have evolved from simple rule-based systems into intelligent platforms that reason, learn, and act autonomously.
35. Two common AI approaches RAG and AI agents share three data requirements that traditional databases struggle to handle.
36. The first requirement is the ability to manage diverse data types including structured data, unstructured data and vector embeddings together in one place. The second is intelligent retrieval which is the need for integrated semantic search, lexical search, embeddings, and reranking. And, finally, real-time processing which is the need to instantly react to changes through event-driven workflows.
37. Your data architecture determines whether you can build AI applications quickly and securely. MongoDB supports a unified AI and data strategy because our document model handles all data types in one place; our integrated Search, Vector Search, and Voyage AI models enables intelligent retrieval. And Change Streams support real-time data processing. Together, these capabilities eliminate integration overhead and lets your team focus on building intelligent features instead of managing infrastructure complexity.
