---
title: "Identifying Reads and Writes"
lesson_number: 3
skill: Relational Model to Document Model
kind: video_script
word_count: 725
date_updated: 2023-08-23
learning_objectives:
  - Explain how to identify reads and writes for different app users
  - Map reads and writes to the application flows
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents preserving the original speaking register and sequence from the video script; not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/relational-to-document-model
  lesson: https://learn.mongodb.com/learn/course/relational-to-document-model/relational-to-document-model/model-for-workloads?page=3
---

1. The next step in identifying the workload is to understand how our app will be reading and writing the entities we previously identified. To recap, a database workload encompasses all the operations a database handles at any particular moment.

2. So far the database entities we have identified for the bookstore application are eBooks, audiobooks, printed books, authors, publishers, users and reviews.

3. Identifying read and write operations will help us understand what data is accessed together. We’ll be able to refer back to these findings when we decide which data should be stored together.

4. Let's consider how our application will interact with our entities in order to identify the read and write operations.

5. We’ll record our findings in a table which includes four columns:

6. First, the entities column will track the entities we need to use for the operation. The Operations column will record what we’re fetching or writing. Next, the Information column will define the information we need from our entities. Finally, the type column will record whether the operation is a read or write operation.

7. We’ll begin with identifying the read operations.

8. The application is an online bookstore, so a frequent read operation will occur when a user clicks on a book. After clicking, they'll likely want to see book details and reviews.

9. So we need a read operation to fetch book details, including the average rating. The ebook, audiobook, and printed book entities all share attributes that contain book details and average rating. For brevity, we’ll just put books in the entities column.

10. Our application will also give users the ability to read reviews.

11. When a user selects a book, our application’s UI will fetch 10 reviews at a time about the book they’ve selected.

12. This involves a read operation on the reviews entity that fetches ten reviews with their ratings.

13. Next, we’ll need to account for users who want to view their own information.

14. For this we’ll need a read operation that fetches the users details from the user entity.

15. Finally, users will have the ability to visit an author’s page which includes the author’s information and a list of books they’ve written.

16. This requires an additional read operation that fetches author and book details. We’ll need to access attributes from both the authors and the ebook, audiobook, and printed book entities, for this operation.

17. So far we've identified the most common read operations. Let’s now identify our application’s most common write operations.

18. We’ll need to add new books and update existing books since we plan to grow our book selection.

19. To complete this write operation, we’ll need attributes from ebook, audiobook and printed book entities for book details and stock level.

20. We’ll also need to regularly update the stock of each printed book, to ensure we only sell the inventory we have.

21. This write operation will need to manipulate the stockLevel attribute from the printed book entity.

22. Remember that we want to grow to 25 million users in 3 years,

23. So we’ll need a write operation to add and update users. This write operation will involve the users entity.

24. As we have outlined before, users will need to be able to add new reviews on books.

25. This write operation involves attributes from the review entity including book rating.

26. So far we have been analyzing the bookstore application from the user perspective but we’ll also need to obtain specific information from our application for business needs.

27. For instance, the Ops team may need to run various analytical queries. While these queries are important, they don't impact the direct user experience. So optimizing for those is a lower priority.

28. The Ops team will need to know when the stock for a printed book drops below a certain quantity.

29. This operation will fetch a list of the printed book titles where the stock level has fallen below 50 so that we can order fresh stock. This only requires the printed books entity.

30. Great job! In this video, we defined read and write operations based on the application users and business needs.

31. Identifying these operations help us define what data needs to be accessed together. We'll use this information in future steps of the data modeling process where we will model relationships and select a relevant schema design pattern.

32. For now, the critical next step is to quantify the workload by predicting the frequency with which each of the operations will occur.
