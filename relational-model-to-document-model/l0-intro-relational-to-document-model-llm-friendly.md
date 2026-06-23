---
title: Relational to Doc Model Intro Video
lesson_number: 0
skill: Relational Model to Document Model
kind: video_script
word_count: 415
date_updated: 2025-01-28
learning_objectives:
  - Model for Workloads, Map the relational model to the document model and apply the MongoDB methodology to data modeling.
  - Design Relationships, Model different types of data relationships and apply them to a sample application
  - Validate Schemas, Use MongoDB's schema validation feature to enforce predefined rules for documents in an application
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/relational-to-document-model
  lesson: https://learn.mongodb.com/courses/relational-to-document-model
---

1. Welcome! We're excited to help you build your skills in data modeling by focusing on how to translate what you already know about relational databases to MongoDB's document model. My name is Katie.

2. I'm John. I'm Eliza. I'm Sarah.

3. And we'll be your guides as you learn these skills.

4. You may be familiar with a more traditional data modeling methodology that begins with data entities and ends with a schema that describes tables, their relationships, and data constraints. 

5. But the goal of data modeling in MongoDB is to produce document models that are optimized for modern applications. A good data model will leverage the rich features of the database and exploit its flexible document model.

6. Unlike traditional models where data normalization is typically the first step, data modeling in MongoDB involves three design phases: Workload identification Relationship identification, and The application of design patterns In this badge, we'll walk you through the first two phases.

7. To do so, we'll use an example application. A bookstore app that sells audiobooks, ebooks, as well as printed books.

8. We'll begin by building on your knowledge of relational databases and helping you map what you already know to MongoDB's document model. After that,

9. We will learn how to identify a workload for our bookstore application. To do this, we’ll answer two key questions about our application: What are the main pieces of data (or entities) stored?  And which of those entities change over time, and how? Understanding the answers to these questions will help us apply MongoDB’s golden rule to our ultimate schema design: data that is accessed together should be stored together. When data is stored separately, the cost is two or more retrievals. But if we store it together, we only need to retrieve data once.

10. Once we’ve identified a workload and the entities in our bookstore application, we will apply the second phase of the schema design methodology: identifying and modeling the relationships that exist between those entities.

11. We’ll cover the different types of relationships that are possible with MongoDB and consider how they apply to the relationships between the entities in our bookstore application.

12. To further apply your prior SQL knowledge, we'll explore how MongoDB’s schema validation feature lets you enforce the rules governing the structure of the documents in your application.  To learn more about this, we'll set up schema validation rules for a reviews collection in our bookstore app.

13. You'll have plenty of opportunities to practice what you learned by completing labs that present real-world scenarios. This way, you'll build your knowledge and get comfortable with the software at the same time.

14. When you’re finished, you'll be ready to put your new skills to the test! To earn your badge, simply complete all the related content, and then take the short test at the end. After passing the test, you'll receive an official Credly badge via the email you provided. Be sure to share your badge on LinkedIn to show off your new skills!

15. By completing this Skill Badge, you'll know how to identify the workload and model data for your application. Let's get started!
