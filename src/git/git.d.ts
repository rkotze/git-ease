type Commit = {
  hash: string;
  merge?: string;
  branch: string[];
  author?: Author;
  coAuthors: Author[];
  date: Date;
  title: string;
  body: string;
  files: TrackedFile[];
};

type Author = {
  name: string;
  email: string;
  initials?: string;
};

type RemoteInfo = {
  name: string;
  ssh?: string;
  https?: string;
  url: string;
};

type TrackedChangeSymbol = "M" | "A" | "D" | "R" | "C" | "U";
type TrackedFile = {
  path: string;
  change: TrackedChangeSymbol;
  dir: string;
  filename: string;
};
