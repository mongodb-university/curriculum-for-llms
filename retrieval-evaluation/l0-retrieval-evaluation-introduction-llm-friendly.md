---
title: Introduction
lesson_number: 0
skill: retrieval-evaluation
kind: video_script
word_count: 394
date_updated: 2026-06-16
learning_objectives:
  - Benchmark embedding models using a golden dataset. Identify the three components of a test collection (corpus, queries, and relevance judgments)
  - Interpret core retrieval evaluation metrics. Explain what Recall@k, MRR, and NDCG@k each measure and what each metric reveals about an embedding model's retrieval quality
  - Evaluate and compare retrieval strategies using real benchmark data. Read MS MARCO and MIRACL benchmark results in context, run a structured evaluation across lexical, vector, and hybrid search, and use metric results to make a justified model selection decision.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/retrieval-evaluation
---

1. Hey there! My name is `instructor_name` and I'm a `instructor_role` at MongoDB. Welcome to retrieval evaluation skill badge.

2. Your search system returns results. Maybe it uses keyword matching, maybe it uses vector search powered by an embedding model, or maybe it combines both. Either way, the results look reasonable. But reasonable-looking results and accurate results are not the same thing, and a poor result doesn't always announce itself: you get plausible documents, confident rankings, and no indication that anything was missed.

3. In this skill, we'll teach you how to measure retrieval quality across lexical search, vector search, and the embedding models that power semantic retrieval.

4. Every retrieval evaluation, regardless of the type of search system, is built from three things: a document corpus, a set of queries representing real user needs, and relevance judgments that record the correct answers. This skill covers how to use that structure from the ground up, across four lessons and a hands-on lab.

5. We start with the evaluation framework itself: what a test collection contains, why relevance is judged against an information need rather than query text, and which layer of a retrieval system to evaluate first.

6. From there, we cover the metrics you'll use to measure retrieval quality: `Precision`, `Recall@k`, `NDCG@k`, and `MRR`. Each one answers a different question about your results, and knowing which to reach for depends on what kind of failure your application can least afford.

7. We then go inside real evaluation datasets. You'll see how `MS MARCO` and `MIRACL` are structured, why their design decisions determine which metrics they support, and what those benchmarks can and can't tell you about your own system.

8. The course closes with a hands-on lab where you'll run a retrieval evaluation system yourself. You'll work with a real corpus, issue queries, compute metrics, and compare models, putting everything from the lessons into practice before committing to a production decision.

9. By the end of this skill badge, you'll be able to choose the right metric for your retrieval goal, read a benchmark score with enough context to know whether it applies to your use case, and run a structured evaluation on your own data before committing to a model in production.

10. When you're done, take a short skill check to demonstrate your knowledge. Pass it, and you'll earn an official Credly badge to share on LinkedIn. Let's get started!
