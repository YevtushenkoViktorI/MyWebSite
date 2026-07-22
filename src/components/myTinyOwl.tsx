import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { myAssetPath } from "../utils/myAssetPath";

type myOwlAction = "idle" | "lookLeft" | "lookRight" | "hopLeft" | "hopRight" | "ruffle" | "takeoff";
type myOwlPosition = -1 | 0 | 1;
type myOwlFlight = {
  myId: number;
  myStartX: number;
  myStartY: number;
  myDuration: number;
};

const myActionDurations: Record<Exclude<myOwlAction, "idle" | "takeoff">, number> = {
  lookLeft: 1550,
  lookRight: 1450,
  hopLeft: 920,
  hopRight: 920,
  ruffle: 1050
};

export function MyTinyOwl() {
  const [myAction, setMyAction] = useState<myOwlAction>("idle");
  const [myPosition, setMyPosition] = useState<myOwlPosition>(0);
  const [myFlight, setMyFlight] = useState<myOwlFlight | null>(null);
  const myPositionRef = useRef<myOwlPosition>(0);
  const myPerchedOwlRef = useRef<HTMLSpanElement | null>(null);
  const myFlightBirdRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const myReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (myReducedMotion.matches) {
      return;
    }

    let myActionTimer = 0;
    let myResetTimer = 0;
    let myFlightEndTimer = 0;
    let myHasFlown = false;

    const myScheduleNextAction = () => {
      const myDelay = myHasFlown
        ? 3400 + Math.random() * 5600
        : 5000 + Math.random() * 2400;

      myActionTimer = window.setTimeout(() => {
        const myChance = Math.random();

        if (!myHasFlown || myChance < 0.3) {
          myHasFlown = true;
          setMyAction("takeoff");

          myResetTimer = window.setTimeout(() => {
            const myPerchRect = myPerchedOwlRef.current?.getBoundingClientRect();
            if (!myPerchRect) {
              setMyAction("idle");
              myScheduleNextAction();
              return;
            }

            const myDuration = 6600 + Math.random() * 1800;
            setMyFlight({
              myId: Date.now(),
              myStartX: myPerchRect.left + myPerchRect.width / 2,
              myStartY: myPerchRect.top + myPerchRect.height / 2,
              myDuration
            });
            setMyAction("idle");

            myFlightEndTimer = window.setTimeout(() => {
              setMyFlight(null);
              myScheduleNextAction();
            }, myDuration);
          }, 640);
          return;
        }

        let myNextAction: Exclude<myOwlAction, "idle" | "takeoff">;

        if (myChance < 0.48) {
          myNextAction = "lookLeft";
        } else if (myChance < 0.66) {
          myNextAction = "lookRight";
        } else if (myChance < 0.8) {
          myNextAction = "ruffle";
        } else {
          const myCanMoveLeft = myPositionRef.current > -1;
          const myCanMoveRight = myPositionRef.current < 1;
          const myMoveRight = !myCanMoveLeft || (myCanMoveRight && Math.random() > 0.5);
          const myNextPosition = (myPositionRef.current + (myMoveRight ? 1 : -1)) as myOwlPosition;

          myPositionRef.current = myNextPosition;
          setMyPosition(myNextPosition);
          myNextAction = myMoveRight ? "hopRight" : "hopLeft";
        }

        setMyAction(myNextAction);
        myResetTimer = window.setTimeout(() => {
          setMyAction("idle");
          myScheduleNextAction();
        }, myActionDurations[myNextAction]);
      }, myDelay);
    };

    myScheduleNextAction();

    return () => {
      window.clearTimeout(myActionTimer);
      window.clearTimeout(myResetTimer);
      window.clearTimeout(myFlightEndTimer);
    };
  }, []);

  useEffect(() => {
    const myBird = myFlightBirdRef.current;
    if (!myFlight || !myBird) {
      return;
    }

    const myViewportWidth = window.innerWidth;
    const myViewportHeight = window.innerHeight;
    const myStartX = myFlight.myStartX;
    const myStartY = myFlight.myStartY;
    const myFirstX = Math.min(myViewportWidth - 70, Math.max(myStartX + 90, myViewportWidth * 0.32));
    const myFarX = Math.min(myViewportWidth - 58, Math.max(myFirstX + 80, myViewportWidth * (0.72 + Math.random() * 0.12)));
    const myMiddleX = Math.min(myViewportWidth - 78, Math.max(myStartX + 120, myViewportWidth * (0.43 + Math.random() * 0.13)));
    const myFlightDepth = Math.min(270, Math.max(145, myViewportHeight * 0.3));
    const myFirstY = Math.min(myFlightDepth, 76 + Math.random() * 70);
    const myFarY = Math.min(myFlightDepth, 125 + Math.random() * 110);
    const myMiddleY = Math.min(myFlightDepth, 66 + Math.random() * 95);

    const myAnimation = myBird.animate(
      [
        {
          offset: 0,
          opacity: 0.2,
          transform: "translate3d(0, 0, 0) rotate(0deg) scale(0.28)"
        },
        {
          offset: 0.09,
          opacity: 1,
          transform: "translate3d(24px, -34px, 0) rotate(-8deg) scale(0.68)",
          easing: "cubic-bezier(0.18, 0.72, 0.24, 1)"
        },
        {
          offset: 0.24,
          opacity: 1,
          transform: `translate3d(${myFirstX - myStartX}px, ${myFirstY - myStartY}px, 0) rotate(-4deg) scale(0.88)`,
          easing: "cubic-bezier(0.3, 0.05, 0.2, 1)"
        },
        {
          offset: 0.47,
          opacity: 1,
          transform: `translate3d(${myFarX - myStartX}px, ${myFarY - myStartY}px, 0) rotate(7deg) scale(1)`,
          easing: "cubic-bezier(0.34, 0.02, 0.2, 1)"
        },
        {
          offset: 0.69,
          opacity: 1,
          transform: `translate3d(${myMiddleX - myStartX}px, ${myMiddleY - myStartY}px, 0) rotate(-7deg) scale(0.9)`,
          easing: "cubic-bezier(0.32, 0, 0.22, 1)"
        },
        {
          offset: 0.86,
          opacity: 1,
          transform: `translate3d(${Math.min(100, myViewportWidth * 0.22)}px, ${Math.max(24, 82 - myStartY)}px, 0) rotate(8deg) scale(0.68)`,
          easing: "cubic-bezier(0.25, 0.02, 0.18, 1)"
        },
        {
          offset: 0.97,
          opacity: 1,
          transform: "translate3d(4px, -8px, 0) rotate(0deg) scale(0.34)"
        },
        {
          offset: 1,
          opacity: 0,
          transform: "translate3d(0, 0, 0) rotate(0deg) scale(0.28)"
        }
      ],
      {
        duration: myFlight.myDuration,
        fill: "both",
        easing: "linear"
      }
    );

    return () => myAnimation.cancel();
  }, [myFlight]);

  const myFlightLayer = myFlight ? createPortal(
    <span
      className="myOwlFlightAnchor"
      style={{ left: myFlight.myStartX, top: myFlight.myStartY }}
      aria-hidden="true"
    >
      <span ref={myFlightBirdRef} className="myOwlFlightBird">
        <span className="myOwlFlightTheme myOwlFlightThemeSnowy">
          <img
            className="myOwlFlightFrame myOwlFlightFrameUp"
            src={myAssetPath("/mascot/owl-snowy-flight-up.png")}
            alt=""
            width="512"
            height="384"
          />
          <img
            className="myOwlFlightFrame myOwlFlightFrameDown"
            src={myAssetPath("/mascot/owl-snowy-flight-down.png")}
            alt=""
            width="512"
            height="384"
          />
        </span>
        <span className="myOwlFlightTheme myOwlFlightThemeBlack">
          <img
            className="myOwlFlightFrame myOwlFlightFrameUp"
            src={myAssetPath("/mascot/owl-black-flight-up.png")}
            alt=""
            width="512"
            height="384"
          />
          <img
            className="myOwlFlightFrame myOwlFlightFrameDown"
            src={myAssetPath("/mascot/owl-black-flight-down.png")}
            alt=""
            width="512"
            height="384"
          />
        </span>
      </span>
    </span>,
    document.body
  ) : null;

  return (
    <>
      <span
        className={`myTinyOwl myTinyOwlPosition${myPosition} myTinyOwlAction-${myAction}${myFlight ? " myTinyOwlInFlight" : ""}`}
        aria-hidden="true"
      >
        <span className="myTinyOwlStage">
          <span className="myTinyOwlShadow" />
          <span ref={myPerchedOwlRef} className="myTinyOwlMotion">
            <img
              className="myTinyOwlImage myTinyOwlSnowy"
              src={myAssetPath("/mascot/owl-snowy.png")}
              alt=""
              width="209"
              height="384"
              decoding="async"
            />
            <img
              className="myTinyOwlImage myTinyOwlBlack"
              src={myAssetPath("/mascot/owl-black.png")}
              alt=""
              width="202"
              height="384"
              decoding="async"
            />
          </span>
        </span>
        <span className="myOwlFlightPreload">
          <img src={myAssetPath("/mascot/owl-snowy-flight-up.png")} alt="" />
          <img src={myAssetPath("/mascot/owl-snowy-flight-down.png")} alt="" />
          <img src={myAssetPath("/mascot/owl-black-flight-up.png")} alt="" />
          <img src={myAssetPath("/mascot/owl-black-flight-down.png")} alt="" />
        </span>
      </span>
      {myFlightLayer}
    </>
  );
}
