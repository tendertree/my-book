import type { Meta, StoryObj } from '@storybook/react';
import Seachbar from './Searchbar'
const meta: Meta<typeof Seachbar> = {
	title: 'ui/Seachbar',
	component:Seachbar,
};

export default meta;
type Story = StoryObj<typeof Searchbar>;

export const Basic: Story = {
	args: {
		//basic args here 
	},
};
