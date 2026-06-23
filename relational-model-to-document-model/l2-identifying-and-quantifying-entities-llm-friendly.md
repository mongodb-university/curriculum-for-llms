---
title: "Identifying and Quantifying Entities"
lesson_number: 2
skill: Relational Model to Document Model
kind: video_script
word_count: 913
date_updated: 2023-08-24
learning_objectives:
  - Explain how to identify entities and attributes.
  - Explain how to quantify entities.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents preserving the original speaking register and sequence from the video script; not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/relational-to-document-model
  lesson: https://learn.mongodb.com/learn/course/relational-to-document-model/relational-to-document-model/model-for-workloads?page=2
---

1. The first step in the journey toward an effective data model is identifying our workload. To identify the workload, we need to identify and quantify the database entities.

2. In this video, we’ll examine features of the bookstore application to identify database entities and their attributes, then we’ll quantify them with information from our internal stakeholders.

3. As a quick recap, entities are the things that exist in our database and are unique and independent of each other. For example, an entity could be a person, a product, an organization or a location.

4. Attributes are the individual properties that describe an entity. They represent specific characteristics or information associated with an entity. For example, a product's attributes could be the name, description, and price of the product.

5. Identifying entities and their attributes first will help us understand how data is used in the application. Later, we’ll use this information to identify reads and writes.

6. Let's take a look at the functional requirements of our app in order to understand what entities we'll be working with.

7. With our bookstore app we want users to be able to search for eBooks, audiobooks, and printed books. Users can select a book to see more information about it and to leave book reviews and ratings.

8. This is just a basic outline but we can already get a sense for the database entities we’ll need.

9. Users need to be able to search for: eBooks, Audio books, and Printed books. Therefore, it's safe to assume that each of these represents an entity since they are unique, independent things that live in our database.

10. Each entity will have a set of attributes associated with it. Let’s take a look at the eBook entity first.

11. An ebook should have a SKU as a unique identifier. When a user clicks on a book they’ll want to see additional information. So it should contain attributes for title, author, publisher, language, price, summary, rating, release date, and the number of pages.

12. The other two types of books, audiobooks and printed books, will also have the same attributes as an eBook plus additional attributes.

13. Audiobooks are the only book type that have attributes for duration and a list of narrators.

14. Both ebooks and printed books include an attribute for the number of pages. Printed books are the only physical entities that need to be stored and shipped. For that reason, only printed books have attributes for stock levels and delivery times.

15. So far, we've defined entities related to the media type of each book along with their attributes but sometimes an attribute can be expanded into its own entity. Author and publisher are currently attributes for our different book entities but we’ll make them their own entities since they can be used independently.

16. Authors will have a unique identifier, authorId, to avoid having duplicates of the same author. Users will also be interested in learning a bit about each author so we include attributes such as the name, birth year, biography, address, and their social media links.

17. The publisher entity will include similar attributes to the author entity but instead of having a birth year attribute, publishers will have a founded date.

18. After thinking about the search feature and what happens when a user clicks on a book, we’ve identified eBooks, audiobooks, printed books, authors, and publishers as the entities. Let’s examine one more feature of our app to see if there are any more.

19. We want users to be able to rate and review a book.

20. For this it looks like we need to add two more entities for users and reviews. Let’s look at their attributes.

21. A user is uniquely identified by a user ID. Users also have attributes for name, email address, phone number, delivery address, and when they became a member.

22. A review will have fields for the product SKU, review date, rating, and the content of the review.

23. Great! We’ve identified the following entities: eBooks, audiobooks, printed books, authors, publishers, users and reviews. The next step is to quantify these entities.

24. For this, we’ll rely on data provided by internal stakeholders.

25. Let’s compile this data into a table to visualize each entity and its quantity. Based on the business requirements, most of the books available will be ebooks at 450,000 titles, followed by audiobooks at 200,000.

26. Printed books require us to hold physical inventory, so we'll only stock what we expect to be the top sellers.

27. The total comes to around 50,000 for printed books according to stakeholders.

28. Our business plan assumes we’ll hit 20,000 authors within the first 3 years of operation.

29. For now, we’re not sure how many publishers we're going to have but we’ll make a rough estimate of 500.

30. Next, let’s move onto quantifying the users and reviews. Like before, we’ll have to rely on information provided by internal stakeholders.

31. Our business goal for this bookstore is to have 25 million users after three years of operation.

32. The marketing strategy is to have a community-driven experience, so we'll be encouraging users to leave reviews.

33. With this in mind we are going to assume reviews is one of our largest entities at 1 Billion. For the most part this is an educated guess.

34. From our chart we can now clearly see our entities with quantities. We can also see that users and reviews are going to be a large amount of our data which will be important to consider.

35. Awesome job! In this video, we learned how to identify entities based on application usage. Once we identified our entities, we quantified them using input from internal business stakeholders.
