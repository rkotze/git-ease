import { buildRemoteInfo } from "./git-remotes";

describe("git remotes", () => {
  it("build remote info from ssh", () => {
    const remotes = `origin  git@github.com:rkotze/git-ease.git (fetch)
    origin  git@github.com:rkotze/git-ease.git (push)`;

    expect(buildRemoteInfo(remotes)[0]).toEqual({
      name: "origin",
      ssh: "git@github.com:rkotze/git-ease.git",
      https: "https://github.com/rkotze/git-ease.git",
      url: "https://github.com/rkotze/git-ease",
    });
  });
});
