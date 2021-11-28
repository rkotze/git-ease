export const trackedFilePattern = new RegExp(`^(M|A|D|R[0-9]{3}|C|U)\\s+(.*)`);

export function extractFiles(text: string): TrackedFile | undefined {
  const fileArray = text.match(trackedFilePattern);
  if (fileArray?.length === 3) {
    let path = fileArray[2];
    if (fileArray[1].includes("R")) {
      path = path.split(/\s/).pop() || "";
    }
    const splitPath = path.split("/");
    const filename = splitPath.pop() || "";
    const dir = splitPath.join("/");
    return {
      change: fileArray[1].charAt(0) as TrackedChangeSymbol,
      file: {
        path,
        filename,
        dir,
      },
    };
  }
}
