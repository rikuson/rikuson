---
layout: post
date: 2024-10-12
title: Currying Validation Functions
image: https://rikson.imgix.net/2024-10-12-curring-validation-function.jpg?w=856
---

Currying is a fundamental technique in functional programming, but knowing when and where to apply it can be tricky. In this post, I'll demonstrate how currying can be useful in validation.

Here’s an example of a terminal application that prompts users for their profile information:

```typescript
import readline from 'readline'

const validateRequired = (value: string, label: string) => {
  if (value === '') {
    throw new Error(`${label} is required.`)
  }
  return value
}

const validateNumber = (value: string, label: string) => {
  if (!/^[\+\-]?\d+$/.test(value)) {
    throw new Error(`${label} must be number.`)
  }
  return value
}

const validateRange = (value: string, label: string, min: number, max: number) => {
  if (Number(value) < min || Number(value) > max) {
    throw new Error(`${label} must be ${min} to ${max}.`)
  }
  return value
}

const validatePhone = (value: string, label: string) => {
  if (!/^\d{10,11}$/.test(value)) {
    throw new Error(`${label} is invalid phone format.`)
  }
  return value
}

const validateEmail = (value: string, label: string) => {
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)) {
    throw new Error(`${label} is invalid email format.`)
  }
  return value
}

const r = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (question: string) => new Promise<string>((resolve) => r.question(question, resolve))

;(async () => {
  try {
    const age = await ask('Age: ')
    validateRequired(age, 'Age')
    validateNumber(age, 'Age')
    validateRange(age, 'Age', 0, 200)

    const phone = await ask('Phone: ')
    validateRequired(phone, 'Phone')
    validatePhone(phone, 'Phone')

    const email = await ask('Email: ')
    validateRequired(email, 'Email')
    validateEmail(email, 'Email')
    console.log('OK')
  } catch (error) {
      console.error('Error: ' + error.message)
    }
    r.close()
})()
```

In this code, the `value` and `label` parameters are repeated across validation functions. We can refactor it by using currying and composing the validation functions with lodash.

```typescript
import readline from 'readline'
import _ from 'lodash'

const validateRequired = _.curryRight((value: string, label: string) => {
  if (value === '') {
    throw new Error(`${label} is required.`)
  }
  return value
})

const validateNumber = _.curryRight((value: string, label: string) => {
  if (!/^[\+\-]?\d+$/.test(value)) {
    throw new Error(`${label} must be number.`)
  }
  return value
})

const validateRange = _.curryRight((value: string, label: string, min: number, max: number) => {
  if (Number(value) < min || Number(value) > max) {
    throw new Error(`${label} must be ${min} to ${max}.`)
  }
  return value
})

const validatePhone = _.curryRight((value: string, label: string) => {
  if (!/^\d{10,11}$/.test(value)) {
    throw new Error(`${label} is invalid phone format.`)
  }
  return value
})

const validateEmail = _.curryRight((value: string, label: string) => {
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)) {
    throw new Error(`${label} is invalid email format.`)
  }
  return value
})

const r = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (question: string) => new Promise<string>((resolve) => r.question(question, resolve))

;(async () => {
  try {
    await ask('Age: ').then(
      _.flow(
        validateRequired,
        validateNumber,
        validateRange(0, 200)
      )('Age')
    )

    await ask('Phone: ').then(
      _.flow(
        validateRequired,
        validatePhone
      )('Phone')
    )

    await ask('Email: ').then(
      _.flow(
        validateRequired,
        validateEmail
      )('Email')
    )

    console.log('OK')
  } catch (error) {
    console.error('Error: ' + error.message)
  }
  r.close()
})()
```

This version eliminates redundancy by using currying and function composition. But, I also wanted to refactor it in a more functional style, removing `async/await` and `try-catch`.

For this, I used `fp-ts`. However, `fp-ts` doesn't offer automatic currying like lodash does, as noted in this [issue](https://github.com/gcanti/fp-ts/issues/1644).

Here’s the refactored version using `fp-ts`:

```typescript
import * as E from 'fp-ts/Either'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { sequenceT } from 'fp-ts/lib/Apply'
import * as readline from 'readline'

const validateRequired = (label: string) => (value: string): E.Either<Error, string> => 
  value === '' ? E.left(new Error(`${label} is required.`)) : E.right(value)

const validateNumber = (label: string) => (value: string): E.Either<Error, string> =>
  /^[\+\-]?\d+$/.test(value) ? E.right(value) : E.left(new Error(`${label} must be a number.`))

const validateRange = (min: number, max: number) => (label: string) => (value: string): E.Either<Error, string> => 
  (Number(value) >= min && Number(value) <= max) ? E.right(value) : E.left(new Error(`${label} must be between ${min} and ${max}.`))

const validatePhone = (label: string) => (value: string): E.Either<Error, string> =>
  /^\d{10,11}$/.test(value) ? E.right(value) : E.left(new Error(`${label} is an invalid phone format.`))

const validateEmail = (label: string) => (value: string): E.Either<Error, string> =>
  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value) ? E.right(value) : E.left(new Error(`${label} is an invalid email format.`))

const r = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (question: string) => new Promise<string>((resolve) => r.question(question, resolve))

const askAge = pipe(
  TE.tryCatch(() => ask('Age: '), E.toError),
  TE.chain((age) =>
    pipe(
      E.right(age),
      E.chain(validateRequired('Age')),
      E.chain(validateNumber('Age')),
      E.chain(validateRange(0, 200)('Age')),
      TE.fromEither
    )
  ),
)

const askPhone = pipe(
  TE.tryCatch(() => ask('Phone: '), E.toError),
  TE.chain((phone) =>
    pipe(
      E.right(phone),
      E.chain(validateRequired('Phone')),
      E.chain(validatePhone('Phone')),
      TE.fromEither
    )
  ),
)

const askEmail = pipe(
  TE.tryCatch(() => ask('Email: '), E.toError),
  TE.chain((email) =>
    pipe(
      E.right(email),
      E.chain(validateRequired('Email')),
      E.chain(validateEmail('Email')),
      TE.fromEither
    )
  ),
)

pipe(
  sequenceT(TE.ApplySeq)(askAge, askPhone, askEmail),
  TE.fold(
    ({ message }) => TE.of(console.error('Error: ' + message)),
    () => TE.of(console.log('OK'))
  )
)().finally(() => r.close())
```

While this approach offers better type safety, it does become more verbose.
