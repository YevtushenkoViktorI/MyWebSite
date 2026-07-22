import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { myAssetPath } from "../utils/myAssetPath";

type myOwlAction = "idle" | "lookLeft" | "lookRight" | "watchUp" | "watchDown" | "ruffle" | "takeoff" | "landing";
type myOwlPhase = "perched" | "preparing" | "flying" | "landing";
type myOwlCorner = "header" | "topLeft" | "topRight";
type myOwlFlightMode = "patrol" | "landing";

type myOwlPerch = {
  myX: number;
  myY: number;
  mySectionId: string;
  myCorner: myOwlCorner;
};

type myOwlFlight = {
  myStart: myOwlPerch;
  myTarget: myOwlPerch;
  myDuration: number;
  myMode: myOwlFlightMode;
  myFadeIn: boolean;
  myFadeOut: boolean;
};

const myPerchedOwlHeight = 47;
const myTakeoffLaunchDelay = 860;
const myTakeoffHandoffDelay = 1440;
const myLandingOverlapDuration = 260;
const myLandingSettleDuration = 1440;
const mySnowyTakeoffAnimation = "/mascot/owl-snowy-takeoff-dense-sprite.webp";
const myBlackTakeoffAnimation = "/mascot/owl-black-takeoff-dense-sprite.webp";
const mySnowyFlightAnimation = "/mascot/owl-snowy-flight-dense-sprite.webp";
const myBlackFlightAnimation = "/mascot/owl-black-flight-dense-sprite.webp";
const mySnowyLandingAnimation = "/mascot/owl-snowy-landing-dense-sprite.webp";
const myBlackLandingAnimation = "/mascot/owl-black-landing-dense-sprite.webp";
const myFrameSelector = [
  "main .mySection",
  "main .myHeroPhoto",
  "main .myJourneyCard",
  "main .myProjectCard",
  "main .myTimelineItem",
  "main .myCertificateItem",
  "main .myContactMetaCard"
].join(",");

function myClamp(myValue: number, myMinimum: number, myMaximum: number): number {
  return Math.min(Math.max(myValue, myMinimum), myMaximum);
}

function mySmoothStep(myValue: number): number {
  const myProgress = myClamp(myValue, 0, 1);
  return myProgress * myProgress * (3 - 2 * myProgress);
}

function myDistance(myStart: myOwlPerch, myTarget: myOwlPerch): number {
  return Math.hypot(myTarget.myX - myStart.myX, myTarget.myY - myStart.myY);
}

function myFindTopVisibleFrame(myCurrentPerch: myOwlPerch | null): myOwlPerch | null {
  const myHeaderBottom = document.querySelector<HTMLElement>(".myHeader")?.getBoundingClientRect().bottom ?? 78;
  const myViewportWidth = window.innerWidth;
  const myViewportHeight = window.innerHeight;
  const myMinimumFrameTop = myHeaderBottom + 18;
  const myMaximumFrameTop = myViewportHeight - 38;
  const mySeenFrames = new Set<HTMLElement>();
  const myFrames = Array.from(document.querySelectorAll<HTMLElement>(myFrameSelector))
    .filter((myFrame) => {
      if (mySeenFrames.has(myFrame)) {
        return false;
      }
      mySeenFrames.add(myFrame);
      return true;
    })
    .map((myFrame) => ({ myFrame, myRect: myFrame.getBoundingClientRect() }))
    .filter(({ myFrame, myRect }) => {
      const myStyle = window.getComputedStyle(myFrame);
      return myStyle.visibility !== "hidden"
        && myStyle.display !== "none"
        && myRect.width >= Math.min(150, myViewportWidth * 0.36)
        && myRect.height >= 64
        && myRect.top >= myMinimumFrameTop
        && myRect.top <= myMaximumFrameTop
        && myRect.bottom > myMinimumFrameTop;
    })
    .sort((myFirst, mySecond) => {
      const myTopDifference = myFirst.myRect.top - mySecond.myRect.top;
      return Math.abs(myTopDifference) > 4 ? myTopDifference : mySecond.myRect.width - myFirst.myRect.width;
    });

  const myTopFrame = myFrames[0];
  if (!myTopFrame) {
    return null;
  }

  const { myFrame, myRect } = myTopFrame;
  const mySection = myFrame.matches(".mySection[id]")
    ? myFrame
    : myFrame.closest<HTMLElement>(".mySection[id]");
  const mySectionId = mySection?.id ?? "myOverview";
  const myInset = myClamp(myRect.width * 0.12, 28, 48);
  const myLeft = myClamp(myRect.left + myInset, 28, myViewportWidth - 28);
  const myRight = myClamp(myRect.right - myInset, 28, myViewportWidth - 28);
  const myPreferLeft = myCurrentPerch
    ? Math.abs(myCurrentPerch.myX - myLeft) <= Math.abs(myCurrentPerch.myX - myRight)
    : Array.from(document.querySelectorAll<HTMLElement>("main .mySection[id]")).indexOf(mySection ?? myFrame) % 2 === 1;
  const myCorner: myOwlCorner = myPreferLeft ? "topLeft" : "topRight";

  return {
    myX: myPreferLeft ? myLeft : myRight,
    myY: myClamp(
      myRect.top - myPerchedOwlHeight / 2 + 1,
      myPerchedOwlHeight / 2 + 4,
      myViewportHeight - myPerchedOwlHeight / 2 - 4
    ),
    mySectionId,
    myCorner
  };
}

function myGetAirborneTarget(myStart: myOwlPerch, mySegmentIndex: number): myOwlPerch {
  const myHeaderBottom = document.querySelector<HTMLElement>(".myHeader")?.getBoundingClientRect().bottom ?? 78;
  const myViewportWidth = window.innerWidth;
  const myViewportHeight = window.innerHeight;
  const myPatterns = [
    { myX: 0.18, myY: 0.27 },
    { myX: 0.76, myY: 0.38 },
    { myX: 0.44, myY: 0.22 },
    { myX: 0.82, myY: 0.54 },
    { myX: 0.27, myY: 0.46 },
    { myX: 0.64, myY: 0.29 }
  ];
  let myPatternIndex = mySegmentIndex % myPatterns.length;
  let myPattern = myPatterns[myPatternIndex];
  const myTop = myHeaderBottom + 70;
  const myBottom = Math.max(myTop + 100, myViewportHeight - 78);
  let myTarget: myOwlPerch = {
    myX: myClamp(myViewportWidth * myPattern.myX, 72, myViewportWidth - 72),
    myY: myClamp(myTop + (myBottom - myTop) * myPattern.myY, myTop, myBottom),
    mySectionId: "myAir",
    myCorner: myPattern.myX < 0.5 ? "topLeft" : "topRight"
  };

  if (myDistance(myStart, myTarget) < 150) {
    myPatternIndex = (myPatternIndex + 2) % myPatterns.length;
    myPattern = myPatterns[myPatternIndex];
    myTarget = {
      myX: myClamp(myViewportWidth * myPattern.myX, 72, myViewportWidth - 72),
      myY: myClamp(myTop + (myBottom - myTop) * myPattern.myY, myTop, myBottom),
      mySectionId: "myAir",
      myCorner: myPattern.myX < 0.5 ? "topLeft" : "topRight"
    };
  }

  return myTarget;
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
  const myLandingTargetRef = useRef<myOwlPerch | null>(null);
  const myLastScrollYRef = useRef(0);
  const myLastInteractionAtRef = useRef(Date.now());
  const myAirSegmentIndexRef = useRef(0);
  const myIsScrollingRef = useRef(false);
  const myReducedMotionRef = useRef(false);
  const myPrepareTimerRef = useRef(0);
  const myTakeoffHandoffTimerRef = useRef(0);
  const myFlightTimerRef = useRef(0);
  const myFlightEndTimerRef = useRef(0);
  const myLandingTimerRef = useRef(0);
  const myLandingSettleTimerRef = useRef(0);
  const myActionResetTimerRef = useRef(0);
  const myStartFlightSegmentRef = useRef<(
    myStart: myOwlPerch,
    myTarget: myOwlPerch,
    myMode: myOwlFlightMode,
    myFadeIn: boolean,
    myFadeOut: boolean
  ) => void>(() => undefined);
  const myBeginScrollFlightRef = useRef<() => void>(() => undefined);

  const myUpdatePerch = useCallback((myNextPerch: myOwlPerch) => {
    myPerchRef.current = myNextPerch;
    setMyPerch(myNextPerch);
  }, []);

  const myUpdatePhase = useCallback((myNextPhase: myOwlPhase) => {
    myPhaseRef.current = myNextPhase;
    setMyPhase(myNextPhase);
  }, []);

  const myGetHeaderPerch = useCallback((): myOwlPerch | null => {
    const myRect = myPlaceholderRef.current?.getBoundingClientRect();
    if (!myRect) {
      return null;
    }

    return {
      myX: myRect.left + myRect.width / 2,
      myY: myRect.top + myRect.height / 2,
      mySectionId: "myHeader",
      myCorner: "header"
    };
  }, []);

  const myStartFlightSegment = useCallback((
    myStart: myOwlPerch,
    myTarget: myOwlPerch,
    myMode: myOwlFlightMode,
    myFadeIn: boolean,
    myFadeOut: boolean
  ) => {
    const myTravelDistance = myDistance(myStart, myTarget);
    const myDuration = myMode === "patrol"
      ? myClamp(1550 + myTravelDistance / 350 * 900, 1850, 2850)
      : myClamp(1280 + myTravelDistance / 420 * 760, 1550, 2550);
    const myNextFlight: myOwlFlight = {
      myStart,
      myTarget,
      myDuration,
      myMode,
      myFadeIn,
      myFadeOut
    };

    window.clearTimeout(myFlightTimerRef.current);
    window.clearTimeout(myFlightEndTimerRef.current);
    window.clearTimeout(myLandingTimerRef.current);
    window.clearTimeout(myLandingSettleTimerRef.current);
    setMyFlight(myNextFlight);

    if (myMode === "patrol") {
      myFlightTimerRef.current = window.setTimeout(() => {
        if (myIsScrollingRef.current) {
          const myNextTarget = myGetAirborneTarget(myTarget, ++myAirSegmentIndexRef.current);
          myStartFlightSegmentRef.current(myTarget, myNextTarget, "patrol", false, false);
          return;
        }

        const myLandingTarget = myLandingTargetRef.current
          ?? myFindTopVisibleFrame(myPerchRef.current)
          ?? myGetHeaderPerch()
          ?? myPerchRef.current;
        if (myLandingTarget) {
          myStartFlightSegmentRef.current(myTarget, myLandingTarget, "landing", false, true);
        }
      }, myDuration);
      return;
    }

    const myLandingStartDelay = Math.max(0, myDuration - myLandingOverlapDuration);
    myLandingTimerRef.current = window.setTimeout(() => {
      myUpdatePerch(myTarget);
      myUpdatePhase("landing");
      setMyAction("landing");
    }, myLandingStartDelay);

    myFlightEndTimerRef.current = window.setTimeout(() => {
      setMyFlight(null);
    }, myDuration);

    myLandingSettleTimerRef.current = window.setTimeout(() => {
      myUpdatePhase("perched");
      setMyAction("idle");
      myLandingTargetRef.current = null;

      if (myIsScrollingRef.current) {
        window.requestAnimationFrame(() => myBeginScrollFlightRef.current());
      }
    }, myLandingStartDelay + myLandingSettleDuration);
  }, [myGetHeaderPerch, myUpdatePerch, myUpdatePhase]);

  myStartFlightSegmentRef.current = myStartFlightSegment;

  const myBeginScrollFlight = useCallback(() => {
    const myCurrentPerch = myPerchRef.current;
    if (!myCurrentPerch || myReducedMotionRef.current || myPhaseRef.current !== "perched") {
      return;
    }

    window.clearTimeout(myActionResetTimerRef.current);
    window.clearTimeout(myPrepareTimerRef.current);
    window.clearTimeout(myTakeoffHandoffTimerRef.current);
    myLandingTargetRef.current = null;
    myAirSegmentIndexRef.current = 0;
    myUpdatePhase("preparing");
    setMyAction("takeoff");

    myPrepareTimerRef.current = window.setTimeout(() => {
      const myFirstAirTarget = myGetAirborneTarget(myCurrentPerch, ++myAirSegmentIndexRef.current);
      myStartFlightSegmentRef.current(myCurrentPerch, myFirstAirTarget, "patrol", true, false);
    }, myTakeoffLaunchDelay);

    myTakeoffHandoffTimerRef.current = window.setTimeout(() => {
      if (myPhaseRef.current === "preparing") {
        myUpdatePhase("flying");
        myActionResetTimerRef.current = window.setTimeout(() => setMyAction("idle"), 360);
      }
    }, myTakeoffHandoffDelay);
  }, [myUpdatePhase]);

  myBeginScrollFlightRef.current = myBeginScrollFlight;

  useLayoutEffect(() => {
    const myInitialPerch = myFindTopVisibleFrame(null) ?? myGetHeaderPerch();
    if (myInitialPerch) {
      myUpdatePerch(myInitialPerch);
    }
    myLastScrollYRef.current = window.scrollY;
  }, [myGetHeaderPerch, myUpdatePerch]);

  useEffect(() => {
    myReducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let myScrollStopTimer = 0;
    let myMicroActionTimer = 0;

    const myScheduleMicroAction = () => {
      window.clearTimeout(myMicroActionTimer);
      myMicroActionTimer = window.setTimeout(() => {
        if (!myReducedMotionRef.current
          && myPhaseRef.current === "perched"
          && Date.now() - myLastInteractionAtRef.current > 1400) {
          const myChance = Math.random();
          const myNextAction: myOwlAction = myChance < 0.28
            ? "lookLeft"
            : myChance < 0.56
              ? "lookRight"
              : myChance < 0.7
                ? "watchUp"
                : myChance < 0.84
                  ? "watchDown"
                  : "ruffle";
          const myActionDuration = myNextAction === "ruffle" ? 1800 : 3000 + Math.random() * 1400;

          setMyAction(myNextAction);
          window.clearTimeout(myActionResetTimerRef.current);
          myActionResetTimerRef.current = window.setTimeout(() => setMyAction("idle"), myActionDuration);
        }
        myScheduleMicroAction();
      }, 4200 + Math.random() * 4600);
    };

    const myHandleScrollActivity = (myIsScrollingDown: boolean) => {
      myLastInteractionAtRef.current = Date.now();
      myIsScrollingRef.current = true;
      myLandingTargetRef.current = null;

      if (myPhaseRef.current === "perched") {
        setMyAction(myIsScrollingDown ? "watchDown" : "watchUp");
        myBeginScrollFlightRef.current();
      }

      window.clearTimeout(myScrollStopTimer);
      myScrollStopTimer = window.setTimeout(() => {
        myIsScrollingRef.current = false;
        const myTarget = myFindTopVisibleFrame(myPerchRef.current) ?? myGetHeaderPerch();
        if (!myTarget) {
          return;
        }

        myLandingTargetRef.current = myTarget;
        if (myReducedMotionRef.current || myPhaseRef.current === "perched") {
          myUpdatePerch(myTarget);
          setMyAction("idle");
        }
      }, 520);
    };

    const myHandleScroll = () => {
      const myCurrentScrollY = window.scrollY;
      const myIsScrollingDown = myCurrentScrollY >= myLastScrollYRef.current;
      myLastScrollYRef.current = myCurrentScrollY;
      myHandleScrollActivity(myIsScrollingDown);
    };

    const myHandleWheel = (myEvent: WheelEvent) => {
      myHandleScrollActivity(myEvent.deltaY >= 0);
    };

    const myHandleResize = () => {
      const myCurrentPerch = myPerchRef.current;
      if (!myCurrentPerch || myPhaseRef.current !== "perched") {
        return;
      }

      const myTarget = myFindTopVisibleFrame(myCurrentPerch) ?? myGetHeaderPerch();
      if (myTarget) {
        myUpdatePerch(myTarget);
      }
    };

    window.addEventListener("scroll", myHandleScroll, { passive: true });
    window.addEventListener("wheel", myHandleWheel, { passive: true });
    window.addEventListener("resize", myHandleResize);
    myScheduleMicroAction();

    return () => {
      window.removeEventListener("scroll", myHandleScroll);
      window.removeEventListener("wheel", myHandleWheel);
      window.removeEventListener("resize", myHandleResize);
      window.clearTimeout(myScrollStopTimer);
      window.clearTimeout(myMicroActionTimer);
    };
  }, [myGetHeaderPerch, myUpdatePerch]);

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
    const myLift = myClamp(myTravelDistance * 0.18, 60, 148);
    const myFlightWidth = myBird.parentElement?.getBoundingClientRect().width ?? 124;
    const myFlightHeight = myFlightWidth * 0.75;
    const myNeedsSideArc = Math.abs(myDeltaX) < 140;
    const mySideArc = myNeedsSideArc ? (myTarget.myX > window.innerWidth / 2 ? -94 : 94) : 0;
    const myControlOne = {
      myX: myStart.myX + myDeltaX * 0.3 + mySideArc,
      myY: Math.min(myStart.myY, myTarget.myY) - myLift
    };
    const myControlTwo = {
      myX: myTarget.myX - myDeltaX * 0.24 + mySideArc,
      myY: Math.min(myStart.myY, myTarget.myY) - myLift * 0.76
    };
    const myKeyframes: Keyframe[] = [];
    const myFrameCount = 120;
    const myTakeoffBlend = myClamp(440 / myFlight.myDuration, 0.1, 0.22);
    const myLandingBlend = myClamp(myLandingOverlapDuration / myFlight.myDuration, 0.16, 0.34);

    for (let myIndex = 0; myIndex <= myFrameCount; myIndex += 1) {
      const myProgress = myIndex / myFrameCount;
      const myCurveProgress = mySmoothStep(myProgress);
      const myInverse = 1 - myCurveProgress;
      const myRawX = myInverse ** 3 * myStart.myX
        + 3 * myInverse ** 2 * myCurveProgress * myControlOne.myX
        + 3 * myInverse * myCurveProgress ** 2 * myControlTwo.myX
        + myCurveProgress ** 3 * myTarget.myX;
      const myRawY = myInverse ** 3 * myStart.myY
        + 3 * myInverse ** 2 * myCurveProgress * myControlOne.myY
        + 3 * myInverse * myCurveProgress ** 2 * myControlTwo.myY
        + myCurveProgress ** 3 * myTarget.myY
        + Math.sin(Math.PI * 4 * myProgress) * Math.sin(Math.PI * myProgress) * 2.2;
      const myCruiseScale = 0.84;
      const myStartScale = myFlight.myFadeIn ? 0.3 : 0.78;
      const myEndScale = myFlight.myFadeOut ? 0.3 : 0.78;
      const myRise = mySmoothStep(myProgress / 0.24);
      const myFall = mySmoothStep((1 - myProgress) / 0.24);
      const myScale = myProgress < 0.24
        ? myStartScale + (myCruiseScale - myStartScale) * myRise
        : myProgress > 0.76
          ? myEndScale + (myCruiseScale - myEndScale) * myFall
          : myCruiseScale;
      const myHorizontalSafety = myFlightWidth * myScale * 0.5 + 7;
      const myVerticalSafety = myFlightHeight * myScale * 0.5 + 7;
      const myX = myClamp(myRawX, myHorizontalSafety, window.innerWidth - myHorizontalSafety);
      const myY = myClamp(myRawY, myVerticalSafety, window.innerHeight - myVerticalSafety);
      const myBank = myDirection * Math.sin(Math.PI * myProgress) * 5.2
        + Math.sin(Math.PI * 2 * myProgress) * 1.35;
      const myTakeoffVisibility = myFlight.myFadeIn
        ? mySmoothStep(myProgress / myTakeoffBlend)
        : 1;
      const myLandingVisibility = myFlight.myFadeOut
        ? mySmoothStep((1 - myProgress) / myLandingBlend)
        : 1;

      myKeyframes.push({
        offset: myProgress,
        opacity: Math.min(myTakeoffVisibility, myLandingVisibility),
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
    window.clearTimeout(myLandingSettleTimerRef.current);
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
      className={`myOwlFlightAnchor myOwlFlightMode-${myFlight.myMode}`}
      style={{
        left: myFlight.myStart.myX,
        top: myFlight.myStart.myY
      }}
      aria-hidden="true"
    >
      <span
        ref={myFlightBirdRef}
        className="myOwlFlightBird"
        style={{
          opacity: myFlight.myFadeIn ? 0 : 1,
          transform: `scale(${myFlight.myFadeIn ? 0.3 : 0.78})`
        }}
      >
        <span className="myOwlFlightTheme myOwlFlightThemeSnowy">
          <span
            className="myOwlFlightAnimation"
            style={{ backgroundImage: `url(${myAssetPath(mySnowyFlightAnimation)})` }}
          />
        </span>
        <span className="myOwlFlightTheme myOwlFlightThemeBlack">
          <span
            className="myOwlFlightAnimation"
            style={{ backgroundImage: `url(${myAssetPath(myBlackFlightAnimation)})` }}
          />
        </span>
      </span>
    </span>,
    document.body
  ) : null;

  const myTransitionMode = myPhase === "preparing"
    ? "takeoff"
    : myPhase === "landing"
      ? "landing"
      : null;
  const myTransitionLayer = myPerch && myTransitionMode ? createPortal(
    <span
      className={`myOwlTransitionAnchor myOwlTransitionMode-${myTransitionMode}`}
      style={{ left: myPerch.myX, top: myPerch.myY }}
      aria-hidden="true"
    >
      <span className="myOwlTransitionTheme myOwlTransitionThemeSnowy">
        <span
          key={`snowy-${myTransitionMode}`}
          className="myOwlTransitionAnimation"
          style={{
            backgroundImage: `url(${myAssetPath(myTransitionMode === "takeoff" ? mySnowyTakeoffAnimation : mySnowyLandingAnimation)})`
          }}
        />
      </span>
      <span className="myOwlTransitionTheme myOwlTransitionThemeBlack">
        <span
          key={`black-${myTransitionMode}`}
          className="myOwlTransitionAnimation"
          style={{
            backgroundImage: `url(${myAssetPath(myTransitionMode === "takeoff" ? myBlackTakeoffAnimation : myBlackLandingAnimation)})`
          }}
        />
      </span>
    </span>,
    document.body
  ) : null;

  const myAnimationAssets = [
    mySnowyTakeoffAnimation,
    myBlackTakeoffAnimation,
    mySnowyFlightAnimation,
    myBlackFlightAnimation,
    mySnowyLandingAnimation,
    myBlackLandingAnimation
  ];

  return (
    <>
      <span ref={myPlaceholderRef} className="myTinyOwl" aria-hidden="true">
        <span className="myOwlFlightPreload">
          {myAnimationAssets.map((myAnimation) => (
            <img key={myAnimation} src={myAssetPath(myAnimation)} alt="" />
          ))}
        </span>
      </span>
      {myPerchedLayer}
      {myTransitionLayer}
      {myFlightLayer}
    </>
  );
}
