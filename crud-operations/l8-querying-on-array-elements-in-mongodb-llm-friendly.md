---
title: Querying on Array Elements in MongoDB
lesson_number: 8
skill: crud-operations
kind: video_script
word_count: 394
date_updated: 2022-05-20
learning_objectives:
  - Write a query to find specific documents using an equality constraint on an array field using a scalar value
  - Use $elemMatch to find documents that contain an array field with at least one element that matches all the specified query criteria
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/crud-operations-in-mongodb
  lesson: https://learn.mongodb.com/learn/course/crud-operations-in-mongodb-on-demand/crud-operations-in-mongodb/perform-crud-operations?page=6
---

1. Welcome! In this video, you'll learn how to query your MongoDB database for specific values, also called "elements," within an array.

2. First, we'll go over how to query arrays in documents. Then, we'll create a query by using the $elemMatch operator to find elements in an array that match specific query criteria.

3. Let's begin with a common use case for querying arrays in MongoDB: searching for every document with a field that contains the value we specify. For instance, here we have a collection named "accounts". Each document in this collection has a field named products.

4. Let's examine a query to find all documents that contain the value of InvestmentStock. The syntax may look familiar if you've used the equality match before.

5. This is because the query is looking for a products field that has a value equal to InvestmentStock, or a products field with an array containing an element equal to InvestmentStock.

6. After we run the query, the result provided to us is all documents that have a products field with either an array or a scalar value containing InvestmentStock. The query doesn't return any documents that don't contain that value.

7. What if you want to query for a value or values, but only return a match when they're an element of an array? In these situations, we can use the $elemMatch operator.

8. To do this, we need to use $elemMatch along with the $eq operator. This ensures that the products field is an array that contains InvestmentStock.

9. Now all of the documents returned have a products field that's an array with an element equal to InvestmentStock.

10. We can also use $elemMatch to find documents where a single array element matches multiple query criteria. We place each query criteria in $elemMatch separated by a comma.

11. In this example, we'll use a collection called "sales," and we'll focus on the items field. This field contains an array of sub-documents with the item's information.

12. This query will find all documents with at least one item from the sales collection that's a laptop, with a price greater than $800, and with a quantity greater than or equal to 1.

13. After we run this query, the documents returned will contain laptops with quantities greater than 1 and prices greater than $800.

14. Let's recap the key points covered in this video. First, we queried arrays in a document. Then, we used $elemMatch to find a sub-document that matches specific criteria in an array.
