import { configure, addDecorator } from '@storybook/html';
import { withNotes } from '@storybook/addon-notes';

// See https://github.com/storybooks/storybook/tree/master/addons/notes.
addDecorator(withNotes);

// Automatically import all files ending in *.stories.js.
const req = require.context('../components', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
