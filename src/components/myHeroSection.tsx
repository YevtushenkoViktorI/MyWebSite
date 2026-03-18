import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

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
  myHeroDetailTriggerLabel: string;
  myHeroDetailTitle: string;
  myHeroDetailParagraphs: string[];
  myHeroDetailInterestsTitle: string;
  myHeroDetailInterests: string[];
  myHeroDetailClosing: string;
  myHeroDetailCloseLabel: string;
  mySkillsVisible: string[];
  mySkillsAll: string[];
  myPrimaryButton: string;
  mySecondaryButton: string;
  myPortfolioButton: string;
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
  myHeroDetailTriggerLabel,
  myHeroDetailTitle,
  myHeroDetailParagraphs,
  myHeroDetailInterestsTitle,
  myHeroDetailInterests,
  myHeroDetailClosing,
  myHeroDetailCloseLabel,
  mySkillsVisible,
  mySkillsAll,
  myPrimaryButton,
  mySecondaryButton,
  myPortfolioButton,
  myDownloadLabel
}: myHeroSectionProps) {
  const [mySkillsModalPhase, setMySkillsModalPhase] = useState<"closed" | "open" | "closing">("closed");
  const [myHeroDetailPhase, setMyHeroDetailPhase] = useState<"closed" | "open" | "closing">("closed");
  const [myChipMeasureWidth, setMyChipMeasureWidth] = useState(0);
  const [myVisibleSkillCount, setMyVisibleSkillCount] = useState(mySkillsVisible.length);
  const myIsSkillsModalVisible = mySkillsModalPhase !== "closed";
  const myIsSkillsModalClosing = mySkillsModalPhase === "closing";
  const myIsHeroDetailVisible = myHeroDetailPhase !== "closed";
  const myIsHeroDetailClosing = myHeroDetailPhase === "closing";
  const myChipWrapRef = useRef<HTMLDivElement | null>(null);
  const myChipMeasureRef = useRef<HTMLDivElement | null>(null);
  const myModalSkills = useMemo(() => {
    const mySet = new Set(mySkillsAll);
    return Array.from(mySet);
  }, [mySkillsAll]);
  const myInlineSkills = useMemo(
    () => mySkillsVisible.slice(0, myVisibleSkillCount),
    [mySkillsVisible, myVisibleSkillCount]
  );

  useEffect(() => {
    if (!myIsHeroDetailVisible && !myIsSkillsModalVisible) {
      return;
    }

    function myHandleEsc(myEvent: KeyboardEvent) {
      if (myEvent.key === "Escape") {
        if (myIsHeroDetailVisible) {
          myCloseHeroDetail();
          return;
        }
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
  }, [myIsHeroDetailVisible, myIsSkillsModalVisible]);

  useEffect(() => {
    const myElement = myChipWrapRef.current;

    if (!myElement) {
      return;
    }

    const mySyncWidth = () => {
      setMyChipMeasureWidth(myElement.clientWidth);
    };

    mySyncWidth();

    const myResizeObserver = new ResizeObserver(() => {
      mySyncWidth();
    });

    myResizeObserver.observe(myElement);

    return () => {
      myResizeObserver.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const myMeasureElement = myChipMeasureRef.current;

    if (!myMeasureElement || myChipMeasureWidth === 0) {
      return;
    }

    const mySkillElements = Array.from(
      myMeasureElement.querySelectorAll<HTMLElement>("[data-my-skill-measure='item']")
    );
    const myMoreElement = myMeasureElement.querySelector<HTMLElement>("[data-my-skill-measure='more']");

    if (mySkillElements.length === 0 || !myMoreElement) {
      setMyVisibleSkillCount(mySkillsVisible.length);
      return;
    }

    const myStyles = window.getComputedStyle(myMeasureElement);
    const myGap = Number.parseFloat(myStyles.columnGap || myStyles.gap || "0") || 0;
    const myWidths = mySkillElements.map((myElement) => myElement.offsetWidth);
    const myMoreWidth = myMoreElement.offsetWidth;

    const myFitsTwoRows = (myCount: number) => {
      let myRow = 1;
      let myCurrentWidth = 0;

      for (const myWidth of [...myWidths.slice(0, myCount), myMoreWidth]) {
        const myRequiredWidth = myCurrentWidth === 0 ? myWidth : myCurrentWidth + myGap + myWidth;

        if (myRequiredWidth <= myChipMeasureWidth) {
          myCurrentWidth = myRequiredWidth;
          continue;
        }

        myRow += 1;
        if (myRow > 2) {
          return false;
        }
        myCurrentWidth = myWidth;
      }

      return true;
    };

    for (let myCount = mySkillsVisible.length; myCount >= 0; myCount -= 1) {
      if (myFitsTwoRows(myCount)) {
        setMyVisibleSkillCount(myCount);
        return;
      }
    }

    setMyVisibleSkillCount(0);
  }, [myChipMeasureWidth, myMoreSkillsLabel, mySkillsVisible]);

  function myOpenHeroDetail() {
    setMyHeroDetailPhase("open");
  }

  function myOpenSkillsModal() {
    setMySkillsModalPhase("open");
  }

  function myCloseHeroDetail() {
    if (myHeroDetailPhase === "closed" || myHeroDetailPhase === "closing") {
      return;
    }
    setMyHeroDetailPhase("closing");

    const myShouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const myCloseDelay = myShouldReduceMotion ? 0 : 300;
    window.setTimeout(() => {
      setMyHeroDetailPhase("closed");
    }, myCloseDelay);
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
          <p className="myHeroText">
            {myDescription}{" "}
            <button
              type="button"
              className="myHeroDetailTrigger"
              onClick={myOpenHeroDetail}
              aria-label={myHeroDetailTitle}
            >
              {myHeroDetailTriggerLabel}
            </button>
          </p>
          <div className="myChipRowWrap" ref={myChipWrapRef}>
            <div className="myChipRow">
              {myInlineSkills.map((myTag) => (
                <span key={myTag} className="myChip">{myTag}</span>
              ))}
              <button type="button" className="myChip myChipButton" onClick={myOpenSkillsModal}>
                {myMoreSkillsLabel}
              </button>
            </div>
            <div
              className="myChipRow myChipRowMeasure"
              ref={myChipMeasureRef}
              aria-hidden="true"
              style={myChipMeasureWidth > 0 ? { width: `${myChipMeasureWidth}px` } : undefined}
            >
              {mySkillsVisible.map((myTag) => (
                <span key={myTag} className="myChip" data-my-skill-measure="item">{myTag}</span>
              ))}
              <span className="myChip myChipButton" data-my-skill-measure="more">
                {myMoreSkillsLabel}
              </span>
            </div>
          </div>

          <div className="myButtonRow">
            <a className="myPrimaryButton" href="#myProjects">{myPrimaryButton}</a>
            <a className="mySecondaryButton" href="/YevtushenkoCV.pdf" download="Viktor-Yevtushenko-CV.pdf">{myDownloadLabel}</a>
            <a className="mySecondaryButton" href="/Portfolio2026.pdf" download="Viktor-Yevtushenko-Portfolio-2026.pdf">{myPortfolioButton}</a>
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

      {myIsHeroDetailVisible ? (
        <div
          className={myIsHeroDetailClosing ? "myJourneyDetailOverlay myIsClosing" : "myJourneyDetailOverlay"}
          onClick={myCloseHeroDetail}
        >
          <div
            className={myIsHeroDetailClosing ? "myJourneyDetailModal myIsClosing" : "myJourneyDetailModal"}
            role="dialog"
            aria-modal="true"
            aria-label={myHeroDetailTitle}
            onClick={(myEvent) => myEvent.stopPropagation()}
          >
            <div className="myJourneyDetailHead">
              <h3 className="myProjectTitle">{myHeroDetailTitle}</h3>
              <button
                type="button"
                className="myJourneyDetailClose"
                aria-label={myHeroDetailCloseLabel}
                onClick={myCloseHeroDetail}
              >
                ×
              </button>
            </div>
            <div className="myHeroDetailBody">
              {myHeroDetailParagraphs.map((myParagraph) => (
                <p key={myParagraph} className="mySectionText myHeroDetailParagraph">{myParagraph}</p>
              ))}
              <p className="mySectionText myHeroDetailHeading">{myHeroDetailInterestsTitle}</p>
              <ul className="myHeroDetailList">
                {myHeroDetailInterests.map((myInterest) => (
                  <li key={myInterest} className="mySectionText">{myInterest}</li>
                ))}
              </ul>
              <p className="mySectionText myHeroDetailParagraph">{myHeroDetailClosing}</p>
            </div>
          </div>
        </div>
      ) : null}

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
                aria-label={myHeroDetailCloseLabel}
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
