---
title: "Identifying Relationships"
lesson_number: 5
skill: Relational Model to Document Model
kind: video_script
word_count: 334
date_updated: 2023-09-01
learning_objectives:
  - Identify and diagram relationships
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents preserving the original speaking register and sequence from the video script; not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/relational-to-document-model
  lesson: https://learn.mongodb.com/learn/course/relational-to-document-model/relational-to-document-model/design-relationships?page=1
---

1. As a first step toward modeling relationships between entities in our bookstore app, let’s examine different types of relationships.

2. In this video, you'll learn how to identify three basic types of relationships: one-to-one, one-to-many, and many-to-many.

3. We’ll use the following questions to identify the relationship between two entities: Can entity A be related to more than one entity B? and Can entity B be related to more than one entity A? Let’s apply these questions to Publisher and Headquarters entities.

4. You may remember that when we established entities in a previous unit, we included headquarters as an attribute of the publisher entity. Let’s assume, now, that headquarters actually exists as its own entity in our app.

5. Can a publisher have more than one headquarters and can a headquarters have more than one publisher? In our example, the answer to both of these questions is no. A publisher can only have one headquarters and a headquarters can only belong to one publisher. We call this relationship ONE-TO-ONE.

6. Next, let’s examine the relationship between printed books and reviews entities. One book can have multiple reviews. On the other hand, a single review can only be related to one book. We call this relationship ONE-TO-MANY.

7. To introduce the final relationship, let’s review Printed Books and Authors entities. A book can have multiple authors and an author could have written more than one book. This is a MANY-TO-MANY relationship.

8. Nicely done. In this video we covered the following types of relationships: one-to-one, one-to-many, and many-to-many.

9. We also learned a set of questions to help us identify the relationship between two entities: Can entity A be related to more than one entity B? and Can entity B be related to more than one entity A?

10. In the next video, we’ll take a look at one of MongoDB’s super powers: Embedding vs referencing.
