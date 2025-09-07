import type { Meta, StoryObj } from '@storybook/react';
import { SearchBox } from '../components/preact/SearchBox';

const meta = {
  title: 'Components/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithSamplePosts: Story = {
  args: {
    posts: [
      { url: '/tech/post-1', title: 'Introduction to React', category: 'tech' },
      { url: '/tech/post-2', title: 'Advanced TypeScript Patterns', category: 'tech' },
      { url: '/fitness/post-1', title: 'Morning Workout Routine', category: 'fitness' },
      { url: '/lifehack/post-1', title: 'Productivity Tips', category: 'lifehack' },
      { url: '/music/post-1', title: 'Best Albums of 2023', category: 'music' },
    ],
  },
};