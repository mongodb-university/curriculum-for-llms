---
title: "Video Script: Unit 6, Lesson 2 - Schema Evolution"
lesson_number: 3
skill: advanced-schema-design-patterns-and-antipatterns
kind: video_script
word_count: 762
date_updated: 2024-02-12
learning_objectives:
  - Define schema evolution
  - Provide a bookstore example
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-schema-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/learn/course/advanced-schema-patterns-and-antipatterns/advanced-schema-design-patterns-and-anti-patterns/manage-database-schema-lifecycle?page=1
---

1. Our bookstore is opening a new branch in France. To support the new language in our app we are adding internationalization and localization support. As part of this update, the team building the site needs to change the default schema of the review documents to include a locale field. They need to make sure they don't introduce any breaking changes. In this lesson you will learn how to handle schema evolution with MongoDB.

2. As applications evolve, Database Schemas need to be updated. Whether we are introducing new features, fixing bugs, or applying new patterns, the structure of a database will change over time.

3. This process is known as Schema Evolution. Sometimes a schema can change as a part of a planned update, where all stakeholders are informed and aware that changes will be made.

4. In modern application development it's common for changes to happen ad hoc after the initial schema design phase and during development. For example, a bug fix can require us to change schema. This can happen quickly, so all stakeholders may not be involved or aware that a change has occurred.

5. Ad hoc updates can be very challenging if you are working with a rigid schema but MongoDB's flexible schema model makes schema evolution very easy.

6. Documents with different shapes can coexist in the same collection, so we can gradually evolve the schema. Then, schema validation can be used to check data consistency and quality in new documents.

7. Let's see how the schema evolves in the reviews collection.

8. The French branch of our online bookstore app requires a new field in review documents that specifies the locale as either English or French. Legacy documents, those before we apply the schema change, must not break.

9. We want to apply schema validation for all new documents. We'll be using the validation rules established for the reviews collection as a starting point. Let's take a look.

10. First, we extend the original schema with an optional locale field. We'll use the enum keyword to specify a list of allowed values for the field. In our case we only support the english and french locales.

11. Once again, let's put everything together into a validator document and get ready to enable validation! We use the **collMod command** to enable the new schema validation for the existing reviews collection. This time, we use schema_validation_international as the validator document. And here, we supply the desired validation level and action. In this case, we want to be more relaxed in our validation approach.

12. Since we are still in development, we'll use **moderate** and **warn** respectively. This way, legacy documents can still be modified. If we add new documents that violate the new schema validation rules, that operation will also proceed, but the violation will be recorded in the logs.

13. Once we modify the existing schema by applying these changes, we need to test and monitor.

14. Monitoring Schema Evolution is crucial to identifying schema design issues, improving data quality and optimizing performance.

15. Monitoring the logs is an essential element of any strategy, especially if the validation action is set to warn. But this is by no means a trivial task. Fortunately Atlas users can benefit from Schema Suggestions, a built in tool to automatically monitor your cluster and suggest schema improvements.

16. If you are on an M10 or above cluster, Atlas Schema Suggestions provides out of the box schema suggestions to address common Schema evolution issues and anti-patterns including: Reducing $lookup operations, Avoiding Unbounded Arrays, Removing Unnecessary Indexes, Reducing the Size of Large Documents, Reducing the number of collections, and Use Atlas Search for Full-Text Regex Queries.

17. While this feature is incredibly useful, it should only be one piece of your monitoring strategy. If you haven't already or just need a refresher, check out our monitoring content for more information.

18. Let's do a quick recap of this lesson: Schema evolution describes changes made to your schema over time.

19. We can easily add or update the schema validation rules for an existing collection with the collMod command.

20. Finally, we learned that we can monitor any changes that we make to our schema for issues with MongoDB logs and Atlas Schema Suggestions.

21. Great job! See you in the next lesson!

---

## Visuals

1. Talking head w/ icon
2. Talking head w/ icon
3. Talking head w/ sidebar
   - Schema Evolution
   - Part of a planned update
4. Talking head w/ sidebar
   - Schema Evolution
   - Ad hoc during development
5. Talking head
6. Talking head w/ icon
7. Talking head w/ icon
8. Talking head w/ sidebar
   - New field: specify locale
   - Legacy documents must not break
9. Slides
10. Slides
11. Talking head w/ slides
12. Talking head w/ slides
13. Talking head
14. Talking head w/ sidebar
   - Monitoring Schema Evolution
   - Identifying schema design issues
   - Improving data quality
   - Optimizing performance
15. Talking head w/ sidebar
   - Monitoring Schema Evolution
   - Logs
   - Atlas Schema Suggestions
16. Talking head w/ sidebar
   - Atlas Schema Suggestions
   - Reduce $lookup operations
   - Avoid Unbounded Array
   - Remove Unnecessary Indexes
   - Reduce the Size of Large Documents
   - Reduce the number of collections
   - Atlas Search for Full-Text Regex Queries
17. Talking head
18. Talking head w/ sidebar
   - Schema evolution describes changes made to your schema over time
19. Talking head w/ sidebar
   - Add or update the schema validation rules
   - collMod
20. Talking head w/ sidebar
   - MongoDB logs
   - Atlas Schema Suggestions
21. Talking head
