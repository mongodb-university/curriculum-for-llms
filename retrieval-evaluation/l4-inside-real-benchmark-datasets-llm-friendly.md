---
title: Inside Real Benchmark Datasets
lesson_number: 4
skill: retrieval-evaluation
kind: video_script
word_count: 1064
date_updated: 2026-06-04
learning_objectives:
  - Identify the design characteristics of the `MS MARCO` benchmark dataset.
  - Explain why MRR is the primary metric used with `MS MARCO`.
  - Contrast the design of `MIRACL` with `MS MARCO`. (0 questions)
  - Explain how to determine whether a benchmark score applies to a given production use case.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/retrieval-evaluation
  lesson: https://learn.mongodb.com/learn/course/retrieval-evaluation/retrieval-evaluation/inside-real-benchmark-datasets
---

1. Imagine you're comparing two embedding models. You pull up a benchmark leaderboard and see one model scores 0.72 NDCG@10 and another scores 0.69. The choice seems obvious. But before you pick the higher score, do you know what dataset produced those numbers? Who labeled the ground truth? And how closely does it resemble your domain?

2. In this video, we focus on reading benchmark datasets in context, not on running a full benchmark pipeline. We'll use two popular datasets, `MS MARCO` and `MIRACL`, because you'll encounter them often in papers, tools, and leaderboards

3. Let's begin with `MS MARCO`, which was designed for scale using Bing search logs: real queries, retrieved web passages, and crowdsourced relevance labels.

4. To produce relevance labels at that scale, `MS MARCO` (Microsoft Machine Reading Comprehension) used crowdworkers. Each worker was shown retrieved passages for a query and asked to write a short, free-form answer, grounding it in whichever passage directly addressed the question. That passage was marked relevant with `is_selected: 1`. Everything else got `0`. The result is a corpus of 8.8 million Bing web passages, over one million anonymized queries, and binary labels throughout.

5. Those binary labels determine the primary metric. They capture whether an answer appears, but not relative quality among relevant passages. Because only one passage per query is labeled relevant, `MS MARCO` is sparse: most passages are `0` because they were never judged.

6. MRR is a better fit than NDCG@k in this setting. NDCG@k penalizes a model for surfacing unjudged passages highly, treating an unlabeled document as a miss. MRR only asks whether the first labeled positive appears in the top-k results, making it less sensitive to the unlabeled documents surrounding it.

7. That sparsity also affects interpretation: a `0` is often "unjudged," not a guaranteed true negative, so a model can retrieve a genuinely relevant passage and still be scored as a miss.

8. To make this concrete, let's inspect a single record from `MS MARCO`. This is a quick data-reading exercise so you can recognize how labels are structured when you encounter this benchmark. We can use the Hugging Face `datasets` library, which gives us access to `MS MARCO` through an API. Install it with `pip install datasets`.

9. We load the dataset in streaming mode, fetching one record at a time rather than pulling the full 1.4 GB. Next, we store a single document in a variable named sample. The first two fields we print are `query_id` and `query`. If you recall from the previous lesson, queries are information needs expressed as search inputs. Here you're seeing that directly: a real Bing search string, compressed from whatever the user actually needed, assigned a unique ID so it can be linked to its relevance judgments in the Qrels. From there, we loop over every candidate passage with its `is_selected` value.

10. After running it, we see the output makes the binary structure clear: every passage shows `is_selected=0` except for one. In other words, there is no graded relevance scale here, only a binary judgment of relevant or not relevant. The annotation records only whether a passage answered the query, not how well.

11. `MS MARCO` chose scale over annotation depth. `MIRACL` made the opposite call.

12. `MIRACL` (Multilingual Information Retrieval Across a Continuum of Languages) prioritizes language coverage over raw scale, especially for underrepresented languages.

13. Its corpus is Wikipedia in 18 languages, with large size variation by language, from about 131,000 passages in Swahili to 32.8 million in English.

14. Its queries were written by native speakers rather than mined from logs, so intent is explicit instead of compressed.

15. Its judgments are graded, not binary: annotators can mark partial relevance and full relevance, and negatives are explicitly labeled. That combination of corpus, query origin, and label type makes `MIRACL` especially useful for multilingual, knowledge-focused retrieval and for NDCG@10-based evaluation.

16. While `MIRACL` is a great example of a dataset with graded labels, we'll use NF Corpus for our inspection example. The label structure is identical, and NF Corpus is smaller and easier to work with. NF Corpus is a BEIR medical literature dataset that uses the same 0, 1, 2 scale.

17. The `beir` library provides a standardized loader for NFCorpus and a range of other retrieval datasets. Install it with `pip install beir`. Once installed, we can begin using it.

18. Next, we download and unzip NF Corpus, then load the corpus, queries, and Qrels for the test split. From there, we find a query with more than one distinct relevance grade in its Qrels, which gives us a sample that shows the full range.

19. The output shows what binary labels can't express: the same query has documents at grade 2, documents at grade 1, and documents at grade 0. NDCG@10 uses those distinctions to reward rankings that put grade-2 documents above grade-1 ones. Collapse everything to 0 or 1, and that signal disappears entirely.

20. Both `MS MARCO` and `MIRACL` are built on the same three-part structure: a corpus, a set of queries, and relevance judgments. What differs is every decision made at each step. Now let's turn that table into a simple takeaway. `MS MARCO` is built for scale. It has many more queries, binary labels, and MRR as the usual metric. `MIRACL` is built for coverage and label quality. It has fewer total queries, but spans many languages and uses graded labels, which pairs naturally with NDCG@10. Neither dataset is "better" in general. Each one is optimized for a different goal.

21. When you read a leaderboard score, pause and ask what corpus was used, where the queries came from, and which label scheme and metric produced the number.

22. If your task looks like large-scale, English, web-style retrieval with binary relevance, `MS MARCO` is usually the closer match. If you need multilingual behavior and graded relevance, `MIRACL` is often a better fit. And if your production setting differs from both, treat both scores as directional signals and validate with your own data.

23. Great work! Let's take a moment to look back on what we covered.

24. Every benchmark dataset is built on the same three-part structure: corpus, queries, and relevance judgments. `MS MARCO` and `MIRACL` follow that structure but optimize for different goals.

25. The goal in this lesson was to build dataset literacy so you can interpret leaderboard scores, not to run end-to-end benchmarking with these datasets. No single design decision tells the whole story, so use corpus source, query origin, and annotation pattern to decide whether a benchmark result transfers to your domain.
