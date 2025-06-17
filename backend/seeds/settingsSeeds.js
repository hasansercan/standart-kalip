const Settings = require("../models/Settings.js");

const defaultSettings = [
    {
        settingKey: "homepage_sliders_enabled",
        settingValue: true,
        description: "Anasayfa slider bölümünü göster/gizle"
    },
    {
        settingKey: "homepage_categories_enabled",
        settingValue: true,
        description: "Anasayfa kategoriler bölümünü göster/gizle"
    },
    {
        settingKey: "homepage_about_enabled",
        settingValue: true,
        description: "Anasayfa hakkımızda bölümünü göster/gizle"
    },
    {
        settingKey: "homepage_blogs_enabled",
        settingValue: true,
        description: "Anasayfa blog bölümünü göster/gizle"
    },
    {
        settingKey: "homepage_program_download_enabled",
        settingValue: true,
        description: "Anasayfa program indirme bölümünü göster/gizle"
    },
    {
        settingKey: "homepage_references_enabled",
        settingValue: true,
        description: "Anasayfa referanslar bölümünü göster/gizle"
    }
];

const seedSettings = async () => {
    try {
        const existingSettings = await Settings.find();

        if (existingSettings.length === 0) {
            await Settings.insertMany(defaultSettings);
            } else {
            // Eksik ayarları ekle
            for (const setting of defaultSettings) {
                const existingSetting = await Settings.findOne({ settingKey: setting.settingKey });
                if (!existingSetting) {
                    await Settings.create(setting);
                    }
            }
        }
    } catch (error) {
        }
};

module.exports = seedSettings;
