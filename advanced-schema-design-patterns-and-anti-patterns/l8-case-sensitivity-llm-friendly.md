---
title: "Case-Sensitivity"
lesson_number: 8
skill: advanced-schema-design-patterns-and-antipatterns
kind: video_script
word_count: 1062
date_updated: 2023-01-26
learning_objectives:
  - Define a collation
  - Identify how a collation relates to indexes and documents
  - Define what case sensitivity means in MongoDB
  - Identify the best solution for a given use case (Case sensitivity anti-pattern)
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-schema-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/learn/course/advanced-schema-patterns-and-antipatterns/advanced-schema-design-patterns-and-anti-patterns/identify-advanced-anti-patterns?page=4
---

1. Most apps these days have search bars that return desired results regardless of whether the user inputs upper or lower case letters.

2. But you might have had that frustrating experience when you search for something in an app but don't get the results you want unless you use the exact capitalization.

3. The legacy search feature in our bookstore app, which was implemented without MongoDB Atlas Search, has become very slow and isn't returning the search results our users expect. Upon digging into this further, we find that our database queries are doing an exact match on the search terms. This is usually not a problem, but what if we want our search terms matched more broadly?

4. In this video, we'll discuss the **case-sensitivity anti-pattern** and how to solve it.

5. When upper and lowercase letters are treated differently, this is known as case-sensitivity. In this example, we search for "Apple" with a capital "A" and the only result returned is an exact match.

6. On the other hand, when upper and lowercase letters are treated the same, we refer to this as case-insensitive. Here, searching for the same capitalized "Apple", the results include all apple words no matter the case.

7. Keep in mind that MongoDB queries are case-sensitive by default.

8. Using the default MongoDB query settings but expecting search terms to ignore case is known as the "case sensitivity anti-pattern." As well as producing unexpected results, this anti-pattern can also reduce performance.

9. You may be asking: How do I configure MongoDB to support case-insensitive queries? Great question! The answer is to use collations. A collation defines the language-specific rules that are used by MongoDB to determine how characters in a string are sorted and compared during a query. Collations must specify a locale so language specific rules are used during the comparison. Collations also have a strength, or comparison level, from 1 to 5. The default strength is 3 which effectively makes comparisons case sensitive.

10. In this example, we set the locale to English. To make the comparison case insensitive we need to set the strength to 1 or 2. A value of 1 compares base characters only. Ignoring diacritics, or accents, and case. For example, a query for "viola" will return all results regardless of the letter casing or accenting on letters. A value of 2 will include secondary differences such as diacritics. Here, a query for "viola" will only return results that include the accent on "a".

11. There are a couple of different ways to use collations in order to ensure our queries are case-insensitive.

12. First, we can build an index with a given collation; making sure the collation is not case sensitive. We then specify that same collation in our query.

13. We can also assign a default collation to a collection when we create that collection. Keep in mind, the default collation assigned to a collection applies to all indexes on that collection. This collation cannot be changed after the collection has been created. Any queries against the collection will also use the same collation. We can override the collation at the query level only. However, we don't recommend it when using a default collation on a collection.

14. We may also be tempted to use the regex operator with the i option. The regex operator in MongoDB is well supported by indexes when used for exact matches. However, it is not very efficient when our search terms are case-insensitive. As a result, this approach isn't recommended. These queries cannot efficiently use case-insensitive indexes, so they can be very slow in large collections.

15. Let's take a look at how we can fix the Case Sensitivity Anti-Pattern in our bookstore app.

16. Our online bookstore has a search box that allows you to find books by title. As we mentioned previously this is a legacy feature. And it uses inefficient regex matching with the **i** option, which is not recommended. We have an index with a case-insensitive collation, but our query is not using it because we are using regex.

17. To solve this problem we need to rewrite our query, shown here, to use our case-insensitive index without using $regex. Remember, when we write the query, it must use the same collation as the case-insensitive index and the correct locale, or else we will experience the **Case Sensitivity** anti-pattern. With this new query, bookstore users can now efficiently query books by title.

18. Let's look at another example.

19. The bookstore also has a search box for authors which supports case-insensitive queries. The feature is returning the expected results but the query response time is very high.

20. Our query includes the desired collation. But if we take a look at the explain() output for the query we can see that it is performing a collection scan, so it is not using an index.

21. Using getIndexes() to check our indexes, we see that there is an index for the author field but it does not have a collation that matches the query and therefore it is case sensitive and will not be used.

22. This is another form of the **Case Sensitivity** anti-pattern, where case-insensitive queries are missing a case-insensitive index to support them.

23. To fix this problem we need to drop the current index on the author field and recreate it to make it case-insensitive using the same collation as our queries. Now our query is supported by a case-insensitive index and the response time should improve.

24. We fixed the examples of the case-sensitivity anti-pattern in this demonstration, but if you are running your applications on MongoDB Atlas, you should consider using Atlas Search for advanced search features. While a case-insensitive index improves performance for case-insensitive queries, Atlas Search queries significantly improve the performance of text queries and offer more options for customizing query parameters.

25. Let's recap what you learned in this video: The case sensitivity antipattern occurs when queries return unexpected results due to improperly configured case insensitive queries and indexes.

26. To solve this antipattern, case-insensitive queries must be supported by case-insensitive indexes and queries and indexes must have the same collation to provide case-insensitive results. Additionally, case-insensitive queries and indexes must have a collation strength of 1 or 2.

27. A default collation can be set when we create a collection to ensure that queries and indexes on that collection use the same collation and produce case-insensitive results.

28. Hopefully you are now more sensitive to case (smile). Until we meet again. Keep learning!
