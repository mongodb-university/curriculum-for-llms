---
title: Bloated Documents
lesson_number: 5
skill: schema-design-patterns-and-anti-patterns
kind: video_script
word_count: 798
date_updated: 2024-01-24
learning_objectives:
  - Identify a bloated document and explain why it is problematic in MongoDB
  - Identify solutions for dealing with bloated documents
  - Identify an appropriate solution for a given example
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/schema-design-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/learn/course/schema-design-patterns-and-antipatterns/schema-design-patterns-and-anti-patterns/identify-anti-patterns?page=2
---

1. Our app continues to grow in popularity! When we first modeled our book documents, we stored all related book data in a single document. As we evolve, we find ourselves adding more fields to our book document instead of refactoring our schema.  When this happens, it’s called the bloated documents anti-pattern and in this video we’ll discuss how to address it.

2. You may have heard us say that data that is accessed together, should be stored together. This is a great rule to follow when modeling data in MongoDB. However, it doesn’t mean ALL related data should be stored together.

3. When all data related to an entity is stored in a single document, despite its access pattern, we are bloating the document.

4. This is a problem because bloated documents increase the size of the working set and will eventually impact performance.

5. To keep queries running quickly, WiredTiger, MongoDB’s default storage engine, keeps data that is accessed frequently in memory.  This in-memory set is known as the WiredTiger internal Cache.  Ideally, the working set, or the portion of the indexes and documents frequently used by the application, should fit into WiredTiger's internal cache.  Database performance is impacted when the working set exceeds the internal cache size.

6. Let's see how this all fits together with an example from our bookstore app.

7. Our app’s homepage displays a list of 10 random books. When the user clicks on a book title, they land on a new page containing the book’s details. Our Book documents contain all the data required to support both pages. Lately, the homepage has started taking a long time to load and we suspect that these book documents may be to blame.

8. Let’s review some relevant details. The database for our app is running with 2 GigaBytes of RAM. WiredTiger has an internal cache of 50 percent of the RAM minus one GigaByte or 256 MegaBytes, whatever is larger. For our cluster this is 512 MegaBytes.

9. Now that we know our WiredTiger internal cache size, let’s see if our working set fits. To do this, let’s look at the logical data size of the documents in our books collection.  The logical data size of a collection is the number of documents in the collection, multiplied by the average document size.

10. Using the Data Explorer, we see that our bookstore has hundreds of thousands of books. Additionally we can see that our document size is 1.12 KiloBytes on average. Since the app homepage randomly loads book documents, all the documents in the books collection are part of the working set. Therefore, we estimate the Logical data size for the collection to be over 500 MegaBytes.

11. We can also use the stats() method in mongosh to retrieve the number of documents and the average document size. We then multiply these two numbers to determine the logical data size of the collection.

12. In our case, the logical data size of our collection is almost equal to the available WT internal cache for our database.

13. Let’s not forget that the working set also includes indexes and other data. Therefore, we are almost certain the Working Set will exceed the available memory leading to significant performance degradation.

14. To address this issue, we have two options. We can provision more memory on the cluster at a cost. Or we can update our data model to use existing memory more efficiently. Let’s take a closer look at the second option.

15. By inspecting a portion of our book document, we see that only a couple of fields are used on the homepage; the title and the author. Most of the other information in a book document is only used by the details page. This is a clear case of a bloated document because we are storing data that is accessed separately in one document. To fix the problem, we will split the data into two separate documents. Let's call them Summary and Details.

16. Next, let’s take a look at our new logical data size after the split. We see that the average document size in the Summary collection is 79 Bytes. This makes the logical data size roughly 35 MegaBytes. The majority of the data is now stored in the Details collection. This collection is only accessed when book details need to be displayed. As a result, our working set fits in memory and the application performance is fully restored.

17. Let's quickly recap what we have learned in this video. Bloated documents store data that is accessed separately in a single document. The unnecessary data increases our working set size which decreases database performance.

18. We can fix this problem by estimating our working set size and updating our data model to reduce document size and improve performance.

19. Great job! See you in the next lesson!
