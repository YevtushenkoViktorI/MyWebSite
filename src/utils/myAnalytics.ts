let myHasInitializedAnalytics = false;
let myLastTrackedLocation = "";

function myGetPageLocation() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function myTrackPageView() {
  if (!window.gtag) {
    return;
  }

  const myPageLocation = myGetPageLocation();
  if (myPageLocation === myLastTrackedLocation) {
    return;
  }

  myLastTrackedLocation = myPageLocation;
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: myPageLocation
  });
}

function myTrackLinkClick(myAnchor: HTMLAnchorElement) {
  if (!window.gtag) {
    return;
  }

  const myHref = myAnchor.href;
  const myRawHref = myAnchor.getAttribute("href") ?? "";
  const myIsDownload = myAnchor.hasAttribute("download");
  const myIsMail = myRawHref.startsWith("mailto:");
  const myIsInternalAnchor = myRawHref.startsWith("#");
  const myIsExternal = myHref ? new URL(myHref).origin !== window.location.origin : false;

  if (!myIsDownload && !myIsMail && !myIsInternalAnchor && !myIsExternal) {
    return;
  }

  window.gtag("event", "portfolio_link_click", {
    link_url: myHref,
    link_text: myAnchor.textContent?.trim() || myAnchor.getAttribute("aria-label") || "link",
    link_type: myIsDownload
      ? "download"
      : myIsMail
        ? "email"
        : myIsInternalAnchor
          ? "section"
          : "external"
  });
}

function myInstallNavigationTracking() {
  const myOriginalPushState = window.history.pushState;
  const myOriginalReplaceState = window.history.replaceState;

  window.history.pushState = function pushState(...myArgs) {
    const myResult = myOriginalPushState.apply(this, myArgs);
    window.dispatchEvent(new Event("myPortfolioLocationChange"));
    return myResult;
  };

  window.history.replaceState = function replaceState(...myArgs) {
    const myResult = myOriginalReplaceState.apply(this, myArgs);
    window.dispatchEvent(new Event("myPortfolioLocationChange"));
    return myResult;
  };

  window.addEventListener("popstate", myTrackPageView);
  window.addEventListener("hashchange", myTrackPageView);
  window.addEventListener("myPortfolioLocationChange", myTrackPageView);
}

function myInstallClickTracking() {
  document.addEventListener("click", (myEvent) => {
    const myTarget = myEvent.target;
    if (!(myTarget instanceof Element)) {
      return;
    }

    const myAnchor = myTarget.closest("a");
    if (!myAnchor) {
      return;
    }

    myTrackLinkClick(myAnchor);
  });
}

export function myInitAnalytics() {
  if (!window.gtag || myHasInitializedAnalytics) {
    return;
  }

  myHasInitializedAnalytics = true;
  myLastTrackedLocation = myGetPageLocation();

  myInstallNavigationTracking();
  myInstallClickTracking();
}
