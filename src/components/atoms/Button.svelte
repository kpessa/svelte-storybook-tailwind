<!-- Button.svelte - Reusable button component with variants using shadcn-svelte -->
<script lang="ts">
  import { Button as ShadcnButton } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type ButtonVariant = 'primary' | 'secondary' | 'ghost';

  // Map our variants to shadcn variants
  const variantMap: Record<ButtonVariant, 'default' | 'secondary' | 'ghost'> = {
    primary: 'default',
    secondary: 'secondary',
    ghost: 'ghost'
  };

  interface $$Props extends HTMLButtonAttributes {
    variant?: ButtonVariant;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    icon?: string | null;
    size?: 'default' | 'sm' | 'lg' | 'icon';
  }

  export let variant: ButtonVariant = 'primary';
  export let type: $$Props['type'] = 'button';
  export let disabled: $$Props['disabled'] = false;
  export let loading: $$Props['loading'] = false;
  export let icon: $$Props['icon'] = null;
  export let size: $$Props['size'] = 'default';

  // Convert our variant to shadcn variant
  $: shadcnVariant = variantMap[variant];

  // Additional classes for loading state
  $: additionalClasses = loading ? 'relative' : '';
</script>

<ShadcnButton
  {type}
  {disabled}
  variant={shadcnVariant}
  {size}
  class={additionalClasses}
  on:click
  {...$$restProps}>
  {#if loading}
    <span class="absolute left-0 right-0 flex justify-center">
      <svg
        class="h-4 w-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
    <span class="invisible">
      <slot />
    </span>
  {:else if icon}
    <span class="mr-2">{icon}</span>
    <slot />
  {:else}
    <slot />
  {/if}
</ShadcnButton>
