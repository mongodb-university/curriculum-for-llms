---
title: Lesson 3 - What are Rerankers?
lesson_number: 3
skill: voyage-ai-with-mongodb
kind: video_script
word_count: 656
date_updated: 2026-06-18
learning_objectives:
  - Understand what reranking models are and how they work.
  - Distinguish between the use cases for vector search and reranking, and understand how they complement each other in a search pipeline.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/voyage-ai-with-mongodb
  lesson: https://learn.mongodb.com/learn/course/voyage-ai-with-mongodb/voyage-ai-with-mongodb/what-are-rerankers
---

1. As we have seen, semantic search offers advantages over purely lexical search. Reranking models, or rerankers, can further refine embedding-based search and produce even more accurate results.

2. In this video, we will explore what reranking models are, how they differ from embedding models, and how they can be used to refine vector search.

3. So what exactly is a reranking model? A reranking model takes the query and a candidate document together as a single input and directly predicts a relevance score. Because the model processes the query and the document at the same time, it can pick up on subtle relationships and nuances between them, giving it a deep understanding of how well a specific document matches a specific query. This joint processing makes rerankers more precise.

4. Embedding models work differently. They encode the query and each document independently into vector embeddings, and then we measure the proximity between those vectors using a similarity metric like cosine similarity or dot product.

5. This independence offers an advantage at scale. It allows document embeddings to be precomputed and stored before query time. When a search query arrives, we only need to embed the query and compare it against the stored document embeddings. A vector-capable database, like MongoDB, can store these precomputed embeddings and index them for efficient nearest-neighbor search.

6. However, because the query and documents are encoded separately, embedding models can miss the subtle relevance signals that a reranker would catch. Evaluating the query and document at the same time is more computationally expensive, and it does not allow for precomputation and indexing ahead of time. This means it does not scale well to millions or billions of documents at query time.

7. So instead of choosing one over the other, we combine both into a two-stage retrieval process. Vector search handles the first stage, quickly narrowing millions of documents down to a manageable set of candidates. Then the reranker handles the second stage, potentially reordering that smaller set based on a deeper understanding of relevance. This two-stage approach gives us the speed of vector search with the precision of reranking.

8. One more thing worth noting: rerankers are not limited to supporting vector search. They work on the raw text of the query and candidate documents, so they can rerank results from any upstream retrieval system — whether your candidates came from vector search, keyword search like BM25, or a hybrid of both. The reranker doesn't care where the candidates came from. It scores each one against the query.

9. Now that we understand what rerankers are, when should you use one? The short answer is: when the accuracy of your top results matters more than latency or cost.

10. If you have a moderate candidate set and you care about the correctness and ordering of the top five to ten results, a reranker is a great addition to your pipeline.

11. This is especially true in retrieval-augmented generation, or RAG pipelines, agent workflows, and high-stakes domains like legal, medical, or financial search — where surfacing the right few passages directly impacts the quality of the final answer.

12. It is also worth keeping in mind that adding a reranker introduces complexity to your architecture. You are now managing two models and the interaction between them. So it is important to weigh the benefit of improved relevance against the added cost and complexity for your specific use case.

13. When in doubt, start with the highest-quality reranking model available for maximum accuracy, then consider a lighter variant if latency becomes a concern.

14. Great work! In this lesson, we explored what reranking models are and how they differ from embedding models.

15. Embedding models encode queries and documents separately for fast retrieval, while reranking models evaluate the query and each document together for more precise relevance scoring.

16. We also covered when to use a reranker — particularly when the accuracy of top results matters, such as in RAG pipelines or high-stakes search applications.
