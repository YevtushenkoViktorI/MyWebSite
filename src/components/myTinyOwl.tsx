import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { myAssetPath } from "../utils/myAssetPath";

type myOwlAction = "idle" | "lookLeft" | "lookRight" | "watchUp" | "watchDown" | "ruffle" | "takeoff" | "landing";
type myOwlPhase = "perched" | "preparing" | "flying" | "landing";
type myOwlCorner = "header" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
type myOwlFlightReason = "scroll" | "idle";

type myOwlPerch = {
  myX: number;
  myY: number;
  mySectionId: string;
  myCorner: myOwlCorner;
};

type myOwlFlight = {
  myId: number;
  myStart: myOwlPerch;
  myTarget: myOwlPerch;
  myDuration: number;
};

const mySectionIds = ["myOverview", "myEngineering", "myProjects", "mySkills", "myExperience", "myEducation", "myContact"];
const myIdleCornerOrder: myOwlCorner[] = ["topRight", "bottomRight", "topLeft", "bottomLeft"];
const myTakeoffLaunchDelay = 620;
const myTakeoffHandoffDelay = 1080;
const myLandingOverlapDuration = 620;
const myLandingSettleDuration = 1120;
const mySnowyFlightAnimation = "/mascot/owl-snowy-flight-seamless-60fps.webp";
const myBlackFlightAnimation = "/mascot/owl-black-flight-seamless-60fps.webp";

function myClamp(myValue: number, myMinimum: number, myMaximum: number): number {
  return Math.min(Math.max(myValue, myMinimum), myMaximum);
}

function myDistance(myStart: myOwlPerch, myTarget: myOwlPerch): number {
  return Math.hypot(myTarget.myX - myStart.myX, myTarget.myY - myStart.myY);
}

function myFindActiveSection(): HTMLElement | null {
  const mySections = Array.from(document.querySelectorAll<HTMLElement>("main .mySection[id]"));
  const myViewportHeight = window.innerHeight;
  let myBestSection: HTMLElement | null = null;
  let myBestScore = -1;

  for (const mySection of mySections) {
    const myRect = mySection.getBoundingClientRect();
    const myVisibleHeight = Math.max(0, Math.min(myRect.bottom, myViewportHeight) - Math.max(myRect.top, 0));
    const myCenterDistance = Math.abs((myRect.top + myRect.bottom) / 2 - myViewportHeight / 2);
    const myScore = myVisibleHeight - myCenterDistance * 0.12;

    if (myScore > myBestScore) {
      myBestScore = myScore;
      myBestSection = mySection;
    }
  }

  return myBestSection;
}

function myGetSectionPerch(mySection: HTMLElement, myCorner: myOwlCorner): myOwlPerch {
  const myRect = mySection.getBoundingClientRect();
  const myHeaderBottom = document.querySelector<HTMLElement>(".myHeader")?.getBoundingClientRect().bottom ?? 78;
  const myViewportWidth = window.innerWidth;
  const myViewportHeight = window.innerHeight;
  const myHorizontalInset = myViewportWidth <= 600 ? 25 : 32;
  const myTopLimit = myHeaderBottom + 28;
  const myBottomLimit = myViewportHeight - 38;
  const myVisibleTop = Math.max(myRect.top, myTopLimit);
  const myVisibleBottom = Math.min(myRect.bottom, myBottomLimit);
  const myLeft = myClamp(myRect.left + myHorizontalInset, 26, myViewportWidth - 26);
  const myRight = myClamp(myRect.right - myHorizontalInset, 26, myViewportWidth - 26);
  const myTop = myClamp(myVisibleTop + 36, myTopLimit, myBottomLimit);
  const myBottom = myClamp(Math.max(myVisibleTop + 44, myVisibleBottom - 42), myTopLimit, myBottomLimit);

  return {
    myX: myCorner === "topLeft" || myCorner === "bottomLeft" ? myLeft : myRight,
    myY: myCorner === "bottomLeft" || myCorner === "bottomRight" ? myBottom : myTop,
    mySectionId: mySection.id,
    myCorner
  };
}

function myGetScrollCorner(mySectionId: string, myCurrentCorner: myOwlCorner): myOwlCorner {
  const mySectionIndex = Math.max(0, mySectionIds.indexOf(mySectionId));
  const myPreferredCorner: myOwlCorner = mySectionIndex % 2 === 0 ? "topRight" : "topLeft";

  if (myPreferredCorner === myCurrentCorner) {
    return myPreferredCorner === "topRight" ? "topLeft" : "topRight";
  }
  return myPreferredCorner;
}

function myGetNextIdleCorner(myCurrentCorner: myOwlCorner): myOwlCorner {
  const myCurrentIndex = myIdleCornerOrder.indexOf(myCurrentCorner);
  return myIdleCornerOrder[(myCurrentIndex + 1 + myIdleCornerOrder.length) % myIdleCornerOrder.length];
}

export function MyTinyOwl() {
  const [myAction, setMyAction] = useState<myOwlAction>("idle");
  const [myPhase, setMyPhase] = useState<myOwlPhase>("perched");
  const [myPerch, setMyPerch] = useState<myOwlPerch | null>(null);
  const [myFlight, setMyFlight] = useState<myOwlFlight | null>(null);
  const myPlaceholderRef = useRef<HTMLSpanElement | null>(null);
  const myFlightBirdRef = useRef<HTMLSpanElement | null>(null);
  const myPerchRef = useRef<myOwlPerch | null>(null);
  const myPhaseRef = useRef<myOwlPhase>("perched");
  const myPendingPerchRef = useRef<{ myPerch: myOwlPerch; myReason: myOwlFlightReason } | null>(null);
  const myActiveSectionIdRef = useRef("myOverview");
  const myLastScrollYRef = useRef(0);
  const myLastInteractionAtRef = useRef(Date.now());
  const myFlightIdRef = useRef(0);
  const myReducedMotionRef = useRef(false);
  const myPrepareTimerRef = useRef(0);
  const myTakeoffHandoffTimerRef = useRef(0);
  const myFlightTimerRef = useRef(0);
  const myFlightEndTimerRef = useRef(0);
  const myLandingTimerRef = useRef(0);
  const myActionResetTimerRef = useRef(0);
  const myBeginFlightRef = useRef<(myTarget: myOwlPerch, myReason: myOwlFlightReason) => void>(() => undefined);

  const myUpdatePerch = useCallback((myNextPerch: myOwlPerch) => {
    myPerchRef.current = myNextPerch;
    setMyPerch(myNextPerch);
  }, []);

  const myUpdatePhase = useCallback((myNextPhase: myOwlPhase) => {
    myPhaseRef.current = myNextPhase;
    setMyPhase(myNextPhase);
  }, []);

  const myBeginFlight = useCallback((myTarget: myOwlPerch, myReason: myOwlFlightReason) => {
    const myCurrentPerch = myPerchRef.current;
    if (!myCurrentPerch || myReducedMotionRef.current) {
      return;
    }

    if (myPhaseRef.current !== "perched") {
      myPendingPerchRef.current = { myPerch: myTarget, myReason };
      return;
    }

    const myTravelDistance = myDistance(myCurrentPerch, myTarget);
    if (myTravelDistance < 42) {
      myUpdatePerch(myTarget);
      setMyAction("idle");
      return;
    }

    window.clearTimeout(myActionResetTimerRef.current);
    myUpdatePhase("preparing");
    setMyAction("takeoff");

    myPrepareTimerRef.current = window.setTimeout(() => {
      const myDuration = myClamp(1500 + myTravelDistance / 145 * 1000, 3200, 6200);
      const myNextFlight: myOwlFlight = {
        myId: ++myFlightIdRef.current,
        myStart: myCurrentPerch,
        myTarget,
        myDuration
      };

      setMyFlight(myNextFlight);
      myFlightTimerRef.current = window.setTimeout(() => {
        myUpdatePerch(myTarget);
        myUpdatePhase("landing");
        setMyAction("landing");
      }, myDuration - myLandingOverlapDuration);

      myFlightEndTimerRef.current = window.setTimeout(() => {
        setMyFlight(null);
      }, myDuration);

      myLandingTimerRef.current = window.setTimeout(() => {
        myUpdatePhase("perched");
        setMyAction("idle");

        const myPendingPerch = myPendingPerchRef.current;
        myPendingPerchRef.current = null;
        if (myPendingPerch && myDistance(myTarget, myPendingPerch.myPerch) >= 42) {
          window.setTimeout(() => myBeginFlightRef.current(myPendingPerch.myPerch, myPendingPerch.myReason), 500);
        }
      }, myDuration - myLandingOverlapDuration + myLandingSettleDuration);
    }, myTakeoffLaunchDelay);

    myTakeoffHandoffTimerRef.current = window.setTimeout(() => {
      if (myPhaseRef.current === "preparing") {
        myUpdatePhase("flying");
        myActionResetTimerRef.current = window.setTimeout(() => setMyAction("idle"), 360);
      }
    }, myTakeoffHandoffDelay);
  }, [myUpdatePerch, myUpdatePhase]);

  myBeginFlightRef.current = myBeginFlight;

  useLayoutEffect(() => {
    const myPlaceholder = myPlaceholderRef.current;
    if (!myPlaceholder) {
      return;
    }

    const myRect = myPlaceholder.getBoundingClientRect();
    myUpdatePerch({
      myX: myRect.left + myRect.width / 2,
      myY: myRect.top + myRect.height / 2,
      mySectionId: "myHeader",
      myCorner: "header"
    });
    myLastScrollYRef.current = window.scrollY;
  }, [myUpdatePerch]);

  useEffect(() => {
    myReducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (myReducedMotionRef.current) {
      return;
    }

    let myScrollStopTimer = 0;
    let myMicroActionTimer = 0;
    let myIdleTravelTimer = 0;

    const myScheduleMicroAction = () => {
      window.clearTimeout(myMicroActionTimer);
      myMicroActionTimer = window.setTimeout(() => {
        if (myPhaseRef.current === "perched" && Date.now() - myLastInteractionAtRef.current > 1400) {
          const myChance = Math.random();
          const myNextAction: myOwlAction = myChance < 0.4
            ? "lookLeft"
            : myChance < 0.8
              ? "lookRight"
              : "ruffle";
          const myActionDuration = myNextAction === "ruffle" ? 1800 : 3000 + Math.random() * 1400;

          setMyAction(myNextAction);
          window.clearTimeout(myActionResetTimerRef.current);
          myActionResetTimerRef.current = window.setTimeout(() => setMyAction("idle"), myActionDuration);
        }
        myScheduleMicroAction();
      }, 4800 + Math.random() * 5200);
    };

    const myScheduleIdleTravel = () => {
      window.clearTimeout(myIdleTravelTimer);
      myIdleTravelTimer = window.setTimeout(() => {
        if (myPhaseRef.current === "perched" && Date.now() - myLastInteractionAtRef.current >= 15000) {
          const myActiveSection = document.getElementById(myActiveSectionIdRef.current) ?? myFindActiveSection();
          const myCurrentPerch = myPerchRef.current;
          if (myActiveSection && myCurrentPerch) {
            const myNextCorner = myGetNextIdleCorner(myCurrentPerch.myCorner);
            myBeginFlightRef.current(myGetSectionPerch(myActiveSection, myNextCorner), "idle");
          }
        }
        myScheduleIdleTravel();
      }, 16000 + Math.random() * 12000);
    };

    const myHandleScroll = () => {
      const myCurrentScrollY = window.scrollY;
      const myIsScrollingDown = myCurrentScrollY >= myLastScrollYRef.current;
      myLastScrollYRef.current = myCurrentScrollY;
      myLastInteractionAtRef.current = Date.now();

      if (myPhaseRef.current === "perched") {
        setMyAction(myIsScrollingDown ? "watchDown" : "watchUp");
      }

      window.clearTimeout(myScrollStopTimer);
      window.clearTimeout(myIdleTravelTimer);
      myScrollStopTimer = window.setTimeout(() => {
        const myActiveSection = myFindActiveSection();
        const myCurrentPerch = myPerchRef.current;
        if (!myActiveSection || !myCurrentPerch) {
          return;
        }

        myActiveSectionIdRef.current = myActiveSection.id;
        const myTargetCorner = myGetScrollCorner(myActiveSection.id, myCurrentPerch.myCorner);
        myBeginFlightRef.current(myGetSectionPerch(myActiveSection, myTargetCorner), "scroll");
        myScheduleIdleTravel();
      }, 680);
    };

    const myHandleResize = () => {
      const myCurrentPerch = myPerchRef.current;
      if (!myCurrentPerch || myPhaseRef.current !== "perched") {
        return;
      }

      if (myCurrentPerch.myCorner === "header") {
        const myRect = myPlaceholderRef.current?.getBoundingClientRect();
        if (myRect) {
          myUpdatePerch({ ...myCurrentPerch, myX: myRect.left + myRect.width / 2, myY: myRect.top + myRect.height / 2 });
        }
        return;
      }

      const mySection = document.getElementById(myCurrentPerch.mySectionId);
      if (mySection) {
        myUpdatePerch(myGetSectionPerch(mySection, myCurrentPerch.myCorner));
      }
    };

    window.addEventListener("scroll", myHandleScroll, { passive: true });
    window.addEventListener("resize", myHandleResize);
    myScheduleMicroAction();
    myScheduleIdleTravel();

    return () => {
      window.removeEventListener("scroll", myHandleScroll);
      window.removeEventListener("resize", myHandleResize);
      window.clearTimeout(myScrollStopTimer);
      window.clearTimeout(myMicroActionTimer);
      window.clearTimeout(myIdleTravelTimer);
    };
  }, [myUpdatePerch]);

  useEffect(() => {
    const myBird = myFlightBirdRef.current;
    if (!myFlight || !myBird) {
      return;
    }

    const myStart = myFlight.myStart;
    const myTarget = myFlight.myTarget;
    const myDeltaX = myTarget.myX - myStart.myX;
    const myDeltaY = myTarget.myY - myStart.myY;
    const myTravelDistance = Math.hypot(myDeltaX, myDeltaY);
    const myDirection = Math.sign(myDeltaX || 1);
    const myLift = myClamp(myTravelDistance * 0.2, 72, 175);
    const myFlightWidth = myBird.parentElement?.getBoundingClientRect().width ?? 124;
    const myFlightHeight = myFlightWidth * 0.75;
    const myNeedsSideArc = Math.abs(myDeltaX) < 120;
    const mySideArc = myNeedsSideArc ? (myTarget.myX > window.innerWidth / 2 ? -92 : 92) : 0;
    const myControlOne = {
      myX: myStart.myX + myDeltaX * 0.3 + mySideArc,
      myY: Math.min(myStart.myY, myTarget.myY) - myLift
    };
    const myControlTwo = {
      myX: myTarget.myX - myDeltaX * 0.24 + mySideArc,
      myY: Math.min(myStart.myY, myTarget.myY) - myLift * 0.78
    };
    const myKeyframes: Keyframe[] = [];
    const myFrameCount = 72;
    const myTakeoffBlend = myClamp(420 / myFlight.myDuration, 0.065, 0.14);
    const myLandingBlend = myClamp(myLandingOverlapDuration / myFlight.myDuration, 0.1, 0.2);

    for (let myIndex = 0; myIndex <= myFrameCount; myIndex += 1) {
      const myProgress = myIndex / myFrameCount;
      const myCurveProgress = myProgress * myProgress * (3 - 2 * myProgress);
      const myInverse = 1 - myCurveProgress;
      const myRawX = myInverse ** 3 * myStart.myX
        + 3 * myInverse ** 2 * myCurveProgress * myControlOne.myX
        + 3 * myInverse * myCurveProgress ** 2 * myControlTwo.myX
        + myCurveProgress ** 3 * myTarget.myX;
      const myRawY = myInverse ** 3 * myStart.myY
        + 3 * myInverse ** 2 * myCurveProgress * myControlOne.myY
        + 3 * myInverse * myCurveProgress ** 2 * myControlTwo.myY
        + myCurveProgress ** 3 * myTarget.myY;
      const myFlightPresence = Math.sin(Math.PI * myProgress) ** 0.58;
      const myScale = 0.3 + 0.52 * myFlightPresence;
      const myHorizontalSafety = myFlightWidth * myScale * 0.5 + 7;
      const myVerticalSafety = myFlightHeight * myScale * 0.5 + 7;
      const myX = myClamp(myRawX, myHorizontalSafety, window.innerWidth - myHorizontalSafety);
      const myY = myClamp(myRawY, myVerticalSafety, window.innerHeight - myVerticalSafety);
      const myBank = myDirection * Math.sin(Math.PI * myProgress) * 4.2 + Math.sin(Math.PI * 2 * myProgress) * 1.5;
      const myTakeoffVisibility = myClamp(myProgress / myTakeoffBlend, 0, 1);
      const myLandingVisibility = myClamp((1 - myProgress) / myLandingBlend, 0, 1);
      const myVisibility = Math.min(myTakeoffVisibility, myLandingVisibility);
      const myOpacity = myVisibility * myVisibility * (3 - 2 * myVisibility);

      myKeyframes.push({
        offset: myProgress,
        opacity: myOpacity,
        transform: `translate3d(${myX - myStart.myX}px, ${myY - myStart.myY}px, 0) rotate(${myBank}deg) scale(${myScale})`
      });
    }

    const myAnimation = myBird.animate(myKeyframes, {
      duration: myFlight.myDuration,
      fill: "both",
      easing: "linear"
    });

    return () => myAnimation.cancel();
  }, [myFlight]);

  useEffect(() => () => {
    window.clearTimeout(myPrepareTimerRef.current);
    window.clearTimeout(myTakeoffHandoffTimerRef.current);
    window.clearTimeout(myFlightTimerRef.current);
    window.clearTimeout(myFlightEndTimerRef.current);
    window.clearTimeout(myLandingTimerRef.current);
    window.clearTimeout(myActionResetTimerRef.current);
  }, []);

  const myPerchedLayer = myPerch ? createPortal(
    <span
      className={`myOwlPerchedAnchor myOwlPerchedPhase-${myPhase} myOwlPerchedAction-${myAction}`}
      style={{ left: myPerch.myX, top: myPerch.myY }}
      aria-hidden="true"
    >
      <span className="myOwlPerchedShadow" />
      <span className="myOwlPerchedMotion">
        <span className="myOwlPerchedBody">
          <img
            className="myOwlPerchedImage myOwlPerchedSnowy"
            src={myAssetPath("/mascot/owl-snowy.png")}
            alt=""
            width="209"
            height="384"
          />
          <img
            className="myOwlPerchedImage myOwlPerchedBlack"
            src={myAssetPath("/mascot/owl-black.png")}
            alt=""
            width="202"
            height="384"
          />
          <span className="myOwlPerchedHead">
            <img
              className="myOwlPerchedHeadImage myOwlPerchedSnowy"
              src={myAssetPath("/mascot/owl-snowy.png")}
              alt=""
              width="209"
              height="384"
            />
            <img
              className="myOwlPerchedHeadImage myOwlPerchedBlack"
              src={myAssetPath("/mascot/owl-black.png")}
              alt=""
              width="202"
              height="384"
            />
          </span>
        </span>
      </span>
    </span>,
    document.body
  ) : null;

  const myFlightLayer = myFlight ? createPortal(
    <span
      className="myOwlFlightAnchor"
      style={{
        left: myFlight.myStart.myX,
        top: myFlight.myStart.myY
      }}
      aria-hidden="true"
    >
        <span ref={myFlightBirdRef} className="myOwlFlightBird">
          <span className="myOwlFlightTheme myOwlFlightThemeSnowy">
            <img
              className="myOwlFlightAnimation"
              src={myAssetPath(mySnowyFlightAnimation)}
              alt=""
              width="256"
              height="192"
            />
          </span>
          <span className="myOwlFlightTheme myOwlFlightThemeBlack">
            <img
              className="myOwlFlightAnimation"
              src={myAssetPath(myBlackFlightAnimation)}
              alt=""
              width="256"
              height="192"
            />
          </span>
        </span>
    </span>,
    document.body
  ) : null;

  return (
    <>
      <span ref={myPlaceholderRef} className="myTinyOwl" aria-hidden="true">
        <span className="myOwlFlightPreload">
          {[mySnowyFlightAnimation, myBlackFlightAnimation].map((myAnimation) => (
            <img key={myAnimation} src={myAssetPath(myAnimation)} alt="" />
          ))}
        </span>
      </span>
      {myPerchedLayer}
      {myFlightLayer}
    </>
  );
}
