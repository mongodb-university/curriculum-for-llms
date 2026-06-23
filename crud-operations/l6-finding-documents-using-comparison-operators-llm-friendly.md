---
title: Finding Documents Using Comparison Operators
lesson_number: 6
skill: crud-operations
kind: video_script
word_count: 529
date_updated: 2022-05-16
learning_objectives:
  - Write a query expression that limits search results based on relational/comparison operators ($gt, $lt, $gte, $lte)
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/crud-operations-in-mongodb
  lesson: https://learn.mongodb.com/learn/course/crud-operations-in-mongodb-on-demand/crud-operations-in-mongodb/perform-crud-operations?page=5
---

1. Hello there! In this video, you'll learn how to use comparison operators in MongoDB.

2. We'll work with the following operators: $gt (greater than), $lt (less than), $lte (less than or equal to), and $gte (greater than or equal to).

3. The names of comparison operators follow a pattern, so they're easy to remember. Note that each operator starts with a $ to distinguish it from a field.

4. To use a comparison operator, we specify a field followed by the comparison operator and a value.

5. Let's go over each of the comparison operators to get a better idea of how they work. We'll start with $gt, the "greater than" operator. It returns documents where the field contains a value greater than the specified value.

6. Let's examine the following document, which contains an items field that's an array of sub-documents. The items field contains various fields for each item, including the price, which is what we're interested in.

7. We access sub-documents by using dot notation.

8. In this expression, we want to find every document with at least one item price greater than $50. To access sub-documents, we must first specify the document field name, followed by the name of the sub-document field name in quotes. In this case, it's the items.price field.

9. When we run this command, all the results contain at least one item sub-document with a price greater than $50.

10. We can also easily find items with a price less than $50 by changing a single letter in our expression, from $gt to $lt.

11. The expression now returns every document that contains an item sub-document with a price less than $50.

12. Next, let's look at $lte, the "less than or equal to" operator. It works like the "less than" operator, except that it returns all documents less than or EQUAL to a given number.

13. In this expression, we're searching for every document in the sales collection containing a customer whose age is less than or equal to 65.

14. After we run this command, all the results will contain a customer who is 65 years or younger.

15. While we're at it, let's take a quick look at the "greater than or equal to" operator. We just need to update the $lte operator to $gte.

16. The expression now returns every document with a customer whose age is 65 years or older.

17. Awesome job! You now have a basic understanding of how to implement comparison operators in your queries. Here are the operators we covered: $gt (greater than), $lt (less than), $lte (less than or equal to), and $gte (greater than or equal to). MongoDB isn't limited to the comparison operators covered in this video. We have a wide range of comparison operators to choose from. Check out our documentation to experiment with some of the other operators MongoDB supports.
