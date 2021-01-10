import * as vscode from "vscode";

export async function copyCommitToInput(message: string): Promise<void> {
  vscode.window.showInformationMessage(message);
}
