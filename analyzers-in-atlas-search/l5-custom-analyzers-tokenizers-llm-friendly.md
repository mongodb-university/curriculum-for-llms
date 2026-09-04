---
title: "Custom Analyzers: Tokenizers"
lesson_number: 5
skill: analyzers-in-atlas-search
kind: video_script
word_count: 779
date_updated: 2024-03-19
learning_objectives:
  - Create a search index using a tokenizer
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/analyzers-in-atlas-search
  lesson: https://learn.mongodb.com/learn/course/analyzers-in-atlas-search/lesson-5-custom-analyzers-tokenizers/learn
---

1. Welcome back! In the previous video, we started building a custom analyzer that lets users search for movie titles: that contain roman numerals using decimal numbers and Without requiring diacritics
2. Previously, we added the first component of our custom analyzer: a character filter that maps Roman numerals to decimals. Now it's time to add a tokenizer.
3. As you know by now, tokenizers break a string of text into discrete units, called tokens. If you haven’t already or need a refresher, check out the first video in this unit to learn more! A tokenizer is required when building a custom analyzer
4. Atlas Search comes with several ready to use tokenizers. Some of those we've discussed in detail as part of their respective built-in analyzer.
5. In this video, we'll go over the remaining tokenizers in more detail.
6. Let's start with the `uaxUrlEmail` tokenizer. This tokenizer recognises email addresses and URLs. So if your indexed field has URLs and email addresses, this is the tokenizer for you!
7. Next, the `regexCaptureGroup` tokenizer uses a regular expression pattern to extract data from text. For example, we can define a pattern that helps us tokenize US-formatted phone numbers.
8. Or, if we need to split a phone number into smaller tokens, we can use the `regexSplit` tokenizer to define a regex pattern as a delimiter that splits text into multiple tokens.
9. Last but not least, the `edgeGram` and `nGram` tokenizers. These two come with a couple of extra options that control their execution. Namely,`minGram` and `maxGram`. But even though the options are common to both, the behavior is not exactly the same.
10. `minGram` denotes the minimum number of characters required to make a token. Here, `minGram` is set to two, meaning that a token has to have at least two characters. `maxGram` denotes the maximum number of characters allowed in a token. Here, `maxGram` is set to five, meaning that a token can be at most five characters in length. Let’s see them in action.
11. `edgeGram`, begins at the leftmost edge and is `minGram` in length, which is 2 in our example. This produces T-h. The next token includes the first one but is now larger by one, so T-h-e The process repeats until the length of the token reaches `maxGram`, or 5, and this produces our final token: T-h-e-space-M `edgeGram` stops at this point since we set our `maxGram` to five. If we wanted to tokenize the entire phrase, we'd need to increase the `maxGram` value. `edgeGram` is best suited for languages that are read from left to right, like English, French, or Spanish.
12. Now, let’s take a look at `nGram`. `nGram` is very similar to `edgeGram`. Using the same example as before, it produces the same tokens during its first cycle. However, `nGram` starts a new cycle one position to the right from where it started the previous cycle. In our example, the first token from the second cycle is h-e. Because of this, `nGram` generates many more tokens than `edgeGram`!
13. Now that we know more about the different tokenizers let’s pick one for our custom analyzer.
14. Remember, our goals are for users to be able to: search for movie titles that contain Roman numerals by using decimal numbers in the search terms and search for movie titles without including diacritics.
15. We've already implemented a character filter that allows users to search for movie titles that contain roman numerals. For users to search for movie titles without including diacritics, we must select a tokenizer and then set up a token filter.
16. We’ll start from where we left off in the Custom Analyzer section of creating a Search Index. When we go to select a tokenizer, we see a complete list of the tokenizers we've covered so far.
17. We need a tokenizer that can handle the common cases. The tokenizer itself won't be dealing with the diacritics; that's for the token filter but more on that later. So in this case, the standard tokenizer seems like a good choice.
18. Now we need to specify the `maxTokenLength` - or the maximum size allowed for a single token. We will stick with the default of 255 characters.
19. Nice work! We’ve added character filters and a tokenizer to our custom analyzer. Before we move on to token filters, let’s recap what we learned in this video.
20. We learned that Tokenizers prepare text for indexing and search by breaking a string of text into individual units, which are called tokens.
21. We saw that Atlas Search includes several ready to use tokenizers.
22. Finally, you learned how to add a tokenizer to a custom analyzer in Atlas Search.
23. We are almost done building our custom analyzer and I know you can't wait - so we'll see you in the next lesson!
