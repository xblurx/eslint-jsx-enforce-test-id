import { Rule } from 'eslint';

const messages = {
    testIdAttributeIsRequired: 'Using attribute {{testIdAttribute}} is required with event handlers',
};

const rule: Rule.RuleModule = {
    meta: {
        docs: {
            description: 'Enforce of using testId attribute with event handlers in JSX',
            category: 'Project specific rules',
            recommended: false,
        },
        messages,
    },
    create: (context: Rule.RuleContext) => {
        return {
            // type of node in this case is JSXElement, though conflicting with the type of Node from eslint parser estree.
            JSXElement(node: any) {
                if (node?.openingElement?.attributes.length === 0) {
                    return;
                }

                const config = context.options[0] || {};
                const testIdAttribute = config.testIdAtribute || 'data-test-id';
                const eventHandlerRegex = /^on[A-Z][a-zA-Z]+/;
                const { attributes } = node.openingElement;

                let hasEventHandler = false;
                let hasTestIdAttribute = false;

                for (const attribute of attributes) {
                    if (eventHandlerRegex.test(attribute?.name?.name)) {
                        hasEventHandler = true;
                    }
                    if (attribute?.name?.name === testIdAttribute) {
                        hasTestIdAttribute = true;
                    }
                }

                if (hasEventHandler && !hasTestIdAttribute) {
                    context.report({
                        messageId: 'testIdAttributeIsRequired',
                        node,
                        data: {
                            testIdAttribute,
                        },
                    });
                }
            },
        };
    },
};

export default rule;
