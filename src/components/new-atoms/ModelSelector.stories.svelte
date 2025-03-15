<script lang="ts">
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import ModelSelector, { type Model } from './ModelSelector.svelte';

  // Mock models for stories
  const mockModels: Model[] = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'OpenAI',
      description: 'Most capable GPT model for complex tasks'
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      description: 'Fast and efficient for most tasks'
    },
    {
      id: 'claude-3-opus',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      description: 'Most powerful Claude model with enhanced reasoning'
    },
    {
      id: 'claude-3-sonnet',
      name: 'Claude 3 Sonnet',
      provider: 'Anthropic',
      description: 'Balanced performance and efficiency'
    },
    {
      id: 'claude-3-haiku',
      name: 'Claude 3 Haiku',
      provider: 'Anthropic',
      description: 'Fast and cost-effective'
    },
    {
      id: 'deepseek-coder',
      name: 'DeepSeek Coder',
      provider: 'DeepSeek',
      description: 'Specialized for coding tasks',
      isAvailable: false
    },
    {
      id: 'llama-3-70b',
      name: 'Llama 3 70B',
      provider: 'Meta',
      description: 'Open model with strong capabilities'
    }
  ];

  function handleChange(event: CustomEvent<{ modelId: string; model: Model | undefined }>) {
    console.log('Model changed:', event.detail);
  }
</script>

<Meta
  title="Atoms/ModelSelector"
  component={ModelSelector}
  argTypes={{
    disabled: { control: 'boolean' }
  }} />

<!-- Basic selector with default selection -->
<Story name="Default">
  <div class="max-w-md p-4">
    <ModelSelector models={mockModels} selectedModelId="gpt-4" on:change={handleChange} />
  </div>
</Story>

<!-- With custom label -->
<Story name="Custom Label">
  <div class="max-w-md p-4">
    <ModelSelector
      models={mockModels}
      selectedModelId="claude-3-opus"
      label="Choose AI Model"
      on:change={handleChange} />
  </div>
</Story>

<!-- No selection -->
<Story name="No Selection">
  <div class="max-w-md p-4">
    <ModelSelector models={mockModels} selectedModelId="" on:change={handleChange} />
  </div>
</Story>

<!-- Disabled state -->
<Story name="Disabled">
  <div class="max-w-md p-4">
    <ModelSelector
      models={mockModels}
      selectedModelId="gpt-3.5-turbo"
      disabled={true}
      on:change={handleChange} />
  </div>
</Story>

<!-- Single provider -->
<Story name="Single Provider">
  <div class="max-w-md p-4">
    <ModelSelector
      models={mockModels.filter((model) => model.provider === 'Anthropic')}
      selectedModelId="claude-3-sonnet"
      on:change={handleChange} />
  </div>
</Story>

<!-- With unavailable models -->
<Story name="With Unavailable Models">
  <div class="max-w-md p-4">
    <ModelSelector models={mockModels} selectedModelId="llama-3-70b" on:change={handleChange} />
  </div>
</Story>
