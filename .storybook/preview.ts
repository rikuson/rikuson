import type { Preview } from '@storybook/react-webpack5';
// Bootswatch Lux theme - includes Bootstrap CSS
import 'bootswatch/dist/lux/bootstrap.min.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
