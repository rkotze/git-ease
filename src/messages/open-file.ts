import { join } from "path";
import { Uri, window, workspace } from "vscode";
import { GitExt } from "../vscode-git-extension/git-ext";

export async function openFile(filePath: string): Promise<void> {
  const gitExt = new GitExt();
  if (gitExt.rootPath) {
    let uri = Uri.file(join(gitExt.rootPath, filePath));
    window.showTextDocument(await workspace.openTextDocument(uri));
  }
}
