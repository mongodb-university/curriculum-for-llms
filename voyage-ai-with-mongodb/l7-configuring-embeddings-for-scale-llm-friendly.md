---
title: Lesson 7 - Configuring Embeddings for Scale
lesson_number: 7
skill: voyage-ai-with-mongodb
kind: video_script
word_count: 602
date_updated: 2026-06-18
learning_objectives:
  - Understand how embedding dimensionality affects search quality, latency, and cost.
  - Understand how to optimize dimensionality for your needs.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/voyage-ai-with-mongodb
  lesson: https://learn.mongodb.com/learn/course/voyage-ai-with-mongodb/voyage-ai-with-mongodb/configuring-embeddings-for-scale
---

1. You've chosen your model and prepared your documents for embedding. But what happens at scale, when you're storing millions of vectors? Storage costs can grow quickly, and the precision at which you store your embeddings becomes an important decision.

2. In this video, we'll look at two features that help you manage the tradeoff between quality and cost: embedding dimensions and quantization.

3. So far, we haven't looked closely at the length or numerical precision of the embedding vectors themselves. In large-scale vector search systems, storage costs can become significant. Two features help you manage this: lower-dimensional outputs and quantized representations.

4. Let's start with dimensionality. As you know, an embedding is an array of numbers where each value represents a learned feature of meaning. The number of values in that array is the embedding's dimension. Most Voyage AI models support multiple dimension options: 256, 512, 1024 (the default), or 2048.

5. You can think of the difference in dimensions like describing a color. If you only have one number, say a value on a grayscale from 0 to 255, you can distinguish light from dark, but you lose all color information. Add two more numbers and you get RGB, which can represent millions of distinct colors. Embedding dimensions work the same way: more dimensions let the model capture finer distinctions in meaning, but each additional dimension adds to storage and computation.

6. At scale, these costs grow linearly: double the dimensions and you roughly double the storage and search time. So choosing 256 dimensions versus 2048 is a meaningful decision.

7. Voyage AI models support Matryoshka embeddings. Matryoshka models are trained to frontload the most important information into the first dimensions of the embedding, so that truncating to fewer dimensions still retains most of the semantic content. This means you can generate and store a full 2048-dimensional embedding once, then later trim it down to 1024, 512, or 256 dimensions by taking the leading slice of the stored vector, instead of re-running the model each time you change your dimensionality. This gives you flexibility to defer your final dimensionality choice until you understand your performance and cost constraints.

8. The second feature is vector quantization. Think of it like the difference between a photograph saved in a high-resolution format versus one saved in a low-resolution format. Both images have the same dimensions, but in the low-resolution version, each pixel carries less color information, which reduces file size at some cost to fidelity.

9. Quantization works in a similar way: the number of dimensions stays the same, but each value is stored with less numerical precision, for example going from 32-bit floats to 8-bit integers, or even single-bit binary representations. This can reduce storage by approximately 4 times or 32 times respectively, with a modest impact on quality.

10. Together, these features let you reduce storage costs while keeping retrieval quality predictable and within your control. You can dial down dimensionality or apply quantization as your scale demands, without sacrificing more quality than you choose to. Because MongoDB Vector Search can natively store and index both full-precision and quantized vectors, you can apply these techniques directly in your database without adding extra preprocessing or storage systems.

11. Great work! Let's recap. Embedding dimensions control how much information each vector can capture: more dimensions means finer distinctions, but more storage. Matryoshka embeddings frontload the most important information, so you can trim dimensions later without re-running your model. Quantization reduces the numerical precision of each stored value, cutting storage by up to 32 times with a modest quality tradeoff.

12. Together, these tools give you fine-grained control over the balance between quality, cost, and scale.
