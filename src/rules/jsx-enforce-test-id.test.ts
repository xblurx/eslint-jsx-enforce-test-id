import { RuleTester } from 'eslint';

import rule from './jsx-enforce-test-id';

const tester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
});

const eventHandler = () => {};
const dataTestId = 'someTestId';

tester.run('jsx-enforce-test-id', rule, {
    valid: [
        { code: '<div onClick={eventHandler} data-test-id={dataTestId}>Hello</div>' },
        { code: '<TestComponent onClick={eventHandler} data-test-id={dataTestId}>Hello</TestComponent>' },
        { code: '<TestComponent onClick={eventHandler} data-test-id={dataTestId}/>' },
        { code: '<div data-test-id={dataTestId}>Hello</div>' },
        { code: '<div>Hello</div>' },
        { code: '<TestComponent isLoading={true} />' },
        { code: '<div><TestComponent onClick={eventHandler} data-test-id={dataTestId}>Hello</TestComponent></div>' },
    ],
    invalid: [
        {
            code: `<div onClick={eventHandler}>Hello</div>`,
            errors: [{ messageId: 'testIdAttributeIsRequired' }],
        },
        {
            code: '<TestComponent onClick={eventHandler}>Hello</TestComponent>',
            errors: [{ messageId: 'testIdAttributeIsRequired' }],
        },
        {
            code: '<TestComponent onClick={eventHandler} />',
            errors: [{ messageId: 'testIdAttributeIsRequired' }],
        },
        {
            code: '<div><TestComponent onClick={eventHandler}>Hello</TestComponent></div>',
            errors: [{ messageId: 'testIdAttributeIsRequired' }],
        },
    ],
});
