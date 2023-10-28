module.exports = {
  root: true,
  extends: ["@nuxt/eslint-config", "plugin:prettier/recommended"],
  rules: {
    "max-len": [1, { code: 80 }],
  },
};
