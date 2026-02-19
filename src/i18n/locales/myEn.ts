import type { myTranslation } from "../myTypes";

export const myEn: myTranslation = {
  myLanguageName: "English",
  myLabelLanguage: "Language",
  myNav: {
    myAbout: "About",
    myProjects: "Projects",
    mySkills: "Skills",
    myExperience: "Experience",
    myEducation: "Education",
    myContact: "Contact"
  },
  myHero: {
    myGreeting: "Hello, I am",
    myName: "Your Name",
    myTitle: "Frontend Developer and UI Engineer",
    myDescription: "I design and ship product websites that are fast, accessible and focused on business outcomes.",
    myLocation: "Based in Europe, available remotely",
    myPrimaryButton: "See Projects",
    mySecondaryButton: "Get in Touch"
  },
  myAboutSection: {
    myTitle: "About Me",
    myText: "I combine design thinking with engineering discipline. My focus is clear architecture, maintainable UI systems, and predictable delivery."
  },
  myProjectSection: {
    myTitle: "Featured Projects",
    mySubtitle: "A short list of projects with measurable impact.",
    myItems: [
      {
        myName: "SaaS Analytics Dashboard",
        myDescription: "Redesigned onboarding and reporting flow, improving activation and reducing churn in the first month.",
        myStack: "React, TypeScript, Vite",
        myActionLabel: "View Case",
        myUrl: "#"
      },
      {
        myName: "E-commerce Product Landing",
        myDescription: "Built a conversion-oriented landing page with performance-first front-end implementation.",
        myStack: "React, CSS, A/B Testing",
        myActionLabel: "Open Demo",
        myUrl: "#"
      },
      {
        myName: "Portfolio Builder",
        myDescription: "Implemented modular section architecture and multi-language content model for personal brands.",
        myStack: "React, i18n, Design System",
        myActionLabel: "Open Repo",
        myUrl: "#"
      }
    ]
  },
  mySkillSection: {
    myTitle: "Core Skills",
    myItems: ["React", "TypeScript", "Vite", "CSS Architecture", "Accessibility", "Performance", "UX Writing", "Localization"]
  },
  myExperienceSection: {
    myTitle: "Experience",
    myItems: [
      {
        myTitle: "Frontend Developer",
        myPlace: "Product Company",
        myPeriod: "2023 - Present",
        mySummary: "Own UI delivery for web features, collaborating with design and product to shorten release cycles."
      },
      {
        myTitle: "Web Developer",
        myPlace: "Digital Agency",
        myPeriod: "2021 - 2023",
        mySummary: "Delivered marketing sites and internal dashboards with reusable UI components and localization support."
      }
    ]
  },
  myEducationSection: {
    myTitle: "Education",
    myItems: [
      {
        myTitle: "Computer Science",
        myPlace: "Technical University",
        myPeriod: "2017 - 2021",
        mySummary: "Software engineering, algorithms, and web technologies."
      }
    ]
  },
  myContactSection: {
    myTitle: "Contact",
    myText: "Open to freelance projects and long-term product teams.",
    myEmail: "you@example.com",
    myLocation: "Europe",
    myLinkedinLabel: "LinkedIn",
    myGithubLabel: "GitHub",
    myLinkedinUrl: "https://linkedin.com",
    myGithubUrl: "https://github.com"
  },
  myFooter: {
    myRights: "All rights reserved"
  }
};
