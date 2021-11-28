import { extractFiles } from "./extract-files";

describe("Extracting file data", () => {
  test("modified file type", () => {
    expect(extractFiles("M src/index.js")).toEqual({
      change: "M",
      file: {
        path: "src/index.js",
        dir: "src",
        filename: "index.js",
      },
    });
  });

  test("renamed file type", () => {
    expect(
      extractFiles("R076 src/add-coauthor.js  src/add-new-coauthor.js")
    ).toEqual({
      change: "R",
      file: {
        path: "src/add-new-coauthor.js",
        dir: "src",
        filename: "add-new-coauthor.js",
      },
      originFile: {
        path: "src/add-coauthor.js",
        dir: "src",
        filename: "add-coauthor.js",
      },
    });

    expect(extractFiles("R068 src/rand.js  src/chaos.js")).toEqual({
      change: "R",
      file: {
        path: "src/chaos.js",
        dir: "src",
        filename: "chaos.js",
      },
      originFile: {
        path: "src/rand.js",
        dir: "src",
        filename: "rand.js",
      },
    });
  });
});
