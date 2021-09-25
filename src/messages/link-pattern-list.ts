import * as vscode from "vscode";
import { CommandNames } from "../command-names";
import { linkPatterns } from "../config/link-patterns";

export function linkPatternList(webviewObject: vscode.WebviewView): void {
  const patterns = linkPatterns();
  if (patterns.length) {
    webviewObject.webview.postMessage({
      command: CommandNames.CONFIG_LINK_PATTERNS,
      data: patterns,
    });
  }
}
