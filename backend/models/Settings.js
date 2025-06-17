const mongoose = require("mongoose");

const SettingsSchema = mongoose.Schema(
    {
        settingKey: {
            type: String,
            required: true,
            unique: true
        },
        settingValue: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        description: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

const Settings = mongoose.model("Settings", SettingsSchema);
module.exports = Settings;
