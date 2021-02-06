export function linkPattern(patterns, text) {
  return patterns.reduce((newText, { pattern, urlFormat, textFormat }) => {
    return (
      newText +
      text.replace(pattern, (_match, ...args) => {
        return `<a href="${format(urlFormat, args)}">${format(
          textFormat,
          args
        )}</a>`;
      })
    );
  }, "");
}

function format(text, values) {
  return text.replace(/{(\d+)}/g, function (match, number) {
    return typeof values[number] !== "undefined" ? values[number] : match;
  });
}
