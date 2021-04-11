import { commands, Uri, window, workspace } from "vscode";
import { GitEaseDocumentProvider } from "../git-ease-document-provider";
import { GitExt } from "../vscode-git-extension/git-ext";

export async function openFile(filePath: string, ref: string): Promise<void> {
  const gitExt = new GitExt();
  if (gitExt.rootPath) {
    let commit = await gitExt.selectedRepository?.getCommit(ref);
    let diffUriA = Uri.parse(
      `${GitEaseDocumentProvider.scheme}:${filePath}?sha=${ref}`
    );
    let diffUriB = Uri.parse(
      `${GitEaseDocumentProvider.scheme}:${filePath}?sha=${commit?.parents[0]}`
    );
    commands.executeCommand("vscode.diff", diffUriB, diffUriA);
  }
}
