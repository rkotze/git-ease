import { TextDocumentContentProvider, Uri } from "vscode";
import { commitFileText } from "./git/git-commands";
import { parse } from "querystring";

export class GitEaseDocumentProvider implements TextDocumentContentProvider {
  static scheme = "gitEaseDoc";

  dispose() {}
  provideTextDocumentContent(uri: Uri): Thenable<string> {
    
    const q = parse(uri.query);
    if(q.change === 'A' && q.parent === 'true'){
      return Promise.resolve("");
    }
    return commitFileText(q.sha as string, uri.path);
    
  }
}
