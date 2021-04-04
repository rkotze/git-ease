export function linkPattern(patterns: Array<MetaPattern>, text: string) {
  return patterns.reduce((newText, { pattern, urlFormat, textFormat }) => {
    return newText.replace(pattern, (_match, ...args) => {
      return `<a href="${format(urlFormat, args)}">${format(
        textFormat,
        args
      )}</a>`;
    });
  }, text);
}

function format(text: string, values: Array<string>) {
  return text.replace(/{(\d+)}/g, function (match, number) {
    return typeof values[number] !== "undefined" ? values[number] : match;
  });
}

type MetaPattern = {
  pattern: RegExp;
  urlFormat: string;
  textFormat: string;
};
