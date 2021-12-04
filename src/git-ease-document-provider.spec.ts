import { Uri } from "vscode";
import { mocked } from "ts-jest/utils";
import { GitEaseDocumentProvider } from "./git-ease-document-provider";
import { commitFileText } from "./git/git-commands";

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
    const modifiedFile = buildTestUri("M", false);
    
    expect(docProvider.provideTextDocumentContent(modifiedFile)).resolves.toEqual("doc test");
  });

  it("get new file if not parent", () => {
    const docProvider = new GitEaseDocumentProvider();
    const modifiedFile = buildTestUri("A", false);
    
    expect(docProvider.provideTextDocumentContent(modifiedFile)).resolves.toEqual("doc test");
  });

  it("Don't get new file if parent because it won't exist", () => {
    const docProvider = new GitEaseDocumentProvider();
    const modifiedFile = buildTestUri("A", true);
    
    expect(docProvider.provideTextDocumentContent(modifiedFile)).resolves.toEqual("");
  });
});