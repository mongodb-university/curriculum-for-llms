---
title: Lesson 1 - What are Embeddings?
lesson_number: 1
skill: voyage-ai-with-mongodb
kind: video_script
word_count: 1525
date_updated: 2026-06-18
learning_objectives:
  - Describe what vector embeddings are and what they are used for.
  - Understand why vector embeddings are important for AI applications and how they can be used to improve search.
  - Describe how vector embeddings are created.
  - Explain how vector embeddings are used to find similar concepts even when exact words aren't used.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/voyage-ai-with-mongodb
  lesson: https://learn.mongodb.com/learn/course/voyage-ai-with-mongodb/voyage-ai-with-mongodb/what-are-embeddings
---

1. Imagine asking a friend for "something to quench your thirst on a hot day," and they hand you a cold lemonade—even though you never said "lemonade." That's semantic understanding. But how would a computer get the same result when it can only match exact words? You'd have to say "lemonade" precisely, or it would fail. Vector embeddings help machines bridge this gap. By the end, you'll understand what vector embeddings are, why they matter, and how they transform search capabilities.

2. In this video, we'll explore how vector embeddings work and how they enable semantic similarity: the ability to find related concepts even when exact words aren't used. We'll also see how embedding models generate vector embeddings from data and how these numerical representations capture meaning. Finally, you'll learn that we measure similarity in order to perform a semantic search.

3. So, what are vector embeddings? They're numerical representations of data, like words, sentences, or even images, that capture their meaning in a way that allows for semantic understanding.

4. Think of it this way: vector embeddings turn words and sentences into coordinates in a "meaning space," like putting every concept on a map where similar ideas cluster together. "King" sits near "Queen," "Puppy" near "Kitten," and "cold drink on a hot day" near "lemonade." So instead of matching keywords, we're mapping meaning.

5. So, how do we translate a word or phrase into a vector embedding? This is where embedding models come in. Embedding models are specialized AI models, trained on a vast corpus of data. Through training, the model discovers patterns in data and encodes them into numerical representations. While you can use any embedding model with MongoDB, here we'll focus on Voyage AI's embedding models. Voyage AI offers many embedding models for different use cases.

6. To access these models, we'll use the MongoDB Embedding and Reranking API. This API lets us tap into the latest Voyage AI models for generating embeddings. You have two options: you can make direct HTTPS requests to the API endpoint or use the Python SDK. For convenience, we'll use the Python SDK as it's the common language for AI practitioners.

7. Now, let's see how this works in practice. We'll start with an example using the most recent general purpose model, voyage-4. When we pass in the text about Roman architecture to the embedding model, we receive an array of numbers. We'll print the length of the embeddings array to see the number of dimensions which we'll learn about in a bit.

8. Each number is a coordinate that helps position this phrase in meaning space.

9. Here's the interesting part: these coordinates aren't plotted on a 2D graph. They exist in high-dimensional space, often hundreds or even thousands of dimensions. This allows them to capture complex relationships and nuances in meaning in a way that keyword matching cannot.

10. But hundreds of dimensions? How can we even think about that? Let's start simple and build up using a ride-hailing application example.

11. Imagine we want to represent different ride types. We could start with 2 dimensions plotted on a 2D map: one dimension for vehicle size, from compact to large, and another for service tier, from economy to premium. For example, a "family car" might sit at coordinates [0.5, 0.2], while a "luxury vehicle" could be at [0.35, 0.8], and a "spacious ride for group travel" at [0.9, 0.4].

12. Notice in these examples, that each dimension uses a scale from 0 to 1, where 0 represents the minimum and 1 the maximum for that feature.

13. For example, vehicle size goes from compact (0) to large (1), so a smaller number means a smaller vehicle. Service tier goes from economy (0) to premium (1), so economy rides have lower values and premium rides have higher values.

14. This scaling is intuitive, but the direction could be reversed depending on the application—the important part is consistency and understanding what each value represents.

15. Now let's add a third dimension for eco-friendliness, from traditional fuel (0) to fully electric (1). Our "family car" might now be at [0.5, 0.2, 0.7], the "luxury vehicle" at [0.35, 0.8, 0.1], and the "spacious ride for group travel" at [0.9, 0.4, 0.3]. We're starting to move beyond what we can easily draw on paper, but we can still imagine these points floating in 3D space.

16. But real-world ride-hailing needs to capture much more nuance. We can add dimensions for features like availability time, from rush hour to off-peak, typical trip distance, passenger capacity, vehicle amenities, and geographic service area.

17. The Roman architecture embedding we generated earlier had over 1,000 dimensions.

18. A "luxury SUV for airport trips" might have a similar representation like in this example, capturing all these characteristics in that high-dimensional space.

19. This is how actual embeddings work. When you convert text like "comfortable ride for family of 5 with luggage" into an embedding, you get an array of numbers. The system can then find "spacious ride for group travel" or "luxury vehicle" nearby in this space, even if those exact words weren't in your search.

20. This is a simplified example to illustrate the concept. In reality, the dimensions can represent more complex or abstract ideas.

21. Now let's talk about how we use vector embeddings to measure semantic similarity. The closeness between two points in this high-dimensional space reflects how closely related their meanings are according to the selected model. The closer the points, the more similar the concepts. Remember our ride-hailing example? If "family car" is at [0.3, 0.2] and "luxury vehicle" is at [0.35, 0.8], we can calculate the closeness between these points to see how similar they are. Even though they're different ride types, they're closer to each other than "spacious ride for group travel" at [0.9, 0.4] because they share similar characteristics like vehicle size and service tier.

22. This is semantic similarity in action. Instead of just matching exact words, we're comparing the meaning of concepts. When a customer searches for "spacious and comfortable ride," the system can find "family car" or "luxury vehicle" nearby in this meaning space, even though the search used completely different words. This allows computers to understand that these concepts are semantically similar.

23. Mathematical operations like cosine similarity, which calculates the angle between two vectors, measure the closeness between points in the meaning space. This translates to semantic similarity. A smaller angle means the concepts are more closely related.

24. You're not limited to cosine similarity. You can also use other similarity measures like Euclidean distance or dot product similarity to find related concepts. For now, the mathematical details and tradeoffs of these measures are not in scope, but it's important to understand that they help quantify how closely related two concepts are in the embedding space.

25. So, how do we use these similarity measures in practice? Let's see it in action. Suppose we want to search for related concepts in a small collection of documents.

26. Our dataset includes 15 entries, each with a title, description, and category. As you can see, we've got an entry on architecture, another on food, and one on machine learning.

27. These examples highlight the diversity of our data—and the effectiveness of embeddings in finding connections across very different topics.

28. Let's walk through how we use vector embeddings to search for semantically similar concepts. The vectors are created and used while the program is running, rather than being saved to a database or file: We generate embeddings for each document and the query, then compare them to find the most similar results. This approach works well for small test datasets like we have.

29. Here's how it works: First, we generate an embedding for each document description in our dataset. Each embedding is a unique set of numbers that represents the meaning of that description. Next, we generate an embedding for our search query. This query embedding captures the meaning of what we're looking for. To find the most relevant results, we calculate the similarity between the query embedding and each document embedding. The closer the embeddings are, the more similar they are. Finally, we sort the results by similarity score, so the most relevant documents appear at the top. This makes it easy to find concepts related to our query—even if the exact words aren't used.

30. In our example, we have a few documents. What happens if our corpus is large? Searching through a large number of vectors or re-calculating all the embeddings for our corpus every time we want to do a search becomes impractical. This is where more advanced solutions come in, but for now, it's great to see how semantic search works behind the scenes!

31. So there you have it - vector embeddings transform how computers understand meaning. Let's recap what we've learned. Vector embeddings are numerical representations that capture the meaning of data in a high-dimensional space. They enable semantic similarity, which allows applications to understand and compare concepts based on meaning rather than exact word matches. These embeddings are generated using specialized embedding models that learn to represent meaning during training. In our example, we used voyage-4 from Voyage AI. And finally we can measure how similar two concepts are by calculating the distance between their vectors using techniques like cosine similarity.
