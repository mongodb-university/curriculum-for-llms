---
title: "Schema Migrations"
lesson_number: 4
skill: advanced-schema-design-patterns-and-antipatterns
kind: video_script
word_count: 860
date_updated: 2024-02-14
learning_objectives:
  - Define schema migration
  - List schema migration strategies
  - Provide a bookstore schema migration example
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-schema-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/learn/course/advanced-schema-patterns-and-antipatterns/advanced-schema-design-patterns-and-anti-patterns/manage-database-schema-lifecycle?page=2
---

1. After testing out the new schema for review documents, we are ready to release it to production. The only problem is, not all of our teams are ready to adopt the updated schema. In this video we will discuss the tradeoffs and complexities associated with schema migrations and how MongoDB makes them simple.

2. An application's schema will be updated and modified to support the natural evolution of apps and business needs. Transitioning from one schema to the next is known as **Schema Migration** and it is an essential part of the software development process.

3. The database schema acts as a contract between database users. Migrating from one schema to the next typically requires significant coordination, because all stakeholders need to be aware of and agree on the proposed changes. If stakeholders aren't on the same page, we might introduce breaking changes including: bugs, security or compliance issues.

4. Thankfully, MongoDB's flexible document model allows for frictionless schema migrations, supporting your organization's needs and simplifying the coordination requirements.

5. This flexibility allows multiple schema versions to coexist in the same collection. Versioning is a common strategy to enable controlled migrations, where users can specify a version when they query the database and developers can make changes to the next version while maintaining compatibility with the current one.

6. Keep in mind that handling a large number of versions is challenging, because it increases application complexity and creates technical debt. For this reason you should limit the number of schema versions to the minimum required by your organization and use case.

7. Leveraging the Schema Versioning pattern and Schema Validation allows you to smoothly transition from one version to the next. This ensures that we adhere to required business rules while maintaining backwards compatibility for migrations without downtime.

8. Once we are ready to migrate to the new version of our schema, there are several strategies that we could use, including: Eager migration, where we make changes all at once. Lazy migration, where changes are implemented as data is used. Incremental migration, where we take small steps to implement changes. And Predictive migration, where we update the schema based on predictions of how data will be used in the future.

9. The best strategy ultimately depends on the needs of the business and the application.

10. Let's apply this to our bookstore app:

11. We are ready to release the new schema for review documents that includes a locale field. And we want to make the field required from now on. However, our dot-com team needs to continue using the original schema so that they can complete their current sprint.

12. We will add the locale field in all reviews eventually, but for now, we can leverage the schema versioning pattern to allow the old version during the migration. But the question is how do we enforce the schema if there is more than one version? A simple way to do it is using the **oneOf** keyword when we define the schema validation rules for the reviews collection.

13. But before we learn how this can be accomplished, let's look at the two schemas that we wish to use.

14. The **bookstore_reviews_default** schema doesn't require any changes. But we need to implement the schema versioning pattern on the **bookstore_reviews_international** schema, or any future versions of the schema that we wish to add to the reviews collection. Here we've added the **schema_version** field to the required array and to the properties object. We use the enum keyword to specify a list of allowed values for the field. This will help us control how many schema versions we want to support.

15. Next, we define the validator document with the oneOf keyword. This requires the input document to be valid against exactly one of the included schemas but not both. We've also set **additionalProperties** to false in each of the underlying schemas such that documents must completely conform to the required fields.

16. Now we can supply **schema_migration_validation** as the validator document when we run the collMod command. And since we are moving to staging and production, we are setting the validation level to strict and the action to error.

17. Great! Now the locale field will be added to new review documents when they are added to the collection. And our old reviews can be lazily migrated — or in other words — our changes will be made as old documents from the reviews collection are used.

18. This way, our dot-com team can continue to use the default schema as we also release the newest version to support our french site.

19. Let's recap what we have learned in this lesson: Transitioning from one schema to the next is known as **Schema Migration** and it is an essential part of the software development process.

20. You learned that you can leverage the schema versioning pattern to allow multiple valid schemas and enable controlled migrations.

21. Finally, we walked through a schema migration scenario in our bookstore app where we had to enforce more than one version of a schema for the reviews collection.

22. You learned how to use the schema validation feature with the **oneOf** keyword in the validation document to validate multiple document shapes.

23. That's the last lesson for this unit. Next, we'll wrap things up in the conclusion!
