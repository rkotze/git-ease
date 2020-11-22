function matched(matchedText: string[] | null): string {
  if (Array.isArray(matchedText) && matchedText?.length > 1) {
    return matchedText[1];
  }

  return "";
}

function buildCommit(commit: string): Commit {
  const initialCommit: Commit = {
    title: "",
    body: "",
    hash: "",
    author: "",
    date: new Date(),
  };

  const splitCommit = cleanCommitSplit(commit);
  return splitCommit.reduce((acc, item, i) => {
    if (i === 0) {
      const branch = matched(item.match(/\((.*)\)/));
      acc.hash = matched(item.match(/(\w+)/));
      if (branch) {
        acc.branch = branch;
      }
      return acc;
    }
    if (item.includes("Merge:")) {
      acc.merge = matched(item.match(/Merge:\s+(.*)/));
      return acc;
    }
    if (item.includes("Author:")) {
      acc.author = matched(item.match(/Author:\s+(.*)/));
      return acc;
    }
    if (item.includes("Date:")) {
      acc.date = new Date(matched(item.match(/Date:\s+(.*)/)));
      return acc;
    }
    if (!acc.title) {
      acc.title = item;
      return acc;
    }

    acc.body += item + "\n";

    return acc;
  }, initialCommit);
}

function cleanCommitSplit(commit: string) {
  return commit
    .split("\n")
    .filter((text) => text.length)
    .map((txt) => txt.trim());
}

export async function commitList(commitLog: string): Promise<Commit[]> {
  const commitList = commitLog.split("commit ");
  commitList.shift();

  return commitList.map((commit) => buildCommit(commit));
}
