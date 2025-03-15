<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import MessageBubble from './MessageBubble.svelte';
</script>

<Meta
  title="Atoms/MessageBubble"
  component={MessageBubble}
  argTypes={{
    type: {
      control: { type: 'select', options: ['user', 'ai'] }
    },
    content: { control: 'text' },
    isLoading: { control: 'boolean' },
    timestamp: { control: 'text' }
  }} />

<!-- Basic user message -->
<Story name="User Message">
  <div class="flex flex-col">
    <MessageBubble type="user" content="Hello! How can you help me today?" timestamp="12:30 PM" />
  </div>
</Story>

<!-- Basic AI message -->
<Story name="AI Message">
  <div class="flex flex-col">
    <MessageBubble
      type="ai"
      content="I'm here to help you with any questions you have about coding, development, or general topics."
      timestamp="12:31 PM" />
  </div>
</Story>

<!-- Loading state -->
<Story name="Loading">
  <div class="flex flex-col">
    <MessageBubble type="ai" content="" isLoading={true} />
  </div>
</Story>

<!-- Message with code block -->
<Story name="With Code Block">
  <div class="flex flex-col">
    <MessageBubble
      type="ai"
      content={`Here's an example of a React component:

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

You can use this component like this:

\`\`\`jsx
<Welcome name="Sara" />
\`\`\`
`}
      timestamp="12:32 PM" />
  </div>
</Story>

<!-- Long message -->
<Story name="Long Message">
  <div class="flex flex-col">
    <MessageBubble
      type="ai"
      content="This is a longer message that demonstrates how the message bubble handles multiple paragraphs and wrapping text. The bubble should expand to fit the content while maintaining readability and proper spacing.

When working with longer messages, it's important to ensure that the layout remains consistent and the text is easy to read. This example shows how paragraphs are separated and how the bubble adapts to different content lengths.

The maximum width is set to 80% of the container to ensure optimal line length for readability."
      timestamp="12:33 PM" />
  </div>
</Story>

<!-- Message with multiple code blocks -->
<Story name="Multiple Code Blocks">
  <div class="flex flex-col">
    <MessageBubble
      type="ai"
      content={`Here are two different code examples:

1. JavaScript:
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

2. Python:
\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`

Both accomplish the same thing in different languages.`}
      timestamp="12:34 PM" />
  </div>
</Story>
