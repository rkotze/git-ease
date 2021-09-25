import * as vscode from "vscode";
import { gitLog } from "../messages/git-log";
import { gitRemotesList } from "../messages/git-remotes-list";
import { linkPatternList } from "../messages/link-pattern-list";
import { SidePanelProvider } from "../side-panel-provider";

export function refreshPanel(sidePanel: SidePanelProvider): vscode.Disposable {
  return vscode.commands.registerCommand("git-ease.refresh-panel", function () {
    if (sidePanel.view) {
      gitRemotesList(sidePanel.view);
      linkPatternList(sidePanel.view);
      gitLog(sidePanel.view);
    }
  });
}
