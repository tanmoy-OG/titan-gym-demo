import tseslint from "typescript-eslint";

export default tseslint.config(
  tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": {
        rules: {
          "no-img-element": {
            create() {
              return {};
            },
          },
        },
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
    ],
  }
);
