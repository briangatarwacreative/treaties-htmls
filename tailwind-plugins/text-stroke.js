const plugin = require("tailwindcss/plugin");

const generateColors = (e, colors, prefix) =>
  Object.keys(colors).reduce((acc, key) => {
    if (typeof colors[key] === "string") {
      return {
        ...acc,
        [`${prefix}-${e(key)}`]: {
          "-webkit-text-stroke-color": colors[key],
        },
      };
    }

    const innerColors = generateColors(e, colors[key], `${prefix}-${e(key)}`);

    return {
      ...acc,
      ...innerColors,
    };
  }, {});

module.exports = plugin.withOptions(({ className = "text-stroke" } = {}) => {
  return ({ e, addUtilities, theme, variants }) => {
    const colors = theme("colors");
    const textStrokeColors = generateColors(e, colors, `.${className}`);
    addUtilities(textStrokeColors, variants("textStrokeColors"));
  };
});
