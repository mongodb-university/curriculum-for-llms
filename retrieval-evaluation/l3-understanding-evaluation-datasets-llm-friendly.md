---
title: Understanding Evaluation Datasets
lesson_number: 3
skill: retrieval-evaluation
kind: video_script
word_count: 1238
date_updated: 2026-06-03
learning_objectives:
  - Distinguish between an information need and a query.
  - Define corpus, document, and relevance in the context of information retrieval.
  - Recognize the different terms used to refer to an evaluation dataset.
  - Distinguish between binary and graded relevance labels.
  - Explain how the label type determines which retrieval metrics can be computed.
  - Explain how LLM judges are used to scale relevance labeling.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/retrieval-evaluation
  lesson: https://learn.mongodb.com/learn/course/retrieval-evaluation/retrieval-evaluation/understanding-evaluation-datasets
---

1. A user wants to combine vector similarity with metadata filters in a retrieval pipeline. To find that information, they type `vector search filters`. They get back five results. The results are topically related, but none answer the actual request. That gap between what a user types and what they actually need is exactly what an evaluation dataset is built to measure.

2. Precision, `Recall@k`, `NDCG@k`, and `MRR` each measure a different part of retrieval quality. But all four depend on the same thing: known-correct answers to compare against. Without that reference point, there is nothing to evaluate. That reference point is an evaluation dataset.

3. In practice, you use an evaluation dataset to compare embedding models, vector, lexical, and end-to-end search systems against the same relevance judgments.

4. In this lesson, we'll define the core parts of an evaluation dataset - query, document, corpus, and relevance - and show how relevance judgments are encoded as labels.

5. You may hear the terms "golden dataset," "ground truth," "test collection," or "judgment list." All four refer to the same thing: the known-correct reference that makes retrieval evaluation possible.

6. Knowing all four terms means you'll recognize the concept wherever it shows up: in a research paper, a vendor benchmark, or a model card. To understand what an evaluation dataset actually contains, let's review the definitions of query, document, corpus, and relevance.

7. Let's start with the query. A query is the short text a user types into a search system. But, the query is separate from the information need. The information need is what the user actually wants to learn.

8. For example, a user types `vector search filters`. But the real need is closer to: "How do I combine vector similarity search with metadata filtering in my retrieval pipeline, and which filtering approach should I use?"

9. This gap explains why results often fail to satisfy the information need. The model matched words in the query, but did not capture intent. A post about "new filtering options for vector retrieval" may match the query text, yet still fail to help the user implement the right approach.

10. Now that you understand the query, let's define what gets retrieved. For each query, the system returns documents.

11. The corpus is the full collection the system can search. A document is one item in that corpus, such as a docs page, support ticket, abstract, legal filing, or code file.

12. Now we can connect the two sides of retrieval: the query on one side, and documents from the corpus on the other.

13. Okay now for our last term - relevance. Relevance answers one question: does this document help fulfill the information need implied by this query?

14. A document is relevant when it gives useful information to satisfy the user's actual need. So a result can match query words and still be non-relevant.

15. This is the key distinction: evaluation is based on the information need, not just the typed query text. That is why evaluation datasets require explicit relevance judgments across query-document pairs.

16. To summarize, every evaluation dataset has three parts: 1. A Corpus: the full set of documents. 2. Queries: the search inputs that represent user needs. 3. And Relevance judgments (`Qrels`): which are labels that say which documents are relevant for each query.

17. To make that concrete, think back to the documentation search example. The corpus is the full set of documentation pages. The query is `vector search filters`. For that query, `Qrels` record which pages actually answer the underlying need, not just which pages contain similar words.

18. `Qrels` are what turn a list of results into a score. Without them, a model might return ten plausible-looking results and still miss every document that would actually help, with no way to detect it. They are the basis for computing Precision, `Recall@k`, `NDCG@K`, and `MRR`.

19. Each relevance judgment in a `Qrels` file is recorded as a label - a score attached to a query and document pair that captures how relevant that document is to that query.

20. Labels come in two forms, and which one you use determines which metrics the dataset can support. Binary labels are the simpler option: relevant, scored as 1, or not relevant, scored as 0. They're straightforward to collect and the right choice when relevance is unambiguous.

21. Graded labels use a numeric scale, typically 0 to 2 or 0 to 3. A score of 0 means not relevant. A score of 1 means partially relevant. And a score of 2 means highly relevant. That extra resolution captures the difference between a document that gestures at the topic and one that fully resolves the need.

22. The label type determines which metrics the dataset can support. Binary labels are enough for `Recall@k` and `MRR`: both only need to know whether a document is relevant or not. But `NDCG@K` rewards placing the most relevant documents highest, and to do that it needs to distinguish between degrees of relevance. Which means `NDCG@K` requires graded labels.

23. Labels are traditionally assigned by human annotators - a person reads each query and document pair and records a judgment. This produces high-quality labels with little-to-no hallucination risk, but it doesn't scale. A dataset with 100 queries and 1,000 candidate documents means 100,000 pairs to review.

24. Some benchmarks address that scale problem by using LLM judges instead. A language model scores each query and document pair on a numeric scale, and a threshold is applied to determine relevance. For example, a score of 7 or above counts as relevant.

25. LLM judges also make graded labels more practical at scale. Assigning a numeric score across thousands of pairs is something a model can do consistently, while asking human annotators to maintain fine-grained distinctions at that volume often introduces fatigue and drift.

26. A key tradeoff is accuracy: a single model's judgments can be biased or inconsistent in ways that are hard to detect.

27. A common mitigation is to use a council of LLM judges, where multiple models score each pair independently and their scores are aggregated, which reduces the impact of any one model's blind spots.

28. Even so, the quality of the labels depends on which models were used, how the scoring prompt was written, and how the threshold was set. When you encounter a new benchmark, always check how relevance was assigned; it tells you how much to trust the labels.

29. At a practical level, labels tell you both what you can measure and how much confidence to place in the result. Binary labels support `Recall@k` and `MRR`, because both metrics only need a yes or no relevance signal. Graded labels are needed for `NDCG@K`, because `NDCG@K` depends on ranking more relevant documents above less relevant ones.

30. Label quality depends on who assigned the labels and how they were assigned, so always review the judging method before trusting benchmark scores.

31. Great work! Let's take a moment to look back at what we covered. Every evaluation dataset, whether you call it a golden dataset, a judgment list, ground truth, or a test collection, is built from the same three components: a corpus, a set of queries, and relevance judgments that record which documents satisfy each query's underlying need.

32. Relevance is judged against the information need, not the query text. That distinction is why evaluation datasets require explicit labels rather than keyword matching.

33. And the label type determines what you can measure. Binary labels support `Recall@k` and `MRR`. Graded labels open the door to `NDCG@K`. The quality of those labels depends on who assigned them and how they were assigned.
