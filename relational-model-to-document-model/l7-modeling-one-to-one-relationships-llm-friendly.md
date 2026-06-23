---
title: Modeling One-to-One Relationships
lesson_number: 7
skill: Relational to Document Model
kind: video_script
word_count: 445
date_updated: 2023-09-01
learning_objectives:
  - Demonstrate how to model embedded and referenced one-to-one relationships in MongoDB.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/relational-to-document-model
  lesson: https://learn.mongodb.com/learn/course/relational-to-document-model/relational-to-document-model/design-relationships?page=3
---

1. In this video, we’re going to cover different options available for embedding and referencing one-to-one relationships.

2. The one-to-one relationship is the most common in MongoDB and is often represented as an attribute within a parent document.

3. Examples of one-to-one relationships are: People and their social security information.

4. Or countries and their country codes.

5. In our bookstore app, the publisher and its headquarters are a one-to-one relationship. You may recall that when we established entities in a previous unit, we included headquarters as an attribute of the publisher. In this video we’re going to use headquarters as a separate entity to help us examine the one to one relationship. Let's see different ways to model this relationship, starting with embedding.

6. The first embedding option is to collocate the fields. Here, we’ve included fields for the headquarters address in the publisher document. This option serves the same purpose as a row in the relational model.

7. We can also group related fields in a subdocument. In this example, grouping headquarters information for a publisher into a "headquarters" subdocument makes it more organized. This can also be helpful because addresses may have different shapes depending on the country in which a publisher’s headquarters is located.

8. Next, let’s look at options for referencing in a one-to-one relationship.

9. First, we can add a reference to the child document within the parent document. In this example, we include an identifier in the publisher document that serves as a reference to its headquarters document. This option would serve us well if our bookstore app primarily reads publisher documents.

10. Another option is for the child document to reference the parent document. Here, the headquarters document has a field called "publisher_id" that has a reference to the publisher document. This is a good option if the app primarily reads headquarters documents.

11. You can also have bi-directional references. The publisher document includes a reference to its headquarters, while each headquarters document contains a reference to its publisher.

12. Now that we’ve covered different options for embedding and referencing for a one to one relationship, we need to decide which works best for our application.

13. Remember the guidelines we covered in the previous lesson? We can use the same guidelines here to help us decide. I won’t go through every guideline in detail but after tabulating the results it seems that embedding headquarters as a subdocument will lead to the simplest and most effective data model. Nice work!

14. Let’s recap what you learned in this video When modeling an embedded one-to-one relationship you can either: collocate fields at the same level in a document, Or embed the entity as a subdocument.

15. When modeling a referenced one-to-one relationship you can: Add a reference to the child within the parent document or include reference to the parent in the child document, or both.
