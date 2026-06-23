---
title: Returning Selected Fields from a Query
lesson_number: 10
skill: crud-operations
kind: video_script
word_count: 596
date_updated: 2022-05-17
learning_objectives:
  - Use projection with the find() method to return only selected fields from a larger document
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/crud-operations-in-mongodb
  lesson: https://learn.mongodb.com/learn/course/crud-operations-in-mongodb-on-demand/crud-operations-in-mongodb/perform-crud-operations?page=9
---

1. Welcome back, team. In this video, we'll learn how to return selected fields from a query.

2. By default, queries in MongoDB return all fields in matching documents.

3. Sometimes, however, an application will only use data from a subset of these fields.

4. In this case, we can limit the amount of data sent from MongoDB, and improve the performance of the application, by selecting which fields are returned.

5. We refer to this process as projection, and it can be used in most find queries. Let's see how we can use projections in a query.

6. In these examples, we'll be working with the training database again, but we'll be querying the inspections collection. In our inspection collection, we do have quite a few documents. So let's take a look at one using the findOne method. I'll go ahead and do a db.inspections.findOne. As we can see, this document has quite a few fields on it that we might not want to see all of at the same time.

7. In order to reduce the number of fields shown in the result, we can use a projection. Let's say, for example, that I'm going to make a query to specifically look for restaurants in the 818 sector. In this case, I'll create a find query with the query document having a sector field with a value of restaurant 818. Take note of the fact that there are spaces on both sides of the hyphen in restaurant 818. By running this query, we can see that we get quite a few results back. Again, with this number of results, I might want to only look at a few fields. So we'll go ahead and reduce that by using a projection. In this case, we'll likely only want to project the specific business name and the result of its inspection.

8. To do so, I'll pass a projection document as the second argument of the find query. In this case, there's only two fields we want to see. So we'll add both of those fields to this projection document. First, we'll set up the business name. And then we'll set up the result. Note that both fields have a 1 as their value. In this case, we're using an inclusion approach to our projection document to make sure that only those specific fields are added to the result. By running this query, we can see that while we still have quite a few documents, we only can see the business name and the result for those documents.

9. Let's say, however, I also want to make sure that the _id field is not added to those documents. We can exclude that field by adding the _id field to our projection document and making sure to set the value to 0. In this case by setting the value of the _id field in the projection document to 0, we're telling MongoDB that we want to exclude this field from the result of this query parameter. Within any projection, you can explicitly turn off the _id field even if you're taking an inclusion approach to your projection. By running this query, we can see that our results while still having only the business name in the result also have gotten rid of the _id field.

10. It's important to note that inclusion and exclusion statements can't be combined in most projections. The _id field however is the exception. In general, we can either choose to include or exclude fields but not both, again, with the exception of the _id field.

11. We've seen how to select fields to return from a query. And we've seen that while the _id field is included by default, we can suppress it from the results. Now let's see how we can choose fields to exclude.

12. Let's say we want to write a query that allows us to find all the documents that either passed or received warnings for their inspection result. We'll need to write a query that takes advantage of the in operator here. In this case, we'll definitely be looking for values for the result. Although our query document has the field for results, we'll need to do something a little bit more special for the value. In this case, we want to use an operator. So we'll need to pass a document for the value of the result field here. Within this document, we're going to want to take advantage of the in operator to pass an array of different elements that could be values for this result. To do so, we'll need to make use of the $in operator.

13. This query as written will now allow us to see all of the results that have either received a pass or a warning for the result in these inspections. As you can see, there's still quite a few fields on these though. So let's go ahead and fix up our query by adding in a projection.

14. First, we'll add a date and make sure that the value is set to 0 so that it doesn't appear in the result. Next, we want to make sure that the zip codes for the address don't appear in the result as well. Notice the use of the quotation marks around "address.zip." Any time that you want a subfield of a particular field in a document to not appear, you'll use dot notation. This dot notation will also require you to use the quotation marks around the field name. If you omit these quotation marks, your query will fail in a syntax error. Running this new query, we can see that we don't see the date field or the zip code within any one of these documents. Again, take note of address being a subdocument unto itself. When we use that dot notation for zip, we're making sure that we can access the subdocument within the parent document in this case!

15. Let's recap a few takeaways from this video. We saw how to return selected fields from a query. We learned that projection is what we call this process of selecting the fields returned in the result set. Projections are useful because they limit the amount of data returned from the database, which can improve application performance.

16. We saw how to select fields to return by adding a projection document as our second parameter in calls to find().

17. To select the fields to include, we set their values to 1. To exclude fields, we set their values to 0.

18. Remember that inclusion and exclusion statements can't be combined in projections. The _id field is an exception.

19. Congratulations, you're ready to start using projection in your projects!
