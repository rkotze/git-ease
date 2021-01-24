import * as vscode from "vscode";
import { remote } from "../git/git-commands";
import { gitRemotes } from "../git/git-remotes";

export async function gitRemotesList(
  webviewObject: vscode.WebviewView
): Promise<void> {
  const remotes = gitRemotes(await remote());
  webviewObject.webview.postMessage({
    command: "gitRemotes",
    data: remotes,
  });
}
