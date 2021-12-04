import { mocked } from "ts-jest/utils";
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
  const mockedUriParse = mocked(Uri.parse);
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
    const renameFile = "current/file.js";
    await openFileDiff(renameFile, "shacurrent", TrackedChangeSymbols.RENAME);
    expect(Uri.parse).toHaveBeenNthCalledWith(1, expect.stringContaining(renameFile));
    expect(Uri.parse).toHaveBeenNthCalledWith(2, expect.stringContaining(renameFile));
    expect(commands.executeCommand).toHaveBeenCalledWith("vscode.diff", expect.anything(), expect.anything(), "file.js (shacurr ⇹ shapare)");
  });

});