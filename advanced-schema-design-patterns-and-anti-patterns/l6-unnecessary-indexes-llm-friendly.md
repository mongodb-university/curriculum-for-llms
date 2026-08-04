---
title: "Unnecessary Indexes"
lesson_number: 6
skill: advanced-schema-design-patterns-and-antipatterns
kind: video_script
word_count: 788
date_updated: 2023-12-24
learning_objectives:
  - Identify how indexes relate to resources and search strategies
  - Identify how unnecessary indexes impact performance
  - Identify and remove unnecessary indexes
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-schema-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/learn/course/advanced-schema-patterns-and-antipatterns/advanced-schema-design-patterns-and-anti-patterns/identify-advanced-anti-patterns?page=2
---

1. MongoDB indexes are required to support fast queries. During the development of our bookstore app we added indexes indiscriminately. But recently, app performance has been poor. Could this be related to our indexing strategy? In this video, we'll discuss how to identify and address the **unnecessary indexes antipattern**.

2. While you may assume that you need to create an index for every query, this can result in unnecessary indexes. As a result, you could experience reduced performance.

3. An index is unnecessary when it is not used, rarely used or covered by another compound index. While the limit for the number of indexes per collection is 64, we recommend using the fewest number of indexes possible to efficiently support application queries.

4. Indexes require space and need to be loaded in memory when used. As the collection grows, so do the indexes. Unnecessary indexes can negatively impact write performance because indexes must be updated every time a document is created, updated or deleted.

5. Let's take a look at an example from our bookstore application to learn more.

6. We initially indexed every field used in a query on the book collection and created a compound index on title and author. However, opening new pages and adding new books is slow in the app.

7. Slow queries and write operations are two indicators of a suboptimal indexing strategy. Let's see what's going on.

8. We can use an aggregation pipeline with an $indexStats stage to measure index use for a collection. Let's add a project stage to limit the output. In this case, we're only interested in index name, 'ops' or the number of times an index has been accessed by user requests, and 'since' which defines the time period. Finally, we can use the sort stage to sort indexes by usage in ascending order. This way, least used indexes are displayed first.

9. Our app is running on an **Atlas M10** Cluster so we can use the **data explorer** and **performance advisor** to check our indexes. Please note that performance advisor is only available for M10 and above clusters.

10. Let's use the Atlas Data Explorer to check index usage for the Books Collection. Here, we can see our application frequently uses a compound index on title and author along with indexes on author, rating and title fields.

11. If we sort again to reverse the order we can see that indexes on price, pages, year and genre fields are not active.

12. Reviewing the used indexes in more detail, the **index on title** is redundant because title is covered by the compound index **on title and author**. If you haven't already, or simply need a refresher, check out our content on indexes to learn more about how to efficiently arrange index keys in a compound index. Luckily, the **Atlas Performance Advisor** will highlight redundant indexes for us.

13. This is a clear example of the **unnecessary indexes anti-pattern.** Several indexes are not being used but they take up space and need to be updated when the documents including those fields change.

14. Once we have confirmed which indexes are unnecessary we need to drop these indexes in order to restore the app performance. Remember that the index on _id is required and cannot be dropped. Before dropping an index we recommend hiding it with **hideIndex()**. This lets you evaluate the impact on your app before the actual removal. If the app isn't negatively impacted by removing the index, we can call the **dropIndex()** function to permanently remove the unnecessary index.

15. We can also drop indexes with the **Atlas Data Explorer.** Here, we press the drop index button on the action column for the desired indexes. Then, we enter the name of the index when prompted and confirm the action.

16. Let's recap what you learned in this video: Creating indexes that support your queries is important, but unnecessary indexes take up resources and reduce performance.

17. An index is unnecessary if it is not used or if it is redundant because another compound index covers it.

18. You can discover and remove unnecessary indexes with Atlas Data Explorer, Performance Advisor, or the $indexStats aggregation stage. You can also hide indexes with hideIndex() or remove them with dropIndex().

19. Great work! See you in the next lesson!

---

## Visuals

1. Talking head w/ icon
2. Talking head
3. Talking head w/ sidebar
   - Unnecessary Index
   - Not used
   - Rarely used
   - Covered by another compound index
4. Talking head w/ sidebar
   - Require space. When used they are loaded in memory.
   - Grows as documents are added
   - Negative impact on write performance
5. Talking head w/ icon
6. Talking head w/ slides
7. Talking head w/ slides
8. Slides
9. Talking head w/ sidebar
   - MongoDB Atlas
   - Data Explorer
   - Performance Advisor (M10 or larger)
10. Slides
11. Slides
12. Slides
13. Talking head
14. Talking head w/ slides
15. Slides
16. Talking head w/ sidebar
   - Unnecessary indexes
   - Take up resources
   - Reduce performance on startup and write operations
17. Talking head w/ sidebar
   - An index is unnecessary if:
   - Not used
   - Redundant
18. Talking head w/ sidebar
   - Atlas Data Explorer
   - Atlas Performance Advisor
   - $indexStats
   - hideIndex()
   - dropIndex()
19. Talking head
