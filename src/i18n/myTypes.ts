export type myLanguageCode = "en" | "fr" | "de" | "uk";

export type myProjectItem = {
  myName: string;
  myDescription: string;
  myStack: string;
  myActionLabel: string;
  myUrl: string;
};

export type myTimelineItem = {
  myTitle: string;
  myPlace: string;
  myPeriod: string;
  mySummary: string;
};

export type myJourneyItem = {
  myOrder: number;
  myTitle: string;
  myDescription: string;
  myPoints: string[];
  myDetailTitle: string;
  myDetailText: string;
  myDetailImages: Array<{
    mySrc: string;
    myAlt: string;
  }>;
};

export type myTranslation = {
  myLanguageName: string;
  myLabelLanguage: string;
  myNav: {
    myAbout: string;
    myProjects: string;
    mySkills: string;
    myExperience: string;
    myEducation: string;
    myContact: string;
  };
  myHero: {
    myGreeting: string;
    myName: string;
    myHeadlineLineOne: string;
    myHeadlineLineTwo: string;
    myTitle: string;
    myDescription: string;
    myLocation: string;
    myStatusLabel: string;
    myMoreSkillsLabel: string;
    mySkillsModalTitle: string;
    mySkillsVisible: string[];
    mySkillsAll: string[];
    myPrimaryButton: string;
    mySecondaryButton: string;
  };
  myAboutSection: {
    myTitle: string;
    myText: string;
  };
  myJourneySection: {
    myTitle: string;
    mySubtitle: string;
    myOpenDetailsLabel: string;
    myItems: myJourneyItem[];
  };
  myProjectSection: {
    myTitle: string;
    mySubtitle: string;
    myItems: myProjectItem[];
  };
  mySkillSection: {
    myTitle: string;
    myItems: string[];
  };
  myExperienceSection: {
    myTitle: string;
    myItems: myTimelineItem[];
  };
  myEducationSection: {
    myTitle: string;
    myItems: myTimelineItem[];
  };
  myContactSection: {
    myTitle: string;
    myText: string;
    myEmail: string;
    myLocation: string;
    myLinkedinLabel: string;
    myGithubLabel: string;
    myLinkedinUrl: string;
    myGithubUrl: string;
  };
  myFooter: {
    myRights: string;
  };
};
