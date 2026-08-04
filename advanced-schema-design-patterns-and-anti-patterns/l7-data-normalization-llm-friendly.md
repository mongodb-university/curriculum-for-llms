---
title: "Data Normalization"
lesson_number: 7
skill: advanced-schema-design-patterns-and-antipatterns
kind: video_script
word_count: 566
date_updated: 2024-01-24
learning_objectives:
  - Identify data normalization in an example
  - Identify whether to embed or reference data for given example
  - Remove data normalization by embedding or referencing data across a collection
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-schema-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/learn/course/advanced-schema-patterns-and-antipatterns/advanced-schema-design-patterns-and-anti-patterns/identify-advanced-anti-patterns?page=3
---

1. When modeling your data, it might seem intuitive to normalize it, or split it into different pieces to optimize for space and reduce duplication. But, separating data that is accessed together means that you have to use multiple queries on different collections or MongoDB's $lookup operation to retrieve that data. This can be expensive and negatively impact performance.

2. When this happens frequently, we could be experiencing the data normalization anti-pattern which is when our data model separates data that is accessed together into different collections.

3. In this video, we'll discuss the **data normalization anti-pattern** and how to solve it.

4. Luckily, we can fix this anti-pattern by leveraging either the subset pattern or the extended reference pattern to keep the data we need to access together in a single document. Ultimately, the best solution is the one that fits our data and use case.

5. Let's go back to our bookstore application.

6. When we originally modeled the data, we normalized it. Since books and reviews are separate entities in our model, we created separate collections for each. However, book and review data are often accessed together, so we use multiple queries or $lookup operations to access that data.

7. While we may be tempted to fix this by embedding review data as an array within a book document, we should avoid this. A growing list of reviews will result in an **unbounded array** and a **bloated document**. So let's examine two possible solutions.

8. Our first option is the subset pattern. This pattern is useful for documents with arrays that could become very long, like lists of reviews or comments. We can apply this pattern to improve database performance for a book's homepage, which includes all book details and a subset of reviews.

9. To implement this pattern, we duplicate a subset of the review documents and store them in the corresponding book document in the books collection. We need to retrieve three book reviews along with the book data, so we store those reviews in an array in the book document *and* as separate documents in the reviews collection.

10. We still keep book and review documents in separate collections. We duplicate some of our data, but we don't need to use multiple queries to access this data.

11. But what if we are modeling our data for a reviews page that displays all reviews for a book? In this scenario, we need a few fields from a book document to display with review data. We can use the extended reference pattern to embed the book data that we need in each review document.

12. For example, we can store the book's title and author fields in a review document instead of embedding the entire book document.

13. This level of duplication is okay because we are just including two fields from a book document. And, a book's title and author won't change, so we won't need to update this information in the future.

14. Like the subset pattern solution, we keep book and review documents in separate collections. We duplicate some of our data, but we can now access the data we need with just one query.

15. These solutions help us solve the data normalization anti-pattern. And as you learned, the best solution depends on the needs of your application.

16. Let's recap what you learned: The data normalization anti-pattern occurs when we separate data that is accessed together.

17. This results in costly $lookup operations or multiple queries to access this data.

18. We covered two solutions to this anti-pattern: The subset pattern and The extended reference pattern.

19. Great job! See you in the next lesson.

---

## Visuals

1. Talking head w/ icon
2. Talking head w/ sidebar
   - **Data Normalization Anti-pattern**
   - Separates data that is accessed together
3. Talking head
4. Talking head w/ sidebar
   - Data Normalization Anti-pattern
   - Subset Pattern
   - Extended Reference Pattern
5. Talking head w/ icon
6. Talking head w/ slides
7. Talking head
8. Talking head w/ sidebar
   - Subset Pattern
   - Arrays that could become very long
9. Slides
10. Talking head w/ slides
11. Talking head w/ slides
12. Slides
13. Talking head
14. Talking head w/ slides
15. Talking head
16. Talking head w/ sidebar
   - **Data Normalization Anti-pattern**
   - Separate data that is accessed together
17. Talking head w/ sidebar
   - $lookup
   - Multiple queries
18. Talking head w/ sidebar
   - Subset pattern
   - Extended reference pattern
19. Talking head
