---
title: Lesson 5 - Selecting an Embedding Model
lesson_number: 5
skill: voyage-ai-with-mongodb
kind: video_script
word_count: 631
date_updated: 2026-06-18
learning_objectives:
  - Identify the key factors — workload, data type, quality, latency, and cost — that influence which embedding model to choose.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/voyage-ai-with-mongodb
  lesson: https://learn.mongodb.com/learn/course/voyage-ai-with-mongodb/voyage-ai-with-mongodb/selecting-an-embedding-model
---

1. You've learned how to generate embeddings, store them, search them, and rerank results. But with so many models and configurations available, how do you decide what's right for your application?

2. In this video, we'll cover the first set of considerations: identifying the type of data you're working with, and how to navigate the tradeoff between quality and latency.

3. Before we get started, there's one thing worth keeping in mind: choosing the right model for your use case requires experimentation and retrieval evaluation with your actual data. This video is meant to give you a broad overview and a practical starting point. The model landscape moves fast and new models are released regularly, so it's always worth checking the documentation for the latest options. What matters is understanding the key factors so you can make informed decisions.

4. With that in mind, let's start with the most fundamental question: what type of data are you working with?

5. Text is the dominant modality for embeddings and rerankers, and that's what we'll focus on in this lesson. But if your use case involves images or videos, you'll need a multimodal model that can process different types of content together in a shared embedding space. Voyage AI offers voyage-multimodal-3.5 for exactly this purpose.

6. With that scope set, let's look at the first major factor to consider: the tradeoff between quality and latency. One of the important tradeoffs in model selection is between quality and latency — larger vector embeddings may capture more meaning, but they require more resources which typically translates into higher latency. Let's talk about why.

7. Under the hood, models contain many parameters, often on the order of billions, that are learned during training. Parameters are the numerical weights the model uses to map input data to meaning. In general, more parameters allow a model to capture more complex patterns, which can improve accuracy. But more parameters also require more computation, which means higher latency. So larger models with more parameters are more accurate while smaller models with fewer parameters have lower latency.

8. To give you flexibility, Voyage AI offers models in multiple sizes. For example, the Voyage 4 series of general-purpose text embedding models, which we've been using throughout this course, includes four sizes from largest to smallest: voyage-4-large, voyage-4, voyage-4-lite, and voyage-4-nano.

9. So how do you choose? One approach is to start with the highest-quality model and scale down if you find that slightly lower retrieval quality is acceptable in exchange for reduced latency and cost. Larger models generally cost more to run than smaller ones.

10. Another approach is to begin with a mid-sized model like voyage-4, establish a performance baseline, and evaluate whether your use case demands higher quality. If you're not sure where to start, voyage-4 offers a strong balance of quality, latency, and cost for most use cases.

11. The right choice depends on your specific application, which performance dimension matters most, and what constraints you face in terms of latency and budget.

12. Great work! Let's recap what we covered. Before selecting any model, keep in mind that the right choice requires experimentation with your actual data. As you select a model, you first need to consider the type of data you'll be working with. For text, you can use the Voyage 4 family. For images or video, you'll need to use a multimodal model. Voyage-multimodal-3.5 handles multiple content types in a shared embedding space.

13. Your next consideration is the tradeoff between quality and latency. Larger models contain more parameters. They're able to capture more meaning, but also require increased computation, resulting in higher latency. While smaller models contain fewer parameters and are lower latency.

14. The Voyage 4 family gives you many options at various model sizes, and voyage-4 is an excellent starting point for most use cases.
