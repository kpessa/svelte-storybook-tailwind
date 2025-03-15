<!-- TextInput.svelte - Reusable text input component with validation support using shadcn-svelte -->
<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { cn } from '$lib/utils';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { createEventDispatcher, onMount } from 'svelte';

  interface $$Props extends HTMLInputAttributes {
    value?: string;
    label?: string;
    error?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    pattern?: string;
    validationMessage?: string;
  }

  export let value: $$Props['value'] = '';
  export let label: $$Props['label'] = undefined;
  export let error: $$Props['error'] = undefined;
  export let placeholder: $$Props['placeholder'] = '';
  export let required: $$Props['required'] = false;
  export let disabled: $$Props['disabled'] = false;
  export let pattern: $$Props['pattern'] = undefined;
  export let validationMessage: $$Props['validationMessage'] = '';

  const dispatch = createEventDispatcher<{
    input: string;
    change: string;
    validate: { valid: boolean; message: string };
  }>();

  let inputElement: HTMLInputElement | null = null;
  let inputWrapper: HTMLDivElement;

  onMount(() => {
    // Find the actual input element inside the Input component
    if (inputWrapper) {
      inputElement = inputWrapper.querySelector('input');
    }
  });

  let isValid = true;

  // Define classes for error state
  $: inputClasses = cn(
    error ? 'border-destructive focus-visible:ring-destructive' : '',
    $$props.class
  );

  function validate() {
    if (!inputElement) return;

    isValid = inputElement.checkValidity();
    const message = isValid ? '' : validationMessage || inputElement.validationMessage;

    dispatch('validate', {
      valid: isValid,
      message
    });
  }

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    dispatch('input', value);
    validate();
  }

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    dispatch('change', value);
    validate();
  }
</script>

<div bind:this={inputWrapper}>
  {#if label}
    <label class="mb-1 block text-sm font-medium text-foreground" for={$$props.id}>
      {label}
      {#if required}
        <span class="text-destructive">*</span>
      {/if}
    </label>
  {/if}

  <Input
    {value}
    {placeholder}
    {required}
    {disabled}
    {pattern}
    class={inputClasses}
    on:input={handleInput}
    on:change={handleChange}
    on:blur={validate}
    {...$$restProps} />

  {#if error}
    <p class="mt-1 text-sm text-destructive">{error}</p>
  {/if}
</div>
