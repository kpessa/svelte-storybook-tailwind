<!-- MessageBubble.svelte - Component for displaying chat messages with support for code blocks -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface $$Props extends HTMLAttributes<HTMLDivElement> {
    type: 'user' | 'ai';
    content: string;
    isLoading?: boolean;
    timestamp?: string;
  }

  export let type: $$Props['type'];
  export let content: $$Props['content'] = '';
  export let isLoading: $$Props['isLoading'] = false;
  export let timestamp: $$Props['timestamp'] = undefined;

  // Reactive declarations for styling
  $: isAI = type === 'ai';
  $: bubbleClasses = `flex max-w-[80%] ${isAI ? 'self-start' : 'self-end'} rounded-lg p-3 ${
    isAI ? 'bg-gray-100 text-gray-900' : 'bg-blue-600 text-white'
  }`;

  // Function to detect and format code blocks
  function formatContent(text: string): string {
    // Simple code block detection - can be enhanced later
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
    return text.replace(codeBlockRegex, (_, language, code) => {
      return `<pre class="mt-2 mb-2 p-3 bg-gray-800 text-gray-100 rounded overflow-x-auto"><code class="language-${language}">${code.trim()}</code></pre>`;
    });
  }

  $: formattedContent = formatContent(content);
</script>

<div class={bubbleClasses} {...$$restProps}>
  <div class="flex w-full flex-col gap-1">
    {#if isLoading}
      <div class="flex gap-2">
        <div class="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
        <div class="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]" />
        <div class="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]" />
      </div>
    {:else}
      <div class="break-words">
        {@html formattedContent}
      </div>
      {#if timestamp}
        <div class="mt-1 text-xs opacity-60">
          {timestamp}
        </div>
      {/if}
    {/if}
  </div>
</div>
