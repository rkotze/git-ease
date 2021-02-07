import * as vscode from "vscode";
import { CommandNames } from "./command-names";
import { getNonce } from "./get-nonce";
import { copyCommitToInput } from "./messages/copy-commit-to-input";
import { gitLog } from "./messages/git-log";
import { gitRemotesList } from "./messages/git-remotes-list";
import { linkPatternList } from "./messages/link-pattern-list";
import { GitExt } from "./vscode-git-extension/git-ext";

export class SidePanelProvider implements vscode.WebviewViewProvider {
  view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this.view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.command) {
        case CommandNames.COMMIT_LIST:
          return gitLog(webviewView);
        case CommandNames.COPY_COMMIT_TO_INPUT:
          return copyCommitToInput(data.args[0]);
        case CommandNames.PANEL_READY:
          const gitExt = new GitExt();
          gitExt.onRepoChange(function () {
            gitLog(webviewView);
          });
          gitRemotesList(webviewView);
          linkPatternList(webviewView);
          return gitLog(webviewView);
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const webviewUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "dist", "webview.js")
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "dist", "webview.css")
    );

    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https: data:; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleMainUri}" rel="stylesheet">
			</head>
      <body>
        <div id="git-ease-app">
        </div>
        <script nonce="${nonce}" src="${webviewUri}">
        </script>
			</body>
			</html>`;
  }
}
