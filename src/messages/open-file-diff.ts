import { commands, Uri } from "vscode";
import { GitEaseDocumentProvider } from "../git-ease-document-provider";
import { GitExt } from "../vscode-git-extension/git-ext";

export async function openFileDiff(
  filePath: string,
  ref: string,
  change: TrackedChangeSymbol
): Promise<void> {
  const gitExt = new GitExt();
  if (gitExt.rootPath) {
    let commit = await gitExt.selectedRepository?.getCommit(ref);
    let diffUriA = Uri.parse(
      `${GitEaseDocumentProvider.scheme}:${filePath}?sha=${ref}&change=${change}&parent=false`
    );
    let diffUriB = Uri.parse(
      `${GitEaseDocumentProvider.scheme}:${filePath}?sha=${commit?.parents[0]}&change=${change}&parent=true`
    );

    const fileName = filePath.split("/").pop();
    commands.executeCommand(
      "vscode.diff",
      diffUriB,
      diffUriA,
      `${fileName} (${ref.slice(0, 7)} ⇹ ${commit?.parents[0].slice(0, 7)})`
    );
  }
}
