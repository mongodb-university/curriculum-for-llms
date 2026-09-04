---
title: Analyzers
lesson_number: 1
skill: analyzers-in-atlas-search
kind: video_script
word_count: 809
date_updated: 2024-03-19
learning_objectives:
  - Describe how the standard analyzer works
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/analyzers-in-atlas-search
  lesson: https://learn.mongodb.com/learn/course/analyzers-in-atlas-search/lesson-1-analyzer-overview/learn
---

1. Welcome! At this point, you know how to manage search indexes and write advanced search queries using the `$search` operator. But when it comes to creating an effective search, the query is just one part of the equation. The other part is analyzers.
2. In this video, you’ll learn what analyzers are, how they work, and how to configure them.
3. We can think of an analyzer as a set of rules that transforms strings into searchable terms called tokens.
4. These rules are governed by the three building blocks of an analyzer: Character filters, tokenizers, and token filters. We’ll discuss each of these building blocks in future lessons, but for now let’s briefly define each one.
5. Character filters are used to transform the characters in a string. For example, one type of character filter removes HTML tags from text.
6. Then, tokenizers determine how text is divided into units, called tokens.
7. Finally, token filters add, remove, or change tokens before indexing. For example, a lowercase token filter will convert tokens to lowercase.
8. Atlas Search comes with a suite of built-in analyzers that pre-package these building blocks so you don’t have to. But Atlas Search also gives you full control with custom analyzers where you can define your own character filters, tokenizers, and token filters.
9. Atlas Search applies analyzers to queries and text in the database to allow for efficient comparison.
10. When you create a search index, analyzers break the indexed field’s data into tokens.
11. For example, our movie app lets users add comments to reviews such as this one. We'd like to find phrases in these comments, so we'll need an index on the text field. The search index would look something like this. Since we haven’t specified an analyzer, it will default to the standard analyzer, which we’ll discuss in more detail later. The review text says “This is a really good movie!” The standard analyzer breaks that down into these individual tokens. But why bother breaking the text in the database down like this?
12. Atlas Search needs an efficient intermediate representation suitable for comparison. So Atlas Search also does the *same* thing to the query string; it applies an analyzer to break it down into tokens for comparison.
13. For example, say we’re looking for well-reviewed movies. We run a search query for the phrase “this is a good movie”. Atlas Search will apply an analyzer to the query to break the text down into individual tokens like this.
14. With both the query and indexed text broken down into tokens, the process of matching results to our queries becomes very quick. When we run our search query, it scans the indexed field of each document and compares the similarity between the search query tokens and the index tokens, and then assigns a score based on similarity.
15. OK, now that we’ve covered what analyzers are and how they work, let’s look at how we can add them to a search index.
16. When creating a search index using the Visual Editor in Atlas, we can specify the analyzer during the refine and review stage. Here, we can set an analyzer at the index level by clicking the dropdown, and choosing from a list of built-in analyzers. We’ll discuss each of these in another lesson.
17. If we select one, by default, Atlas Search will apply the change to both the index and search analyzers. Although it’s possible to specify separate analyzers for an index and query, they should be the same for the vast majority of use cases. We can always start with the default analyzer, which is the standard analyzer. The analyzer that we select here will be inherited by all the field mappings.
18. For instance, under field mappings, if we don’t specify an analyzer for the title field, it will inherit the one from the index configuration. But each field mapping can override this behavior by selecting a different analyzer.
19. To specify an analyzer with the Atlas CLI, we add the analyzer field to the JSON file. Just like the Visual Editor, we can specify the analyzers at the index level, field level or both. Then we can either create a new index or update an existing index with the appropriate command.
20. Nice job! Let’s recap what we covered in this video.
21. We can think of an analyzer as a set of rules that transforms strings into searchable terms called tokens.
22. Analyzers are composed of character filters, tokenizers, and token filters.
23. Atlas Search applies analyzers to queries and text in the database to allow for efficient comparison. To control how Atlas Search creates tokens, we recommend setting an Atlas Search analyzer in the index definition.
24. Finally, we covered how to set analyzers for an index in both the Atlas UI and Atlas CLI.
25. Let's take a break from all that analyzing. But not for long—see you in the next lesson!
