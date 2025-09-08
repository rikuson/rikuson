import type { Meta, StoryObj } from '@storybook/react';
import { PostList } from '../components/preact/PostList';

const meta = {
  title: 'Components/PostList',
  component: PostList,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PostList>;

export default meta;
type Story = StoryObj<typeof meta>;

const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with TypeScript',
    url: '/tech/getting-started-typescript',
    date: new Date('2024-03-15'),
    category: 'tech',
    excerpt: 'Learn the basics of TypeScript and how it can improve your JavaScript development experience.',
    tags: ['typescript', 'javascript', 'programming'],
  },
  {
    id: '2',
    title: 'Morning Yoga Routine',
    url: '/fitness/morning-yoga',
    date: new Date('2024-03-14'),
    category: 'fitness',
    excerpt: 'Start your day with this energizing 20-minute yoga routine that will leave you feeling refreshed.',
    tags: ['yoga', 'morning', 'wellness'],
  },
  {
    id: '3',
    title: 'Productivity Hacks for Remote Workers',
    url: '/lifehack/remote-productivity',
    date: new Date('2024-03-13'),
    category: 'lifehack',
    excerpt: 'Discover effective strategies to boost your productivity while working from home.',
    tags: ['productivity', 'remote work', 'tips'],
  },
  {
    id: '4',
    title: 'Best Albums of 2024',
    url: '/music/best-albums-2024',
    date: new Date('2024-03-12'),
    category: 'music',
    excerpt: 'Our curated list of the most influential and innovative albums released this year.',
    tags: ['music', 'albums', 'reviews'],
  },
  {
    id: '5',
    title: 'React Performance Optimization',
    url: '/tech/react-performance',
    date: new Date('2024-03-11'),
    category: 'tech',
    image: 'https://rikson.imgix.net/wp-mac.jpg',
    excerpt: 'Advanced techniques to optimize your React applications for better performance.',
    tags: ['react', 'performance', 'optimization'],
  },
  {
    id: '6',
    title: 'Healthy Meal Prep Ideas',
    url: '/fitness/meal-prep',
    date: new Date('2024-03-10'),
    category: 'fitness',
    excerpt: 'Simple and nutritious meal prep ideas to support your fitness goals.',
    tags: ['nutrition', 'meal prep', 'healthy eating'],
  },
];

export const Default: Story = {
  args: {
    posts: samplePosts,
  },
};

export const TwoColumns: Story = {
  args: {
    posts: samplePosts.slice(0, 4),
  },
};

export const ThreeColumns: Story = {
  args: {
    posts: samplePosts.slice(0, 3),
  },
};

export const SingleColumn: Story = {
  args: {
    posts: samplePosts.slice(0, 2),
  },
};

export const EmptyList: Story = {
  args: {
    posts: [],
  },
};