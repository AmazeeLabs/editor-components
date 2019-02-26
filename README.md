# Custom components for CKEditor 5

Library with custom components (created using [LitElement](https://github.com/Polymer/lit-element)) for [CKEditor 5](https://github.com/AmazeeLabs/ckeditor5).
It is built with [Storybook](https://storybook.js.org/).

## Setup and usage
- Install dependencies with `npm run install` or `yarn install`
- Start the server with `npm run storybook` or `yarn run storybook`

## Formatting
It uses [prettier](https://prettier.io/) and [ESLint](https://eslint.org/). Available commands:
- `npm run lint` (or `yarn lint`): see warnings and errors (if any)
- `npm run lint:fix` (or `yarn lint:fix`): see warnings and errors, auto-fix any that can be automatically fixed

## Deployment
This project is hosted on [GitHub Pages](https://pages.github.com/). All [deployments are logged](https://github.com/AmazeeLabs/editor-components/deployments).

To trigger a new deployment:
- `npm run deploy-storybook` (or `yarn deploy-storybook`)
