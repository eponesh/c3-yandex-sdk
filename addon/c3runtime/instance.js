"use strict";
{
    C3.Plugins.Eponesh_YandexSDK.Instance = class YandexSDKInstance extends C3.SDKInstanceBase {
        constructor(inst, properties = []) {
            super(inst);
            this.conditions = C3.Plugins.Eponesh_YandexSDK.Cnds;

            this.ready = new Promise(resolve => this.init = resolve);

            this.enableFullscreenOnStart = properties[0];
            this.setOrientation(properties[1]);
            this.isOrientationLocked = properties[2];

            this.metricaId = properties[3];

            this.purchases = [];
            this.products = [];

            this.products = [{
				productID: 'Demo1',
				title: 'Demo 1',
				description: 'Demo 1 Product',
				imageURI: '//none.jpg',
				price: '99Р',
			}, {
				productID: 'Demo2',
				title: 'Demo 2',
				description: 'Demo 2 Product',
				imageURI: '//none.jpg',
				price: '199Р',
			}];
			this.purchases = [{
				productID: 'Demo2',
				purchaseToken: 'ff4h3h34hdhc4i',
				signature: '89823nbynx3nbw37tbwn387bxe7y634bx34b7n9x'
			}];

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
    };
}