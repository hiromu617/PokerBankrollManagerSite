export type Language = "ja" | "en" | "fr" | "es" | "de";

type FeatureEntry = {
  title: string;
  description: string;
};

export type Translations = {
  hero: { subtitle: string; download: string };
  features: {
    heading: string;
    sessionRecording: FeatureEntry;
    bankrollManagement: FeatureEntry;
    detailedAnalysis: FeatureEntry;
    handHistory: FeatureEntry;
    tripManagement: FeatureEntry;
    dataExport: FeatureEntry;
  };
  screenshots: {
    dashboard: string;
    analysis: string;
    liveSession: string;
    bankroll: string;
    handHistory: string;
  };
  footer: { privacyPolicy: string; termsOfService: string };
  legal: { backToHome: string };
};

const translations: Record<Language, Translations> = {
  ja: {
    hero: {
      subtitle: "ポーカーの収支をスマートに管理",
      download: "App Storeでダウンロード",
    },
    features: {
      heading: "機能",
      sessionRecording: {
        title: "セッション記録",
        description:
          "リアルタイムでポーカーセッションの収支を記録。キャッシュゲーム・MTT対応",
      },
      bankrollManagement: {
        title: "バンクロール管理",
        description: "複数通貨でのバンクロール推移をチャートで可視化",
      },
      detailedAnalysis: {
        title: "詳細な分析",
        description: "ステークス別・場所別・期間別の損益分析で戦略を改善",
      },
      handHistory: {
        title: "ハンド記録",
        description: "セッション中の重要なハンドを記録。プリフロップからリバーまでのアクションを保存",
      },
      tripManagement: {
        title: "トリップ管理（Pro）",
        description: "遠征やトーナメントシリーズ単位で収支・経費をまとめて管理",
      },
      dataExport: {
        title: "データエクスポート",
        description: "CSV出力で外部ツールとの連携も可能",
      },
    },
    screenshots: {
      dashboard: "ダッシュボード（バンクロール推移）",
      analysis: "分析画面（カレンダー）",
      liveSession: "ライブセッション記録",
      bankroll: "バンクロール詳細（出金管理）",
      handHistory: "ハンド記録",
    },
    footer: {
      privacyPolicy: "プライバシーポリシー",
      termsOfService: "利用規約",
    },
    legal: {
      backToHome: "ホームに戻る",
    },
  },
  en: {
    hero: {
      subtitle: "Smart bankroll management for poker",
      download: "Download on the App Store",
    },
    features: {
      heading: "Features",
      sessionRecording: {
        title: "Session Recording",
        description:
          "Record poker session results in real time. Supports cash games & MTT.",
      },
      bankrollManagement: {
        title: "Bankroll Management",
        description:
          "Visualize bankroll trends across multiple currencies with charts.",
      },
      detailedAnalysis: {
        title: "Detailed Analysis",
        description:
          "Improve your strategy with P&L breakdowns by stakes, venue, and period.",
      },
      handHistory: {
        title: "Hand History",
        description: "Record key hands during sessions. Save actions from preflop through river.",
      },
      tripManagement: {
        title: "Trip Management (Pro)",
        description: "Track profit and expenses per trip or tournament series in one place.",
      },
      dataExport: {
        title: "Data Export",
        description:
          "Export to CSV for integration with external tools.",
      },
    },
    screenshots: {
      dashboard: "Dashboard (Bankroll Trend)",
      analysis: "Analytics (Calendar)",
      liveSession: "Live Session Recording",
      bankroll: "Bankroll Detail (Withdrawals)",
      handHistory: "Hand History",
    },
    footer: {
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
    },
    legal: {
      backToHome: "Back to Home",
    },
  },
  fr: {
    hero: {
      subtitle: "Gestion intelligente de votre bankroll poker",
      download: "Télécharger sur l'App Store",
    },
    features: {
      heading: "Fonctionnalités",
      sessionRecording: {
        title: "Enregistrement de session",
        description:
          "Enregistrez vos résultats de session en temps réel. Cash games et MTT pris en charge.",
      },
      bankrollManagement: {
        title: "Gestion de bankroll",
        description:
          "Visualisez l'évolution de votre bankroll en plusieurs devises avec des graphiques.",
      },
      detailedAnalysis: {
        title: "Analyse détaillée",
        description:
          "Améliorez votre stratégie avec des analyses par enjeux, lieu et période.",
      },
      handHistory: {
        title: "Historique des mains",
        description: "Enregistrez les mains clés pendant vos sessions. Sauvegardez les actions du preflop à la river.",
      },
      tripManagement: {
        title: "Gestion de voyages (Pro)",
        description: "Suivez les gains et dépenses par voyage ou série de tournois.",
      },
      dataExport: {
        title: "Export de données",
        description:
          "Exportez en CSV pour une intégration avec des outils externes.",
      },
    },
    screenshots: {
      dashboard: "Tableau de bord (Évolution du bankroll)",
      analysis: "Analyse (Calendrier)",
      liveSession: "Session en direct",
      bankroll: "Détail du bankroll (Retraits)",
      handHistory: "Historique des mains",
    },
    footer: {
      privacyPolicy: "Politique de confidentialité",
      termsOfService: "Conditions d'utilisation",
    },
    legal: {
      backToHome: "Retour à l'accueil",
    },
  },
  es: {
    hero: {
      subtitle: "Gestión inteligente de tu bankroll de póker",
      download: "Descargar en la App Store",
    },
    features: {
      heading: "Características",
      sessionRecording: {
        title: "Registro de sesiones",
        description:
          "Registra los resultados de tus sesiones en tiempo real. Compatible con cash games y MTT.",
      },
      bankrollManagement: {
        title: "Gestión de bankroll",
        description:
          "Visualiza la evolución de tu bankroll en múltiples divisas con gráficos.",
      },
      detailedAnalysis: {
        title: "Análisis detallado",
        description:
          "Mejora tu estrategia con análisis por stakes, lugar y período.",
      },
      handHistory: {
        title: "Historial de manos",
        description: "Registra las manos clave durante tus sesiones. Guarda las acciones desde el preflop hasta el river.",
      },
      tripManagement: {
        title: "Gestión de viajes (Pro)",
        description: "Controla ganancias y gastos por viaje o serie de torneos.",
      },
      dataExport: {
        title: "Exportación de datos",
        description:
          "Exporta a CSV para integración con herramientas externas.",
      },
    },
    screenshots: {
      dashboard: "Panel principal (Tendencia del bankroll)",
      analysis: "Análisis (Calendario)",
      liveSession: "Sesión en vivo",
      bankroll: "Detalle del bankroll (Retiros)",
      handHistory: "Historial de manos",
    },
    footer: {
      privacyPolicy: "Política de privacidad",
      termsOfService: "Términos de servicio",
    },
    legal: {
      backToHome: "Volver al inicio",
    },
  },
  de: {
    hero: {
      subtitle: "Intelligentes Bankroll-Management für Poker",
      download: "Im App Store herunterladen",
    },
    features: {
      heading: "Funktionen",
      sessionRecording: {
        title: "Sitzungsaufzeichnung",
        description:
          "Erfasse Poker-Sitzungsergebnisse in Echtzeit. Unterstützt Cash Games und MTT.",
      },
      bankrollManagement: {
        title: "Bankroll-Verwaltung",
        description:
          "Visualisiere Bankroll-Trends in mehreren Währungen mit Diagrammen.",
      },
      detailedAnalysis: {
        title: "Detaillierte Analyse",
        description:
          "Verbessere deine Strategie mit Gewinn- und Verlustanalysen nach Stakes, Ort und Zeitraum.",
      },
      handHistory: {
        title: "Hand-Verlauf",
        description: "Zeichne wichtige Hände während der Sitzungen auf. Speichere Aktionen vom Preflop bis zum River.",
      },
      tripManagement: {
        title: "Reiseverwaltung (Pro)",
        description: "Verfolge Gewinne und Ausgaben pro Reise oder Turnierserie.",
      },
      dataExport: {
        title: "Datenexport",
        description:
          "Exportiere als CSV zur Integration mit externen Tools.",
      },
    },
    screenshots: {
      dashboard: "Dashboard (Bankroll-Verlauf)",
      analysis: "Analyse (Kalender)",
      liveSession: "Live-Sitzungsaufzeichnung",
      bankroll: "Bankroll-Details (Auszahlungen)",
      handHistory: "Hand-Verlauf",
    },
    footer: {
      privacyPolicy: "Datenschutzrichtlinie",
      termsOfService: "Nutzungsbedingungen",
    },
    legal: {
      backToHome: "Zurück zur Startseite",
    },
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}
