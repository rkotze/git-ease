import { commitList } from "./commit-list";

describe("Commit list", () => {
  let list: Commit[] = [];

  beforeAll(async () => {
    list = await commitList(commitLog);
  });

  test("should have three commits", () => {
    expect(list).toHaveLength(3);
  });

  test("build commit object", () => {
    expect(list[0]).toMatchObject({
      hash: "a19fe9a (HEAD -> trunk, origin/trunk)",
      title: "Build light and dark vs code styles webpack",
      date: new Date("Sat Nov 21 21:38:19 2020 +0000"),
      author: "Random Bob <random.bob@example.com>",
    });
  });
});

const commitLog = `commit a19fe9a (HEAD -> trunk, origin/trunk)
Author: Random Bob <random.bob@example.com>
Date:   Sat Nov 21 21:38:19 2020 +0000

    Build light and dark vs code styles webpack

    - css-loader can parse imported css in js
    - mini css bundles it into one file

commit 40dc872
Author: Random Sally <random.joe@example.com>
Date:   Sat Nov 21 17:23:20 2020 +0000

    Setup webpack config for node and web modules

commit 80djw72
Merge: 3efd6a5 c20cf5b
Author: Random Joe <random.joe@example.com>
Date:   Sun Jul 21 20:27:06 2019 +0100

    Add a suggest-coauthors command

    Often the people you will be pairing with have already authored commits
    on the repo you are working on. This command makes it as easy as
    possible to add an existing author from the current repo to your list of
    coauthors.
`;
