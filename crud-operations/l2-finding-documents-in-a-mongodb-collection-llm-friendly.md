---
title: Finding Documents in a MongoDB Collection
lesson_number: 2
skill: crud-operations
kind: video_script
word_count: 354
date_updated: 2022-05-16
learning_objectives:
  - Find a single document using find() and the implicit equality operator
  - Find a set of documents using $in
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/crud-operations-in-mongodb
  lesson: https://learn.mongodb.com/learn/course/crud-operations-in-mongodb-on-demand/crud-operations-in-mongodb/perform-crud-operations?page=3
---

1. In this video, you'll learn how to find documents in a collection by using the find() method. You'll also learn how to use the $in operator when using the find() command.

2. Before jumping into our database, let's take a moment to look at the syntax for the find() method. To use the find() method, append it to the database and collection name in this format: db.collection.find().

3. For this example, we'll work with a database called training and query its collection called zips. We can use the find() method to view all the documents in the collection. To do this, we run db.zips.find(). This returns a cursor with the results, which are addresses in the United States. The shell will automatically iterate through our cursor once the results are returned.

4. To see more results, we can use the it shell directive, which will iterate through the long list of results. Let's type it and press Enter a couple of times to view more documents that were returned from our query.

5. Now, let's say we want to retrieve a specific document from our collection. We can do this in two ways. We can use the $eq operator, or we can use the implicit syntax of $eq to shorten the length of our query with a field and the associated value.

6. To do this, first we specify the field we're interested in. For this example, we want the state field followed by the value of the field. In this case, we want AZ, which is short for Arizona.

7. After we run the command, the corresponding documents will be returned.

8. Now that we know how to find documents in a collection, let's go a step further by using the $in operator.

9. The $in operator allows us to select all documents that have a field value equal to any of the values specified in the array.

10. Before we create a query using the $in operator, let's first examine how to structure our query. We specify the field we're interested in, followed by "dollar in," and then an array of values that we want to match.

11. Let's see the $in operator in action to get a better understanding of how this works. In this expression, we want to find every document with a value of the cities of Phoenix or Chicago.

12. After we run this command, the database responds with all the resulting documents of the cities of Phoenix and Chicago.

13. Here are the key takeaways from this video: We can use the $eq operator to find documents with a field and a value. We can use the $in operator to select documents that have a field value equal to any of the values specified in the array.
