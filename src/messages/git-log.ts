import * as vscode from "vscode";
import { CommandNames } from "../command-names";
import { commitList } from "../git/commit-list";
import { history } from "../git/git-commands";

export async function gitLog(
  webviewObject: vscode.WebviewView,
  messageSearch?: string
): Promise<void> {
  const commits = await commitList(await history(messageSearch));
  webviewObject.webview.postMessage({
    command: CommandNames.COMMIT_LIST,
    data: commits,
  });
}
