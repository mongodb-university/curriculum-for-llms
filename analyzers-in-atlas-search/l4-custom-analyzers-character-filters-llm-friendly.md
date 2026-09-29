---
title: "Custom Analyzers: Character Filters"
lesson_number: 4
skill: analyzers-in-atlas-search
kind: video_script
word_count: 668
date_updated: 2024-03-19
learning_objectives:
  - Create a search index with a custom analyzer
  - Describe common use cases for a custom analyzer
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/analyzers-in-atlas-search
  lesson: https://learn.mongodb.com/learn/course/analyzers-in-atlas-search/lesson-4-custom-analyzers-character-filters/learn
---

1. Welcome back! So far we've been using all of the pre-packaged analyzers provided by Atlas Search. So what if you need a more customized experience? Flexibility is the name of the game with Atlas Search, and in this video we'll show you how to create a custom analyzer.
2. Let's go back to our movie catalog app where some new features are getting designed. First, we want users to search for movie titles that contain Roman numerals, but instead of requiring Roman numerals in the search string, they can use decimals. We also want users to search without having to enter any diacritics.
3. In this video, we’ll start to build our own custom analyzer, beginning with the character filter.
4. Remember, analyzers are composed of three components: character filters, a tokenizer, and token filters.
5. The character filter, modifies, replaces, or removes specific characters from the string it receives. When building a custom analyzer, character filters are optional and you can have multiple character filters.
6. For example, we want to search for the movie *Star Wars Episode 2*. This title officially uses the Roman numeral two, but we want to get the correct result even if we use the decimal number 2 in the search string.
7. We can build a custom analyzer using the Atlas Visual Editor or the MongoDB Shell. In this video, we’ll use Atlas because it’ll help visualize the configuration better. To learn how to build a custom analyzer using the MongoDB Shell, check out the code summary following this video. OK, let's get started.
8. On the ‘create a search index’ page, we select the visual editor. We'll call this index, "custom analyzer example" and select the movies collection.
9. Here, we click “Refine Your Index” to access the custom analyzers menu.
10. We want a static index, so we toggle "dynamic mapping" to off.
11. Next, we add a field mapping to the title field and set its data type to "string”.
12. Finally, in the custom analyzers section, we can select "Add Custom Analyzer".
13. Atlas Search provides some templates that can help you get started with a custom analyzer. Although these are pre-configured options, they are not built-in analyzers like the ones we've discussed previously. Let's select `Create Your Own` so that we can fully control our new custom analyzer.
14. Next we need to specify the details for the customer analyzer. First we give it a name. Now we need to add our custom character filter so we can map roman numerals to decimals.
15. We are prompted to choose from a list of character filters. Each will process text differently. Since we want our users to be able to search for movies with roman numerals in the title by using decimal numbers in their search, we choose ‘mapping’ which replaces matched characters with characters that we define. For an explanation of what each of these character filters do, check our documentation!
16. When we select ‘add mapping’ we can specify the characters that we want to replace and the characters that we want to replace them with.
17. Note that, whenever you decide to add mappings, it’s important to consider how any changes that you make will affect your data.
18. In our case, we want to replace roman numerals with decimals. When we add the character filter, we can see that we’ve created a total of 10 mappings.
19. Nice job! This character filter will help the end user search for movie titles that contain Roman numerals by using decimals in the search terms. But we’re not quite done with our custom analyzer yet! In the next video, we’ll discuss the tokenizer.
20. Before we move on, let’s recap what we covered in this lesson: Using a custom analyzer can provide a more refined search experience.
21. We can build a custom analyzer by specifying character filters, a tokenizer, and token filters.
22. We covered how to define an index using a custom analyzer with the Visual Editor in Atlas, And we set a character filter for our custom analyzer. See you in the next lesson!
