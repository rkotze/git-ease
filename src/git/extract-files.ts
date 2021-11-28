export const trackedFilePattern = new RegExp(`^(M|A|D|R[0-9]{3}|C|U)\\s+(.*)`);

export function extractFiles(text: string): TrackedFile | undefined {
  const fileArray = text.match(trackedFilePattern);
  if (fileArray?.length === 3) {
    let path = fileArray[2];
    let renamePaths = [];
    let file: FileInfo = fileInfoBuilder(path);
    let originFile: FileInfo;
    let trackedFile: TrackedFile = {
      change: fileArray[1].charAt(0) as TrackedChangeSymbol,
      file,
    };
    if (fileArray[1].includes("R")) {
      renamePaths = path.split(/\s+/) || [];
      file = fileInfoBuilder(renamePaths[1]);
      originFile = fileInfoBuilder(renamePaths[0]);
      trackedFile.file = file;
      trackedFile.originFile = originFile;
    }
    return trackedFile;
  }
}

function fileInfoBuilder(path: string): FileInfo {
  const splitPath = path.split("/");
  const filename = splitPath.pop() || "";
  const dir = splitPath.join("/");

  return {
    filename,
    dir,
    path,
  };
}
