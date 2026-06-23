---
title: Modeling Many-to-Many Relationships
lesson_number: 9
skill: Relational to Document Model
kind: video_script
word_count: 292
date_updated: 2023-05-16
learning_objectives:
  - Demonstrate how to model embedded and referenced many-to-many relationships in MongoDB.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/relational-to-document-model
  lesson: https://learn.mongodb.com/learn/course/relational-to-document-model/relational-to-document-model/design-relationships?page=5
---

1. Welcome! In this video we’ll examine the options for modeling many-to-many relationships.

2. The many-to-many relationship is the most complex relationship. Luckily, MongoDB makes it easier to model this relationship.

3. In our bookstore app, we’ll use the relationship between printed books and authors as an example of a many-to-many relationship. A book can have many authors and an author can write many books. Let's look at the various approaches for modeling this relationship starting with embedding.

4. First, we embed the documents from the child side using an array in each parent document. While this looks similar to embedding a one-to-many relationship, we need to embed children in each parent document when embedding a many-to-many relationship. In this case we embed author documents into the authors array of the book document.

5. In our example, if an author writes more than one book, the author document needs to be embedded into each book document they wrote. This results in data duplication.

6. Data duplication seems counter intuitive compared to more conventional data models based on normalization. However, some duplication is not necessarily bad as it can allow for more effective query performance in MongoDB. You must decide what level of data duplication is appropriate for your application.

7. Another way to embed is to use a single subdocument with multiple key value pairs. We can embed the child documents into one subdocument within the parent. In this case each child in the subdocument is represented by a key, the author ID, which is used to access the subdocument.

8. Ok, now, let’s talk about referencing. When referencing a many-to-many relationship, we need to use an array so we can reference multiple documents within the parent document.

9. In our example, a book has an array of authors like this. Each element in the array is a reference to an author document. Here, we see an example of data duplication, because an author’s id is included in more than one book document.

10. We can also reference in the opposite direction. In this example, we have an array of references named "books" inside each author document. Each element in the books array is an ID pointing back to its book document. A book id can end up in multiple author documents.

11. As in every relationship, it is possible to create bidirectional references for many-to-many relationships. However, we don’t recommend this approach because bidirectional references can be more expensive to manage.

12. You may recall when we used this example in a previous lesson, we determined that embedding authors in book documents is ideal for our application. While this will lead to some data duplication, we are willing to tolerate that in this case to gain a performance boost.

13. Let’s recap what you learned in this video: When embedding a many-to-many relationship we have 2 main options: one that uses an array of documents in the parent document, and another that uses a subdocument with a set of key value pairs where the value is our referenced subdocument and the key is a unique value. If you decide to embed this relationship, using an array is the preferred option.

14. When modeling a referenced many-to-many relationship we have 2 main options: Use an array of references to the child documents in the parent documents, or use an array of references to the parent documents in the child documents.

15. By now you are well on your way to becoming an expert data modeler with MongoDB.
