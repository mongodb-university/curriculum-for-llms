---
title: From Relational to the Document Model
lesson_number: 1
skill: Relational Model to Document Model
kind: video_script
word_count: 1291
date_updated: 2025-02-05
learning_objectives:
   - Understand the difference between relational and document-based data models.  
   - Identify key concepts for data modeling in MongoDB.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/relational-to-document-model
  lesson: https://learn.mongodb.com/learn/course/relational-to-document-model/relational-to-document-model/model-for-workloads?page=1
---

1. As a developer, chances are you've worked with Relational Databases. In this video, we'll bridge the gap between what you already know and how you can apply it to modeling data in MongoDB.

2. When we talk about data modeling, we're referring to the process of defining how data is stored, accessed, and managed within your database.

3. A key component of any data model is the schema. The schema is the blueprint for how the data is organized in the database. Designing any schema involves gathering system requirements and mapping the entities and their relationships.

4. You are probably familiar with data modeling and schema design for relational databases. The relational model organizes data into rows and columns within a series of interlinked tables. This model requires an explicit, predefined schema, where rules and constraints are applied to the entire database. This means that any future schema changes can require an extensive migration process.

5. Modeling data in relational databases requires precision in order to normalize the data.

6. Let's briefly look at an example of this using a bookstore application.

7. To model the books metadata for our online bookstore, we would need a table for books and their related information including their author. However, authors can have more than one book and in our example 1 book only has 1 author. To avoid having duplicated data in our table, we need a separate author table, with the book table referencing the author by id. In relational databases, these identifiers are called primary and foreign keys.

8. To help new users decide what to order, our bookstore will also have multiple reviews for each book. This means we need a separate table for reviews, where each review references a book ID. We also need a table for users who left the reviews, with their IDs linked in the reviews table.

9. The schema for these tables would be dictated by the third normal form imposed by traditional relational databases, which means that each entity will be stored in only one place in your database.

10. While data modeling in MongoDB follows the same basic concepts, its driving design is different. The main principle is to identify your workload and query patterns, then design your data model to support it.

11. A key thing to remember with MongoDB is that data accessed together should be stored together.

12. In MongoDB, database entities are stored in documents. Documents in MongoDB are presented in a JSON-like format which makes it easy to work with structured, semi-structured, and unstructured data across many systems and platforms.

13. Let's look at our previous example, this time using the document model.

14. Here all the associated data relating to an entity, in this case a book in our catalog, can be stored in a single document. In this way, documents are aligned with rows in relational databases. Each document has a unique identifier, the _id field, which is similar to a primary key in a relational database table.

15. In MongoDB, fields are the key-value pairs within a document, similar to columns in a relational database. As you can see, documents look like JSON objects you'd work with in your applications.

16. Now, instead of storing all these rows in a table, documents are stored in collections. Collections are used to organize related documents.

17. The document model is inherently flexible. The document acts as the schema. This allows us to create similar, but different, schemas for the same set of entities depending on the needs of our application.

18. This flexibility comes from three core design principles: polymorphism, ease of use when working with arrays, and the ability to embed related documents into a parent document.

19. Polymorphism refers to the database's ability to store documents with different structures or fields within the same collection.

20. For example, a single Books collection can store both print books and ebooks.

21. If you were to represent the same data in a relational database, you would need multiple columns with `null` values. For example, Columns like `format`, `fileSizeMB`, and `supportedDevices,` which only apply to e-books, would contain `null` values for all print book records. This approach creates issues in terms of storage and makes it difficult to adapt to changing requirements.

22. Arrays in MongoDB are a powerful tool for flexibility as well. The value of a field in a document can be an array of values, which can themselves be documents.

23. Let's look at our book document again. We now notice the genre field is an array of strings. This flexibility allows us to embed different entities directly within a document, rather than distributing them across multiple collections or tables. This simplifies query logic and optimizes performance.

24. Finally, embedding allows you to store documents within parent documents to represent relationships and complex hierarchies.

25. Let's say we want to access the top two reviews for our book document when queried. We can simply embed them as subdocuments.

26. Now, if we wanted to query all books with reviews by the user Jess, we would run this single database operation to retrieve the titles. It looks like our user Jess reads a lot of Science Fiction.

27. Compare the same operation to SQL in a relational database. You would need multiple costly join operations across four tables to perform a similar query. The returned results will also be in a less natural tabular format due to the inability of the relational database to natively support arrays for genres or reviews.

28. The document model also makes it possible to normalize data by referencing other documents from a main document. This is similar to the normalized data model you're familiar with in SQL. You can even mimic a join operation by using the $lookup stage.

29. The key point here is that In MongoDB, you’re not constrained to one way of storing data and creating relationships. You can choose to normalize some data, embed other data that will be accessed together, or use any combination of storage methods that make sense for your application.

30. Now, some applications require a more rigid schema to ensure consistency. MongoDB offers optional schema validation that’s enforced by the database itself. You can define rules and constraints, much like in a relational database, to keep your data clean and consistent. The validation occurs directly in the database, no matter which application or user is accessing it. Schema validation also works with polymorphic collections and embedded documents.

31. Getting up to speed with MongoDB is a small leap if you’re used to working with a relational database. With a slight mindset shift, you can start taking full advantage of the document model's flexibility.

32. Let's quickly recap what we covered in this lesson.

33. MongoDB's document model stores data in key-value pairs, similar to a JSON object. A document is similar to a row in a relational model. Groups of similar documents are stored in collections. This is like a table in relational databases.

34. MongoDB has a flexible schema. Documents in the same collection can have different fields, or take different shapes. This is referred to as polymorphism. MongoDB also supports arrays and embedding documents within a parent document.

35. Finally, we discussed the golden rule of MongoDB: data that is accessed together should be stored together. This allows queries to be completed in one operation and reduces the need for expensive JOIN operations.

36. As you develop your skills in data modeling with MongoDB, you'll learn how to model relationships, when to normalize or embed data, and how to benefit from MongoDB’s tested schema design patterns to find the right approach for your workload.
