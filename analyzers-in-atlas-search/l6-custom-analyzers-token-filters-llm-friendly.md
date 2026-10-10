---
title: "Custom Analyzers: Token Filters"
lesson_number: 6
skill: analyzers-in-atlas-search
kind: video_script
word_count: 625
date_updated: 2024-03-19
learning_objectives:
  - Create a search index using a token filter
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/analyzers-in-atlas-search
  lesson: https://learn.mongodb.com/learn/course/analyzers-in-atlas-search/lesson-6-custom-analyzers-token-filters/learn
---

1. Welcome back! We’ve been building a custom analyzer that we can use to create a better experience for users searching our movie catalog.
2. We added a character filter, so users can search for movies with roman numerals in the title while using decimal numbers in the search string. Now we're setting up functionality, so users can search for movie titles without having to specify the diacritics. For this, we need a tokenizer and a token filter. Previously, we selected a tokenizer. Now it’s time to finish the job by adding a token filter.
3. In this video, you’ll learn about token filters and how to add one to a custom analyzer in Atlas Search. We’ll also wrap up our custom analyzer and take it for a spin.
4. Previously, you learned that *character* filters manipulate text before tokenization. Well, as you may have guessed, *token* filters manipulate tokens *after* tokenization. A token filter can modify individual tokens, add more, or eliminate them entirely.
5. Token filters are optional when building a custom analyzer, so we can leave them out, include just one, or use multiple.
6. And, token filters accomplish a lot. One common use case is stemming - which reduces a word like “running” to its root, “run”. Stemming can help ensure that your users receive relevant results even if they use different forms of the same word in their search terms. Token filters can also redact sensitive information. For example, a token filter could redact ID numbers and replace them with the word redacted.
7. Atlas Search comes with a large library of ready to use token filters. There's so many of them that we can’t cover them all in this video. For a full list, please visit our documentation.
8. OK, we're going to focus on a token filter that can help us accomplish the last goal on our list: Making sure the end user can search for movie titles without having to specify any diacritics.
9. We need a token filter that allows us to convert specific characters within a token before indexing. For example, we could convert characters to single case or remove diacritics. This is called folding, and you'll find many token filters in Atlas Search that fold characters in different ways. One such filter is the `icuFolding` filter.
10. This filter removes diacritics from tokens. Take for instance the movie title `Les Misérables`. Once the filter is applied the diacritic is gone, but the integrity of the title is preserved. Let’s add this token filter to our custom analyzer.
11. We’ll start where we left off in the Custom Analyzer section. First we select token filter, and then add token filter. This pulls up a long list of options. Find and select `icuFolding` then hit the add button.
12. With that our custom analyzer is complete! Too bad nothing is using it yet.
13. For that we need to go back to the Index Configuration section and assign our new custom analyzer to the whole index or one of the fields. We'll set it at the index level.
14. When we go back to the custom analyzers section, we can see it’s in use. Let's save our changes and create this search index.
15. Now that we have an index that uses our custom analyzer, let's take it for a spin!
16. When we search for Star Wars Episode 2 using the decimal number two, the correct movie appears. Not bad 🙂
17. Nice work! Let’s recap what we covered in this video.
18. We learned that token filters are a component of custom analyzers that modify, add, or remove tokens after tokenization.
19. Then we added the `icuFolding` token filter to our custom analyzer to remove diacritics from tokens.
20. Finally, we created our custom analyzer and tested it out. Well that was fun. See you next time!
