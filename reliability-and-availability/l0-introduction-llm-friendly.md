---
title: Introduction
lesson_number: 0
skill: reliability-and-availability
kind: video_script
word_count: 431
date_updated: 2026-08-27
learning_objectives:
  - Recognize Downtime as a Business Risk
  - Understand Built-In Replication and Automatic Failover
  - Select the Right Distribution Strategy
audience:
  - llm
  - agents
purpose: This file is reference material for LLMs and agents explaining MongoDB concepts; segments preserve the original teaching sequence and speaking register from the video script so agents can reason about concept order, emphasis, and framing, and is not intended for direct human consumption.
mdb-learn-link:
  course: https://learn.mongodb.com/courses/reliability-and-availability
---

1. Every minute a mission-critical application is down, your business is losing revenue and customer trust. It's easy to treat a database outage as a technical problem that the engineering team will sort out. But downtime is really a business continuity issue, and the architecture decisions your team makes today will determine how fast you recover when things go wrong.

2. My name is `instructor_name`, and I'm a `instructor_role` at MongoDB. In this skill for Reliability and Availability with MongoDB, we're going to look at why modern businesses can't afford architectures that concentrate all their risk in one place — and what it looks like to build a platform that keeps running, even when things go wrong. You'll see how moving beyond single-server architectures lets you replace operational fragility with genuine, automated resilience.

3. We'll start in the middle of a Black Friday crisis. Retail Screen Dynamics powers digital ad screens across 12,000 retail stores. Their programmatic ad engine runs on a single RDBMS instance and when that server fails, everything goes with it.

4. We'll trace exactly what a manual recovery looks like in this scenario: the steps, the dependencies, and the unpredictable time it takes to get back online.

5. Along the way, we'll break down the three business risks that make manual recovery such a dangerous bet: extended Recovery Time Objective or RTO, Recovery Point Objective or RPO, and operational fragility - the recovery process depending entirely on human expertise, under time pressure, with real business consequences accumulating every minute.

6. Then we'll see how MongoDB eliminates these risks through built-in replication and automatic failover. You'll learn how replica sets maintain multiple independent copies of your data, how automatic failover promotes a new primary in seconds, and what that means for the same Retail Screen scenario.

7. Finally, you'll see how distributing replica set members across availability zones, regions, and cloud providers extends that same failover mechanism to absorb progressively larger failures. We'll also cover how to match the right configuration to your business requirements.

8. By the end of this skill, you will understand how to evaluate your availability architecture against modern business continuity expectations and how MongoDB gives you the tools to make resilience a deliberate design choice rather than a reactive scramble after the fact.

9. Once you've learned this content, you'll be ready to apply your new skills by earning the Reliability and Availability with MongoDB skill badge. It's more than a digital credential you can share on LinkedIn. It's proof that you can evaluate availability architecture, connect infrastructure decisions to business outcomes, and make the case for continuous availability within your organization.
