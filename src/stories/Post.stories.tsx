import type { Meta, StoryObj } from '@storybook/react';
import { Post } from '../components/preact/Post';

const meta = {
  title: 'Components/Post',
  component: Post,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Post>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Introduction to React Hooks',
    url: '/tech/introduction-to-react-hooks',
    date: new Date('2024-01-15'),
    category: 'tech',
    excerpt:
      'Learn the fundamentals of React Hooks and how they can simplify your component logic and state management.',
  },
};

export const WithImage: Story = {
  args: {
    title: 'Building a Modern Web Application',
    url: '/tech/building-modern-web-app',
    date: new Date('2024-02-20'),
    category: 'tech',
    image: 'https://rikson.imgix.net/wp-mac.jpg',
    excerpt:
      'A comprehensive guide to building modern web applications using the latest technologies and best practices.',
    tags: ['react', 'typescript', 'webpack'],
  },
};

export const FitnessPost: Story = {
  args: {
    title: 'Morning Workout Routine for Beginners',
    url: '/fitness/morning-workout-routine',
    date: new Date('2024-03-10'),
    category: 'fitness',
    excerpt:
      'Start your day right with this simple yet effective morning workout routine designed for beginners.',
    tags: ['exercise', 'health', 'morning'],
  },
};

export const LongTitle: Story = {
  args: {
    title:
      'A Comprehensive Guide to Understanding and Implementing Microservices Architecture in Modern Cloud-Native Applications',
    url: '/tech/microservices-guide',
    date: new Date('2024-01-30'),
    category: 'tech',
    excerpt:
      'Explore the world of microservices architecture and learn how to implement it effectively in your projects.',
  },
};

export const NoExcerpt: Story = {
  args: {
    title: 'Quick Tips for Productivity',
    url: '/lifehack/productivity-tips',
    date: new Date('2024-02-15'),
    category: 'lifehack',
  },
};

export const GridLayout: Story = {
  render: () => (
    <div className="row">
      <div className="col-md-6 col-lg-4">
        <Post
          title="First Post"
          url="/tech/first-post"
          date={new Date('2024-01-01')}
          category="tech"
          excerpt="This is the first post in the grid layout example."
        />
      </div>
      <div className="col-md-6 col-lg-4">
        <Post
          title="Second Post"
          url="/fitness/second-post"
          date={new Date('2024-01-02')}
          category="fitness"
          excerpt="This is the second post in the grid layout example."
        />
      </div>
      <div className="col-md-6 col-lg-4">
        <Post
          title="Third Post"
          url="/music/third-post"
          date={new Date('2024-01-03')}
          category="music"
          excerpt="This is the third post in the grid layout example."
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Example of posts in a responsive grid layout',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="container-fluid p-4">
        <Story />
      </div>
    ),
  ],
};
