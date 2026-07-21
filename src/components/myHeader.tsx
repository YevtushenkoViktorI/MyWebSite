import { MyLanguageSelect } from "./myLanguageSelect";
import type { myLanguageCode } from "../i18n/myTypes";
import type { MouseEvent } from "react";

type myHeaderProps = {
  myLogoText: string;
  myNav: {
    myAbout: string;
    myProjects: string;
    mySkills: string;
    myExperience: string;
    myEducation: string;
    myContact: string;
  };
  myLanguageValue: myLanguageCode;
  myLanguageLabel: string;
  myOnLanguageChange: (myLanguage: myLanguageCode) => void;
  myIsDarkMode: boolean;
  myOnThemeToggle: () => void;
  myDownloadLabel: string;
};

export function MyHeader({
  myLogoText,
  myNav,
  myLanguageValue,
  myLanguageLabel,
  myOnLanguageChange,
  myIsDarkMode,
  myOnThemeToggle,
  myDownloadLabel
}: myHeaderProps) {
  const myHandleAnchorClick = (myEvent: MouseEvent<HTMLAnchorElement>, myHash: string) => {
    if (
      myEvent.defaultPrevented ||
      myEvent.button !== 0 ||
      myEvent.metaKey ||
      myEvent.ctrlKey ||
      myEvent.shiftKey ||
      myEvent.altKey
    ) {
      return;
    }

    const myTarget = document.querySelector(myHash) as HTMLElement | null;
    if (!myTarget) {
      return;
    }

    myEvent.preventDefault();

    const myHeader = document.querySelector(".myHeader") as HTMLElement | null;
    const myHeaderHeight = myHeader?.getBoundingClientRect().height ?? 0;
    const myExtraGap = 14;
    const myTargetTop = myTarget.getBoundingClientRect().top + window.scrollY - myHeaderHeight - myExtraGap;

    window.scrollTo({
      top: Math.max(myTargetTop, 0),
      behavior: "smooth"
    });

    window.history.replaceState(null, "", myHash);
  };

  return (
    <header className="myHeader">
      <div className="myContainer myHeaderRow">
        <a className="myLogo" href="#myTop" onClick={(myEvent) => myHandleAnchorClick(myEvent, "#myTop")}>
          {myLogoText}
        </a>

        <nav className="myNav" aria-label="Main">
          <a href="#myOverview" onClick={(myEvent) => myHandleAnchorClick(myEvent, "#myOverview")}>{myNav.myAbout}</a>
          <a href="#myEngineering" onClick={(myEvent) => myHandleAnchorClick(myEvent, "#myEngineering")}>{myNav.mySkills}</a>
          <a href="#myProjects" onClick={(myEvent) => myHandleAnchorClick(myEvent, "#myProjects")}>{myNav.myProjects}</a>
          <a href="#myExperience" onClick={(myEvent) => myHandleAnchorClick(myEvent, "#myExperience")}>{myNav.myExperience}</a>
          <a href="#myEducation" onClick={(myEvent) => myHandleAnchorClick(myEvent, "#myEducation")}>{myNav.myEducation}</a>
          <a href="#myContact" onClick={(myEvent) => myHandleAnchorClick(myEvent, "#myContact")}>{myNav.myContact}</a>
        </nav>

        <div className="myHeaderActions">
          <button type="button" className="myIconButton" onClick={myOnThemeToggle} aria-label="Toggle theme">
            {myIsDarkMode ? "☀" : "☾"}
          </button>

          <MyLanguageSelect
            myValue={myLanguageValue}
            myLabel={myLanguageLabel}
            myOnChange={myOnLanguageChange}
          />
        </div>
      </div>
    </header>
  );
}
