<!-- MessageBubble.svelte - Component for displaying chat messages with support for code blocks using shadcn-svelte -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import * as Card from '$lib/components/ui/card';
  import { cn } from '$lib/utils';

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
  $: bubbleClasses = cn(
    'max-w-[80%]',
    isAI ? 'self-start' : 'self-end',
    isAI ? 'bg-muted text-foreground' : 'bg-primary text-primary-foreground'
  );

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

<Card.Root class={cn(bubbleClasses, $$props.class)}>
  <Card.Content class="p-3">
    {#if isLoading}
      <div class="flex gap-2">
        <div class="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
        <div
          class="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0.2s]" />
        <div
          class="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0.4s]" />
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
  </Card.Content>
</Card.Root>
