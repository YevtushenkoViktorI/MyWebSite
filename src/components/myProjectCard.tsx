import type { myProjectItem } from "../i18n/myTypes";

type myProjectCardProps = {
  myItem: myProjectItem;
};

export function MyProjectCard({ myItem }: myProjectCardProps) {
  return (
    <article className="myProjectCard">
      <h3 className="myProjectTitle">{myItem.myName}</h3>
      <p className="myProjectText">{myItem.myDescription}</p>
      <p className="myProjectStack">{myItem.myStack}</p>
      <a href={myItem.myUrl} target="_blank" rel="noreferrer" className="myGhostButton">
        {myItem.myActionLabel}
      </a>
    </article>
  );
}
