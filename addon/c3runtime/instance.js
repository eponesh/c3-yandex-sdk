"use strict";
{
    var SDKDOMInstanceBase = globalThis.C3 ? globalThis.C3.SDKDOMInstanceBase : class {}
    var Instance = class YandexSDKInstance extends SDKDOMInstanceBase {
        constructor(inst, properties = []) {
            super(inst, 'Eponesh_YandexSDK');
            if (!globalThis.C3) {
                return;
            }
            this.conditions = C3.Plugins.Eponesh_YandexSDK.Cnds;
            this.init(properties);
        }

        async init (properties) {
            this.enableFullscreenOnStart = properties[0];
            this.setOrientation(properties[1]);
            this.isOrientationLocked = properties[2];

            this.metricaId = properties[3];
            this.enableRTB = properties[4];

            this.banners = {};
            this.isRewardedVideoPlaying = false;

            this.purchases = [];
            this.products = [];

            this.playerData = {};
            this.playerStats = {};

            this.currentProductID = '';
            this.currentProductTitle = '';
            this.currentProductImage = '';
            this.currentProductDescription = '';
            this.currentProductPrice = 0;

            this.currentPurchaseID = '';
            this.currentPurchaseToken = '';
            this.currentPurchaseSign = '';

            this.lastPurchaseID = '';
            this.lastPurchaseToken = '';

            this.lastStateKey = '';
            this.lastDataKey = '';

            this.player = {
                name: '',
                id: '',
                photoSmall: '',
                photoMedium: '',
                photoLarge: ''
            };

            if (this.metricaId) {
                this.metricaReady = this.PostToDOMElementAsync('INIT_METRICA', { metricaId: this.metricaId });
            }

            if (this.enableRTB) {
                this.rtbReady = this.PostToDOMElementAsync('INIT_RTB');
            }

            const screen = { fullscreen: this.enableFullscreenOnStart };
            if (this.fullscreenOrientation !== null) {
                screen.orientation = {
                    value: this.fullscreenOrientation,
                    lock: this.isOrientationLocked
                };
            }

            this.ready = this.PostToDOMElementAsync('INIT_SDK', { screen });
            await this.ready;
            this.paymentsReady = this._getPayments({ signed: true });
        }

        Release() {
            super.Release();
        }

        SaveToJson() {
            return {
                // data to be saved for savegames
            };
        }

        LoadFromJson(o) {
            // load state for savegames
        }

        GetDebuggerProperties() {
            return [ {
                title: "YandexSDK",
                properties: []
            }];
        }

        setOrientation(orientation) {
            switch (orientation) {
                case 1: {
                    this.fullscreenOrientation = 'portrait';
                    break;
                }
                case 2: {
                    this.fullscreenOrientation = 'landscape';
                    break;
                }
                default: {
                    this.fullscreenOrientation = null;
                }
            }
        }

        onAdvClosed({ wasShown }) {
            console.log('Adv was closed, shown:', wasShown);
            this.Trigger(this.conditions.OnAdvClosed);

            if (this.isFirstAdvClosed) {
                return;
            }

            this.isFirstAdvClosed = true;
            this.Trigger(this.conditions.OnFirstAdvClosed);
        }

        async getPlayer() {
            try {
                const player = await this._getPlayer();
                this.setPlayer(player);
            } catch (err) {
                try {
                    await this._openAuthDialog();
                    const player = await this._getPlayer();
                    this.setPlayer(player);
                } catch (err) {
                    this.Trigger(this.conditions.OnSignInFailed);
                }
            }
        }

        async setPlayer(player) {
            this.player = player;
            this.playerStats = {};
            this.playerData = {};
            this.Trigger(this.conditions.OnSignInSuccess);
        }

        getPurchase(id) {
            return this.purchases.find(p => p.productID === id) || {};
        }

        getProduct(id) {
            return this.products.find(p => p.productID === id) || {};
        }

        onRewardedOpen () {
            this.isRewardedVideoPlaying = true;
            this.Trigger(this.conditions.OnRewardedVideoOpen);
        }

        onRewardedReward () {
            this.Trigger(this.conditions.OnRewardedVideoReward);
        }

        onRewardedClose () {
            this.isRewardedVideoPlaying = false;
            this.Trigger(this.conditions.OnRewardedVideoClose);
        }

        onRewardedError () {
            this.Trigger(this.conditions.OnRewardedVideoError);
        }

        onRTBRender ({ id }) {
            this.banners[id].displayed = true;
            this.lastBannerID = id;
            this.Trigger(this.conditions.OnBannerDisplayed);
        }

        _getPayments (options) {
            return this.PostToDOMElementAsync('YSDK_PAYMENTS_GET', options);
        }

        _getPurchases () {
            return this.PostToDOMElementAsync('YSDK_PAYMENTS_GET_PURCHASES');
        }

        _getCatalog () {
            return this.PostToDOMElementAsync('YSDK_PAYMENTS_GET_CATALOG');
        }

        _purchase (options) {
            return this.PostToDOMElementAsync('YSDK_PAYMENTS_PURCHASE', options);
        }

        _consumePurchase (options) {
            return this.PostToDOMElementAsync('YSDK_PAYMENTS_CONSUME_PURCHASE', options);
        }

        _openAuthDialog () {
            return this.PostToDOMElementAsync('YSDK_AUTH_OPEN');
        }

        _getPlayer () {
            return this.PostToDOMElementAsync('YSDK_PLAYER_GET');
        }

        _showFullscreenAdv () {
            return this.PostToDOMElementAsync('YSDK_ADS_SHOW_FULLSCREEN');
        }

        _showRewardedVideo () {
            return this.PostToDOMElementAsync('YSDK_ADS_SHOW_REWARDED');
        }

        _getPlayerFullStats () {
            return this.PostToDOMElementAsync('YSDK_PLAYER_GET_FULL_STATS');
        }

        _getPlayerStats (payload) {
            return this.PostToDOMElementAsync('YSDK_PLAYER_GET_STATS', payload);
        }

        _setPlayerStats (payload) {
            return this.PostToDOMElementAsync('YSDK_PLAYER_SET_STATS', payload);
        }

        _incrementPlayerStats (payload) {
            return this.PostToDOMElementAsync('YSDK_PLAYER_INCREMENT_STATS', payload);
        }

        _getPlayerFullData () {
            return this.PostToDOMElementAsync('YSDK_PLAYER_GET_FULL_DATA');
        }

        _getPlayerData (payload) {
            return this.PostToDOMElementAsync('YSDK_PLAYER_GET_DATA', payload);
        }

        _setPlayerData (payload) {
            return this.PostToDOMElementAsync('YSDK_PLAYER_SET_DATA', payload);
        }

        _reachGoal (payload) {
            return this.PostToDOMElement('YSDK_METRICA_REACH_GOAL', payload);
        }

        _rtbCreateBanner (payload) {
            return this.PostToDOMElement('YSDK_RTB_CREATE_BANNER', payload);
        }

        _rtbCreateStickyBanner (payload) {
            return this.PostToDOMElement('YSDK_RTB_CREATE_STICKY_BANNER', payload);
        }

        _rtbDestroyBanner (payload) {
            return this.PostToDOMElement('YSDK_RTB_DESTROY_BANNER', payload);
        }

        _rtbRefreshBanner (payload) {
            return this.PostToDOMElement('YSDK_RTB_REFRESH_BANNER', payload);
        }

        /**
         * @override
         * Plugin must be registered as world instance
         * and required to be rendered on layout, but :) just ignore it
         */
        Tick () {
            return false;
        }
    };

    if (globalThis.C3) {
        C3.Plugins.Eponesh_YandexSDK.Instance = Instance;
    }

    Instance;
}
