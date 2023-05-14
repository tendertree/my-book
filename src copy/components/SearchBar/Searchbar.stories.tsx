import type { Meta, StoryObj } from '@storybook/react';
import { Seachbar } from './Seachbar';
const meta: Meta<typeof Seachbar> = {
	title: 'ui/Seachbar',
	component:Seachbar,
};

export default meta;
type Story = StoryObj<typeof Seachbar>;

export const Basic: Story = {
	args: {
		//basic args here 
	},
};
