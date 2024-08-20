import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedSign, setSelectedSign] = useState(null);
  const [horoscope, setHoroscope] = useState("");
  const [language, setLanguage] = useState("en");

  // Список знаков зодиака с названиями, периодами и иконками
  const zodiacSigns = [
    {
      id: "aries",
      name: { en: "Aries", ru: "Овен" },
      period: "21 Mar - 19 Apr",
      icon: "♈",
    },
    {
      id: "taurus",
      name: { en: "Taurus", ru: "Телец" },
      period: "20 Apr - 20 May",
      icon: "♉",
    },
    {
      id: "gemini",
      name: { en: "Gemini", ru: "Близнецы" },
      period: "21 May - 20 Jun",
      icon: "♊",
    },
    {
      id: "cancer",
      name: { en: "Cancer", ru: "Рак" },
      period: "21 Jun - 22 Jul",
      icon: "♋",
    },
    {
      id: "leo",
      name: { en: "Leo", ru: "Лев" },
      period: "23 Jul - 22 Aug",
      icon: "♌",
    },
    {
      id: "virgo",
      name: { en: "Virgo", ru: "Дева" },
      period: "23 Aug - 22 Sep",
      icon: "♍",
    },
    {
      id: "libra",
      name: { en: "Libra", ru: "Весы" },
      period: "23 Sep - 22 Oct",
      icon: "♎",
    },
    {
      id: "scorpio",
      name: { en: "Scorpio", ru: "Скорпион" },
      period: "23 Oct - 21 Nov",
      icon: "♏",
    },
    {
      id: "sagittarius",
      name: { en: "Sagittarius", ru: "Стрелец" },
      period: "22 Nov - 21 Dec",
      icon: "♐",
    },
    {
      id: "capricorn",
      name: { en: "Capricorn", ru: "Козерог" },
      period: "22 Dec - 19 Jan",
      icon: "♑",
    },
    {
      id: "aquarius",
      name: { en: "Aquarius", ru: "Водолей" },
      period: "20 Jan - 18 Feb",
      icon: "♒",
    },
    {
      id: "pisces",
      name: { en: "Pisces", ru: "Рыбы" },
      period: "19 Feb - 20 Mar",
      icon: "♓",
    },
  ];

  useEffect(() => {
    // Автоматическое определение языка Telegram
    const userLanguage =
      window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
    setLanguage(userLanguage === "ru" ? "ru" : "en");
  }, []);

  const fetchHoroscope = async (signId) => {
    try {
      const response = await axios.post(
        "https://poker247tech.ru/get_horoscope/",
        {
          sign: signId,
          language: language === "ru" ? "original" : "translated",
          period: "today",
        }
      );
      setHoroscope(response.data.description);
      setSelectedSign(signId);
    } catch (error) {
      console.error("Error fetching horoscope:", error);
    }
  };

  const goBack = () => {
    setSelectedSign(null);
    setHoroscope("");
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="language-switcher">
          <button onClick={() => changeLanguage("ru")}>Русский</button>
          <button onClick={() => changeLanguage("en")}>English</button>
        </div>
        {selectedSign ? (
          <div className="horoscope-details">
            <button onClick={goBack}>Back</button>
            <p>{horoscope}</p>
          </div>
        ) : (
          <div className="zodiac-container">
            {zodiacSigns.map((sign) => (
              <div
                className="zodiac-block"
                key={sign.id}
                onClick={() => fetchHoroscope(sign.id)}
              >
                <h3>
                  {sign.icon} {sign.name[language]}
                </h3>
                <p>{sign.period}</p>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
