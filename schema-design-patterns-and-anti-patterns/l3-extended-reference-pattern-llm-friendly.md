---
title: Extended Reference Pattern
lesson_number: 3
skill: Schema Design Patterns & AntiPatterns
kind: video_script
word_count: 669
date_updated: 2023-09-05
learning_objectives:
  - Explain the extended reference pattern as a solution to avoid joins or lookups
  - Recognize typical situations where the extended reference pattern can be applied (e.g., keeping customer and supplier information in an order)
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/schema-design-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/learn/course/schema-design-patterns-and-antipatterns/schema-design-patterns-and-anti-patterns/apply-schema-design-patterns?page=7
---

1. Data modeling with MongoDB often involves multiple documents within different collections.

2. For instance, our bookstore app has collections for users, reviews, and books. But what if you need to get data from documents in all of those different collections?

3. If you come from a relational database background you’re probably thinking about performing a JOIN operation.

4. The equivalent in MongoDB is the dollar-sign lookup aggregation operator, but using this can be resource intensive, much like a JOIN.

5. We can avoid JOINs altogether by applying the extended reference pattern to our data.

6. In this video, we’ll learn about the extended reference schema design pattern and how we can apply it to the bookstore app.

7. An extended reference is a reference that is rich enough to include all that is needed so we can avoid a join. You create an extended reference by embedding relevant data from multiple documents and different collections into the main document.

8. Its primary objectives are to reduce the latency of read operations, avoid round trips to the database, and avoid touching too many pieces of data.

9. The result will be faster reads due to a reduced number of joins and lookups.

10. Let’s see an example to get a better idea of how it works.

11. In our app we have decided to introduce a book review search feature. Users can search for reviews by book title, review title and user name.

12. Books are stored in a separate collection from reviews. We could query based on the product SKU of the book in the reviews collection but we’re still missing some key information like book title and product type.

13. We can also use the dollar-sign lookup aggregation operator to obtain this information. But if you recall, we anticipate that this operation will be run 200 times a second.

14. Running that many lookups or JOINs could hurt the performance of the application.

15. With that in mind, we can optimize for this requirement by embedding the information we need from the book document into the review document.

16. We’ll also need to know which user wrote the review for the book. Again, we can use the extended reference pattern to help us optimize this.

17. Looking at the current structure of the user and review documents, we can reference both the userId and the user’s name in the review document within the reviewer subdocument.

18. Now when we query for reviews, all the information that we need is in one place. This is great but it does create a potential issue: duplication.

19. When deciding to use the extended reference pattern, think about how you can minimize duplication. The pattern works best if you select fields that don't change often. Also, try to only bring the fields you need.

20. For example, the title of a book will not change much over time.

21. We also need to consider how to keep duplicate data in sync with the source.

22. To manage duplication when a source field is updated, first identify: What is the list of dependent extended references?

23. Next, do the extended references need to be updated immediately or can they be updated at a later time?

24. The simple answer for most cases is no, they don't need to be updated immediately.

25. What if we want to implement the extended reference pattern on an existing data set? We can use the aggregation framework!

26. Assume we have the following review documents we want to transform.

27. First we will update all documents in the reviews collection by bringing in relevant product information from the books collection using the dollar-sign lookup stage. Once our new document with the extended reference is formed, we use the dollar sign merge stage to merge the output into the existing reviews collection.

28. After running a find on the reviews collection, and running the pipeline, you can see that the review documents now contain product information as well.

29. This aggregation pipeline gives you an idea of how you can apply the extended reference pattern to an existing dataset. We can use a similar approach to merge needed fields from the user collection.

30. Awesome job! In this video, we learned that the extended reference pattern helps you avoid joining too many pieces of data in a query.

31. To create an extended reference, embed the data from other documents into the main document. While this does result in duplication, it has great benefits for performance.

32. Next, we applied the extended reference pattern to the reviews in the bookstore application. And discussed how to apply the pattern to an existing dataset.

33. Finally, we covered how to minimize duplication when applying the extended reference pattern.
