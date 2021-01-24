import * as vscode from "vscode";
import { gitLog } from "../messages/git-log";
import { SidePanelProvider } from "../side-panel-provider";

export function refreshPanel(sidePanel: SidePanelProvider): vscode.Disposable {
  return vscode.commands.registerCommand("git-ease.refresh-panel", function () {
    if (sidePanel.view) {
      gitLog(sidePanel.view);
    }
  });
}
