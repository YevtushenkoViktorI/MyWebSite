import type { myTranslation } from "../myTypes";

export const myFr: myTranslation = {
  myLanguageName: "Francais",
  myLabelLanguage: "Langue",
  myNav: {
    myAbout: "A propos",
    myProjects: "Projets",
    mySkills: "Competences",
    myExperience: "Experience",
    myEducation: "Formation",
    myContact: "Contact"
  },
  myHero: {
    myGreeting: "Bonjour, je suis",
    myName: "Votre Nom",
    myTitle: "Developpeur Frontend et Ingenieur UI",
    myDescription: "Je conçois et livre des sites produit rapides, accessibles et orientes resultat business.",
    myLocation: "Base en Europe, disponible en remote",
    myPrimaryButton: "Voir les projets",
    mySecondaryButton: "Me contacter"
  },
  myAboutSection: {
    myTitle: "A propos de moi",
    myText: "Je combine vision design et discipline d'ingenierie. Mon focus: architecture claire, UI maintenable, livraison previsible."
  },
  myProjectSection: {
    myTitle: "Projets en vedette",
    mySubtitle: "Une selection de projets avec impact mesurable.",
    myItems: [
      {
        myName: "Dashboard SaaS",
        myDescription: "Refonte du parcours onboarding et reporting, avec meilleure activation et moins de churn.",
        myStack: "React, TypeScript, Vite",
        myActionLabel: "Voir le cas",
        myUrl: "#"
      },
      {
        myName: "Landing E-commerce",
        myDescription: "Creation d'une page orientee conversion avec implementation front-end axee performance.",
        myStack: "React, CSS, A/B Testing",
        myActionLabel: "Ouvrir demo",
        myUrl: "#"
      },
      {
        myName: "Portfolio Builder",
        myDescription: "Architecture modulaire de sections et modele de contenu multilingue.",
        myStack: "React, i18n, Design System",
        myActionLabel: "Ouvrir repo",
        myUrl: "#"
      }
    ]
  },
  mySkillSection: {
    myTitle: "Competences cles",
    myItems: ["React", "TypeScript", "Vite", "Architecture CSS", "Accessibilite", "Performance", "UX Writing", "Localisation"]
  },
  myExperienceSection: {
    myTitle: "Experience",
    myItems: [
      {
        myTitle: "Developpeur Frontend",
        myPlace: "Entreprise Produit",
        myPeriod: "2023 - Aujourd'hui",
        mySummary: "Responsable de la livraison UI, en collaboration avec design et produit pour accelerer les releases."
      },
      {
        myTitle: "Developpeur Web",
        myPlace: "Agence Digitale",
        myPeriod: "2021 - 2023",
        mySummary: "Realisation de sites marketing et dashboards internes avec composants reutilisables et localisation."
      }
    ]
  },
  myEducationSection: {
    myTitle: "Formation",
    myItems: [
      {
        myTitle: "Informatique",
        myPlace: "Universite Technique",
        myPeriod: "2017 - 2021",
        mySummary: "Genie logiciel, algorithmes et technologies web."
      }
    ]
  },
  myContactSection: {
    myTitle: "Contact",
    myText: "Disponible pour projets freelance et equipes produit.",
    myEmail: "you@example.com",
    myLocation: "Europe",
    myLinkedinLabel: "LinkedIn",
    myGithubLabel: "GitHub",
    myLinkedinUrl: "https://linkedin.com",
    myGithubUrl: "https://github.com"
  },
  myFooter: {
    myRights: "Tous droits reserves"
  }
};
