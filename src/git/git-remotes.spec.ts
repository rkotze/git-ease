import { gitRemotes } from "./git-remotes";

describe("git remotes", () => {
  it("build remote info from ssh", () => {
    const remotes = [
      "origin git@github.com:rkotze/git-ease.git  (fetch)",
      "origin git@github.com:rkotze/git-ease.git  (push)",
    ].join("\n");
    const remoteInfo = gitRemotes(remotes);

    expect(remoteInfo).toHaveLength(1);
    expect(remoteInfo[0]).toEqual({
      name: "origin",
      ssh: "git@github.com:rkotze/git-ease.git",
      https: "https://github.com/rkotze/git-ease.git",
      url: "https://github.com/rkotze/git-ease",
    });
  });

  it("build remote info from https", () => {
    const remotes = [
      "origin https://github.com/rkotze/git-ease.git  (fetch)",
      "origin https://github.com/rkotze/git-ease.git  (push)",
    ].join("\n");

    expect(gitRemotes(remotes)[0]).toEqual({
      name: "origin",
      ssh: "git@github.com:rkotze/git-ease.git",
      https: "https://github.com/rkotze/git-ease.git",
      url: "https://github.com/rkotze/git-ease",
    });
  });
});
