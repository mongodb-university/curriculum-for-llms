---
title: Modeling One-to-Many Relationships
lesson_number: 8
skill: Relational to Document Model
kind: video_script
word_count: 661
date_updated: 2023-09-11
learning_objectives:
  - Demonstrate how to model embedded and referenced one-to-many relationships in MongoDB.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/relational-to-document-model
  lesson: https://learn.mongodb.com/learn/course/relational-to-document-model/relational-to-document-model/design-relationships?page=4
---

1. Welcome! Another relationship we frequently encounter is the one to many.

2. Examples of one-to-many relationships include: Customer and purchases.

3. Or auto maker and car models.

4. In this video, we’ll look at the one to many relationship in our bookstore app using a printed book and its reviews. In this relationship, printed books represent the one side of the relationship and the reviews represent the many side of the relationship. Let’s look at embedding first.

5. The most common way to embed a one-to-many relationship in MongoDB is to embed the “many” side as an array of subdocuments in the "one" side of the relationship.

6. Here we’ve created an array called “reviews”. This array contains subdocuments of reviews for one book.

7. The second way to embed this relationship is by creating one subdocument within the parent document.

8. In this example, within the book document we have one subdocument for reviews which contains subdocuments for each review. An attribute from each review, in this case a user id, becomes the key for each subdocument.

9. An advantage of embedding a one-to-many relationship is that there is no duplication of information. It is also a good option when the information on the "many" side cannot exist by itself, like a "review" without a "book". Now, let's look at ways to model references.

10. The first way to reference a one-to-many relationship is to use an array of references within the parent document.

11. In this example, each entry in the "reviews" array is a reference to a separate document for the given review. We can use the reference value in the reviews array to look up the details for a given review.

12. The second way is to reference the parent in each of the many child documents. As you see in the example, each review document has a field for "book_id" that points back to the parent document. We could use a query for a specific book_id to return all relevant review documents without a join.

13. You can also have bi-directional references. The book document includes a reference to its review documents, while each review document contains a reference to its book.

14. When considering whether to embed or reference for a one-to-many relationship, embedding an array of subdocuments is usually the preferred option. By using arrays to hold related data, our application can retrieve information for a document without $lookup operations or indexes on other collections.

15. However, we also have to remember the cardinality guideline. We aim to have 1 billion reviews in our app in three years. There is a strong possibility that within a book document, the array of subdocuments containing the reviews could become an unbounded array, especially for popular books.

16. You may recall that sometimes particular guidelines can become a priority when we are deciding whether to embed or reference.

17. If an array is unbounded or very large, like in the case of the relationship between printed books and reviews, those arrays may ultimately degrade performance.

18. In this case, because an unbounded array within the book document is a possibility whether we embed or add a reference,

19. we should reference the book id in each review instead.

20. Let’s recap what you learned in this video: When embedding a one-to-many relationship we have 2 main options:

21. We can use an array of subdocuments. Or we can use a single subdocument with multiple key value pairs where each value is a subdocument and the key is simply a unique value.

22. Using an array of subdocuments is the preferred option. However, if an array is unbounded or very large, like in the case of the relationship between printed books and reviews, those arrays may ultimately degrade performance so referencing would be a better option.

23. When referencing a one-to-many relationship we have a few options: Use an array of references to the child documents in the parent document; use a reference to the parent document in the child documents; or have it both ways and create bidirectional references.
