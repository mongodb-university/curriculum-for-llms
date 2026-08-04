---
title: "Video Script: Unit 5 Lesson 3 - Massive Number of Collections"
lesson_number: 5
skill: advanced-schema-design-patterns-and-antipatterns
kind: video_script
word_count: 622
date_updated: 2023-01-23
learning_objectives:
  - Define a massive number of collections
  - Identify how a massive number of collections impacts performance
  - Identify an example of a massive number of collections
  - Identify and remove unnecessary collections
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-schema-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/learn/course/advanced-schema-patterns-and-antipatterns/advanced-schema-design-patterns-and-anti-patterns/identify-advanced-anti-patterns?page=1
---

1. In theory, MongoDB can handle an unlimited number of collections. But the real world has limits and they come in the form of hardware and workloads. So you'll typically see a decrease in performance if you have too many collections. The recommended limit for the number of collections in a replica set is ten thousand. But in practice this limit depends on your workload and database resources. So the question is, what should you do if you have too many collections? In this video, we'll discuss the **massive number of collections anti-pattern** and how to solve it.

2. When modeling data with MongoDB, it is natural to organize it into separate documents and separate collections.

3. For example, imagine we're storing weather data obtained from multiple sensors that take measurements every minute. We may decide to use a collection per day to keep the number of documents per collection low.

4. But this data model has a problem. Unless we drop the old collections, the number of collections is unbounded. Pretty soon, our database will be managing tens of thousands of collections and indexes.

5. Having too many collections slows down performance. This is because MongoDB's default storage engine, WiredTiger, stores a separate file for each collection and index. And every collection in MongoDB has at least one index file.

6. Users who host their databases in Atlas, typically begin to see a decrease in performance once they exceed 5,000 collections on an M10 cluster. On an M20 or M30 cluster this begins around 10,000 collections. We also see an impact once a replica set exceeds 10,000 collections. Sharded clusters, on the other hand can, handle up to ten thousand collections per shard.

7. When our database has more than the recommended number of collections and performance is affected, we've run into the massive number of collections anti-pattern.

8. One way to mitigate this is to drop or archive unused collections. To do so, we recommend regularly monitoring your database for collections that aren't being used, so you can drop or archive them after a certain period of time.

9. If you still have a large number of active collections after doing this, your existing schema is not an optimal solution and you should remodel your data.

10. Let's examine our bookstore application to learn how updating the schema design can help.

11. We wanted to track the number of user views per book in our database. To do this, we created a separate views collection for each book in our inventory. Every user view creates a separate view document in the corresponding collection.

12. As the number of books and their related views grows, we learn that we've made a mistake. With more books, come more view collections and we quickly exceed the recommended number collections in our database.

13. In this case, we can easily fix the problem by placing all the views in one collection. This significantly reduces the number of collections we have, so our database remains performant.

14. Let's recap what you learned in this video: The massive number of collections anti-pattern occurs when a database surpasses the recommended limit.

15. One way to avoid or mitigate this antipattern, is to drop or archive unused collections.

16. If the number of collections continues to be a problem, updating the schema design can help reorganize your data and decrease the number of collections in your database. Sharding your database is also another potential solution.

17. We hope you enjoyed this lesson. See you in the next one!

---

## Visuals

1. Talking head w/ icon
2. Talking head
3. Talking head w/ slides
4. Talking head
5. Slides
6. Slides
7. Talking head w/ sidebar
   - Massive Number of Collections Anti-pattern
8. Talking head w/ icon
9. Talking head w/ icon
10. Talking head w/ icon
11. Talking head w/ slides
12. Talking head w/ slides
13. Slides
14. Talking head w/ sidebar
   - Massive Number of Collections Anti-pattern
   - Recommended limits: 5,000 per M10 cluster
   - 10,000 per M20/M30 cluster
   - 10,000 per replica set
   - 10,000 per shard
15. Talking head w/ sidebar
   - Drop or Archive unused collections
16. Talking head w/ sidebar
   - Update Schema Design
   - Sharding
17. Talking head
