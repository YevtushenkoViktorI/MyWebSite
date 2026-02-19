type myHeroSectionProps = {
  myGreeting: string;
  myName: string;
  myTitle: string;
  myDescription: string;
  myLocation: string;
  myPrimaryButton: string;
  mySecondaryButton: string;
  myDownloadLabel: string;
};

const myHeroTags = ["Swift", "SwiftUI", "UIKit", "Architecture", "Performance", "AI/AR", "Deep Links", "Streaming"];

export function MyHeroSection({
  myGreeting,
  myName,
  myTitle,
  myDescription,
  myLocation,
  myPrimaryButton,
  mySecondaryButton,
  myDownloadLabel
}: myHeroSectionProps) {
  return (
    <section id="myOverview" className="myHeroSectionWrap mySection">
      <div className="myHeroContent">
        <p className="mySmallLabel">{myGreeting}</p>
        <h1 className="myHeroName">Engineering precision.</h1>
        <h2 className="myHeroGradientTitle">From semiconductor labs to scalable iOS systems.</h2>
        <p className="myHeroText">{myDescription}</p>
        <p className="mySmallLabel">{myName} - {myTitle} - {myLocation}</p>

        <div className="myChipRow">
          {myHeroTags.map((myTag) => (
            <span key={myTag} className="myChip">{myTag}</span>
          ))}
        </div>

        <div className="myButtonRow">
          <a className="myPrimaryButton" href="#myProjects">{myPrimaryButton}</a>
          <a className="mySecondaryButton" href="#myContact">{myDownloadLabel}</a>
          <a className="myLinkButton" href="#myContact">{mySecondaryButton}</a>
        </div>
      </div>

      <div className="myHeroVisual">
        <div className="myHeroPhoto" />
        <div className="myStatusCard">
          <span className="myStatusDot" />
          Open to opportunities
        </div>
      </div>
    </section>
  );
}
