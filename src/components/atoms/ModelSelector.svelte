<!-- ModelSelector.svelte - Component for selecting AI models with dropdown interface -->
<script context="module" lang="ts">
  export interface Model {
    id: string;
    name: string;
    provider: string;
    description?: string;
    isAvailable?: boolean;
  }
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { createEventDispatcher } from 'svelte';
  import { cn } from '$lib/utils';

  interface $$Props extends HTMLAttributes<HTMLSelectElement> {
    models: Model[];
    selectedModelId?: string;
    label?: string;
    disabled?: boolean;
  }

  export let models: $$Props['models'] = [];
  export let selectedModelId: $$Props['selectedModelId'] = '';
  export let label: $$Props['label'] = 'Select Model';
  export let disabled: $$Props['disabled'] = false;

  const dispatch = createEventDispatcher<{
    change: { modelId: string; model: Model | undefined };
  }>();

  // Find the selected model object
  $: selectedModel = models.find((model) => model.id === selectedModelId);

  // Group models by provider
  $: modelsByProvider = models.reduce(
    (acc, model) => {
      if (!acc[model.provider]) {
        acc[model.provider] = [];
      }
      acc[model.provider].push(model);
      return acc;
    },
    {} as Record<string, Model[]>
  );

  // Get sorted provider names
  $: providers = Object.keys(modelsByProvider).sort();

  function handleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    selectedModelId = select.value;
    const model = models.find((m) => m.id === selectedModelId);
    dispatch('change', {
      modelId: selectedModelId,
      model
    });
  }

  // Classes for the select element
  const selectClasses = cn(
    'w-full appearance-none rounded-md border border-input bg-background py-2 pl-3 pr-10 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  );
</script>

<div class="w-full">
  {#if label}
    <label for="model-selector" class="mb-1 block text-sm font-medium text-foreground">
      {label}
    </label>
  {/if}

  <div class="relative">
    <select
      id="model-selector"
      class={selectClasses}
      {disabled}
      value={selectedModelId}
      on:change={handleChange}
      {...$$restProps}>
      <option value="" disabled>Select a model</option>

      {#each providers as provider}
        <optgroup label={provider}>
          {#each modelsByProvider[provider] as model}
            <option value={model.id} disabled={model.isAvailable === false}>
              {model.name}
              {model.isAvailable === false ? ' (Unavailable)' : ''}
            </option>
          {/each}
        </optgroup>
      {/each}
    </select>

    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
      <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>

  {#if selectedModel?.description}
    <p class="mt-1 text-xs text-muted-foreground">
      {selectedModel.description}
    </p>
  {/if}
</div>
