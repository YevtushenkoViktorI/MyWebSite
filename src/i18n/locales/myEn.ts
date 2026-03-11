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
    myName: "Viktor Yevtushenko",
    myHeadlineLineOne: "Engineering precision.",
    myHeadlineLineTwo: "From semiconductor labs to scalable iOS systems.",
    myTitle: "iOS Software Engineer | Swift, SwiftUI, UIKit, Firebase, ARKit",
    myDescription: "Experienced iOS developer with 5+ years building scalable, high-performance mobile applications. Hands-on background in semiconductor research and control-board development, with strong analytical thinking and engineering precision.",
    myLocation: "Bern, Switzerland · Open to remote and hybrid roles",
    myStatusLabel: "Open to opportunities",
    myMoreSkillsLabel: "More",
    mySkillsModalTitle: "Core Skills",
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
      "Real-time Streaming",
      "System Architecture",
      "MVC/MVVM/MVP/VIPER",
      "Multilingual & RTL",
      "Nanotechnology",
      "Vacuum Deposition",
      "Telecom Engineering",
      "Industrial Rope Access",
      "Work at Height",
      "Tower and Mast Installation",
      "Rigging and Safety Systems",
      "High-altitude Safety Protocols",
      "Thin-Film Processes",
      "Vacuum Systems and Chambers",
      "XRD Analysis",
      "UV-Vis Spectroscopy",
      "STM Research",
      "Laboratory Equipment Calibration",
      "Semiconductor Material Quality Control"
    ],
    myPrimaryButton: "See Projects",
    mySecondaryButton: "Get in Touch"
  },
  myAboutSection: {
    myTitle: "About Me",
    myText: "I am an iOS/macOS engineer with a solid hardware and telecom foundation. My focus is clean architecture, performance, maintainability, and practical user impact. I work across Swift, SwiftUI, UIKit, Firebase, Apple Wallet, maps APIs, and real-time communication stacks."
  },
  myJourneySection: {
    myTitle: "Engineering Journey",
    mySubtitle: "From semiconductor labs to mobile products - a path shaped by precision engineering.",
    myOpenDetailsLabel: "Open details",
    myItems: [
      {
        myOrder: 1,
        myTitle: "Nanoelectronics Research",
        myDescription: "Built a strong engineering base in vacuum processes and thin-film research at NTU KhPI.",
        myPoints: [
          "Worked with close-space sublimation (CSS) and thin-film deposition workflows",
          "Analyzed materials with XRD and UV-Vis spectroscopy",
          "Investigated aluminum oxide morphology using microscopy methods"
        ],
        myDetailTitle: "Nanoelectronics Research (2010-2016)",
        myDetailText: "University-stage engineering and laboratory research in semiconductor materials, thin films, and nanostructures. Focused on repeatable experiments and material characterization.",
        myDetailImages: [
          { mySrc: "/journey/nanoelectronics.png", myAlt: "Nanoelectronics research details" },
          { mySrc: "/journey/vacuum-lab.png", myAlt: "Vacuum and thin-film lab portfolio" }
        ]
      },
      {
        myOrder: 2,
        myTitle: "Vacuum Systems & Lab Practice",
        myDescription: "Operated and tuned research-grade vacuum equipment for stable and repeatable experiments.",
        myPoints: [
          "Configured process parameters for deposition and material synthesis",
          "Improved fabrication quality through iterative process calibration",
          "Documented practical methods for reliable lab execution"
        ],
        myDetailTitle: "Vacuum Systems & Process Calibration",
        myDetailText: "Hands-on operation of vacuum systems and laboratory workflows for deposition and synthesis. Practical improvements were made through iterative process tuning.",
        myDetailImages: [
          { mySrc: "/journey/vacuum-lab.png", myAlt: "Vacuum lab and semiconductor process portfolio" },
          { mySrc: "/journey/overview-cv.png", myAlt: "CV overview with engineering background" }
        ]
      },
      {
        myOrder: 3,
        myTitle: "Telecom Installation & Commissioning",
        myDescription: "Transitioned to telecom field engineering with focus on reliability and operational precision.",
        myPoints: [
          "Installed and commissioned wired subscriber network equipment",
          "Performed cable cross-connections and network troubleshooting",
          "Coordinated daily tasks for a 4-person technician team"
        ],
        myDetailTitle: "Telecom Field Engineering (2016-2017)",
        myDetailText: "Field execution in telecom infrastructure: network installation, commissioning, troubleshooting, and team coordination in real operational environments.",
        myDetailImages: [
          { mySrc: "/journey/telecom-field.png", myAlt: "Telecom field engineering details" },
          { mySrc: "/journey/overview-cv.png", myAlt: "CV timeline and telecom experience" }
        ]
      },
      {
        myOrder: 4,
        myTitle: "Work at Height & Mobile Infrastructure",
        myDescription: "Delivered high-altitude telecom projects with strict safety and quality standards.",
        myPoints: [
          "Installed and activated mobile communication equipment on towers",
          "Calibrated antennas to improve coverage and signal quality",
          "Followed high-voltage and rope-access safety protocols"
        ],
        myDetailTitle: "Tower Installations & Safety Protocols",
        myDetailText: "Execution of work-at-height telecom tasks on towers, including equipment activation and antenna calibration while following strict safety standards.",
        myDetailImages: [
          { mySrc: "/journey/telecom-field.png", myAlt: "Tower and mobile infrastructure work details" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Documented field and safety experience" }
        ]
      },
      {
        myOrder: 5,
        myTitle: "iOS Architecture & Product Engineering",
        myDescription: "Applied engineering rigor to iOS architecture, maintainability, and production reliability.",
        myPoints: [
          "Built production apps with Swift, SwiftUI, UIKit, Core Data, and ARKit",
          "Implemented modular architecture patterns (MVC, MVVM, MVP, VIPER)",
          "Delivered multilingual features, deep links, and scalable API layers"
        ],
        myDetailTitle: "iOS Architecture (2018-2023)",
        myDetailText: "Transition from field engineering to product software: scalable iOS architecture, clean modular patterns, and production-level app delivery.",
        myDetailImages: [
          { mySrc: "/journey/ios-architecture.png", myAlt: "iOS architecture and freelancer experience details" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Profile summary with iOS stack" }
        ]
      },
      {
        myOrder: 6,
        myTitle: "Real-time Delivery & Integrations",
        myDescription: "Focused on user-facing mobile features across payments, maps, and cloud-backed real-time flows.",
        myPoints: [
          "Implemented Apple Wallet / Apple Pay and in-app purchase flows",
          "Integrated Firebase services, push notifications, and presence logic",
          "Shipped features with Apple Maps, Google Maps, and ArcGIS"
        ],
        myDetailTitle: "Real-time Product Delivery (2024-2025)",
        myDetailText: "Built and maintained real-time product features in iOS apps with Firebase, location presence logic, subscriptions, and payment integrations.",
        myDetailImages: [
          { mySrc: "/journey/realtime-delivery.png", myAlt: "Real-time iOS product delivery details" },
          { mySrc: "/journey/ios-architecture.png", myAlt: "Previous iOS engineering background" }
        ]
      }
    ]
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
        myTitle: "German Course Participant",
        myPlace: "LernPunkt / BINplus / ECAP, Bern",
        myPeriod: "Nov 2024 - Present",
        mySummary: "Language integration program in Bern while continuing technical and product development growth."
      },
      {
        myTitle: "Volunteer - Refugee Camp Support Assistant",
        myPlace: "Bern, Switzerland",
        myPeriod: "Jul 2023 - Nov 2024",
        mySummary: "Supported refugee camp operations and communication workflows while adapting to a new environment."
      },
      {
        myTitle: "iOS App Developer",
        myPlace: "TechWings (Remote)",
        myPeriod: "Jul 2024 - May 2025",
        mySummary: "Built and maintained core features for Bridgit: location and presence logic, Firebase-backed real-time flows, subscription handling, and Apple Pay integration."
      },
      {
        myTitle: "iOS Mobile Developer",
        myPlace: "Freelancer, Kharkiv / Remote",
        myPeriod: "Jul 2018 - May 2023",
        mySummary: "Delivered multilingual iOS apps using Swift, SwiftUI, UIKit, Core Data, ARKit, REST APIs, Apple Wallet, Apple/Google Maps, and modular architecture patterns."
      },
      {
        myTitle: "Electrical Engineer",
        myPlace: "Huawei, Kyiv",
        myPeriod: "Jul 2016 - May 2017",
        mySummary: "Handled telecom installation and commissioning, subscriber network troubleshooting, mobile equipment setup, and field safety operations."
      },
      {
        myTitle: "Engineer",
        myPlace: "NTU Kharkiv Polytechnic Institute",
        myPeriod: "Sep 2010 - Jun 2016",
        mySummary: "Worked on vacuum deposition and materials analysis (XRD, UV-Vis, microscopy), and process optimization for thin-film and anodic oxide research."
      }
    ]
  },
  myEducationSection: {
    myTitle: "Education",
    myItems: [
      {
        myTitle: "Bachelor of Applied Science (BASc), Nanotechnology",
        myPlace: "National Technical University \"Kharkiv Polytechnic Institute\"",
        myPeriod: "Sep 2010 - Jun 2014",
        mySummary: "Degree background in micro- and nanoelectronics with strong practical focus on material science and vacuum technologies."
      }
    ]
  },
  myContactSection: {
    myTitle: "Contact",
    myText: "Open to iOS engineering roles and product teams working on scalable, user-focused applications.",
    myEmail: "contact-info-on-request@example.com",
    myLocation: "Bern, Switzerland",
    myLinkedinLabel: "LinkedIn",
    myGithubLabel: "GitHub",
    myLinkedinUrl: "https://linkedin.com",
    myGithubUrl: "https://github.com"
  },
  myFooter: {
    myRights: "All rights reserved"
  }
};
