---
title: "Quantifying Reads and Writes"
lesson_number: 4
skill: Relational Model to Document Model
kind: video_script
word_count: 585
date_updated: 2023-08-25
learning_objectives:
  - Explain how to quantify reads and writes
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents preserving the original speaking register and sequence from the video script; not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/relational-to-document-model
  lesson: https://learn.mongodb.com/learn/course/relational-to-document-model/relational-to-document-model/model-for-workloads?page=4
---

1. After identifying the entities and operations, the last step in defining the workload for the bookstore app is to quantify read and write operations based on their frequency.

2. We also need to determine whether our application, on average, performs more reads or writes, so we can choose the best data model for the workload. This is important because write heavy workloads are more resource intensive than read heavy workloads.

3. Before we quantify read and write operations, it’s worth noting that operation frequency rates are estimates based on data collected by stakeholders and how we expect users to interact with the application.

4. We’ll record the frequency of operations in this table by adding a  column called rate. Let’s get started!

5. We’ll begin with the operations on the ebook, audiobook and printed book entities.

6. When a user clicks on a book, the app will fetch the book's details.   We expect to have around 10,000 concurrent users who click on more than one book per session, so we’ll estimate that this operation needs to run 1000 times per second.

7. The next read operation retrieves an author and their book titles.

8. We’ll estimate that this operation will occur 50 times a second.

9. Our Ops team requested that the read operation which retrieves stock level of printed books occurs every 12 hours, or twice a day.

10. Now let’s quantify the write operations for the ebook, audiobook, and printed book entities. First, we need to add and update books.

11. We’ll upload all the books at once before we launch the app, but after this we can set our estimation to  10 times per hour since adding and updating books won’t be a primary function of the application.

12. We’ll set the rate for the operation that updates the in-stock quantity of a printed book whenever we sell a copy to five times per second.

13. Let’s move onto the operations that involve the “reviews” entity, starting with reads.

14. Our app will fetch ten reviews at a time to support pagination.

15. When viewing a book, we expect users to click on the reviews tab 20% of the time. So, we can estimate that this operation will be used 200 times a second.

16. We also need a write operation to add a review.

17. We forecasted 1 billion reviews after three years, so we’ll estimate that this operation should add 50 reviews per second.

18. Finally, let’s move onto the operations for the users entity.

19. For reads, we need to fetch a specific user's details to display on their profile page.

20. This won’t be done frequently so we’ll estimate that this operation should run at 5 times per minute.

21. We also need to add new users and update existing user profiles on the application.

22. We expect this to occur often to accommodate a growing user base, so we’ll assume that this operation should run once every second.

23. Now that we’ve quantified the operations, let’s examine our findings to determine how we should optimize our schema.

24. For reads, fetching book details and reviews are the most frequent operations. For writes, adding a review is the largest write workload by a substantial margin.

25. We’ll need to optimize for both reads and writes, which we’ll learn how to do when we select relevant schema design patterns.

26. Great work! In this lesson, we quantified the read and write operations for our workload. This information will be very valuable when we create a schema for our data.
