import type { myTimelineItem as myTimelineItemType } from "../i18n/myTypes";

type myTimelineItemProps = {
  myItem: myTimelineItemType;
  myPreviewLabel?: string;
  myOnPreview?: () => void;
};

export function MyTimelineItem({ myItem, myPreviewLabel, myOnPreview }: myTimelineItemProps) {
  return (
    <article className="myTimelineItem">
      <div className="myTimelineHead">
        <div>
          <h3 className="myProjectTitle">{myItem.myTitle}</h3>
          <p className="myTimelinePlace">{myItem.myPlace}</p>
        </div>
        <p className="mySmallLabel">{myItem.myPeriod}</p>
      </div>
      <p className="myProjectText">{myItem.mySummary}</p>
      {myOnPreview && myPreviewLabel ? (
        <button type="button" className="myCertificatePreviewButton" onClick={myOnPreview}>
          {myPreviewLabel}
        </button>
      ) : null}
    </article>
  );
}
