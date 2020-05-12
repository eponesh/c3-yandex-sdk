"use strict";
{
    const PLUGIN_CLASS = SDK.Plugins.Eponesh_YandexSDK;

    PLUGIN_CLASS.Type = class YandexSDKType extends SDK.ITypeBase {
        constructor(sdkPlugin, iObjectType) {
            super(sdkPlugin, iObjectType);
        }
    };
}
