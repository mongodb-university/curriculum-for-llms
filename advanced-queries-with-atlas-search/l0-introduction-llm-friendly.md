---
title: Advanced Queries with Atlas Search Introduction
lesson_number: 0
skill: advanced-queries-with-atlas-search
kind: video_script
word_count: 247
date_updated: 2024-02-05
learning_objectives:
  - Use the compound operator to narrow results
  - Sort results
  - Use fuzzy search to provide relevant results even when queries are misspelled
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-queries-with-atlas-search
  lesson: https://learn.mongodb.com/courses/advanced-queries-with-atlas-search
---

1. Welcome! In this unit, you'll learn how to perform advanced queries in Atlas Search. My name is `instructor_name`. I'm a `instructor_role` at MongoDB, and I'll be your guide through this unit.
2. As you may have noticed, the Atlas Search query language is feature rich. A lot of our queries can be created using only a subset of those features. But sometimes, we need to fine-tune our search queries, whether that means searching multiple fields, excluding certain terms from our search, sorting our results in a particular order, or accounting for human errors like typos. In this unit, we'll show you some advanced Atlas Search features to help you accomplish all of this and more.
3. We'll begin by looking at the compound operator, along with the `must`, `mustNot`, `filter` and `should` clauses. The compound operator helps us narrow results or prioritize certain qualities over others.
4. Then, we'll build on this foundation by using the compound operator with multiple clauses and nested clauses. We'll share some common use cases and examples from our movie catalog app.
5. Next, we'll look at sorting in Atlas Search. By default, Atlas Search sorts by relevance score, which is usually what we want. But we can also customize the sorting behavior to further sequence the results.
6. Finally, we'll use the fuzzy search feature. Fuzzy search generates relevant results even when our search terms are misspelled.
7. By the end of this unit, you'll be able to write advanced search queries in Atlas Search to generate the results your users need from your data.
8. Let's get started!
