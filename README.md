# React + TypeScript + Vite Starter Template

This template sets up a minimal development environment for working with **React** and **TypeScript** in **Vite**, with support for **HMR (Hot Module Replacement)** and configured **ESLint** rules.

## Key Features
- Fast, efficient development with **Vite** and **HMR**.
- Two official Vite plugins to choose from:
  - **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)**: Uses **Babel** for fast refresh.
  - **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)**: Uses **SWC** for fast refresh.
- TypeScript support for type safety and better development experience.

## Expanding the ESLint Configuration

To enable type-aware linting rules suitable for a production-grade application, we recommend expanding your **ESLint** configuration as follows:

1. **Update the top-level `parserOptions` property**:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

2. **Enhance the recommended configuration**:
   - Replace `tseslint.configs.recommended` with either:
     - `tseslint.configs.recommendedTypeChecked`
     - `tseslint.configs.strictTypeChecked`
   - Optionally include `...tseslint.configs.stylisticTypeChecked` for additional stylistic rules.

3. **Install and configure `eslint-plugin-react`**:

   Install the plugin:
   ```bash
   npm install eslint-plugin-react --save-dev
   ```

   Update your ESLint configuration:
   ```js
   // eslint.config.js
   import react from 'eslint-plugin-react';

   export default tseslint.config({
     // Set the React version
     settings: { react: { version: '18.3' } },
     plugins: {
       // Add the React plugin
       react,
     },
     rules: {
       // other rules...
       // Enable recommended rules from the plugin
       ...react.configs.recommended.rules,
       ...react.configs['jsx-runtime'].rules,
     },
   });
   ```

## How to Use This Template

1. **Clone this repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## For Contributors and Users

If you wish to contribute or use this template for your projects:
- Feel free to **fork the repository** and customize it according to your needs.
- If you encounter issues or have ideas for improvements, submit an **issue** or a **pull request**.
- Always ensure your ESLint configuration aligns with your project's needs for consistent and reliable code quality.

---

Enjoy developing with this streamlined setup that combines the power of **React**, **TypeScript**, and **Vite** for a fast and modern web development experience!

