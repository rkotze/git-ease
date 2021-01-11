import { GitExt } from "./git-ext";
import { Repository } from "./git-scm";
import { vsCodeGit } from "./vs-code-git";

jest.mock("./vs-code-git");

test("returns selected repository file path", () => {
  vsCodeGitRepo([
    {
      ui: {
        selected: true,
      },
      rootUri: {
        fsPath: "project/fspath",
      },
    },
  ]);
  const gitExt = new GitExt();
  expect(gitExt.rootPath).toEqual("project/fspath");
});

test("returns a file path when there are repositories but none are selected", () => {
  vsCodeGitRepo([
    {
      ui: {
        selected: false,
      },
      rootUri: {
        fsPath: "first/project/fspath",
      },
    },
    {
      ui: {
        selected: false,
      },
      rootUri: {
        fsPath: "should/not/find/me",
      },
    },
  ]);
  const gitExt = new GitExt();
  expect(gitExt.rootPath).toEqual("first/project/fspath");
});

test("returns null when no repositories", () => {
  vsCodeGitRepo([]);
  const gitExt = new GitExt();
  expect(gitExt.rootPath).toEqual(null);
});

function vsCodeGitRepo(repositories: any) {
  (vsCodeGit as jest.Mock).mockImplementation(() => {
    return {
      repositories,
    };
  });
}
