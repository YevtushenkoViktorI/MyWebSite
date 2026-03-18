export type myLanguageCode = "en" | "fr" | "de" | "uk";

export type myProjectItem = {
  myName: string;
  myDescription: string;
  myStack: string;
  myActionLabel: string;
  myUrl: string;
};

export type mySelectedWorkItem = {
  myTitle: string;
  myText: string;
  myTags: string[];
  myPoints: string[];
  myDetailTitle?: string;
  myDetailText?: string;
  myDetailImages?: string[];
};

export type mySelectedWorkSection = {
  myTitle: string;
  mySubtitle: string;
  myOpenDetailsLabel: string;
  myCloseDetailsLabel: string;
  myPrevLabel: string;
  myNextLabel: string;
  myPrevAriaLabel: string;
  myNextAriaLabel: string;
  myItems: mySelectedWorkItem[];
};

export type myExpertiseItem = {
  myTitle: string;
  myText: string;
  myTags: string[];
};

export type myExpertiseSection = {
  myTitle: string;
  mySubtitle: string;
  myPrevLabel: string;
  myNextLabel: string;
  myPrevAriaLabel: string;
  myNextAriaLabel: string;
  myItems: myExpertiseItem[];
};

export type myTimelineItem = {
  myTitle: string;
  myPlace: string;
  myPeriod: string;
  mySummary: string;
  myDocuments?: myCertificateDocument[];
};

export type myCertificateDocument = {
  myLabel: string;
  myFile: string;
  myDownloadName: string;
};

export type myCertificateItem = {
  myTitle: string;
  myPlace: string;
  myPeriod: string;
  mySummary: string;
  myDocuments: myCertificateDocument[];
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
    myHeroDetailTriggerLabel: string;
    myHeroDetailTitle: string;
    myHeroDetailParagraphs: string[];
    myHeroDetailInterestsTitle: string;
    myHeroDetailInterests: string[];
    myHeroDetailClosing: string;
    myHeroDetailCloseLabel: string;
    mySkillsVisible: string[];
    mySkillsAll: string[];
    myPrimaryButton: string;
    mySecondaryButton: string;
    myPortfolioButton: string;
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
  mySelectedWorkSection: mySelectedWorkSection;
  myExpertiseSection: myExpertiseSection;
  mySkillSection: {
    myTitle: string;
    myItems: string[];
  };
  myExperienceSection: {
    myTitle: string;
    mySubtitle: string;
    myItems: myTimelineItem[];
  };
  myEducationSection: {
    myTitle: string;
    myEducationTitle: string;
    myCertificatesTitle: string;
    myPreviewLabel: string;
    myDownloadLabel: string;
    myClosePreviewLabel: string;
    myItems: myTimelineItem[];
    myCertificates: myCertificateItem[];
  };
  myContactSection: {
    myTitle: string;
    myText: string;
    myOpportunityLines: string[];
    myMobileLine: string;
    myAddressCityLine: string;
    myAddressStreetLine: string;
    myMessengerTelegram: string;
    myMessengerViber: string;
    myMessengerWhatsApp: string;
    myEmailLabel: string;
    myEmail: string;
    myLocation: string;
    myLinkedinLabel: string;
    myGithubLabel: string;
    myUpworkLabel: string;
    myLinkedinUrl: string;
    myGithubUrl: string;
    myUpworkUrl: string;
  };
  myFooter: {
    myRights: string;
  };
};
