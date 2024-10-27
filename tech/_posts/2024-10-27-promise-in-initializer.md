---
layout: post
title: Managing Promises in JavaScript Class Initializers
image: https://rikson.imgix.net/2024-10-27-promise-in-initializer?w=856
---

When working with JavaScript, you typically need to pass resolved values to a class instance when you initialize it, ensuring that any required data is available right from the start. For example:

```javascript
const result = await fetchSomething();
const instance = new Foo(result);
```

## The Challenge: Handling Promises During Initialization

Sometimes, you might find yourself needing to handle an asynchronous operation, like a `Promise`, directly within the class initializer. Let's look at an example:

```javascript
class Foo {
  constructor(url) {
    this.fetchSomething(url).then((result) => this.something = result);
  }
  // ...
}
const instance = new Foo(url);
```

In this setup, we initialize `Foo` with a URL and assign `this.something` asynchronously once `fetchSomething` resolves. However, problems arise if you want to call a method that relies on `this.something` before the `Promise` is resolved. Let’s see why:

```javascript
class Foo {
  constructor(url) {
    this.fetchSomething(url).then((result) => this.something = result);
  }
  getSomething() {
    return this.something;
  }
  // ...
}
const instance = new Foo(url);
const something = instance.getSomething(); // This will return undefined
```

Here, `getSomething` is called before `fetchSomething` finishes, so it returns `undefined`. JavaScript doesn't allow `async`constructors, which means you can’t simply wait for the Promise to resolve in the initializer.

### Attempting an `async` Constructor: Why It Fails

```javascript
class Foo {
  async constructor(url) { // This will throw an error
    this.something = await this.fetchSomething(url);
  }
  getSomething() {
    return this.something;
  }
  // ...
}
```

In JavaScript, constructors can’t be `async` because they are expected to return the instance itself, not a `Promise`. If you try to return a `Promise` from a constructor, it will still return the object instance directly, ignoring the asynchronous value:

```javascript
class Foo {
  constructor(url) {
    return this.fetchSomething(url).then((result) => this.something = result);
  }
  getSomething() {
    return this.something;
  }
  // ...
}
const instance = await new Foo(url); // Using `await` here has no effect
const something = instance.getSomething();
```

## Solutions

The need for asynchronous setup can arise in scenarios requiring external data or pre-initialization of fields. If the object must wait for data before functioning correctly, here are some strategies to handle this properly.

### Using a Static Initialization Method

One common solution is to offload the asynchronous setup to a static initializer method, which returns a `Promise` that resolves to a fully initialized instance.

```javascript
class Foo {
  constructor(something) {
    this.something = something;
  }
  
  static async init(url) {
    const something = await this.fetchSomething(url);
    return new Foo(something);
  }
  
  getSomething() {
    return this.something;
  }
  // ...
}

const instance = await Foo.init(url);
const something = instance.getSomething();
```

In this setup, `Foo.init` handles the asynchronous data retrieval, ensuring the class instance is only created once the necessary data is available. This approach is straightforward and provides the added benefit of clear error handling within `init`.

### Using the Observer Pattern

Another approach is to use the Observer pattern to manage asynchronous data. By using a reactive programming library like `rxjs`, we can emit values as they become available and subscribe to them as needed.

#### Example with RxJS Observables

In this version, we wrap `fetchSomething` as an observable so it can be subscribed to or resolved when needed. This is especially useful if you want to share the resolved value with multiple consumers without making redundant network calls.

```javascript
import { firstValueFrom, from, shareReplay } from 'rxjs';

class Foo {
  constructor(url) {
    this.fetchSomething$ = from(this.fetchSomething(url)).pipe(shareReplay(1));
  }

  getSomething() {
    return firstValueFrom(this.fetchSomething$);
  }
  // ...
}

const instance = new Foo(url);
const something = await instance.getSomething();
```

In this example, we create `fetchSomething$` as an observable stream, allowing other parts of the application to retrieve or subscribe to the result once available. `shareReplay(1)` caches the result, ensuring that subsequent subscriptions use the same data.

#### Subscribing Directly to the Observable

Alternatively, you can work with the Observable directly by subscribing to it. This can be helpful if you need to perform multiple actions once the data arrives or if you want to listen to the data continuously.

```javascript
import { from, shareReplay } from 'rxjs';

class Foo {
  constructor(url) {
    this.fetchSomething$ = from(this.fetchSomething(url)).pipe(shareReplay(1));
  }
  // ...
}

const instance = new Foo(url);
instance.fetchSomething$.subscribe((something) => {
  // Handle the fetched data
});
```

In this setup, each subscriber gets notified as soon as the data is available. This approach adds flexibility, especially for applications where data updates need to be pushed to multiple observers.
