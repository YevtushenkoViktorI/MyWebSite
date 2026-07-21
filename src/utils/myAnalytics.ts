let myHasInitializedAnalytics = false;
let myLastTrackedLocation = "";
const myViewedSections = new Set<string>();
const myTrackedDialogs = new WeakSet<Element>();
const myTrackedScrollDepths = new Set<number>();

function myGetPageLocation() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function myCleanText(myText: string | null | undefined) {
  return (myText ?? "").replace(/\s+/g, " ").trim().slice(0, 120);
}

function myGetFileName(myUrl: string) {
  try {
    const myPath = new URL(myUrl, window.location.href).pathname;
    return myPath.split("/").filter(Boolean).pop() ?? myPath;
  } catch {
    return myUrl.split("/").filter(Boolean).pop() ?? myUrl;
  }
}

function myGetSectionId(myElement: Element) {
  return myElement.closest("section[id]")?.id || "unknown";
}

function myTrackEvent(myEventName: string, myParams: Record<string, string | number | boolean> = {}) {
  if (!window.gtag) {
    return;
  }

  window.gtag("event", myEventName, {
    page_path: myGetPageLocation(),
    ...myParams
  });
}

function myTrackPageView() {
  const myPageLocation = myGetPageLocation();
  if (myPageLocation === myLastTrackedLocation) {
    return;
  }

  myLastTrackedLocation = myPageLocation;
  myTrackEvent("page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: myPageLocation
  });
}

function myTrackLinkClick(myAnchor: HTMLAnchorElement) {
  const myHref = myAnchor.href;
  const myRawHref = myAnchor.getAttribute("href") ?? "";
  const myLinkText = myCleanText(myAnchor.textContent || myAnchor.getAttribute("aria-label") || "link");
  const myIsDownload = myAnchor.hasAttribute("download");
  const myIsMail = myRawHref.startsWith("mailto:");
  const myIsInternalAnchor = myRawHref.startsWith("#");
  const myIsExternal = myHref ? new URL(myHref).origin !== window.location.origin : false;

  if (myIsDownload) {
    myTrackEvent("file_download", {
      file_name: myGetFileName(myHref),
      link_url: myHref,
      link_text: myLinkText,
      section_id: myGetSectionId(myAnchor)
    });
    return;
  }

  if (myIsMail) {
    myTrackEvent("contact_click", {
      contact_type: "email",
      link_url: myRawHref,
      link_text: myLinkText,
      section_id: myGetSectionId(myAnchor)
    });
    return;
  }

  if (myIsInternalAnchor) {
    myTrackEvent("section_navigation_click", {
      target_section: myRawHref.replace("#", ""),
      link_text: myLinkText,
      section_id: myGetSectionId(myAnchor)
    });
    return;
  }

  if (myIsExternal) {
    myTrackEvent("external_link_click", {
      link_url: myHref,
      link_text: myLinkText,
      section_id: myGetSectionId(myAnchor)
    });
  }
}

function myClassifyButton(myButton: HTMLButtonElement) {
  if (myButton.classList.contains("myCertificatePreviewButton")) {
    return "certificate_preview_open";
  }
  if (myButton.classList.contains("myCertificateDocTab")) {
    return "certificate_document_tab";
  }
  if (myButton.classList.contains("myProjectControlButton")) {
    return "carousel_navigation";
  }
  if (myButton.classList.contains("myJourneyDetailButton")) {
    return "detail_modal_open";
  }
  if (myButton.classList.contains("myJourneyDetailClose") || myButton.classList.contains("mySkillsModalClose")) {
    return "modal_close";
  }
  if (myButton.classList.contains("myChipButton")) {
    return "skills_modal_open";
  }
  if (myButton.classList.contains("myIconButton")) {
    return "theme_toggle";
  }
  if (myButton.classList.contains("myHeroDetailTrigger")) {
    return "hero_detail_open";
  }
  return "button";
}

function myTrackButtonClick(myButton: HTMLButtonElement) {
  myTrackEvent("button_click", {
    button_type: myClassifyButton(myButton),
    button_text: myCleanText(myButton.textContent || myButton.getAttribute("aria-label") || myButton.title || "button"),
    section_id: myGetSectionId(myButton)
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
    if (myAnchor) {
      myTrackLinkClick(myAnchor);
      return;
    }

    const myButton = myTarget.closest("button");
    if (myButton) {
      myTrackButtonClick(myButton);
    }
  });
}

function myInstallLanguageTracking() {
  document.addEventListener("change", (myEvent) => {
    const myTarget = myEvent.target;
    if (!(myTarget instanceof HTMLSelectElement) || myTarget.id !== "myLanguageSelect") {
      return;
    }

    myTrackEvent("language_change", {
      language: myTarget.value
    });
  });
}

function myInstallSectionViewTracking() {
  if (!("IntersectionObserver" in window)) {
    return;
  }

  const myObserver = new IntersectionObserver((myEntries) => {
    for (const myEntry of myEntries) {
      if (!myEntry.isIntersecting || myEntry.intersectionRatio < 0.45) {
        continue;
      }

      const mySection = myEntry.target as HTMLElement;
      if (!mySection.id || myViewedSections.has(mySection.id)) {
        continue;
      }

      myViewedSections.add(mySection.id);
      myTrackEvent("section_view", {
        section_id: mySection.id,
        section_title: myCleanText(mySection.querySelector("h1, h2, h3")?.textContent || mySection.id)
      });
    }
  }, {
    threshold: [0.45, 0.7]
  });

  document.querySelectorAll("section[id]").forEach((mySection) => myObserver.observe(mySection));
}

function myTrackOpenDialog(myDialog: Element) {
  if (myTrackedDialogs.has(myDialog)) {
    return;
  }

  myTrackedDialogs.add(myDialog);
  myTrackEvent("modal_view", {
    modal_title: myCleanText(myDialog.querySelector("h1, h2, h3, [aria-label]")?.textContent || myDialog.getAttribute("aria-label") || "modal")
  });
}

function myInstallModalViewTracking() {
  document.querySelectorAll("[role='dialog']").forEach(myTrackOpenDialog);

  const myObserver = new MutationObserver((myMutations) => {
    for (const myMutation of myMutations) {
      for (const myNode of Array.from(myMutation.addedNodes)) {
        if (!(myNode instanceof Element)) {
          continue;
        }

        if (myNode.matches("[role='dialog']")) {
          myTrackOpenDialog(myNode);
        }
        myNode.querySelectorAll("[role='dialog']").forEach(myTrackOpenDialog);
      }
    }
  });

  myObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function myInstallScrollDepthTracking() {
  const myDepths = [25, 50, 75, 90];

  window.addEventListener("scroll", () => {
    const myScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (myScrollableHeight <= 0) {
      return;
    }

    const myPercent = Math.round((window.scrollY / myScrollableHeight) * 100);
    for (const myDepth of myDepths) {
      if (myPercent >= myDepth && !myTrackedScrollDepths.has(myDepth)) {
        myTrackedScrollDepths.add(myDepth);
        myTrackEvent("scroll_depth", {
          percent_scrolled: myDepth
        });
      }
    }
  }, { passive: true });
}

export function myInitAnalytics() {
  if (!window.gtag || myHasInitializedAnalytics) {
    return;
  }

  myHasInitializedAnalytics = true;
  myLastTrackedLocation = myGetPageLocation();

  myInstallNavigationTracking();
  myInstallClickTracking();
  myInstallLanguageTracking();
  myInstallSectionViewTracking();
  myInstallModalViewTracking();
  myInstallScrollDepthTracking();
}
