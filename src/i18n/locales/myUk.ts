import type { myTranslation } from "../myTypes";

export const myUk: myTranslation = {
  myLanguageName: "Українська",
  myLabelLanguage: "Мова",
  myNav: {
    myAbout: "Про мене",
    myProjects: "Проєкти",
    mySkills: "Навички",
    myExperience: "Досвід",
    myEducation: "Освіта",
    myContact: "Контакти"
  },
  myHero: {
    myGreeting: "Привіт, я",
    myName: "Viktor Yevtushenko",
    myHeadlineLineOne: "Інженерна точність.",
    myHeadlineLineTwo: "Від напівпровідникових лабораторій до масштабованих iOS-систем.",
    myTitle: "iOS Software Engineer | Swift, SwiftUI, UIKit, Firebase, ARKit",
    myDescription: "Досвідчений iOS-розробник із 5+ роками створення масштабованих і високопродуктивних мобільних застосунків. Паралельно маю практичний досвід у створенні та дослідженні напівпровідників, роботі з профільним лабораторним обладнанням і розробці електричних плат для напівпровідникових рішень. Саме це підсилює моє аналітичне мислення та інженерну точність.",
    myLocation: "Берн, Швейцарія · Відкритий до remote та hybrid ролей",
    myStatusLabel: "Відкритий до можливостей",
    myMoreSkillsLabel: "Ще",
    mySkillsModalTitle: "Ключові навички",
    mySkillsVisible: ["Swift", "SwiftUI", "UIKit", "Архітектура", "Продуктивність", "AI/AR", "Deep Links", "Стримінг"],
    mySkillsAll: [
      "Swift",
      "SwiftUI",
      "UIKit",
      "Objective-C",
      "Core Data",
      "Firebase",
      "REST API",
      "Apple Pay",
      "Apple Maps",
      "Google Maps",
      "ARKit",
      "SceneKit",
      "RoomPlan",
      "Real-time стримінг",
      "Системна архітектура",
      "MVC/MVVM/MVP/VIPER",
      "Багатомовність і RTL",
      "Нанотехнології",
      "Вакуумне напилення",
      "Телеком-інженерія",
      "Промисловий альпінізм",
      "Робота на висоті",
      "Монтаж на щоглах і вежах",
      "Системи страхування та такелаж",
      "Безпека робіт на висоті",
      "Тонкоплівкові процеси",
      "Вакуумні системи та камери",
      "XRD-аналіз",
      "UV-Vis спектроскопія",
      "STM-дослідження",
      "Калібрування лабораторного обладнання",
      "Контроль якості напівпровідникових матеріалів"
    ],
    myPrimaryButton: "Дивитись проєкти",
    mySecondaryButton: "Зв'язатися"
  },
  myAboutSection: {
    myTitle: "Про мене",
    myText: "Поєдную дизайн-мислення з інженерною дисципліною. Фокус: зрозуміла архітектура, підтримуваний UI та передбачувана доставка задач."
  },
  myJourneySection: {
    myTitle: "Інженерний шлях",
    mySubtitle: "Від напівпровідникових лабораторій до mobile-продуктів - шлях, сформований інженерною точністю.",
    myOpenDetailsLabel: "Відкрити деталі",
    myItems: [
      {
        myOrder: 1,
        myTitle: "Наноелектроніка та дослідження",
        myDescription: "Сформував сильну інженерну базу у вакуумних процесах та дослідженнях тонких плівок у НТУ «ХПІ».",
        myPoints: [
          "Працював із процесами close-space sublimation (CSS) та тонкоплівкового напилення",
          "Проводив аналіз матеріалів методом XRD та UV-Vis спектроскопії",
          "Досліджував морфологію оксиду алюмінію за допомогою мікроскопічних методів"
        ],
        myDetailTitle: "Наноелектроніка та дослідження (2010-2016)",
        myDetailText: "Університетський етап інженерної та лабораторної роботи з напівпровідниковими матеріалами, тонкими плівками й наноструктурами. Фокус на відтворюваних експериментах і аналізі матеріалів.",
        myDetailImages: [
          { mySrc: "/journey/nanoelectronics.png", myAlt: "Деталі досліджень у наноелектроніці" },
          { mySrc: "/journey/vacuum-lab.png", myAlt: "Портфоліо з вакуумних і тонкоплівкових процесів" }
        ]
      },
      {
        myOrder: 2,
        myTitle: "Вакуумні системи та лабораторна практика",
        myDescription: "Працював із науковими вакуумними установками для стабільних і відтворюваних експериментів.",
        myPoints: [
          "Налаштовував параметри процесів напилення та синтезу матеріалів",
          "Покращував якість виготовлення через поетапне калібрування процесу",
          "Документував практичні методики для надійної лабораторної роботи"
        ],
        myDetailTitle: "Вакуумні системи та калібрування процесів",
        myDetailText: "Практична експлуатація вакуумних систем і лабораторних процесів для напилення та синтезу матеріалів. Якість покращувалась через ітеративне налаштування параметрів.",
        myDetailImages: [
          { mySrc: "/journey/vacuum-lab.png", myAlt: "Вакуумна лабораторна практика та напівпровідникові процеси" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Огляд резюме з інженерним бекграундом" }
        ]
      },
      {
        myOrder: 3,
        myTitle: "Телеком-монтаж та введення в експлуатацію",
        myDescription: "Перейшов у телеком-напрям із фокусом на надійність мережевої інфраструктури.",
        myPoints: [
          "Монтував та вводив в експлуатацію обладнання абонентських мереж",
          "Виконував кросування кабельних ліній та усунення несправностей",
          "Координував щоденні задачі команди з 4 техніків"
        ],
        myDetailTitle: "Телеком-польова інженерія (2016-2017)",
        myDetailText: "Польова робота в телеком-інфраструктурі: монтаж, введення в експлуатацію, діагностика несправностей та координація команди в реальних умовах.",
        myDetailImages: [
          { mySrc: "/journey/telecom-field.png", myAlt: "Деталі телеком-монтажу та введення в експлуатацію" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Таймлайн досвіду в резюме" }
        ]
      },
      {
        myOrder: 4,
        myTitle: "Висотні роботи та мобільна інфраструктура",
        myDescription: "Реалізовував телеком-проєкти на висоті з дотриманням суворих вимог безпеки.",
        myPoints: [
          "Монтував і активував мобільне комунікаційне обладнання на вежах",
          "Проводив юстування й калібрування антен для покращення сигналу",
          "Працював за протоколами безпеки для високої напруги та висотних робіт"
        ],
        myDetailTitle: "Вежі, висота та протоколи безпеки",
        myDetailText: "Робота на висоті з обладнанням мобільної інфраструктури: активація систем, калібрування антен і дотримання норм безпеки для високої напруги.",
        myDetailImages: [
          { mySrc: "/journey/telecom-field.png", myAlt: "Висотні роботи на телеком-об'єктах" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Підтвердження досвіду польових робіт" }
        ]
      },
      {
        myOrder: 5,
        myTitle: "iOS-архітектура та продуктова інженерія",
        myDescription: "Переніс інженерну дисципліну в iOS-архітектуру, підтримуваність та стабільність продуктів.",
        myPoints: [
          "Створював production-застосунки на Swift, SwiftUI, UIKit, Core Data та ARKit",
          "Впроваджував модульні архітектурні підходи (MVC, MVVM, MVP, VIPER)",
          "Реалізовував багатомовність, deep links і масштабовані API-рівні"
        ],
        myDetailTitle: "iOS-архітектура (2018-2023)",
        myDetailText: "Перехід від польової інженерії до продуктового софту: масштабована iOS-архітектура, модульні підходи та production-рівень якості коду.",
        myDetailImages: [
          { mySrc: "/journey/ios-architecture.png", myAlt: "Деталі досвіду в iOS-архітектурі" },
          { mySrc: "/journey/overview-cv.png", myAlt: "Профіль з iOS стеком і досвідом" }
        ]
      },
      {
        myOrder: 6,
        myTitle: "Real-time доставка та інтеграції",
        myDescription: "Фокусувався на user-facing mobile-функціях: платежах, картах та cloud-backed real-time логіці.",
        myPoints: [
          "Реалізовував Apple Wallet / Apple Pay та in-app purchase сценарії",
          "Інтегрував Firebase-сервіси, push-нотифікації та presence-логіку",
          "Випускав функції з Apple Maps, Google Maps та ArcGIS"
        ],
        myDetailTitle: "Real-time доставка продукту (2024-2025)",
        myDetailText: "Розробка та підтримка real-time функцій у iOS-продуктах: Firebase, presence-логіка, підписки, платежі, інтеграції карт та стабільний delivery.",
        myDetailImages: [
          { mySrc: "/journey/realtime-delivery.png", myAlt: "Деталі real-time доставки мобільного продукту" },
          { mySrc: "/journey/ios-architecture.png", myAlt: "Попередній iOS досвід як база" }
        ]
      }
    ]
  },
  myProjectSection: {
    myTitle: "Вибрані проєкти",
    mySubtitle: "Короткий список проєктів із вимірюваним впливом.",
    myItems: [
      {
        myName: "SaaS Analytics Dashboard",
        myDescription: "Переробив онбординг і звіти, що покращило активацію та зменшило відтік у перший місяць.",
        myStack: "React, TypeScript, Vite",
        myActionLabel: "Дивитись кейс",
        myUrl: "#"
      },
      {
        myName: "E-commerce Landing",
        myDescription: "Зробив сторінку з фокусом на конверсію та продуктивність фронтенду.",
        myStack: "React, CSS, A/B Testing",
        myActionLabel: "Відкрити демо",
        myUrl: "#"
      },
      {
        myName: "Portfolio Builder",
        myDescription: "Реалізував модульну архітектуру секцій і багатомовну модель контенту.",
        myStack: "React, i18n, Design System",
        myActionLabel: "Відкрити репо",
        myUrl: "#"
      }
    ]
  },
  mySkillSection: {
    myTitle: "Ключові навички",
    myItems: ["React", "TypeScript", "Vite", "CSS Архітектура", "Доступність", "Продуктивність", "UX Writing", "Локалізація"]
  },
  myExperienceSection: {
    myTitle: "Досвід",
    myItems: [
      {
        myTitle: "Frontend Розробник",
        myPlace: "Продуктова компанія",
        myPeriod: "2023 - дотепер",
        mySummary: "Відповідаю за UI-доставку веб-фіч у тісній зв'язці з дизайном і продуктом."
      },
      {
        myTitle: "Web Розробник",
        myPlace: "Digital-агенція",
        myPeriod: "2021 - 2023",
        mySummary: "Робив маркетингові сайти та внутрішні дашборди з перевикористовуваними компонентами і локалізацією."
      }
    ]
  },
  myEducationSection: {
    myTitle: "Освіта",
    myItems: [
      {
        myTitle: "Комп'ютерні науки",
        myPlace: "Технічний університет",
        myPeriod: "2017 - 2021",
        mySummary: "Програмна інженерія, алгоритми та вебтехнології."
      }
    ]
  },
  myContactSection: {
    myTitle: "Контакти",
    myText: "Відкритий до фриланс-проєктів та довгострокової співпраці з продуктовими командами.",
    myEmail: "you@example.com",
    myLocation: "Європа",
    myLinkedinLabel: "LinkedIn",
    myGithubLabel: "GitHub",
    myLinkedinUrl: "https://linkedin.com",
    myGithubUrl: "https://github.com"
  },
  myFooter: {
    myRights: "Усі права захищено"
  }
};
