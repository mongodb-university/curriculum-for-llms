---
title: Finding Documents Using Logical Operators
lesson_number: 7
skill: crud-operations
kind: video_script
word_count: 617
date_updated: 2022-05-20
learning_objectives:
  - Write a query expression that limits search results based on logical operators ($and, $or)
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/crud-operations-in-mongodb
  lesson: https://learn.mongodb.com/learn/course/crud-operations-in-mongodb-on-demand/crud-operations-in-mongodb/perform-crud-operations?page=7
---

1. Hello there! In this video, you'll learn how to use logical operators in MongoDB. The logical operators we'll work with are: $and and $or.

2. Let's start with $and. The $and operator performs a logical AND operation on an array of one or more expressions. It will return all documents that meet all the criteria specified in the array.

3. The $and operator also has an implicit syntax that we often use to simplify a query expression. All we need to do is add a comma between each query expression! This comma acts just like the $and operator.

4. When using the $and operator, remember that if any one of the criteria isn't met in a given document, the document will not be included in the results.

5. Before we dive into an example, let's examine a sample document from a collection called routes. Every document in this collection holds information about a particular flight route, like the number of stops, type of airplane, airline, source airport, and destination airport.

6. Now let's examine the following query: Inside the $and operator array, we're searching for all documents that have an airline named Southwest Airlines AND have a number of stops greater than or equal to 1.

7. We can simplify the syntax by using implicit AND. The query will return the same documents.

8. After running this command, MongoDB returns all documents that contain one or more stops, and the airline is Southwest Airlines.

9. That was easy! Let's move on to the next logical operator, $or. The $or operator performs a logical OR operation on an array of two or more expressions, and selects the documents that match at least one of the expressions given.

10. In this example, we've created a new query using the $or operator that searches for every flight coming out of or going into the Seattle-Tacoma International Airport, which is abbreviated as SEA.

11. After running the query, MongoDB returns all documents that contain either a destination or source airport of SEA.

12. Logical operators are useful when used by themselves, but we can also use them together. That means we can have an $and operator expression made up of multiple $or operator expressions. Let's take a look at this in practice!

13. First, we'll use the $and operator with multiple $or expressions.

14. In this example, we'll search for every flight that has SEA as either a destination OR source airport.

15. We'll also search for every flight operated by American Airlines OR that are flown on an Airbus 320 airplane.

16. Running the query returns all documents that contain flights that have flown in or out of SEA, AND flights operated by American Airlines OR that are flown on an Airbus 320.

17. You may be wondering why we didn't use the implicit AND syntax in this situation.

18. Let's see what happens when we run the same query without the $and operator.

19. The returned results don't look quite right. There are a lot of airplane values that are Airbus 320s and some airline values that are American Airlines. But we don't see incoming and outgoing flights for SEA. Why didn't this work?

20. Our first $or expression, the incoming and outgoing flights, was overwritten by the subsequent $or expression, American Airlines or Airbus 320. This happened because we can't store two fields with the same name in the same JSON object.

21. As a general rule, when including the same operator more than once in your query, you should use the explicit $and operator.

22. Excellent job! You now know how to implement the $and and $or logical operators in your queries. You also learned how to use the explicit $and when using other expressions with the same operator.
