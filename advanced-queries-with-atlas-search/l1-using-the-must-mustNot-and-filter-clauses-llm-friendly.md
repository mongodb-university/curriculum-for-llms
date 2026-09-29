---
title: Using the must, mustNot, and filter Clauses
lesson_number: 1
skill: advanced-queries-with-atlas-search
kind: video_script
word_count: 779
date_updated: 2024-03-07
learning_objectives:
  - Use the compound operator to narrow results
  - Sort results
  - Use fuzzy search to provide relevant results even when queries are misspelled
  - Learn how to use must, mustNot, and filter clauses in compound queries
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-queries-with-atlas-search
  lesson: https://learn.mongodb.com/learn/course/advanced-queries-with-atlas-search/lesson-1-using-the-must-mustnot-and-filter-clauses/learn
---

1. Have you ever encountered search results that were too broad to be useful? The experience can be quite frustrating. With Atlas Search, we can fine-tune our search criteria to narrow down results or prioritize specific qualities.
2. In this video, you'll learn how to improve search results using the `must`, `filter`, and `mustNot` clauses of the compound operator.
3. But first, what's the compound operator? `compound` is an Atlas Search operator that combines other operators using a set of rules known as clauses. Each rule, or clause, accepts an array of search operators. We can think of an array of search operators as a set of conditions. The net effect is that we can combine multiple search queries into a more refined query. Since `compound` itself is an operator, can we use it inside the condition array, so we have a nested compound operator? Yes! But more on that in a later video.
4. We can use a wide range of search operators and collectors within the condition arrays. In this video, we'll be using the text operator. To learn more about this and many other search operators, check out the MongoDB documentation.
5. Let's start with the `must` clause. The `must` clause is a positive filter where documents must satisfy all conditions within the array to be included in the results. It also changes the final document score, by adding the individual condition scores together.
6. In our movie catalog app, imagine we want to find all movies that have the word "poet" in the plot field. First, we add the compound operator and include a must clause. Next we add the text operator. Keep in mind that the text operator is not case-sensitive, so results with a capital P will be included.
7. When we run the query, we see that each plot field contains the word poet. Notice the documents are also sorted by their score.
8. What if we want to find movies that contain the words "poet" AND "Elizabeth" in the plot field? We can simply add another text operator to our existing array.
9. After running the pipeline, we see every document in the results contains both poet and Elizabeth in the plot field. Very neat.
10. Sometimes, we may want to eliminate, or filter out, a set of documents without regards for score. This is where the filter clause can help. The filter clause is similar to the must clause. It contains an array of conditions, all of which must be satisfied for a document to show up in the results. However, unlike the must clause, filtering does not assign a score.
11. Given the similarities between them, let's use our previous `must` clause example to illustrate the filter clause. We start with the same setup as before, but we use `filter` instead of `must`.
12. Running the query, we see that all documents returned contain the word poet. In addition, each document has a score of zero because the filter clause does not assign a score. It's interesting that the results shown here are not the same three documents returned by the must clause. This is because the must clause is sorting by score, while the filter clause cannot, since it doesn't assign a score.
13. We'll look at scoring more closely in an upcoming lesson, but given how central it is to Atlas Search, why would you ever use the filter clause and completely eliminate the score?
14. Well…. Assume, we have a very large set of documents we want to search. Rather than scoring the entire result set, which can be computationally intensive, we can discard a subset of documents using a given criteria. We can then combine the filter clause with a scoring clause, such as must, to improve the efficiency of our search query. We'll work with queries involving multiple clauses in a later lesson.
15. OK. So far we've looked at must and filter, where documents have to satisfy the conditions to be included. But what if we want to exclude documents that satisfy the conditions? Enter the `mustNot` clause. `mustNot` identifies which documents to exclude based on the conditions in the array. And, this clause does not assign a score to the documents in the result.
16. Let's take one of our "must" examples and invert it by switching from must to `mustNot`. What do you think we'll see?
17. If you said no poet or Elizabeth in the plot, you were right! Notice the score is also zero because `mustNot` does not assign a score.
18. Nice work! In this video, you learned about the must, `mustNot`, and filter clauses of the compound operator. We covered the syntax and examples of these clauses, so you can use them to write sophisticated search queries. Next, we'll learn about the should clause—the last component of the compound operator. See you there!
