---
title: What are AI Agents?
lesson_number: 1
skill: building-ai-agents-with-mongodb
kind: video_script
word_count: 959
date_updated: 2025-06-16
learning_objectives:
  - Define the core elements of an AI agent (reasoning, tools, memory).
  - Understand how MongoDB can be used with AI agents.
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/ai-agents-with-mongodb
  lesson: https://learn.mongodb.com/learn/course/ai-agents-with-mongodb/ai-agents-with-mongodb/what-are-ai-agents
---

1. Imagine a world where software can understand your needs and anticipate them and where intelligent agents work behind the scenes to optimize processes, solve complex problems, and even learn from experience. Welcome to the exciting world of AI agents!
2. In this lesson we'll define what an AI agent is, how MongoDB can be leveraged by an agent, and then we'll discuss the agent we'll build in upcoming videos.
3. So, what is an AI agent? If you search across the web, you'll find that definitions vary. At its core, an agent is a software system that can perceive its environment, make decisions, and take actions to achieve specific goals.
4. AI agents stand out because of three critical capabilities: reasoning, tools usage, and memory. Let's dive into each.
5. First, they are able to reason about a given scenario. Unlike simple algorithms that follow predefined steps, AI agents can analyze situations, evaluate options, and determine the best course of action depending on the circumstances. You could say that they "think" through problems.
6. Second, agents can use tools. AI agents leverage various tools to accomplish tasks - like searching databases, calling APIs, and generating content.
7. Third, agents have memory and maintain context over time. They remember past interactions, learn from successes and failures, and continuously improve their performance.
8. As we build our own AI agent, we’ll get the chance to explore each of these capabilities to help us understand how they work together to make an intelligent system.
9. Now, when should you consider using an AI agent? The possibilities are limitless but lets focus on several scenarios where agents truly shine: First - Complex tasks without structured workflows - when problems don't have clear, predetermined steps. Another is that agents are useful for tasks with high latency tolerance - processes where immediate responses aren't critical. Agents are also well-equipped for Non-deterministic scenarios - where multiple valid approaches or solutions exist. And finally, agents perform well in applications requiring personalization - systems that need to adapt to individual users over time.
10. While agents may excel in these scenarios, it's important to note that agents aren't always the right solution. They introduce complexity that isn't justified for simple or well-defined tasks. If your use case can be handled with a straightforward algorithm or a classic machine learning model, that's often the better choice.
11. To see this distinction in action, consider a coding assistant. A basic code completion tool might suggest the next few characters as you type, and that's not an agent. But, an agent-based coding assistant understands your project, suggests preferred libraries, generates style-consistent code, and explains its logic.
12. It remembers your feedback over time and adapts to your specific needs. This is a perfect example of when agent architecture truly adds value.
13. So how does MongoDB relate to AI agents? MongoDB provides a way for agents to store and access information reliably and consistently.
14. Large language models used for AI agents have impressive capabilities, but they don't have a way to permanently store information outside of their training. MongoDB helps bridge this gap by giving agents a place to keep information across interactions.
15. For AI agents, MongoDB can serve two fundamental purposes. First, it can act as a knowledge base with information the agent can reference when solving problems or answering questions. This could be documentation, product information, or any domain-specific data your agent needs. Second, MongoDB can function as the agent's memory. Agents need to remember things like user preferences, past conversations, or the results of previous actions.
16. What makes this combination particularly useful is how it complements the agent's existing capabilities. The agent brings reasoning and decision-making to the table, while MongoDB provides the persistent storage that makes these capabilities more powerful over time.
17. For this skill, our goal isn't to build complex systems, but rather to understand the core principles that make the MongoDB and AI agent combination effective for solving real-world problems.
18. Now that we know a little bit about agents, let's talk about the specific agent we'll be building.
19. We're creating a straightforward agent that performs two tasks: answering questions about MongoDB and summarizing MongoDB documentation pages.
20. To accomplish these tasks our agent will use two tools. First is a vector search tool that finds relevant information in our MongoDB knowledge base to answer specific questions. And, second is a tool that runs a find command to locate entire documentation pages by their title for summarization.
21. The intelligent part is that our agent will determine which tool to use based on the user's query. If someone asks "How do indexes work in MongoDB?" the agent will use vector search to find relevant information. If they say "Summarize the aggregation page" the agent will use the find command to retrieve and summarize that specific page.
22. While Retrieval Augmented Generation (RAG) could achieve similar results for this use case, we're building an agent as a foundation for more complex future capabilities, like adding memory or human-in-the-loop controls. This approach provides a practical starting point to understand the synergy between MongoDB and AI agents.
23. Awesome job! Let's recap what we've learned. First, we defined AI agents as software systems with three key capabilities: reasoning to analyze situations, tools usage to interact with their environment, and memory to maintain context over time.
24. Next, we discussed when agents are most valuable - for complex unstructured tasks, high latency situations, non-deterministic scenarios, and personalized applications. And remember, agents aren't always necessary as they can introduce too much complexity if applied to a straightforward task.
25. After that, we explored how MongoDB complements AI agents by providing persistent storage that serves as both a knowledge base and memory.
26. Finally, we previewed our project: an agent that answers MongoDB questions and summarizes documentation using two specialized tools.
