---
title: Updating MongoDB Documents by Using updateMany()
lesson_number: 4
skill: crud-operations
kind: video_script
word_count: 411
date_updated: 2022-08-25
learning_objectives:
  - Use updateMany() to update more than one document at a time
  - Identify the characteristics of the updateMany() method, specifically its non-transactional nature and that all matching documents will be updated
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/crud-operations-in-mongodb
  lesson: https://learn.mongodb.com/learn/course/crud-operations-in-mongodb-on-demand/crud-operations-in-mongodb/perform-crud-operations?page=7
---

1. In this video, you'll learn how to update multiple documents in a single MongoDB collection by using the updateMany() method.

2. The updateMany() method accepts a filter document, an update document, and an options object. The options object is not required, and we won't use it in this video.

3. The filter document contains the selection criteria for the update. In this example, { year: 2022 } is the filter document within the updateMany method.

4. The update document contains the modifications to apply to all documents that match the filter.

5. Imagine that we want to update all the books in a collection that meet certain criteria. We can use the updateMany() method to do this.

6. Here's one document from the books collection. It includes information about a single book, including fields like _id, title, publishedDate, status, and authors.

7. We'll use updateMany() to update all documents that were published before 2019 to have a status of legacy.

8. First, let's examine the filter document. Here, we'll use the $lt operator followed by the date January 1, 2019, because we want books that were published before 2019. Any documents that match this filter will get updated.

9. Then, we need to tell MongoDB how to update the documents that match the filter. In the update document, we use the $set operator to update the value of the status field to "LEGACY". Now we can run the updateMany() method on the books collection.

10. The output shows that our update was successful because the matchedCount and modifiedCount are both the same. Pretty useful, right?

11. Now that you know how to use updateMany(), let's go over when to use it.

12. It's important to note that updateMany() is not an "all-or-nothing" operation. By this we mean that in the rare instance where the operation fails, updateMany() will not roll back the updates, so only some documents may be updated. If this happens, you need to run updateMany() again to update the remaining documents. updateMany() also lacks isolation, which means that updates will be visible as soon as they're performed. Because of this, updateMany() is not appropriate for some use cases that may be essential for business requirements, such as financial transactions.

13. Let's recap what you learned in this video. In MongoDB, you can update multiple documents with updateMany(). This method accepts a filter document, an update document, and an options object. It returns an output message that shows the number of matched and modified documents. When the operation fails, updateMany() does not roll back the updates if all documents aren't updated. Running updateMany() again will complete the multi-document update. Overall, updateMany() is a convenient and efficient way to update multiple documents in a collection.
