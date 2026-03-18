import { mySelectedWorkData } from "../data/myShowcaseData";
import type { mySelectedWorkItem, mySelectedWorkSection } from "./myTypes";

type myItemOverride = Partial<Omit<mySelectedWorkItem, "myTags" | "myDetailImages">>;

function myBuildLocalizedItems(myOverrides: myItemOverride[]): mySelectedWorkItem[] {
  return mySelectedWorkData.map((myBase, myIndex) => {
    const myOverride = myOverrides[myIndex] ?? {};
    return {
      ...myBase,
      ...myOverride,
      myTags: myBase.myTags,
      myDetailImages: myBase.myDetailImages
    };
  });
}

export const mySelectedWorkSectionEn: mySelectedWorkSection = {
  myTitle: "Selected Work",
  mySubtitle: "Products built with system-level thinking and attention to detail.",
  myOpenDetailsLabel: "Open details",
  myCloseDetailsLabel: "Close",
  myPrevLabel: "← Prev",
  myNextLabel: "Next →",
  myPrevAriaLabel: "Previous projects",
  myNextAriaLabel: "Next projects",
  myItems: mySelectedWorkData
};

const myUkOverrides: myItemOverride[] = [
  {
    myTitle: "JOIN Stories iOS SDK",
    myText: "Перевикористовуваний Swift Package SDK з Instagram-style stories модулем для інтеграції в клієнтські застосунки.",
    myPoints: ["Модуль для швидкої клієнтської інтеграції", "Підтримка UIKit і SwiftUI"],
    myDetailTitle: "JOIN Stories iOS SDK",
    myDetailText: `Перевикористовуваний SDK у форматі Swift Package з модулем stories (Instagram-style), розроблений для інтеграції в різні клієнтські застосунки.

SDK побудований на модульній архітектурі та конфігурованих UI-компонентах, що дозволяє легко інтегрувати stories-функціональність і зберігати гнучкість у дизайні та поведінці.
Пакет підтримує UIKit і SwiftUI та підготовлений до production-розповсюдження через Swift Package Manager.

Technologien: Swift, SwiftUI, UIKit, SPM, Modular Architecture
Kompetenzen: SDK Design, API Design, UI Architecture, Package Distribution, System Design

Responsibilities:
• Спроєктував перевикористовуваний SDK для зовнішньої інтеграції
• Реалізував конфігурований stories UI-модуль
• Забезпечив підтримку UIKit і SwiftUI клієнтів
• Підготував SDK до production-дистрибуції
• Підтримував чисту модульну архітектуру`
  },
  {
    myTitle: "Bridgit",
    myText: "Самостійно розроблений social networking iOS-застосунок із real-time геолокацією, presence-логікою, підписками та UI/UX екранами.",
    myPoints: ["Повний solo-цикл розробки з custom UI", "Presence, push-нотифікації та flow підписок"],
    myDetailTitle: "Bridgit",
    myDetailText: `Bridgit — це social networking iOS-застосунок із real-time геолокацією, presence-логікою та subscription-функціональністю.

Я розробляв цей проєкт самостійно: від реалізації фіч і архітектури до практичної UI/UX роботи.
Окрім core-інженерії, я також коригував дизайн-рішення, сам створював окремі екрани й елементи інтерфейсу, щоб забезпечити цілісний і production-ready user experience.

Tech: Swift, SwiftUI, UIKit, Firebase, Apple Pay, Push Notifications, Location
Skills: Realtime Systems, Networking, Payments, App Architecture, Production Development, UI/UX Implementation

Responsibilities:
• Самостійно реалізував проєкт end-to-end
• Створював кастомні UI-екрани та перевикористовувані UI-компоненти
• Покращував дизайн-флоу та якість взаємодії
• Інтегрував безпечну роботу з геолокацією (approximate sharing)
• Реалізував real-time presence систему
• Інтегрував push-нотифікації (видимі та silent)
• Побудував логіку підписок і платежів`
  },
  {
    myTitle: "Saudi Post Mobile App",
    myText: "Enterprise iOS-застосунок для логістики та поштових сервісів із secure networking і модульною архітектурою.",
    myPoints: ["Захищена API-комунікація", "Модульна enterprise-кодова база"],
    myDetailTitle: "Saudi Post Mobile Application",
    myDetailText: `Enterprise iOS-застосунок для поштових і логістичних сервісів із secure networking та модульною архітектурою.

Проєкт вимагав роботи з backend API, підтримки масштабованої структури коду та дотримання enterprise-стандартів розробки.
Застосунок використовувався у production середовищі клієнта.

Tech: Swift, UIKit, REST APIs, JSON, Secure Storage, Networking
Skills: Enterprise Development, Secure APIs, Client Projects, Architecture, Production Release

Responsibilities:
• Реалізовував функції застосунку
• Працював із захищеними backend API
• Підтримував модульну структуру проєкту
• Дотримувався enterprise coding standards
• Брав участь у production-релізах`
  },
  {
    myTitle: "LinguaMoment",
    myText: "Платформа для вивчення мов із real-time дзвінками, чатом і кастомною VoIP-інфраструктурою.",
    myPoints: ["Кастомна конфігурація TURN/STUN", "Real-time система дзвінків і чату"],
    myDetailTitle: "LinguaMoment",
    myDetailText: `LinguaMoment — це платформа для вивчення мов і комунікації з real-time дзвінками, чатом і matching-функціями.

Проєкт включає кастомну VoIP-інфраструктуру, WebRTC-інтеграцію та масштабовану мережеву логіку.
Архітектура була спроєктована з урахуванням подальшого production-деплою та розширення.

Tech: Swift, Firebase, WebRTC, TURN/STUN, REST APIs, Alamofire
Skills: Realtime Networking, VoIP, Backend Integration, System Design, Mobile Architecture

Responsibilities:
• Реалізував real-time дзвінки
• Розробив chat-систему
• Налаштував TURN/STUN сервери
• Спроєктував мережеву архітектуру
• Реалізував matching та фільтри
• Підготував масштабовану структуру проєкту`
  },
  {
    myTitle: "Vuable",
    myText: "AR-базований iOS-застосунок для сканування кімнат, генерації планів приміщень і 3D-візуалізації в реальному часі.",
    myPoints: ["AR-сканування кімнат і детекція стін", "3D/2D візуалізація floor plan"],
    myDetailTitle: "Vuable",
    myDetailText: `Vuable — це AR-базований iOS-застосунок для сканування кімнат, побудови floor plan і real-time візуалізації простору в 3D та 2D.

Проєкт включав real-time детекцію стін, автоматичний розрахунок площі та плавне перемикання між 3D-візуалізацією і 2D-планами.
Окремий фокус був на точності вимірювань, продуктивності та чистій нативній реалізації.

Tech: Swift, ARKit, SceneKit, 3D Graphics, Native iOS
Skills: AR Development, 3D Visualization, Geometry Calculations, System Design, UI Development

Responsibilities:
• Реалізував AR-сканування кімнат
• Реалізував real-time детекцію стін
• Розробив алгоритм розрахунку площі
• Побудував систему 3D та 2D візуалізації
• Реалізував інструменти вимірювання
• Додав custom naming для кімнат
• Оптимізував продуктивність real-time рендерингу
• Побудував нативну Swift-архітектуру`
  },
  {
    myTitle: "Uncover",
    myText: "iOS-застосунок для пошуку книжок, керування колекціями та social reading функціями.",
    myPoints: ["Пошук книжок і колекції", "UI, networking та архітектурна робота"],
    myDetailTitle: "Uncover",
    myDetailText: `Uncover — iOS-застосунок для discovery книжок, керування колекціями та відстеження прогресу читання із social interaction функціями.

Проєкт включав розробку UI, реалізацію networking-запитів і участь в архітектурі застосунку.
Застосунок підтримує book search, customizable collections, user profiles та social interactions (likes, comments, reactions).

Tech: Swift, UIKit, REST APIs, Networking, JSON, MVC/MVVM
Skills: UI Development, Networking, App Architecture, Data Flow, API Integration

Responsibilities:
• Реалізував декілька UI-екранів
• Побудував інтерфейс пошуку книжок
• Інтегрував REST API запити
• Реалізував JSON-парсинг
• Брав участь у дизайні архітектури
• Реалізував керування колекціями
• Розробив екрани профілю користувача
• Покращував UI/UX структуру
• Підтримував чисту організацію коду`
  },
  {
    myTitle: "Freespoke",
    myText: "Покращення iOS search-застосунку: UI-оновлення, premium-функції та оптимізація продуктивності.",
    myPoints: ["Виправлення багів і оптимізація", "UI редизайн і premium-інтеграції"],
    myDetailTitle: "Freespoke",
    myDetailText: `Freespoke — мобільний search-застосунок, у якому я покращував стабільність, інтерфейс і premium-функціональність у складі команди розробки.

Моя робота включала виправлення критичних багів, інтеграцію ad-blocking premium функцій, оновлення UI та загальну оптимізацію performance для кращого користувацького досвіду.

Tech: Swift, UIKit, Networking, REST APIs, AppStore, Production App
Skills: Bug Fixing, UI Improvement, Feature Integration, Performance Optimization, Production Support

Responsibilities:
• Виправляв критичні та дрібні баги
• Покращував стабільність і продуктивність застосунку
• Інтегрував ad-blocking premium функціональність
• Оновлював UI сучасними компонентами
• Уточнював кольорову схему та layout
• Працював із networking-запитами
• Долучався до оновлення архітектурних рішень
• Підтримував production-ready якість коду
• Покращував user experience`
  },
  {
    myTitle: "Movement Vault",
    myText: "Рефакторинг iOS fitness video-застосунку з custom player, підписками й покращеною архітектурою.",
    myPoints: ["Рефакторинг архітектури та UI", "Custom video player і premium-функції"],
    myDetailTitle: "Movement Vault",
    myDetailText: `Movement Vault — fitness video iOS-застосунок, у якому я виконував рефакторинг архітектури, розробку custom video playback, subscription-функціональність і покращення UI.

Проєкт був мігрований на повністю code-based підхід із MVP-структурою, що покращило масштабованість і підтримуваність.
Я реалізував кастомний відеоплеєр, розширену playback-логіку та доступ до premium-контенту через підписку.

Tech: Swift, UIKit, AVFoundation, StoreKit, MVP, AutoLayout
Skills: Architecture Refactoring, Video Playback, Subscriptions, UI/UX, Performance Optimization

Responsibilities:
• Видалив Storyboards і XIBs
• Мігрував проєкт на code-based архітектуру
• Реалізував MVP-архітектуру
• Розробив custom video player
• Додав підтримку multi-video playback
• Реалізував playback order логіку
• Інтегрував subscription model
• Покращив UI/UX взаємодію
• Виправляв баги та оптимізував performance
• Брав участь у підготовці релізів`
  },
  {
    myTitle: "Slovnyk Language Platform",
    myText: "Мій власний мультимовний language-learning застосунок із CloudKit-синхронізацією, модульною data-моделлю та масштабованою iOS-архітектурою.",
    myPoints: ["Особиста end-to-end розробка продукту", "CloudKit sync і модульна мовна архітектура"],
    myDetailTitle: "Slovnyk Language Platform",
    myDetailText: `Slovnyk — це мій власний мультимовний language-learning застосунок із CloudKit synchronization, модульною data-моделлю та масштабованою iOS-архітектурою.

Проєкт спроєктований як повноцінна система зі структурованою моделлю даних, логікою синхронізації та перевикористовуваними UI-компонентами.
Окремий фокус — extensibility, performance та clean architecture.

Tech: Swift, SwiftUI, CloudKit, CoreData, Combine, MVVM
Skills: Product Ownership, System Design, Data Modeling, iCloud Sync, UI Architecture, App Development

Responsibilities:
• Визначив продуктову структуру та напрям розвитку
• Спроєктував повну data-архітектуру
• Реалізував CloudKit sync логіку
• Побудував модульну мовну систему
• Розробив UI на SwiftUI
• Підтримував масштабовану codebase
• Створював перевикористовувані компоненти`
  },
  {
    myTitle: "Semiconductor & Telecom Engineering",
    myText: "Інженерний досвід у мікроелектроніці, телеком-системах та лабораторному дослідницькому обладнанні.",
    myPoints: ["Розробка схем і hardware", "Лабораторні та телеком-системи"],
    myDetailTitle: "Semiconductor & Telecom Engineering",
    myDetailText: `Інженерний бекграунд у мікроелектроніці, телеком-системах і експериментальному лабораторному обладнанні.

Досвід включає роботу з напівпровідниковими матеріалами, вакуумними системами, вимірювальними пристроями та електронними схемами.
Робота охоплювала лабораторні дослідження, hardware-розробку та монтаж телеком-систем.

Tech: Electronics, RF, Vacuum Systems, Measurement Devices, Semiconductor Materials
Skills: Hardware Engineering, Circuit Design, Lab Research, Signal Systems, Experimental Setup

Responsibilities:
• Працював із лабораторним обладнанням
• Розробляв і тестував електронні схеми
• Досліджував кристалічні структури
• Працював із напівпровідниковими матеріалами
• Виконував монтаж телеком-систем
• Проводив експериментальні вимірювання`
  }
];

const myDeOverrides: myItemOverride[] = [
  {
    myTitle: "JOIN Stories iOS SDK",
    myText: "Wiederverwendbares Swift-Package-SDK mit Instagram-Story-UI-Modul zur Integration in mehrere Client-Apps.",
    myPoints: ["Modul fuer schnelle Client-Integration", "Unterstuetzung fuer UIKit und SwiftUI"],
    myDetailTitle: "JOIN Stories iOS SDK",
    myDetailText: `Wiederverwendbares Swift-Package-SDK mit einem Instagram-aehnlichen Stories-UI-Modul zur Integration in mehrere Client-Anwendungen.

Das SDK wurde mit modularer Architektur und konfigurierbaren UI-Komponenten entwickelt, damit Client-Apps Stories-Funktionalitaet einfach integrieren koennen und gleichzeitig flexibel in Design und Verhalten bleiben.
Das Paket unterstuetzt sowohl UIKit als auch SwiftUI und wurde fuer die produktive Distribution mit Swift Package Manager vorbereitet.

Tech: Swift, SwiftUI, UIKit, SPM, Modular Architecture
Skills: SDK Design, API Design, UI Architecture, Package Distribution, System Design

Verantwortlichkeiten:
• Entwurf eines wiederverwendbaren SDK fuer externe Integration
• Entwicklung eines konfigurierbaren Stories-UI-Moduls
• Unterstuetzung fuer UIKit- und SwiftUI-Clients
• Vorbereitung des SDK fuer produktive Distribution
• Pflege einer sauberen modularen Architektur`
  },
  {
    myTitle: "Bridgit",
    myText: "Eigenstaendig entwickelte Social-Networking-iOS-App mit Echtzeit-Standort, Presence-Logik, Subscriptions und UI/UX-Umsetzung.",
    myPoints: ["End-to-end Solo-Entwicklung mit Custom-UI", "Presence, Push-Notifications und Subscription-Flow"],
    myDetailTitle: "Bridgit",
    myDetailText: `Bridgit ist eine Social-Networking-iOS-App mit Echtzeit-Standorttracking, Presence-Logik und abonnementbasierten Funktionen.

Die Anwendung erforderte eine stabile Produktionsarchitektur, Echtzeit-Updates und sichere Zahlungsintegration.
Ich war fuer Netzlogik, Push-Notifications, Subscription-Flow und Echtzeit-Statusaktualisierungen verantwortlich.

Technologien: Swift, SwiftUI, UIKit, Firebase, Apple Pay, Push Notifications, Location
Kompetenzen: Realtime Systems, Networking, Payments, App Architecture, Production Development

Verantwortlichkeiten:
• Implementierung eines Echtzeit-Presence-Systems
• Aufbau von Subscription- und Payment-Flow
• Integration von Push-Notifications
• Arbeit mit Live-Standort-Updates
• Pflege der produktiven Codebasis
• Verbesserung der Anwendungsstabilitaet`
  },
  {
    myTitle: "Saudi Post Mobile App",
    myText: "Enterprise-iOS-Anwendung fuer Logistik und Postservices mit sicherer API-Kommunikation und modularer Architektur.",
    myPoints: ["Sichere API-Kommunikation", "Modulare Enterprise-Codebasis"],
    myDetailTitle: "Saudi Post Mobile Application",
    myDetailText: `Enterprise-iOS-Anwendung fuer Post- und Logistikservices mit sicherem Networking und modularer Architektur.

Das Projekt erforderte Arbeit mit Backend-APIs, die Pflege einer skalierbaren Codestruktur und die Einhaltung von Enterprise-Entwicklungsstandards.
Die Anwendung war Teil eines Client-Projekts und wurde in produktiver Umgebung eingesetzt.

Technologien: Swift, UIKit, REST APIs, JSON, Secure Storage, Networking
Kompetenzen: Enterprise Development, Secure APIs, Client Projects, Architecture, Production Release

Verantwortlichkeiten:
• Umsetzung von App-Funktionalitaeten
• Arbeit mit sicheren Backend-APIs
• Pflege einer modularen Projektstruktur
• Einhaltung von Enterprise-Coding-Standards
• Beteiligung an produktiven Releases`
  },
  {
    myTitle: "LinguaMoment",
    myText: "Sprachlernplattform mit Echtzeit-Calls, Chat und eigener VoIP-Infrastruktur.",
    myPoints: ["Eigene TURN/STUN-Konfiguration", "Echtzeit-Call- und Chat-System"],
    myDetailTitle: "LinguaMoment",
    myDetailText: `LinguaMoment ist eine Sprachlern- und Kommunikationsplattform mit Echtzeit-Calls, Chat und Matching-Funktionen.

Das Projekt umfasst eine eigene VoIP-Infrastruktur, WebRTC-Integration und skalierbare Netzwerklogik.
Die Architektur wurde fuer spaeteren produktiven Einsatz und Erweiterbarkeit ausgelegt.

Technologien: Swift, Firebase, WebRTC, TURN/STUN, REST APIs, Alamofire
Kompetenzen: Realtime Networking, VoIP, Backend Integration, System Design, Mobile Architecture

Verantwortlichkeiten:
• Umsetzung von Echtzeit-Call-Funktionalitaet
• Implementierung eines Chat-Systems
• Konfiguration von TURN/STUN-Servern
• Design der Netzwerkarchitektur
• Implementierung von Matching und Filtern
• Vorbereitung einer skalierbaren Projektstruktur`
  },
  {
    myTitle: "Vuable",
    myText: "AR-basierte iOS-App fuer Raumscans, Grundriss-Generierung und 3D-Visualisierung in Echtzeit.",
    myPoints: ["AR-Raumerkennung und Wanddetektion", "3D/2D-Grundriss-Visualisierung"],
    myDetailTitle: "Vuable",
    myDetailText: `Vuable ist eine AR-basierte iOS-Anwendung zum Scannen von Raeumen, Generieren von Grundrissen und zur Echtzeit-Visualisierung in 3D und 2D.

Das Projekt beinhaltete Echtzeit-Wanddetektion, automatische Flaechenberechnung und den nahtlosen Wechsel zwischen 3D-Visualisierung und 2D-Grundriss.
Der Fokus lag auf Messgenauigkeit, Performance und sauberer nativer Implementierung.

Technologien: Swift, ARKit, SceneKit, 3D Graphics, Native iOS
Kompetenzen: AR Development, 3D Visualization, Geometry Calculations, System Design, UI Development

Verantwortlichkeiten:
• Implementierung von AR-basiertem Raumscan
• Echtzeit-Erkennung von Waenden
• Entwicklung eines Flaechenberechnungs-Algorithmus
• Aufbau eines 3D- und 2D-Visualisierungssystems
• Umsetzung von Messwerkzeugen
• Hinzufuegen benutzerdefinierter Raumnamen
• Performance-Optimierung fuer Echtzeit-Rendering
• Aufbau einer nativen Swift-Architektur`
  },
  {
    myTitle: "Uncover",
    myText: "iOS-App zur Buchentdeckung, Sammlungsverwaltung und Social-Reading-Funktionen.",
    myPoints: ["Buchsuche und Collections", "UI-, Networking- und Architekturarbeit"],
    myDetailTitle: "Uncover",
    myDetailText: `Uncover ist eine iOS-Anwendung zur Buchentdeckung, Verwaltung von Sammlungen und zum Tracking des Lesefortschritts mit sozialen Interaktionsfunktionen.

Das Projekt umfasste UI-Entwicklung, Networking-Requests und Mitarbeit an der Anwendungsarchitektur.
Die App unterstuetzt Buchsuche, anpassbare Sammlungen, Benutzerprofile sowie soziale Interaktionen wie Likes, Kommentare und Reaktionen.

Technologien: Swift, UIKit, REST APIs, Networking, JSON, MVC/MVVM
Kompetenzen: UI Development, Networking, App Architecture, Data Flow, API Integration

Verantwortlichkeiten:
• Umsetzung mehrerer UI-Screens
• Entwicklung einer Buchsuche-Oberflaeche
• Integration von REST-API-Requests
• Verarbeitung von JSON-Daten
• Mitarbeit am App-Architekturdesign
• Implementierung der Sammlungsverwaltung
• Entwicklung von Benutzerprofil-Screens
• Verbesserung der UI/UX-Struktur
• Pflege einer sauberen Code-Organisation`
  },
  {
    myTitle: "Freespoke",
    myText: "Verbesserungen einer iOS-Such-App: UI-Updates, Premium-Features und Performance-Optimierung.",
    myPoints: ["Bugfixing und Stabilitaetsverbesserung", "UI-Redesign und Premium-Integration"],
    myDetailTitle: "Freespoke",
    myDetailText: `Freespoke ist eine mobile Suchanwendung, bei der ich als Teil des Teams Stabilitaet, Benutzeroberflaeche und Premium-Funktionalitaet verbessert habe.

Meine Arbeit umfasste die Behebung kritischer Fehler, die Integration von Ad-Blocking-Premium-Funktionen, UI-Updates und die Optimierung der Gesamtperformance fuer ein besseres Nutzungserlebnis.

Technologien: Swift, UIKit, Networking, REST APIs, AppStore, Production App
Kompetenzen: Bug Fixing, UI Improvement, Feature Integration, Performance Optimization, Production Support

Verantwortlichkeiten:
• Behebung kritischer und kleiner Bugs
• Verbesserung von Stabilitaet und Performance
• Integration einer Ad-Blocking-Premium-Funktion
• Aktualisierung der UI mit modernen Komponenten
• Ueberarbeitung von Farbschema und Layout
• Arbeit mit Netzwerk-Requests
• Beitrag zu Architektur-Updates
• Pflege von produktionsreifem Code
• Verbesserung der User Experience`
  },
  {
    myTitle: "Movement Vault",
    myText: "Refactoring einer iOS-Fitness-Video-App mit Custom-Player, Abo-Modell und Architektur-Verbesserungen.",
    myPoints: ["Architektur- und UI-Refactoring", "Custom-Video-Player und Premium-Funktionen"],
    myDetailTitle: "Movement Vault",
    myDetailText: `Movement Vault ist eine Fitness-Video-iOS-Anwendung, bei der ich Architektur-Refactoring, benutzerdefinierte Videowiedergabe, Subscription-Features und UI-Verbesserungen umgesetzt habe.

Das Projekt wurde auf eine vollstaendig codebasierte Architektur mit MVP-Struktur migriert, was Skalierbarkeit und Wartbarkeit verbessert hat.
Ich implementierte einen Custom-Video-Player, erweiterte Playback-Logik und den Zugang zu Premium-Inhalten ueber Subscriptions.

Technologien: Swift, UIKit, AVFoundation, StoreKit, MVP, AutoLayout
Kompetenzen: Architecture Refactoring, Video Playback, Subscriptions, UI/UX, Performance Optimization

Verantwortlichkeiten:
• Entfernung von Storyboards und XIBs
• Migration auf codebasierte Architektur
• Implementierung von MVP-Architektur
• Entwicklung eines Custom-Video-Players
• Hinzufuegen von Multi-Video-Playback
• Implementierung von Playback-Reihenfolge-Logik
• Integration eines Subscription-Modells
• Verbesserung von UI/UX-Interaktionen
• Bugfixing und Performance-Optimierung
• Beteiligung an Release-Vorbereitung`
  },
  {
    myTitle: "Slovnyk Language Platform",
    myText: "Mein eigenes mehrsprachiges Language-Learning-Produkt mit CloudKit-Sync, modularer Datenstruktur und skalierbarer iOS-Architektur.",
    myPoints: ["Eigene End-to-end Produktentwicklung", "CloudKit-Synchronisierung und modulare Spracharchitektur"],
    myDetailTitle: "Slovnyk Language Platform",
    myDetailText: `Slovnyk ist meine eigene mehrsprachige Sprachlern-Anwendung mit CloudKit-Synchronisierung, modularer Datenstruktur und skalierbarer iOS-Architektur.

Das Projekt wurde als vollstaendiges System mit strukturierter Datenmodellierung, Synchronisierungslogik und wiederverwendbaren UI-Komponenten aufgebaut.
Besonderes Augenmerk lag auf Erweiterbarkeit, Performance und sauberer Architektur.

Technologien: Swift, SwiftUI, CloudKit, CoreData, Combine, MVVM
Kompetenzen: Product Ownership, System Design, Data Modeling, iCloud Sync, UI Architecture, App Development

Verantwortlichkeiten:
• Definition der Produktstruktur und Entwicklungsrichtung
• Design der kompletten Datenarchitektur
• Implementierung der CloudKit-Synchronisierungslogik
• Aufbau eines modularen Sprachsystems
• Entwicklung der UI mit SwiftUI
• Pflege einer skalierbaren Codebasis
• Design wiederverwendbarer Komponenten`
  },
  {
    myTitle: "Semiconductor & Telecom Engineering",
    myText: "Engineering-Background in Mikroelektronik, Telekom-Systemen und experimenteller Laborausstattung.",
    myPoints: ["Schaltungs- und Hardware-Entwicklung", "Labor- und Telekom-Infrastruktur"],
    myDetailTitle: "Semiconductor & Telecom Engineering",
    myDetailText: `Engineering-Hintergrund in Mikroelektronik, Telekommunikationssystemen und experimenteller Laborausstattung.

Die Erfahrung umfasst Arbeit mit Halbleitermaterialien, Vakuumsystemen, Messgeraeten und elektronischen Schaltungen.
Der Schwerpunkt lag auf Laborforschung, Hardware-Entwicklung und Installation von Telekom-Infrastruktur.

Technologien: Electronics, RF, Vacuum Systems, Measurement Devices, Semiconductor Materials
Kompetenzen: Hardware Engineering, Circuit Design, Lab Research, Signal Systems, Experimental Setup

Verantwortlichkeiten:
• Arbeit mit Laborgeraeten
• Aufbau und Test elektronischer Schaltungen
• Analyse kristalliner Strukturen
• Arbeit mit Halbleitermaterialien
• Installation von Telekommunikationssystemen
• Durchfuehrung experimenteller Messungen`
  }
];

const myFrOverrides: myItemOverride[] = [
  {
    myTitle: "JOIN Stories iOS SDK",
    myText: "SDK Swift Package reutilisable avec module d'histoires style Instagram pour integration dans plusieurs applications clientes.",
    myPoints: ["Module d'integration reutilisable", "Support UIKit et SwiftUI"],
    myDetailTitle: "JOIN Stories iOS SDK",
    myDetailText: `SDK Swift Package reutilisable avec module d'histoires de style Instagram concu pour une integration dans plusieurs applications clientes.

Le SDK a ete construit avec une architecture modulaire et des composants UI configurables, permettant aux applications clientes d'integrer facilement la fonctionnalite stories tout en conservant de la flexibilite dans le design et le comportement.
Le package prend en charge UIKit et SwiftUI et a ete prepare pour une distribution production avec Swift Package Manager.

Technologies: Swift, SwiftUI, UIKit, SPM, Modular Architecture
Competences: SDK Design, API Design, UI Architecture, Package Distribution, System Design

Responsabilites:
• Conception d'un SDK reutilisable pour integration externe
• Creation d'un module UI stories configurable
• Support des clients UIKit et SwiftUI
• Preparation du SDK pour distribution en production
• Maintien d'une architecture modulaire propre`
  },
  {
    myTitle: "Bridgit",
    myText: "Application iOS de reseau social developpee en autonomie avec localisation temps reel, logique de presence, abonnements et UI/UX personnalisee.",
    myPoints: ["Developpement solo end-to-end", "Presence, notifications push et flux d'abonnement"],
    myDetailTitle: "Bridgit",
    myDetailText: `Bridgit est une application iOS de reseau social axee sur la localisation en temps reel, la logique de presence et les fonctionnalites d'abonnement.

L'application necessitait une architecture stable en production, des mises a jour en temps reel et une integration de paiement securisee.
J'ai travaille sur la logique reseau, les notifications push, le flux d'abonnement et les mises a jour de statut utilisateur en temps reel.

Technologies: Swift, SwiftUI, UIKit, Firebase, Apple Pay, Push Notifications, Location
Competences: Realtime Systems, Networking, Payments, App Architecture, Production Development

Responsabilites:
• Implementation d'un systeme de presence temps reel
• Creation du flux d'abonnement et de paiement
• Integration des notifications push
• Travail avec les mises a jour de localisation en direct
• Maintenance de la base de code en production
• Amelioration de la stabilite applicative`
  },
  {
    myTitle: "Saudi Post Mobile App",
    myText: "Application iOS enterprise pour la logistique et les services postaux avec reseau securise et architecture modulaire.",
    myPoints: ["Communication API securisee", "Base de code enterprise modulaire"],
    myDetailTitle: "Saudi Post Mobile Application",
    myDetailText: `Application iOS enterprise developpee pour les services postaux et logistiques avec reseau securise et architecture modulaire.

Le projet impliquait le travail avec des API backend, le maintien d'une structure de code evolutive et le respect des standards de developpement enterprise.
L'application faisait partie d'un projet client et etait utilisee en environnement de production.

Technologies: Swift, UIKit, REST APIs, JSON, Secure Storage, Networking
Competences: Enterprise Development, Secure APIs, Client Projects, Architecture, Production Release

Responsabilites:
• Implementation de fonctionnalites applicatives
• Travail avec des API backend securisees
• Maintenance d'une structure modulaire du projet
• Respect des standards de code enterprise
• Participation aux livraisons en production`
  },
  {
    myTitle: "LinguaMoment",
    myText: "Plateforme d'apprentissage des langues avec appels temps reel, chat et infrastructure VoIP personnalisee.",
    myPoints: ["Configuration TURN/STUN personnalisee", "Systeme d'appels et chat temps reel"],
    myDetailTitle: "LinguaMoment",
    myDetailText: `LinguaMoment est une plateforme d'apprentissage des langues et de communication avec appels temps reel, chat et fonctionnalites de matching.

Le projet inclut une infrastructure VoIP personnalisee, une integration WebRTC et une logique reseau evolutive.
L'architecture a ete pensee pour un deploiement production futur et des extensions.

Technologies: Swift, Firebase, WebRTC, TURN/STUN, REST APIs, Alamofire
Competences: Realtime Networking, VoIP, Backend Integration, System Design, Mobile Architecture

Responsabilites:
• Creation de la fonctionnalite d'appels temps reel
• Implementation d'un systeme de chat
• Configuration des serveurs TURN/STUN
• Conception de l'architecture reseau
• Implementation du matching et des filtres
• Preparation d'une structure de projet evolutive`
  },
  {
    myTitle: "Vuable",
    myText: "Application iOS AR pour scanner des pieces, generer des plans et visualiser les espaces en 3D/2D en temps reel.",
    myPoints: ["Scan AR des pieces et detection des murs", "Visualisation 3D/2D des plans"],
    myDetailTitle: "Vuable",
    myDetailText: `Vuable est une application iOS basee sur l'AR pour scanner des pieces, generer des plans et visualiser les espaces en temps reel en 3D et 2D.

Le projet comprenait la detection des murs en temps reel, le calcul automatique de surface et la bascule fluide entre visualisation 3D et plan 2D.
Une attention particuliere a ete portee a la precision des mesures, aux performances et a une implementation native propre.

Technologies: Swift, ARKit, SceneKit, 3D Graphics, Native iOS
Competences: AR Development, 3D Visualization, Geometry Calculations, System Design, UI Development

Responsabilites:
• Implementation du scan de piece base sur l'AR
• Detection des murs en temps reel
• Developpement d'un algorithme de calcul de surface
• Creation d'un systeme de visualisation 3D et 2D
• Implementation d'outils de mesure
• Ajout du nommage personnalise des pieces
• Optimisation des performances de rendu temps reel
• Construction d'une architecture Swift native`
  },
  {
    myTitle: "Uncover",
    myText: "Application iOS pour la decouverte de livres, la gestion de collections et des fonctionnalites de lecture sociale.",
    myPoints: ["Recherche de livres et collections", "Travail UI, reseau et architecture"],
    myDetailTitle: "Uncover",
    myDetailText: `Uncover est une application iOS concue pour la decouverte de livres, l'organisation de collections et le suivi de lecture avec des fonctions d'interaction sociale.

Le projet incluait le developpement d'interfaces utilisateur, l'implementation des requetes reseau et une contribution a l'architecture applicative.
L'application prend en charge la recherche de livres, les collections personnalisables, les profils utilisateurs et les interactions sociales comme les likes, commentaires et reactions.

Technologies: Swift, UIKit, REST APIs, Networking, JSON, MVC/MVVM
Competences: UI Development, Networking, App Architecture, Data Flow, API Integration

Responsabilites:
• Implementation de plusieurs ecrans UI
• Creation d'une interface de recherche de livres
• Integration de requetes REST API
• Travail sur le parsing des donnees JSON
• Participation a la conception de l'architecture applicative
• Implementation de la gestion des collections
• Developpement des ecrans de profil utilisateur
• Amelioration de la structure UI/UX
• Maintien d'une organisation de code propre`
  },
  {
    myTitle: "Freespoke",
    myText: "Ameliorations d'une application iOS de recherche: mises a jour UI, fonctionnalites premium et optimisation des performances.",
    myPoints: ["Correction de bugs et stabilite", "Refonte UI et integration premium"],
    myDetailTitle: "Freespoke",
    myDetailText: `Freespoke est une application mobile de recherche dans laquelle j'ai contribue a ameliorer la stabilite, l'interface utilisateur et la fonctionnalite premium au sein de l'equipe de developpement.

Mon travail comprenait la correction de bugs critiques, l'integration de fonctionnalites premium de blocage publicitaire, la mise a jour de l'UI et l'amelioration globale des performances pour une meilleure experience utilisateur.

Technologies: Swift, UIKit, Networking, REST APIs, AppStore, Production App
Competences: Bug Fixing, UI Improvement, Feature Integration, Performance Optimization, Production Support

Responsabilites:
• Correction de bugs critiques et mineurs
• Amelioration de la stabilite et des performances
• Integration d'une fonctionnalite premium de blocage des publicites
• Mise a jour de l'UI avec des composants modernes
• Affinage des couleurs et des layouts
• Travail avec les requetes reseau
• Contribution aux mises a jour d'architecture
• Maintien d'un code pret pour la production
• Amelioration de l'experience utilisateur`
  },
  {
    myTitle: "Movement Vault",
    myText: "Refactoring d'une application iOS fitness video avec lecteur personnalise, abonnements et evolution d'architecture.",
    myPoints: ["Refactoring architecture et UI", "Lecteur video custom et fonctions premium"],
    myDetailTitle: "Movement Vault",
    myDetailText: `Movement Vault est une application iOS de videos fitness sur laquelle j'ai travaille le refactoring d'architecture, la lecture video personnalisee, les fonctionnalites d'abonnement et l'amelioration de l'UI.

Le projet a ete migre vers une architecture entierement basee sur le code avec une structure MVP, ce qui a renforce la scalabilite et la maintenabilite.
J'ai implemente un lecteur video personnalise, une logique de lecture avancee et l'acces aux contenus premium via abonnement.

Technologies: Swift, UIKit, AVFoundation, StoreKit, MVP, AutoLayout
Competences: Architecture Refactoring, Video Playback, Subscriptions, UI/UX, Performance Optimization

Responsabilites:
• Suppression des Storyboards et XIBs
• Migration vers une architecture code-based
• Implementation de l'architecture MVP
• Creation d'un lecteur video personnalise
• Ajout du support multi-video playback
• Implementation de la logique d'ordre de lecture
• Integration du modele d'abonnement
• Amelioration des interactions UI/UX
• Correction de bugs et optimisation des performances
• Participation a la preparation des releases`
  },
  {
    myTitle: "Slovnyk Language Platform",
    myText: "Mon propre projet d'apprentissage des langues avec synchronisation CloudKit, modele de donnees modulaire et architecture iOS evolutive.",
    myPoints: ["Developpement produit end-to-end", "Synchronisation CloudKit et architecture linguistique modulaire"],
    myDetailTitle: "Slovnyk Language Platform",
    myDetailText: `Slovnyk est mon propre produit d'apprentissage des langues, multilingue, avec synchronisation CloudKit, modele de donnees modulaire et architecture iOS evolutive.

Le projet a ete concu comme un systeme complet avec modelisation de donnees structuree, logique de synchronisation et composants UI reutilisables.
Une attention particuliere a ete portee a l'extensibilite, aux performances et a une architecture propre.

Technologies: Swift, SwiftUI, CloudKit, CoreData, Combine, MVVM
Competences: Product Ownership, System Design, Data Modeling, iCloud Sync, UI Architecture, App Development

Responsabilites:
• Definition de la structure produit et de la direction de developpement
• Conception de l'architecture de donnees complete
• Implementation de la logique de synchronisation CloudKit
• Construction d'un systeme linguistique modulaire
• Developpement de l'UI avec SwiftUI
• Maintenance d'une base de code evolutive
• Conception de composants reutilisables`
  },
  {
    myTitle: "Semiconductor & Telecom Engineering",
    myText: "Experience d'ingenierie en microelectronique, systemes telecom et equipements de laboratoire de recherche.",
    myPoints: ["Developpement de circuits et hardware", "Systemes de laboratoire et telecom"],
    myDetailTitle: "Semiconductor & Telecom Engineering",
    myDetailText: `Parcours d'ingenierie en microelectronique, systemes telecom et equipements experimentaux de laboratoire.

L'experience inclut le travail avec les materiaux semiconducteurs, les systemes sous vide, les appareils de mesure et les circuits electroniques.
Le travail couvrait la recherche en laboratoire, le developpement hardware et l'installation d'infrastructures telecom.

Technologies: Electronics, RF, Vacuum Systems, Measurement Devices, Semiconductor Materials
Competences: Hardware Engineering, Circuit Design, Lab Research, Signal Systems, Experimental Setup

Responsabilites:
• Travail avec des equipements de laboratoire
• Conception et test de circuits electroniques
• Etude des structures cristallines
• Travail avec des materiaux semiconducteurs
• Installation de systemes telecom
• Realisation de mesures experimentales`
  }
];

export const mySelectedWorkSectionUk: mySelectedWorkSection = {
  myTitle: "Вибрані проєкти",
  mySubtitle: "Продукти, створені з системним мисленням і увагою до деталей.",
  myOpenDetailsLabel: "Відкрити деталі",
  myCloseDetailsLabel: "Закрити",
  myPrevLabel: "← Попер.",
  myNextLabel: "Далі →",
  myPrevAriaLabel: "Попередні проєкти",
  myNextAriaLabel: "Наступні проєкти",
  myItems: myBuildLocalizedItems(myUkOverrides)
};

export const mySelectedWorkSectionDe: mySelectedWorkSection = {
  myTitle: "Ausgewaehlte Projekte",
  mySubtitle: "Produkte mit systemischem Denken und hoher Detailgenauigkeit.",
  myOpenDetailsLabel: "Details oeffnen",
  myCloseDetailsLabel: "Schliessen",
  myPrevLabel: "← Zurueck",
  myNextLabel: "Weiter →",
  myPrevAriaLabel: "Vorherige Projekte",
  myNextAriaLabel: "Naechste Projekte",
  myItems: myBuildLocalizedItems(myDeOverrides)
};

export const mySelectedWorkSectionFr: mySelectedWorkSection = {
  myTitle: "Projets selectionnes",
  mySubtitle: "Produits realises avec une pensee systemique et une attention forte aux details.",
  myOpenDetailsLabel: "Ouvrir les details",
  myCloseDetailsLabel: "Fermer",
  myPrevLabel: "← Prec.",
  myNextLabel: "Suiv. →",
  myPrevAriaLabel: "Projets precedents",
  myNextAriaLabel: "Projets suivants",
  myItems: myBuildLocalizedItems(myFrOverrides)
};
