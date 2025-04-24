# Mini Form Builder

A Next.js 15 application for building forms dynamically.

## Getting Started

First, install dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

This project uses Vitest for unit testing and Cypress for end-to-end testing.

### Running Unit Tests

To run unit tests:

```bash
# Run tests in watch mode
yarn test

# Run tests with UI
yarn test:ui

# Run tests with coverage report
yarn test:coverage
```

### Running E2E Tests

To run Cypress tests:

```bash
yarn cypress:open
```

## Features

- Dynamic form field creation
- Real-time form preview
- Field customization options
- Drag and drop field reordering
- Form validation
- Responsive design

## Project Structure

```
mini-form-builder/
├── src/
│   ├── components/
│   │   ├── features/      # Feature components
│   │   └── ui/           # UI components
│   └── app/              # Next.js pages
├── cypress/
│   └── e2e/             # Integration tests
└── public/              # Static assets
```
