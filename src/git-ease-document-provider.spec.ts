import { Uri } from "vscode";
import { mocked } from "ts-jest/utils";
import { GitEaseDocumentProvider } from "./git-ease-document-provider";
import { commitFileText } from "./git/git-commands";
import { TrackedChangeSymbols } from "./git/tracked-change-symbols";

jest.mock("./git/git-commands");

describe("Get file text from Git commit", () => {
  const mockedCommitFileText = mocked(commitFileText);
  mockedCommitFileText.mockResolvedValue("doc test");
  const mockedUriParse = mocked(Uri.parse);

  function buildTestUri(change: string, parent: boolean): Uri {
    mockedUriParse.mockReturnValue({
      query: `sha=ske329k2k&change=${change}&parent=${parent}`,
      path: "/some/file.js",
      fragment: "",
      fsPath: "",
      scheme: "gitEaseDoc",
      authority: "",
      with: jest.fn(),
      toJSON: () => {}
    });
    return Uri.parse(`gitEaseDoc:/some/file.js?sha=ske329k2k&change=${change}&parent=${parent}`);
  };

  it("get modified file", () => {
    const docProvider = new GitEaseDocumentProvider();
    const modifiedFile = buildTestUri(TrackedChangeSymbols.MODIFIED, false);
    
    return expect(docProvider.provideTextDocumentContent(modifiedFile)).resolves.toEqual("doc test");
  });

  it("get new file if current commit", () => {
    const docProvider = new GitEaseDocumentProvider();
    const modifiedFile = buildTestUri(TrackedChangeSymbols.ADDED, false);
    
    return expect(docProvider.provideTextDocumentContent(modifiedFile)).resolves.toEqual("doc test");
  });

  it("don't get new file if parent commit because it won't exist", () => {
    const docProvider = new GitEaseDocumentProvider();
    const modifiedFile = buildTestUri(TrackedChangeSymbols.ADDED, true);
    
    return expect(docProvider.provideTextDocumentContent(modifiedFile)).resolves.toEqual("");
  });

  it("get deleted file if parent commit", () => {
    const docProvider = new GitEaseDocumentProvider();
    const deletedFile = buildTestUri(TrackedChangeSymbols.DELETED, true);
    
    return expect(docProvider.provideTextDocumentContent(deletedFile)).resolves.toEqual("doc test");
  });

  it("don't get deleted file current commit because it won't exist", () => {
    const docProvider = new GitEaseDocumentProvider();
    const deletedFile = buildTestUri(TrackedChangeSymbols.DELETED, false);
    
    return expect(docProvider.provideTextDocumentContent(deletedFile)).resolves.toEqual("");
  });
});