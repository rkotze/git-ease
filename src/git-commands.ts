// https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History
// git log --abbrev-commit --name-status

import { exec } from "child_process";
import { promisify } from "util";
import {workspace} from "vscode";

async function silentExec(command: string) {
  const execAsync = promisify(exec);
  try {
    const response = await execAsync(command, cmdOptions());

    return response.stdout;
  } catch (err) {
    console.log(`GitMob silentExec: "${command}" ${err.message}`);
    return "";
  }
}

function cmdOptions() {
  const path = workspace.workspaceFolders || [{ name: "" }];
  return {
    cwd: path[0].name,
  };
}

export async function history() {
  return silentExec("git log --abbrev-commit");
}