function matched(matchedText: string[] | null): string {
  if (Array.isArray(matchedText) && matchedText?.length > 1) {
    return matchedText[1];
  }

  return "";
}

function extractAuthor(authorString: string): Author | null {
  const authorArray = authorString.match(/(.+)\s<(.+)>/i);
  if (authorArray) {
    const [, name, email] = authorArray;
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return {
      name,
      email,
      initials,
    };
  }
  return null;
}

function buildCommit(commit: string): Commit {
  const initialCommit: Commit = {
    title: "",
    body: "",
    hash: "",
    author: { name: "", email: "", initials: "" },
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
      acc.author = extractAuthor(matched(item.match(/Author:\s+(.*)/)));
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

export function commitList(commitLog: string): Commit[] {
  const commitList = commitLog
    .replace(/commit\s[a-z0-9]{40}/gi, function (substring: string) {
      return ":easeSplit:" + substring.slice(7);
    })
    .split(":easeSplit:");
  commitList.shift();

  return commitList.map((commit) => buildCommit(commit));
}
