---
title: "Queryable Encryption: Prefix, Suffix and Substring Queries"
skill: queryable-encryption-prefix-suffix-and-substring-queries
kind: video_script
word_count: 515
date_updated: 2026-08-27
learning_objectives:
  - Explain how prefix, suffix, and substring queries extend Queryable Encryption for encrypted string fields.
  - Interpret the results of prefix, suffix, and substring queries on separate encrypted string fields.
  - Select a prefix, suffix, or substring query based on whether the desired value begins, ends, or contains a short known pattern.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/queryable-encryption-prefix-suffix-and-substring-queries
---

1. Imagine an application that stores names, email addresses, and job titles as encrypted data in its MongoDB database. With Queryable Encryption, the application can query those encrypted field values while they remain encrypted in the database.

2. Sometimes, the application needs to find an exact value in the encrypted data, such as a specific product name. That’s known as equality matching, and works well when searching for exact matches. But what if the application needs to find every name that begins with a known prefix, every email address that ends with a particular domain, or every job title that contains a short term?

3. In this video, we’ll learn how MongoDB 9.0 makes Queryable Encryption prefix, suffix, and substring searches possible, supporting pattern-based queries while keeping sensitive values encrypted.

4. Before we look at those pattern matching options, let’s revisit equality matching. With equality matching, the application searches a whole value for an exact match. For example, if the application searches for Ada Lovelace, it matches only when a field contains this as a complete value. It will not match when it is part of a longer string, such as Mrs. Ada Lovelace, or when it is lowercase. When the application knows only part of a value, it needs a way to query based on a pattern instead of an exact match. While equality matching is case-sensitive, case-sensitivity for pattern matching is configurable.

5. The first of these pattern matching query types is the prefix query, which searches the beginning of an encrypted value. Suppose three documents in collection each have an encrypted name field where the values are Ada Lovelace, Ada Wong, and Sam Rivera. Using Ada as the prefix pattern, the query correctly returns Ada Lovelace and Ada Wong, but not Sam Rivera.

6. On the other hand, a suffix query searches the end of an encrypted value. Consider another collection of documents, this time containing an encrypted field for email addresses, with the values maya@acme.com, riley@acme.com, and jordan@example.org. To find every contact at acme.com, we can use @acme.com as the suffix pattern. Using this, the query correctly returns Maya and Riley’s email addresses, but not Jordan’s.

7. Finally, let’s look at the substring query which can be used to search for a short pattern anywhere in an encrypted value. For this query, let’s assume a collection of documents containing an encrypted field for job titles. Job titles in this field include Engineer, Product Manager, and Director of Engineering, Using Eng as the substring pattern correctly returns Engineer and Director of Engineering, but not Product Manager.

8. Awesome job! Let’s take a moment to recap what we learned about pattern-based Queryable Encryption query types. We learned that prefix queries find encrypted values that begin with a pattern, suffix queries find encrypted values that end with a pattern, and substring queries find encrypted values that contain a short pattern. Together, these query types, combined with configurable case-sensitivity, offer practical ways to search encrypted values when the whole value is not known.

9. For implementation details, check out Queryable Encryption in the MongoDB documentation.