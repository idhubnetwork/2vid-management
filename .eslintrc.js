module.exports = {
  extends: [ 'plugin:vue/essential', 'airbnb-base' ],
  rules: {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "no-console": "off",
    "import/no-cycle": ["warn", { maxDepth: 1 }],
    "no-shadow": ["error", { "allow": ["state"] }],
    "no-param-reassign": [
      "error",
      {
        "props": true,
        "ignorePropertyModificationsFor": [
          "state",
          "acc",
          "e",
          "ctx",
          "req",
          "request",
          "res",
          "response",
          "$scope"
        ]
      },
    ],
    "max-len": ["warn", { "code": 80 }],
    // import rules

  }
};
