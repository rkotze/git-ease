import { TextDocumentContentProvider, Uri } from "vscode";
import { commitFileText } from "./git/git-commands";

export class GitEaseDocumentProvider implements TextDocumentContentProvider {
  static scheme = "gitEaseDoc";

  dispose() {}
  provideTextDocumentContent(uri: Uri): Thenable<string> {
    const sha = uri.query.split("=")[1];
    return commitFileText(sha, uri.path);
  }
}
