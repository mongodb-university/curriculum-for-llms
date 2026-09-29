---
title: Introduction to Lab
lesson_number: 5
skill: retrieval-evaluation
kind: video_script
word_count: 299
date_updated: 2026-06-18
learning_objectives:
  - Understand how to use an existing benchmark evaluation data set
  - Understand how to generate a custom evaluation data set
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/retrieval-evaluation
  lesson: https://learn.mongodb.com/learn/course/retrieval-evaluation/retrieval-evaluation/retrieval-evaluation
---

1. You've spent the last several lessons building the foundation for retrieval evaluation. You know what a test collection is: a corpus, a set of queries, and relevance judgments that record the ground truth. You know how to read metrics like Precision@k, Recall@k, NDCG@k, and MRR, and what each one tells you about a different kind of failure. You've seen how real benchmark datasets are structured and what their design decisions mean for interpreting scores.

2. Now it's time to run it yourself.

3. In this lab, you'll use a real benchmark dataset: a corpus of documents paired with queries and relevance judgments.

4. First, you'll connect to a MongoDB cluster, embed a sample of documents, and load everything into MongoDB with both a vector search index and a search index ready to query.

5. Next, you'll run a lexical search on the collection and compute the exact metrics you studied, step by step, for a single query and then aggregated across 30 queries. You'll see what the numbers actually look like on real data.

6. Then, you'll swap in vector search and hybrid search using MongoDB's `$rankFusion` operator, run a side-by-side comparison of all three strategies, and sweep across hybrid weight values to find the configuration that scores highest on NDCG@10.

7. Finally, you'll bootstrap a domain-specific evaluation set. An LLM will draft candidate queries and relevance labels against your corpus, you'll curate them, and then you'll re-run the same metrics against your new relevance judgments.

8. By the end, you'll have gone from raw documents to a scored, multi-strategy evaluation table built on ground truth you created yourself.

9. Once you've completed the lab, we'll also point you to the GitHub repo so you can swap in your own corpus, queries, and relevance judgments and run the same evaluation against your own data. Let's get started.

---

## Visuals

1. Talking head w/ icon
2. Talking head
3. Talking head w/ sidebar
   - Corpus
   - Queries
   - Judgements
4. Slides
5. Slides
6. Slides
7. Slides
8. Talking head
9. Talking head
