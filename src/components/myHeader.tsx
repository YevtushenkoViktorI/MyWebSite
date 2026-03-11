import { MyLanguageSelect } from "./myLanguageSelect";
import type { myLanguageCode } from "../i18n/myTypes";

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
  return (
    <header className="myHeader">
      <div className="myContainer myHeaderRow">
        <a className="myLogo" href="#myTop">{myLogoText}</a>

        <nav className="myNav" aria-label="Main">
          <a href="#myOverview">{myNav.myAbout}</a>
          <a href="#myEngineering">Engineering</a>
          <a href="#myProjects">{myNav.myProjects}</a>
          <a href="#myExperience">{myNav.myExperience}</a>
          <a href="#myEducation">{myNav.myEducation}</a>
          <a href="#myContact">{myNav.myContact}</a>
        </nav>

        <div className="myHeaderActions">
          <button type="button" className="myIconButton" onClick={myOnThemeToggle} aria-label="Toggle theme">
            {myIsDarkMode ? "☀" : "☾"}
          </button>

          <a href="/YevtushenkoCV.pdf" download="Viktor-Yevtushenko-CV.pdf" className="myPrimaryButton myHeaderCta">{myDownloadLabel}</a>

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
