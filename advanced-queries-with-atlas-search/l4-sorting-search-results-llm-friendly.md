---
title: Sorting Search Results
lesson_number: 4
skill: advanced-queries-with-atlas-search
kind: video_script
word_count: 851
date_updated: 2024-03-13
learning_objectives:
  - Create search indexes that sort strings, dates, and numbers
audience: 
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-queries-with-atlas-search
  lesson: https://learn.mongodb.com/learn/course/advanced-queries-with-atlas-search/lesson-4-sorting-search-results/learn
---

1. When building a search experience we want to make sure our users are getting the most relevant results first. The default sorting behavior in Atlas Search returns results ordered by their relevance score, from highest to lowest. But there are times when we need more fine-grained control. In this video, we'll show you how to use the built-in sort functionality in Atlas Search.
2. When using Atlas Search we recommend you use the sort option in the `$search` stage for optimal performance. The sort option is a key named "sort" at the same level as the index name. The sort value is a document that contains key/value pairs for the various fields we want to use. The syntax is the same as the aggregation `$sort` stage: Keys are indexed field names Values dictate the sort order: 1 for ascending, -1 for descending. We can also use this special key/value combination to change the default relevance score sort order. Documents with missing or empty sort fields are always listed first when sorted in ascending order.
3. The examples in this video will use an index named "default" with dynamic mappings enabled. We'll demonstrate how to sort strings and scores. To learn how to sort by other field types, check out the MongoDB documentation.
4. Atlas Search automatically indexes dates, numbers, and a host of other types for sorting purposes when we use dynamic mappings. But string fields are not automatically indexed for sorting. OK, let's go through an example to see how this works.
5. We want to sort our search results by score. As you know by now, that is the default sort in Atlas Search, and a feature we have exploited in all examples up to this point. Take for instance our classic query looking for the word "poet" in the plot field. It has no sort option and therefore defaults to relevance score from highest to lowest.
6. What if we want the lowest scores first?
7. We can add the sort key within the `$search` document with a field named "unused." This special field has a document with two keys. The first key/value pair is a constant that must be included and cannot be changed. The second is named "order" and can be used to set the sort direction. We'll set this to one, so the results are sorted in ascending order. In other words, documents will be listed from lowest to highest.
8. After we run the aggregation, we can see the documents are now scored lowest to highest. What happens to documents with identical scores? They are sorted arbitrarily. This seems less than ideal, but we can add another field to the sort option to make identical scores more predictable.
9. For instance, let's further sort our movies by their released date. Here we have added the released field to the sort option and set the order to `ascending`.
10. The results are similar to before. Movies are listed by score from lowest to highest, but the released field is now the tiebreaker for identical scores. Not bad, right?
11. One thing to keep in mind is that a tiebreaker field must be unique. For instance, we could've chosen the title field as our tiebreaker, but this wouldn't work because the title is not unique.
12. And speaking of title–can we completely disregard the score and sort the results by something else like the title? Yes! But first we'll need to update the default index to include the title. But we don't have to do this for the released field. Remember, Dates and Numbers are automatically handled by our dynamic mapping. The movie title is a string type, so we need to manually configure it for sorting.
13. We can use the `updateSearchIndex` command to change our index configuration. First let's see what the current configuration looks like. The output is rather verbose, so we will focus only on the latest definition. Next, we prepare our update command and include the title field with a value of token. Remember, Atlas Search indexes are eventually consistent, so it may take some time for the index to be usable. We can confirm index readiness and our changes using these commands. Our index isn't ready until the Status is READY.
14. With that out of the way, let's retry our search query. Now our results are sorted purely by the movie title. In the same manner, we can include multiple sorting fields in the sort option as long as they are supported by the index.
15. Nice work! In this video, you learned how to use the sort option in Atlas Search. This is the recommended way to sort results in Atlas Search for performance reasons. You also learned that fields must be indexed before using the sort option in `$search`. In particular, strings must be indexed as token types. By default, Atlas Search sorts results by score in descending order. To learn more about sorting, check out the MongoDB documentation. I'm glad we got that sorted. See you in the next lesson!
