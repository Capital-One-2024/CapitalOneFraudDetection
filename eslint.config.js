import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import accessibility from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    { files: ["**/*.{ts,tsx}"] },
    { ignores: ["node_modules", "dist", ".amplify"] },
    {
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: "module",
            globals: globals.browser,
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "jsx-a11y": accessibility,
            "@stylistic": stylistic,
        },
    },
    {
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": ["error", { allowConstantExport: true }],
            ...accessibility.flatConfigs.recommended.rules,
            "@stylistic/indent": ["error", 4],
            "@stylistic/max-len": [
                "error",
                {
                    code: 100,
                    tabWidth: 4,
                    comments: 100,
                    ignoreUrls: true,
                },
            ],
            "@stylistic/no-tabs": ["error"],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/quotes": [
                "error",
                "double",
                {
                    avoidEscape: true,
                    allowTemplateLiterals: true,
                },
            ],
            "@stylistic/comma-dangle": ["error", "only-multiline"],
            "@stylistic/comma-spacing": ["error", { before: false, after: true }],
            "@stylistic/jsx-equals-spacing": ["error", "never"],
            "@stylistic/jsx-curly-spacing": ["error", "never"],
            "@stylistic/function-call-spacing": ["error", "never"],
            "@stylistic/block-spacing": "error",
            "@stylistic/arrow-spacing": ["error", { before: true, after: true }],
            "@stylistic/array-bracket-spacing": ["error", "never"],
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/object-curly-newline": ["error", { multiline: true, consistent: true }],
            "@stylistic/switch-colon-spacing": ["error", { after: true, before: false }],
            "@stylistic/spaced-comment": ["error", "always"],
            "@stylistic/space-in-parens": ["error", "never"],
            "@stylistic/no-trailing-spaces": "error",
            "@stylistic/key-spacing": [
                "error",
                {
                    afterColon: true,
                    mode: "strict",
                },
            ],
            "@stylistic/jsx-tag-spacing": [
                "error",
                {
                    closingSlash: "never",
                    beforeSelfClosing: "always",
                    afterOpening: "never",
                    beforeClosing: "never",
                },
            ],
            "@stylistic/eol-last": ["error", "always"],
            "@stylistic/dot-location": ["error", "property"],
            "@stylistic/jsx-quotes": ["error", "prefer-double"],
            "@stylistic/jsx-wrap-multilines": [
                "error",
                {
                    declaration: "parens-new-line",
                    assignment: "parens-new-line",
                    return: "parens-new-line",
                    arrow: "parens-new-line",
                    condition: "parens-new-line",
                    logical: "parens-new-line",
                    prop: "parens-new-line",
                    propertyValue: "parens-new-line",
                },
            ],
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "function",
                    format: ["camelCase", "PascalCase"],
                    leadingUnderscore: "forbid",
                },
                {
                    selector: ["variable", "parameter"],
                    format: ["camelCase"],
                    leadingUnderscore: "forbid",
                },
                {
                    selector: ["typeLike"],
                    format: ["PascalCase"],
                    leadingUnderscore: "forbid",
                },
                {
                    selector: "variable",
                    modifiers: ["const"],
                    format: ["UPPER_CASE"],
                },
                {
                    selector: "variable",
                    modifiers: ["destructured"],
                    format: ["camelCase", "UPPER_CASE"],
                },
            ],
        },
    },
];
