# Coding Standards

## 1. Code Style

-   **Indentation**: Use 4 spaces per indentation level.
-   **Max Line Length**: Keep lines of code under 100 characters.
    -   URLs can exceed this limit.
-   **Quotes**: Use double quotes (`"`) for strings.
    -   Template literals are an exception. (e.g., `` `Hi, ${user.name.first}` ``)
    -   We can use single quotes (`'`) if it will allow us to avoid escaping double quotes (`"`). (e.g., `'No need to escape this "yep!"'`)
-   **Semicolons**: Always use semicolons (`;`) at the end of statements.
-   **Comma Usage**:
    -   For multiline elements (like arrays or objects), add trailing commas.
    -   Ensure a space after commas, but never before.
-   **Object/Array Spacing**:
    -   No spaces inside array brackets (`[]`).
    -   Always add spaces inside object braces (`{}`).

## 2. JSX and React

-   **Component Names**: Always use `PascalCase` for component names.
-   **Functions, Not Arrow Functions**: Use regular function declarations (`function ComponentName() {....}`) for defining components. Arrow functions (`const ComponentName = () => {...}`) are not allowed for component definitions due to conflict with the `UPPER_CASE` constant naming rule.
-   **JSX Equality Spacing**: Never add spaces around `=` in JSX attributes.
-   **JSX Curly Braces Spacing**: No spaces around curly braces (`{}`) in JSX attributes.
-   **JSX Quotes**: Use double quotes for JSX attributes.
-   **JSX Tag Spacing**:
    -   No self-closing slash space.
    -   Always space before self-closing tags (`/>`).

## 3. Functions

-   **Function Call Spacing**: No spaces between function names and their parentheses.
-   **Arrow Functions**: Always include spaces before and after the arrow (`=>`).

## 4. Comments

-   **Spacing**: Always add a space after `//` or `/*` when writing comments.

## 5. Naming Conventions

-   **Variables and Parameters**: Use camelCase.
-   **Function Names**: Use camelCase or PascalCase.
-   **Constants**: Use UPPER_CASE for constants.
    -   The only exception for this rule are variables/functions prefixed with `"set"`.
        -   (e.g., `const [COUNT, setCount] = useState<number>(0);`)

## 6. Accessibility

-   Follow best practices from `eslint-plugin-jsx-a11y` to ensure accessible code.

## 7. File Naming

-   Always use kebab-case for filenames (e.g., `my-component.tsx`).

## 8. Ignored Files

-   We do not check neither `node_modules/` nor `dist/` folders.
    -   `dist/` is the folder that gets generated when we build the project.

## 9. Additional Rules

-   **No Tabs**: Never use tabs for indentation.
-   **EOL**: Always end files with a newline.
-   **Dot Location**: Ensure dots are at the beginning of the next line for multi-line chained methods.
-   **No Trailing Spaces**: Remove trailing spaces from lines.

## 10. Prettier and ESLint Scripts

-   **Linter**: Use ESLint to ensure code quality (`npm run linter:check`).
-   **Check Formatting**: Use Prettier to check formatting (`npm run prettier:check`).
-   **Auto-fix**: Use ESLint's auto-fix (`npm run linter:fix`) or Prettier (`npm run prettier:fix`) for correcting issues.
