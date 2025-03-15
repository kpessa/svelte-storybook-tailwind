<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';
</script>

<Meta title="Atoms/Button" component={Button} />

<!-- Primary Variants -->
<Story name="Primary">
  <Button variant="primary">Primary Button</Button>
</Story>

<Story name="Primary Loading">
  <Button variant="primary" loading>Loading Button</Button>
</Story>

<Story name="Primary with Icon">
  <Button variant="primary" icon="👋">Button with Icon</Button>
</Story>

<Story name="Primary Disabled">
  <Button variant="primary" disabled>Disabled Button</Button>
</Story>

<!-- Secondary Variants -->
<Story name="Secondary">
  <Button variant="secondary">Secondary Button</Button>
</Story>

<Story name="Secondary Loading">
  <Button variant="secondary" loading>Loading Button</Button>
</Story>

<Story name="Secondary with Icon">
  <Button variant="secondary" icon="👋">Button with Icon</Button>
</Story>

<Story name="Secondary Disabled">
  <Button variant="secondary" disabled>Disabled Button</Button>
</Story>

<!-- Ghost Variants -->
<Story name="Ghost">
  <Button variant="ghost">Ghost Button</Button>
</Story>

<Story name="Ghost Loading">
  <Button variant="ghost" loading>Loading Button</Button>
</Story>

<Story name="Ghost with Icon">
  <Button variant="ghost" icon="👋">Button with Icon</Button>
</Story>

<Story name="Ghost Disabled">
  <Button variant="ghost" disabled>Disabled Button</Button>
</Story>

<!-- Size Variants -->
<Story name="Small Size">
  <Button variant="primary" size="sm">Small Button</Button>
</Story>

<Story name="Default Size">
  <Button variant="primary" size="default">Default Button</Button>
</Story>

<Story name="Large Size">
  <Button variant="primary" size="lg">Large Button</Button>
</Story>

<Story name="Icon Size">
  <Button variant="primary" size="icon" icon="👋"></Button>
</Story>
