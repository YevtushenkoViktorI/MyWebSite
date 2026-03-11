import type { myTranslation } from "../myTypes";

export const myDe: myTranslation = {
  myLanguageName: "Deutsch",
  myLabelLanguage: "Sprache",
  myNav: {
    myAbout: "Uber mich",
    myProjects: "Projekte",
    mySkills: "Skills",
    myExperience: "Erfahrung",
    myEducation: "Ausbildung",
    myContact: "Kontakt"
  },
  myHero: {
    myGreeting: "Hallo, ich bin",
    myName: "Viktor Yevtushenko",
    myHeadlineLineOne: "Technische Prazision.",
    myHeadlineLineTwo: "Von Halbleiterlaboren zu skalierbaren iOS-Systemen.",
    myTitle: "iOS Software Engineer | Swift, SwiftUI, UIKit, Firebase, ARKit",
    myDescription: "Erfahrener iOS-Entwickler mit 5+ Jahren in skalierbaren, performanten Mobile-Apps. Praxiserfahrung in Halbleiterforschung und Entwicklung von Steuerplatinen, mit starkem analytischem Denken und technischer Prazision.",
    myLocation: "Bern, Schweiz · Offen fur Remote- und Hybrid-Rollen",
    myStatusLabel: "Offen fur neue Moglichkeiten",
    myMoreSkillsLabel: "Mehr",
    mySkillsModalTitle: "Kernkompetenzen",
    mySkillsVisible: ["Swift", "SwiftUI", "UIKit", "Architektur", "Performance", "AI/AR", "Deep Links", "Streaming"],
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
      "Echtzeit-Streaming",
      "Systemarchitektur",
      "MVC/MVVM/MVP/VIPER",
      "Mehrsprachigkeit & RTL",
      "Nanotechnologie",
      "Vakuum-Beschichtung",
      "Telekommunikationstechnik",
      "Industrieklettern",
      "Arbeiten in der Hohe",
      "Montage an Masten und Turmen",
      "Sicherungs- und Rigging-Systeme",
      "Sicherheitsprotokolle fur Hohenarbeit",
      "Dunnschichtprozesse",
      "Vakuumsysteme und Kammern",
      "XRD-Analyse",
      "UV-Vis-Spektroskopie",
      "STM-Forschung",
      "Kalibrierung von Laborgeraten",
      "Qualitatskontrolle von Halbleitermaterialien"
    ],
    myPrimaryButton: "Projekte ansehen",
    mySecondaryButton: "Kontakt aufnehmen"
  },
  myAboutSection: {
    myTitle: "Uber mich",
    myText: "Ich verbinde Design-Denken mit Engineering-Disziplin. Fokus: klare Architektur, wartbare UI-Systeme und planbare Lieferung."
  },
  myJourneySection: {
    myTitle: "Engineering Journey",
    mySubtitle: "Von Halbleiterlaboren zu Mobile-Produkten - ein Weg, gepragt von technischer Prazision.",
    myOpenDetailsLabel: "Details offnen",
    myItems: [
      {
        myOrder: 1,
        myTitle: "Nanoelektronik-Forschung",
        myDescription: "Aufbau einer starken ingenieurtechnischen Basis in Vakuumprozessen und Dunnschichtforschung an der NTU KhPI.",
        myPoints: [
          "Arbeit mit Close-Space Sublimation (CSS) und Dunnschicht-Depositionsprozessen",
          "Materialanalyse mit XRD und UV-Vis-Spektroskopie",
          "Untersuchung der Aluminiumoxid-Morphologie mit Mikroskopie-Methoden"
        ],
        myDetailTitle: "Nanoelektronik-Forschung (2010-2016)",
        myDetailText: "Universitatsphase mit Laborarbeit an Halbleitermaterialien, Dunnschichtprozessen und nanostrukturellen Untersuchungen.",
        myDetailImages: [
          { mySrc: "/journey/nanoelectronics.png", myAlt: "Details zur Nanoelektronik-Forschung" },
          { mySrc: "/journey/vacuum-lab.png", myAlt: "Portfolio zu Vakuum- und Dunnschichtprozessen" }
        ]
      },
      {
        myOrder: 2,
        myTitle: "Vakuumsysteme & Laborpraxis",
        myDescription: "Betrieb und Optimierung von Forschungs-Vakuumanlagen fur stabile und reproduzierbare Experimente.",
        myPoints: [
          "Konfiguration von Prozessparametern fur Deposition und Materialsynthese",
          "Verbesserung der Fertigungsqualitat durch iterative Kalibrierung",
          "Dokumentation praktischer Methoden fur zuverlassige Laborablaufe"
        ],
        myDetailTitle: "Vakuumsysteme & Prozesskalibrierung",
        myDetailText: "Praktischer Umgang mit Vakuumsystemen fur Materialdeposition und Synthese inklusive iterativer Prozessoptimierung.",
        myDetailImages: [
          { mySrc: "/journey/vacuum-lab.png", myAlt: "Vakuum-Laborpraxis und Halbleiterprozesse" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Lebenslauf-Uberblick mit Engineering-Background" }
        ]
      },
      {
        myOrder: 3,
        myTitle: "Telekom-Installation & Inbetriebnahme",
        myDescription: "Wechsel in die Telekom-Feldtechnik mit Fokus auf Zuverlassigkeit und operative Prazision.",
        myPoints: [
          "Installation und Inbetriebnahme von Teilnehmernetztechnik",
          "Durchfuhrung von Kabel-Kreuzschaltungen und Storungsbehebung",
          "Koordination der Tagesaufgaben eines 4-kopfigen Technikerteams"
        ],
        myDetailTitle: "Telekom-Feldtechnik (2016-2017)",
        myDetailText: "Feldeinsatz in der Telekom-Infrastruktur mit Installation, Inbetriebnahme, Fehleranalyse und Teamkoordination.",
        myDetailImages: [
          { mySrc: "/journey/telecom-field.png", myAlt: "Details zu Telekom-Installation und Inbetriebnahme" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Zeitlinie im Lebenslauf" }
        ]
      },
      {
        myOrder: 4,
        myTitle: "Hohenarbeit & Mobile Infrastruktur",
        myDescription: "Umsetzung von Telekom-Projekten in der Hohe unter strengen Sicherheitsstandards.",
        myPoints: [
          "Installation und Aktivierung mobiler Kommunikationsanlagen auf Turmen",
          "Ausrichtung und Kalibrierung von Antennen fur bessere Signalqualitat",
          "Arbeit nach Hochspannungs- und Industriekletter-Sicherheitsprotokollen"
        ],
        myDetailTitle: "Turm-Montage & Sicherheitsprotokolle",
        myDetailText: "Durchfuhrung von Arbeiten in der Hohe: Aktivierung von Infrastruktur, Antennenkalibrierung und strikte Sicherheitsstandards.",
        myDetailImages: [
          { mySrc: "/journey/telecom-field.png", myAlt: "Hohenarbeit in der mobilen Infrastruktur" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Dokumentierter Feld- und Sicherheitskontext" }
        ]
      },
      {
        myOrder: 5,
        myTitle: "iOS-Architektur & Product Engineering",
        myDescription: "Ubertragung von Engineering-Disziplin auf iOS-Architektur, Wartbarkeit und Produktionsstabilitat.",
        myPoints: [
          "Entwicklung produktiver Apps mit Swift, SwiftUI, UIKit, Core Data und ARKit",
          "Umsetzung modularer Architekturansatze (MVC, MVVM, MVP, VIPER)",
          "Lieferung von Mehrsprachigkeit, Deep Links und skalierbaren API-Schichten"
        ],
        myDetailTitle: "iOS-Architektur (2018-2023)",
        myDetailText: "Ubergang von Feldtechnik zu Produktsoftware mit Fokus auf modulare iOS-Architektur und stabile Auslieferung.",
        myDetailImages: [
          { mySrc: "/journey/ios-architecture.png", myAlt: "Details zur iOS-Architektur-Erfahrung" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Profil mit iOS-Technologie-Stack" }
        ]
      },
      {
        myOrder: 6,
        myTitle: "Echtzeit-Delivery & Integrationen",
        myDescription: "Fokus auf nutzernahe Mobile-Features fur Zahlungen, Karten und cloudgestutzte Echtzeitablaufe.",
        myPoints: [
          "Implementierung von Apple Wallet / Apple Pay und In-App-Purchase-Flows",
          "Integration von Firebase-Services, Push-Benachrichtigungen und Presence-Logik",
          "Auslieferung von Features mit Apple Maps, Google Maps und ArcGIS"
        ],
        myDetailTitle: "Echtzeit-Produktlieferung (2024-2025)",
        myDetailText: "Entwicklung und Betrieb von Echtzeit-Features in iOS-Produkten mit Firebase, Presence-Logik, Zahlungen und Kartenintegrationen.",
        myDetailImages: [
          { mySrc: "/journey/realtime-delivery.png", myAlt: "Details zur Echtzeit-Produktlieferung" },
          { mySrc: "/journey/ios-architecture.png", myAlt: "Vorherige iOS-Basis als Fundament" }
        ]
      }
    ]
  },
  myProjectSection: {
    myTitle: "Ausgewahlte Projekte",
    mySubtitle: "Kleine Auswahl mit messbarem Impact.",
    myItems: [
      {
        myName: "SaaS Analytics Dashboard",
        myDescription: "Onboarding- und Reporting-Flow neu gestaltet, mit besserer Aktivierung und weniger Churn.",
        myStack: "React, TypeScript, Vite",
        myActionLabel: "Case ansehen",
        myUrl: "#"
      },
      {
        myName: "E-Commerce Landing",
        myDescription: "Conversion-orientierte Landingpage mit performance-fokussierter Frontend-Umsetzung.",
        myStack: "React, CSS, A/B Testing",
        myActionLabel: "Demo offnen",
        myUrl: "#"
      },
      {
        myName: "Portfolio Builder",
        myDescription: "Modulare Sektionen und mehrsprachiges Content-Modell fur Personal Brands umgesetzt.",
        myStack: "React, i18n, Design System",
        myActionLabel: "Repo offnen",
        myUrl: "#"
      }
    ]
  },
  mySkillSection: {
    myTitle: "Kernkompetenzen",
    myItems: ["React", "TypeScript", "Vite", "CSS Architektur", "Barrierefreiheit", "Performance", "UX Writing", "Lokalisierung"]
  },
  myExperienceSection: {
    myTitle: "Erfahrung",
    myItems: [
      {
        myTitle: "Frontend Entwickler",
        myPlace: "Produktunternehmen",
        myPeriod: "2023 - Heute",
        mySummary: "Verantworte UI-Lieferung fur Web-Features in enger Zusammenarbeit mit Design und Produkt."
      },
      {
        myTitle: "Web Entwickler",
        myPlace: "Digitalagentur",
        myPeriod: "2021 - 2023",
        mySummary: "Marketing-Websites und interne Dashboards mit wiederverwendbaren Komponenten und Lokalisierung geliefert."
      }
    ]
  },
  myEducationSection: {
    myTitle: "Ausbildung",
    myItems: [
      {
        myTitle: "Informatik",
        myPlace: "Technische Universitat",
        myPeriod: "2017 - 2021",
        mySummary: "Software Engineering, Algorithmen und Web-Technologien."
      }
    ]
  },
  myContactSection: {
    myTitle: "Kontakt",
    myText: "Offen fur Freelance-Projekte und langfristige Zusammenarbeit mit Produktteams.",
    myEmail: "you@example.com",
    myLocation: "Europa",
    myLinkedinLabel: "LinkedIn",
    myGithubLabel: "GitHub",
    myLinkedinUrl: "https://linkedin.com",
    myGithubUrl: "https://github.com"
  },
  myFooter: {
    myRights: "Alle Rechte vorbehalten"
  }
};
