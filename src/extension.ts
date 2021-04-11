// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { GitEaseDocumentProvider } from "./git-ease-document-provider";
import { SidePanelProvider } from "./side-panel-provider";
import { refreshPanel } from "./vsc-commands/refresh-panel";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const sidePanelProvider = new SidePanelProvider(context.extensionUri);
  const gitEaseDocProvider = new GitEaseDocumentProvider();
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "git-ease.scm-panel",
      sidePanelProvider
    ),
    vscode.workspace.registerTextDocumentContentProvider(
      GitEaseDocumentProvider.scheme,
      gitEaseDocProvider
    )
  );
  context.subscriptions.push(refreshPanel(sidePanelProvider));
}

// this method is called when your extension is deactivated
export function deactivate() {}
