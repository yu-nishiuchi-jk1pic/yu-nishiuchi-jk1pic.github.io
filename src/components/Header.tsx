import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ja" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-primary text-white py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* ロゴ/名前 */}
          <a href="#" className="text-xl font-bold">
            {t("header.name")}
          </a>

          {/* PC用ナビゲーション */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <a href="#bio" className="hover:text-accent transition-colors">
                  {t("nav.bio")}
                </a>
              </li>
              <li>
                <a
                  href="#publications"
                  className="hover:text-accent transition-colors"
                >
                  {t("nav.publications")}
                </a>
              </li>
              <li>
                <a
                  href="#awards"
                  className="hover:text-accent transition-colors"
                >
                  {t("nav.awards")}
                </a>
              </li>
              <li>
                <a
                  href="#career"
                  className="hover:text-accent transition-colors"
                >
                  {t("nav.career")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-accent transition-colors"
                >
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </nav>

          {/* 言語切り替えとモバイルメニューボタン */}
          <div className="flex items-center">
            <button
              onClick={toggleLanguage}
              className="bg-secondary hover:bg-secondary-light px-3 py-1 rounded text-sm transition-colors mr-4"
            >
              {i18n.language === "en" ? "日本語" : "English"}
            </button>

            {/* モバイルメニューボタン */}
            <button
              className="md:hidden text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-primary-light rounded-lg shadow-lg p-4">
            <ul className="space-y-3">
              <li>
                <a
                  href="#bio"
                  onClick={closeMenu}
                  className="block hover:text-accent transition-colors"
                >
                  {t("nav.bio")}
                </a>
              </li>
              <li>
                <a
                  href="#publications"
                  onClick={closeMenu}
                  className="block hover:text-accent transition-colors"
                >
                  {t("nav.publications")}
                </a>
              </li>
              <li>
                <a
                  href="#awards"
                  onClick={closeMenu}
                  className="block hover:text-accent transition-colors"
                >
                  {t("nav.awards")}
                </a>
              </li>
              <li>
                <a
                  href="#career"
                  onClick={closeMenu}
                  className="block hover:text-accent transition-colors"
                >
                  {t("nav.career")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="block hover:text-accent transition-colors"
                >
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
