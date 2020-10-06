module.exports = api => {
  api.cache(false)
  return {
    plugins: [
      "@babel/plugin-proposal-function-bind",
      "@babel/plugin-proposal-class-properties",
    ],
    "presets": [
      [
        "@babel/preset-env", {
          "targets": "cover 99.5%",
        },
      ],
    ],
  };
};
