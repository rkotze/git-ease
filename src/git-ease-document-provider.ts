import { TextDocumentContentProvider, Uri } from "vscode";
import { commitFileText } from "./git/git-commands";
import { parse } from "querystring";
import { TrackedChangeSymbols } from "./git/tracked-change-symbols";

export class GitEaseDocumentProvider implements TextDocumentContentProvider {
  static scheme = "gitEaseDoc";

  dispose() {}
  provideTextDocumentContent(uri: Uri): Thenable<string> {
    
    const queryObject = parse(uri.query);
    if(queryObject.change === TrackedChangeSymbols.ADDED && queryObject.parent === 'true'){
      return Promise.resolve("");
    }
    if(queryObject.change === TrackedChangeSymbols.DELETED && queryObject.parent === 'false'){
      return Promise.resolve("");
    }
    return commitFileText(queryObject.sha as string, uri.path);
    
  }
}
