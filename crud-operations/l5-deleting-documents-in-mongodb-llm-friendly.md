---
title: Deleting Documents in MongoDB
lesson_number: 5
skill: crud-operations
kind: video_script
word_count: 352
date_updated: 2022-05-18
learning_objectives:
  - Use deleteOne() to delete a single document
  - Write a deleteMany() query that will delete all documents that match a specific query
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/crud-operations-in-mongodb
  lesson: https://learn.mongodb.com/learn/course/crud-operations-in-mongodb-on-demand/crud-operations-in-mongodb/perform-crud-operations?page=9
---

1. In this video, you'll learn how to delete documents in MongoDB by using deleteOne() and deleteMany(). Let's jump right into it!

2. Imagine that you're working with a database that contains information about various podcasts. There's a single document for each podcast that gets added to the collection, which is called podcasts. But there's a problem.

3. At some point, a duplicate document for a podcast was inserted accidentally. We need to delete the duplicate. To achieve this, we'll first use find to determine which document to delete. Then we'll use the deleteOne() method.

4. Furthermore, your manager asks you to remove all podcasts with a category of "crime".

5. First, we provide a filter document to the find() method that contains the uploaded date of the duplicate document, which was provided to us by our manager. The date we were given is April 28, 2020. In the shell, we'll use the ISODate() wrapper to specify the date.

6. Running this command returns the duplicate document. Now we'll use the _id value to write the deleteOne() command.

7. The deleteOne() method accepts a filter document and an options object; however, we won't be using the options object in this example. In the filter document, we'll put the _id value of the duplicate.

8. After running this command, we receive a message that our command was acknowledged and that one document was deleted. Perfect!

9. Now that you know how to delete one document, let's go over the process for deleting more than one. We'll delete all podcasts that have a category of "crime".

10. First, we'll run a find for podcasts in the crime category, which returns three results.

11. Now we'll use deleteMany() to delete all three podcasts. We'll pass in a filter document that contains the field "category" and a value of "crime". Like deleteOne, the deleteMany() method accepts an options object, but it's not required for this example.

12. When we run this command, we get output showing that 3 documents were deleted, which is what we want.

13. Now let's recap what you learned in this video. To delete one document, use deleteOne() by passing in a filter document and an options object if needed. Note that the options object is not required for this query. To delete more than one document, use deleteMany(), which also accepts a filter and an options object.

14. Congratulations on working with the deleteOne() and deleteMany() methods in MongoDB!
