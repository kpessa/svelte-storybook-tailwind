import type { Meta, StoryObj } from '@storybook/svelte';
import Button from './Button.svelte';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost']
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    icon: { control: 'text' }
  },
  parameters: {
    slots: {
      default: 'Button Text'
    }
  }
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary'
  },
  parameters: {
    slots: {
      default: 'Primary Button'
    }
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  },
  parameters: {
    slots: {
      default: 'Secondary Button'
    }
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost'
  },
  parameters: {
    slots: {
      default: 'Ghost Button'
    }
  }
};

export const Loading: Story = {
  args: {
    loading: true
  },
  parameters: {
    slots: {
      default: 'Loading Button'
    }
  }
};

export const WithIcon: Story = {
  args: {
    icon: '👋'
  },
  parameters: {
    slots: {
      default: 'Button with Icon'
    }
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  },
  parameters: {
    slots: {
      default: 'Disabled Button'
    }
  }
};
