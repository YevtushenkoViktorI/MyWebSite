const myBasePath = import.meta.env.BASE_URL ?? "/";

function myNormalizeBasePath(myBase: string): string {
  if (!myBase || myBase === "/") {
    return "";
  }
  return myBase.endsWith("/") ? myBase.slice(0, -1) : myBase;
}

const myNormalizedBasePath = myNormalizeBasePath(myBasePath);

export function myAssetPath(myPath: string): string {
  if (!myPath) {
    return myPath;
  }

  if (/^(?:[a-z]+:)?\/\//i.test(myPath) || myPath.startsWith("data:") || myPath.startsWith("#")) {
    return myPath;
  }

  if (!myPath.startsWith("/")) {
    return myPath;
  }

  return `${myNormalizedBasePath}${myPath}`;
}
