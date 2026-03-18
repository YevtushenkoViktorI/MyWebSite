import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { MyHeader } from "./components/myHeader";
import { MyHeroSection } from "./components/myHeroSection";
import { MySectionTitle } from "./components/mySectionTitle";
import { MyTimelineItem } from "./components/myTimelineItem";
import { myDefaultLanguage, myLanguageOptions, myTranslations } from "./i18n/myI18n";
import type { myCertificateItem, myLanguageCode } from "./i18n/myTypes";

const myLanguageStorageKey = "myPortfolioLanguage";
const myThemeStorageKey = "myPortfolioTheme";

function myGetInitialLanguage(): myLanguageCode {
  const mySaved = window.localStorage.getItem(myLanguageStorageKey) as myLanguageCode | null;
  if (mySaved && myLanguageOptions.includes(mySaved)) {
    return mySaved;
  }
  return myDefaultLanguage;
}

function myGetInitialTheme(): "dark" | "light" {
  const mySaved = window.localStorage.getItem(myThemeStorageKey);
  return mySaved === "light" ? "light" : "dark";
}

function MyExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function MyNanoLatticePreview() {
  return (
    <div className="myJourneyNanoScene" aria-hidden="true">
      <object
        className="myJourneyNanoEmbed"
        data="/journey/structureCdS.svg"
        type="image/svg+xml"
        aria-label="Cadmium sulfide crystal structure"
      />
    </div>
  );
}

function MyVacuumDepositionPreview() {
  return (
    <div className="myJourneyNanoScene" aria-hidden="true">
      <object
        className="myJourneyNanoEmbed"
        data="/journey/depositionCdS.svg"
        type="image/svg+xml"
        aria-label="Vacuum deposition process animation"
      />
    </div>
  );
}

function MyEmbeddedSystemsPreview() {
  return (
    <div className="myJourneyNanoScene" aria-hidden="true">
      <object
        className="myJourneyNanoEmbed myJourneyEmbeddedEmbed"
        data="/journey/embeddedSystems.svg"
        type="image/svg+xml"
        aria-label="Embedded systems and microcontroller animation"
      />
    </div>
  );
}

function MyDataFlowPreview() {
  return (
    <div className="myJourneyFlowScene" aria-hidden="true">
      <div className="myJourneyFlowField">
        <span className="myJourneyFlowLine myJourneyFlowLineA" />
        <span className="myJourneyFlowLine myJourneyFlowLineB" />
        <span className="myJourneyFlowLine myJourneyFlowLineC" />
        <span className="myJourneyFlowLine myJourneyFlowLineD" />
        <span className="myJourneyFlowLine myJourneyFlowLineE" />
        <span className="myJourneyFlowDot myJourneyFlowDotA" />
        <span className="myJourneyFlowDot myJourneyFlowDotB" />
        <span className="myJourneyFlowDot myJourneyFlowDotC" />
        <span className="myJourneyFlowDot myJourneyFlowDotD" />
        <span className="myJourneyFlowDot myJourneyFlowDotE" />
        <span className="myJourneyFlowDot myJourneyFlowDotF" />
      </div>
    </div>
  );
}

function MyRealtimePulseLegacyPreview() {
  return (
    <div className="myJourneyRealtimeScene" aria-hidden="true">
      <div className="myJourneyRealtimeField">
        <div className="myJourneyRealtimeSources">
          <div className="myJourneyRealtimeSource">
            <span className="myJourneyRealtimeDbIcon" />
          </div>
          <div className="myJourneyRealtimeSource">
            <span className="myJourneyRealtimeDbIcon" />
          </div>
          <div className="myJourneyRealtimeSource">
            <span className="myJourneyRealtimeDbIcon" />
          </div>
        </div>

        <div className="myJourneyRealtimePipeline">
          <span className="myJourneyRealtimeLine myJourneyRealtimeLineA" />
          <span className="myJourneyRealtimeLine myJourneyRealtimeLineB" />
          <span className="myJourneyRealtimeLine myJourneyRealtimeLineC" />
          <span className="myJourneyRealtimeLine myJourneyRealtimeLineD" />
          <span className="myJourneyRealtimeLine myJourneyRealtimeLineE" />
          <span className="myJourneyRealtimeLine myJourneyRealtimeLineF" />
          <span className="myJourneyRealtimeLine myJourneyRealtimeLineG" />
          <span className="myJourneyRealtimeLine myJourneyRealtimeLineH" />
          <span className="myJourneyRealtimeLine myJourneyRealtimeLineI" />
          <span className="myJourneyRealtimeLine myJourneyRealtimeLineJ" />
          <span className="myJourneyRealtimeLine myJourneyRealtimeLineK" />
          <span className="myJourneyRealtimeLine myJourneyRealtimeLineL" />

          <span className="myJourneyRealtimePacket myJourneyRealtimePacketA" />
          <span className="myJourneyRealtimePacket myJourneyRealtimePacketB" />
          <span className="myJourneyRealtimePacket myJourneyRealtimePacketC" />
          <span className="myJourneyRealtimePacket myJourneyRealtimePacketD" />
          <span className="myJourneyRealtimePacket myJourneyRealtimePacketE" />
          <span className="myJourneyRealtimePacket myJourneyRealtimePacketF" />
        </div>

        <div className="myJourneyRealtimeStage myJourneyRealtimeStageExtract" />
        <div className="myJourneyRealtimeStage myJourneyRealtimeStageLoad" />

        <div className="myJourneyRealtimeWarehouse">
          <span className="myJourneyRealtimeWarehouseDb" />
        </div>

        <div className="myJourneyRealtimeTransform">
          <span className="myJourneyRealtimeGear myJourneyRealtimeGearLarge" />
          <span className="myJourneyRealtimeGear myJourneyRealtimeGearMedium" />
          <span className="myJourneyRealtimeGear myJourneyRealtimeGearSmall" />
        </div>
      </div>
    </div>
  );
}

function MyRealtimePulsePreview({ myIsDarkMode }: { myIsDarkMode: boolean }) {
  return (
    <div className="myJourneyNanoScene myJourneyPipelineScene" aria-hidden="true">
      <object
        className="myJourneyNanoEmbed myJourneyPipelineEmbed"
        data={myIsDarkMode
          ? "/journey/engineering_pipeline_animated_improved.svg"
          : "/journey/engineering_pipeline_animated_improved_light.svg"}
        type="image/svg+xml"
        aria-label="Engineering pipeline animation"
      />
    </div>
  );
}

function MyCodingPreview() {
  const myCodeLines = useMemo(
    () => [
      "//",
      "//  SlovnykApp.swift",
      "//  Slovnyk",
      "//",
      "//  Created by Viktor Yevtushenko on 02.01.2026.",
      "//",
      "",
      "import SwiftUI",
      "",
      "@main",
      "struct SlovnykMainAppView: App {",
      "    ",
      "    @State var viewModelApp: SlovnykMainAppModel = SlovnykMainAppModel()",
      "    ",
      "    var body: some Scene {",
      "        WindowGroup {",
      "            Group {",
      "                switch viewModelApp.root {",
      "                case .loading:",
      "                    LoadingView(slovnykMainAppModel: viewModelApp)",
      "                        .transition(.asymmetric(insertion: .scale, removal: .opacity))",
      "                case .tabBar:",
      "                    TabBarView()",
      "                }",
      "            }",
      "            .animation(.easeInOut(duration: 0.5), value: self.viewModelApp.root)",
      "        }",
      "    }",
      "}",
    ],
    []
  );
  const [myTypedLines, setMyTypedLines] = useState<string[]>(() => myCodeLines.map(() => ""));
  const [myActiveRow, setMyActiveRow] = useState(0);
  const [myActiveCol, setMyActiveCol] = useState(0);
  const myCodeBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const myCurrentLine = myCodeLines[myActiveRow];

    if (myCurrentLine === undefined) {
      const myResetTimer = window.setTimeout(() => {
        setMyTypedLines(myCodeLines.map(() => ""));
        setMyActiveRow(0);
        setMyActiveCol(0);
        if (myCodeBodyRef.current) {
          myCodeBodyRef.current.scrollTop = 0;
        }
      }, 1200);
      return () => window.clearTimeout(myResetTimer);
    }

    if (myActiveCol <= myCurrentLine.length) {
      const myTypingTimer = window.setTimeout(() => {
        setMyTypedLines((myPrev) => {
          const myNext = [...myPrev];
          myNext[myActiveRow] = myCurrentLine.slice(0, myActiveCol);
          return myNext;
        });
        setMyActiveCol((myPrev) => myPrev + 1);
      }, 26);
      return () => window.clearTimeout(myTypingTimer);
    }

    const myNextLineTimer = window.setTimeout(() => {
      setMyActiveRow((myPrev) => myPrev + 1);
      setMyActiveCol(0);
    }, 160);
    return () => window.clearTimeout(myNextLineTimer);
  }, [myActiveCol, myActiveRow, myCodeLines]);

  useEffect(() => {
    const myContainer = myCodeBodyRef.current;
    if (!myContainer) {
      return;
    }
    if (myActiveRow === 0) {
      myContainer.scrollTop = 0;
      return;
    }
    const myActiveLine = myContainer.querySelector<HTMLElement>(`[data-code-line="${myActiveRow}"]`);
    if (!myActiveLine) {
      return;
    }
    const myLineBottom = myActiveLine.offsetTop + myActiveLine.offsetHeight;
    const myVisibleBottom = myContainer.scrollTop + myContainer.clientHeight - 6;
    if (myLineBottom > myVisibleBottom) {
      const myNextTop = myLineBottom - myContainer.clientHeight + 12;
      myContainer.scrollTo({ top: myNextTop, behavior: "smooth" });
    }
  }, [myActiveRow]);

  return (
    <div className="myJourneyCodeScene" aria-hidden="true">
      <div className="myJourneyCodePanel">
        <div className="myJourneyCodeHeader">
          <span className="myJourneyCodeHeaderDot myJourneyCodeHeaderDotRed" />
          <span className="myJourneyCodeHeaderDot myJourneyCodeHeaderDotAmber" />
          <span className="myJourneyCodeHeaderDot myJourneyCodeHeaderDotGreen" />
        </div>
        <div ref={myCodeBodyRef} className="myJourneyCodeBody myJourneyCodeTypedBlock">
          {myCodeLines.map((myLine, myIndex) => {
            const myIsActive = myIndex === myActiveRow;
            const myVisibleLine = myTypedLines[myIndex] ?? "";
            return (
              <p key={`${myIndex}-${myLine}`} className="myJourneyCodeTypedRow" data-code-line={myIndex}>
                <span className="myJourneyCodeLineNumber">{myIndex + 1}</span>
                <span className="myJourneyCodeTyped">
                  {myVisibleLine.length > 0 ? myVisibleLine : "\u00A0"}
                  {myIsActive ? <span className="myJourneyCodeCursorInline">|</span> : null}
                </span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MyApp() {
  const [myLanguage, setMyLanguage] = useState<myLanguageCode>(myGetInitialLanguage);
  const [myTheme, setMyTheme] = useState<"dark" | "light">(myGetInitialTheme);
  const [myActiveJourneyIndex, setMyActiveJourneyIndex] = useState(0);
  const [myDisplayedJourneyIndex, setMyDisplayedJourneyIndex] = useState(0);
  const [myJourneyContentPhase, setMyJourneyContentPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const [myUiTransitionType, setMyUiTransitionType] = useState<"none" | "language" | "theme">("none");
  const [myUiTransitionPhase, setMyUiTransitionPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const [myPendingLanguage, setMyPendingLanguage] = useState<myLanguageCode | null>(null);
  const [myPendingTheme, setMyPendingTheme] = useState<"dark" | "light" | null>(null);
  const [myJourneyDetailPhase, setMyJourneyDetailPhase] = useState<"closed" | "open" | "closing">("closed");
  const [myProjectPage, setMyProjectPage] = useState(0);
  const [myExpertisePage, setMyExpertisePage] = useState(0);
  const [myProjectDetailPhase, setMyProjectDetailPhase] = useState<"closed" | "open" | "closing">("closed");
  const [myActiveProjectIndex, setMyActiveProjectIndex] = useState(0);
  const [myCertificateDetailPhase, setMyCertificateDetailPhase] = useState<"closed" | "open" | "closing">("closed");
  const [myActiveCertificate, setMyActiveCertificate] = useState<myCertificateItem | null>(null);
  const [myActiveCertificateDocumentIndex, setMyActiveCertificateDocumentIndex] = useState(0);

  useEffect(() => {
    document.documentElement.lang = myLanguage;
    window.localStorage.setItem(myLanguageStorageKey, myLanguage);
  }, [myLanguage]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", myTheme);
    window.localStorage.setItem(myThemeStorageKey, myTheme);
  }, [myTheme]);

  const myText = useMemo(() => myTranslations[myLanguage], [myLanguage]);
  const myJourneyItems = useMemo(
    () => [...myText.myJourneySection.myItems].sort((myLeft, myRight) => myLeft.myOrder - myRight.myOrder),
    [myText.myJourneySection.myItems]
  );
  const myActiveJourney = myJourneyItems[myDisplayedJourneyIndex] ?? myJourneyItems[0];
  const myIsJourneyDetailVisible = myJourneyDetailPhase !== "closed";
  const myIsJourneyDetailClosing = myJourneyDetailPhase === "closing";
  const mySelectedWorkItems = myText.mySelectedWorkSection.myItems;
  const mySelectedWorkPages = useMemo(() => {
    const myPageSize = 4;
    const myPages: Array<Array<{ myWork: (typeof mySelectedWorkItems)[number], myIndex: number }>> = [];
    for (let myIndex = 0; myIndex < mySelectedWorkItems.length; myIndex += myPageSize) {
      const myChunk = mySelectedWorkItems
        .slice(myIndex, myIndex + myPageSize)
        .map((myWork, myOffset) => ({ myWork, myIndex: myIndex + myOffset }));
      myPages.push(myChunk);
    }
    return myPages;
  }, [mySelectedWorkItems]);
  const myProjectPageCount = mySelectedWorkPages.length;
  const myExpertiseItems = myText.myExpertiseSection.myItems;
  const myExpertisePages = useMemo(() => {
    const myPageSize = 6;
    const myPages: Array<Array<{ myItem: (typeof myExpertiseItems)[number], myIndex: number }>> = [];
    for (let myIndex = 0; myIndex < myExpertiseItems.length; myIndex += myPageSize) {
      const myChunk = myExpertiseItems
        .slice(myIndex, myIndex + myPageSize)
        .map((myItem, myOffset) => ({ myItem, myIndex: myIndex + myOffset }));
      myPages.push(myChunk);
    }
    return myPages;
  }, [myExpertiseItems]);
  const myExpertisePageCount = myExpertisePages.length;
  const myActiveProject = mySelectedWorkItems[myActiveProjectIndex] ?? null;
  const myIsProjectDetailVisible = myProjectDetailPhase !== "closed";
  const myIsProjectDetailClosing = myProjectDetailPhase === "closing";
  const myActiveCertificateDocument = myActiveCertificate?.myDocuments[myActiveCertificateDocumentIndex] ?? null;
  const myIsCertificateDetailVisible = myCertificateDetailPhase !== "closed";
  const myIsCertificateDetailClosing = myCertificateDetailPhase === "closing";
  const myIsAnyDetailVisible = myIsJourneyDetailVisible || myIsProjectDetailVisible || myIsCertificateDetailVisible;
  const myUiTransitionClass = myUiTransitionPhase === "idle"
    ? ""
    : `myUiTransitioning ${myUiTransitionType === "language" ? "myUiTransitionLanguage" : "myUiTransitionTheme"} ${myUiTransitionPhase === "exiting" ? "myUiTransitionExiting" : "myUiTransitionEntering"}`;

  function myRenderJourneyIcon(myOrder: number) {
    const myIconClass = "myJourneyButtonIconSvg";

    switch (myOrder) {
      case 1:
        return (
          <svg className={`${myIconClass} myJourneyButtonIconSvgHeavy`} viewBox="0 0 24 24" aria-hidden="true">
            <rect x="9.3" y="2.8" width="5.4" height="3.8" rx="1.2" />
            <rect x="8.4" y="6.2" width="7.2" height="7.8" rx="2.2" />
            <rect x="10.7" y="13.7" width="2.6" height="1.9" rx="0.8" />
            <path d="M12 14.9v1.1a2.7 2.7 0 0 1-2.7 2.7H8.7" />
            <path d="M11.9 8.8h3.3a5.5 5.5 0 0 1 5.5 5.5v1.1a4.2 4.2 0 0 1-4.2 4.2H8" />
            <path d="M5.6 21h14.8" />
          </svg>
        );
      case 2:
        return (
          <svg className={myIconClass} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 8l8-4 8 4-8 4-8-4zm0 8l8 4 8-4M4 12l8 4 8-4" />
          </svg>
        );
      case 3:
        return (
          <svg className={myIconClass} viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="5" width="14" height="14" rx="2" />
            <path d="M9 9h6v6H9zM3 9h2M3 15h2M19 9h2M19 15h2M9 3v2M15 3v2M9 19v2M15 19v2" />
          </svg>
        );
      case 4:
        return (
          <svg className={`${myIconClass} myJourneyButtonIconSvgHeavy`} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="2.1" />
            <path d="M8.4 7.9a5.9 5.9 0 0 0 0 8.2" />
            <path d="M15.6 7.9a5.9 5.9 0 0 1 0 8.2" />
            <path d="M5.2 4.8a10.3 10.3 0 0 0 0 14.4" />
            <path d="M18.8 4.8a10.3 10.3 0 0 1 0 14.4" />
          </svg>
        );
      case 5:
        return (
          <svg className={myIconClass} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13 2L4 14h7l-1 8 10-14h-7l0-6z" />
          </svg>
        );
      case 6:
        return (
          <svg className={myIconClass} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.7 6.3a4 4 0 0 1 5.6 5.6L11 21l-8 2 2-8 9.7-8.7zM13 8l3 3" />
          </svg>
        );
      default:
        return (
          <svg className={myIconClass} viewBox="0 0 24 24" aria-hidden="true">
            <rect x="7" y="2" width="10" height="20" rx="2" />
            <path d="M11 18h2" />
          </svg>
        );
    }
  }

  function myHandleLanguage(myNewLanguage: myLanguageCode) {
    if (myNewLanguage === myLanguage && myUiTransitionPhase === "idle") {
      return;
    }
    setMyPendingLanguage(myNewLanguage);
    setMyUiTransitionType("language");
    setMyUiTransitionPhase("exiting");
  }

  function myHandleThemeToggle() {
    const myNextTheme = myTheme === "dark" ? "light" : "dark";
    setMyPendingTheme(myNextTheme);
    setMyUiTransitionType("theme");
    setMyUiTransitionPhase("exiting");
  }

  function myHandleJourneyCardMove(myEvent: MouseEvent<HTMLElement>) {
    const myRect = myEvent.currentTarget.getBoundingClientRect();
    const myRawX = ((myEvent.clientX - myRect.left) / myRect.width) * 100;
    const myRawY = ((myEvent.clientY - myRect.top) / myRect.height) * 100;
    const myX = Math.min(90, Math.max(10, myRawX));
    const myY = Math.min(88, Math.max(14, myRawY));
    myEvent.currentTarget.style.setProperty("--myPreviewMouseX", `${myX}%`);
    myEvent.currentTarget.style.setProperty("--myPreviewMouseY", `${myY}%`);
  }

  function myHandleJourneyCardLeave(myEvent: MouseEvent<HTMLElement>) {
    myEvent.currentTarget.style.setProperty("--myPreviewMouseX", "50%");
    myEvent.currentTarget.style.setProperty("--myPreviewMouseY", "58%");
  }

  function myHandleJourneyChange(myIndex: number) {
    if (myIndex === myActiveJourneyIndex) {
      return;
    }
    setMyActiveJourneyIndex(myIndex);
    setMyJourneyContentPhase("exiting");
  }

  function myOpenJourneyDetails() {
    setMyJourneyDetailPhase("open");
  }

  function myCloseJourneyDetails() {
    if (myJourneyDetailPhase !== "open") {
      return;
    }
    setMyJourneyDetailPhase("closing");
    const myShouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      setMyJourneyDetailPhase("closed");
    }, myShouldReduceMotion ? 0 : 260);
  }

  function myOpenProjectDetails(myIndex: number) {
    setMyActiveProjectIndex(myIndex);
    setMyProjectDetailPhase("open");
  }

  function myCloseProjectDetails() {
    if (myProjectDetailPhase !== "open") {
      return;
    }
    setMyProjectDetailPhase("closing");
    const myShouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      setMyProjectDetailPhase("closed");
    }, myShouldReduceMotion ? 0 : 260);
  }

  function myOpenCertificateDetails(myCertificate: myCertificateItem) {
    setMyActiveCertificate(myCertificate);
    setMyActiveCertificateDocumentIndex(0);
    setMyCertificateDetailPhase("open");
  }

  function myCloseCertificateDetails() {
    if (myCertificateDetailPhase !== "open") {
      return;
    }
    setMyCertificateDetailPhase("closing");
    const myShouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      setMyActiveCertificate(null);
      setMyCertificateDetailPhase("closed");
    }, myShouldReduceMotion ? 0 : 260);
  }

  function myHandleProjectsPrev() {
    setMyProjectPage((myPrev) => Math.max(0, myPrev - 1));
  }

  function myHandleProjectsNext() {
    setMyProjectPage((myPrev) => Math.min(myProjectPageCount - 1, myPrev + 1));
  }

  function myHandleExpertisePrev() {
    setMyExpertisePage((myPrev) => Math.max(0, myPrev - 1));
  }

  function myHandleExpertiseNext() {
    setMyExpertisePage((myPrev) => Math.min(myExpertisePageCount - 1, myPrev + 1));
  }

  useEffect(() => {
    if (myJourneyContentPhase !== "exiting") {
      return;
    }
    const myExitTimerId = window.setTimeout(() => {
      setMyDisplayedJourneyIndex(myActiveJourneyIndex);
      setMyJourneyContentPhase("entering");
    }, 170);
    return () => window.clearTimeout(myExitTimerId);
  }, [myJourneyContentPhase, myActiveJourneyIndex]);

  useEffect(() => {
    if (myJourneyContentPhase !== "entering") {
      return;
    }
    const myEnterTimerId = window.setTimeout(() => {
      setMyJourneyContentPhase("idle");
    }, 460);
    return () => window.clearTimeout(myEnterTimerId);
  }, [myJourneyContentPhase]);

  useEffect(() => {
    if (!myIsAnyDetailVisible) {
      return;
    }
    function myHandleEsc(myEvent: KeyboardEvent) {
      if (myEvent.key === "Escape") {
        if (myCertificateDetailPhase === "open") {
          myCloseCertificateDetails();
          return;
        }
        if (myProjectDetailPhase === "open") {
          myCloseProjectDetails();
          return;
        }
        myCloseJourneyDetails();
      }
    }
    const myOriginalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", myHandleEsc);
    return () => {
      document.body.style.overflow = myOriginalOverflow;
      window.removeEventListener("keydown", myHandleEsc);
    };
  }, [myIsAnyDetailVisible, myJourneyDetailPhase, myProjectDetailPhase, myCertificateDetailPhase]);

  useEffect(() => {
    if (myJourneyItems.length === 0) {
      return;
    }
    if (myActiveJourneyIndex > myJourneyItems.length - 1) {
      setMyActiveJourneyIndex(0);
      setMyDisplayedJourneyIndex(0);
      setMyJourneyContentPhase("idle");
    }
  }, [myActiveJourneyIndex, myJourneyItems.length]);

  useEffect(() => {
    if (myProjectPageCount === 0) {
      return;
    }
    if (myProjectPage > myProjectPageCount - 1) {
      setMyProjectPage(myProjectPageCount - 1);
    }
  }, [myProjectPage, myProjectPageCount]);

  useEffect(() => {
    if (myExpertisePageCount === 0) {
      return;
    }
    if (myExpertisePage > myExpertisePageCount - 1) {
      setMyExpertisePage(myExpertisePageCount - 1);
    }
  }, [myExpertisePage, myExpertisePageCount]);

  useEffect(() => {
    if (myUiTransitionPhase !== "exiting") {
      return;
    }
    const myExitTimerId = window.setTimeout(() => {
      if (myUiTransitionType === "language" && myPendingLanguage) {
        setMyLanguage(myPendingLanguage);
      }
      if (myUiTransitionType === "theme" && myPendingTheme) {
        setMyTheme(myPendingTheme);
      }
      setMyUiTransitionPhase("entering");
    }, 220);
    return () => window.clearTimeout(myExitTimerId);
  }, [myUiTransitionPhase, myUiTransitionType, myPendingLanguage, myPendingTheme]);

  useEffect(() => {
    if (myUiTransitionPhase !== "entering") {
      return;
    }
    const myEnterDuration = myUiTransitionType === "theme" ? 760 : 620;
    const myEnterTimerId = window.setTimeout(() => {
      setMyUiTransitionPhase("idle");
      setMyUiTransitionType("none");
      setMyPendingLanguage(null);
      setMyPendingTheme(null);
    }, myEnterDuration);
    return () => window.clearTimeout(myEnterTimerId);
  }, [myUiTransitionPhase, myUiTransitionType]);

  return (
    <div className={`myPageRoot ${myUiTransitionClass}`}>
      <MyHeader
        myLogoText="VY"
        myNav={myText.myNav}
        myLanguageValue={myLanguage}
        myLanguageLabel={myText.myLabelLanguage}
        myOnLanguageChange={myHandleLanguage}
        myIsDarkMode={myTheme === "dark"}
        myOnThemeToggle={myHandleThemeToggle}
        myDownloadLabel="Download CV"
      />

      <main id="myTop" className="myContainer myMainGrid">
        <MyHeroSection
          myGreeting={myText.myHero.myGreeting}
          myName={myText.myHero.myName}
          myHeadlineLineOne={myText.myHero.myHeadlineLineOne}
          myHeadlineLineTwo={myText.myHero.myHeadlineLineTwo}
          myTitle={myText.myHero.myTitle}
          myDescription={myText.myHero.myDescription}
          myLocation={myText.myHero.myLocation}
          myStatusLabel={myText.myHero.myStatusLabel}
          myMoreSkillsLabel={myText.myHero.myMoreSkillsLabel}
          mySkillsModalTitle={myText.myHero.mySkillsModalTitle}
          myHeroDetailTriggerLabel={myText.myHero.myHeroDetailTriggerLabel}
          myHeroDetailTitle={myText.myHero.myHeroDetailTitle}
          myHeroDetailParagraphs={myText.myHero.myHeroDetailParagraphs}
          myHeroDetailInterestsTitle={myText.myHero.myHeroDetailInterestsTitle}
          myHeroDetailInterests={myText.myHero.myHeroDetailInterests}
          myHeroDetailClosing={myText.myHero.myHeroDetailClosing}
          myHeroDetailCloseLabel={myText.myHero.myHeroDetailCloseLabel}
          mySkillsVisible={myText.myHero.mySkillsVisible}
          mySkillsAll={myText.myHero.mySkillsAll}
          myPrimaryButton={myText.myHero.myPrimaryButton}
          mySecondaryButton={myText.myHero.mySecondaryButton}
          myPortfolioButton={myText.myHero.myPortfolioButton}
          myDownloadLabel="Download CV"
        />

        <section id="myEngineering" className="mySection myJourneyVariantMesh myJourneyVariantAppleStrongCasual">
          <MySectionTitle
            myTitle={myText.myJourneySection.myTitle}
            mySubtitle={myText.myJourneySection.mySubtitle}
          />
          <div className="myJourneyLayout">
            <div className="myJourneyList">
              {myJourneyItems.map((myItem, myIndex) => (
                <button
                  key={myItem.myTitle}
                  type="button"
                  className={myIndex === myActiveJourneyIndex ? "myJourneyButton myJourneyButtonActive" : "myJourneyButton"}
                  onClick={() => myHandleJourneyChange(myIndex)}
                >
                  <span className="myJourneyButtonIcon">{myRenderJourneyIcon(myItem.myOrder)}</span>
                  <span className="myJourneyButtonLabel">{myItem.myTitle}</span>
                </button>
              ))}
            </div>

            <article
              className="myJourneyCard"
              onMouseMove={myHandleJourneyCardMove}
              onMouseLeave={myHandleJourneyCardLeave}
            >
              <div
                className={myJourneyContentPhase === "exiting"
                  ? "myJourneyContent myJourneyContentExiting"
                  : myJourneyContentPhase === "entering"
                    ? "myJourneyContent myJourneyContentEntering"
                    : "myJourneyContent"}
              >
                <div className="myJourneyCardHead">
                  <h3 className="myProjectTitle">{myActiveJourney.myTitle}</h3>
                  <button
                    type="button"
                    className="myJourneyDetailButton"
                    aria-label={myText.myJourneySection.myOpenDetailsLabel}
                    title={myText.myJourneySection.myOpenDetailsLabel}
                    onClick={myOpenJourneyDetails}
                  >
                    <MyExternalLinkIcon />
                  </button>
                </div>
                <p className="mySectionText">{myActiveJourney.myDescription}</p>
                <ul className="myPointList">
                  {myActiveJourney.myPoints.map((myPoint) => (
                    <li key={myPoint}>{myPoint}</li>
                  ))}
                </ul>
                <div className="myJourneyPreview" aria-hidden="true">
                  {myRenderJourneyPreview(myActiveJourney.myOrder, myTheme === "dark")}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="myProjects" className="mySection">
          <MySectionTitle
            myTitle={myText.mySelectedWorkSection.myTitle}
            mySubtitle={myText.mySelectedWorkSection.mySubtitle}
          />
          <div className="myProjectCarousel">
            <div className="myProjectViewport">
              <div
                className="myProjectTrack"
                style={{ transform: `translateX(-${myProjectPage * 100}%)` }}
              >
                {mySelectedWorkPages.map((myPage, myPageIndex) => (
                  <div key={`my-work-page-${myPageIndex}`} className="myProjectPage">
                    <div className="myProjectGrid myProjectGridWide">
                      {myPage.map(({ myWork, myIndex }) => (
                        <article key={myWork.myTitle} className="myProjectCard">
                          <div className="myProjectCardHead">
                            <h3 className="myProjectTitle"><span className="myCardIcon">{["◈", "◎", "⬢", "◉"][myIndex % 4]}</span>{myWork.myTitle}</h3>
                            <button
                              type="button"
                              className="myJourneyDetailButton"
                              aria-label={myText.mySelectedWorkSection.myOpenDetailsLabel}
                              title={myText.mySelectedWorkSection.myOpenDetailsLabel}
                              onClick={() => myOpenProjectDetails(myIndex)}
                            >
                              <MyExternalLinkIcon />
                            </button>
                          </div>
                          <p className="myProjectText">{myWork.myText}</p>
                          <div className="myChipRow">
                            {myWork.myTags.map((myTag) => (
                              <span key={myTag} className="myChip">{myTag}</span>
                            ))}
                          </div>
                          <ul className="myPointList">
                            {myWork.myPoints.map((myPoint) => (
                              <li key={myPoint}>{myPoint}</li>
                            ))}
                          </ul>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="myProjectControls">
              <button
                type="button"
                className="myProjectControlButton"
                onClick={myHandleProjectsPrev}
                disabled={myProjectPage === 0}
                aria-label={myText.mySelectedWorkSection.myPrevAriaLabel}
              >
                {myText.mySelectedWorkSection.myPrevLabel}
              </button>
              <span className="myProjectControlInfo">{myProjectPage + 1} / {Math.max(1, myProjectPageCount)}</span>
              <button
                type="button"
                className="myProjectControlButton"
                onClick={myHandleProjectsNext}
                disabled={myProjectPage >= myProjectPageCount - 1}
                aria-label={myText.mySelectedWorkSection.myNextAriaLabel}
              >
                {myText.mySelectedWorkSection.myNextLabel}
              </button>
            </div>
          </div>
        </section>

        {myIsProjectDetailVisible && myActiveProject ? (
          <div
            className={myIsProjectDetailClosing ? "myJourneyDetailOverlay myIsClosing" : "myJourneyDetailOverlay"}
            onClick={myCloseProjectDetails}
          >
            <article
              className={myIsProjectDetailClosing ? "myJourneyDetailModal myIsClosing" : "myJourneyDetailModal"}
              onClick={(myEvent) => myEvent.stopPropagation()}
            >
              <div className="myJourneyDetailHead">
                <h3 className="myProjectTitle">{myActiveProject.myDetailTitle ?? myActiveProject.myTitle}</h3>
                <button
                  type="button"
                  className="myJourneyDetailClose"
                  aria-label={myText.mySelectedWorkSection.myCloseDetailsLabel}
                  onClick={myCloseProjectDetails}
                >
                  ×
                </button>
              </div>
              <p className="mySectionText myJourneyDetailText">{myActiveProject.myDetailText || "\u00A0"}</p>
              {myActiveProject.myDetailImages && myActiveProject.myDetailImages.length > 0 ? (
                <div className="myJourneyDetailGallery">
                  {myActiveProject.myDetailImages.map((myImage, myImageIndex) => (
                    <figure key={`${myActiveProject.myTitle}-image-${myImageIndex}`} className="myJourneyDetailFigure">
                      <img
                        src={myImage}
                        alt={`${myActiveProject.myTitle} screenshot ${myImageIndex + 1}`}
                        loading="lazy"
                      />
                    </figure>
                  ))}
                </div>
              ) : null}
            </article>
          </div>
        ) : null}

        {myIsJourneyDetailVisible && myActiveJourney ? (
          <div
            className={myIsJourneyDetailClosing ? "myJourneyDetailOverlay myIsClosing" : "myJourneyDetailOverlay"}
            onClick={myCloseJourneyDetails}
          >
            <article
              className={myIsJourneyDetailClosing ? "myJourneyDetailModal myIsClosing" : "myJourneyDetailModal"}
              onClick={(myEvent) => myEvent.stopPropagation()}
            >
              <div className="myJourneyDetailHead">
                <h3 className="myProjectTitle">{myActiveJourney.myDetailTitle}</h3>
                <button
                  type="button"
                  className="myJourneyDetailClose"
                  aria-label="Close"
                  onClick={myCloseJourneyDetails}
                >
                  ×
                </button>
              </div>
              <p className="mySectionText myJourneyDetailText">{myActiveJourney.myDetailText}</p>
            </article>
          </div>
        ) : null}

        <section id="mySkills" className="mySection">
          <MySectionTitle
            myTitle={myText.myExpertiseSection.myTitle}
            mySubtitle={myText.myExpertiseSection.mySubtitle}
          />
          <div className="myProjectCarousel">
            <div className="myProjectViewport">
              <div
                className="myProjectTrack"
                style={{ transform: `translateX(-${myExpertisePage * 100}%)` }}
              >
                {myExpertisePages.map((myPage, myPageIndex) => (
                  <div key={`my-expertise-page-${myPageIndex}`} className="myProjectPage">
                    <div className="myExpertiseGrid">
                      {myPage.map(({ myItem, myIndex }) => (
                        <article key={myItem.myTitle} className="myProjectCard">
                          <h3 className="myProjectTitle"><span className="myCardIcon">{["◍", "◔", "◌", "✦", "▣", "◡", "◈", "◎", "⬢", "◉"][myIndex % 10]}</span>{myItem.myTitle}</h3>
                          <p className="myProjectText">{myItem.myText}</p>
                          <div className="myChipRow">
                            {myItem.myTags.map((myTag) => (
                              <span key={myTag} className="myChip">{myTag}</span>
                            ))}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="myProjectControls">
              <button
                type="button"
                className="myProjectControlButton"
                onClick={myHandleExpertisePrev}
                disabled={myExpertisePage === 0}
                aria-label={myText.myExpertiseSection.myPrevAriaLabel}
              >
                {myText.myExpertiseSection.myPrevLabel}
              </button>
              <span className="myProjectControlInfo">{myExpertisePage + 1} / {Math.max(1, myExpertisePageCount)}</span>
              <button
                type="button"
                className="myProjectControlButton"
                onClick={myHandleExpertiseNext}
                disabled={myExpertisePage >= myExpertisePageCount - 1}
                aria-label={myText.myExpertiseSection.myNextAriaLabel}
              >
                {myText.myExpertiseSection.myNextLabel}
              </button>
            </div>
          </div>
        </section>

        <section id="myExperience" className="mySection">
          <MySectionTitle myTitle={myText.myExperienceSection.myTitle} mySubtitle={myText.myExperienceSection.mySubtitle} />
          <div className="myTimelineCol">
            {myText.myExperienceSection.myItems.map((myItem, myIndex) => (
              <MyTimelineItem key={`${myItem.myTitle}-${myIndex}`} myItem={myItem} />
            ))}
          </div>
        </section>

        <section id="myEducation" className="mySection">
          <MySectionTitle myTitle={myText.myEducationSection.myTitle} />
          <div className="myTimelineGrid">
            <article className="myTimelineItem">
              <h3 className="myProjectTitle">{myText.myEducationSection.myEducationTitle}</h3>
              <div className="myTimelineCol">
                {myText.myEducationSection.myItems.map((myItem, myIndex) => (
                  <MyTimelineItem
                    key={`${myItem.myTitle}-${myIndex}`}
                    myItem={myItem}
                    myPreviewLabel={myItem.myDocuments && myItem.myDocuments.length > 0 ? myText.myEducationSection.myPreviewLabel : undefined}
                    myOnPreview={myItem.myDocuments && myItem.myDocuments.length > 0 ? () => myOpenCertificateDetails({
                      myTitle: myItem.myTitle,
                      myPlace: myItem.myPlace,
                      myPeriod: myItem.myPeriod,
                      mySummary: myItem.mySummary,
                      myDocuments: myItem.myDocuments ?? []
                    }) : undefined}
                  />
                ))}
              </div>
            </article>
            <article className="myTimelineItem">
              <h3 className="myProjectTitle">{myText.myEducationSection.myCertificatesTitle}</h3>
              <div className="myCertificatesList">
                {myText.myEducationSection.myCertificates.map((myCertificate, myIndex) => (
                  <article key={`${myCertificate.myTitle}-${myIndex}`} className="myCertificateItem">
                    <div className="myCertificateHead">
                      <div>
                        <h4 className="myCertificateTitle">{myCertificate.myTitle}</h4>
                        <p className="myTimelinePlace">{myCertificate.myPlace}</p>
                      </div>
                      <p className="mySmallLabel">{myCertificate.myPeriod}</p>
                    </div>
                    <p className="myProjectText">{myCertificate.mySummary}</p>
                    <button
                      type="button"
                      className="myCertificatePreviewButton"
                      onClick={() => myOpenCertificateDetails(myCertificate)}
                    >
                      {myText.myEducationSection.myPreviewLabel}
                    </button>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>

        {myIsCertificateDetailVisible && myActiveCertificate && myActiveCertificateDocument ? (
          <div
            className={myIsCertificateDetailClosing ? "myJourneyDetailOverlay myIsClosing" : "myJourneyDetailOverlay"}
            onClick={myCloseCertificateDetails}
          >
            <article
              className={myIsCertificateDetailClosing ? "myJourneyDetailModal myCertificateDetailModal myIsClosing" : "myJourneyDetailModal myCertificateDetailModal"}
              onClick={(myEvent) => myEvent.stopPropagation()}
            >
              <div className="myJourneyDetailHead">
                <h3 className="myProjectTitle">{myActiveCertificate.myTitle}</h3>
                <button
                  type="button"
                  className="myJourneyDetailClose"
                  aria-label={myText.myEducationSection.myClosePreviewLabel}
                  onClick={myCloseCertificateDetails}
                >
                  ×
                </button>
              </div>
              <p className="myTimelinePlace">{myActiveCertificate.myPlace}</p>
              <p className="mySmallLabel">{myActiveCertificate.myPeriod}</p>
              <p className="mySectionText myJourneyDetailText">{myActiveCertificate.mySummary}</p>

              {myActiveCertificate.myDocuments.length > 1 ? (
                <div className="myCertificateDocumentTabs">
                  {myActiveCertificate.myDocuments.map((myDocument, myDocumentIndex) => (
                    <button
                      key={`${myActiveCertificate.myTitle}-doc-${myDocumentIndex}`}
                      type="button"
                      className={myDocumentIndex === myActiveCertificateDocumentIndex ? "myCertificateDocTab myCertificateDocTabActive" : "myCertificateDocTab"}
                      onClick={() => setMyActiveCertificateDocumentIndex(myDocumentIndex)}
                    >
                      {myDocument.myLabel}
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="myCertificatePreviewFrame">
                {myActiveCertificateDocument.myFile.toLowerCase().endsWith(".pdf") ? (
                  <iframe
                    src={myActiveCertificateDocument.myFile}
                    title={`${myActiveCertificate.myTitle} document preview`}
                  />
                ) : (
                  <img
                    src={myActiveCertificateDocument.myFile}
                    alt={`${myActiveCertificate.myTitle} document`}
                    loading="lazy"
                  />
                )}
              </div>

              <div className="myCertificatePreviewActions">
                <a
                  className="myPrimaryButton"
                  href={myActiveCertificateDocument.myFile}
                  download={myActiveCertificateDocument.myDownloadName}
                >
                  {myText.myEducationSection.myDownloadLabel}
                </a>
              </div>
            </article>
          </div>
        ) : null}

        <section id="myContact" className="mySection myCtaSection">
          <h2 className="myCtaTitle">Let&apos;s build reliable systems.</h2>
          <div className="myContactLayout">
            <div className="myContactInfo myContactCard">
              <p className="mySectionText">{myText.myContactSection.myText}</p>
              <ul className="myContactOpportunityList">
                {myText.myContactSection.myOpportunityLines.map((myLine, myLineIndex) => (
                  <li key={`myContactLine-${myLineIndex}`} className="mySectionText myContactLine">{myLine}</li>
                ))}
              </ul>
            </div>
            <div className="myContactMetaCard">
              <ul className="myContactMessengerList">
                <li className="mySectionText myContactMeta"><span className="myContactIcon" aria-hidden="true">📱</span>{myText.myContactSection.myMobileLine}</li>
                <li className="mySectionText myContactMeta"><span className="myContactIcon" aria-hidden="true">✈️</span>{myText.myContactSection.myMessengerTelegram}</li>
                <li className="mySectionText myContactMeta"><span className="myContactIcon" aria-hidden="true">💬</span>{myText.myContactSection.myMessengerViber}</li>
                <li className="mySectionText myContactMeta"><span className="myContactIcon" aria-hidden="true">🟢</span>{myText.myContactSection.myMessengerWhatsApp}</li>
              </ul>
              <ul className="myContactAddressList">
                <li className="mySectionText myContactMeta myContactAddress"><span className="myContactIcon" aria-hidden="true">📍</span>{myText.myContactSection.myAddressCityLine}</li>
                <li className="mySectionText myContactMeta myContactAddress"><span className="myContactIcon" aria-hidden="true">🏠</span>{myText.myContactSection.myAddressStreetLine}</li>
              </ul>
            </div>
          </div>
          <div className="myButtonRow myCtaButtons">
            <a className="myPrimaryButton" href={`mailto:${myText.myContactSection.myEmail}`}>{myText.myContactSection.myEmailLabel}</a>
            <a className="mySecondaryButton" href={myText.myContactSection.myLinkedinUrl} target="_blank" rel="noreferrer">{myText.myContactSection.myLinkedinLabel}</a>
            <a className="mySecondaryButton" href={myText.myContactSection.myGithubUrl} target="_blank" rel="noreferrer">{myText.myContactSection.myGithubLabel}</a>
            <a className="mySecondaryButton" href={myText.myContactSection.myUpworkUrl} target="_blank" rel="noreferrer">{myText.myContactSection.myUpworkLabel}</a>
          </div>
        </section>
      </main>
    </div>
  );
}
  function myRenderJourneyPreview(myOrder: number, myIsDarkMode: boolean) {
    switch (myOrder) {
      case 0:
        return <MyEmbeddedSystemsPreview />;
      case 1:
        return <MyNanoLatticePreview />;
      case 2:
        return <MyVacuumDepositionPreview />;
      case 5:
        return <MyCodingPreview />;
      case 6:
        return <MyRealtimePulsePreview myIsDarkMode={myIsDarkMode} />;
      default:
        return <MyDataFlowPreview />;
    }
  }
