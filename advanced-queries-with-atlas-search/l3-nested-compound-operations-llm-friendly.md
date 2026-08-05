---
title: "Nested compound Operations"
lesson_number: 3
skill: advanced-queries-with-atlas-search
kind: video_script
word_count: 993
date_updated: 2024-03-07
learning_objectives:
  - Create search index with combined clauses within compound operator
  - Create search index with nested clauses within compound operator
  - Learn how to combine and nest compound clauses for advanced search queries
audience: 
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-queries-with-atlas-search
  lesson: https://learn.mongodb.com/learn/course/advanced-queries-with-atlas-search/lesson-3-creating-compound-queries-with-multiple-clauses/learn
---

1. Welcome to another installment of this unit on advanced queries with Atlas Search. At this point, you know how to use the compound operator with the must, filter, `mustNot`, and should clauses to write sophisticated queries. But so far, we’ve only used one clause at a time. The real power comes when you start combining them.
2. In this video, you'll learn how to fine-tune searches using multiple clauses in a compound query. You'll also learn how to nest compound queries to make your searches even more powerful.
3. The code examples in this lesson can get rather lengthy, so we’ll use constants to simplify their display. Let’s get started.
4. Say we want to search our movie catalog for specific words in the plot field but only within certain genres. First, we use a must clause with a text operator to search for the words “poet” and “Elizabeth” in the plot field. Then, we’ll add a `mustNot` clause with another text operator to exclude the genres we don’t care about–in this case, History and Documentary.
5. Here’s what the query looks like when we put it all together. Let’s give it a try and see what happens.
6. Nice! We get documents containing the words “Elizabeth” and “poet” in the plot field, and none of the results are in the genres of history or documentary.
7. Now, what if we want to limit our results to movies from a certain year that optionally include specific words in the plot field? 
8. This familiar query uses should to find matches on the words “poet” and “Elizabeth” in the plot field. But we’ve added a must clause to restrict results to movies from the year 1934. Let’s see what we get.
9. The first result satisfies both clauses: it contains the words “Elizabeth” and “poet” in the plot field and is from the year 1934. However, the other results only satisfy the must clause. These movies are from 1934, but they don't contain the words we want in the plot field.
10. So, what happened? Remember `minimumShouldMatch`? When we use a should clause with any other clause but don’t add `minimumShouldMatch` it defaults to zero. This means the should clause can accept documents that don’t satisfy any of the conditions in its array.
11. Now, let's take this all the way with an example that uses all available compound clauses.
12. We're looking for movies from 1992 to 2000. We don’t want any drama, there’s enough of that in the real world. We also don’t want documentaries or comedies. We do want plots with the word “earth” in them. And finally, we're interested in certain actors. Let’s get started.
13. First, we use a filter clause with a range operator to search for all movies released between the years 1992 and 2000.
14. Next, we use a must clause with a couple of conditions:
    - An exists operator to eliminate documents without a genre, and
    - A text operator to require the word “earth” in the plot field.
15. Then, we add a `mustNot` clause to exclude the genres we don’t care about.
16. And finally, we include a should clause looking for any of the actors we're interested in.
17. Here’s what it looks like when we put it all together. Don’t forget we're using the constants. We've also set `minimumShouldMatch` to 1 so that our results have at least one of those actors. Let’s give it a try.
18. Looking at the top three results it appears we got everything we wanted. The years are all within our desired range. All the plots include the word “Earth”. The genres exclude those we don’t want. And the cast always includes at least one of the actors we asked for.
19. Pretty straightforward, right? Now let’s turn our attention to nested compound queries.
20. A nested compound query is one that contains a compound operator within another compound operator. Recall that each clause in the compound operator takes an array of operators or conditions. Compound is an operator, so that means it can be used as a condition as well.
21. Let's say we're looking for movies from the Star Wars franchise that have Liam Neeson in the cast. But we also want other action movies that don’t include Liam Neeson. These conflicting requirements make it a prime candidate for nesting.
22. We need to write a few conditions that we can then weave together into our final query. First, we use a phrase operator looking for “Star Wars” in the title.
23. Next, we use the phrase operator again to find Liam Neeson in the cast.
24. And finally, we want action movies, so we use the text operator on the genres field.
25. We’ll use one last constant for our query projection since it’s rather verbose.
26. Now we stitch everything together with a top level compound operator and a should clause. Nested inside, we have two distinct compound operators. The first one is looking for Star Wars with Liam Neeson. The second one is looking for action movies that don't have Liam Neeson in the cast. And we set `minimumShouldMatch` to 1.
27. When we run the query, the first result we get is a Star Wars movie with Liam Neeson. After that we see action movies but no Liam Neeson in the cast. Looks like his Star Wars character didn't make it into Episode 2!
28. Whenever we want to unite two distinct data sets into a single result set, we can look at nesting for help. But like all powerful features, it can be computationally intensive.
29. Let’s recap. In this video, you learned how to write a compound query with multiple clauses as well as nested compound queries. We can see how these patterns can help us write powerful queries to support just about any use case. See you next time.
