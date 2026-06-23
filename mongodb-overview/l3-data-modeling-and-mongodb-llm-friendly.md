---
title: Data Modeling and MongoDB
lesson_number: 3
skill: MongoDB Overview
kind: video_script
word_count: 769
date_updated: 2025-09-23
learning_objectives: N/A
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/mongodb-overview
  lesson: https://learn.mongodb.com/learn/course/mongodb-overview/mongodb-overview/data-modeling-and-mongodb
---

1. One of the key benefits of MongoDB is that its flexible schema lets you design a data model that fits your application's specific needs. To do this, you need to consider how your data relates and how you'll access it.

2. In this video, we'll cover some foundational concepts in data modeling for MongoDB. First, we'll review the core principle of data modeling with MongoDB. Next we'll define two key terms in data modeling, entities and attributes, and how these correspond to documents and collections. Then we'll focus on types of relationships among data: one-to-one, one-to-many, and many-to-many.

3. We'll also explore how to model these relationships by using approaches called embedding and referencing. Throughout this video, we'll be applying these data modeling concepts to a movie application. Let's get started.

4. As you set up your data model with MongoDB, remember the core principle — "data accessed together should be stored together". If you keep this in mind, it will help you design efficient schemas.

5. Now, let's take a closer look at how to organize your data effectively. This starts with understanding entities and attributes. Each piece of information in our database can be related to the other pieces. We call these pieces of information entities.

6. An entity is a unique and independent object or concept in your application, like a user, a product, or a blog post. In MongoDB, entities are typically represented as documents and are organized into collections.

7. For example, in our movies application, we might have entities such as 'Movies', 'Users', and 'Comments'. Each of these would correspond to a collection of documents.

8. Entities are described by attributes, which are characteristics that define them. For a movie entity, its attributes could include title, genre, and rating.

9. In MongoDB, attributes are represented as field-value pairs within a document. An attribute can also be a sub-document that groups related data. For instance, a movie document may have a sub-document that lists all of the cast members.

10. Now we know entities and attributes, let's talk about how we model our data based on relationships that exist among entities. There are three primary types of data relationships: One-to-One, One-to-Many, and Many-to-Many.

11. A One-to-One relationship is the most common in MongoDB. One-to-One relationships exist when one entity is related to exactly one other entity.

12. In the database for our movie app, the relationship between a movie and a movie studio is a one-to-one relationship.

13. A One-to-Many relationship is when one entity is related to multiple other entities.

14. For example, a movie typically has multiple cast members.

15. Finally, a Many-to-Many relationship is when multiple entities are related to multiple other entities.

16. A movie may be shown in many theaters. And a theater typically shows many different movies at a time.

17. With MongoDB's flexible schema, we can model these relationships by either embedding or referencing data within documents.

18. Embedding is the practice of storing related data within a single document, like how we've embedded the movie cast in an array here. Referencing, on the other hand, is the practice of linking documents by storing a reference to another document's ID, similar to the concept of a foreign key in a relational database.

19. So how do we know which approach to use? This is where understanding your access patterns is really important.

20. Embedding is the best approach when data is accessed together, like displaying a movie and its cast on a single page. This strategy minimizes the number of operations needed to retrieve your data, improving performance.

21. On the other hand, if data is accessed independently, like if movies and actors need their own distinct pages, referencing is the better choice. In this case, you would add actor IDs to the movie document, linking them to their own separate documents.

22. In addition to access patterns and relationships, there are a few other factors to consider.

23. When embedding data, we need to watch array and document size, because we don't want either to grow too large. And when referencing data, it's important to remember that we will have to use multiple queries or a `$lookup` operation to retrieve related data, which can cause latency issues if we aren't careful.

24. You can also use schema design patterns to model your data effectively with MongoDB. These patterns can help you optimize data storage, streamline queries, and improve application performance based on your application's specific access patterns and workload requirements.

25. Nice work! Let's recap what we covered in this video: We discussed some foundational principles of data modeling, including the key idea that "data accessed together should be stored together".

26. We defined entities, attributes, and types of relationships that exist among them in our data: One-to-one, One-to-many, and Many-to-many.

27. We also discussed the differences between embedding and referencing, the importance of understanding your access patterns, and how to choose the right approach to data modeling for your application.

