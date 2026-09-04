---
title: The multi option
lesson_number: 3
skill: analyzers-in-atlas-search
kind: video_script
word_count: 676
date_updated: 2024-03-19
learning_objectives:
  - Create a search index with a multi analyzer
  - Use search index in a query by including the multi path option
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/analyzers-in-atlas-search
  lesson: https://learn.mongodb.com/learn/course/analyzers-in-atlas-search/lesson-3-the-multi-option/learn
---

1. Welcome back. Now that you know how analyzers break text into tokens and learned about the built-in analyzers, let's look at a scenario where we may need more than one analyzer.
2. In this video, you’ll learn about the `multi` option and how it allows us to use multiple analyzers on a single field. Let’s get started.
3. So far, we've looked at the default analyzer for an entire index and seen how each field in the field mapping can override this behavior by declaring its own. Fields have an additional option known as the `multi` option. Using the multi option you can declare alternate analyzers for the field. These alternate analyzers can then be used in a search query.
4. Let’s look at an example in our movie catalog app. Previously, users could search for movie titles where any of the search terms are matched individually. Say we want to add a feature that allows users to toggle for exact matches in their search results.
5. To do this, we'll need multiple analyzers on our title field.
6. We can use the standard analyzer as the default analyzer and the keyword analyzer as the alternate analyzer when we want to search for exact matches.
7. Here, we’ve already started to create a new index, and we are on the Refine and Review page. We’ll leave `lucene.standard` as our default analyzer. And we need to set up a field mapping for the title field.
8. Here we select the title in the field name; then head over to the multi field section.
9. Now we can declare an alternate analyzer for the title field. We’ll call it `keywordAnalyzer` because we plan to use the `keyword` analyzer. Next, we select `lucene.keyword` from the Index Analyzer menu. Now we can save our changes.
10. Back on the index definition page we can see the title field has the word `multi` as part of its definition. Now we can hit save to create our search index.
11. With that out of the way, let’s query our dataset to see the multi option in action.
12. We start with exact matches turned off so that we can search for any movie title that is related to "Star Wars: Episode IV - A New Hope".
13. Using the Atlas Index Search Tester we can query the database using a search string. But we'll head over to the query editor, so we can manipulate the query document. Here we set the search `path` to "title" and the `query` string to our search term.
14. When we run the query, our results include many documents, each with some combination of the tokens from our search string. Not bad right?
15. But what if we want to find an exact match for the same movie title? Here's where the alternate analyzer comes into the picture.
16. Remember - if we want to use the alternate analyzer that we set up in the index, we'll need to specify it in our query. We use the `multi` option in the path document to specify the alternate analyzer, `keywordAnalyzer`.
17. *Now* when we run the query, we see that it returns only one document that matches the title exactly. Nice work!
18. Before we move on, it’s important to understand that indexes using the `multi` option require additional storage and computing power. This is because we’re storing multiple versions of the indexed data using different tokenization strategies. We also need to maintain and update the indexed entries, which requires increased operational overhead. Always take the costs into consideration before using the multi option.
19. Let’s recap what you learned in this video: The `multi` option allows us to index a field with multiple analyzers
20. We covered how to define a search index with the `multi` option in the Visual Editor, and how to write search queries using both the default and alternate analyzers.
21. We've done a lot with the vanilla analyzers in Atlas Search. But sometimes we may want more fine-grained control over the analyzer itself. Next up we'll look at custom analyzers and I guarantee you won't want to miss it. See you there!
