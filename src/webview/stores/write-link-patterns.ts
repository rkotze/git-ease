import { writable } from "svelte/store";

function createLinkPatternStore() {
  const { subscribe, set } = writable([]);

  return {
    subscribe,
    write(patterns: []) {
      set(
        patterns.map(({ pattern, urlFormat, textFormat }) => ({
          pattern: new RegExp(pattern, "i"),
          urlFormat,
          textFormat,
        }))
      );
    },
  };
}
export const writeLinkPatterns = createLinkPatternStore();
