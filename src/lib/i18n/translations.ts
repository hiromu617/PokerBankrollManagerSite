export type Language = "ja" | "en";

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
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}
