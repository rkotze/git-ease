type Commit = {
  hash: string;
  merge?: string;
  branch?: string;
  author: Author | null;
  date: Date;
  title: string;
  body: string;
};

type Author = {
  name: string;
  email: string;
  initials: string;
};
