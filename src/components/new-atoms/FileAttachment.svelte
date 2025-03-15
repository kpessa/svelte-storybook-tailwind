<!-- FileAttachment.svelte - Component for displaying file attachments with preview support using shadcn-svelte -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';

  interface $$Props extends HTMLAttributes<HTMLDivElement> {
    file: File;
    previewUrl?: string;
    onRemove?: () => void;
    showRemoveButton?: boolean;
  }

  export let file: $$Props['file'];
  export let previewUrl: $$Props['previewUrl'] = undefined;
  export let onRemove: $$Props['onRemove'] = undefined;
  export let showRemoveButton: $$Props['showRemoveButton'] = true;

  // File type checking
  $: isImage = file.type.startsWith('image/');
  $: fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

  // Format file size
  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }

  // Get icon based on file type
  function getFileIcon(extension: string): string {
    const iconMap: Record<string, string> = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      xls: '📊',
      xlsx: '📊',
      txt: '📃',
      zip: '📦',
      rar: '📦',
      default: '📎'
    };
    return iconMap[extension] || iconMap.default;
  }

  $: fileIcon = getFileIcon(fileExtension);

  // Handle remove button click with preventDefault
  function handleRemove(event: MouseEvent) {
    event.preventDefault();
    if (onRemove) onRemove();
  }
</script>

<Card.Root class={cn('group relative w-full max-w-xs', $$props.class)}>
  {#if showRemoveButton && onRemove}
    <Button
      variant="destructive"
      size="icon"
      class="absolute -right-2 -top-2 hidden h-6 w-6 rounded-full shadow-sm group-hover:flex"
      on:click={handleRemove}
      aria-label="Remove file">
      ×
    </Button>
  {/if}

  <Card.Content class="p-2">
    <div class="flex w-full gap-3">
      {#if isImage && previewUrl}
        <div class="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
          <img src={previewUrl} alt={file.name} class="h-full w-full object-cover" loading="lazy" />
        </div>
      {:else}
        <div
          class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-muted text-2xl">
          {fileIcon}
        </div>
      {/if}

      <div class="flex min-w-0 flex-1 flex-col justify-center">
        <p class="truncate text-sm font-medium text-foreground" title={file.name}>
          {file.name}
        </p>
        <p class="text-xs text-muted-foreground">
          {formatFileSize(file.size)}
        </p>
        {#if file.type}
          <p class="text-xs text-muted-foreground/70">
            {file.type}
          </p>
        {/if}
      </div>
    </div>
  </Card.Content>
</Card.Root>
