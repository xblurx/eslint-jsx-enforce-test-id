# Enforce of using testId attribute with event handlers in JSX

Ensures that HTML elements or React components have testId attribute if there are event handlers.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<div onClick={() => {}}>Hello</div>
```

```jsx
<MyComponent onClick={() => {}} />
```

Examples of **correct** code for this rule:

```jsx
<div onClick={() => {}} data-test-id="someTestId">Hello</div>
```

```jsx
<MyComponent onClick={() => {}} data-test-id="someTestId">Hello</MyComponent>
```

## Rule Options

```js
...
"jsx-enforce-test-id": [<enabled>, {
  "testIdAtribute": <testIdAtribute>,
}]
...
```

* `testIdAtribute`: Attribute for finding a node with testId. Defaults to `data-test-id`

## When Not To Use It

If you are not using JSX, or if you don't want to enforce specific naming conventions for event handlers.
