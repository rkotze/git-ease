import { commands, Uri } from "vscode";
import { TrackedChangeSymbols } from "../git/tracked-change-symbols";
import { openFileDiff } from "./open-file-diff";

jest.mock("../vscode-git-extension/git-ext", () => {
  return {
    GitExt: jest.fn().mockImplementation(() => {
      return {
        rootPath: "project/path",
        selectedRepository: {
          getCommit(){
            return {
              parents: ["shaparent"]
            };
          }
        }
      };
    })
  }; 
});
describe("execute command to open diff", () => {
  const mockedUriParse = jest.mocked(Uri.parse);
  mockedUriParse.mockReturnValue({
    query: `sha=ske329k2k&change=m&parent=true`,
    path: "/some/file.js",
    fragment: "",
    fsPath: "",
    scheme: "gitEaseDoc",
    authority: "",
    with: jest.fn(),
    toJSON: () => {}
  });

  it("open diff for modified file", async () => {
    const modifiedFile = "current/file.js";
    await openFileDiff(modifiedFile, "shacurrent", TrackedChangeSymbols.MODIFIED);
    expect(Uri.parse).toHaveBeenNthCalledWith(1, expect.stringContaining(modifiedFile));
    expect(Uri.parse).toHaveBeenNthCalledWith(2, expect.stringContaining(modifiedFile));
    expect(commands.executeCommand).toHaveBeenCalledWith("vscode.diff", expect.anything(), expect.anything(), "file.js (shacurr ⇹ shapare)");
  });

  it("open diff for renamed file must reference the origin file from parent commit", async () => {
    const renameFile = "current/renameFile.js";
    const originFile = "origin/oldFile.js";
    await openFileDiff(renameFile, "shacurrent", TrackedChangeSymbols.RENAME, originFile);
    expect(Uri.parse).toHaveBeenNthCalledWith(1, expect.stringContaining(renameFile));
    expect(Uri.parse).toHaveBeenNthCalledWith(2, expect.stringContaining(originFile));
    expect(commands.executeCommand).toHaveBeenCalledWith("vscode.diff", expect.anything(), expect.anything(), "renameFile.js - oldFile.js (shacurr ⇹ shapare)");
  });

});