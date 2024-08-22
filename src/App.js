import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import "./index.css";

const zodiacSigns = [
  { name: "aries", period: { start: "March 21", end: "April 19" }, icon: "♈" },
  { name: "taurus", period: { start: "April 20", end: "May 20" }, icon: "♉" },
  { name: "gemini", period: { start: "May 21", end: "June 20" }, icon: "♊" },
  { name: "cancer", period: { start: "June 21", end: "July 22" }, icon: "♋" },
  { name: "leo", period: { start: "July 23", end: "August 22" }, icon: "♌" },
  {
    name: "virgo",
    period: { start: "August 23", end: "September 22" },
    icon: "♍",
  },
  {
    name: "libra",
    period: { start: "September 23", end: "October 22" },
    icon: "♎",
  },
  {
    name: "scorpio",
    period: { start: "October 23", end: "November 21" },
    icon: "♏",
  },
  {
    name: "sagittarius",
    period: { start: "November 22", end: "December 21" },
    icon: "♐",
  },
  {
    name: "capricorn",
    period: { start: "December 22", end: "January 19" },
    icon: "♑",
  },
  {
    name: "aquarius",
    period: { start: "January 20", end: "February 18" },
    icon: "♒",
  },
  {
    name: "pisces",
    period: { start: "February 19", end: "March 20" },
    icon: "♓",
  },
];

function App() {
  const { t: translate, i18n } = useTranslation();
  const [selectedSign, setSelectedSign] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const userLanguage =
      window.Telegram.WebApp.initDataUnsafe?.user?.language_code;
    const initialLanguage = userLanguage === "ru" ? "ru" : "en";
    i18n.changeLanguage(initialLanguage);
  }, [i18n]);

  const fetchHoroscope = useCallback(
    async (sign) => {
      try {
        const response = await fetch("https://poker247tech.ru/get_horoscope/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sign: sign,
            language: i18n.language === "ru" ? "original" : "translated",
            period: "today",
          }),
        });
        const data = await response.json();
        setDescription(
          data.horoscope || translate("Description not available.")
        );
      } catch (error) {
        console.error("Error fetching horoscope:", error);
        setDescription(translate("Description not available."));
      }
    },
    [i18n.language, translate]
  );

  const goBack = () => {
    setSelectedSign(null);
    setDescription("");
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    if (selectedSign) {
      fetchHoroscope(selectedSign);
    }
  };

  useEffect(() => {
    if (selectedSign) {
      fetchHoroscope(selectedSign);
    }
  }, [fetchHoroscope, selectedSign]);

  const formatPeriod = (period) => {
    const [startMonth, startDay] = period.start.split(" ");
    const [endMonth, endDay] = period.end.split(" ");

    return `${translate(startMonth)} ${startDay} - ${translate(
      endMonth
    )} ${endDay}`;
  };

  if (selectedSign) {
    return (
      <div className="description-container">
        <h1 className="description-header">{translate(selectedSign)}</h1>
        <p className="description-text">{description}</p>
        <button onClick={goBack}>{translate("Back")}</button>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="language-switcher">
        <button onClick={() => handleLanguageChange("en")}>
          {translate("English")}
        </button>
        <button onClick={() => handleLanguageChange("ru")}>
          {translate("Russian")}
        </button>
      </div>
      <h1>{translate("Zodiac Horoscope")}</h1>
      <div className="zodiac-grid">
        {zodiacSigns.map((sign) => (
          <div
            key={sign.name}
            className="zodiac-item"
            onClick={() => setSelectedSign(sign.name)}
          >
            <div className="zodiac-icon">{sign.icon}</div>
            <div className="zodiac-name">{translate(sign.name)}</div>
            <div className="zodiac-period">{formatPeriod(sign.period)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
