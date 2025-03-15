<!-- FileAttachment.svelte - Component for displaying file attachments with preview support -->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

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
</script>

<div
  class="group relative flex w-full max-w-xs rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
  {#if showRemoveButton && onRemove}
    <button
      type="button"
      class="absolute -right-2 -top-2 hidden h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition-all hover:bg-red-600 group-hover:flex"
      on:click|preventDefault={onRemove}
      aria-label="Remove file">
      ×
    </button>
  {/if}

  <div class="flex w-full gap-3">
    {#if isImage && previewUrl}
      <div class="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <img src={previewUrl} alt={file.name} class="h-full w-full object-cover" loading="lazy" />
      </div>
    {:else}
      <div
        class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 text-2xl">
        {fileIcon}
      </div>
    {/if}

    <div class="flex min-w-0 flex-1 flex-col justify-center">
      <p class="truncate text-sm font-medium text-gray-900" title={file.name}>
        {file.name}
      </p>
      <p class="text-xs text-gray-500">
        {formatFileSize(file.size)}
      </p>
      {#if file.type}
        <p class="text-xs text-gray-400">
          {file.type}
        </p>
      {/if}
    </div>
  </div>
</div>
