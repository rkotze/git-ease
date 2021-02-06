import { linkPattern } from "./link-patterns";

describe("Link patterns in message", () => {
  it("issue link for GitHub", () => {
    expect(
      linkPattern(
        [
          {
            pattern: new RegExp("(#)([0-9]+)"),
            urlFormat: "github.com/x/y/issue/{1}",
            textFormat: "{0}{1}",
          },
        ],
        "Git message #2"
      )
    ).toEqual('Git message <a href="github.com/x/y/issue/2">#2</a>');
  });

  it("issue link for jira", () => {
    expect(
      linkPattern(
        [
          {
            pattern: new RegExp("(GE-[0-9]+)"),
            urlFormat: "jira.com/browse/{0}",
            textFormat: "{0}",
          },
        ],
        "GE-22 Link to Jira"
      )
    ).toEqual('<a href="jira.com/browse/GE-22">GE-22</a> Link to Jira');
  });
});
