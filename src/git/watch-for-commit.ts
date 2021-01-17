import * as fs from "fs";
import * as path from "path";
import { window } from "vscode";
import { GitExt } from "../vscode-git-extension/git-ext";

export function watchForCommit(cb: Function): fs.FSWatcher | undefined {
  const gitExt = new GitExt();
  const gitCommit = path.join(gitExt.rootPath || "", ".git");

  try {
    return fs.watch(gitCommit, function (evt, filename) {
      if (filename) {
        if (debounceFsWatch()) {
          return;
        }
        cb(evt);
      }
    });
  } catch (err) {
    window.showErrorMessage("Watch for commit failed!: " + err.message);
  }
}

let fsWait: boolean | NodeJS.Timeout = false;
function debounceFsWatch() {
  if (fsWait) {
    return true;
  }
  fsWait = setTimeout(() => {
    fsWait = false;
  }, 1000); // windows is a bit slower
}
