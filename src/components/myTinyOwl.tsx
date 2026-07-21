import { useEffect, useRef, useState } from "react";
import { myAssetPath } from "../utils/myAssetPath";

type myOwlAction = "idle" | "lookLeft" | "lookRight" | "hopLeft" | "hopRight" | "ruffle";
type myOwlPosition = -1 | 0 | 1;

const myActionDurations: Record<Exclude<myOwlAction, "idle">, number> = {
  lookLeft: 1550,
  lookRight: 1450,
  hopLeft: 920,
  hopRight: 920,
  ruffle: 1050
};

export function MyTinyOwl() {
  const [myAction, setMyAction] = useState<myOwlAction>("idle");
  const [myPosition, setMyPosition] = useState<myOwlPosition>(0);
  const myPositionRef = useRef<myOwlPosition>(0);

  useEffect(() => {
    const myReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (myReducedMotion.matches) {
      return;
    }

    let myActionTimer = 0;
    let myResetTimer = 0;

    const myScheduleNextAction = () => {
      const myDelay = 4200 + Math.random() * 6800;

      myActionTimer = window.setTimeout(() => {
        const myChance = Math.random();
        let myNextAction: Exclude<myOwlAction, "idle">;

        if (myChance < 0.3) {
          myNextAction = "lookLeft";
        } else if (myChance < 0.6) {
          myNextAction = "lookRight";
        } else if (myChance < 0.76) {
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
    };
  }, []);

  return (
    <span
      className={`myTinyOwl myTinyOwlPosition${myPosition} myTinyOwlAction-${myAction}`}
      aria-hidden="true"
    >
      <span className="myTinyOwlStage">
        <span className="myTinyOwlShadow" />
        <span className="myTinyOwlMotion">
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
    </span>
  );
}
