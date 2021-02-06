export function getOrigin(remotes): string {
  const origin = remotes.find(({ name }) => name === "origin");
  if (!origin) {
    return remotes[0];
  }
  return origin;
}
