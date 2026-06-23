---
title: Computed Pattern
lesson_number: 2
skill: schema-design-patterns-and-anti-patterns
kind: video_script
word_count: 1014
date_updated: 2023-09-07
learning_objectives:
  - Define the Computed Pattern, including mathematical operations, fan-out operations, and roll-up operations
  - Recognize the typical situations where the Computed Pattern can be applied
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/schema-design-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/learn/course/schema-design-patterns-and-antipatterns/schema-design-patterns-and-anti-patterns/apply-schema-design-patterns?page=4
---

1. As we work on our bookstore app, we come across a scenario where we need to perform some computations often, like calculating the average star rating for a book.

2. Computing results every time they’re requested would mean running the same operations repeatedly for every single read. Frequent computations can decrease performance.

3. The answer to this problem is the computed pattern. This pattern allows you to run expensive operations when the data changes, and store the results for quick access.

4. There are different kinds of computations covered in this pattern. In this video, we’ll focus on mathematical and roll up operations.

5. For mathematical operations, the goal is to pre-compute the result when the data is written instead of running the calculation every time we need it.

6. Let’s see how this works in the bookstore app. When a user writes a new review for a book, a new document is added to the reviews collection.

7. This review document contains a productSKU, userId, and a star rating, in addition to other fields.

8. This star rating must be used to update the average rating for that book. If we have to calculate the book’s rating every time a user visits the book’s page, it would result in repeated computations even if the rating hasn’t changed. Remember, the goal for our application is to have a billion reviews in three years, so performing these computations could get costly as our app grows.

9. We can eliminate repeated operations by calculating the average stars only when a new review comes in.

10. That way, when a user visits the product page, the star rating comes from 1 document rather than a computation across many documents in the collection. This is much more efficient!

11. To easily calculate the average, we must store a couple of new fields in the book document. We’ll add a subdocument labeled rating to our existing book document. The rating subdocument contains a field called `reviewCount` which holds the total number of reviews. Next, we store the average rating for the book.

12. Now, when we get a new review, we calculate the new average by first multiplying the previous average with the previous review count. Now we add the new review rating to that value, to get a new total number of review stars. Finally, we divide the new total number of review stars by the new total number of reviews.

13. Now let’s examine a second type of computation, roll up operations, which involve merging data together.

14. Roll up operations allow us to view data as a whole. They often involve grouping categories from smaller units into larger ones, such as hourly, daily, monthly or yearly reports.

15. Let’s look at an example from the bookstore app. Our internal stakeholders have requested information for each product type. They want to know the total number of books by product type and the average number of authors within a given product type.

16. Instead of computing this information every time it is requested, we can store this information in a new document and update it at specific intervals. The internal stakeholders have also requested that this information be updated daily.

17. In this example, we record the result at a specific interval, daily, rather than with every write. This decision depends on the use case for your application and the business requirements. If you have a write-heavy workload and can tolerate some stale data, this is a good option.

18. Now let’s implement the roll-up operation using an aggregation pipeline.

19. We need to roll-up a summary document for each product_type that includes the number of books and average number of authors.

20. First we use the group stage to classify the documents by product type. Next we use the `$sum` operator to count the books for each type in increments of 1. We then use the `$size` operator to get the number of authors in the authors arrays. And, lastly, we use the `$avg` operator to find the average number of authors for each product type.

21. We get the following output, which tells us how many books we have and the average number of authors for audiobooks, ebooks, and printed books.

22. To summarize, the computed pattern pre-computes data before the read operations. This lets you run operations when the data changes, and store results in a document for quick access.

23. In this video, we covered mathematical and roll up operations.
