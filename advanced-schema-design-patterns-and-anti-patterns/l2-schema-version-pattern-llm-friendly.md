---
title: "Schema Versioning Pattern"
lesson_number: 2
skill: advanced-schema-design-patterns-and-antipatterns
kind: video_script
word_count: 812
date_updated: 2023-08-11
learning_objectives:
  - Define the schema versioning pattern
  - Recognize the typical situations where the schema versioning pattern can be applied
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-schema-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/learn/course/advanced-schema-patterns-and-antipatterns/advanced-schema-design-patterns-and-anti-patterns/apply-advanced-schema-design-patterns?page=2
---

1. Database schemas change. It's not a question of *IF* but *when* it will happen.

2. Dealing with schema changes can be stressful, but MongoDB makes it easier with the schema versioning pattern. By adding an extra field in our documents and using some application support, we can change schemas with no downtime.

3. MongoDB makes this possible thanks to its flexible document model. Documents with different shapes, or schema versions, can exist within the same collection. Since these documents can coexist, we have flexibility on how and when we implement schema updates, which helps us avoid downtime.

4. Let's look at an example of modifying a schema used by our bookstore app.

5. Here, we have a user in the USERS collection with their home and work phone numbers listed in this document.

6. Later, we added another user, who doesn't have a home phone, but does have other contact methods, including work phone, Skype, and WhatsApp.

7. Instead of adding several additional fields to manage the growing list of contact methods, let's use an array. This array holds a list of subdocuments. Each subdocument references the contact type and value. To help our app identify the new shape, we've added a SCHEMA VERSION field and set it to TWO. The absence of a SCHEMA VERSION field is an implicit version ONE.

8. This ability to have multiple schemas coexist in MongoDB is in contrast to a relational database, where you can only have one schema version per database or one per table. With MongoDB, you can change the schema and increment the schema version number. Every document in a MongoDB collection can have a unique schema version number and therefore a unique shape. In practice, we rarely have more than a couple of versions while the app is in transition.

9. How do we update existing documents to the new shape? We can either: Have the application update the shape when the document is accessed, or Have a background task perform updates on all documents.

10. Keep in mind that before we update the schema, we must first update the application so it can read all schema versions, old and new, of the documents involved.

11. Ok, now let's use a background task to update all documents to the new schema, without any downtime. Assume we've already updated the application to handle both old and new schemas.

12. We start by updating our application servers.

13. Then we update the documents by running the background task, which can take as much time as needed. While the documents are updating, the app servers can handle both schema versions.

14. We can also run the background task with multiple passes to take advantage of when the system is less busy.

15. After all documents are updated, we can remove the code to handle old versions from our app.

16. To summarize, the schema versioning pattern allows you to perform a schema update without application downtime.

17. To implement the schema versioning pattern, add a field in each document to track the version number. You also need to update the app to handle different document shapes. And, develop a strategy to migrate documents to the new schema.

18. Remember, all applications will require schema changes. The schema versioning pattern allows you to avoid application downtime, puts you in control of migrations, and lets you choose when you want to do them.

---

## Visuals

1. Talking head w/ icon
2. Talking head w/ sidebar
   - Schema Versioning Pattern:
   - No downtime
3. Talking head w/ icon
4. Talking head
5. Slides
6. Slides
7. Slides
8. Slides
9. Talking head w/ sidebar
   - Existing documents
   - Updated by application
   - Updated by background task
10. Talking head w/ icon
11. Talking head w/ icon
12. Slides
13. Slides
14. Slides
15. Slides
16. Talking head w/ sidebar
   - Schema Versioning Pattern:
   - Zero downtime change
17. Talking head w/ sidebar
   - Schema version field
   - App handles all versions involved
   - Migrate the documents
18. Talking head w/ sidebar
   - Schema Versioning Pattern
   - Avoid application downtime
   - Control migrations
   - Choose timing
