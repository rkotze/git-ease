import * as vscode from "vscode";
import { API } from "./git-scm";

export function vsCodeGit(): API {
  const ext = vscode.extensions.getExtension("vscode.git");
  return ext?.isActive && ext?.exports.getAPI(1);
}
