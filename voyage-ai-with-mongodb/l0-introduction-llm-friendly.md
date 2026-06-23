---
title: Introduction - Getting Started with Voyage Models with MongoDB
lesson_number: 0
skill: voyage-ai-with-mongodb
kind: video_script
word_count: 390
date_updated: 2026-06-18
learning_objectives:
  - Understand Vector Embeddings. Develop a baseline understanding of embeddings and their related concepts in the context of application development.
  - Use Voyage AI Embedding Models and Rerankers. Use an appropriate Voyage AI embedding model and reranker.
  - Automate embeddings and rerank search results with MongoDB and Voyage AI. Leverage the MongoDB and Voyage AI integration to automate the embedding-generation process and implement reranking to improve search result relevance.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/voyage-ai-with-mongodb
  lesson: https://learn.mongodb.com/courses/voyage-ai-with-mongodb
---

1. Hey there! My name is [Instructor Name] and I'm a [Role] at MongoDB. Welcome to Getting Started with Voyage AI with MongoDB.

2. In this Skill badge, we're going to explore one of the most exciting areas in modern application development: semantic search powered by vector embeddings.

3. Whether you're building a product recommendation engine, a document retrieval system, or a Retrieval Augmented Generation application, this Skill badge gives you the building blocks to get there.

4. Traditional search relies on matching exact keywords. A user searches for "something to wear in cold weather," but the most relevant product listing describes a "thermal insulated jacket" — without using those exact words. Keyword search would miss this entirely.

5. Vector embeddings bridge that gap. They turn data into numerical representations that capture meaning, so your search system can find relevant content even when the keywords don't match.

6. Combine that with MongoDB's vector search capabilities, and you have the foundation for a search pipeline that understands intent.

7. This Skill badge is organized into seven lessons.

8. We start with the foundation: what vector embeddings are, how embedding models generate them, and how to use them to perform semantic search.

9. From there, we'll store and search embeddings in MongoDB. We'll highlight a few ways to do this, including MongoDB's auto-embedding feature, which handles embedding generation automatically as data is added.

10. Next, we cover reranking. You'll learn how reranking models differ from embedding models and when to add one to your pipeline. Then we'll put it into practice, applying Voyage AI's reranker to a real set of results and watching the most relevant document rise to the top.

11. The final three lessons focus on model selection and basic parameters. We'll cover the quality-versus-latency tradeoff across Voyage AI's model sizes, how to handle long documents using chunking, and how to manage storage at scale using embedding dimensions and quantization.

12. By the end of this Skill badge, you'll understand how vector embeddings work, how to store and search them in MongoDB, and how to use Voyage AI's embedding models and rerankers to build a search pipeline that surfaces the most relevant results.

13. You'll learn through detailed videos and a hands on lab. When you're done, take a short skill check to demonstrate your knowledge. Pass it, and you'll earn an official Credly badge to share on LinkedIn. Let's get started!
