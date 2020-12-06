import { gitMojies } from "../emojis/gitmojis";

export function parseMojis(text): string {
  return text.replace(/(:[a-z]+:)/gim, (_str, g1) => {
    const emoji = gitMojies.find(({ code }) => code === g1);
    if (emoji) {
      return emoji.emoji;
    }
    return g1;
  });
}
