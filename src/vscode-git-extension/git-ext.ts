import * as path from "path";
import { Repository } from "./git-scm";
import { vsCodeGit } from "./vs-code-git";

export class GitExt {
  gitApi = vsCodeGit();

  get hasRepositories() {
    return this.repositories.length > 0;
  }

  get repositories() {
    return this.gitApi ? this.gitApi.repositories : [];
  }

  get rootPath() {
    if (!this.hasRepositories) {return null;}

    const selected = this.selectedRepository;
    if (!selected) {return this.repositories[0].rootUri.fsPath;}

    return selected.rootUri.fsPath;
  }

  get selectedFolderName() {
    const segments = this.rootPath?.split(path.sep);
    if (segments && segments.length > 0) {
      return segments.pop();
    }
    return "";
  }

  get selectedRepository() {
    if (this.repositories.length === 1) {return this.repositories[0];}
    return this.repositories.find((repo: Repository) => repo.ui.selected);
  }

  updateSelectedInput(value: (message: string) => string) {
    const repo = this.selectedRepository;
    if(!repo) {return;}
    if (typeof value === "function") {
      repo.inputBox.value = value(repo.inputBox.value);
    } else {
      repo.inputBox.value = value;
    }
  }

  onDidChangeUiState(stateChangeCallback: Function) {
    const trackRepos: string[] = [];

    for (let repo of this.repositories) {
      if (!trackRepos.includes(repo.rootUri.path)) {
        trackRepos.push(repo.rootUri.path);
        repo.ui.onDidChange(stateChangeCallback.bind(repo));
      }
    }

    this.gitApi.onDidOpenRepository(function (repo: Repository) {
      if (!trackRepos.includes(repo.rootUri.path)) {
        trackRepos.push(repo.rootUri.path);
        repo.ui.onDidChange(stateChangeCallback.bind(repo));
      }
    });

    this.gitApi.onDidCloseRepository(function (repo: Repository) {
      const index = trackRepos.indexOf(repo.rootUri.path);
      if (index > -1) {
        trackRepos.splice(index, 1);
      }
    });
  }
}
