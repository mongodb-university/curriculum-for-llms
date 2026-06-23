---
title: Schema Patterns and Antipatterns Intro Video
lesson_number: 0
skill: schema-design-patterns-and-anti-patterns
kind: video_script
word_count: 570
date_updated: 2023-01-31
learning_objectives:
  - Apply Schema Design Patterns
  - Identify Schema Design Anti-Patterns
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/schema-design-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/courses/schema-design-patterns-and-antipatterns
---

1. Welcome! My name is `instructor_name`. `co_instructor_name` and I will be your guides through this skill badge on Schema Patterns and Antipatterns.

2. In data modeling with MongoDB there are three design phases: Workload identification, Relationship identification, and The application of design patterns. Here, we’ll cover phase three: Applying schema design patterns.

3. We’ll apply the phase to an example application, a bookstore app that sells audiobooks, ebooks, as well as printed books.

4. The foundational schema design patterns that you learn here will give you a blueprint for modeling your data in MongoDB.

5. Before we go any further, let's define the word pattern. Patterns are guidelines for responding to common problems.  By definition, patterns can be reused and while they are not full solutions on their own, a pattern can be a starting point to help you reach your full solution.  You can run through different patterns that are relevant to your use case, then adapt and apply them to meet the specific needs of your app.  Patterns can be combined to form powerful solutions. The patterns you'll learn here will serve as a recipe book for effectively transforming and optimizing your schemas with MongoDB.

6. In this skill badge, you'll learn how to use the: Inheritance pattern Computed pattern, and Extended reference pattern

7. Understanding when and how to use these patterns will demystify data modeling in MongoDB and make the process more predictable.

8. Taking the time to incorporate patterns in our designs can be one of the most critical steps to successfully deploying your database with MongoDB. But, sometimes, despite our best efforts to design our database effectively, we end up with problematic data models.

9. When these problems are rooted in bad schema design practices, they are called schema design anti-patterns.

10. An anti-pattern is a commonly adopted solution to a recurring problem that leads to negative consequences, like poor application performance. In other words, an anti-pattern is an approach that might seem like a good idea at the time, but leads to problems in the long run. Whether things didn’t go according to plan, or you simply made a mistake, there are steps that you can take to mitigate these anti-patterns.

11. For this skill badge, we will cover common schema design anti-patterns that developers encounter. This will help you recognize and avoid them.

12. First, we'll show you how to identify the **unbounded array anti-pattern,** which occurs when a document contains an array with the potential to grow very large. Next, you'll learn about the **bloated documents anti-pattern.** This can happen when we store data together that isn’t accessed together by our application.

13. Understanding how to identify these anti-patterns and what to do if you encounter one will help improve performance, scalability, and affordability of your MongoDB database.

14. You'll have plenty of opportunities to practice what you learned by completing labs that present real-world scenarios. This way, you'll build your knowledge and get comfortable with the software at the same time.

15. When you’re finished, you'll be ready to put your new skills to the test! You can earn a badge to demonstrate your knowledge! To earn your badge, simply complete the content in this course, and then take the short test at the end. After passing the test, you'll receive an official Credly badge via the email you provided. Be sure to share your badge on LinkedIn to show off your new skills!
