---
title: Inheritance Pattern
lesson_number: 1
skill: schema-design-patterns-and-anti-patterns
kind: video_script
word_count: 960
date_updated: 2023-09-11
learning_objectives:
  - Define the inheritance pattern
  - Recognize the typical situations where the inheritance pattern can be applied
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/schema-design-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/learn/course/schema-design-patterns-and-antipatterns/schema-design-patterns-and-anti-patterns/apply-schema-design-patterns?page=1
---

1. Human beings are inherently good at generalization and classification. We tend to group things by their commonalities. In this video, we’ll discuss the **inheritance pattern,** which helps us group similar documents within a collection.

2. The inheritance pattern is based on the notion of polymorphism where each document in a collection can have a different form or shape. Polymorphism is a key feature of MongoDB’s document model.

3. So, for the inheritance pattern, different forms of similar entities can exist in the same collection. There can be a parent entity that includes fields shared across all child entities. At the same time, the child entities can contain unique fields.

4. Use the inheritance pattern when your documents have **more similarities than differences**, and you want to keep them in the same collection so they can be read together.

5. Let's take a look at an example from our bookstore app.

6. As you may recall, we have separate entities for printed books, audiobooks, and ebooks which have many shared attributes.  Each entity also has attributes specific to the media type.

7. When deciding how to store these documents, remember the golden rule – data that is accessed together should be stored together.  Since we query for all books together, regardless of their media type, we should keep them in the same collection. This is where the inheritance pattern can help.

8. Let’s examine this document for an e-book to see what the inheritance pattern looks like in practice. The ebook includes all the attributes shared by all the book entities - like `title`, `author`, `genres`, price, and `publisher`. It also contains `product_type`.

9. The product-type field tells applications using the data what document shape and field names to expect.  In this case, the app should expect the shape of an ebook document.

10. Now, consider the audiobook version of the same book. First thing to note is that it has a `product_type` of `audiobook`. Notice that some fields are shared with ebooks – like `download_url`. And, some fields are brand new, like the `narrator`, `duration`, and `time_by_chapter array`.

11. Now let’s review our last book type - printed book. Both the audiobook and the ebook entities contain a `download_url` which doesn’t make sense for a printed book. As a result, we removed this field from the printed book entity and added print specific fields such as the stock level and delivery time.

12. Our book collection now contains different shapes for the various product types we manage using the product_type field to distinguish between them. From a MongoDB data modeling perspective we have a set of polymorphic documents living side by side within the books collection!

13. Recognizing and implementing the inheritance pattern at the design phase is ideal. That is, we want to design for it before we get too far into our app development.

14. However, the real world is far from ideal. The most likely scenario is that we have to transform an existing data model into one that better fits the needs of our app.

15. Lucky for us, MongoDB has a rich and powerful data transformation framework known as Aggregation. If you’ve never worked with the Aggregation framework, or simply need a refresher, check out some of our existing content on it.

16. We can use the aggregation framework to apply the inheritance pattern to large numbers of documents or an entire collection. Let’s look at an example. Assume we have a set of book documents that list the same book, but have different shapes.

17. The first document appears to be a printed book, since it lists the number of pages.

18. The second looks like an ebook due to the eformats field.

19. And the third must be an audiobook since it lists the length in minutes.

20. Our goal is to apply the inheritance pattern to these documents using the aggregation framework. We’ll use two pipelines to add product type and product id fields to all documents in the books collection and make some of the shared fields consistent.

21. In our first pipeline, we’ll update all book documents with a new product type field and set the value to unspecified, which we’ll update in our second pipeline. We’ll also add a product id field for all documents. Next, we’ll make some of the shared attributes more consistent by combining the details and desc fields into one field named description. We’ll also change the author field to an array and rename it authors. Lastly, let's save the data to the books collection.

22. After running this pipeline we are almost there! Note that the first pipeline left the product type field with an “unspecified” value. We'll need to run a second pipeline to finish applying the pattern. Let’s start with the audiobook documents.

23. In this pipeline, if there is a product type of unspecified and a length_minutes field greater than or equal to zero, then we set the product type to audiobook and save our changes. We would then repeat similar pipelines for the printed book and ebook documents, but we won’t repeat that here.

24. After running both aggregation pipelines, we can see that the audiobook document has been updated. The `desc` field was renamed `description` and its `product_type` changed to `audiobook` from `Unspecified`. Also note that the author field was renamed to authors and the value was converted from a string to an array. Nice work applying the pattern!

25. Now let's recap what you've learned. The inheritance pattern provides a way for us to store polymorphic data in the same collection.

26. By using a field to track the shape of documents, applications can appropriately handle different kinds of documents within the same collection.

27. And finally, you learned that you can use the aggregation framework to apply the inheritance pattern to an existing collection.
