---
title: Implement Fuzzy Search Functionality
lesson_number: 5
skill: advanced-queries-with-atlas-search
kind: video_script
word_count: 880
date_updated: 2024-03-14
learning_objectives:
  - Implement fuzzy search
  - Learn how to use fuzzy search to handle typos and misspellings in search queries
audience: 
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-queries-with-atlas-search
  lesson: https://learn.mongodb.com/learn/course/advanced-queries-with-atlas-search/lesson-5-implementing-fuzzy-search/learn
---

1. We all make mistakes when we type, but it would be nice if Atlas Search could somehow figure out what we mean anyway. Turns out it does! Atlas Search can help with a feature called fuzzy search.
2. Fuzzy search is a powerful tool that locates relevant results even when the search terms are not an exact match. In other words, it returns results that are "close enough" to the terms in our query. Fuzzy can make searches smarter by auto-correcting typos and looking for similar-sounding words. In this video, we'll show you how this feature works in Atlas Search.
3. So how does it work? Fuzzy search is based on a computer science concept called Levenshtein distance, also known as edit distance. The idea is to measure the similarity between strings. This is done by looking at how many transformations are required to convert one string to another. The operations involved are typically character substitutions, deletions, insertions or transpositions.
4. So now that you know how fuzzy search works, let's talk about how to use it.
5. We make our searches fuzzy with the fuzzy option inside a supported operator. At this time only the text, autocomplete, and queryString operators support fuzzy search.
6. In this video we'll focus on the text operator with the fuzzy option. Keep in mind that the text operator synonyms option cannot be used with the fuzzy option. They're mutually exclusive.
7. The fuzzy option has three optional parameters: `maxEdits`, `prefixLength`, and `maxExpansions`. These parameters help us tune the fuzzy search behavior. Let's go over them in more detail.
8. `maxEdits` is the maximum number of single-character changes allowed for a match to be considered. The default value is 2. Increasing this value beyond the default may lead to very dissimilar results.
9. Imagine we're still searching for movie plots that contain the word "poet" but we accidentally enter p zero e t instead. With `maxEdits` set to 1, we might get words like "pet" or "peet" and of course poet; all of which are off by just one character.
10. If instead we use the default value of 2, we can expect to see things like fret, let, met and, again, poet!
11. Next let's look at `prefixLength`. The `prefixLength` option determines how many characters at the beginning of the search term should be matched exactly–in other words, the prefix cannot be fuzzy. The default value is zero, which makes the entire search term fuzzy.
12. Let's use the mistyped word p zero e t from our example and see what happens when we set `prefixLength` to 1. The first character "p" must match exactly while the rest of the word can be made fuzzy. Assume `maxEdits` is left at its default value of 2. In this case, we might see words like pier, poet, and part where the prefix is always the letter "p". And the list keeps going.
13. Finally, the `maxExpansions` option determines how many fuzzy variations can be generated from the search terms. In other words, Atlas Search is allowed to generate several words up to the `maxExpansions` value, which defaults to 50. Raising the value can increase the breadth of the search, but this will have an impact on performance.
14. OK, it's time for an example.
15. But first, let's see what happens when we don't have fuzzy search enabled. We're going to search for movies with the word "poet" in the plot field, but we'll type p zero e t instead. Not surprisingly, we don't get any results when we run this query.
16. Let's try that again with the fuzzy option. We're also going to set `maxEdits` to 1 instead of the default value of 2. We'll leave the other parameters at their default levels and see what happens.
17. This time around we get a lot of `poet` in the results. Looks like Atlas Search has autocorrected our mistake. Nice!
18. Next, let's change the `maxExpansions` value from its default of 50 to 1. What do you think will happen to the results?
19. Well, by setting that parameter to 1, we have limited the number of variations that Atlas Search can generate from that misspelled word `p zero e t.` Looks like it chose the word `peet`, and that's all we got. No poet.
20. Let's keep going. How about a `prefixLength` of 2? With `prefixLength` set to 2, we are telling Atlas Search that the prefix p-zero must match the front of the string. The rest of the word can be fuzzy. We'll leave `maxEdits` set to 1 so only a single character change beyond p-zero is allowed. We'll set `maxExpansions` to 2, so we get an extra variation. Otherwise, we'll only get one word.
21. And we get no results. Looks like there aren't any words that start with p-zero!
22. Given this functionality, you may be wondering how you should use these options to take advantage of fuzzy search in your application. We recommend starting with the defaults then fine-tuning them until you achieve the desired results.
23. Nice work! In this video, you learned how to use the `fuzzy` option in your Atlas Search queries with the options `maxEdits`, `prefixLength`, and `maxExpansions`. These will help you generate relevant search results when your users make typos.
24.** That's it for now. Just remember our searches aren't perfect, and thanks to Fuzzy Search they don't have to be!
