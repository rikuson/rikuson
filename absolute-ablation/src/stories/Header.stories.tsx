import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../components/preact/Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPath: {
      control: 'text',
      description: 'Current page path for active link highlighting',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPath: '/',
  },
};

export const TechActive: Story = {
  args: {
    currentPath: '/category/tech',
  },
};

export const FitnessActive: Story = {
  args: {
    currentPath: '/category/fitness',
  },
};

export const LifehackActive: Story = {
  args: {
    currentPath: '/category/lifehack',
  },
};

export const MusicActive: Story = {
  args: {
    currentPath: '/category/music',
  },
};

export const TechPostActive: Story = {
  args: {
    currentPath: '/tech/some-post-title',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows tech category highlighted when viewing a tech post',
      },
    },
  },
};