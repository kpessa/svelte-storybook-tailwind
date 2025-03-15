<!-- TextInput.svelte - Reusable text input component with validation support -->
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { createEventDispatcher } from 'svelte';

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

  let inputElement: HTMLInputElement;
  let isValid = true;

  const baseClasses =
    'w-full px-4 py-2 text-gray-900 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out';
  const validClasses = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
  const errorClasses = 'border-red-300 focus:border-red-500 focus:ring-red-500';
  const disabledClasses = 'bg-gray-100 cursor-not-allowed';

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

  $: inputClasses = `${baseClasses} ${error ? errorClasses : validClasses} ${disabled ? disabledClasses : ''}`;
</script>

{#if label}
  <label class="mb-1 block text-sm font-medium text-gray-700" for={$$props.id}>
    {label}
    {#if required}
      <span class="text-red-500">*</span>
    {/if}
  </label>
{/if}

<input
  {...$$restProps}
  bind:this={inputElement}
  {value}
  {placeholder}
  {required}
  {disabled}
  {pattern}
  class={inputClasses}
  on:input={handleInput}
  on:change={handleChange}
  on:blur={validate} />

{#if error}
  <p class="mt-1 text-sm text-red-600">{error}</p>
{/if}
