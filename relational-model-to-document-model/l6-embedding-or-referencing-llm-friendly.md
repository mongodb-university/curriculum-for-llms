---
title: Embedding or Referencing
lesson_number: 6
skill: relational-model-to-document-model
kind: video_script
word_count: 967
date_updated: 2023-09-01
learning_objectives:
  - Analyze entities to determine whether to embed or reference using common guidelines.
audience: 
  - llm
  - agents
purpose: This file is reference material for LLMs and agents preserving the original speaking register and sequence from the video script; not intended for direct human consumption.
mdb-learn-link: 
    course: https://learn.mongodb.com/courses/relational-to-document-model
    lesson: https://learn.mongodb.com/learn/course/relational-to-document-model/relational-to-document-model/design-relationships?page=2
---

1. After identifying relationships between entities, we must now translate them into the MongoDB document model. Should related entities be separate documents that are linked or should both entities be stored within one document? We must decide whether to define these relationships by referencing or embedding.

2. In this video, we’ll focus on the printed book entity. We’ll also review a set of guidelines that can help you decide whether to reference or embed a relationship.

3. A reference establishes a relationship between entities where each entity is typically stored in a separate document and linked together using a common key. Most often, these documents come from different collections but that is not a requirement.

4. For example, imagine I have separate documents for a printed book and its authors. We can link the documents together using a common key; in this case an author id. Within a book document, I have a set of author ids that reference the author documents.

5. The alternative to referencing is embedding. When embedding, both entities are inside a single document. In our example, the author information is stored within the printed book document in the books collection.

6. Now the question is how do we decide whether to reference or embed a relationship? First and foremost, it’s important to follow the MongoDB golden rule of schema design: “data that is accessed together should be stored together.”

7. For example, if we access a book and its author together in our application, the two entities should be stored together.

8. In addition, MongoDB has a set of guidelines that can help you make this decision. You can apply these guidelines to any relationship when deciding whether to embed or reference.

9. For now, let’s apply these guidelines to the many-to-many relationship that exists between the printed book and author entities from our bookstore app.

10. We’ll use a series of questions based on each guideline shown here to help us determine whether we should embed or reference our many to many relationship. As we move through questions we will keep a simple score card of embedding vs referencing using points. We can then compare the scores in the end. Let’s get started!

11. First up is "Simplicity". Would keeping entities together lead to a simpler data model and simpler code? Yes, collapsing book and author entities into a single document simplifies our application code. A ‘yes’ answer in this case is one point for embedding.

12. The second guideline is "Go Together". Do the entities go together? Do they have a "has-a," "contains," or “go together” relationship? Yes, a book "has-an" author. This is another point for embedding.

13. The next guideline is "Query Atomicity". Does the app query the entities together? We want to load the book's information together with the author’s, so 'yes'. This is another point for embedding.

14. The fourth guideline is "Update Complexity." Are the entities updated together? No. We could change an author’s biography without changing information for a book that they wrote. In this case, a no is a point for referencing.

15. The fifth guideline is "Archival." Should the entities be archived at the same time? No. An author may have more than one book listed in our app. We wouldn't want to archive the author if just one of their books was deleted. This is another point for referencing.

16. The sixth guideline is "Cardinality." Is there a high cardinality (current or growing) in the child side of the relationship, in our case, the author? This question is asking us to think about the possibility of an unbounded array, which we want to avoid. For our app, we aren’t in danger of a high cardinality because it is unlikely that a list of authors for one book will be very long or will change over time. So the answer is no. In this case, no is actually a point for embedding.

17. Next, we have "Data Duplication." Would data duplication be too complicated to manage and would it be undesired? In this example, data duplication is not difficult to manage so we’ll answer ‘no’. Once again, this no is actually a point for embedding.

18. The eighth guideline is "Document Size." Would the combined size of the entities take too much memory or transfer bandwidth for the application? No. One document with both author and book entities would be relatively small. This is another point for embedding.

19. The ninth guideline is "Document Growth." If we embed, would the embedded piece grow without bound? For the entities in our example, there would be little growth over time, so our answer is ‘no’. This is another point for embedding.

20. The tenth guideline is "Workload." Are the entities written at different times in a write-heavy workload? The entities for printed books and authors will be written at the same time. For adding or updating books, we expect this to occur at a rate of 10 times per hour, so this is not a write-heavy workload. Our answer is ‘no’. This is another point for embedding.

21. The eleventh guideline is "Individuality." For the child side of the relationship, in our case the author, can the entity exist by itself without a parent, in our case the book? No, an author cannot exist in our application without a book. This is another point for embedding.

22. Tallying the results, it is clear that we should embed the author or authors with the book for this particular relationship.

23. Whenever we use these guidelines, we need to consider the priority of each in relation to our application requirements. There will be times when one of the guidelines will take priority and dictate whether we should embed or reference a relationship.

24. Let’s recap what you learned in this video: When modeling with MongoDB, we can establish a relationship between entities through a reference, by including the id of the child document in the parent document Or We can establish the relationship by embedding, where we include the child document within the parent document.

25. When deciding whether to reference or embed, the golden rule is “data that is accessed together should be stored together.”

26. And finally, we covered guidelines that can help you decide whether to define a relationship by embedding or referencing.
