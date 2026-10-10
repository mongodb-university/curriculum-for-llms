---
title: Built-In Analyzers
lesson_number: 2
skill: analyzers-in-atlas-search
kind: video_script
word_count: 753
date_updated: 2024-03-19
learning_objectives:
  - Describe how the standard analyzer works
  - List other built-in analyzers and language-specific analyzers
  - Contrast other analyzers with the standard analyzer
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/analyzers-in-atlas-search
  lesson: https://learn.mongodb.com/learn/course/analyzers-in-atlas-search/lesson-2-built-in-analyzers/learn
---

1. Welcome back! Now that you know what analyzers are and how they work, let’s take a look at some of the built-in options that are available to us with MongoDB.
2. Previously, you learned that analyzers are composed of character filters, tokenizers, and token filters that all determine how to break strings into tokens. Well, Atlas Search packages all of these elements into our easy-to-use built-in analyzers! If you haven’t already, or need a refresher, check out the previous video on analyzers.
3. In this video, we’ll discuss the most notable built-in analyzers available, including the standard, simple, whitespace, English, and keyword analyzers.
4. We'll use this review comment from the movie Les Miserables to understand how the different analyzers behave.
5. Let's start with the standard analyzer. This analyzer breaks text down into tokens based on word boundaries. If you don’t specify what type of analyzer you want to use when creating your search index, both the index and search analyzers will default to standard.
6. The standard analyzer splits the text from the comment into 17 tokens based on word boundaries like this.
7. It also converts text to lowercase, removes punctuation, keeps language accents and will recognize alphanumerics as we can see here.
8. Next, let’s take a look at the simple analyzer, which separates text into tokens at non-letter characters.
9. The simple analyzer breaks the same text into 18 tokens, one more than the standard analyzer. What's going on here?
10. Like the standard analyzer, the simple analyzer converts the text to lowercase, removes punctuation, and keeps accents.
11. Unlike the standard analyzer, the simple analyzer separates tokens at non-letters rather than word boundaries. As you can see here, “Jackman’s” is separated into two different tokens at the apostrophe, which is a non-letter.
12. The simple analyzer also removes digits.
13. What about the whitespace analyzer? As you might have guessed, it splits text into tokens where it finds whitespace.
14. This analyzer splits our text into 17 tokens. Like the standard analyzer, it keeps alphanumerics.
15. Unlike the previous analyzers, the whitespace analyzer preserves case and keeps punctuation.
16. Let’s look at a more interesting class of analyzers - the language analyzers! Language-specific analyzers are tailored to a particular language. Each one has built-in stop words and word divisions based on that language’s usage patterns. For a complete list of language analyzers, visit the Atlas Search documentation.
17. Take the English analyzer as an example: it breaks the text down into 13 tokens.
18. Like the standard analyzer, the English analyzer converts text to lowercase, removes punctuation, keeps language accents and will recognize alphanumerics.
19. It also removes stop words. Here we can see, “is”, “a”, “that”, and “of” have been removed. And finally, the English analyzer stems words to their root. Stemming algorithms often result in a form that is not a valid word by itself, but that captures the core meaning of the original word. In this example, “recreate” has been stemmed to r-e-c-r-e-a-t, and “performance” has been stemmed to “perform”. We also see that the word "perfectly" is reduced to a form with “i” at the end, indicating the process focuses on the root "perfect".
20. The final analyzer we’ll look at is probably the simplest - the keyword analyzer! This analyzer keeps your text as is and only creates a single token.
21. As you can see, the keyword analyzer retains the case and punctuation of the original text to create a single token. This is perfect when looking for an exact match.
22. Now that we’ve shown you the similarities and differences between all the analyzers, let’s test our standard analyzer!
23. Let’s say we want to see comments on a “brilliant movie about the 19th century”. Notice that we haven’t specified an analyzer in this search query. By default, it uses the analyzer declared in the index. Since we didn’t specify an analyzer in the index definition either, both default to the standard analyzer.
24. The standard analyzer will break this query into these six tokens.
25. Once we have our query and index tokens, Atlas Search can proceed to find a match. The search query scans the indexed field of each document and compares the similarity between the search query tokens and the index tokens. A high score here indicates a large degree of similarity between the two sets of tokens.
26. Nice work! Before we move on, let’s recap what you learned: MongoDB provides several easy-to-use built-in analyzers, including: the standard, simple, whitespace, English, and keyword analyzers. We took a look at how each of these analyzers process text differently.
27. Finally, we looked at an example of how the standard analyzer processes text in a query and indexed field to find matching documents.
28. OK that's it for now but let's not get all broken up about it; leave that to the analyzer. See you back in the next lesson!
