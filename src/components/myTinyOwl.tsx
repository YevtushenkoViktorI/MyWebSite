import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { myAssetPath } from "../utils/myAssetPath";

type myOwlAction = "idle" | "lookLeft" | "lookRight" | "watchUp" | "watchDown" | "ruffle" | "takeoff" | "landing";
type myOwlPhase = "perched" | "preparing" | "flying" | "landing";
type myOwlCorner = "header" | "topLeft" | "topRight";
type myOwlFlightMode = "takeoff" | "patrol" | "approach" | "landing";
type myOwlVisualTheme = "snowy" | "black";

type myOwlVector = {
  myX: number;
  myY: number;
};

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
  myStartVelocity: myOwlVector;
  myEndVelocity: myOwlVector;
};

const myPerchedOwlHeight = 47;
const myPerchClearance = 3;
const myTakeoffLaunchDelay = 80;
const myTakeoffHandoffDelay = 360;
const myTakeoffDuration = 1360;
const myLandingDuration = 1360;
const myLandingOverlapDuration = 360;
const myLandingSettleDuration = 720;
const myFlightTakeoffScale = 0.74;
const myFlightLandingScale = 0.62;
const myFlightApproachScale = 0.76;
const myFlightCruiseScale = 0.78;
const myOwlFlightAssets = {
  snowy: "/mascot/owl-snowy-flight-seamless-60fps.webp",
  black: "/mascot/owl-black-flight-seamless-60fps.webp"
} as const;
const myOwlLandingAssets = {
  snowy: "/mascot/owl-snowy-landing-cinematic-60fps.webp",
  black: "/mascot/owl-black-landing-cinematic-60fps.webp"
} as const;
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
      myRect.top - myPerchedOwlHeight / 2 - myPerchClearance,
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

function myGetTakeoffTarget(myStart: myOwlPerch, myRouteTarget: myOwlPerch): myOwlPerch {
  const myDeltaX = myRouteTarget.myX - myStart.myX;
  const myDeltaY = myRouteTarget.myY - myStart.myY;
  const myLength = Math.hypot(myDeltaX, myDeltaY) || 1;
  const myLaunchDistance = myClamp(myLength * 0.34, 120, 180);
  const myHeaderBottom = document.querySelector<HTMLElement>(".myHeader")?.getBoundingClientRect().bottom ?? 78;
  const myTop = myHeaderBottom + 54;
  const myBottom = Math.max(myTop + 80, window.innerHeight - 72);

  return {
    myX: myClamp(
      myStart.myX + myDeltaX / myLength * myLaunchDistance,
      72,
      window.innerWidth - 72
    ),
    myY: myClamp(
      myStart.myY + myDeltaY / myLength * myLaunchDistance - 52,
      myTop,
      myBottom
    ),
    mySectionId: "myAir",
    myCorner: myDeltaX < 0 ? "topLeft" : "topRight"
  };
}

function myGetLandingApproachTarget(
  myStart: myOwlPerch,
  myLandingTarget: myOwlPerch
): myOwlPerch {
  const myDeltaX = myStart.myX - myLandingTarget.myX;
  const myHorizontalDirection = Math.sign(
    myDeltaX || (myLandingTarget.myX < window.innerWidth / 2 ? 1 : -1)
  );
  const myHorizontalOffset = myClamp(Math.abs(myDeltaX) * 0.28, 120, 190);
  const myHeaderBottom = document.querySelector<HTMLElement>(".myHeader")?.getBoundingClientRect().bottom ?? 78;
  const myTop = myHeaderBottom + 64;
  const myBottom = Math.max(myTop + 80, window.innerHeight - 72);

  return {
    myX: myClamp(
      myLandingTarget.myX + myHorizontalDirection * myHorizontalOffset,
      72,
      window.innerWidth - 72
    ),
    myY: myClamp(
      myLandingTarget.myY - myClamp(Math.abs(myStart.myY - myLandingTarget.myY) * 0.24 + 76, 92, 138),
      myTop,
      myBottom
    ),
    mySectionId: "myAir",
    myCorner: myHorizontalDirection < 0 ? "topLeft" : "topRight"
  };
}

export function MyTinyOwl() {
  const [myAction, setMyAction] = useState<myOwlAction>("idle");
  const [myPhase, setMyPhase] = useState<myOwlPhase>("perched");
  const [myPerch, setMyPerch] = useState<myOwlPerch | null>(null);
  const [myFlight, setMyFlight] = useState<myOwlFlight | null>(null);
  const [myVisualTheme, setMyVisualTheme] = useState<myOwlVisualTheme>(() =>
    typeof document !== "undefined" && document.documentElement.dataset.theme === "light"
      ? "black"
      : "snowy"
  );
  const myPlaceholderRef = useRef<HTMLSpanElement | null>(null);
  const myFlightBirdRef = useRef<HTMLSpanElement | null>(null);
  const myPerchRef = useRef<myOwlPerch | null>(null);
  const myPhaseRef = useRef<myOwlPhase>("perched");
  const myLandingTargetRef = useRef<myOwlPerch | null>(null);
  const myTakeoffRouteTargetRef = useRef<myOwlPerch | null>(null);
  const myLastScrollYRef = useRef(0);
  const myLastInteractionAtRef = useRef(Date.now());
  const myAirSegmentIndexRef = useRef(0);
  const myFlightVelocityRef = useRef<myOwlVector>({ myX: 0, myY: 0 });
  const myIsScrollingRef = useRef(false);
  const myReducedMotionRef = useRef(false);
  const myPrepareTimerRef = useRef(0);
  const myTakeoffHandoffTimerRef = useRef(0);
  const myLandingTimerRef = useRef(0);
  const myLandingSettleTimerRef = useRef(0);
  const myActionResetTimerRef = useRef(0);
  const myFlightCompleteRef = useRef<(() => void) | null>(null);
  const myStartFlightSegmentRef = useRef<(
    myStart: myOwlPerch,
    myTarget: myOwlPerch,
    myMode: myOwlFlightMode,
    myFadeIn: boolean,
    myFadeOut: boolean
  ) => void>(() => undefined);
  const myBeginScrollFlightRef = useRef<() => void>(() => undefined);
  const myFlightAnimation = myOwlFlightAssets[myVisualTheme];
  const myLandingAnimation = myOwlLandingAssets[myVisualTheme];

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
    const myDuration = myMode === "takeoff"
      ? myTakeoffDuration
      : myMode === "landing"
        ? myLandingDuration
        : myMode === "approach"
          ? myClamp(1620 + myTravelDistance / 360 * 760, 1800, 3000)
          : myClamp(1950 + myTravelDistance / 350 * 1000, 2300, 3300);
    const myStartVelocity = myFadeIn
      ? { myX: 0, myY: 0 }
      : { ...myFlightVelocityRef.current };
    let myEndVelocity: myOwlVector = { myX: 0, myY: 0 };

    if (myMode !== "landing") {
      const myPreviewTarget = myMode === "approach"
        ? myLandingTargetRef.current ?? myTarget
        : myMode === "takeoff"
          ? myTakeoffRouteTargetRef.current
            ?? myGetAirborneTarget(myTarget, myAirSegmentIndexRef.current)
          : myGetAirborneTarget(myTarget, myAirSegmentIndexRef.current + 1);
      const myTangentX = myPreviewTarget.myX - myTarget.myX;
      const myTangentY = myPreviewTarget.myY - myTarget.myY;
      const myTangentLength = Math.hypot(myTangentX, myTangentY) || 1;
      const myTargetSpeed = myClamp(
        myTravelDistance / myDuration * (myMode === "approach" ? 0.82 : 1.08),
        0.08,
        myMode === "takeoff" ? 0.14 : 0.18
      );
      myEndVelocity = {
        myX: myTangentX / myTangentLength * myTargetSpeed,
        myY: myTangentY / myTangentLength * myTargetSpeed
      };
    }

    myFlightVelocityRef.current = myEndVelocity;
    const myNextFlight: myOwlFlight = {
      myStart,
      myTarget,
      myDuration,
      myMode,
      myFadeIn,
      myFadeOut,
      myStartVelocity,
      myEndVelocity
    };

    window.clearTimeout(myLandingTimerRef.current);
    window.clearTimeout(myLandingSettleTimerRef.current);
    myFlightCompleteRef.current = null;
    if (myFadeIn) {
      setMyFlight(myNextFlight);
    } else {
      flushSync(() => setMyFlight(myNextFlight));
    }

    if (myMode !== "landing") {
      myFlightCompleteRef.current = () => {
        if (myIsScrollingRef.current) {
          const myNextSegmentIndex = myMode === "takeoff"
            ? myAirSegmentIndexRef.current
            : ++myAirSegmentIndexRef.current;
          const myNextTarget = myMode === "takeoff"
            ? myTakeoffRouteTargetRef.current
              ?? myGetAirborneTarget(myTarget, myNextSegmentIndex)
            : myGetAirborneTarget(myTarget, myNextSegmentIndex);
          myTakeoffRouteTargetRef.current = null;
          myStartFlightSegmentRef.current(myTarget, myNextTarget, "patrol", false, false);
          return;
        }
        myTakeoffRouteTargetRef.current = null;

        const myLandingTarget = myLandingTargetRef.current
          ?? myFindTopVisibleFrame(myPerchRef.current)
          ?? myGetHeaderPerch()
          ?? myPerchRef.current;
        if (myLandingTarget) {
          myLandingTargetRef.current = myLandingTarget;

          if (myMode === "approach") {
            myStartFlightSegmentRef.current(myTarget, myLandingTarget, "landing", false, true);
            return;
          }

          const myApproachTarget = myGetLandingApproachTarget(myTarget, myLandingTarget);
          if (myDistance(myTarget, myApproachTarget) > 96) {
            myStartFlightSegmentRef.current(myTarget, myApproachTarget, "approach", false, false);
          } else {
            myStartFlightSegmentRef.current(myTarget, myLandingTarget, "landing", false, true);
          }
        }
      };
      return;
    }

    const myLandingStartDelay = Math.max(0, myDuration - myLandingOverlapDuration);
    myLandingTimerRef.current = window.setTimeout(() => {
      myUpdatePerch(myTarget);
      myUpdatePhase("landing");
      setMyAction("landing");
    }, myLandingStartDelay);

    myFlightCompleteRef.current = () => {
      setMyFlight(null);
    };

    myLandingSettleTimerRef.current = window.setTimeout(() => {
      myUpdatePhase("perched");
      setMyAction("idle");
      myLandingTargetRef.current = null;
      myFlightVelocityRef.current = { myX: 0, myY: 0 };

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
    myTakeoffRouteTargetRef.current = null;
    myAirSegmentIndexRef.current = 0;
    myFlightVelocityRef.current = { myX: 0, myY: 0 };
    myUpdatePhase("preparing");
    setMyAction("takeoff");

    myPrepareTimerRef.current = window.setTimeout(() => {
      const myFirstRouteTarget = myGetAirborneTarget(
        myCurrentPerch,
        ++myAirSegmentIndexRef.current
      );
      const myTakeoffTarget = myGetTakeoffTarget(myCurrentPerch, myFirstRouteTarget);
      myTakeoffRouteTargetRef.current = myFirstRouteTarget;
      myStartFlightSegmentRef.current(myCurrentPerch, myTakeoffTarget, "takeoff", true, false);
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
    const myUpdateVisualTheme = () => {
      setMyVisualTheme(document.documentElement.dataset.theme === "light" ? "black" : "snowy");
    };
    const myThemeObserver = new MutationObserver(myUpdateVisualTheme);
    myThemeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
    myUpdateVisualTheme();
    return () => myThemeObserver.disconnect();
  }, []);

  useEffect(() => {
    const myPreloadedImages = [myFlightAnimation, myLandingAnimation].map((myAnimation) => {
      const myPreloadedImage = new Image();
      myPreloadedImage.src = myAssetPath(myAnimation);
      void myPreloadedImage.decode().catch(() => undefined);
      return myPreloadedImage;
    });

    return () => {
      myPreloadedImages.forEach((myPreloadedImage) => {
        myPreloadedImage.src = "";
      });
    };
  }, [myFlightAnimation, myLandingAnimation]);

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

  useLayoutEffect(() => {
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
    const myLift = myClamp(myTravelDistance * 0.15, 48, 118);
    const myFlightWidth = myBird.parentElement?.getBoundingClientRect().width ?? 124;
    const myFlightHeight = myFlightWidth * 0.75;
    const myNeedsSideArc = Math.abs(myDeltaX) < 140;
    const mySideArc = myNeedsSideArc ? (myTarget.myX > window.innerWidth / 2 ? -94 : 94) : 0;
    const myKeyframes: Keyframe[] = [];
    const myFrameCount = 120;
    const myTakeoffBlend = myClamp(460 / myFlight.myDuration, 0.16, 0.25);
    const myLandingBlend = myClamp(360 / myFlight.myDuration, 0.14, 0.22);
    const myTakeoffHold = myFlight.myFadeIn
      ? myClamp(320 / myFlight.myDuration, 0.12, 0.2)
      : 0;
    const myLandingHold = myFlight.myFadeOut
      ? myClamp(myLandingOverlapDuration / myFlight.myDuration, 0.18, 0.3)
      : 0;
    const myMovementDuration = myFlight.myDuration * (1 - myTakeoffHold - myLandingHold);
    const myControlSafetyX = myFlightWidth * myFlightCruiseScale * 0.5 + 8;
    const myControlSafetyY = myFlightHeight * myFlightCruiseScale * 0.5 + 8;
    const myControlOne = {
      myX: myFlight.myFadeIn
        ? myStart.myX + myDeltaX * 0.3 + mySideArc
        : myStart.myX + myFlight.myStartVelocity.myX * myMovementDuration / 3,
      myY: myFlight.myFadeIn
        ? Math.min(myStart.myY, myTarget.myY) - myLift
        : myStart.myY + myFlight.myStartVelocity.myY * myMovementDuration / 3
    };
    const myControlTwo = {
      myX: myTarget.myX - myFlight.myEndVelocity.myX * myMovementDuration / 3,
      myY: myTarget.myY - myFlight.myEndVelocity.myY * myMovementDuration / 3
    };
    myControlOne.myX = myClamp(
      myControlOne.myX,
      myControlSafetyX,
      window.innerWidth - myControlSafetyX
    );
    myControlOne.myY = myClamp(
      myControlOne.myY,
      myControlSafetyY,
      window.innerHeight - myControlSafetyY
    );
    myControlTwo.myX = myClamp(
      myControlTwo.myX,
      myControlSafetyX,
      window.innerWidth - myControlSafetyX
    );
    myControlTwo.myY = myClamp(
      myControlTwo.myY,
      myControlSafetyY,
      window.innerHeight - myControlSafetyY
    );

    for (let myIndex = 0; myIndex <= myFrameCount; myIndex += 1) {
      const myProgress = myIndex / myFrameCount;
      const myMotionProgress = myClamp(
        (myProgress - myTakeoffHold) / (1 - myTakeoffHold - myLandingHold),
        0,
        1
      );
      const myCurveProgress = myFlight.myFadeIn
        ? myMotionProgress * myMotionProgress * (2 - myMotionProgress)
        : myMotionProgress;
      const myInverse = 1 - myCurveProgress;
      const myRawX = myInverse ** 3 * myStart.myX
        + 3 * myInverse ** 2 * myCurveProgress * myControlOne.myX
        + 3 * myInverse * myCurveProgress ** 2 * myControlTwo.myX
        + myCurveProgress ** 3 * myTarget.myX;
      const myRawY = myInverse ** 3 * myStart.myY
        + 3 * myInverse ** 2 * myCurveProgress * myControlOne.myY
        + 3 * myInverse * myCurveProgress ** 2 * myControlTwo.myY
        + myCurveProgress ** 3 * myTarget.myY
        + Math.sin(Math.PI * 4 * myMotionProgress)
          * Math.sin(Math.PI * myMotionProgress)
          * 0.8;
      const myCruiseScale = myFlightCruiseScale;
      const myStartScale = myFlight.myFadeIn ? myFlightTakeoffScale : myFlightApproachScale;
      const myEndScale = myFlight.myFadeOut ? myFlightLandingScale : myFlightApproachScale;
      const myRise = mySmoothStep(myProgress / Math.max(myTakeoffBlend, 0.01));
      const myFall = mySmoothStep((1 - myProgress) / Math.max(myLandingBlend, 0.01));
      const myScale = myProgress < myTakeoffBlend
        ? myStartScale + (myCruiseScale - myStartScale) * myRise
        : myProgress > 1 - myLandingBlend
          ? myEndScale + (myCruiseScale - myEndScale) * myFall
          : myCruiseScale;
      const myHorizontalSafety = myFlightWidth * myScale * 0.5 + 7;
      const myVerticalSafety = myFlightHeight * myScale * 0.5 + 7;
      const myX = myClamp(myRawX, myHorizontalSafety, window.innerWidth - myHorizontalSafety);
      const myY = myClamp(myRawY, myVerticalSafety, window.innerHeight - myVerticalSafety);
      const myBankStrength = myFlight.myMode === "landing"
        ? 1.4
        : myFlight.myMode === "takeoff"
          ? 2.5
          : myFlight.myMode === "approach"
            ? 2.8
            : 4.2;
      const myBank = myDirection * Math.sin(Math.PI * myMotionProgress) * myBankStrength
        + Math.sin(Math.PI * 2 * myMotionProgress) * Math.min(0.8, myBankStrength * 0.24);
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
    myAnimation.onfinish = () => {
      const myCompleteFlight = myFlightCompleteRef.current;
      myFlightCompleteRef.current = null;
      myCompleteFlight?.();
    };

    return () => {
      myAnimation.onfinish = null;
      myAnimation.cancel();
    };
  }, [myFlight]);

  useEffect(() => () => {
    window.clearTimeout(myPrepareTimerRef.current);
    window.clearTimeout(myTakeoffHandoffTimerRef.current);
    window.clearTimeout(myLandingTimerRef.current);
    window.clearTimeout(myLandingSettleTimerRef.current);
    window.clearTimeout(myActionResetTimerRef.current);
    myFlightCompleteRef.current = null;
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
          transform: `scale(${myFlight.myFadeIn ? myFlightTakeoffScale : myFlightApproachScale})`
        }}
      >
        <img
          className="myOwlFlightImage myOwlFlightLoopImage"
          src={myAssetPath(myFlightAnimation)}
          alt=""
          width="256"
          height="192"
          decoding="async"
          draggable={false}
        />
        {myFlight.myMode === "landing" ? (
          <img
            className="myOwlFlightImage myOwlLandingSequenceImage"
            src={myAssetPath(myLandingAnimation)}
            alt=""
            width="256"
            height="192"
            decoding="async"
            draggable={false}
          />
        ) : null}
      </span>
    </span>,
    document.body
  ) : null;

  return (
    <>
      <span ref={myPlaceholderRef} className="myTinyOwl" aria-hidden="true" />
      {myPerchedLayer}
      {myFlightLayer}
    </>
  );
}
