import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { MyHeader } from "./components/myHeader";
import { MyHeroSection } from "./components/myHeroSection";
import { MySectionTitle } from "./components/mySectionTitle";
import { MyTimelineItem } from "./components/myTimelineItem";
import { myDefaultLanguage, myLanguageOptions, myTranslations } from "./i18n/myI18n";
import type { myLanguageCode } from "./i18n/myTypes";
import { myExpertiseData, myJourneyData, mySelectedWorkData } from "./data/myShowcaseData";

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

  useEffect(() => {
    document.documentElement.lang = myLanguage;
    window.localStorage.setItem(myLanguageStorageKey, myLanguage);
  }, [myLanguage]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", myTheme);
    window.localStorage.setItem(myThemeStorageKey, myTheme);
  }, [myTheme]);

  const myText = useMemo(() => myTranslations[myLanguage], [myLanguage]);
  const myActiveJourney = myJourneyData[myDisplayedJourneyIndex];
  const myUiTransitionClass = myUiTransitionPhase === "idle"
    ? ""
    : `myUiTransitioning ${myUiTransitionType === "language" ? "myUiTransitionLanguage" : "myUiTransitionTheme"} ${myUiTransitionPhase === "exiting" ? "myUiTransitionExiting" : "myUiTransitionEntering"}`;

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
          myTitle={myText.myHero.myTitle}
          myDescription={myText.myHero.myDescription}
          myLocation={myText.myHero.myLocation}
          myPrimaryButton={myText.myHero.myPrimaryButton}
          mySecondaryButton={myText.myHero.mySecondaryButton}
          myDownloadLabel="Download CV"
        />

        <section id="myEngineering" className="mySection myJourneyVariantMesh myJourneyVariantAppleStrongCasual">
          <MySectionTitle
            myTitle="Engineering Journey"
            mySubtitle="From semiconductor clean rooms to App Store - a path shaped by precision engineering."
          />
          <div className="myJourneyLayout">
            <div className="myJourneyList">
              {myJourneyData.map((myItem, myIndex) => (
                <button
                  key={myItem.myTitle}
                  type="button"
                  className={myIndex === myActiveJourneyIndex ? "myJourneyButton myJourneyButtonActive" : "myJourneyButton"}
                  onClick={() => myHandleJourneyChange(myIndex)}
                >
                  {myItem.myTitle}
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
                <h3 className="myProjectTitle">{myActiveJourney.myTitle}</h3>
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
