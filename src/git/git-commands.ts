// https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History
// git log --abbrev-commit --name-status

import { exec, ExecOptionsWithStringEncoding } from "child_process";
import { promisify } from "util";
import { GitExt } from "../vscode-git-extension/git-ext";

async function silentExec(command: string) {
  const execAsync = promisify(exec);
  try {
    const response = await execAsync(command, cmdOptions());

    return response.stdout;
  } catch (err) {
    console.log(`GitEase silentExec: "${command}" ${err.message}`);
    return "";
  }
}

function cmdOptions(): ExecOptionsWithStringEncoding {
  const gitExt = new GitExt();
  return {
    encoding: "utf8",
    cwd: gitExt.rootPath || "",
  };
}

export async function history(): Promise<string> {
  return silentExec("git log --decorate=short --name-status -n 100");
}

// note: option for later
// git log -n 3 --pretty=format:%n%h%n%d%naname-%an%naemail-%ae%ndate-%ad%n%B:commitEase:

export async function remote(): Promise<string> {
  return silentExec("git remote -v");
}
