import type { Meta, StoryObj } from '@storybook/react';
import { FormattedDate } from '../components/react/FormattedDate';

const meta = {
  title: 'Components/FormattedDate',
  component: FormattedDate,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: 'date',
      description: 'Date to format',
    },
  },
} satisfies Meta<typeof FormattedDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date('2024-01-15'),
  },
};

export const CurrentDate: Story = {
  args: {
    date: new Date(),
  },
};

export const PastDate: Story = {
  args: {
    date: new Date('2020-06-30'),
  },
};