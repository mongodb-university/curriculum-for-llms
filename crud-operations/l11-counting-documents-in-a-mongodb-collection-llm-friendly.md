---
title: Counting Documents in a MongoDB Collection
lesson_number: 11
skill: crud-operations
kind: video_script
word_count: 475
date_updated: 2022-05-17
learning_objectives:
  - Use .countDocuments() to return the count of documents given a query to match
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/crud-operations-in-mongodb
  lesson: https://learn.mongodb.com/learn/course/crud-operations-in-mongodb-on-demand/crud-operations-in-mongodb/perform-crud-operations?page=10
---

1. Welcome back team. In this video, we'll learn how to count the number of documents that match a query.

2. We'll count the documents in MongoDB using the countDocuments collection method.

3. The syntax for countDocuments is db.collection.countDocuments. This method takes two parameters. A query document, which allows us to select the documents that we'd like to count. And an options document, which allows us to specify the counting behavior. Since the options document is very rarely used, we won't discuss it here.

4. Let's see countDocuments() in action. We'll start with a basic example, counting all documents in a collection. Later we'll count documents with a more complex query.

5. In this example, we'll be working with the training database again, but we'll be working with the collections called trips. Let's take a look at one of the documents. These documents include quite a few fields with information about the beginning and end of trips, the bike ID that was used during that trip, and how long that trip took. Let's run an operation where we simply count the number of total trips in our entire collection.

6. By doing a db.trips.countDocuments, we'll simply count all of the documents that are in the trips collection. As you can see, there's 10,000 documents in the collection right now. Let's say we want to do something more complex, like only count the trips that are more than 120 minutes. That's something we can do very easily using the countDocuments method. Let's take a look.

7. In this case, we'll start off with the countDocuments method and our query document again, and we'll start by specifying our trip duration field. To do so, we're going to need to use the greater than operator. We're definitely going to have to insert another document here for our value. Within that document, we'll use the greater than operator with a value of 120.

8. As we can see, we've created a query now specifically to ask for trip durations that are greater than 120 minutes. We also want to make sure that we're only counting documents for our subscribers. So we'll add an additional field to this query document.

9. By running this query, we can see that we have a little over 7800 documents that fall into this count.

10. Let's recap what we learned in this video. We saw how to count the number of documents return from a query using db.collection.countDocuments.

11. countDocuments takes two parameters. The first is a query parameter. While we used basic queries in our example, you can include just about any query in your query parameter. The second parameter specifies options that affect the count behavior.

12. Congratulations. You're ready to count documents to your heart's content.
