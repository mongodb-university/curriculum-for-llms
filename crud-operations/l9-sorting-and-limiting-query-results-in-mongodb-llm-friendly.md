---
title: Sorting and Limiting Query Results in MongoDB
lesson_number: 9
skill: crud-operations
kind: video_script
word_count: 594
date_updated: 2022-05-17
learning_objectives:
  - Use .sort() to arrange query results in descending and ascending order
  - Use .limit() to limit the amount of results returned by a query
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/crud-operations-in-mongodb
  lesson: https://learn.mongodb.com/learn/course/crud-operations-in-mongodb-on-demand/crud-operations-in-mongodb/perform-crud-operations?page=8
---

1. Welcome! In this video, we'll learn to return query results in a specified order and to constrain the number of results returned.

2. To do this, we'll use two cursor methods, cursor.sort() and cursor.limit().

3. First, some context on cursors and cursor methods in MongoDB. A cursor is a pointer to the result set of a query.

4. The db.collection.find() method returns a cursor that points to the documents that match the query.

5. Cursor methods, which are chained to queries, can be used to perform actions on the result set - like in this case sorting and limiting the number of results - before returning the desired data or information to the client.

6. Ok, let's see the sort() and limit() cursor methods in action. First, we'll return results in a specified order using the sort() method.

7. We're working with a database called training and within that we are going to be querying the companies collection. Let's take a look at one of the documents by using the findOne() method. To do so I run db.companies.findOne(). Running this, we can see that we get a pretty large document with quite a few different fields on it. Some of these are numbers. Some of them being containers for sub-documents, there's just a lot going on here. We can definitely take advantage of one of the fields on this document to sort by the name of these companies.

8. As an example, let's try to return the data for only music companies and sort them alphabetically by the name of the company. To do so, we'll go ahead and do another DB.companies.find. And in our query document, we'll only look for a category code set to music. This will ensure that of all the results that we get back, we're only looking at music companies. From there we definitely want to sort our results. However, sort isn't clear as to how we're going to sort those results. So we'll need to pass another document in order to specify that we're going to sort on the name in increasing alphabetic order. Any time that you're passing a document to the sort method, a value of 1 will specify that you want ascending order and a value of negative 1 will specify that you want descending order for that property. In this case, we're only sorting on the name property. But you can definitely sort on multiple fields at the same time by passing additional fields to this document. Let's go ahead and run our query. Let's go ahead and take a scroll through our results to see if we can tell if our data has been alphabetized appropriately. Scrolling through, we can find that we have a document with the name of a meme, and as we continue to scroll higher, we can find companies that fall earlier in the alphabet for the alphabetization of the company names. To make this a little bit easier to read, we might want to use a projection. We'll talk more about projections in one of the coming lessons of this particular unit. In our case, the use of this projection is going to make it easier to see only the name fields of the documents returned by the query. As you can see in our result, the documents have been organized by their name field. However, there's a few exceptions here down at the bottom. One of the things to know about alphabetization in MongoDB is that capital letters will be sorted first and grouped together, followed by the lowercase letters being sorted and put together.

9. We've seen how to sort query results using an example sorted on a string field. We can sort numeric fields or fields of any other type in the same way.

10. Now let's limit the number of results returned. Limiting the number of results can enhance performance of an app by avoiding unnecessary data processing. We use the limit() cursor method to do this.

11. Say we want to find the three music companies with the highest number of employees.

12. We used the limit cursor method to do this. Say we want to find the three music companies with the highest number of employees. We can start by writing a query that is very similar to the last example where we did a DB.companies.find, with the category code set to music. Then, in our sort, we'll want to pass a query document that will allow us to sort in descending order of the number of employees for each one of our documents. This will give us a result with the documents in the reverse sorted order of the number of employees. But we only want the top three. So let's also limit our results. Again, the limit method allows us to limit exactly how many documents will appear in the final result returned to the client. We can pass an argument for the number of values that we want to see in that particular result. In our case, we only want the top three. So we'll change this value to a 3. Again, these documents are pretty big and a little bit difficult to scroll through. So we might want to add a projection to make this, again, easier to read. In this case, we've added two fields to our projection, both the name of the company and the number of employees that they have. And in this result, we can see that the top three companies are going to be Spotify with 5,000 employees, Rhapsody with 150 employees, and Official VirtualDJ with 102 employees. Again, if you don't understand projections, not to worry. We'll definitely be covering them very soon.

13. To summarize, in this video we learned to sort and limit query results.

14. You can use the cursor.sort to return query results in a specified order. You can also use cursor.limit to constrain the number of results that you've returned.

15. Remember, limiting the number of results can improve performance in your application by avoiding unnecessary data processing.
