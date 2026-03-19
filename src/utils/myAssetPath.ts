const myBasePath = import.meta.env.BASE_URL ?? "/";

function myNormalizeBasePath(myBase: string): string {
  if (!myBase || myBase === "/") {
    return "";
  }
  return myBase.endsWith("/") ? myBase.slice(0, -1) : myBase;
}

function myDetectGithubPagesRepoBase(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const myHost = window.location.hostname.toLowerCase();
  if (!myHost.endsWith("github.io")) {
    return "";
  }

  const mySegments = window.location.pathname.split("/").filter(Boolean);
  if (mySegments.length === 0) {
    return "";
  }

  return `/${mySegments[0]}`;
}

const myNormalizedBasePath = myNormalizeBasePath(myBasePath);
const myRuntimeGithubBasePath = myNormalizeBasePath(myDetectGithubPagesRepoBase());

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

  const myPrefix = myNormalizedBasePath || myRuntimeGithubBasePath;
  return `${myPrefix}${myPath}`;
}
