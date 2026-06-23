---
title: Intro to CRUD Skill Badge
lesson_number: 0
skill: crud-operations
kind: video_script
word_count: 586
date_updated: 2025-02-20
learning_objectives:
  - Perform CRUD operations - understand what CRUD methods in MongoDB are and how to use them to effectively manage data, including inserting, finding, updating, and deleting documents
  - Design effective queries - understand how to use query operators such as $set, $push, $gt, $lt, $in, $or, etc., to retrieve data efficiently
  - Modify query results - be able to apply sorting, limiting, and projection techniques to shape query outputs and count documents efficiently
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/crud-operations-in-mongodb
  lesson: https://learn.mongodb.com/courses/crud-operations-in-mongodb
---

1. Welcome! We're excited to help you build your skills using CRUD Operations in MongoDB. My name is Katie, and I'm a Curriculum Designer here at MongoDB. My colleagues, Julie and Cam, and I will be your guides through this Skill Badge.

2. Create, Read, Update, and Delete, also known as CRUD, are foundational operations in any database. MongoDB's flexible data model makes it easy to perform CRUD operations and optimize queries.

3. The Create operation allows us to add new data to the database. The Read operation allows for retrieving and viewing data from the database. It enables users to query the database to retrieve data that meets certain criteria. The Update operation enables modifications to existing data. This is important for correcting errors, updating information, and keeping data current and relevant. Finally, the Delete operation allows for the removal of data from the database.

4. For this Skill Badge, we'll cover how to perform these operations to manage your data. We'll also explain how to use specific operators when performing CRUD operations to retrieve data efficiently. And finally, we'll show you how to apply techniques like sorting, limiting, and projection to modify your results to fit specific criteria.

5. We'll begin with the Create operation by going over how to insert documents.

6. In MongoDB, we insert documents by using two methods, insertOne() and insertMany().

7. Then we'll focus on how to query, or read, documents by using the find() method. We'll incorporate operators such as $in and $eq, as well as comparison and logical operators to help refine our queries. We'll also explore how to query arrays in documents by using the $elemMatch operator.

8. Moving onto Updating, we'll show you how to use the updateOne() and updateMany() methods to update a single document or multiple documents at once, respectively. We'll also cover various operators that you can use with these methods to more easily modify your documents, such as $set, $push, and the upsert option.

9. Next, we'll show you the two methods for deleting documents, deleteOne() and deleteMany(). We will cover how and when to use each method.

10. Finally, to build on your CRUD skills, we'll demonstrate how sorting, limiting, and projection can help you tailor query results to meet specific needs.

11. You'll have plenty of opportunities to practice what you learned by completing labs that present real-world scenarios.

12. When you're finished, you'll be ready to put your new skills to the test! To earn your badge, simply complete all the related content, and then take the short skill check at the end. After passing it, you'll receive an official Credly badge via the email you provided. Be sure to share your badge on LinkedIn to show off your new skills!

13. By completing this Skill Badge, you'll know how to commit CRUD operations and modify queries to improve application performance. Let's get started!

