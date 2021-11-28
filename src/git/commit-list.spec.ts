import { commitList } from "./commit-list";

describe("Build commit list", () => {
  let list: Commit[] = [];

  beforeAll(async () => {
    list = await commitList(commitLog);
  });

  test("should have three commits", () => {
    expect(list).toHaveLength(4);
  });

  test("commit object with branch name", () => {
    expect(list[0]).toMatchObject({
      hash: "ad67ecf86dba7580820ec325d527efaffd8245fa",
      branch: ["HEAD -> trunk", "origin/trunk"],
      title: "Build light and dark commit vs code styles webpack",
      date: new Date("Sat Nov 21 21:38:19 2020 +0000"),
    });
    expect(list[1]).toMatchObject({
      branch: ["HEAD -> trunk"],
    });
  });

  test("commit to have author", () => {
    expect(list[0].author).toEqual({
      name: "Random Bob",
      email: "random.bob@example.com",
      initials: "RB",
    });
  });

  test("commit body", () => {
    expect(list[0].body.trim().split("\n")).toEqual([
      "- css-loader can parse imported css in js",
      "- mini css bundles it into one file",
    ]);
  });

  test("commit files with no directory", () => {
    expect(list[0].files).toEqual([
      {
        change: "M",
        file: {
          path: "package-lock.json",
          filename: "package-lock.json",
          dir: "",
        },
      },
      {
        change: "M",
        file: {
          path: "package.json",
          filename: "package.json",
          dir: "",
        },
      },
    ]);
  });

  test("commit files which have a directory", () => {
    expect(list[1].files).toEqual([
      {
        change: "M",
        file: {
          path: "src/index.js",
          dir: "src",
          filename: "index.js",
        },
      },
      {
        change: "A",
        file: {
          path: "src/random/file.ts",
          dir: "src/random",
          filename: "file.ts",
        },
      },
    ]);
  });

  test("commit files handle file rename code R085", () => {
    expect(list[2].files).toEqual([
      {
        change: "M",
        file: {
          path: "src/index.js",
          dir: "src",
          filename: "index.js",
        },
      },
      {
        change: "A",
        file: {
          path: "src/random/file.ts",
          dir: "src/random",
          filename: "file.ts",
        },
      },
      {
        change: "D",
        file: {
          path: "src/bla/something.css",
          dir: "src/bla",
          filename: "something.css",
        },
      },
      {
        change: "R",
        file: {
          path: "src/add-new-coauthor.js",
          dir: "src",
          filename: "add-new-coauthor.js",
        },
      },
    ]);
  });

  test("commits without a branch or tag should have empty array", () => {
    expect(list[2]).toMatchObject({
      branch: [],
    });
  });

  test("merge commit has property", () => {
    expect(list[2]).toMatchObject({
      merge: "3efd6a5 c20cf5b",
      title: "Add a suggest-coauthors command",
    });
  });

  test("split does not break on revert commit", () => {
    expect(list[3]).toMatchObject({
      title: 'Revert "Replace topLevelDir with cwd as they return same result"',
      body: expect.stringContaining(
        "This reverts commit 7fa152aab16ef38ac00ec705ae1b71774b23266b."
      ),
    });
  });

  test("list co-authors", () => {
    expect(list[0]).toMatchObject({
      hash: "ad67ecf86dba7580820ec325d527efaffd8245fa",
      coAuthors: [
        {
          name: "John Doe",
          email: "john.doe@unknown.com",
        },
        {
          name: "Jane Doe",
          email: "jane.doe@somewhere.co.uk",
        },
      ],
    });
  });
});

const commitLog = `commit ad67ecf86dba7580820ec325d527efaffd8245fa (HEAD -> trunk, origin/trunk)
Author: Random Bob <random.bob@example.com>
Date:   Sat Nov 21 21:38:19 2020 +0000

    Build light and dark commit vs code styles webpack

    - css-loader can parse imported css in js
    - mini css bundles it into one file

    Co-authored-by: John Doe <john.doe@unknown.com>
    Co-authored-by: Jane Doe <jane.doe@somewhere.co.uk>

    M package-lock.json
    M package.json

commit d73e69a759580ac04f4204b7dcf11604c7953a99 (HEAD -> trunk)
Author: Random Sally <random.sally@example.com>
Date:   Sat Nov 21 17:23:20 2020 +0000

    Setup webpack config for node and web modules

    M src/index.js
    A src/random/file.ts

commit 74d7854aab87da26a5687967fefc8428527481f3
Merge: 3efd6a5 c20cf5b
Author: Random Joe <random.joe@example.com>
Date:   Sun Jul 21 20:27:06 2019 +0100

    Add a suggest-coauthors command

    Often the people you will be pairing with have already authored commits
    on the repo you are working on. This command makes it as easy as
    possible to add an existing author from the current repo to your list of
    coauthors.

    M src/index.js
    A src/random/file.ts
    D src/bla/something.css
    R085 src/add-coauthor.js  src/add-new-coauthor.js

commit 77c77ee083b60ff88e8c2bf97acb4d4df575d9ff (cjlarose/compute-template-path-using-top-level-dir, compute-template-path-using-top-level-dir)
Author: Chris LaRose <cjlarose@gmail.com>
Date:   Thu Jan 17 10:26:14 2019 -0800

    Revert "Replace topLevelDir with cwd as they return same result"

    This reverts commit 7fa152aab16ef38ac00ec705ae1b71774b23266b.
`;
