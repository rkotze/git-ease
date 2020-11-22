// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { SidePanelProvider } from "./side-panel-provider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "git-ease.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World from Git Ease!");
    }
  );
  context.subscriptions.push(disposable);

  const provider = new SidePanelProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("gitEasePanel", provider)
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
