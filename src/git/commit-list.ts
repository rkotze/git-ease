
type Commit = {
  hash: string,
  merge?: string,
  author: string,
  date: Date,
  title: string,
  body: string
};

function matched(matchedText: string[] | null):string {
  if(Array.isArray(matchedText) && matchedText?.length > 1){
    return matchedText[1];
  }

  return "";
}

function buildCommit(commit: string) {
  const cleanCommit = commit.split("\n").filter((text) => text.length).map((txt) => txt.trim());
  const initialCommit:Commit = {title: "", body: "", hash: "", author:"", date: new Date() };
  return cleanCommit.reduce(
    (acc, item, i) => {
      if (i === 0) {
        acc.hash = item;
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
    },
    initialCommit
  );
}

export async function commitList(commitLog: string):Promise<Commit[]> {
  const commitList = commitLog.split("commit ");
  commitList.shift();
  
  return commitList.map((commit) => buildCommit(commit));
}