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
    multiCurrency: FeatureEntry;
    customCurrency: FeatureEntry;
    dataExport: FeatureEntry;
  };
  screenshots: {
    dashboard: string;
    analysis: string;
    liveSession: string;
  };
  footer: { privacyPolicy: string; termsOfService: string };
  legal: { backToHome: string };
};

const translations: Record<Language, Translations> = {
  ja: {
    hero: {
      subtitle: "ポーカーの収支をスマートに管理",
      download: "App Storeからダウンロード",
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
      multiCurrency: {
        title: "マルチ通貨対応",
        description: "USD、JPY、EURなど16以上の通貨に対応",
      },
      customCurrency: {
        title: "カスタム通貨",
        description: "アミューズメント店舗のポイントなど独自の通貨単位を作成・記録可能",
      },
      dataExport: {
        title: "データエクスポート",
        description: "CSV出力で外部ツールとの連携も可能",
      },
    },
    screenshots: {
      dashboard: "ダッシュボード（バンクロール推移）",
      analysis: "分析画面（損益チャート）",
      liveSession: "ライブセッション記録",
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
      multiCurrency: {
        title: "Multi-Currency",
        description: "Supports 16+ currencies including USD, JPY, and EUR.",
      },
      customCurrency: {
        title: "Custom Currency",
        description: "Create custom currency units to track amusement venue points and more.",
      },
      dataExport: {
        title: "Data Export",
        description:
          "Export to CSV for integration with external tools.",
      },
    },
    screenshots: {
      dashboard: "Dashboard (Bankroll Trend)",
      analysis: "Analysis (P&L Chart)",
      liveSession: "Live Session Recording",
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
