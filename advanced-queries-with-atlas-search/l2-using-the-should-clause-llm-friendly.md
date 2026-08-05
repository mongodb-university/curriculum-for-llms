---
title: Using the should Clause
lesson_number: 2
skill: advanced-queries-with-atlas-search
kind: video_script
word_count: 604
date_updated: 2024-03-07
learning_objectives:
  - Use a should clause with minimumShouldMatch option in a search index with a compound operator
  - Learn how to use the should clause and minimumShouldMatch parameter
audience: 
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-queries-with-atlas-search
  lesson: https://learn.mongodb.com/learn/course/advanced-queries-with-atlas-search/lesson-2-using-the-should-clause/learn
---

1. Welcome back! Now you know how to use the compound operator with the `must`, `filter`, and `mustNot` clauses. These clauses strictly include or exclude documents from our search results. That's very rigid. You may be wondering if there's a middle ground where we don't need to match all terms in a given search? There is! And in this video, we'll walk you through the last clause in the compound operator set: the `should` clause.
2. We use the should clause when any condition in the array is enough to include the document in the results—so, conditions are optional. We can fine-tune this behavior with the `minimumShouldMatch` option, which we'll get to in a moment. Does `should` stop comparing when a condition matches? Not quite. It needs to evaluate every condition so it can compute the final score. Like the must clause, `should` changes the final document score by adding the individual condition scores together. The greater the number of matching conditions, the higher the final score.
3. Let's start with a familiar example. You may recall we previously used the `must` clause to search for documents containing the words poet and Elizabeth in the plot field. We're going to use the same example but swap out the `must` clause for the `should` clause. Let's see what happens.
4. Looks like we get documents that contain the word "poet", the word "Elizabeth", or both. Compare this with the results from the `must` clause where only documents matching both conditions are returned.
5. But remember when we mentioned the `minimumShouldMatch` option? Here's where things get more interesting. You can think of `minimumShouldMatch` as a knob that we turn to either raise or lower the number of conditions that `should` match. But it's not that simple.
6. The allowed range of values for `minimumShouldMatch` differs depending on how many other clauses are present inside the compound operator. When the only clause present is `should`, the `minimumShouldMatch` option can be set to one or greater, but not zero, and it defaults to one. When `should` is not the only clause, `minimumShouldMatch` can be set to zero or greater. In this case, the default value is zero.
7. Let's break this down a bit. Going back to our previous example, we notice `minimumShouldMatch` was omitted and therefore took the default value of one. With a minimum of one, we accept documents that satisfy any condition. Not surprisingly, our results show documents matching the word poet or Elizabeth or both. Notice the score increases with the number of matching conditions.
8. Let's modify our previous example to include a `minimumShouldMatch` value of 2. The results now include documents that meet both conditions–that is, they contain both poet and Elizabeth in the plot field. Did you notice something interesting in the output? The results look exactly like the must clause. When we set `minimumShouldMatch` to the number of conditions in the array, we have essentially created a must clause.
9. Note that the highest value we can set for `minimumShouldMatch` is the number of conditions in the `should` array. So, for this example with two conditions, the maximum value of `minimumShouldMatch` is 2. If we set it to 3 or higher, we'll get an error when we run the query.
10. Nice work! In this video, you learned how to use the compound operator with the should clause. We use the should clause when we don't want to match all terms in a given search. You also learned that when using the should clause, we can set the `minimumShouldMatch` option to determine how many conditions in our search criteria should be met. Great work, see you in the next lesson!
