import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Bio from "./components/Bio";
import Publications from "./components/Publications";
import Awards from "./components/Awards";
import Career from "./components/Career";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);

  // 言語の初期化
  useEffect(() => {
    try {
      // ローカルストレージから言語設定を取得
      const savedLanguage = localStorage.getItem("preferredLanguage");

      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      } else {
        // ブラウザの言語設定から日本語か英語かを判定
        const browserLang = navigator.language;
        const lang = browserLang.startsWith("ja") ? "ja" : "en";
        i18n.changeLanguage(lang);
        localStorage.setItem("preferredLanguage", lang);
      }
    } catch (error) {
      console.error("Language initialization error:", error);
      // デフォルト言語を設定
      i18n.changeLanguage("en");
    } finally {
      setIsInitialized(true);
    }
  }, [i18n]);

  // 初期化が完了するまでローディング表示
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        Initializing...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Bio />
        <Publications />
        <Awards />
        <Career />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
