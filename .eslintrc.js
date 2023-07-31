module.exports = {
  settings: {
    includeExports: true,
  },
  extends: [
    "react-app",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
  ],
  plugins: ["react", "@typescript-eslint"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  rules: {
    "linebreak-style": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-param-reassign": [
      "error",
      {
        props: false,
      },
    ],
    "semi": 0,
    "no-nested-ternary": "off",
    "no-alert": "off",
    "no-return-assign": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/jsx-boolean-value": "off",
    "react/no-danger": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "no-empty-pattern": "off",
    "import/order": [
      "error",
      {
        groups: [
          "external",
          "internal",
          "parent",
          "builtin",
          "sibling",
          "index",
          "object",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "react-redux",
            group: "external",
            position: "before",
          },
          {
            pattern: "react-router-dom",
            group: "external",
            position: "before",
          },
          {
            pattern: "pages/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "components",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: [
          "builtin", // "internal",
          "react",
          "react-redux",
          "react-router-dom",
        ],
        "newlines-between": "never",
      },
    ],
  },
};
