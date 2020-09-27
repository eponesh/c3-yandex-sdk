"use strict";
{
    C3.Plugins.Eponesh_YandexSDK = class YandexSDKPlugin extends C3.SDKDOMPluginBase {
        constructor(opts) {
            super(opts, 'Eponesh_YandexSDK');

            this.addHandler('YSDK_ADS_REWARDED_OPEN', (inst, e) => inst.onRewardedOpen(e));
            this.addHandler('YSDK_ADS_REWARDED_REWARD', (inst, e) => inst.onRewardedReward(e));
            this.addHandler('YSDK_ADS_REWARDED_CLOSE', (inst, e) => inst.onRewardedClose(e));
            this.addHandler('YSDK_ADS_REWARDED_ERROR', (inst, e) => inst.onRewardedError(e));

            this.addHandler('SDK_ADS_CLOSED', (inst, e) => inst.onAdvClosed(e));
            this.addHandler('SDK_RTB_RENDER', (inst, e) => inst.onRTBRender(e));
        }

        addHandler(handler, cb) {
            this.AddElementMessageHandler(handler, (_, e) => cb(this.GetSingleGlobalInstance().GetSdkInstance(), e));
        }

        Release() {
            super.Release();
        }
    };
}
