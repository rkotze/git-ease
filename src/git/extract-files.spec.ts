import { extractFiles } from "./extract-files";

describe("Extracting file data", () => {
  test("modified file type", () => {
    expect(extractFiles("M src/index.js")).toEqual({
      path: "src/index.js",
      change: "M",
      dir: "src",
      filename: "index.js",
    });
  });

  test("renamed file type", () => {
    expect(
      extractFiles("R076 src/add-coauthor.js  src/add-new-coauthor.js")
    ).toEqual({
      path: "src/add-new-coauthor.js",
      change: "R",
      dir: "src",
      filename: "add-new-coauthor.js",
    });

    expect(extractFiles("R068 src/rand.js  src/chaos.js")).toEqual({
      path: "src/chaos.js",
      change: "R",
      dir: "src",
      filename: "chaos.js",
    });
  });
});
