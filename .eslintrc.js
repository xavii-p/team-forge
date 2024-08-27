module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // Add your custom rules here
    "no-unused-vars": "warn",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
