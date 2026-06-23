---
title: Schema Validation
lesson_number: 10
skill: Relational to Document Model
kind: video_script
word_count: 934
date_updated: 2024-02-13
learning_objectives:
  - Define Schema Validation
  - Briefly Introduce JSON Schema standard
  - Identify when to use schema validation
  - Identify the different validation levels
  - Identify the different validation actions
  - Implement schema validation rules for the reviews collection in the Bookstore App
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB schema validation concepts; segments preserve the original teaching sequence and speaking register from the video script and are not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/relational-to-document-model
  lesson: https://learn.mongodb.com/learn/course/relational-to-document-model/relational-to-document-model/validate-schemas?page=1
---

1. We're preparing to launch the reviews feature for our bookstore app on our main dot-com site. Before we do this, we want to enable schema validation for the reviews collection to make sure that only review documents with the desired shape or schema are added to the collection.

2. In this video we'll discuss how to use the schema validation feature in MongoDB to create and enforce rules governing the structure of documents. In particular, we’ll cover three important concepts: validation rules, validation levels, and validation actions. Let’s start with validation rules.

3. Thanks to MongoDB’s flexible schema, documents with different shapes can coexist in the same collection and their structure can be modified at any time.

4. But once your application is established and you know how you want to organize your data, schema validation ensures that there are no unintended schema changes, or improper data types and values.

5. For example, if we want usernames to be stored as a string, adding validation rules can help us make sure that a new user document won’t be written to the database if the username field value is not a string.

6. In general, the schema acts as a contract between database users because schema changes cannot be made unless all stakeholders agree.

7. MongoDB’s Schema Validation feature lets you create validation rules for your fields and gives you control over what is written to the database. We can define these rules when creating a new collection. MongoDB will then validate documents when they are inserted or updated in this new collection. If you add validation rules to an existing collection, only newly inserted documents are checked for validation. Documents that are already in the collection are only validated when they are updated.

8. To define schema validation rules, you can use query operators or the JSON Schema standard.

9. JSON Schema is a well known standard that allows you to describe and validate JSON documents.

10. The MongoDB $jsonSchema operator is used to define validation rules for your document fields using the JSON Schema standard. Let’s look at an example.

11. Here, we’re creating a new collection and we define the validation rules using both a query operator and the $jsonSchema operator. The $lt operator specifies that items.discountedPrice should be less than items.price and $jsonSchema specifies that the items field must be an array.

12. Nice! But you may be asking: What happens to existing documents in the collection after we define schema validation rules? Great question! MongoDB offers a validation level option to control the enforcement.

13. There are two options: Strict, which applies rules to all inserted and updated documents.

14. And Moderate, which only applies rules to new and existing documents which have been validated.

14.1. Keep in mind invalid documents that existed before the validation was set are not checked for validity when they are updated.

15. So how do you identify invalid documents after you’ve established validation rules?

15.1. You can run a find query with the $nor operator to find the documents that don't match the schema.

16. At this point, we have defined our schema validation and chosen a level of enforcement. Next we need to decide what happens when a document fails validation. This is known as the validation action.

17. Much like the validation level, the validation action has two options: Error, which rejects insert and update operations that fail validation. And Warn: where the operations complete successfully, however the validation failure is recorded in the log. The default action is to return an error.

18. Let's see an example of schema validation in our Bookstore app.

19. We want to ensure that these fields exist in review documents and have the correct type.

20. To do this, first we need to define the schema for review documents.

21. Here, we define the jsonSchema document that will be used as the value of the $jsonSchema operator. The schema document begins with an optional field named bsonType. The field can be omitted but if it is set then the value must be “object.” Next, the required array includes all the fields that must be present in the document. And, we set additionalProperties to false to indicate only the fields under required are allowed; any other fields in the document will trigger a validation failure. And finally, the properties document, which includes the required bsonType for each field we want to validate.

22. We’re also using keywords to define rules for two of our properties. We use minimum and maximum to specify that a rating must be between 0 and 5, inclusive. And we use maxItems to limit the size of the comments array to 3. This way we prevent an unbounded array.

23. Let’s put everything together now and get ready to enable validation! Since we are modifying an existing collection, we use the collMod command to enable schema validation for the reviews collection. We supply schemaValidation as the validator document and specify the desired validation level and action. In our case we want to be strict and abort operations when validation fails to avoid unwanted documents in the database.

24. Great, we have now enabled schema validation for the reviews collection in the bookstore. Now, all the documents inserted or updated in the reviews collection must satisfy the specified schema validation rules.

25. Let's recap what you learned in this lesson: Schema validation allows you to enforce rules governing the structure of the documents in your application.

26. With MongoDB’s schema validation feature you can use the JSON Schema standard or query operators to define validation rules. And in addition to validation rules, we can also specify validation levels and actions.

27. Finally, we walked through how to set up schema validation rules for the reviews collection in our bookstore application. Great job! See you in the next lesson!

