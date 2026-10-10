---
title: Analyzers in Atlas Search Introduction
lesson_number: 0
skill: analyzers-in-atlas-search
kind: video_script
word_count: 319
date_updated: 2024-03-19
learning_objectives:
  - Use built-in analyzers in Atlas Search to improve search result relevance and accuracy.
  - Use multiple analyzers on a single field with the multi option.
  - Create custom analyzers to transform, filter, and group characters for specific use cases.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/analyzers-in-atlas-search
---

1. Welcome! In this unit, we’ll take a closer look at some of the magic behind Atlas Search: analyzers. My name is `instructor_name`. I'm a `instructor_role` at MongoDB, and I’ll be your guide through this unit.
2. Analyzers prepare text for indexing and searching. They are the magic ingredient that helps search engines provide relevant results.
3. Take for instance our movie catalog app. It looks great, and all the key features are in place. But there's a glaring issue: when we search for a particular movie title, the results leave a lot to be desired.
4. What went wrong? We set up a search index and carefully created static mappings to all the necessary fields. Yet even the most obvious movie choices somehow escape our search results.
5. The answer lies in an often overlooked aspect of Atlas Search functionality: the analyzer.
6. In this unit, we’ll discuss what analyzers are and how you can configure them in the Atlas UI and CLI. Then we’ll look at the built-in analyzers that exist in Atlas Search. These analyzers are already configured for common use cases and work great out of the box. They are also highly customizable to meet the most demanding needs, such as those of our movie catalog app.
7. We’ll go over the standard, whitespace, simple, language, and keyword analyzers.
8. After that we’ll explore using the multi option so that you can use more than one analyzer for a single field in a collection.
9. Finally, you’ll learn how to create a custom analyzer tailored to transforming, filtering, and grouping characters for specific use cases.
10. By the end of this unit, you will be able to use built-in analyzers in Atlas Search, define your own custom analyzer, and use multiple analyzers on a single field. You’ll also be able to describe some common tokenizers and filters that make up the analyzer itself. So much to do and so little time so let's get started!
