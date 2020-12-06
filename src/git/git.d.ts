type Commit = {
  hash: string;
  merge?: string;
  branch?: string;
  author?: Author;
  date: Date;
  title: string;
  body: string;
};

type Author = {
  name: string;
  email: string;
  initials: string;
};

type RemoteInfo = {
  name: string;
  ssh?: string;
  https?: string;
  url: string;
};
