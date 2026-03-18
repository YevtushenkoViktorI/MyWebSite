import type { myJourneyItem, myProjectItem, myTimelineItem, myTranslation } from "../myTypes";
import { mySelectedWorkSectionFr } from "../mySelectedWorkLocales";
import { myExpertiseSectionFr } from "../myExpertiseLocales";
import { myEn } from "./myEn";

const myJourneyItemsFr: myJourneyItem[] = [
  {
    ...myEn.myJourneySection.myItems[0],
    myTitle: "Systemes embarques & developpement microcontroleur",
    myDescription: "Experience pratique en systemes embarques: conception de cartes electroniques, programmation de microcontroleurs AVR en Assembly et creation d'appareils reels. Cette phase a renforce ma maitrise du low-level, du temps reel et du cycle complet d'ingenierie.",
    myPoints: [
      "Conception et assemblage de cartes electroniques de controle sur mesure",
      "Programmation de microcontroleurs AVR en Assembly avec AVR Studio",
      "Simulation de circuits microcontroleur et de logique dans Proteus",
      "Developpement de systemes d'affichage LED et firmware de controle",
      "Debug de l'interaction hardware-software sur des appareils reels"
    ],
    myDetailTitle: "Systemes embarques & developpement microcontroleur (2006-2016)",
    myDetailText: "J'ai travaille sur le developpement embarque low-level, la conception de circuits electroniques et la programmation firmware avec des microcontroleurs AVR en Assembly. J'ai concu le hardware, ecrit le firmware et realise des dispositifs reels, y compris des systemes d'affichage, des cartes de controle et de l'electronique de laboratoire.\n\nMon experience d'ingenierie a commence a l'ecole dans un club de radiotechnique puis s'est poursuivie a l'universite, ou j'ai construit des competences solides en electronique, microcontroleurs et controle temps reel.\n\nActivites cles d'ingenierie\n\n• Conception et assemblage de cartes electroniques de controle\n• Programmation de microcontroleurs AVR en Assembly dans AVR Studio\n• Simulation de systemes embarques et circuits sous Proteus\n• Developpement d'un affichage LED de taux de change pour une banque\n• Realisation d'un affichage LED flexible sur substrat transparent\n• Conception hardware et firmware de controleurs d'affichage\n• Developpement de firmware de monitoring et de controle\n• Fabrication d'amplificateurs audio et de modules electroniques sur mesure\n• Participation a des competitions regionales de radiotechnique\n• Travail avec capteurs, relais, drivers et circuits de commande de signal\n\nCompetences d'ingenierie developpees\n\n• Architecture de systemes embarques\n• Programmation de microcontroleurs AVR\n• Developpement en Assembly\n• Conception PCB et circuits electroniques\n• Systemes LED et drivers\n• Logique de controle temps reel\n• Debug hardware et tests\n• Environnement de simulation Proteus\n• Electronique analogique et numerique\n• Fondamentaux de radiotechnique"
  },
  {
    ...myEn.myJourneySection.myItems[1],
    myTitle: "Recherche en nanoelectronique",
    myDescription: "Construction d'une base d'ingenierie solide en materiaux semi-conducteurs, nanostructures et procedes de depot sous vide pendant mes etudes a la NTU KhPI. Cette recherche a renforce precision, analyse et reproductibilite experimentale.",
    myPoints: [
      "Experiences de depot de couches minces par Close-Spaced Sublimation (CSS)",
      "Etude de materiaux semi-conducteurs, notamment les couches minces CdS",
      "Analyse structurale par diffraction des rayons X (XRD)",
      "Etude des proprietes optiques avec UV-Vis",
      "Investigation de nanostructures par microscopie STM"
    ],
    myDetailTitle: "Recherche en nanoelectronique (2010-2016)",
    myDetailText: "Bachelor en micro- et nanoelectronique a l'Universite technique nationale \"Kharkiv Polytechnic Institute\".\n\nDurant cette periode, j'ai travaille avec des materiaux semi-conducteurs, des nanostructures et des technologies de depot sous vide. Mes recherches portaient sur la fabrication de couches minces, la caracterisation des materiaux et l'analyse des nanostructures.\n\nActivites cles d'ingenierie\n\n• Conception et operation de systemes de depot sous vide pour couches minces\n• Depot de couches minces CdS par CSS pour applications photovoltaIques\n• Conception de cartes de monitoring et regulation thermique pour chambres a vide\n• Analyses XRD pour determiner les structures cristallines\n• Mesure des proprietes optiques par spectrophotometrie UV-Vis\n• Synthese de nanostructures AAO poreuses\n• Etude de la morphologie de surface via STM\n\nCompetences d'ingenierie developpees\n\n• Conception de systemes experimentaux\n• Fondamentaux d'ingenierie du vide\n• Science des materiaux semi-conducteurs\n• Fabrication de nanostructures\n• Analyse scientifique des donnees\n• Calibration d'equipements de laboratoire"
  },
  {
    ...myEn.myJourneySection.myItems[2],
    myTitle: "Systemes sous vide & pratique laboratoire",
    myDescription: "Exploitation et reglage d'equipements sous vide de niveau recherche utilises pour le depot de couches minces et la synthese de materiaux a la NTU KhPI. Cette pratique a renforce fiabilite experimentale, troubleshooting et discipline de laboratoire.",
    myPoints: [
      "Configuration des parametres de procede pour des experiences stables",
      "Calibration des systemes de controle thermique pour chambres de depot",
      "Assemblage et maintenance de setups experimentaux reproductibles",
      "Surveillance des conditions de vide et stabilite des procedes",
      "Documentation des procedures de laboratoire et des configurations"
    ],
    myDetailTitle: "Systemes sous vide & pratique laboratoire (2010-2016)",
    myDetailText: "Pendant mes etudes en micro- et nanoelectronique, j'ai acquis une experience pratique avec des systemes sous vide de laboratoire utilises pour la fabrication de materiaux semi-conducteurs.\n\nLe travail comprenait la configuration des equipements de depot, le maintien de conditions de vide stables et la calibration des systemes experimentaux pour obtenir des procedes repetables.\n\nActivites cles d'ingenierie\n\n• Exploitation de systemes de depot sous vide pour couches minces\n• Reglage des parametres temperature/pression pour les procedes de depot\n• Assemblage des setups experimentaux et composants de chambre a vide\n• Calibration des systemes de monitoring et regulation thermique\n• Surveillance de la stabilite du vide et fiabilite experimentale\n• Documentation des procedures experimentales et configurations systeme\n\nCompetences d'ingenierie developpees\n\n• Operation et maintenance de systemes sous vide\n• Calibration d'equipements experimentaux\n• Ajustement des parametres de procede et optimisation\n• Organisation du workflow laboratoire\n• Troubleshooting de systemes experimentaux\n• Discipline de mesure et precision d'ingenierie"
  },
  {
    ...myEn.myJourneySection.myItems[3],
    myTitle: "Installation telecom & mise en service",
    myDescription: "Transition vers l'ingenierie telecom terrain avec un focus sur l'installation reseau fiable et l'infrastructure operationnelle. Cette experience a renforce discipline pratique, troubleshooting et travail sur infrastructure de grande echelle.",
    myPoints: [
      "Installation et mise en service d'equipements reseau abonnes filaires",
      "Epissures cable, raccordements croises et cablage d'armoires de distribution",
      "Diagnostic et reparation de defauts de ligne et de connectivite",
      "Configuration du routage dans les noeuds de distribution telecom",
      "Coordination quotidienne d'une petite equipe de techniciens"
    ],
    myDetailTitle: "Ingenierie telecom terrain (2016-2017)",
    myDetailText: "J'ai travaille comme technicien d'installation et de mise en service telecom, responsable du deploiement et de la maintenance d'infrastructures filaires pour abonnes.\n\nLe travail couvrait installation, epissures, raccordements croises et depannage de systemes telecom en environnement operationnel reel.\n\nActivites cles d'ingenierie\n\n• Installation et mise en service d'equipements reseau abonnes filaires\n• Epissures de cables et connexions telecom avec outillage professionnel\n• Creation de cross-connections en armoires de distribution\n• Utilisation de systemes 3M pour terminaison modulaire de cables\n• Diagnostic et correction de defauts reseau abonnes\n• Support de planification terrain et coordination des techniciens\n\nCompetences d'ingenierie developpees\n\n• Installation d'infrastructure telecom\n• Epissures de cables et terminaison reseau\n• Diagnostic terrain et troubleshooting\n• Conception de cross-connections en armoires\n• Maintenance et reparation d'infrastructure\n• Coordination d'equipe en operations terrain"
  },
  {
    ...myEn.myJourneySection.myItems[4],
    myTitle: "Travail en hauteur & infrastructure mobile",
    myDescription: "Installation et mise en service d'infrastructure mobile en conditions terrain reelles, incluant operations en hauteur et deploiement de stations de base. Cette phase a renforce discipline, precision et responsabilite en environnement critique.",
    myPoints: [
      "Installation et calibration d'antennes mobiles et d'equipements de station de base",
      "Travail en hauteur selon procedures de securite industrielle",
      "Tests et configuration de systemes radio",
      "Support a l'activation et verification de stations reseau mobiles",
      "Maintien de la fiabilite des equipements en environnement exterieur a risque"
    ],
    myDetailTitle: "Travail en hauteur & infrastructure mobile (2016-2017)",
    myDetailText: "J'ai travaille dans une equipe telecom terrain chargee de l'installation et de la mise en service d'equipements mobiles: stations de base, antennes et infrastructure radio.\n\nLe travail impliquait operations en hauteur, calibration d'equipements et tests terrain en environnement operationnel reel.\n\nActivites cles d'ingenierie\n\n• Installation d'equipements mobiles sur tours et toitures\n• Montage et alignement d'antennes pour couverture optimale\n• Calibration et tests de composants de station de base\n• Support a l'activation et verification de stations mobiles\n• Respect strict des procedures de securite en travail en hauteur\n• Maintenance et inspection d'infrastructure telecom\n\nCompetences d'ingenierie developpees\n\n• Installation d'infrastructure reseau mobile\n• Alignement d'antennes et calibration\n• Discipline securite pour travail en hauteur\n• Tests terrain d'equipements\n• Operations d'ingenierie exterieure\n• Responsabilite en environnement critique"
  },
  {
    ...myEn.myJourneySection.myItems[5],
    myTitle: "Mobile Software Engineering",
    myDescription: "Application de la discipline d'ingenierie au developpement mobile, avec focus sur architecture iOS evolutive, code modulaire propre et applications pretes pour la production. Cette etape a transforme mon background en competences solides d'architecture logicielle.",
    myPoints: [
      "Developpement d'apps production avec Swift, SwiftUI, UIKit, CoreData et CloudKit",
      "Conception d'architectures modulaires (MVC, MVVM, MVP, VIPER)",
      "Implementation de fonctionnalites temps reel avec Firebase, REST APIs et WebSockets",
      "Developpement de subscriptions, deep links et interfaces multilingues",
      "Optimisation performance, stabilite et maintenabilite pour l'App Store"
    ],
    myDetailTitle: "Architecture iOS & developpement produit (2018-2025)",
    myDetailText: "Transition de l'ingenierie terrain vers le developpement logiciel produit, avec focus sur applications mobiles evolutives, architecture claire et fiabilite production.\n\nJ'ai travaille sur plusieurs projets iOS impliquant communication temps reel, integration cloud, UI/UX et architecture modulaire.\n\nActivites cles d'ingenierie\n\n• Developpement d'apps iOS avec Swift, SwiftUI, UIKit et CoreData\n• Conception d'architectures modulaires avec MVC, MVVM, MVP et VIPER\n• Integration de services Firebase (Firestore, Cloud Functions, Messaging)\n• Mise en place de couches reseau REST et GraphQL\n• Developpement de chat, presence tracking et notifications\n• Mise en oeuvre de subscriptions avec Apple Pay et achats integres\n• Implementation de deep links, universal links et UI multilingue\n• Optimisation des performances, memoire et temps de lancement\n• Maintenance d'apps production et mises a jour App Store\n\nCompetences d'ingenierie developpees\n\n• Conception d'architecture iOS\n• Developpement mobile evolutif\n• Clean code et systemes modulaires\n• Integration cloud et donnees temps reel\n• Ingenierie UI/UX\n• Optimisation des performances\n• Workflow de release production\n• Maintenance produit long terme"
  },
  {
    ...myEn.myJourneySection.myItems[6],
    myTitle: "Livraison temps reel & integrations",
    myDescription: "Focus sur des fonctionnalites mobiles pretes production autour de donnees temps reel, integrations cloud et paiements sur plusieurs applications iOS. Cette phase a renforce ma capacite a concevoir des systemes stables a grande echelle.",
    myPoints: [
      "Implementation d'Apple Pay, achats integres et workflows d'abonnement",
      "Integration des services Firebase, notifications push et presence tracking",
      "Developpement de features temps reel avec Firestore, Cloud Functions et REST APIs",
      "Logique basee localisation et integrations cartes (Apple Maps, Google Maps, ArcGIS)",
      "Livraison de fonctionnalites evolutives avec fort focus sur la fiabilite"
    ],
    myDetailTitle: "Livraison produit temps reel (2024-2025)",
    myDetailText: "J'ai travaille sur des applications iOS en production impliquant donnees temps reel, integrations cloud, paiements et fonctionnalites basees localisation.\n\nLe focus etait la livraison de fonctionnalites utilisateur fiables avec communication backend evolutive et comportement applicatif stable.\n\nActivites cles d'ingenierie\n\n• Developpement de fonctionnalites temps reel avec Firebase (Firestore, Cloud Functions, Messaging)\n• Implementation d'Apple Pay, subscriptions et achats integres\n• Construction de logique presence, statut en ligne et synchronisation background\n• Integration de services de localisation avec Apple Maps et Google Maps\n• Mise en place de notifications push et mises a jour silencieuses en background\n• Conception de couches API REST et architecture event-driven\n• Optimisation performance applicative, synchronisation des donnees et memoire\n• Maintenance d'apps production et mises a jour App Store\n\nCompetences d'ingenierie developpees\n\n• Architecture mobile temps reel\n• Integration cloud et communication backend\n• Systemes de paiement et abonnement\n• Integrations cartes et geolocalisation\n• Stabilite production et performance tuning\n• Conception applicative event-driven\n• Workflow de release App Store\n• Maintenance produit long terme"
  }
];

const myProjectsFr: myProjectItem[] = [
  {
    ...myEn.myProjectSection.myItems[0],
    myDescription: "Refonte du flux onboarding et reporting, avec meilleure activation et reduction du churn au premier mois.",
    myActionLabel: "Voir le cas"
  },
  {
    ...myEn.myProjectSection.myItems[1],
    myName: "Landing produit e-commerce",
    myDescription: "Page orientee conversion avec implementation front-end axee performance.",
    myActionLabel: "Ouvrir demo"
  },
  {
    ...myEn.myProjectSection.myItems[2],
    myDescription: "Architecture modulaire de sections et modele de contenu multilingue pour personal brands.",
    myActionLabel: "Ouvrir repo"
  }
];

const myExperienceItemsFr: myTimelineItem[] = [
  {
    myTitle: "Participant au cours d'allemand",
    myPlace: "LernPunkt, Berne",
    myPeriod: "Oct 2025 - Present",
    mySummary: "Poursuite des etudes d'allemand au niveau B1 en preparation d'un role technique a long terme en Suisse. Focus sur la communication professionnelle pour les environnements d'ingenierie et de developpement logiciel."
  },
  {
    myTitle: "Participant au programme de mentorat",
    myPlace: "Power Hub Zug, Suisse",
    myPeriod: "Aout 2025 - Nov 2025",
    mySummary: "Participant au programme de mentorat 7th Wave, axe sur l'integration professionnelle et la recherche d'emploi en Suisse. Le programme incluait ateliers, evenements de networking et sessions individuelles de mentorat autour du developpement de carriere, du positionnement technique et des opportunites dans le marche suisse de l'ingenierie et de l'IT."
  },
  {
    myTitle: "Participant au cours d'allemand",
    myPlace: "BINplus / ECAP, Berne",
    myPeriod: "Nov 2024 - Sep 2025",
    mySummary: "Programme intensif d'integration en allemand complete a Berne tout en poursuivant l'autoformation technique et le developpement logiciel. Renforcement des competences linguistiques pour le travail professionnel en Suisse et preparation a la suite de la carriere technique."
  },
  {
    myTitle: "Benevole - Assistant support camp de refugies",
    myPlace: "Berne, Suisse",
    myPeriod: "Jul 2023 - Nov 2024",
    mySummary: "Support des operations quotidiennes et des flux de communication dans un centre d'aide aux refugies, tout en s'adaptant a un nouvel environnement et en continuant l'autoformation en software development et ingenierie. Maintien des projets personnels et de l'apprentissage technique pendant la periode de relocalisation."
  },
  {
    myTitle: "iOS Developer",
    myPlace: "Freelance / Remote",
    myPeriod: "Jul 2018 - Jun 2023",
    mySummary: "Developpement de plusieurs applications iOS en production couvrant fonctionnalites temps reel, media playback, AR, reseau, abonnements et architecture evolutive. Travail sur des applications consumer et sociales avec un fort focus sur la performance, le design modulaire et une base de code maintenable. Conception d'architecture UI, custom video playback, fonctionnalites AR, integrations backend et systemes de monetisation."
  },
  {
    myTitle: "Technicien installation industrielle en hauteur",
    myPlace: "Pologne",
    myPeriod: "2017 - 2018",
    mySummary: "Travaux d'installation industrielle en hauteur sur des sites de centrales electriques. Intervention sur montage structurel, installation d'equipements et maintenance technique dans des conditions exigeantes demandant precision, securite et travail d'equipe."
  },
  {
    myTitle: "Technicien installation telecom / Team Lead",
    myPlace: "Ukraine",
    myPeriod: "2016 - 2017",
    mySummary: "Travail sur l'installation d'equipements de communication mobile, de systemes telecom filaires et d'infrastructure internet. Participation a l'installation terrain, au setup des equipements et a la configuration hardware reseau. Role de team lead sur plusieurs projets avec coordination des taches d'installation."
  },
  {
    myTitle: "Ingenierie electrique / semi-conducteurs",
    myPlace: "Kharkiv, Ukraine",
    myPeriod: "2010 - 2016",
    mySummary: "Formation et pratique en laboratoire en microelectronique, materiaux semi-conducteurs et systemes electroniques. Travail avec equipements de laboratoire, systemes sous vide, circuits electroniques et appareils de mesure pendant les etudes et la recherche. Experience incluant recherche sur materiaux semi-conducteurs, etudes de structures cristallines, assemblage de circuits, equipements sous vide, bases RF/telecom, montages experimentaux et tests hardware."
  }
];

export const myFr: myTranslation = {
  ...myEn,
  myLanguageName: "Francais",
  myLabelLanguage: "Langue",
  myNav: {
    myAbout: "A propos",
    myProjects: "Projets",
    mySkills: "Ingenierie",
    myExperience: "Experience",
    myEducation: "Formation",
    myContact: "Contact"
  },
  myHero: {
    ...myEn.myHero,
    myGreeting: "Bonjour, je suis",
    myHeadlineLineOne: "Precision d'ingenierie.",
    myHeadlineLineTwo: "Des laboratoires semi-conducteurs aux systemes iOS evolutifs.",
    myDescription: "Je suis iOS/macOS Developer avec plus de 5 ans d'experience dans la creation d'applications mobiles evolutives et performantes avec Swift, SwiftUI et UIKit. Mon background en micro- et nanoelectronique inclut systemes embarques, cartes de controle et programmation low-level, ce qui m'aide a concevoir un software fiable et efficace. Je me concentre sur l'architecture propre, la performance et la stabilite en conditions reelles, et je suis ouvert a de nouvelles opportunites, y compris stages, roles trainee et postes d'ingenierie.",
    myLocation: "Berne, Suisse · Ouvert aux postes remote et hybrides",
    myStatusLabel: "Ouvert aux opportunites",
    myMoreSkillsLabel: "Plus",
    mySkillsModalTitle: "Competences cles",
    myHeroDetailTriggerLabel: "... plus",
    myHeroDetailTitle: "Resume professionnel",
    myHeroDetailParagraphs: [
      "Je suis iOS/macOS Developer avec plus de 5 ans d'experience dans le developpement d'applications mobiles et SDK fiables et performants avec Swift, SwiftUI et UIKit.",
      "Mon parcours est ancre dans la micro- et nanoelectronique, ou j'ai acquis des bases solides en physique des semi-conducteurs, circuits electroniques et systemes de controle. Pendant mes etudes et mes premiers roles d'ingenierie, j'ai concu des cartes electroniques, programme des microcontroleurs AVR en Assembly et developpe du firmware pour equipements de laboratoire et dispositifs de controle.",
      "Dans mon travail professionnel, j'ai cree des applications mobiles commerciales, des modules SDK reutilisables et des produits MVP pour des projets internationaux. J'ai de l'experience en architecture applicative, reseau, integrations API, communication temps reel et systemes UI complexes.",
      "Je suis a l'aise sur tout le cycle de developpement - de l'idee et de l'architecture a l'implementation, l'optimisation et la release. J'aime resoudre des problemes techniques, ameliorer la performance et construire des systemes stables en usage reel."
    ],
    myHeroDetailInterestsTitle: "Mes interets techniques:",
    myHeroDetailInterests: [
      "Architecture d'applications mobiles",
      "Systemes embarques et programmation low-level",
      "Interaction hardware-software",
      "Applications temps reel et streaming",
      "Optimisation des performances et debug",
      "Technologies logicielles modernes basees IA"
    ],
    myHeroDetailClosing: "Je suis ouvert a de nouvelles opportunites, y compris postes full-time, stages, roles trainee et postes d'ingenierie ou je peux continuer a apprendre et progresser. Je suis particulierement interesse par des environnements techniquement exigeants, ou precision, responsabilite et qualite long terme sont essentielles.",
    myHeroDetailCloseLabel: "Fermer",
    mySkillsVisible: ["Swift", "SwiftUI", "UIKit", "Architecture", "Performance", "IA/AR", "Streaming", "Hardware", "Embedded", "Equipement labo", "Telecom", "PCB"],
    myPrimaryButton: "Voir les projets",
    mySecondaryButton: "Me contacter",
    myPortfolioButton: "Telecharger portfolio"
  },
  myAboutSection: {
    myTitle: "A propos de moi",
    myText: "Je suis ingenieur iOS/macOS avec une base solide en hardware et telecom. Mon focus: architecture claire, performance, maintenabilite et impact utilisateur concret. Je travaille avec Swift, SwiftUI, UIKit, Firebase, Apple Wallet, APIs cartographiques et communication temps reel."
  },
  myJourneySection: {
    ...myEn.myJourneySection,
    myTitle: "Parcours d'ingenierie",
    mySubtitle: "Des laboratoires semi-conducteurs aux produits mobiles - un parcours guide par la precision technique.",
    myOpenDetailsLabel: "Ouvrir les details",
    myItems: myJourneyItemsFr
  },
  myProjectSection: {
    ...myEn.myProjectSection,
    myTitle: "Projets en vedette",
    mySubtitle: "Une courte selection de projets avec impact mesurable.",
    myItems: myProjectsFr
  },
  mySelectedWorkSection: mySelectedWorkSectionFr,
  myExpertiseSection: myExpertiseSectionFr,
  mySkillSection: {
    ...myEn.mySkillSection,
    myTitle: "Competences cles",
    myItems: [
      "Swift",
      "SwiftUI",
      "UIKit",
      "Firebase",
      "REST APIs",
      "ARKit",
      "Streaming temps reel",
      "Architecture systeme",
      "Multilingue & RTL",
      "Microcontroleurs AVR",
      "Systemes embarques",
      "Conception PCB",
      "Schemas electroniques",
      "Equipement de laboratoire",
      "Systemes sous vide",
      "Diffraction des rayons X",
      "Spectroscopie UV-Vis",
      "Ingenierie telecom",
      "Alignement d'antennes",
      "Travail sur corde industriel"
    ]
  },
  myExperienceSection: {
    ...myEn.myExperienceSection,
    myTitle: "Experience",
    mySubtitle: "Un parcours de l'ingenierie physique vers les systemes numeriques.",
    myItems: myExperienceItemsFr
  },
  myEducationSection: {
    myTitle: "Formation & Certifications",
    myEducationTitle: "Formation",
    myCertificatesTitle: "Certifications",
    myPreviewLabel: "Apercu",
    myDownloadLabel: "Telecharger",
    myClosePreviewLabel: "Fermer l'apercu",
    myItems: [
      {
        myTitle: "Bachelor of Applied Science (BASc), Nanotechnologie",
        myPlace: "National Technical University \"Kharkiv Polytechnic Institute\", Ukraine",
        myPeriod: "Sep 2010 - Jun 2014",
        mySummary: "Formation axee sur la microelectronique, la nanotechnologie, la physique des semi-conducteurs, la science des materiaux et les technologies du vide, avec une forte preparation pratique en ingenierie.",
        myDocuments: [
          {
            myLabel: "Original",
            myFile: "/certificates/diploma-ukrainian.pdf",
            myDownloadName: "diploma-original.pdf"
          },
          {
            myLabel: "Traduction allemande",
            myFile: "/certificates/diploma-german.pdf",
            myDownloadName: "diploma-german-translation.pdf"
          }
        ]
      }
    ],
    myCertificates: [
      {
        myTitle: "Certificat Mentoring Program PowerHubZug",
        myPlace: "PowerHubZug, Suisse",
        myPeriod: "2025",
        mySummary: "Participant au programme de mentorat et networking axe sur l'emploi et l'integration dans le marche suisse.",
        myDocuments: [
          {
            myLabel: "Document",
            myFile: "/certificates/powerhubzug-w7-2025.pdf",
            myDownloadName: "powerhubzug-w7-certificate-2025.pdf"
          }
        ]
      },
      {
        myTitle: "Certificat de cours d'integration allemand (ECAP / BINplus)",
        myPlace: "ECAP / BINplus, Berne, Suisse",
        myPeriod: "2025",
        mySummary: "Certificats de fin de cours et caracteristique ECAP confirmant la progression d'integration linguistique et la participation.",
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
            myLabel: "Caracteristique (DE)",
            myFile: "/certificates/ecap-characteristic-de-2025.pdf",
            myDownloadName: "ecap-characteristic-de-2025.pdf"
          }
        ]
      },
      {
        myTitle: "IRATA Level 1 - Rope Access Technician",
        myPlace: "IRATA International",
        myPeriod: "2017 - 2020",
        mySummary: "Certification pour acces sur corde industriel, tours telecom et travaux techniques en hauteur.",
        myDocuments: [
          {
            myLabel: "Recto",
            myFile: "/certificates/irata-2017-front.jpg",
            myDownloadName: "irata-level-1-front.jpg"
          },
          {
            myLabel: "Verso",
            myFile: "/certificates/irata-2020-back.jpg",
            myDownloadName: "irata-level-1-back.jpg"
          }
        ]
      },
      {
        myTitle: "Permis de conduire - categories A, A1, B, B1",
        myPlace: "Ukraine",
        myPeriod: "Delivre en 2017, valide jusqu'en 2047",
        mySummary: "Valable pour moto et voiture, utile pour la mobilite en ingenierie terrain.",
        myDocuments: [
          {
            myLabel: "Recto",
            myFile: "/certificates/driving-license-front.jpg",
            myDownloadName: "driving-license-front.jpg"
          },
          {
            myLabel: "Verso",
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
            myLabel: "Document",
            myFile: "/certificates/huawei-ehs-2017.jpg",
            myDownloadName: "huawei-safety-passport-2017.jpg"
          }
        ]
      },
      {
        myTitle: "Certificat de securite electrique (jusqu'a 1000V)",
        myPlace: "Centre de formation \"Slavutych\", Ukraine",
        myPeriod: "2016",
        mySummary: "Autorisation de travail avec des installations electriques jusqu'a 1000V.",
        myDocuments: [
          {
            myLabel: "Document",
            myFile: "/certificates/electrical-telecom-2016.png",
            myDownloadName: "electrical-safety-certificate-2016.png"
          }
        ]
      },
      {
        myTitle: "Certificat d'installation d'infrastructure telecom",
        myPlace: "Centre de formation \"Slavutych\", Ukraine",
        myPeriod: "2016",
        mySummary: "Specialiste certifie pour l'installation et la maintenance de l'infrastructure de communication mobile.",
        myDocuments: [
          {
            myLabel: "Document",
            myFile: "/certificates/electrical-telecom-2016.png",
            myDownloadName: "telecom-infrastructure-certificate-2016.png"
          }
        ]
      },
      {
        myTitle: "Certificat de formation a la securite incendie",
        myPlace: "Centre de formation \"Slavutych\", Ukraine",
        myPeriod: "2016",
        mySummary: "Formation pour environnements de travail dangereux, lies au feu et industriels.",
        myDocuments: [
          {
            myLabel: "Document",
            myFile: "/certificates/fire-safety-2016.png",
            myDownloadName: "fire-safety-certificate-2016.png"
          }
        ]
      },
      {
        myTitle: "Permis espaces confines / travaux souterrains",
        myPlace: "Centre de formation \"Slavutych\", Ukraine",
        myPeriod: "2016",
        mySummary: "Autorisation de travail dans puits, tunnels, tranchees, collecteurs, bunkers et espaces industriels confines.",
        myDocuments: [
          {
            myLabel: "Document",
            myFile: "/certificates/confined-space-2016.png",
            myDownloadName: "confined-space-permit-2016.png"
          }
        ]
      },
      {
        myTitle: "Permis securite travaux gaz-dangereux et a chaud",
        myPlace: "Centre de formation \"Slavutych\", Ukraine",
        myPeriod: "2016",
        mySummary: "Certification pour operations gaz-dangereuses, soudage et travaux industriels a haut risque.",
        myDocuments: [
          {
            myLabel: "Document",
            myFile: "/certificates/gas-hot-work-2016.png",
            myDownloadName: "gas-hazardous-hot-work-permit-2016.png"
          }
        ]
      }
    ]
  },
  myContactSection: {
    ...myEn.myContactSection,
    myTitle: "Contact",
    myText: "Ouvert aux roles d'ingenierie iOS et aux equipes produit qui construisent des applications evolutives et centrees utilisateur.",
    myOpportunityLines: [
      "Ouvert aux opportunites en logiciel, telecom, electronique et ingenierie industrielle.",
      "Flexible sur des roles produit, infrastructure et ingenierie terrain."
    ],
    myMobileLine: "Mobile: +41 79 477 77 64",
    myMessengerTelegram: "Telegram: +380737607021",
    myMessengerViber: "Viber: +380737607021",
    myMessengerWhatsApp: "WhatsApp: +380737607021",
    myAddressCityLine: "2562 Port",
    myAddressStreetLine: "Rosenstrasse 12",
    myEmailLabel: "Email",
    myLocation: "Berne, Suisse",
    myUpworkLabel: "Upwork",
    myUpworkUrl: "https://www.upwork.com/freelancers/~0172e99af2ff7d5de6?mp_source=share"
  },
  myFooter: {
    myRights: "Tous droits reserves"
  }
};
