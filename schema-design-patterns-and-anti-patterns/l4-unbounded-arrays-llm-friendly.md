---
title: Unbounded Arrays
lesson_number: 4
skill: Schema Design Patterns & AntiPatterns
kind: video_script
word_count: 778
date_updated: 2024-01-24
learning_objectives:
  - Identify an unbounded array and why it is problematic in MongoDB
  - Identify solutions for dealing with massive arrays
  - Identify an appropriate solution for a given example
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/schema-design-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/learn/course/schema-design-patterns-and-antipatterns/schema-design-patterns-and-anti-patterns/identify-anti-patterns?page=1
---

1. You may recall that we model book reviews using an array in the book document. This one to many relationship works well for our bookstore application. But what happens when the number of reviews skyrocket?

2. In this video, we’ll discuss the **unbounded array anti-pattern** and what can be done to solve it.

3. When modeling data with MongoDB we try to keep data that is accessed together, stored together. We do this through embedding, and one way to embed is to use arrays. But, sometimes, when we choose to use arrays, we end up creating unbounded arrays, a common anti-pattern.

4. MongoDB defines an unbounded array as a large, growing array with an unlimited number of elements. Unbounded arrays can strain application resources and put documents at risk of exceeding the BSON Document Size limit of 16 megabytes. As array size increases, we can also experience a decrease in index performance.

5. A few things to keep in mind to avoid the unbounded array anti-pattern are: Only store data together if it is queried together An array should not grow without bound and high cardinality arrays should not be embedded. However, as your application evolves, you still may end up with unbounded arrays. Here are a few ways to correct this anti-pattern.

6. Let’s use our bookstore app to examine the one to many relationship between books and reviews.

7. When we first modeled our data for the bookstore app, we stored reviews as an array field in a book document to increase query efficiency. While this model might work at first, we can end up with a very large array as we begin storing more and more reviews, especially for our most popular books. What can we do to fix this unbounded array?

8. There are two schema design patterns that can help us avoid unbounded arrays while still keeping data that is accessed together, stored together: The extended reference pattern and the subset pattern.

9. You may recall that the extended reference pattern allows us to embed relevant data from multiple documents and different collections into the main document.

10. With the subset pattern we can reduce document size by relocating data that isn’t frequently accessed.

11. Both patterns allow us to exercise control over the size of the array. But remember, the pattern that you choose depends on your use case.

12. In our bookstore app, we have decided to show only three reviews on a book’s home page.

13. We could use the extended reference pattern to eliminate the array, but this is a poor option for our use case. To understand why, let’s take a look at how we would implement it. First, we would move all review documents to their own collection with an added field to embed book information. Next, we would eliminate the unbounded array field in the book document.

14. This solves the problem of the unbounded array, but now we’ve added significant duplication to the database. Most of the book data needs to be extended, or duplicated, in each review document since reviews are now the main entity.

15. We’ve also introduced query complexity because now we must query the reviews collection to retrieve book data and reviews for a book’s homepage. Clearly, this pattern is not a good fit for our use case.

16. How about the subset pattern? Again, we first separate book and review data into two collections. We then store a handful of reviews that are frequently accessed with the book’s data.

17. For example, since we know that we only need to access three reviews to display on a book page, we can store those reviews in a book document instead of embedding all reviews for that book. Then, we can store all reviews in a reviews collection.

18. While the subset pattern will create some data duplication, it will help us eliminate the unbounded array, avoid using multiple queries or the $lookup operation, and keep frequently accessed information together. This is the best solution for our use case.

19. But, we need to remember that this may not be the right solution in every scenario. That’s why it’s important to understand the needs of your application and business before choosing a solution.

20. Let’s recap what you learned in this video: The unbounded array anti-pattern occurs when a document contains a large, growing array with an unlimited number of elements.

21. Here are a few things to keep in mind to avoid this anti-pattern: Only store data together if it is queried together An array should not grow without bound and high cardinality arrays should not be embedded.

22. Finally, we identified the subset pattern and the extended reference pattern as solutions for avoiding unbounded arrays.

23. Great job! See you in the next lesson!
