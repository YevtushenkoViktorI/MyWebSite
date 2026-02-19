import type { myTimelineItem as myTimelineItemType } from "../i18n/myTypes";

type myTimelineItemProps = {
  myItem: myTimelineItemType;
};

export function MyTimelineItem({ myItem }: myTimelineItemProps) {
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
    </article>
  );
}
