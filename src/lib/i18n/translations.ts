export type Language = "ja" | "en" | "fr" | "es" | "de" | "pt" | "zh-CN" | "zh-TW" | "ko";

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
  footer: { privacyPolicy: string; termsOfService: string; blog: string; faq: string };
  legal: { backToHome: string };
  blog: { heading: string; backToBlog: string; backToHome: string; viewAll: string };
  faq: { heading: string; backToFaq: string; backToHome: string; viewAll: string };
  common: { copy: string; copied: string };
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
      blog: "ブログ",
      faq: "よくある質問",
    },
    legal: {
      backToHome: "ホームに戻る",
    },
    blog: {
      heading: "ブログ",
      backToBlog: "ブログ一覧に戻る",
      backToHome: "ホームに戻る",
      viewAll: "すべての記事を見る",
    },
    faq: {
      heading: "よくある質問",
      backToFaq: "質問一覧に戻る",
      backToHome: "ホームに戻る",
      viewAll: "すべての質問を見る",
    },
    common: {
      copy: "コピー",
      copied: "コピーしました",
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
      blog: "Blog",
      faq: "FAQ",
    },
    legal: {
      backToHome: "Back to Home",
    },
    blog: {
      heading: "Blog",
      backToBlog: "Back to Blog",
      backToHome: "Back to Home",
      viewAll: "View all posts",
    },
    faq: {
      heading: "FAQ",
      backToFaq: "Back to FAQ",
      backToHome: "Back to Home",
      viewAll: "View all questions",
    },
    common: {
      copy: "Copy",
      copied: "Copied",
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
      blog: "Blog",
      faq: "FAQ",
    },
    legal: {
      backToHome: "Retour à l'accueil",
    },
    blog: {
      heading: "Blog",
      backToBlog: "Retour au blog",
      backToHome: "Retour à l'accueil",
      viewAll: "Voir tous les articles",
    },
    faq: {
      heading: "FAQ",
      backToFaq: "Retour à la FAQ",
      backToHome: "Retour à l'accueil",
      viewAll: "Voir toutes les questions",
    },
    common: {
      copy: "Copier",
      copied: "Copié",
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
      blog: "Blog",
      faq: "Preguntas frecuentes",
    },
    legal: {
      backToHome: "Volver al inicio",
    },
    blog: {
      heading: "Blog",
      backToBlog: "Volver al blog",
      backToHome: "Volver al inicio",
      viewAll: "Ver todos los articulos",
    },
    faq: {
      heading: "Preguntas frecuentes",
      backToFaq: "Volver a las preguntas frecuentes",
      backToHome: "Volver al inicio",
      viewAll: "Ver todas las preguntas",
    },
    common: {
      copy: "Copiar",
      copied: "Copiado",
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
      blog: "Blog",
      faq: "FAQ",
    },
    legal: {
      backToHome: "Zurück zur Startseite",
    },
    blog: {
      heading: "Blog",
      backToBlog: "Zurück zum Blog",
      backToHome: "Zurück zur Startseite",
      viewAll: "Alle Beitrage anzeigen",
    },
    faq: {
      heading: "FAQ",
      backToFaq: "Zurück zur FAQ",
      backToHome: "Zurück zur Startseite",
      viewAll: "Alle Fragen anzeigen",
    },
    common: {
      copy: "Kopieren",
      copied: "Kopiert",
    },
  },
  pt: {
    hero: {
      subtitle: "Gestão inteligente de bankroll para poker",
      download: "Baixar na App Store",
    },
    features: {
      heading: "Funcionalidades",
      sessionRecording: {
        title: "Registro de Sessões",
        description:
          "Registre os resultados das suas sessões de poker em tempo real. Compatível com cash games e MTT.",
      },
      bankrollManagement: {
        title: "Gestão de Bankroll",
        description:
          "Visualize as tendências do seu bankroll em várias moedas com gráficos.",
      },
      detailedAnalysis: {
        title: "Análise Detalhada",
        description:
          "Melhore sua estratégia com análises de lucros e perdas por stakes, local e período.",
      },
      handHistory: {
        title: "Histórico de Mãos",
        description: "Registre as mãos importantes durante as sessões. Salve as ações do preflop ao river.",
      },
      tripManagement: {
        title: "Gestão de Viagens (Pro)",
        description: "Acompanhe lucros e despesas por viagem ou série de torneios.",
      },
      dataExport: {
        title: "Exportação de Dados",
        description:
          "Exporte em CSV para integração com ferramentas externas.",
      },
    },
    screenshots: {
      dashboard: "Painel (Tendência do Bankroll)",
      analysis: "Análise (Calendário)",
      liveSession: "Sessão ao Vivo",
      bankroll: "Detalhes do Bankroll (Saques)",
      handHistory: "Histórico de Mãos",
    },
    footer: {
      privacyPolicy: "Política de Privacidade",
      termsOfService: "Termos de Serviço",
      blog: "Blog",
      faq: "Perguntas frequentes",
    },
    legal: {
      backToHome: "Voltar ao Início",
    },
    blog: {
      heading: "Blog",
      backToBlog: "Voltar ao blog",
      backToHome: "Voltar ao Início",
      viewAll: "Ver todos os artigos",
    },
    faq: {
      heading: "Perguntas frequentes",
      backToFaq: "Voltar às perguntas frequentes",
      backToHome: "Voltar ao Início",
      viewAll: "Ver todas as perguntas",
    },
    common: {
      copy: "Copiar",
      copied: "Copiado",
    },
  },
  "zh-CN": {
    hero: {
      subtitle: "智能管理你的扑克资金",
      download: "在 App Store 下载",
    },
    features: {
      heading: "功能",
      sessionRecording: {
        title: "牌局记录",
        description:
          "实时记录扑克牌局结果。支持现金桌和MTT锦标赛。",
      },
      bankrollManagement: {
        title: "资金管理",
        description:
          "通过图表可视化多币种资金走势。",
      },
      detailedAnalysis: {
        title: "详细分析",
        description:
          "按级别、场地和时间段分析盈亏，优化你的策略。",
      },
      handHistory: {
        title: "手牌记录",
        description: "记录牌局中的关键手牌。保存从翻牌前到河牌的所有操作。",
      },
      tripManagement: {
        title: "行程管理（Pro）",
        description: "按行程或锦标赛系列统一管理收益和支出。",
      },
      dataExport: {
        title: "数据导出",
        description:
          "导出CSV文件，与外部工具集成。",
      },
    },
    screenshots: {
      dashboard: "仪表盘（资金走势）",
      analysis: "分析（日历）",
      liveSession: "实时牌局记录",
      bankroll: "资金详情（提款）",
      handHistory: "手牌记录",
    },
    footer: {
      privacyPolicy: "隐私政策",
      termsOfService: "服务条款",
      blog: "博客",
      faq: "常见问题",
    },
    legal: {
      backToHome: "返回首页",
    },
    blog: {
      heading: "博客",
      backToBlog: "返回博客列表",
      backToHome: "返回首页",
      viewAll: "查看所有文章",
    },
    faq: {
      heading: "常见问题",
      backToFaq: "返回常见问题列表",
      backToHome: "返回首页",
      viewAll: "查看所有问题",
    },
    common: {
      copy: "复制",
      copied: "已复制",
    },
  },
  "zh-TW": {
    hero: {
      subtitle: "智慧管理你的撲克資金",
      download: "在 App Store 下載",
    },
    features: {
      heading: "功能",
      sessionRecording: {
        title: "牌局記錄",
        description:
          "即時記錄撲克牌局結果。支援現金桌和MTT錦標賽。",
      },
      bankrollManagement: {
        title: "資金管理",
        description:
          "透過圖表視覺化多幣種資金走勢。",
      },
      detailedAnalysis: {
        title: "詳細分析",
        description:
          "按級別、場地和時間段分析盈虧，優化你的策略。",
      },
      handHistory: {
        title: "手牌記錄",
        description: "記錄牌局中的關鍵手牌。儲存從翻牌前到河牌的所有操作。",
      },
      tripManagement: {
        title: "行程管理（Pro）",
        description: "按行程或錦標賽系列統一管理收益和支出。",
      },
      dataExport: {
        title: "資料匯出",
        description:
          "匯出CSV檔案，與外部工具整合。",
      },
    },
    screenshots: {
      dashboard: "儀表板（資金走勢）",
      analysis: "分析（日曆）",
      liveSession: "即時牌局記錄",
      bankroll: "資金詳情（提款）",
      handHistory: "手牌記錄",
    },
    footer: {
      privacyPolicy: "隱私權政策",
      termsOfService: "服務條款",
      blog: "部落格",
      faq: "常見問題",
    },
    legal: {
      backToHome: "返回首頁",
    },
    blog: {
      heading: "部落格",
      backToBlog: "返回部落格列表",
      backToHome: "返回首頁",
      viewAll: "查看所有文章",
    },
    faq: {
      heading: "常見問題",
      backToFaq: "返回常見問題列表",
      backToHome: "返回首頁",
      viewAll: "查看所有問題",
    },
    common: {
      copy: "複製",
      copied: "已複製",
    },
  },
  ko: {
    hero: {
      subtitle: "포커 뱅크롤을 스마트하게 관리",
      download: "App Store에서 다운로드",
    },
    features: {
      heading: "기능",
      sessionRecording: {
        title: "세션 기록",
        description:
          "포커 세션 결과를 실시간으로 기록. 캐시 게임과 MTT를 지원합니다.",
      },
      bankrollManagement: {
        title: "뱅크롤 관리",
        description:
          "차트로 다양한 통화의 뱅크롤 추이를 시각화합니다.",
      },
      detailedAnalysis: {
        title: "상세 분석",
        description:
          "스테이크, 장소, 기간별 손익 분석으로 전략을 개선하세요.",
      },
      handHistory: {
        title: "핸드 기록",
        description: "세션 중 주요 핸드를 기록. 프리플랍부터 리버까지 액션을 저장합니다.",
      },
      tripManagement: {
        title: "트립 관리 (Pro)",
        description: "여행 또는 토너먼트 시리즈별로 수익과 경비를 관리합니다.",
      },
      dataExport: {
        title: "데이터 내보내기",
        description:
          "CSV로 내보내 외부 도구와 연동할 수 있습니다.",
      },
    },
    screenshots: {
      dashboard: "대시보드 (뱅크롤 추이)",
      analysis: "분석 (캘린더)",
      liveSession: "라이브 세션 기록",
      bankroll: "뱅크롤 상세 (출금)",
      handHistory: "핸드 기록",
    },
    footer: {
      privacyPolicy: "개인정보 처리방침",
      termsOfService: "이용약관",
      blog: "블로그",
      faq: "자주 묻는 질문",
    },
    legal: {
      backToHome: "홈으로 돌아가기",
    },
    blog: {
      heading: "블로그",
      backToBlog: "블로그 목록으로 돌아가기",
      backToHome: "홈으로 돌아가기",
      viewAll: "모든 글 보기",
    },
    faq: {
      heading: "자주 묻는 질문",
      backToFaq: "질문 목록으로 돌아가기",
      backToHome: "홈으로 돌아가기",
      viewAll: "모든 질문 보기",
    },
    common: {
      copy: "복사",
      copied: "복사됨",
    },
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}
