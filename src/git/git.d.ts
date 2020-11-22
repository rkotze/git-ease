type Commit = {
  hash: string;
  merge?: string;
  branch?: string;
  author: string;
  date: Date;
  title: string;
  body: string;
};
