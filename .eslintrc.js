module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  rules: {
    'no-var': 'error',
    'no-console': 'off',
    'linebreak-style': ["error", "windows"], // 声明这是windows操作系统即可。
  }
}