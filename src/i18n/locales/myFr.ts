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
    myName: "Viktor Yevtushenko",
    myHeadlineLineOne: "Precision d'ingenierie.",
    myHeadlineLineTwo: "Des laboratoires semi-conducteurs aux systemes iOS evolutifs.",
    myTitle: "iOS Software Engineer | Swift, SwiftUI, UIKit, Firebase, ARKit",
    myDescription: "Developpeur iOS experimente avec 5+ ans dans des applications mobiles evolutives et performantes. Experience pratique en recherche sur les semi-conducteurs et en developpement de cartes de controle, avec une forte precision d'ingenierie.",
    myLocation: "Berne, Suisse · Ouvert aux postes remote et hybrides",
    myStatusLabel: "Ouvert aux opportunites",
    myMoreSkillsLabel: "Plus",
    mySkillsModalTitle: "Competences cles",
    mySkillsVisible: ["Swift", "SwiftUI", "UIKit", "Architecture", "Performance", "AI/AR", "Deep Links", "Streaming"],
    mySkillsAll: [
      "Swift",
      "SwiftUI",
      "UIKit",
      "Objective-C",
      "Core Data",
      "Firebase",
      "REST APIs",
      "Apple Pay",
      "Apple Maps",
      "Google Maps",
      "ARKit",
      "SceneKit",
      "RoomPlan",
      "Streaming temps reel",
      "Architecture systeme",
      "MVC/MVVM/MVP/VIPER",
      "Multilingue & RTL",
      "Nanotechnologies",
      "Deposition sous vide",
      "Ingenierie telecom",
      "Travaux sur corde industriels",
      "Travail en hauteur",
      "Installation sur mats et tours",
      "Systemes d'assurage et de rigging",
      "Protocoles de securite en hauteur",
      "Procedes couches minces",
      "Systemes et chambres a vide",
      "Analyse XRD",
      "Spectroscopie UV-Vis",
      "Recherche STM",
      "Calibration des equipements de laboratoire",
      "Controle qualite des materiaux semi-conducteurs"
    ],
    myPrimaryButton: "Voir les projets",
    mySecondaryButton: "Me contacter"
  },
  myAboutSection: {
    myTitle: "A propos de moi",
    myText: "Je combine vision design et discipline d'ingenierie. Mon focus: architecture claire, UI maintenable, livraison previsible."
  },
  myJourneySection: {
    myTitle: "Parcours d'ingenierie",
    mySubtitle: "Des laboratoires semi-conducteurs aux produits mobiles - un parcours guide par la precision technique.",
    myOpenDetailsLabel: "Ouvrir les details",
    myItems: [
      {
        myOrder: 1,
        myTitle: "Recherche en nanoelectronique",
        myDescription: "Construction d'une base d'ingenierie solide en procedes sous vide et en recherche sur les couches minces a la NTU KhPI.",
        myPoints: [
          "Travail avec les procedes close-space sublimation (CSS) et de depot de couches minces",
          "Analyse des materiaux par XRD et spectroscopie UV-Vis",
          "Etude de la morphologie de l'oxyde d'aluminium via des methodes de microscopie"
        ],
        myDetailTitle: "Recherche en nanoelectronique (2010-2016)",
        myDetailText: "Phase universitaire avec experimentation laboratoire sur les materiaux semi-conducteurs et les procedes couches minces.",
        myDetailImages: [
          { mySrc: "/journey/nanoelectronics.png", myAlt: "Details de recherche en nanoelectronique" },
          { mySrc: "/journey/vacuum-lab.png", myAlt: "Portfolio de laboratoire sous vide et couches minces" }
        ]
      },
      {
        myOrder: 2,
        myTitle: "Systemes sous vide & pratique laboratoire",
        myDescription: "Exploitation et optimisation d'equipements sous vide de niveau recherche pour des experiences stables et reproductibles.",
        myPoints: [
          "Reglage des parametres de procede pour depot et synthese des materiaux",
          "Amelioration de la qualite de fabrication par calibration iterative",
          "Documentation de methodes pratiques pour une execution fiable au laboratoire"
        ],
        myDetailTitle: "Systemes sous vide & calibration des procedes",
        myDetailText: "Pratique directe sur les systemes sous vide pour depot/synthese et optimisation iterative des parametres de processus.",
        myDetailImages: [
          { mySrc: "/journey/vacuum-lab.png", myAlt: "Pratique laboratoire sous vide et procedes semi-conducteurs" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Vue d'ensemble CV et parcours technique" }
        ]
      },
      {
        myOrder: 3,
        myTitle: "Installation telecom & mise en service",
        myDescription: "Transition vers l'ingenierie telecom terrain avec un focus sur la fiabilite et la precision operationnelle.",
        myPoints: [
          "Installation et mise en service d'equipements de reseaux abonnes",
          "Realisation de raccordements croises et resolution d'incidents reseau",
          "Coordination des taches quotidiennes d'une equipe de 4 techniciens"
        ],
        myDetailTitle: "Ingenierie telecom terrain (2016-2017)",
        myDetailText: "Execution terrain sur infrastructure telecom: installation, mise en service, depannage et coordination d'equipe.",
        myDetailImages: [
          { mySrc: "/journey/telecom-field.png", myAlt: "Details installation telecom et mise en service" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Chronologie du parcours dans le CV" }
        ]
      },
      {
        myOrder: 4,
        myTitle: "Travail en hauteur & infrastructure mobile",
        myDescription: "Livraison de projets telecom en hauteur avec des standards stricts de securite et de qualite.",
        myPoints: [
          "Installation et activation d'equipements de communication mobile sur des tours",
          "Alignement et calibration d'antennes pour ameliorer la qualite du signal",
          "Respect des protocoles de securite haute tension et travaux sur corde"
        ],
        myDetailTitle: "Travaux sur tours & protocoles de securite",
        myDetailText: "Travaux en hauteur sur infrastructure mobile avec activation d'equipements, calibration antennes et respect strict des normes securite.",
        myDetailImages: [
          { mySrc: "/journey/telecom-field.png", myAlt: "Travaux en hauteur sur infrastructure mobile" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Elements de preuve du parcours terrain" }
        ]
      },
      {
        myOrder: 5,
        myTitle: "Architecture iOS & ingenierie produit",
        myDescription: "Application de la rigueur d'ingenierie a l'architecture iOS, la maintenabilite et la stabilite en production.",
        myPoints: [
          "Developpement d'applications production avec Swift, SwiftUI, UIKit, Core Data et ARKit",
          "Mise en place d'architectures modulaires (MVC, MVVM, MVP, VIPER)",
          "Livraison de fonctionnalites multilingues, deep links et couches API evolutives"
        ],
        myDetailTitle: "Architecture iOS (2018-2023)",
        myDetailText: "Passage de l'ingenierie terrain au software produit avec architecture iOS modulaire et livraison fiable en production.",
        myDetailImages: [
          { mySrc: "/journey/ios-architecture.png", myAlt: "Details d'experience en architecture iOS" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Profil avec stack iOS" }
        ]
      },
      {
        myOrder: 6,
        myTitle: "Livraison temps reel & integrations",
        myDescription: "Focus sur les fonctionnalites mobiles cote utilisateur: paiements, cartes et flux temps reel adosses au cloud.",
        myPoints: [
          "Implementation d'Apple Wallet / Apple Pay et des flux d'achats integres",
          "Integration des services Firebase, notifications push et logique de presence",
          "Livraison de fonctionnalites avec Apple Maps, Google Maps et ArcGIS"
        ],
        myDetailTitle: "Livraison produit temps reel (2024-2025)",
        myDetailText: "Conception et maintenance de fonctionnalites temps reel dans des produits iOS: Firebase, presence, paiements et integrations cartographiques.",
        myDetailImages: [
          { mySrc: "/journey/realtime-delivery.png", myAlt: "Details de livraison produit temps reel" },
          { mySrc: "/journey/ios-architecture.png", myAlt: "Base precedente en architecture iOS" }
        ]
      }
    ]
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
