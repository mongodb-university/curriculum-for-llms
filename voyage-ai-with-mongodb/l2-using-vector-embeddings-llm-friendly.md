---
title: Lesson 2 - Using Vector Embeddings with MongoDB
lesson_number: 2
skill: voyage-ai-with-mongodb
kind: video_script
word_count: 1501
date_updated: 2026-06-18
learning_objectives:
  - Learn how to store vector embeddings in databases and use them for efficient search.
  - Generate vector embeddings using VoyageAI for your data.
  - Understand different database options for vector search, including MongoDB.
  - Learn how to leverage auto-embedding capabilities and distinguish between API-generated embeddings and database-managed embeddings.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/voyage-ai-with-mongodb
  lesson: https://learn.mongodb.com/learn/course/voyage-ai-with-mongodb/voyage-ai-with-mongodb/using-vector-embeddings-with-mongodb
---

1. So far, we learned that vector embeddings are numerical representations that capture semantic meaning. We saw how the phrase "ancient construction methods" becomes an array of 1,000+ numbers that encode relationships and context.

2. What happens when you have millions of documents, each with its own embedding? How do you store them? How do you search through them efficiently? And most importantly, how do you integrate this into real applications? That's where databases, like MongoDB, come in. You need a place to store your embeddings and the tools to search through and retrieve them efficiently.

3. In this video, we'll explore how to generate embeddings using Voyage AI and store them in MongoDB. We'll look at two approaches: generating embeddings yourself through the Atlas API, and letting MongoDB handle it automatically.

4. While you can recalculate your embeddings for every search, and access them in memory each time you query them, the most efficient way to leverage embeddings in your application is to store them in a vector database. These can be specialized vector databases or general-purpose databases that support vector data types and similarity search.

5. This is where MongoDB comes into the picture. MongoDB has built-in support for vector data, allowing you to efficiently store and query vector embeddings alongside your other operational application data. This simplifies your architecture: you don't need to maintain a separate database for vectors or generate embeddings on the fly every time you search.

6. Ok, now let's ask, what kind of data should you embed? Product descriptions, customer reviews, user profiles. Any text where you want to find semantically similar content rather than exact keyword matches.

7. You store the original content alongside its embeddings, ready for vector search queries. While multimodal data like images can also be embedded, that requires a more advanced data modeling approach, so we'll focus on text in this lesson.

8. Once you have embeddings for your data, you can build applications like Retrieval Augmented Generation, or RAG. RAG combines vector search with generative AI to provide more accurate and contextually relevant responses.

9. For example, you could build a customer support chatbot that retrieves relevant information from your knowledge base using vector search and then generates natural language responses based on that information.

10. So how do we get started building these kinds of applications? Let's take a look at an example and see how to work with MongoDB and vector embeddings in practice.

11. First, we need to set up our environment and connect to MongoDB. Here we're importing pymongo for MongoDB connectivity and dotenv to load our connection string securely from environment variables. We establish a connection to MongoDB using the URI from our environment, then select a database and collection to work with.

12. We'll use the same 15-document dataset from the previous lesson: documents with titles, descriptions, and categories spanning architecture, health, technology, and art. We'll generate embeddings for the description field, since that's where the semantic meaning lives.

13. Now let's generate embeddings for our data. We'll use the same Voyage AI SDK from the previous lesson. Let's import it and initialize the client.

14. Now we can generate embeddings. We'll extract the descriptions from our data and send them to the API. A few important things to note here. We're submitting a batch of documents in one request to generate a batch of embeddings. This approach is efficient and straightforward. We're using input_type="document" because we're embedding data that will be stored and indexed. This tells the model to optimize the embeddings for retrieval, making similar documents cluster together in vector space. The rule of thumb is: at index time, use "document"; at query time, use "query". We'll come back to that when we run our search. For this example, we're using voyage-4, but you can choose any Voyage model based on your use case and requirements.

15. When we run this code, we receive embeddings for all 15 documents: Each document now has a vector representation. Notice how the embedding is an array of floating-point numbers. This is the high-dimensional vector.

16. Now let's attach these embeddings to our documents and insert them into MongoDB. We loop through our data, add the corresponding embedding vector to each document, then insert the whole batch.

17. Before we can search, we need to create a vector search index on the embedding field. This tells MongoDB the shape of our vectors and how to measure similarity. numDimensions must match the output size of your embedding model — voyage-4 produces 1024-dimensional vectors by default but we'll touch on that later. We use dotProduct similarity, which works well with Voyage AI's normalized embeddings. The path is "embedding", the field name we used when storing our vectors.

18. Now we can search. Recall the rule of thumb: at query time, use input_type="query". This prepends a different instruction that captures the intent of the query rather than the content of a document. Both live in the same vector space, so we can compare them directly. We generate an embedding for our query text, then pass it to $vectorSearch as a queryVector.

19. Let's walk through setting up the vector search stage. We set index to "vector_index", the index we just created. The path is "embedding", the field where we stored our vectors. We provide queryVector with the embedding we just generated. numCandidates controls how many documents MongoDB considers before returning the final ranked results — a higher value gives better recall at the cost of speed. Finally, limit caps the number of results returned.

20. Just like our original python example without a database, we get back semantically relevant results (documents about Greek and Roman architecture and Gothic cathedrals) even though none of them contain the words "construction methods". The difference now is that MongoDB is storing the embeddings and doing the search, which is a more scalable and efficient solution than our prior example.

21. This approach gives you full control. But in a real application, data changes. Every time you add or update a document, you're responsible for regenerating its embedding, attaching it, and keeping it in sync with the source text. As your dataset grows, that operational overhead adds up. That's where MongoDB's auto-embedding feature becomes helpful. Let's look at a simpler approach.

22. With auto-embeddings, MongoDB automatically generates embeddings for new data as it's added to your database, so you don't have to call the API or manage the embedding generation process and maintenance separately.

23. Here's how it works: you set up a vector search index with auto-embedding enabled, and MongoDB handles the rest. Let's walk through this. We're using SearchIndexModel to define our vector search index configuration. In the definition, we specify a field with type "autoEmbed". This tells MongoDB to automatically generate embeddings for this field. The modality is "text" since we're working with text data. The path is "description". This is the field in our documents that MongoDB will generate embeddings for. We specify the model as "voyage-4", which is the Voyage AI model MongoDB will use to generate the embeddings. We name the index "vector_index" and set the type to "vectorSearch".

24. Now we can insert our data into MongoDB without generating embeddings beforehand. MongoDB will automatically create embeddings for the description field using the specified model and index them for efficient search.

25. That's it! MongoDB takes care of the embedding generation and indexing behind the scenes, making semantic search available without the operational overhead.

26. Now let's run the same search against the auto-embedding index. Notice the key difference: we don't generate a query embedding ourselves. We simply pass the raw text in the query field along with the model name, and MongoDB handles the embedding behind the scenes. The $vectorSearch stage is also simpler — no queryVector to manage, just text in and results out.

27. When we run this search, let's look at what comes back.

28. We get the same semantically relevant results as before. Notice that this time we didn't generate a query embedding ourselves. We passed the raw text in the query field and MongoDB handled the rest, using the same model specified in the index definition.

29. Great work! Let's take a moment to review what we've learned. Storing embeddings in a database like MongoDB unlocks capabilities. You get persistent storage, scalability to millions of documents, and efficient indexed search, all without loading everything into memory.

30. Your embeddings live alongside your other application data, so you can filter, aggregate, and query them together in a single pipeline. These are the advantages of working with MongoDB's unified platform.

31. We covered two approaches to working with those embeddings in MongoDB. In the manual approach, you generate embeddings yourself, attach them to your documents, insert them into MongoDB, create a vector search index, and generate a query embedding at search time. You control every step, but you are also responsible for keeping embeddings in sync as your data changes.

32. With auto-embedding, you define the index once with "autoEmbed" and insert your documents as-is. MongoDB handles embedding generation and indexing automatically, and at search time you simply pass raw text in the query field. The result is the same powerful semantic search with far less operational overhead.
