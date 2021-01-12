import { GitExt } from "../vscode-git-extension/git-ext";

export async function copyCommitToInput(message: string): Promise<void> {
  const gitExt = new GitExt();
  gitExt.updateSelectedInput(function(input){
    return message + input;
  });
}
