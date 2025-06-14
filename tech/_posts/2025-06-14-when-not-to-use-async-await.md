---
layout: post
title: "When (Not) to Use async/await — Choosing Between async/await and Promise Chains"
image: https://rikson.imgix.net/2025-06-14-when-not-to-use-async-await.jpg?w=856
---
`async/await` has become the common way to write asynchronous code in JavaScript. But using it blindly can sometimes lead to overly verbose code or even subtle bugs.

In this post, we’ll look at when it makes sense to use `async/await`, and when sticking with a simple Promise chain is actually the better choice.

## The Problem with async/await

### Easy to forget `await`

```typescript
async function method() {
  await firstAsync();
  secondAsync(); // ← forgot the await — no error!
}
```

This kind of bug is subtle and hard to catch, even with static analysis.

### Adds unnecessary boilerplate for simple tasks

Let’s say you just want to run two asynchronous functions in order:

```typescript
const loginAndFetchUser = async () => {
  const token = await login();
  return await fetchUser(token);
}
const user = await loginAndFetchUser()
```

You could write the same thing more concisely with a Promise chain:

```typescript
const loginAndFetchUser = () => login().then(fetchUser)
const user = await loginAndFetchUser();
```

When your logic is just a straightforward sequence of function calls, you don't need to define unecessary variable `token`.

## When async/await *is* the Right Choice

### When you need `try/catch` and complex control flow

```typescript
async function safeProcess() {
  try {
    const token = await login();
    const user = await fetchUser(token);
    return await fetchProfile(token, user);
  } catch (error) {
    console.error("Something went wrong:", error);
    return null;
  }
}
```