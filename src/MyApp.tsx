import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { MyHeader } from "./components/myHeader";
import { MyHeroSection } from "./components/myHeroSection";
import { MySectionTitle } from "./components/mySectionTitle";
import { MyTimelineItem } from "./components/myTimelineItem";
import { myDefaultLanguage, myLanguageOptions, myTranslations } from "./i18n/myI18n";
import type { myLanguageCode } from "./i18n/myTypes";
import { myExpertiseData, mySelectedWorkData } from "./data/myShowcaseData";

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
    if (!myIsJourneyDetailVisible) {
      return;
    }
    function myHandleEsc(myEvent: KeyboardEvent) {
      if (myEvent.key === "Escape") {
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
  }, [myIsJourneyDetailVisible, myJourneyDetailPhase]);

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
          mySkillsVisible={myText.myHero.mySkillsVisible}
          mySkillsAll={myText.myHero.mySkillsAll}
          myPrimaryButton={myText.myHero.myPrimaryButton}
          mySecondaryButton={myText.myHero.mySecondaryButton}
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
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14 5h5v5M19 5l-8.5 8.5M13 5H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-5" />
                    </svg>
                  </button>
                </div>
                <p className="mySectionText">{myActiveJourney.myDescription}</p>
                <ul className="myPointList">
                  {myActiveJourney.myPoints.map((myPoint) => (
                    <li key={myPoint}>{myPoint}</li>
                  ))}
                </ul>
                <div className="myJourneyPreview" />
              </div>
            </article>
          </div>
        </section>

        <section id="myProjects" className="mySection">
          <MySectionTitle
            myTitle="Selected Work"
            mySubtitle="Products built with system-level thinking and attention to detail."
          />
          <div className="myProjectGrid myProjectGridWide">
            {mySelectedWorkData.map((myWork, myIndex) => (
              <article key={myWork.myTitle} className="myProjectCard">
                <h3 className="myProjectTitle"><span className="myCardIcon">{["◈", "◎", "⬢", "◉"][myIndex % 4]}</span>{myWork.myTitle}</h3>
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
        </section>

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
              <p className="mySectionText">{myActiveJourney.myDetailText}</p>
              <ul className="myPointList">
                {myActiveJourney.myPoints.map((myPoint) => (
                  <li key={myPoint}>{myPoint}</li>
                ))}
              </ul>
              <div className="myJourneyDetailGallery">
                {myActiveJourney.myDetailImages.map((myImage) => (
                  <figure key={myImage.mySrc} className="myJourneyDetailFigure">
                    <img src={myImage.mySrc} alt={myImage.myAlt} loading="lazy" />
                  </figure>
                ))}
              </div>
            </article>
          </div>
        ) : null}

        <section id="mySkills" className="mySection">
          <MySectionTitle
            myTitle="Expertise"
            mySubtitle="Deep specializations across the Apple ecosystem."
          />
          <div className="myExpertiseGrid">
            {myExpertiseData.map((myItem, myIndex) => (
              <article key={myItem.myTitle} className="myProjectCard">
                <h3 className="myProjectTitle"><span className="myCardIcon">{["◍", "◔", "◌", "✦", "▣", "◡"][myIndex % 6]}</span>{myItem.myTitle}</h3>
                <p className="myProjectText">{myItem.myText}</p>
                <div className="myChipRow">
                  {myItem.myTags.map((myTag) => (
                    <span key={myTag} className="myChip">{myTag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="myExperience" className="mySection">
          <MySectionTitle myTitle={myText.myExperienceSection.myTitle} mySubtitle="A journey from physical engineering to digital systems." />
          <div className="myTimelineCol">
            {myText.myExperienceSection.myItems.map((myItem, myIndex) => (
              <MyTimelineItem key={`${myItem.myTitle}-${myIndex}`} myItem={myItem} />
            ))}
          </div>
        </section>

        <section id="myEducation" className="mySection">
          <MySectionTitle myTitle="Education & Certificates" />
          <div className="myTimelineGrid">
            {myText.myEducationSection.myItems.map((myItem, myIndex) => (
              <MyTimelineItem key={`${myItem.myTitle}-${myIndex}`} myItem={myItem} />
            ))}
            <article className="myTimelineItem">
              <h3 className="myProjectTitle">Certifications</h3>
              <ul className="myPointList">
                <li>Electrical Safety Certificate</li>
                <li>Telecom Infrastructure</li>
                <li>Installation Permits (up to 1000V)</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="myContact" className="mySection myCtaSection">
          <h2 className="myCtaTitle">Let&apos;s build reliable systems.</h2>
          <p className="mySectionText">{myText.myContactSection.myText}</p>
          <div className="myButtonRow myCtaButtons">
            <a className="myPrimaryButton" href={`mailto:${myText.myContactSection.myEmail}`}>Email</a>
            <a className="mySecondaryButton" href={myText.myContactSection.myLinkedinUrl} target="_blank" rel="noreferrer">{myText.myContactSection.myLinkedinLabel}</a>
            <a className="mySecondaryButton" href={myText.myContactSection.myGithubUrl} target="_blank" rel="noreferrer">{myText.myContactSection.myGithubLabel}</a>
          </div>
        </section>
      </main>
    </div>
  );
}
