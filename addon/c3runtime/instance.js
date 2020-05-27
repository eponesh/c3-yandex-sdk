"use strict";
{
    var SDKInstanceBase = globalThis.C3 ? globalThis.C3.SDKInstanceBase : class {}
    var Instance = class YandexSDKInstance extends SDKInstanceBase {
        constructor(inst, properties = []) {
            super(inst);
            if (!globalThis.C3) {
                return;
            }
            this.conditions = C3.Plugins.Eponesh_YandexSDK.Cnds;
            this.init(properties);
        }

        init (properties) {
            this.ready = new Promise(resolve => this.init = resolve);
            this.rtbReady = new Promise(resolve => this.initRTB = resolve);

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

            if (this.metricaId) {
                this.loadMetrica();
                this.metricaReady = new Promise((resolve) => {
                    if (window[`yaCounter${this.metricaId}`]) {
                        resolve();
                        return;
                    }
    
                    document.addEventListener(`yacounter${this.metricaId}inited`, resolve);
                });
            }

            if (this.enableRTB) {
                this.loadRTB();
            }

            this.loadSDK();
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

        onAdvClosed(wasShown) {
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
                const player = await this.ysdk.getPlayer();
                this.setPlayer(player);
            } catch (err) {
                try {
                    await this.ysdk.auth.openAuthDialog();
                    const player = await this.ysdk.getPlayer();
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

        loadSDK() {
            const initSDK = async () => {
                const screen = { fullscreen: this.enableFullscreenOnStart };

                if (this.fullscreenOrientation !== null) {
                    screen.orientation = {
                        value: this.fullscreenOrientation,
                        lock: this.isOrientationLocked
                    };
                }

                this.ysdk = await YaGames.init({
                    screen,
                    adv: {
                        onAdvClose: (wasShown) => this.onAdvClosed(wasShown)
                    },
                });

                this.ysdk.getPayments({ signed: true })
                    .then(p => this.payments = p)
                    .catch(console.error);

                this.init();
            }

            (function(d) {
                var t = d.getElementsByTagName('script')[0];
                var s = d.createElement('script');
                s.src = 'https://yandex.ru/games/sdk/v2';
                s.async = true;
                t.parentNode.insertBefore(s, t);
                s.onload = initSDK;
            })(document);
        }

        loadMetrica() {
            (function(m, e, t, r, i, k, a) {
                m[i] = m[i] || function() {
                    (m[i].a = m[i].a || []).push(arguments)
                };
                m[i].l = 1 * new Date();
                k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
            })
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(this.metricaId, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                triggerEvent: true
            });
        }

        loadRTB () {
            ((w, d, n, s, t) => {
                w[n] = w[n] || [];
                t = d.getElementsByTagName("script")[0];
                s = d.createElement("script");
                s.onload = () => this.initRTB();
                s.type = "text/javascript";
                s.src = "//an.yandex.ru/system/context.js";
                s.async = true;
                t.parentNode.insertBefore(s, t);
            })(window, document, "yandexContextAsyncCallbacks");
        }
    };

    if (globalThis.C3) {
        C3.Plugins.Eponesh_YandexSDK.Instance = Instance;
    }

    try { module.exports = Instance } catch (e) {}

    Instance;
}
