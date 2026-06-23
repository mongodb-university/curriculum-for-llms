---
title: Lesson 4 - Reranking Results with Voyage AI Rerankers
lesson_number: 4
skill: voyage-ai-with-mongodb
kind: video_script
word_count: 472
date_updated: 2026-06-18
learning_objectives:
  - Create a two-step search process that combines vector search with reranking to improve the relevance of search results.
  - Use Voyage AI's reranking models to enhance search results based on relevance and context.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/voyage-ai-with-mongodb
  lesson: https://learn.mongodb.com/learn/course/voyage-ai-with-mongodb/voyage-ai-with-mongodb/reranking-results-with-voyage-ai-rerankers
---

1. So far, we have learned how reranking models work and when to use them. Now it's time to see them in action. In this video, we'll walk through a practical example. We'll start with baseline vector search results, observe where the relevance ordering falls short, and then apply Voyage AI's reranking model to reorder those candidates. By the end, you'll see exactly how a reranker improves the relevance of your results.

2. Before we jump into the code, let's quickly recap what a reranker does. A reranker takes a query and a document together and predicts a relevance score for that pair.

3. Unlike embedding models, which encode the query and documents separately, a reranker evaluates them at the same time, giving it a deeper understanding of how well each document matches the query. With that in mind, let's see it in action.

4. We'll use the same dataset from earlier and search for "ancient construction methods." To recap, we turned our query into vector embeddings and used the vector search aggregation stage.

5. These results are all relevant, but notice the ordering. "Ancient Roman Architecture" is at position three, even though it is the best match for "ancient construction methods." The Romans perfected arches, vaults, and concrete, which are construction methods. Meanwhile, "Gothic Cathedral Construction" is at position two, but it describes medieval buildings, not ancient construction.

6. This is exactly the kind of situation where a reranker helps. So let's apply one.

7. First, we initialize the Voyage AI client with `voyageai.Client()` and assign it to `vo`. Then we convert the cursor output into a `results` list and build a `documents` array that combines each title and description into a single string — this gives the reranker the full text it needs to score each candidate. Next, we call `vo.rerank` with our original query, the `documents` array, and the `rerank-2.5` model. Finally, the for loop iterates over `reranking.results` and prints each document along with its relevance score.

8. Here is the output: "Ancient Roman Architecture" is now at the top with the highest relevance score. "Greek Classical Architecture" holds second position, and "Gothic Cathedral Construction" has dropped to third.

9. The reranker determined that Roman arches, vaults, and concrete are more directly about ancient construction methods than Gothic medieval architecture. This shows the benefit of the reranker step - evaluating each query and document together really refined our results.

10. Great work! Let's take a moment to recap what we learned in this video.

11. First, we started with vector search results for "ancient construction methods" and observed that while all results were relevant, the ordering didn't reflect true relevance. We then applied Voyage AI's reranker model to reorder those candidates and saw the most relevant document move to the top, with a relevance score to match.

12. Together, vector search and reranking give you a search pipeline that is both fast and precise.
