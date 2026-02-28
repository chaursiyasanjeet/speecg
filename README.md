# Introduction

The test is divided into two parts, a refactoring part and an implementation part.
- The refactoring part is meant to test your ability to refactor code and apply clean code principles. 
- The implementation part is meant to test your ability to reuse existing code and solve problems.
> Keep in mind acronyms such as SOLID, KISS, DRY and YAGNI.

## Areas of Screening
This candidate assessment screens for:
1. **Refactoring Skills**: Ability to improve code structure and readability while adhering to clean code principles.
2. **System Architecture and Optimization**: Skills in enhancing system performance, particularly through implementing caching strategies.
3. **Adaptability**: Ability to work effectively with pre-existing codebases and adhere to set constraints.  


## Case Study (50 min)
You're joining a team tasked with enhancing a key component of a larger payment system. This segment, developed several years ago, has seen numerous hands in its maintenance, leading to a somewhat disorganized structure and unclear naming conventions. Additionally, the code lacks robust testing, and the existing tests are not particularly clear or effective.

A significant challenge is the system's performance limitations, partly due to its reliance on a slow database. The current setup uses a JSON file managed by the lowdb library, but for the sake of this scenario, think of it as a sluggish database. To address this, your team has decided to introduce a caching layer, aiming to minimize database calls and boost overall performance.

Another major focus is on refactoring the existing codebase. The goal here is to transform it into a more coherent, manageable, and developer-friendly structure. This revamp is essential for improving maintainability and facilitating more efficient future updates or modifications.

## Tasks
### Task 1 - Refactoring (30 min)
Refactor the codebase in `/src` to improve its structure and readability. Ensure that the code is clean, concise, and open to future modifications. You may add or remove files as needed. However, the code must remain functional and retain its original behavior.Feel free to add tests to enhance code coverage and verify the functionality of your code if you think it's necessary. However, be mindful of your time allocation, as dedicating too much effort to testing may not contribute to your overall evaluation. Keep in mind acronyms such as SOLID, KISS, DRY and YAGNI and your overall goal of the use case to not run into one way door decisions.


### Task 2 - Caching (20 min)
You can find within the `/src/lru-cache.ts` an LRU Cache, you need not implement this file or work on its tests. Just assume that it is already implemented and consume it directly. The goal is to integrate this cache into the data layer to minimize database calls and improve system performance. Ensure that any changes made to a data entry are updated in the cache, maintaining data consistency. This way, the cache can serve as a quick and efficient data retrieval mechanism, reducing the system's reliance on the slow database.

#### Example Implementation:
When a user is added or updated, this change is first written to the database. Simultaneously, the corresponding entry in the LRU cache is either updated or, if it's not already in the cache, added to the cache.

Let's say a user, Alice, updates her firstname. Here's what happens:

1. Alice's new firstname is saved in the database.
2. The cache checks if Alice's user data is currently stored.
   1. If yes, it updates the entry with the new firstname.
   2. If no, it adds a new entry for Alice's user with the updated firstname.
3. Now, when another part of your system requests Alice's users, it first checks the cache a.e. `GetAllUsers()`. Since the cache has the most recent data, it serves Alice's updated user with the new firstname, without needing to access the database.

This approach ensures data consistency and efficiency, as the most accessed data is quickly retrievable from the cache, and changes are immediately reflected without redundant database queries.

## Development Guidelines

### Do's

- Write clean, maintainable, and well-documented code and follow the best practices and coding standards.
- You are free to use any official documentation or language references.
- You can use the debugging tools and native IDE features (only standard Auto-Completion)

### Don'ts

- DO NOT use any external libraries for the implementation.
- DO NOT use any Coding Assistants like GitHub Copilot, ChatGPT, etc or any other AI based tools.
- DO NOT visit direct blogs or articles related to implementation of the tasks.
- DO NOT use Stackoverflow or any other forum websites.# speecg
# speecg
