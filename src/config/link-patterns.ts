import { workspace } from "vscode";

type LinkPatternConfig = {
  pattern: string;
  urlFormat: string;
  textFormat: string;
};

export function linkPatterns(): LinkPatternConfig[] {
  const config = workspace.getConfiguration("gitEase.log");
  const patternConfig = config.get<LinkPatternConfig[]>("linkPatterns");
  if (patternConfig) {
    return patternConfig;
  }

  return [];
}
