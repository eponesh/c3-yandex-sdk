"use strict";
{
    const PLUGIN_ID = "Eponesh_YandexSDK";
    const PLUGIN_VERSION = "1.0.1";
    const PLUGIN_CATEGORY = "platform-specific";

    const PLUGIN_CLASS = SDK.Plugins.Eponesh_YandexSDK = class YandexSDKPlugin extends SDK.IPluginBase {
        constructor() {
            super(PLUGIN_ID);

            SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());

            this._info.SetName(lang(".name"));
            this._info.SetDescription(lang(".description"));
            this._info.SetVersion(PLUGIN_VERSION);
            this._info.SetCategory(PLUGIN_CATEGORY);
            this._info.SetAuthor("Eponesh");
            this._info.SetHelpUrl(lang(".help-url"));
            this._info.SetIsSingleGlobal(true);

            this._info.SetSupportedRuntimes(["c3"]);

            SDK.Lang.PushContext(".properties");

            this._info.SetProperties([
                new SDK.PluginProperty("check", "fs-enabled", true),
                new SDK.PluginProperty("combo", "fs-orientation", {
                    "items": ["any", "portrait", "landscape"],
                    "initialValue": "any"
                }),
                new SDK.PluginProperty("check", "fs-lock-orientation", true),
                new SDK.PluginProperty("integer", "metrica-id", 0)
            ]);

            SDK.Lang.PopContext(); //.properties
            SDK.Lang.PopContext();
        }
    };

    PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}
