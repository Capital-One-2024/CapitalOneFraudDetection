# Code Style Guide

This document outlines the coding conventions, formatting, and linting rules for our project. Follow these guidelines to ensure code consistency across the codebase.

## Tools Used

-   **ESLint**: To lint and enforce best practices in our JavaScript/TypeScript code.
-   **Prettier**: To format code automatically and ensure it adheres to consistent style.

## ESLint Rules

Our ESLint configuration includes the following rules and settings:

### General JavaScript and TypeScript Rules:

-   **JavaScript Config**: Extends ESLint's recommended rules for best practices.
-   **TypeScript Config**: Extends TypeScript ESLint's recommended settings.

### React-Specific Rules:

-   **React Hooks**:

    -   **`react-hooks/rules-of-hooks`**: Ensures hooks (`useEffect`, `useState`, etc.) are used correctly within functional components or custom hooks.
    -   **`react-hooks/exhaustive-deps`**: Checks for correct hook dependencies (e.g., in `useEffect`).

-   **React Refresh Rules**:

    -   **`react-refresh/only-export-components`**: Warns if non-component elements are exported. However, constant exports are allowed for simplicity (`{ allowConstantExport: true }`).

### Global Variables:

-   We define the browser environment via `globals.browser`, which ensures global variables like `window`, `document`, etc., are recognized.

## Prettier Configuration

Prettier handles code formatting. Here’s how Prettier is configured to format our code:

### Prettier Formatting Rules:

-   **Print Width**: 80 characters
-   **Tab Width**: 4 spaces
-   **Use Tabs**: Disabled (spaces are used instead of tabs)
-   **Semicolons**: Always include semicolons at the end of statements
-   **Single Quotes**: Use single quotes for strings (instead of double quotes)
-   **Trailing Commas**: Use trailing commas where valid in ES5 (objects, arrays)
-   **Bracket Spacing**: Add spaces between brackets in object literals (`{ foo: bar }`)
-   **Arrow Function Parentheses**: Always include parentheses around arrow function parameters (`(param) => {}`).
-   **End of Line**: Use LF for line endings (Linux/Unix style)

## Running Lint and Format Checks

Use the following commands to lint and format code:

### Linting:

To check for linting errors:

```bash
npm run lint
```

### Formatting:

-   To check for formatting errors:

    ```bash
    npm run prettier:check
    ```

-   To fix formatting errors:

    ```bash
    npm run prettier:format
    ```
