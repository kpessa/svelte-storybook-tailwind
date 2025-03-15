<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import TextInput from './TextInput.svelte';
</script>

<Meta title="Atoms/TextInput" component={TextInput} />

<Story name="Basic">
  <TextInput placeholder="Enter text..." />
</Story>

<Story name="With Label">
  <TextInput label="Username" placeholder="Enter username" />
</Story>

<Story name="Required">
  <TextInput label="Email" placeholder="Enter email" required />
</Story>

<Story name="With Error">
  <TextInput
    label="Password"
    type="password"
    value="123"
    error="Password must be at least 8 characters" />
</Story>

<Story name="Disabled">
  <TextInput label="Disabled Input" value="Can't edit this" disabled />
</Story>

<Story name="Phone Validation">
  <TextInput
    label="Phone Number"
    pattern="\d{3}-\d{3}-\d{4}"
    placeholder="123-456-7890"
    validationMessage="Please enter a valid phone number" />
</Story>
