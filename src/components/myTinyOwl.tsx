import { useEffect, useMemo, useState } from "react";

const myOwlPositions = [
  { myX: "calc(100vw - 82px)", myY: "18vh" },
  { myX: "22px", myY: "30vh" },
  { myX: "calc(100vw - 92px)", myY: "58vh" },
  { myX: "34px", myY: "72vh" },
  { myX: "calc(100vw - 118px)", myY: "78vh" }
];

function myGetNextOwlIndex(myCurrentIndex: number) {
  if (myOwlPositions.length <= 1) {
    return 0;
  }

  let myNextIndex = myCurrentIndex;
  while (myNextIndex === myCurrentIndex) {
    myNextIndex = Math.floor(Math.random() * myOwlPositions.length);
  }

  return myNextIndex;
}

export function MyTinyOwl() {
  const [myPositionIndex, setMyPositionIndex] = useState(0);
  const [myIsLookingLeft, setMyIsLookingLeft] = useState(false);
  const myPosition = myOwlPositions[myPositionIndex];
  const myStyle = useMemo(
    () => ({
      "--myOwlX": myPosition.myX,
      "--myOwlY": myPosition.myY
    }) as React.CSSProperties,
    [myPosition]
  );

  useEffect(() => {
    const myMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (myMotionQuery.matches) {
      return;
    }

    let myMoveTimer = 0;
    let myLookTimer = 0;

    const myScheduleMove = () => {
      myMoveTimer = window.setTimeout(() => {
        setMyPositionIndex((myCurrentIndex) => myGetNextOwlIndex(myCurrentIndex));
        myScheduleMove();
      }, 10500 + Math.random() * 9000);
    };

    const myScheduleLook = () => {
      myLookTimer = window.setTimeout(() => {
        setMyIsLookingLeft((myCurrentValue) => !myCurrentValue);
        myScheduleLook();
      }, 2800 + Math.random() * 4200);
    };

    myScheduleMove();
    myScheduleLook();

    return () => {
      window.clearTimeout(myMoveTimer);
      window.clearTimeout(myLookTimer);
    };
  }, []);

  return (
    <div
      className={myIsLookingLeft ? "myTinyOwl myTinyOwlLookLeft" : "myTinyOwl"}
      style={myStyle}
      aria-hidden="true"
    >
      <svg className="myTinyOwlSvg" viewBox="0 0 64 64">
        <path className="myTinyOwlWing myTinyOwlWingLeft" d="M17 30c-7 3-9 10-7 17 7-1 12-6 13-13z" />
        <path className="myTinyOwlWing myTinyOwlWingRight" d="M47 30c7 3 9 10 7 17-7-1-12-6-13-13z" />
        <path className="myTinyOwlBody" d="M32 9c12 0 22 10 22 24 0 13-8 23-22 23S10 46 10 33C10 19 20 9 32 9z" />
        <path className="myTinyOwlBrow" d="M17 17 28 13 32 20 36 13 47 17 42 25H22z" />
        <circle className="myTinyOwlEye" cx="24" cy="29" r="7" />
        <circle className="myTinyOwlEye" cx="40" cy="29" r="7" />
        <circle className="myTinyOwlPupil myTinyOwlPupilLeft" cx="25" cy="29" r="2.3" />
        <circle className="myTinyOwlPupil myTinyOwlPupilRight" cx="41" cy="29" r="2.3" />
        <path className="myTinyOwlBlink" d="M17 29h14M33 29h14" />
        <path className="myTinyOwlBeak" d="M32 33 27 39h10z" />
        <path className="myTinyOwlBelly" d="M21 41c4 6 18 6 22 0" />
        <path className="myTinyOwlFoot" d="M24 55h7M33 55h7" />
      </svg>
    </div>
  );
}
