"use strict";
{
    const PLUGIN_CLASS = SDK.Plugins.Eponesh_YandexSDK;

    PLUGIN_CLASS.Instance = class YandexSDKInstance extends SDK.IInstanceBase {
        constructor(sdkType, inst) {
            super(sdkType, inst);
        }

        Release() {}

        OnCreate() {}

        OnPropertyChanged(id, value) {}

        LoadC2Property(name, valueString) {
            return false; // not handled
        }
    };
}
