---
title: Retrieval Evaluation Metrics
lesson_number: 2
skill: retrieval-evaluaation
kind: video_script
word_count: 2177
date_updated: 2026-06-02
learning_objectives:
  - Define false positives and false negatives in the context of retrieval systems.
  - Explain what Precision and Recall each measure in retrieval.
  - Explain the trade-off between optimizing for Precision versus Recall.
  - Explain how `Recall@k` differs from Recall across a full corpus.
  - Explain what `NDCG@k` measures in a ranked result set.
  - Explain what `MRR` measures in a ranked result set.
  - Identify the appropriate retrieval metric for a given search system goal.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/retrieval-evaluation
  lesson: https://learn.mongodb.com/learn/course/retrieval-evaluation/retrieval-evaluation/retrieval-evaluation-metrics
---

1. Imagine you're building a recruiting application. You run your retrieval system and get back a ranked list of candidates.

2. But how do you know if it's any good? Suppose your system returns a ranked list. You might ask three questions around coverage, quality, and ranking: For Quality: Are there underqualified candidates in this list that should not be here? For Coverage: Did we miss any strong candidates who should have appeared in the results? And for Ranking: Is the list ordered from best to worst?

3. Those questions map directly to the metrics in this lesson: Precision for quality, Recall and `Recall@k` for coverage, `NDCG@k` for ranking quality, and `MRR` for how soon the first relevant result appears.

4. In case you're wondering: "@k" refers to the number of results that we evaluate. For example, Recall@10 looks only at the first 10 results.

5. In this video, we'll walk through each of these metrics in that same order to help you understand how to measure coverage, quality, and ranking. At the end of this video, we'll also discuss how to choose which metrics to track based on the goals of your search system.

6. Let's start with Precision and Recall. When a retrieval system returns results, every document it surfaces falls into one of two categories: relevant or not relevant. Two types of errors are possible.

7. The first is a false positive, a document the system returned that isn't relevant, like an underqualified candidate who made the shortlist. The second is a false negative, a relevant document the system failed to return entirely, like a strong candidate who never surfaced at all.

8. Put simply: a false positive happens when an underqualified candidate is included, and a false negative happens when a strong candidate is missed.

9. At this point, you might ask: how do we know whether a candidate is strong or underqualified? In evaluation, that comes from relevance labels, usually created by domain experts or trusted judgment rules. We'll cover how those labels are defined and built later in the course.

10. For example, for a senior machine learning engineer role, a candidate with years of directly relevant production ML experience might be labeled highly relevant, while a candidate with unrelated entry-level experience might be labeled not relevant.

11. Precision and Recall each measure one of these failure modes. Precision asks: of the documents returned, what fraction are relevant? Say your system returns eight candidates for a job opening. Six are genuinely strong fits; two aren't. Precision is 6 divided by 8, or 0.75.

12. A high-precision result set means most of what came back is useful. Low precision means the shortlist is full of noise. What counts as "high enough" depends on your use case. A hiring tool and a medical search system have very different tolerances for irrelevant results.

13. Recall asks the opposite question: of all the relevant documents that exist in the corpus, what fraction did the system return? Using the same scenario: there are ten strong candidates in the entire resume pool, and the system surfaced six of them. Four strong candidates never appeared at all. Recall is 6 divided by 10, or 0.. 

14. High recall means few were missed; low recall means important results are being left out. As with precision, what counts as acceptable recall depends on your use case and how costly it is to miss a relevant result.

15. If you've read vector search benchmarks, you may have noticed that the word "recall" appears there and is defined and measured differently. For vector search, recall refers to the fraction of the true exact nearest neighbors an approximate index managed to return. When you see "90 to 95 percent recall" in a vector search benchmark, it's measuring index approximation quality, not corpus coverage.

16. Optimizing for precision instead of recall, by returning fewer, higher-confidence results, tends to hurt recall. You miss more. Optimizing for recall, by casting a wider net to avoid missing anyone, tends to pull in more noise. This trade-off is fundamental to retrieval and shapes which metric matters most for a given application.

17. But in practice, retrieval systems don't return every document they find - they return a ranked list, and users only see the top results. Raw recall over an entire corpus tells you how much was retrieved in total, which isn't useful when the system is only showing ten results to begin with.

18. `Recall@k` adapts the same question to that reality by truncating at position k. Instead of asking what fraction of relevant documents were returned overall, it asks: what fraction appeared in the top k results? Of those same ten strong candidates, say seven appeared somewhere in the top ten results. Recall@10 is 7 divided by 10, or 0.7. It's a coverage metric - it doesn't care where within those ten positions the relevant documents appear, only whether they appeared at all.

19. Next, let's shift from coverage to ranking. `Recall@k` helps measure whether relevant documents appear in the top k results, but it has an important limitation: it does not tell you whether those top-k documents are in a useful order.

20. For users, that order is usually critical. A recruiting system that buries the best candidate at position nine is less useful than one that surfaces them at position one. Now we'll see how ranking-oriented metrics help address this limitation.

21. The primary one is `NDCG@k`, which stands for Normalized Discounted Cumulative Gain. The name is a mouthful, but the idea is straightforward: it rewards placing the most relevant documents highest, and it penalizes burying them lower in the list.

22. What sets NDCG apart from Recall is that it works with graded relevance. Rather than a binary relevant-or-not judgment, documents are scored on a scale, let's say 0 for not relevant, 1 for somewhat relevant, and 2 for highly relevant. That extra resolution lets NDCG distinguish between a good ranking and a great one in a way that `Recall@k` cannot.

23. Here's how it's calculated. Each retrieved document gets a relevance score, which is then discounted based on its rank position. The discount factor is the log base 2 of the rank plus one, so a document at rank one contributes much more than the same document at rank five.

24. Those discounted scores are summed to produce a DCG. That DCG is then divided by the IDCG, or Ideal DCG, which is the DCG of a perfect ranking where documents are ordered from most to least relevant. In other words, NDCG is calculated as DCG divided by IDCG. Dividing by the IDCG normalizes the score to a value between 0 and 1. A score of 1.0 is a perfect ranking. Lower scores reflect either missing relevant documents or ranking them too low.

25. Where `Recall@k` only asks whether relevant documents appeared in the top k, `NDCG@k` asks how well they were ordered once there. It's the primary metric for embedding model comparison, and the one you'll see most often on benchmarks like MTEB and RTEB.

26. So the flow is: use `Recall@k` to measure coverage, then use `NDCG@k` when you need to evaluate ordering quality within that top-k set. Which metric to prioritize still depends on your system goal.

27. Take Recall@1. If your application needs to surface one correct answer, a lookup, a direct match, a single best result, then all that matters is whether the right document appears at position one. Ranking within a list is irrelevant when the list has one slot. Recall@1 measures exactly that, and `NDCG@k` adds complexity without adding signal.

28. Or consider a two-stage pipeline where a retriever pulls a large candidate set, let's say the top 100 or 500 documents, before a reranker re-orders them. Here, the retriever's job is to minimize false negatives: get every relevant document into that candidate pool. The reranker handles ordering. Recall@100 is the right signal for the retriever because you care that relevant documents made it into the set, not how they were ordered within it.

29. Those examples show the core pattern: choose the metric that best matches the job your system stage needs to do.

30. The other ranking metric worth knowing is `MRR`, or Mean Reciprocal Rank. `MRR` answers a narrower question: on average, how high up in the ranked list does the first relevant document appear? The word mean matters here because it captures consistency across many queries, not just a few great outcomes.

31. Let's walk through it. For a single query, you scan the ranked results from position one downward until you hit the first relevant document. That rank position becomes the denominator of a fraction with 1 in the numerator. So if the first relevant result appears at position one, the reciprocal rank is 1 divided by 1, which is 1.0. If it appears at position three, it's 1 divided by 3, roughly 0.33. If it appears at position ten, it's 1 divided by 10, or 0.1. The further down the list the first relevant result lands, the smaller the score.

32. `MRR` is then the average of those reciprocal rank scores across all your queries. In this case, it’s 1 + 0.33 + 0.1 which is 1.43. To get the average we divide by 3 since that is how many queries we ran. This results in our `MRR` being roughly 0.48. Because it's a mean, `MRR` rewards systems that rank the first relevant result high consistently.

33. For example, imagine one system gets rank 1 on two queries but rank 20 on four others. Its `MRR` is about 0.37. Another system that always puts the first relevant result at rank 2 gets `MRR` 0.50. Even without as many rank-1 wins, the second system is better on `MRR` because it is more consistent

34. In the recruiting example, `MRR` tells you how prominently the system ranks a strong candidate. Think of it as the ranking counterpart to Precision. Where Precision asks whether what came back is relevant, `MRR` asks whether the most relevant result is at the top.

35. A low `MRR` score is a signal that the system is burying the best match, which matters most when there's one clearly correct answer per query. If you're trying to improve it, the levers are the same ones you'd reach for to improve top-of-list precision: tuning your relevance scoring, adjusting your retrieval strategy, or introducing a reranker focused on surfacing the single best result first.

36. So the takeaway is: use `NDCG@k` when you care about the quality of the full ordering, and use `MRR` when success depends on how quickly the first correct result appears.

37. Finally, let's turn metric definitions into a decision rule, starting with embedding model evaluation. Of the four metrics we've covered, `NDCG@k` and `Recall@k` are a good starting point in most cases when evaluating and comparing embedding models. Understanding which to prioritize comes down to what kind of mistake your application can least afford to make.

38. If missing a relevant document is the costlier error, `Recall@k` is the right signal. It will help you measure how many relevant documents were returned. A legal discovery tool needs to surface every relevant precedent. A compliance system can't afford to miss a flagged document. In those cases, you'd rather tolerate some noise in the results than leave something important behind.

39. If ranking quality over a smaller result set is what matters, `NDCG@k` is the right signal. In most user-facing retrieval applications, users see only the top five or ten results. A relevant document buried at position eight may as well not have been retrieved. That's why `NDCG@k` is the standard for embedding model comparison on benchmarks like MTEB and RTEB.

40. A practical way to choose is to start from your system goal. If the goal is "don't miss anything important," start with `Recall@k`. If the goal is "show the best few results first," start with `NDCG@k`. If the goal is "get one correct answer at the very top," start with `MRR` or Recall@1. If the goal is "feed a reranker a high-coverage candidate set," start with higher-k Recall, such as Recall@100.

41. Now, you may be wondering how these metrics map to vector search and search system evaluation. For vector search evaluation, teams often measure ANN index recall against exact nearest neighbors to validate index approximation quality. For search system evaluation, teams use `Recall@k`, `NDCG@k`, and `MRR` against relevance labels to measure end-to-end retrieval quality for real tasks.

42. Awesome work! Let's take a moment to look back on what we learned in this lesson.

43. In this lesson, we covered the four metrics you'll use to measure retrieval quality. Precision and Recall capture the two fundamental error types: noise in the results and relevant documents that were missed. `Recall@k` and `NDCG@k` build on Recall, evolving from simple coverage over a ranked list to a ranking-aware score that rewards placing the most relevant documents highest. `MRR` builds on Precision, evolving from whether returned results are relevant to whether the single best result lands at the top.

44. `NDCG@k` and `Recall@k` are strong starting points in practice and on benchmarks. Which one to weigh more heavily depends on your application failure mode.
