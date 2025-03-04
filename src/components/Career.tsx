import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CareerItem } from "../types";
import {
  HiOutlineAcademicCap,
  HiOutlineComputerDesktop,
} from "react-icons/hi2";
import { CgWorkAlt } from "react-icons/cg";

const Career: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [careerItems, setCareerItems] = useState<CareerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCareerData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `./content/career/career_${i18n.language}.json`
        );
        const data = await response.json();

        const sortedData = [...data].sort((a, b) => {
          const dateA = a.endDate || "9999";
          const dateB = b.endDate || "9999";

          if (dateA === dateB) {
            return b.startDate.localeCompare(a.startDate);
          }
          return dateB.localeCompare(dateA);
        });

        setCareerItems(sortedData);
      } catch (error) {
        console.error("Failed to fetch career data:", error);
        setCareerItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareerData();
  }, [i18n.language]);

  return (
    <section id="career" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">
          {t("career.title")}
        </h2>

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
          <div className="relative max-w-3xl mx-auto">
            <div className="border-l-2 border-gray-200">
              {careerItems.map((item) => (
                <div key={item.id} className="relative pl-8 pb-8">
                  <div className="absolute left-0 -ml-2 mt-2">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        item.type === "education"
                          ? "bg-secondary"
                          : item.type === "work"
                          ? "bg-accent"
                          : "bg-primary"
                      }`}
                    ></div>
                  </div>

                  <div className="text-sm text-gray-500 mb-1">
                    {item.startDate} - {item.endDate || t("career.present")}
                  </div>

                  <h3 className="text-lg font-semibold text-primary">
                    {item.position}
                  </h3>

                  <div className="flex items-center gap-1 text-gray-700 mt-1">
                    <span>{item.organization}</span>
                    {item.type === "education" ? (
                      <HiOutlineAcademicCap className="h-4 w-4 text-secondary" />
                    ) : item.type === "work" ? (
                      <CgWorkAlt className="h-4 w-4 text-accent" />
                    ) : (
                      <HiOutlineComputerDesktop className="h-4 w-4 text-primary" />
                    )}
                  </div>

                  <div className="text-gray-600 mt-1">{item.location}</div>

                  {item.description && item.description.trim() !== "" && (
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  )}
                </div>
              ))}
            </div>

            {careerItems.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                {t("career.noData")}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Career;
