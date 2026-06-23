---
title: Lesson 6 - Chunking and Context
lesson_number: 6
skill: voyage-ai-with-mongodb
kind: video_script
word_count: 693
date_updated: 2026-06-18
learning_objectives:
  - Define core concepts of chunking and context length
  - Describe operational challenges of maintaining context across chunks
  - Identify voyage-context-3 as a solution to chunking challenges
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/voyage-ai-with-mongodb
  lesson: https://learn.mongodb.com/learn/course/voyage-ai-with-mongodb/voyage-ai-with-mongodb/chunking-and-context
---

1. Your embedding model is chosen—but more decisions remain. How do you handle documents that are tens of thousands of words long? While you can generate embeddings for a large document, you may want to consider another approach to ensure fine-grained, high quality retrieval.

2. In this video, we'll help you understand the role of context length and chunking as you plan for your workload. And we'll introduce you to voyage-context-3 which makes working with large documents much easier.

3. Embedding models have a limit on how much data you can provide in a single input. This limit is called the context length, or context window, and it's measured in tokens.

4. For text, a token is a small unit – such as a word, subword, or character– that the model uses as its basic building block. In English, one token is roughly four characters, or about three-quarters of a word. The process of converting raw input into tokens is called tokenization, and it can vary from model to model. For most of Voyage AI's current models, the context length is 32,000 tokens, which is approximately 24,000 English words. That's more than enough for the vast majority of documents.

5. Context length matters because if your documents are longer than the model's context window, you'll need to split them into smaller pieces. And that brings us to chunking.

6. Chunking is the process of splitting a large document into smaller segments before embedding. But even when context length isn't a constraint, chunking can still improve retrieval accuracy. Here's why.

7. You can think of embedding as a form of information compression. When you embed a short passage that focuses on one or a few concepts, the vector representation captures those concepts well. But a larger document often contains many different ideas, and the embedding has to compress all of that information into a single vector. As a result, searching over that embedding may struggle to find the specific concept you're looking for.

8. By splitting documents into smaller chunks and embedding each one separately, the resulting vectors capture fine-grained, localized information. Your search system can then more precisely identify relevant sections.

9. For example, imagine a 50-page legal document embedded as a single vector. A specific clause about "AES-256 encryption in GCM mode" could easily get diluted in the overall representation. But if you split the document into paragraphs and embed each one, those vectors are much more likely to preserve that detail.

10. However, there's a tradeoff. While smaller chunks help us capture fine-grained context, an individual chunk may lose broader context from the full document. For instance, a paragraph might not include the client's name, making it harder to answer a query like "What encryption methods does Client X require?"

11. We can try to solve this by correlating the context between chunks through common techniques such as maintaining overlap between chunks, adding metadata, or chunking the text in line with the original document's structure. But ultimately these techniques add implementation complexity. And usually require extensive testing and continuous fine tuning.

12. Voyage AI addresses this with voyage-context-3, a contextualized chunk embedding model that processes the entire document in a single pass while generating a distinct embedding for each chunk. Each vector encodes both the local passage information and document-level context. The model determines which global information from other sections should be incorporated into each chunk's embedding, giving each vector both local precision and document-level context.

13. Contextualized chunk embeddings are especially effective for long, unstructured documents, cross-chunk reasoning where queries span multiple sections, and high-sensitivity retrieval tasks in domains like legal, medical, or finance.

14. In short, chunking isn't just a workaround for long documents. It's a core part of how you build precise, context-aware retrieval systems.

15. Great work! Let's recap what we covered. Context length defines how much text a model can process at once, measured in tokens. For most Voyage AI models, that's 32,000 tokens, enough for most documents. When documents exceed that limit, or when you want more precise retrieval, chunking breaks them into smaller, more focused segments. And for cases where cross-chunk context matters, voyage-context-3 encodes both local passage information and document-level context in every chunk embedding.
