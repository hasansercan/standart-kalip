import React, { useEffect, useState } from "react";
import About from "../components/About/About";
import Blogs from "../components/Blogs/Blogs";
import Categories from "../components/Categories/Categories";
import ProgramDownload from "../components/ProgramDownload/ProgramDownload";
import References from "../components/References/References";
import Sliders from "../components/Slider/Sliders";

const HomePage = () => {
  const [settings, setSettings] = useState({
    homepage_sliders_enabled: true,
    homepage_categories_enabled: true,
    homepage_about_enabled: true,
    homepage_blogs_enabled: true,
    homepage_program_download_enabled: true,
    homepage_references_enabled: true,
  });
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/settings`);

        if (response.ok) {
          const data = await response.json();
          const settingsObj = {};

          // API'den gelen ayarları state'e çevir
          data.forEach(setting => {
            settingsObj[setting.settingKey] = setting.settingValue;
          });

          // Varsayılan değerlerle birleştir
          setSettings(prevSettings => ({
            ...prevSettings,
            ...settingsObj
          }));
        }
      } catch (error) {
        console.error("Settings fetch error:", error);
        // Hata durumunda varsayılan ayarları kullan
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [apiUrl]);

  // Ayarlar yüklenene kadar loading göster
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <div>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <React.Fragment>
      {settings.homepage_sliders_enabled && <Sliders />}
      {settings.homepage_categories_enabled && <Categories />}
      {settings.homepage_about_enabled && <About />}
      {settings.homepage_blogs_enabled && <Blogs />}
      {settings.homepage_program_download_enabled && <ProgramDownload />}
      {settings.homepage_references_enabled && <References />}
    </React.Fragment>
  );
};

export default HomePage;
