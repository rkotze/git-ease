import { commands, Uri } from "vscode";
import { GitEaseDocumentProvider } from "../git-ease-document-provider";
import { TrackedChangeSymbols } from "../git/tracked-change-symbols";
import { GitExt } from "../vscode-git-extension/git-ext";

export async function openFileDiff(
  filePath: string,
  ref: string,
  change: TrackedChangeSymbol,
  originFilePath?: string
): Promise<void> {
  const gitExt = new GitExt();
  if (gitExt.rootPath) {
    let commit = await gitExt.selectedRepository?.getCommit(ref);
    let pathToFile = filePath;
    let originFilename = null;

    let selectedCommitUri = buildCommitUri(pathToFile, ref, change, false);
    
    if(TrackedChangeSymbols.RENAME === change && originFilePath){
      pathToFile = originFilePath;
      originFilename = originFilePath.split("/").pop();
    }
    let parentCommitUri = buildCommitUri(pathToFile, commit?.parents[0], change, true);

    const fileName = filePath.split("/").pop();
    commands.executeCommand(
      "vscode.diff",
      parentCommitUri,
      selectedCommitUri,
      `${fileName}${originFilePath ? ` - ${originFilename}` : ""} (${ref.slice(0, 7)} ⇹ ${commit?.parents[0].slice(0, 7)})`
    );
  }
}


function buildCommitUri(pathToFile: string, commitSha: string | undefined, change: string, parent: boolean) {
  return Uri.parse(
    `${GitEaseDocumentProvider.scheme}:${pathToFile}?sha=${commitSha}&change=${change}&parent=${parent}`
  );
}

