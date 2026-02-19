type mySectionTitleProps = {
  myTitle: string;
  mySubtitle?: string;
};

export function MySectionTitle({ myTitle, mySubtitle }: mySectionTitleProps) {
  return (
    <div className="mySectionTitleWrap">
      <h2 className="mySectionTitle">{myTitle}</h2>
      {mySubtitle ? <p className="mySectionText">{mySubtitle}</p> : null}
    </div>
  );
}
