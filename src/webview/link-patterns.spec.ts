import { linkPattern } from "./link-patterns";

describe("Link patterns in message", () => {
  it("issue link for GitHub", () => {
    expect(
      linkPattern(
        [
          {
            pattern: new RegExp("(#)([0-9]+)", "i"),
            urlFormat: "github.com/x/y/issue/{1}",
            textFormat: "{0}{1}",
          },
        ],
        "Git message #2"
      )
    ).toEqual('Git message <a href="github.com/x/y/issue/2">#2</a>');
  });
});
