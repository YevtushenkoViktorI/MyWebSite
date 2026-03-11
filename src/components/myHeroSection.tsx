import { useEffect, useMemo, useState } from "react";

type myHeroSectionProps = {
  myGreeting: string;
  myName: string;
  myHeadlineLineOne: string;
  myHeadlineLineTwo: string;
  myTitle: string;
  myDescription: string;
  myLocation: string;
  myStatusLabel: string;
  myMoreSkillsLabel: string;
  mySkillsModalTitle: string;
  mySkillsVisible: string[];
  mySkillsAll: string[];
  myPrimaryButton: string;
  mySecondaryButton: string;
  myDownloadLabel: string;
};

export function MyHeroSection({
  myGreeting,
  myName,
  myHeadlineLineOne,
  myHeadlineLineTwo,
  myTitle,
  myDescription,
  myLocation,
  myStatusLabel,
  myMoreSkillsLabel,
  mySkillsModalTitle,
  mySkillsVisible,
  mySkillsAll,
  myPrimaryButton,
  mySecondaryButton,
  myDownloadLabel
}: myHeroSectionProps) {
  const [mySkillsModalPhase, setMySkillsModalPhase] = useState<"closed" | "open" | "closing">("closed");
  const myIsSkillsModalVisible = mySkillsModalPhase !== "closed";
  const myIsSkillsModalClosing = mySkillsModalPhase === "closing";
  const myModalSkills = useMemo(() => {
    const mySet = new Set(mySkillsAll);
    return Array.from(mySet);
  }, [mySkillsAll]);

  useEffect(() => {
    if (!myIsSkillsModalVisible) {
      return;
    }

    function myHandleEsc(myEvent: KeyboardEvent) {
      if (myEvent.key === "Escape") {
        myCloseSkillsModal();
      }
    }

    const myOriginalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", myHandleEsc);

    return () => {
      document.body.style.overflow = myOriginalOverflow;
      window.removeEventListener("keydown", myHandleEsc);
    };
  }, [myIsSkillsModalVisible]);

  function myOpenSkillsModal() {
    setMySkillsModalPhase("open");
  }

  function myCloseSkillsModal() {
    if (mySkillsModalPhase === "closed" || mySkillsModalPhase === "closing") {
      return;
    }
    setMySkillsModalPhase("closing");

    const myShouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const myCloseDelay = myShouldReduceMotion ? 0 : 300;
    window.setTimeout(() => {
      setMySkillsModalPhase("closed");
    }, myCloseDelay);
  }

  return (
    <>
      <section id="myOverview" className="myHeroSectionWrap mySection">
        <div className="myHeroContent">
          <h1 className="myHeroName">{myHeadlineLineOne}</h1>
          <h2 className="myHeroGradientTitle">{myHeadlineLineTwo}</h2>
          <p className="myHeroText">{myDescription}</p>
          <div className="myChipRow">
            {mySkillsVisible.map((myTag) => (
              <span key={myTag} className="myChip">{myTag}</span>
            ))}
            <button type="button" className="myChip myChipButton" onClick={myOpenSkillsModal}>
              {myMoreSkillsLabel}
            </button>
          </div>

          <div className="myButtonRow">
            <a className="myPrimaryButton" href="#myProjects">{myPrimaryButton}</a>
            <a className="mySecondaryButton" href="/YevtushenkoCV.pdf" download="Viktor-Yevtushenko-CV.pdf">{myDownloadLabel}</a>
            <a className="myLinkButton" href="#myContact">{mySecondaryButton}</a>
          </div>
        </div>

        <div className="myHeroVisual">
          <div className="myHeroPhoto" />
          <div className="myStatusCard">
            <span className="myStatusDot" />
            {myStatusLabel}
          </div>
        </div>
      </section>

      {myIsSkillsModalVisible ? (
        <div className={myIsSkillsModalClosing ? "mySkillsModalOverlay myIsClosing" : "mySkillsModalOverlay"} onClick={myCloseSkillsModal}>
          <div
            className={myIsSkillsModalClosing ? "mySkillsModal myIsClosing" : "mySkillsModal"}
            role="dialog"
            aria-modal="true"
            aria-label={mySkillsModalTitle}
            onClick={(myEvent) => myEvent.stopPropagation()}
          >
            <div className="mySkillsModalHeader">
              <h3 className="myProjectTitle">{mySkillsModalTitle}</h3>
              <button
                type="button"
                className="mySkillsModalClose"
                aria-label="Close"
                onClick={myCloseSkillsModal}
              >
                ×
              </button>
            </div>
            <div className="myChipRow">
              {myModalSkills.map((myTag) => (
                <span key={myTag} className="myChip">{myTag}</span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
