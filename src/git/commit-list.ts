function matched(matchedText: string[] | null): string {
  if (Array.isArray(matchedText) && matchedText?.length > 1) {
    return matchedText[1];
  }

  return "";
}

function extractAuthor(authorString: string): Author | undefined {
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
}

function extractCoAuthors(authorString: string): Author | undefined {
  const authorArray = authorString.match(/(.+)\s<(.+)>/i);
  if (authorArray) {
    const [, name, email] = authorArray;
    return {
      name,
      email,
    };
  }
}

function containsTrackedSymbol(item: string): boolean {
  return "MADRCU".includes(item) && item.length === 1;
}

const trackedFilePattern = /^([M|A|D|R|C|U])\s+(.*)/;

function extractFiles(text: string): TrackedFile | undefined {
  const fileArray = text.match(trackedFilePattern);
  if (fileArray?.length === 3 && containsTrackedSymbol(fileArray[1])) {
    const path = fileArray[2];
    const splitPath = path.split("/");
    const filename = splitPath.pop() || "";
    const dir = splitPath.join("/");
    return {
      change: fileArray[1] as TrackedChangeSymbol,
      path,
      filename,
      dir,
    };
  }
}

function buildCommit(commit: string): Commit {
  const initialCommit: Commit = {
    title: "",
    branch: [],
    body: "",
    hash: "",
    author: { name: "", email: "", initials: "" },
    date: new Date(),
    coAuthors: [],
    files: [],
  };

  const splitCommit = cleanCommitSplit(commit);
  return splitCommit.reduce((acc, item, i) => {
    if (i === 0) {
      const branch = matched(item.match(/\((.*)\)/));
      acc.hash = matched(item.match(/(\w+)/));
      if (branch) {
        acc.branch = branch.split(", ");
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
    if (item.includes("Co-authored-by:")) {
      const coAuthor: Author | undefined = extractCoAuthors(
        matched(item.match(/Co-authored-by:\s+(.*)/))
      );
      if (coAuthor) {
        acc.coAuthors.push(coAuthor);
      }
      return acc;
    }
    if (item.includes("Date:")) {
      acc.date = new Date(matched(item.match(/Date:\s+(.*)/)));
      return acc;
    }
    if (trackedFilePattern.test(item)) {
      const file = extractFiles(item);
      if (file) {
        acc.files.push(file);
        return acc;
      }
    }
    if (!acc.title) {
      acc.title = item;
      return acc;
    }

    if (item.trim()) {
      acc.body += item + "\n";
    }

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
    .replace(/^commit\s[a-z0-9]{40}/gim, function (substring: string) {
      return ":easeSplit:" + substring.slice(7);
    })
    .split(":easeSplit:");
  commitList.shift();

  return commitList.map((commit) => buildCommit(commit));
}
