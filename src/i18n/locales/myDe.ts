import type { myJourneyItem, myProjectItem, myTimelineItem, myTranslation } from "../myTypes";
import { mySelectedWorkSectionDe } from "../mySelectedWorkLocales";
import { myExpertiseSectionDe } from "../myExpertiseLocales";
import { myEn } from "./myEn";

const myJourneyItemsDe: myJourneyItem[] = [
  {
    ...myEn.myJourneySection.myItems[0],
    myTitle: "Embedded Systems & Mikrocontroller-Entwicklung",
    myDescription: "Praktische Erfahrung in Embedded-Entwicklung durch Design elektronischer Steuerplatinen, AVR-Mikrocontroller-Programmierung in Assembly und Aufbau realer Hardware-Systeme. Diese Phase staerkte mein Verstaendnis fuer Low-Level-Logik, Echtzeitverhalten und den kompletten Engineering-Zyklus von Schaltung bis Firmware.",
    myPoints: [
      "Entwurf und Aufbau kundenspezifischer elektronischer Steuerplatinen",
      "Programmierung von AVR-Mikrocontrollern in Assembly mit AVR Studio",
      "Simulation von Mikrocontroller-Schaltungen und Logik in Proteus",
      "Entwicklung von LED-Anzeigesystemen und Steuer-Firmware",
      "Debugging der Hardware-Software-Interaktion in realen Geraeten"
    ],
    myDetailTitle: "Embedded Systems & Mikrocontroller-Entwicklung (2006-2016)",
    myDetailText: "Ich arbeitete an Low-Level-Embedded-Systemen, Schaltungsdesign und Firmware-Entwicklung mit AVR-Mikrocontrollern in Assembly. Ich entwarf Hardware, schrieb Firmware und baute reale Geraete, darunter Anzeigecontroller, Steuerplatinen und Labor-Elektronik.\n\nMeine Engineering-Praxis begann bereits in der Schule im Funktechnik-Club und setzte sich an der Universitaet fort, wo ich praktische Kompetenzen in Elektronik, Mikrocontrollern und Echtzeit-Steuerung aufbaute.\n\nWichtige Engineering-Aktivitaeten\n\n• Entwurf und Aufbau kundenspezifischer elektronischer Steuerplatinen\n• Programmierung von AVR-Mikrocontrollern in Assembly mit AVR Studio\n• Simulation von Embedded-Systemen und Schaltungen in Proteus\n• Entwicklung eines LED-Wechselkurs-Displays fuer eine Bank\n• Entwicklung eines flexiblen LED-Displays auf transparenter Tragerfolie\n• Hardware- und Firmware-Design fuer Display-Controller\n• Entwicklung von Monitoring- und Control-Firmware fuer elektronische Geraete\n• Aufbau von Audio-Verstaerkern und kundenspezifischen Elektronikmodulen\n• Teilnahme an regionalen Funktechnik-Wettbewerben\n• Arbeit mit Sensoren, Relais, Treibern und Signal-Steuerschaltungen\n\nEntwickelte Engineering-Skills\n\n• Embedded-Systemarchitektur\n• AVR-Mikrocontroller-Programmierung\n• Assembly-Entwicklung\n• PCB- und Schaltungsdesign\n• LED-Display- und Treibersysteme\n• Echtzeit-Steuerlogik\n• Hardware-Debugging und Tests\n• Proteus-Simulationsumgebung\n• Analoge und digitale Elektronik\n• Grundlagen der Funktechnik"
  },
  {
    ...myEn.myJourneySection.myItems[1],
    myTitle: "Nanoelektronik-Forschung",
    myDescription: "Aufbau einer starken Engineering-Basis in Halbleitermaterialien, Nanostrukturen und Vakuum-Beschichtungsprozessen waehrend meines Studiums an der NTU KhPI. Diese Forschung praegte analytisches Denken, technische Praezision und reproduzierbare Experimentgestaltung.",
    myPoints: [
      "Duennschicht-Experimente mit Close-Spaced Sublimation (CSS)",
      "Untersuchung von Halbleitermaterialien, inklusive CdS-Duennschichten",
      "Strukturanalyse mit Roentgendiffraktion (XRD)",
      "Analyse optischer Eigenschaften mit UV-Vis-Spektrophotometrie",
      "Untersuchung von Nanostrukturen mit Rastertunnelmikroskopie (STM)"
    ],
    myDetailTitle: "Nanoelektronik-Forschung (2010-2016)",
    myDetailText: "Bachelor-Studium in Mikro- und Nanoelektronik an der Nationalen Technischen Universitaet \"Kharkiv Polytechnic Institute\".\n\nIn dieser Zeit arbeitete ich mit Halbleitermaterialien, Nanostrukturen und Vakuum-Depositionsverfahren. Der Fokus lag auf Duennschicht-Fabrikation, Materialcharakterisierung und Nanostruktur-Analyse.\n\nWichtige Engineering-Aktivitaeten\n\n• Entwurf und Betrieb von Vakuum-Depositionssystemen fuer Duennschichtprozesse\n• CSS-Deposition von CdS-Duennschichten fuer Solarzellenanwendungen\n• Aufbau von Temperatur-Monitoring- und Regelplatinen fuer Vakuumkammern\n• XRD-Analysen zur Bestimmung kristalliner Strukturen\n• Messung optischer Eigenschaften mit UV-Vis-Spektrophotometrie\n• Synthese poroeser anodischer Aluminiumoxid-(AAO)-Nanostrukturen\n• Untersuchung der Oberflaechenmorphologie mit STM\n\nEntwickelte Engineering-Skills\n\n• Experimentelles Systemdesign\n• Grundlagen der Vakuumtechnik\n• Halbleiter-Materialwissenschaft\n• Nanostruktur-Fabrikation\n• Wissenschaftliche Datenanalyse\n• Kalibrierung von Laborgeraeten"
  },
  {
    ...myEn.myJourneySection.myItems[2],
    myTitle: "Vakuumsysteme & Laborpraxis",
    myDescription: "Betrieb und Feinabstimmung von Forschungs-Vakuumanlagen fuer Duennschicht-Deposition und Materialsynthese waehrend der Laborarbeit an der NTU KhPI. Diese Praxis staerkte Troubleshooting, Prozessstabilitaet und disziplinierte Laborablaeufe.",
    myPoints: [
      "Konfiguration von Prozessparametern fuer stabile Vakuumexperimente",
      "Kalibrierung von Temperaturregelsystemen fuer Depositionskammern",
      "Aufbau und Wartung experimenteller Setups fuer reproduzierbare Synthese",
      "Ueberwachung der Vakuumbedingungen und Sicherung der Prozessstabilitaet",
      "Dokumentation von Laborprozeduren und Experimentkonfigurationen"
    ],
    myDetailTitle: "Vakuumsysteme & Laborpraxis (2010-2016)",
    myDetailText: "Waehrend meines Studiums der Mikro- und Nanoelektronik sammelte ich praktische Erfahrung mit Labor-Vakuumsystemen zur Halbleiter-Materialfertigung.\n\nDie Arbeit umfasste Konfiguration von Depositionsanlagen, stabile Vakuumbedingungen und Kalibrierung experimenteller Systeme fuer wiederholbare Fertigungsprozesse.\n\nWichtige Engineering-Aktivitaeten\n\n• Betrieb von Labor-Vakuum-Depositionssystemen fuer Duennschichtprozesse\n• Konfiguration von Temperatur- und Druckparametern fuer Deposition\n• Aufbau experimenteller Setups und Vakuumkammer-Komponenten\n• Kalibrierung von Temperatur-Monitoring- und Regelsystemen\n• Ueberwachung der Vakuumstabilitaet und Sicherung experimenteller Zuverlaessigkeit\n• Dokumentation von Experimentablaeufen und Systemkonfigurationen\n\nEntwickelte Engineering-Skills\n\n• Betrieb und Wartung von Vakuumsystemen\n• Kalibrierung experimenteller Ausruestung\n• Parameter-Tuning und Prozessoptimierung\n• Organisation von Labor-Workflows\n• Troubleshooting experimenteller Systeme\n• Praezisions-Engineering und Messtechnik-Disziplin"
  },
  {
    ...myEn.myJourneySection.myItems[3],
    myTitle: "Telekom-Installation & Inbetriebnahme",
    myDescription: "Wechsel in die Telekom-Feldtechnik mit Fokus auf zuverlaessige Netzinstallation und operative Infrastruktur. Diese Erfahrung staerkte technische Disziplin, Fehlersuche und Arbeit in grosser, realer Infrastruktur.",
    myPoints: [
      "Installation und Inbetriebnahme drahtgebundener Teilnehmernetztechnik",
      "Kabelspleiss, Kreuzschaltungen und Verdrahtung von Verteilerschraenken",
      "Diagnose und Behebung von Leitungsstoerungen und Verbindungsfehlern",
      "Konfiguration von Routing-Verbindungen in Telekom-Verteilknoten",
      "Koordination taeglicher Aufgaben eines kleinen Technikerteams"
    ],
    myDetailTitle: "Telekom-Feldtechnik (2016-2017)",
    myDetailText: "Ich arbeitete als Techniker fuer Installation und Inbetriebnahme im drahtgebundenen Teilnehmernetz.\n\nDer Fokus lag auf Installation, Spleissarbeiten, Kreuzschaltungen und Stoerungsbehebung in realen Betriebsumgebungen.\n\nWichtige Engineering-Aktivitaeten\n\n• Installation und Inbetriebnahme drahtgebundener Teilnehmernetztechnik\n• Kabelspleiss und Leitungsverbindungen mit professionellem Equipment\n• Kreuzschaltungen in Verteilerschraenken fuer korrektes Traffic-Routing\n• Einsatz von 3M-Verbindungssystemen fuer modulare Kabelterminierung\n• Diagnose und Reparatur von Teilnehmernetz-Fehlern\n• Unterstuetzung bei Feldplanung und Teamkoordination\n\nEntwickelte Engineering-Skills\n\n• Telekom-Infrastruktur-Installation\n• Kabelspleiss und Netzterminierung\n• Feld-Diagnostik und Troubleshooting\n• Cross-Connection-Design in Verteilerschraenken\n• Infrastruktur-Wartung und Reparatur\n• Teamkoordination im Feldeinsatz"
  },
  {
    ...myEn.myJourneySection.myItems[4],
    myTitle: "Hoehenarbeit & Mobile Infrastruktur",
    myDescription: "Installation und Inbetriebnahme mobiler Kommunikationsinfrastruktur unter realen Feldbedingungen, inklusive Hoehenarbeit und Basisstations-Deployment. Diese Phase foerderte Disziplin, Praezision und Verantwortung in sicherheitskritischen Umgebungen.",
    myPoints: [
      "Installation und Kalibrierung mobiler Antennen und Basisstations-Hardware",
      "Arbeiten in der Hoehe gemaess industriellen Sicherheitsprotokollen",
      "Test und Konfiguration von Funkkommunikationssystemen",
      "Unterstuetzung bei Aktivierung und Verifikation mobiler Netzstationen",
      "Sicherstellung von Anlagenzuverlaessigkeit in Outdoor-Risikoumgebungen"
    ],
    myDetailTitle: "Hoehenarbeit & Mobile Infrastruktur (2016-2017)",
    myDetailText: "Ich arbeitete im Telekom-Feldteam fuer Installation und Inbetriebnahme mobiler Kommunikationstechnik, inklusive Basisstationen, Antennen und Funkinfrastruktur.\n\nDie Arbeit umfasste Hoehenoperationen, Kalibrierung und Feldtests unter realen Betriebsbedingungen.\n\nWichtige Engineering-Aktivitaeten\n\n• Installation mobiler Kommunikationstechnik auf Tuermen und Daechern\n• Montage und Ausrichtung von Antennen fuer optimale Signalabdeckung\n• Kalibrierung und Tests von Basisstations-Komponenten\n• Unterstuetzung bei Aktivierung und Verifikation mobiler Netzstationen\n• Strikte Einhaltung industrieller Sicherheitsverfahren bei Hoehenarbeit\n• Wartung und Inspektion von Telekom-Infrastruktur\n\nEntwickelte Engineering-Skills\n\n• Installation mobiler Netzwerkinfrastruktur\n• Antennenausrichtung und Kalibrierung\n• Sicherheitsdisziplin bei Hoehenarbeit\n• Feldtests technischer Anlagen\n• Outdoor-Engineering-Operationen\n• Verantwortung in sicherheitskritischen Umgebungen"
  },
  {
    ...myEn.myJourneySection.myItems[5],
    myTitle: "Mobile Software Engineering",
    myDescription: "Uebertragung von Engineering-Disziplin auf mobile Produktentwicklung mit Fokus auf skalierbare iOS-Architektur, modularen Code und produktionsreife Apps. Diese Stufe transformierte meinen Background in belastbare Softwarearchitektur-Kompetenz.",
    myPoints: [
      "Entwicklung produktiver Apps mit Swift, SwiftUI, UIKit, CoreData und CloudKit",
      "Design modularer Architekturen mit MVC, MVVM, MVP und VIPER",
      "Implementierung von Echtzeit-Features mit Firebase, REST APIs und WebSockets",
      "Aufbau von Subscription-Systemen, Deep Links und Mehrsprachigkeit",
      "Optimierung von Performance, Stabilitaet und Wartbarkeit fuer App-Store-Release"
    ],
    myDetailTitle: "iOS-Architektur & Produktentwicklung (2018-2025)",
    myDetailText: "Uebergang von Feld-Engineering zu Software-Produktentwicklung mit Fokus auf skalierbare Mobile-Apps, klare Architektur und Produktionszuverlaessigkeit.\n\nIch arbeitete an mehreren iOS-Projekten mit Echtzeitkommunikation, Cloud-Integration, UI/UX und modularen Architekturen.\n\nWichtige Engineering-Aktivitaeten\n\n• Entwicklung von iOS-Apps mit Swift, SwiftUI, UIKit und CoreData\n• Design modularer Architekturen mit MVC, MVVM, MVP und VIPER\n• Integration von Firebase-Services (Firestore, Cloud Functions, Messaging)\n• Aufbau von REST- und GraphQL-Networking-Layern\n• Implementierung von Chat, Presence-Tracking und Benachrichtigungen\n• Entwicklung von Subscription-Workflows mit Apple Pay und In-App-Purchases\n• Umsetzung von Deep Links, Universal Links und multilingualer UI\n• Optimierung von Speicherverbrauch, Startzeit und Performance\n• Wartung produktiver Apps und App-Store-Updates\n\nEntwickelte Engineering-Skills\n\n• iOS-Architekturdesign\n• Skalierbare Mobile-App-Entwicklung\n• Clean Code und modulare Systeme\n• Cloud-Integration und Echtzeitdaten\n• UI/UX-Engineering\n• Performance-Optimierung\n• Production-Release-Workflow\n• Langfristige Produktwartung"
  },
  {
    ...myEn.myJourneySection.myItems[6],
    myTitle: "Echtzeit-Delivery & Integrationen",
    myDescription: "Fokus auf produktionsreife mobile Features mit Echtzeitdaten, Cloud-Integration und Zahlungssystemen in mehreren iOS-Anwendungen. Diese Phase staerkte Systemdesign, Cloud-Kompetenz und stabile Echtzeitverhalten in Produktion.",
    myPoints: [
      "Implementierung von Apple Pay, In-App-Purchases und Subscription-Workflows",
      "Integration von Firebase-Services, Push-Notifications und Presence-Tracking",
      "Aufbau von Echtzeit-Features mit Firestore, Cloud Functions und REST APIs",
      "Entwicklung standortbasierter Logik und Kartenintegration (Apple Maps, Google Maps, ArcGIS)",
      "Lieferung skalierbarer Nutzerfeatures mit starkem Fokus auf Zuverlaessigkeit"
    ],
    myDetailTitle: "Echtzeit-Produktentwicklung (2024-2025)",
    myDetailText: "Ich arbeitete an produktiven iOS-Anwendungen mit Echtzeitdaten, Cloud-Integrationen, Zahlungssystemen und standortbasierten Features.\n\nDer Fokus lag auf zuverlaessiger Nutzerfunktionalitaet, skalierbarer Backend-Kommunikation und stabilem App-Verhalten.\n\nWichtige Engineering-Aktivitaeten\n\n• Entwicklung von Echtzeit-Features mit Firebase (Firestore, Cloud Functions, Messaging)\n• Implementierung von Apple Pay, Subscriptions und In-App-Purchase-Flows\n• Aufbau von Presence-Tracking, Online-Status und Background-Sync-Logik\n• Integration von Apple Maps, Google Maps und Location-Services\n• Umsetzung von Push-Notifications und stillen Background-Updates\n• Design von API-Layern mit REST und eventgetriebener Architektur\n• Optimierung von Datensynchronisierung, Speicherverbrauch und App-Performance\n• Wartung produktiver Apps und App-Store-Releases\n\nEntwickelte Engineering-Skills\n\n• Echtzeit-Mobile-Architektur\n• Cloud-Integration und Backend-Kommunikation\n• Payment- und Subscription-Systeme\n• Location- und Kartenintegration\n• Produktionsstabilitaet und Performance-Tuning\n• Eventgetriebenes App-Design\n• App-Store-Release-Workflow\n• Langfristige Produktwartung"
  }
];

const myProjectsDe: myProjectItem[] = [
  {
    ...myEn.myProjectSection.myItems[0],
    myDescription: "Onboarding- und Reporting-Flow neu gestaltet, Aktivierung verbessert und Churn im ersten Monat reduziert.",
    myActionLabel: "Case ansehen"
  },
  {
    ...myEn.myProjectSection.myItems[1],
    myName: "E-Commerce Produkt-Landingpage",
    myDescription: "Conversion-orientierte Landingpage mit performance-fokussierter Frontend-Umsetzung.",
    myActionLabel: "Demo offnen"
  },
  {
    ...myEn.myProjectSection.myItems[2],
    myDescription: "Modulare Section-Architektur und mehrsprachiges Content-Modell fuer Personal Brands implementiert.",
    myActionLabel: "Repo offnen"
  }
];

const myExperienceItemsDe: myTimelineItem[] = [
  {
    myTitle: "Teilnehmer Deutschkurs",
    myPlace: "LernPunkt, Bern",
    myPeriod: "Okt 2025 - Heute",
    mySummary: "Fortlaufendes Deutschlernen auf B1-Niveau als Vorbereitung auf eine langfristige technische Rolle in der Schweiz. Fokus auf professioneller Kommunikation fuer Engineering- und Software-Entwicklungsumfelder."
  },
  {
    myTitle: "Teilnehmer Mentoring-Programm",
    myPlace: "Power Hub Zug, Schweiz",
    myPeriod: "Aug 2025 - Nov 2025",
    mySummary: "Teilnehmer der 7th Wave Mentoring Program mit Fokus auf berufliche Integration und Jobsuche in der Schweiz. Das Programm umfasste Workshops, Networking-Events und individuelle Mentoring-Sessions zu Karriereentwicklung, technischer Positionierung und Chancen im Schweizer Engineering- und IT-Markt."
  },
  {
    myTitle: "Teilnehmer Deutschkurs",
    myPlace: "BINplus / ECAP, Bern",
    myPeriod: "Nov 2024 - Sep 2025",
    mySummary: "Intensives deutsches Integrationsprogramm in Bern abgeschlossen und parallel technische Selbstbildung sowie Softwareentwicklung fortgesetzt. Sprachkompetenz fuer die professionelle Arbeit in der Schweiz ausgebaut und auf weitere technische Entwicklung vorbereitet."
  },
  {
    myTitle: "Volunteer - Support Assistant im Fluechtlingscamp",
    myPlace: "Bern, Schweiz",
    myPeriod: "Jul 2023 - Nov 2024",
    mySummary: "Unterstuetzung von taeglichen Betriebsablaeufen und Kommunikationsprozessen in einem Fluechtlingszentrum waehrend der Anpassung an ein neues Umfeld. Gleichzeitig persoenliche Projekte und technisches Lernen in Softwareentwicklung und Engineering weitergefuehrt."
  },
  {
    myTitle: "iOS Developer",
    myPlace: "Freelance / Remote",
    myPeriod: "Jul 2018 - Jun 2023",
    mySummary: "Mehrere produktive iOS-Anwendungen mit Echtzeit-Features, Medienwiedergabe, AR, Networking, Subscriptions und skalierbarer Architektur entwickelt. Arbeit an Consumer- und Social-Apps mit Fokus auf Performance, modularem Design und wartbarer Codebasis. UI-Architektur, Custom Video Playback, AR-Features, Backend-Integrationen und Monetarisierungssysteme umgesetzt."
  },
  {
    myTitle: "Techniker fuer Hoehen- und Industrieinstallation",
    myPlace: "Polen",
    myPeriod: "2017 - 2018",
    mySummary: "Hoehenarbeiten bei industriellen Installationen in Kraftwerksanlagen. Taetigkeiten in Strukturmontage, Anlageninstallation und technischer Wartung unter anspruchsvollen Bedingungen mit hohem Anspruch an Praezision, Sicherheit und Teamarbeit."
  },
  {
    myTitle: "Telekom-Installationstechniker / Team Lead",
    myPlace: "Ukraine",
    myPeriod: "2016 - 2017",
    mySummary: "Installation von Mobilfunktechnik, drahtgebundenen Telekom-Systemen und Internet-Infrastruktur. Beteiligung an Feldinstallation, Geraete-Setup und Konfiguration von Netzwerkhardware. In mehreren Projekten Team-Lead-Rolle mit Koordination der Installationsaufgaben."
  },
  {
    myTitle: "Elektro- / Halbleiter-Engineering",
    myPlace: "Charkiw, Ukraine",
    myPeriod: "2010 - 2016",
    mySummary: "Ausbildung und Laborpraxis in Mikroelektronik, Halbleitermaterialien und elektronischen Systemen. Arbeit mit Laborequipment, Vakuumsystemen, elektronischen Schaltungen und Messgeraeten waehrend Studium und Forschungspraxis. Erfahrung in Halbleitermaterial-Forschung, Kristallstruktur-Analysen, Schaltungsaufbau, Vakuumtechnik, RF-/Telekom-Grundlagen, experimentellen Aufbauten und Hardware-Tests."
  }
];

export const myDe: myTranslation = {
  ...myEn,
  myLanguageName: "Deutsch",
  myLabelLanguage: "Sprache",
  myNav: {
    myAbout: "Uber mich",
    myProjects: "Projekte",
    mySkills: "Ingenieurweg",
    myExperience: "Erfahrung",
    myEducation: "Ausbildung",
    myContact: "Kontakt"
  },
  myHero: {
    ...myEn.myHero,
    myGreeting: "Hallo, ich bin",
    myHeadlineLineOne: "Technische Prazision.",
    myHeadlineLineTwo: "Von Halbleiterlaboren zu skalierbaren iOS-Systemen.",
    myDescription: "Ich bin iOS/macOS Developer mit mehr als 5 Jahren Erfahrung in der Entwicklung skalierbarer, performanter Mobile-Apps mit Swift, SwiftUI und UIKit. Mein Engineering-Background in Mikro- und Nanoelektronik umfasst Embedded-Systeme, Steuerplatinen und Low-Level-Programmierung. Das hilft mir, zuverlaessige und effiziente Software zu entwickeln. Ich fokussiere mich auf klare Architektur, Performance und reale Betriebsstabilitaet und bin offen fuer neue Chancen, inklusive Praktika, Trainee-Rollen und Engineering-Positionen.",
    myLocation: "Bern, Schweiz · Offen fuer Remote- und Hybrid-Rollen",
    myStatusLabel: "Offen fuer neue Moeglichkeiten",
    myMoreSkillsLabel: "Mehr",
    mySkillsModalTitle: "Kernkompetenzen",
    myHeroDetailTriggerLabel: "... mehr",
    myHeroDetailTitle: "Berufliches Profil",
    myHeroDetailParagraphs: [
      "Ich bin iOS/macOS Developer mit ueber 5 Jahren Erfahrung in der Entwicklung zuverlaessiger, performanter Mobile-Anwendungen und SDKs mit Swift, SwiftUI und UIKit.",
      "Mein Hintergrund liegt in Mikro- und Nanoelektronik, wo ich fundierte theoretische und praktische Kenntnisse in Halbleiterphysik, elektronischen Schaltungen und Regelsystemen aufgebaut habe. In Studium und fruehen Engineering-Rollen entwarf ich elektronische Platinen, programmierte AVR-Mikrocontroller in Assembly und entwickelte Firmware fuer Labor- und Steuergeraete.",
      "In meiner professionellen Arbeit entwickelte ich kommerzielle Mobile-Apps, wiederverwendbare SDK-Module und MVP-Produkte fuer internationale Projekte. Ich arbeite mit App-Architektur, Networking, API-Integrationen, Echtzeitkommunikation und komplexen UI-Systemen und lege grossen Wert auf wartbaren, produktionsreifen Code.",
      "Ich arbeite sicher ueber den gesamten Entwicklungszyklus - von Idee und Architektur ueber Umsetzung und Optimierung bis zum Release. Ich loese gerne technische Probleme, verbessere Performance und baue Systeme, die im realen Betrieb stabil funktionieren."
    ],
    myHeroDetailInterestsTitle: "Meine technischen Interessen:",
    myHeroDetailInterests: [
      "Mobile-App-Architektur",
      "Embedded-Systeme und Low-Level-Programmierung",
      "Hardware-Software-Interaktion",
      "Echtzeit- und Streaming-Anwendungen",
      "Performance-Optimierung und Debugging",
      "KI-basierte und moderne Software-Technologien"
    ],
    myHeroDetailClosing: "Ich bin offen fuer neue Moeglichkeiten, inklusive Vollzeitstellen, Praktika, Trainee-Rollen und Engineering-Positionen, in denen ich weiterlernen und wachsen kann. Besonders interessieren mich technisch anspruchsvolle Umfelder, in denen Praezision, Verantwortung und langfristige Qualitaet wichtig sind.",
    myHeroDetailCloseLabel: "Schliessen",
    mySkillsVisible: ["Swift", "SwiftUI", "UIKit", "Architektur", "Performance", "KI/AR", "Streaming", "Hardware", "Embedded", "Laborequipment", "Telekom", "PCB"],
    myPrimaryButton: "Projekte ansehen",
    mySecondaryButton: "Kontakt aufnehmen",
    myPortfolioButton: "Portfolio herunterladen"
  },
  myAboutSection: {
    myTitle: "Uber mich",
    myText: "Ich bin iOS/macOS Engineer mit starkem Hardware- und Telekom-Hintergrund. Mein Fokus liegt auf klarer Architektur, Performance, Wartbarkeit und praktischem Nutzerwert. Ich arbeite mit Swift, SwiftUI, UIKit, Firebase, Apple Wallet, Maps APIs und Echtzeit-Kommunikation."
  },
  myJourneySection: {
    ...myEn.myJourneySection,
    myTitle: "Engineering Journey",
    mySubtitle: "Von Halbleiterlaboren zu Mobile-Produkten - ein Weg, gepraegt von technischer Praezision.",
    myOpenDetailsLabel: "Details offnen",
    myItems: myJourneyItemsDe
  },
  myProjectSection: {
    ...myEn.myProjectSection,
    myTitle: "Ausgewaehlte Projekte",
    mySubtitle: "Eine kurze Auswahl mit messbarem Impact.",
    myItems: myProjectsDe
  },
  mySelectedWorkSection: mySelectedWorkSectionDe,
  myExpertiseSection: myExpertiseSectionDe,
  mySkillSection: {
    ...myEn.mySkillSection,
    myTitle: "Kernkompetenzen",
    myItems: [
      "Swift",
      "SwiftUI",
      "UIKit",
      "Firebase",
      "REST APIs",
      "ARKit",
      "Echtzeit-Streaming",
      "Systemarchitektur",
      "Mehrsprachigkeit & RTL",
      "AVR-Mikrocontroller",
      "Embedded Systems",
      "PCB-Verstaendnis",
      "Schaltplaene",
      "Laborequipment",
      "Vakuumsysteme",
      "Roentgendiffraktion",
      "UV-Vis-Spektroskopie",
      "Telekom-Engineering",
      "Antennenausrichtung",
      "Industrieklettern"
    ]
  },
  myExperienceSection: {
    ...myEn.myExperienceSection,
    myTitle: "Erfahrung",
    mySubtitle: "Ein Weg von physischer Ingenieurarbeit zu digitalen Systemen.",
    myItems: myExperienceItemsDe
  },
  myEducationSection: {
    myTitle: "Ausbildung & Zertifikate",
    myEducationTitle: "Ausbildung",
    myCertificatesTitle: "Zertifikate",
    myPreviewLabel: "Vorschau",
    myDownloadLabel: "Herunterladen",
    myClosePreviewLabel: "Vorschau schliessen",
    myItems: [
      {
        myTitle: "Bachelor of Applied Science (BASc), Nanotechnologie",
        myPlace: "Nationale Technische Universitaet \"Kharkiv Polytechnic Institute\", Ukraine",
        myPeriod: "Sep 2010 - Jun 2014",
        mySummary: "Ausbildung mit Fokus auf Mikroelektronik, Nanotechnologie, Halbleiterphysik, Materialwissenschaft und Vakuumtechnologien mit starker praxisorientierter Engineering-Ausbildung.",
        myDocuments: [
          {
            myLabel: "Original",
            myFile: "/certificates/diploma-ukrainian.pdf",
            myDownloadName: "diploma-original.pdf"
          },
          {
            myLabel: "Deutsche Uebersetzung",
            myFile: "/certificates/diploma-german.pdf",
            myDownloadName: "diploma-german-translation.pdf"
          }
        ]
      }
    ],
    myCertificates: [
      {
        myTitle: "PowerHubZug Mentoring Program Zertifikat",
        myPlace: "PowerHubZug, Schweiz",
        myPeriod: "2025",
        mySummary: "Teilnehmer eines Mentoring- und Networking-Programms mit Fokus auf Beschaeftigung und Integration im Schweizer Arbeitsmarkt.",
        myDocuments: [
          {
            myLabel: "Dokument",
            myFile: "/certificates/powerhubzug-w7-2025.pdf",
            myDownloadName: "powerhubzug-w7-certificate-2025.pdf"
          }
        ]
      },
      {
        myTitle: "Zertifikat Integrationskurs Deutsch (ECAP / BINplus)",
        myPlace: "ECAP / BINplus, Bern, Schweiz",
        myPeriod: "2025",
        mySummary: "Kursabschlusszertifikate und Charakteristik von ECAP als Nachweis der sprachlichen Integration und Teilnahme.",
        myDocuments: [
          {
            myLabel: "ECAP 1",
            myFile: "/certificates/ecap-1-2025.png",
            myDownloadName: "ecap-certificate-1-2025.png"
          },
          {
            myLabel: "ECAP 2",
            myFile: "/certificates/ecap-2-2025.png",
            myDownloadName: "ecap-certificate-2-2025.png"
          },
          {
            myLabel: "ECAP 3",
            myFile: "/certificates/ecap-3-2025.png",
            myDownloadName: "ecap-certificate-3-2025.png"
          },
          {
            myLabel: "Charakteristik (DE)",
            myFile: "/certificates/ecap-characteristic-de-2025.pdf",
            myDownloadName: "ecap-characteristic-de-2025.pdf"
          }
        ]
      },
      {
        myTitle: "IRATA Level 1 - Rope Access Technician",
        myPlace: "IRATA International",
        myPeriod: "2017 - 2020",
        mySummary: "Zertifiziert fuer industriellen Seilzugang, Telekom-Tuerme und technische Hoehenarbeiten.",
        myDocuments: [
          {
            myLabel: "Vorderseite",
            myFile: "/certificates/irata-2017-front.jpg",
            myDownloadName: "irata-level-1-front.jpg"
          },
          {
            myLabel: "Rueckseite",
            myFile: "/certificates/irata-2020-back.jpg",
            myDownloadName: "irata-level-1-back.jpg"
          }
        ]
      },
      {
        myTitle: "Fuehrerschein - Kategorien A, A1, B, B1",
        myPlace: "Ukraine",
        myPeriod: "Ausgestellt 2017, gueltig bis 2047",
        mySummary: "Gueltig fuer Motorrad und Auto; unterstuetzt Mobilitaet in der Feldingeneurarbeit.",
        myDocuments: [
          {
            myLabel: "Vorderseite",
            myFile: "/certificates/driving-license-front.jpg",
            myDownloadName: "driving-license-front.jpg"
          },
          {
            myLabel: "Rueckseite",
            myFile: "/certificates/driving-license-back.jpg",
            myDownloadName: "driving-license-back.jpg"
          }
        ]
      },
      {
        myTitle: "Huawei Safety Passport - Hardware Installation & EHS",
        myPlace: "Huawei Technologies",
        myPeriod: "2017",
        mySummary: "Working Safety (EHS), Hardware Installation, ISDP Operating Training.",
        myDocuments: [
          {
            myLabel: "Dokument",
            myFile: "/certificates/huawei-ehs-2017.jpg",
            myDownloadName: "huawei-safety-passport-2017.jpg"
          }
        ]
      },
      {
        myTitle: "Elektrische Sicherheitsbescheinigung (bis 1000V)",
        myPlace: "Trainingszentrum \"Slavutych\", Ukraine",
        myPeriod: "2016",
        mySummary: "Berechtigung fuer Arbeiten an elektrischen Anlagen bis 1000V.",
        myDocuments: [
          {
            myLabel: "Dokument",
            myFile: "/certificates/electrical-telecom-2016.png",
            myDownloadName: "electrical-safety-certificate-2016.png"
          }
        ]
      },
      {
        myTitle: "Zertifikat Telekom-Infrastrukturinstallation",
        myPlace: "Trainingszentrum \"Slavutych\", Ukraine",
        myPeriod: "2016",
        mySummary: "Zertifizierter Spezialist fuer Installation und Wartung von Mobilfunk-Infrastruktur.",
        myDocuments: [
          {
            myLabel: "Dokument",
            myFile: "/certificates/electrical-telecom-2016.png",
            myDownloadName: "telecom-infrastructure-certificate-2016.png"
          }
        ]
      },
      {
        myTitle: "Zertifikat Brandschutztraining",
        myPlace: "Trainingszentrum \"Slavutych\", Ukraine",
        myPeriod: "2016",
        mySummary: "Training fuer gefaehrliche, feuerbezogene und industrielle Arbeitsumgebungen.",
        myDocuments: [
          {
            myLabel: "Dokument",
            myFile: "/certificates/fire-safety-2016.png",
            myDownloadName: "fire-safety-certificate-2016.png"
          }
        ]
      },
      {
        myTitle: "Genehmigung fuer beengte/unterirdische Raeume",
        myPlace: "Trainingszentrum \"Slavutych\", Ukraine",
        myPeriod: "2016",
        mySummary: "Berechtigung fuer Arbeiten in Brunnen, Tunneln, Graeben, Kollektoren, Bunkern und beengten industriellen Raeumen.",
        myDocuments: [
          {
            myLabel: "Dokument",
            myFile: "/certificates/confined-space-2016.png",
            myDownloadName: "confined-space-permit-2016.png"
          }
        ]
      },
      {
        myTitle: "Sicherheitsgenehmigung Gas-/Heissarbeiten",
        myPlace: "Trainingszentrum \"Slavutych\", Ukraine",
        myPeriod: "2016",
        mySummary: "Zertifiziert fuer gasgefaehrliche Arbeiten, Schweissen und industrielle Hochrisiko-Taetigkeiten.",
        myDocuments: [
          {
            myLabel: "Dokument",
            myFile: "/certificates/gas-hot-work-2016.png",
            myDownloadName: "gas-hazardous-hot-work-permit-2016.png"
          }
        ]
      }
    ]
  },
  myContactSection: {
    ...myEn.myContactSection,
    myTitle: "Kontakt",
    myText: "Offen fuer iOS-Engineering-Rollen und Produktteams, die skalierbare, nutzerzentrierte Anwendungen entwickeln.",
    myOpportunityLines: [
      "Offen fuer Moeglichkeiten in Software, Telekommunikation, Elektronik und industriellem Engineering.",
      "Flexibel in Produkt-, Infrastruktur- und Field-Engineering-Rollen."
    ],
    myMobileLine: "Mobil: +41 79 477 77 64",
    myMessengerTelegram: "Telegram: +380737607021",
    myMessengerViber: "Viber: +380737607021",
    myMessengerWhatsApp: "WhatsApp: +380737607021",
    myAddressCityLine: "2562 Port",
    myAddressStreetLine: "Rosenstrasse 12",
    myEmailLabel: "E-Mail",
    myLocation: "Bern, Schweiz",
    myUpworkLabel: "Upwork",
    myUpworkUrl: "https://www.upwork.com/freelancers/~0172e99af2ff7d5de6?mp_source=share"
  },
  myFooter: {
    myRights: "Alle Rechte vorbehalten"
  }
};
