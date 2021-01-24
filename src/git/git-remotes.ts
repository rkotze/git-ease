export function gitRemotes(gitResponse: string): Array<RemoteInfo> {
  const list = gitResponse.trim().split("\n");
  const remotes = new Map();
  for (const remote of list) {
    const [name, value, _action] = remote.split(/\s/i);
    if (!remotes.has(name)) {
      let ssh = "";
      let https = "";
      if (value.includes("@")) {
        ssh = value;
        https = value.replace(
          /[a-z0-9]+@(.+):(.+)/i,
          function (_matched: string, g1: string, g2: string): string {
            return `https://${g1}/${g2}`;
          }
        );
      }

      if (value.includes("https:")) {
        https = value;
        ssh = value.replace(
          /https:\/\/([a-z0-9\.-]+)\/(.+)/i,
          function (_matched: string, g1: string, g2: string): string {
            return `git@${g1}:${g2}`;
          }
        );
      }

      remotes.set(name, {
        name,
        ssh,
        https,
        url: https.split(".git")[0],
      });
    }
  }
  return [...remotes.values()];
}
