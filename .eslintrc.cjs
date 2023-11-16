module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config", "plugin:prettier/recommended"],
  rules: {
    "max-len": [1, { code: 200 }],
  },
};

// I think the vue eslint is out of date or something, because I had
// to disable a rule in index.vue
// do we want this? https://www.npmjs.com/package/eslint-plugin-tailwindcss
