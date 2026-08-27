---
title: Give the LLM Access to Tools
lesson_number: 4
skill: building-ai-agents-with-mongodb
kind: video_script
word_count: 870
date_updated: 2025-05-15
learning_objectives:
  - Define what function calling is in the context of LLMs
  - Enable LLMs to call functions (tools) we have created
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/ai-agents-with-mongodb
  lesson: https://learn.mongodb.com/learn/course/ai-agents-with-mongodb/ai-agents-with-mongodb/give-the-llm-access-to-tools
---

1. Welcome back! In our previous lessons, we set up the environment, connected to MongoDB, and created two powerful tools to retrieve information from the database. Now, we need to give the LLM access to the tools.
2. In this lesson, we'll create a prompt enabling the LLM to call the tools we've created. This allows our AI agent to answer user queries by fetching the right information from our MongoDB collections. Let's get started!
3. To understand how LLMs can use tools, we first have to discuss a feature called function calling. This capability allows language models to interact with external tools by generating structured outputs that can be used as function arguments.
4. To call a function, the LLM analyzes a user's request and decides which function would be most helpful. Then it generates the specific inputs needed.
5. When an LLM makes a function call, it creates a structured output with the name of the function and the arguments properly formatted.
6. Most major language models today support function calling, including models from OpenAI, Anthropic, and Google. However, since there is not an open standard and the specific implementation details may vary significantly between providers, it's important to check your model's documentation for the exact syntax and capabilities. Now, let's implement function calling for our agent.
7. Just a heads-up, we'll be working in the `main()` function of our application, which is where everything comes together. First, we specify the model. We're using GPT-4o with a temperature of 0. Setting the temperature this way gives very consistent and deterministic responses, so it's perfect for tool usage.
8. Keep in mind that you can choose whichever model you want as long as it supports function calling.
9. Next, let's put together the prompt that will guide our LLM's behavior. This tells the model how to think and when to use tools.
10. This is a simple prompt; a more realistic prompt would have additional instructions that would set clear objectives, provide context, specify the format of the final output, and handle potential errors.
11. Back to our prompt, notice the `{tool_names}` placeholder? This is where we inject the names of the tools. By using a placeholder, we can easily update tools without rewriting the prompt.
12. Now we need to fill in this placeholder. To do this we’ll use partials from `LangChain`. Partials are a powerful way to pre-fill values in templates. Think of them like a form where some fields are already filled in. Here, we extract the names of the tools, join them with commas, and pre-fill the tool_names placeholder. This creates a reusable prompt template with these values already inserted.
13. Finally, let's bind the tools to the LLM so, it can use them. `LangChain` makes this easy with the bind_tools method which accepts a list of tools. After that, we create a chain with the prompt and tools using the pipe operator. In `LangChain`, chains are a way to compose different components into a single processing pipeline. In this case, we're creating a chain that formats the prompt and then passes it to the LLM that has our tools bound to it.
14. Now that we've set up our LLM with tools, let's test if it will choose the correct tool when prompted with different types of questions.
15. To do this, we call `invoke()` on our chain with test queries. We then access the `tool_calls` property of the response, which shows us which tools the LLM decided to use and what arguments it passed to them.
16. This way we can evaluate the LLM's ability to select the appropriate tool for different types of requests. Keep in mind, this test is just for demonstration purposes.
17. The first query, "What are some best practices for data backups in MongoDB?", is designed to be broad and should lead to the activation of our vector search tool. The second query, "Give me a summary of the page titled Create a MongoDB Deployment", explicitly requests a summary of a specific document. This should lead the agent to select the second tool.
18. Let's run the code and see what happens.
19. We can see the LLM correctly identified that the first question about backup best practices should use our `get_information_for_question_answering` tool. And for the second question asking for a summary of a specific page, it correctly chose the `get_page_content_for_summarization` tool.
20. Notice how the LLM also properly formatted the arguments for each tool call, extracting the key information from the user's query. This is the power of function calling in action!
21. Awesome job! The agent is successfully identifying when to use the vector search tool for general questions about MongoDB and when to use the page content tool for summarization requests.
22. Since this was just for testing purposes, let's remove those tool call checks from our code. We don't need them in our final implementation.
23. With that complete, let’s take a moment to recap what we learned.
24. We learned that function calling allows language models to interact with external tools by generating structured outputs that can be used as function arguments.
25. After that, we used `LangChain` to give the LLM access to the tools we created.
26. Finally, we tested that the LLM chooses the correct tool based on the user’s query.
