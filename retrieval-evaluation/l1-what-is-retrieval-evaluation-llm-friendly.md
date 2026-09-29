---
title: What Is Retrieval Evaluation?
lesson_number: 1
skill: retrieval-evaluation
kind: video_script
word_count: 1181
date_updated: 2026-06-01
learning_objectives:
  - Define information retrieval in the context of document search systems.
  - Explain why retrieval systems require structured evaluation.
  - Identify the three components of a test collection.
  - Identify the three layers of a vector retrieval system.
  - Explain why evaluation of a vector or hybrid retrieval system should begin with the embedding model.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/retrieval-evaluation
  lesson: https://learn.mongodb.com/learn/course/retrieval-evaluation/retrieval-evaluation/what-is-retrieval-evaluation
---

1. Imagine you're a developer and your company's documentation site has a search bar. A user types `vector search filters` and gets back five results. They're about vector search, they mention filtering, but none of them explain how to apply filters alongside a vector query or which approach to use. The results aren't wrong, exactly. They just aren't helpful.

2. This problem isn't unique to any one type of search. It shows up in lexical search systems that match keywords, in vector search systems that match meaning, and in the embedding models that power semantic search. In every case, the failure looks the same: results that appear plausible but miss what the user actually needed. And in every case, the only way to catch it is to measure it.

3. This is the central problem of information retrieval, which aims to find material, within a large collection, that satisfies an information need. So, how can you ensure that your search system retrieves the right results?

4. In this video, we'll introduce you to the field of information retrieval and explain why it's important to evaluate your retrieval system, whether it uses lexical search, vector search, or a combination of both.

5. Then we'll introduce the core elements of a retrieval evaluation framework: a test collection containing a corpus, queries, and relevance judgments.

6. Finally, we'll explain why the embedding model is the right place to start when evaluating your retrieval system.

7. Information retrieval is the process of finding relevant documents from a corpus of data in response to a query. It's the engine behind every search system you use: the documentation search bar on your product site, the vector retrieval pipeline powering your chatbot, the candidate search in a recruiting tool.

8. They all receive a query and return a ranked list of documents, and they all face the same challenge: surfacing the right documents for the right reasons.

9. Search systems use different approaches to do this. Lexical search matches the exact words in a query against words in your documents. BM25, the algorithm behind most keyword search systems, is fast, transparent, and still widely used in production today.

10. Vector search takes a different approach: instead of matching keywords, it matches meaning by representing queries and documents as numbers that capture semantic similarity. Many modern systems combine both.

11. Regardless of which approach your system uses, the same question applies: how do you know if it's actually returning the right results? That's what retrieval evaluation answers, and it applies equally to lexical search, vector search, and the embedding models that power them.

12. For vector search specifically, the retrieval process runs across three layers, each building on the one below.

13. At the foundation is the embedding model. It converts queries and documents into vectors, which are numbers that represent their meaning in a way a computer can compare.

14. Documents with similar meanings end up close together in that space. When a user submits a query, the model converts it to a vector too, and the search returns the documents whose vectors are nearest.

15. On top of that is the vector search index. It finds those nearest neighbors efficiently, returning results quickly even across millions of documents.

16. At the top is the end-to-end search system: the full pipeline a user interacts with, from typing a query to seeing results.

17. These layers work together, and evaluating each one separately is how you understand and improve the full system. When all three are well-tuned, your search pipeline consistently surfaces the right documents. That's the goal of a structured evaluation framework.

18. Every retrieval evaluation, regardless of which type of search or layer you're testing, requires three things.

19. The first is a corpus: the collection of documents the system searches over. This could be documentation pages, research abstracts, support tickets, or anything else the system is built to retrieve. The corpus defines the full set of candidates.

20. The second is a set of queries: the questions or search inputs that represent what real users want to find. In a benchmark, these are carefully authored to cover the range of information needs the system is expected to handle.

21. The third is relevance judgments, also known as qrels: a record of which documents are the correct answers for each query. This is what makes evaluation possible. Relevance judgments give you a known-correct reference to check your results against; they're what turns a list of results into something you can actually measure.

22. Together, these three things make up what's called a test collection, and the relevance judgments are often referred to as the gold standard or ground truth. In a later video, we'll go deep on what each component actually contains.

23. Now that you're familiar with the purpose and basic framework for retrieval evaluation, you might be wondering where to start. For a vector or hybrid search retrieval system, the best place to start is with the embedding model.

24. When you build a retrieval system, the embedding model determines which documents surface for any given query, and that decision propagates through everything built on top: the answers a chatbot generates, the candidates a recruiter reviews, the documentation a developer reads.

25. To determine that your embedding model is serving your system well, you need to perform a structured evaluation. An embedding model's results can look topically coherent, be returned quickly, and appear confidently ranked, yet still might not be fulfilling the information need behind the query. This is a silent failure: nothing in the output signals that something went wrong. Evaluation gives you the tools to detect and fix it before the whole system is affected.

26. Retrieval evaluation gives you a method to measure model quality before you commit to one in production. You issue queries, collect results, and check them against your relevance judgments.

27. The model that surfaces more correct answers, and ranks them higher, is the better model for your use case. And because the test collection is independent of any search infrastructure, you can compare many models before deploying any of them. Without this structure, the only signal you have is user complaints, often after it's already in production.

28. The same three-part structure works at every layer of a retrieval system. In the next lesson, we'll look at the metrics built on top of it: `Recall@k`, `NDCG@k`, and `MRR`.

29. Awesome work! Let's recap what we covered in this video. Retrieval evaluation is centered on measuring whether your embedding model, lexical or vector search, or search system serves documents that fulfill an information need.

30. Every retrieval evaluation is built from the same three things: a corpus, a set of queries, and relevance judgments that record the known-correct answers. These three components are the foundation of every benchmark, every metric, and every model comparison in this skill badge.

31. The same three-part structure works at every layer of a retrieval system. In this skill badge, we'll discuss how this applies to evaluating each layer, with a particular focus on embedding model evaluation.
