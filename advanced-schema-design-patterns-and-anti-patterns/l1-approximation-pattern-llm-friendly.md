---
title: "Video Script: U3L3 - Approximation Pattern (v2)"
lesson_number: 1
skill: advanced-schema-design-patterns-and-antipatterns
kind: video_script
word_count: 600
date_updated: 2023-09-05
learning_objectives:
  - Understand the approximation pattern
  - Recognize the typical situations where the approximation pattern can be applied
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/advanced-schema-patterns-and-antipatterns
  lesson: https://learn.mongodb.com/learn/course/advanced-schema-patterns-and-antipatterns/advanced-schema-design-patterns-and-anti-patterns/apply-advanced-schema-design-patterns
---

1. Quick question for you. What's the human population on Earth? It changes so fast that any number you say is wrong the moment you say it. Even numbers from national organizations are just a collection of different measures taken at different times. Should we obsess about finding the exact population number? No, because it's difficult to calculate and the number we have is good enough.

2. Perfect numbers are great. But the operation to find them might cost more than it's worth. In this video, we'll discuss the approximation schema design pattern. This pattern generates a statistically valid, approximate number that is not exact.

3. We use this pattern when data is either difficult or expensive to calculate and getting the exact number is not critical for a use case. It is also well suited for working with big data.

4. The approximation pattern reduces writes and, in some cases, can help reduce contention on heavily updated documents.

5. Using the bookstore app, let's reconsider the problem of maintaining a book's rating as new reviews are added.

6. We could increment the review count and recalculate the average number of stars every time a new review is added for a book, like we did using the computed pattern in the previous video.

7. That gives us absolute accuracy, but doubles the number of database writes. When there are just a handful of reviews for a book, that extra cost is justified because we want our reviews to be accurate.

8. What happens when a popular book has received tons of reviews? Each new review makes very little difference to the average number of stars. Does anyone really care that we list a million reviews rather than a million and one? Probably not.

9. If our app sees that a book has already received a significant number of reviews – then it could decide to only recalculate the book's rating periodically instead of on demand. This can drastically reduce the number of database writes by sacrificing some accuracy.

10. One way to achieve this is through the use of a random number generator in our app logic. The app can generate a random number between 1 and 10 when a new review is posted, but only runs the computation when the random number is 10.

11. At that point the app can follow its normal review post logic to store the new review and recompute the book's rating with one exception:

12. We must extrapolate the new rating. Instead of increasing the review count by one we increase it by 10. And instead of simply using the new review rating we first multiply it by 10.

13. This approximation reduces the number of writes to the book document by 90% for the most frequently reviewed books. The new review rating is statistically valid, however it is not 100 percent accurate.

14. The approximation pattern is implemented in our bookstore application logic and does not impact the document model.

15. In the schema, you only have to plan for a field or fields that will carry the approximate value just like we did in the computed pattern.

16. Let's recap what you learned in this video: The approximation pattern generates a statically valid, approximate number that is not exact. We use it to reduce resource usage for data that does not need to be perfect.

17. Remember that this pattern is implemented on the application side. It trades a slight reduction in accuracy in exchange for far better database performance by computing values only when it matters.

---

## Visuals

1. Talking head w/ icon
2. Talking head w/ sidebar
   - Approximation Pattern
   - Statistically valid number that is not exact
3. Talking head w/ sidebar
   - Use the approximation pattern when:
   - Data is difficult or expensive to calculate
   - Getting the exact number is not critical
   - Working with big data
4. Talking head w/ sidebar
   - Approximation Pattern:
   - Reduces writes
   - Reduces contention on documents
5. Talking head
6. Slides
7. Talking head
8. Slides
9. Talking head w/ sidebar
   - Recalculate the book's rating periodically
10. Slides
11. Talking head
12. Slides
13. Talking head w/ slides
14. Talking head w/ icon
15. Talking head w/ slides
16. Talking head w/ sidebar
   - Approximation pattern
   - Statistically valid approximate number
   - Reduce resource usage
   - Data does not need to be perfect
17. Talking head w/ sidebar
   - Approximation pattern
   - Implemented on the application side
   - Trades accuracy for better database performance
