import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Paper, Presentation } from "../types";

const Publications: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"papers" | "presentations">(
    "papers"
  );
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [years, setYears] = useState<string[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);
  const maxItems = 5;

  // 年のリストを取得
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await fetch("/api/years.json");
        const data = await response.json();
        setYears(data.years || []);

        // デフォルトですべての年度を選択
        setSelectedYear("");
      } catch (error) {
        console.error("Failed to fetch years:", error);
        setYears([]);
      }
    };

    fetchYears();
  }, []);

  // 論文または発表データを取得
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const endpoint =
          activeTab === "papers"
            ? selectedYear
              ? `./api/papers-${selectedYear}.json`
              : "/api/papers.json"
            : selectedYear
            ? `./api/presentations-${selectedYear}.json`
            : "/api/presentations.json";

        const response = await fetch(endpoint);
        const data = await response.json();

        if (activeTab === "papers") {
          setPapers(data || []);
        } else {
          setPresentations(data || []);
        }
      } catch (error) {
        console.error(`Failed to fetch ${activeTab}:`, error);
        if (activeTab === "papers") {
          setPapers([]);
        } else {
          setPresentations([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab, selectedYear]);

  // 表示するアイテムの制限
  const getDisplayedItems = <T extends Paper | Presentation>(
    items: T[]
  ): T[] => {
    return showAll ? items : items.slice(0, maxItems);
  };

  // タブが変更されたときにshowAllをリセット
  const handleTabChange = (tab: "papers" | "presentations") => {
    setActiveTab(tab);
    setShowAll(false);
  };

  // 年の選択
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setShowAll(false);
  };

  return (
    <section id="publications" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">
          {t("publications.title")}
        </h2>

        {/* タブ切り替え */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => handleTabChange("papers")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === "papers"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {t("publications.papers")}
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("presentations")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === "presentations"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border border-gray-300 border-l-0 hover:bg-gray-50"
              }`}
            >
              {t("publications.presentations")}
            </button>
          </div>
        </div>

        {/* 年フィルター */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => handleYearChange("")}
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              selectedYear === ""
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {t("publications.allYears")}
          </button>

          {years.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => handleYearChange(year)}
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                selectedYear === year
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* コンテンツ表示 */}
        {isLoading ? (
          <div className="text-center py-8">
            <svg
              className="animate-spin h-8 w-8 text-primary mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === "papers" ? (
              papers.length > 0 ? (
                <>
                  {getDisplayedItems(papers).map((paper) => (
                    <div
                      key={paper.id}
                      className="p-4 bg-white border rounded-lg shadow-sm hover:shadow transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-2">
                        <div className="md:flex-1">
                          <div className="flex items-start gap-2 mb-2">
                            {paper.isMainWork && (
                              <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                                {t("publications.mainWork")}
                              </span>
                            )}
                            <h3 className="text-lg font-semibold text-primary">
                              {paper.title}
                            </h3>
                          </div>
                          <p className="text-gray-700 mb-1">{paper.authors}</p>
                          <p className="text-gray-600 italic mb-2">
                            {paper.venue}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {paper.year}
                            {paper.month ? `-${paper.month}` : ""}
                          </p>
                          {paper.doi && (
                            <a
                              href={`https://doi.org/${paper.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 text-secondary hover:text-accent text-sm"
                            >
                              DOI: {paper.doi}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {papers.length > maxItems && !showAll && (
                    <div className="text-center mt-6">
                      <button
                        onClick={() => setShowAll(true)}
                        className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors"
                      >
                        {t("publications.showAll")}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  {t("publications.noPapers")}
                </p>
              )
            ) : presentations.length > 0 ? (
              <>
                {getDisplayedItems(presentations).map((presentation) => (
                  <div
                    key={presentation.id}
                    className="p-4 bg-white border rounded-lg shadow-sm hover:shadow transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-2">
                      <div className="md:flex-1">
                        <div className="flex items-start gap-2 mb-2">
                          {presentation.isInvited && (
                            <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                              {t("publications.invited")}
                            </span>
                          )}
                          <h3 className="text-lg font-semibold text-primary">
                            {presentation.title}
                          </h3>
                        </div>
                        <p className="text-gray-700 mb-1">
                          {presentation.speakers}
                        </p>
                        <p className="text-gray-600 mb-1">
                          {presentation.conference}
                          {presentation.place && `, ${presentation.place}`}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {presentation.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {presentations.length > maxItems && !showAll && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setShowAll(true)}
                      className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors"
                    >
                      {t("publications.showAll")}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-center text-gray-500 py-4">
                {t("publications.noPresentations")}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Publications;
