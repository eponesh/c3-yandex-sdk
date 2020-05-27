"use strict";
{
    const DEFAULT_BANNER_STYLES = `
        display: flex;
        justify-content: center;
        align-tems: center;
        position: absolute;
        z-index: 10;
    `;

    var Acts = {
        async ShowFullscreen() {
            await this.ready;
            this.ysdk.adv.showFullscreenAdv({ callbacks: {} });
        },

        async CreateBanner(id, x = 0, y = 0, width = 0, height = 0, styles) {
            if (this.banners[id]) {
                return;
            }
            await this.rtbReady;
            const div = document.createElement('div');
            this.banners[id] = {
                $el: div,
                displayed: false
            };

            div.id = `yandex_rtb_${id}`;
            div.style.cssText = `
                ${DEFAULT_BANNER_STYLES}
                top: ${x}px;
                left: ${y}px;
                width: ${width === 0 ? 'auto' : `${width}px`};
                height: ${height === 0 ? 'auto' : `${height}px`};
                ${styles}
            `;

            document.body.appendChild(div);

            Ya.Context.AdvManager.render({
                blockId: id,
                renderTo: div.id,
                async: true,
                onRender: () => {
                    this.banners[id].displayed = true;
                    this.lastBannerID = id;
                    this.Trigger(this.conditions.OnBannerDisplayed);
                }
            });
        },

        async CreateStickyBanner(id, position = 0, width = 0, height = 0, styles) {
            if (this.banners[id]) {
                return;
            }
            await this.rtbReady;
            const div = document.createElement('div');
            this.banners[id] = {
                $el: div,
                displayed: false
            };
            div.id = `yandex_rtb_${id}`;
            const positionStyles = (() => {
                switch (position) {
                    case 0: {
                        return 'top: 0; left: 0;';
                    }
                    case 1: {
                        return 'top: 0; left: 50%; transform: translateX(-50%);';
                    }
                    case 2: {
                        return 'top: 0; right: 0;';
                    }
                    case 3: {
                        return 'top: 0; left: 0; bottom: 0;';
                    }
                    case 4: {
                        return 'top: 50%; left: 50%; transform: translate(-50%, -50%);';
                    }
                    case 5: {
                        return 'top: 0; right: 0; bottom: 0;';
                    }
                    case 6: {
                        return 'bottom: 0; left: 0;';
                    }
                    case 7: {
                        return 'bottom: 0; left: 50%; transform: translateX(-50%);';
                    }
                    case 8: {
                        return 'bottom: 0; right: 0;';
                    }
                    default: {
                        return '';
                    }
                }
            })();

            div.style.cssText = `
                ${DEFAULT_BANNER_STYLES}
                ${positionStyles}
                width: ${width === 0 ? '100%' : `${width}px`};
                height: ${height === 0 ? '100%' : `${height}px`};
                ${styles}
            `;

            document.body.appendChild(div);

            Ya.Context.AdvManager.render({
                blockId: id,
                renderTo: div.id,
                async: true,
                onRender: () => {
                    this.banners[id].displayed = true;
                    this.lastBannerID = id;
                    this.Trigger(this.conditions.OnBannerDisplayed);
                }
            });
        },

        async DisplayBanner(id) {
            const banner = this.banners[id];
            if (!banner) {
                return;
            }

            await this.rtbReady;
            Ya.Context.AdvManager.render({
                blockId: id,
                renderTo: banner.$el.id,
                async: true,
                onRender: () => {
                    this.lastBannerID = id;
                    banner.displayed = true;
                    this.Trigger(this.conditions.OnBannerDisplayed);
                }
            });
        },

        async RefreshBanner(id) {
            const banner = this.banners[id];
            if (!banner) {
                return;
            }

            await this.rtbReady;
            Ya.Context.AdvManager.destroy(id);
            Ya.Context.AdvManager.render({
                blockId: id,
                renderTo: banner.$el.id,
                async: true,
                onRender: () => {
                    this.lastBannerID = id;
                    banner.displayed = true;
                    this.Trigger(this.conditions.OnBannerDisplayed);
                }
            });
        },

        async DestroyBanner(id) {
            const banner = this.banners[id];
            if (!banner) {
                return;
            }

            await this.rtbReady;
            Ya.Context.AdvManager.destroy(id);
            this.lastBannerID = id;
            banner.displayed = false;
            this.Trigger(this.conditions.OnBannerDestroyed);
        },

        async ReachGoal(target) {
            await this.metricaReady;
            console.log('Reach Goal: ', target);
            ym(this.metricaId, 'reachGoal', target);
        },

        async SignIn() {
            await this.getPlayer();
        },

        async LoadCatalog() {
            try {
                this.products = await this.payments.getCatalog();
                this.Trigger(this.conditions.OnCatalogLoadSuccess);
            } catch (err) {
                this.Trigger(this.conditions.OnCatalogLoadFailed);
            }
        },

        async LoadPurchases(isAutoSignIn) {
            if (isAutoSignIn) {
                try {
                    await this.getPlayer();
                } catch (err) {
                    this.Trigger(this.conditions.OnPurchasesLoadFailed);
                }
            }

            try {
                this.purchases = await this.payments.getPurchases();
                this.Trigger(this.conditions.OnPurchasesLoadSuccess);
            } catch (err) {
                this.Trigger(this.conditions.OnPurchasesLoadFailed);
            }
        },

        async Buy(purchaseId) {
            try {
                const purchase = await this.payments.purchase(purchaseId);
                this.purchases.push(purchase);
                this.lastPurchaseID = purchaseId;
                this.lastPurchaseToken = purchase.purchaseToken;
                this.Trigger(this.conditions.OnAnyBuySuccess);
                this.Trigger(this.conditions.OnBuySuccess);
            } catch (err) {
                this.lastPurchaseID = purchaseId;
                this.Trigger(this.conditions.OnAnyBuyFailed);
                this.Trigger(this.conditions.OnBuyFailed);
            }
        },

        async ShowRewardedVideo() {
            await this.ready;
            try {
                const callbacks = {
                    onOpen: () => {
                        this.isRewardedVideoPlaying = true;
                        this.Trigger(this.conditions.OnRewardedVideoOpen)
                    },
                    onRewarded: () => this.Trigger(this.conditions.OnRewardedVideoReward),
                    onClose: () => {
                        this.isRewardedVideoPlaying = false;
                        this.Trigger(this.conditions.OnRewardedVideoClose)
                    },
                    onError: () => this.Trigger(this.conditions.OnRewardedVideoError)
                };
                this.ysdk.adv.showRewardedVideo({ callbacks });
            } catch (error) {
                this.Trigger(this.conditions.OnRewardedVideoError);
            }
        },

        async ConsumePurchase(id) {
            const purchase = this.purchases.find(p => p.productID === id);
            try {
                await this.payments.consumePurchase(purchase.purchaseToken);
                this.purchases = this.purchases.filter(p => p.productID !== id);
                this.lastPurchaseID = id;
                this.lastPurchaseToken = purchase ? purchase.token : '';
                this.Trigger(this.conditions.OnAnyConsumeSuccess);
                this.Trigger(this.conditions.OnConsumeSuccess);
            } catch (err) {
                this.lastPurchaseID = id;
                this.lastPurchaseToken = purchase ? purchase.token : '';
                this.Trigger(this.conditions.OnAnyConsumeFailed);
                this.Trigger(this.conditions.OnConsumeFailed);
            }
        },

        async IncrementState(key, value) {
            if (this.playerStats[key]) {
                this.playerStats[key] += value;
            } else {
                this.playerStats[key] = value;
            }

            try {
                await this.player.incrementStats( {[key]: value });
                const stats = await this.player.getStats([key]);
                this.playerStats[key] = stats[key] || 0;
            } catch (error) {
                this.lastStateKey = key;
                this.Trigger(this.conditions.OnIncrementPlayerStateFailed);
            }
        },

        async SetState(key, value) {
            this.playerStats[key] = value;
            try {
                await this.player.setStats( {[key]: value });
                const stats = await this.player.getStats([key]);
                this.playerStats[key] = stats[key] || 0;
            } catch (error) {
                this.lastStateKey = key;
                this.Trigger(this.conditions.OnSetPlayerStateFailed);
            }
        },

        async SetData(key, value) {
            this.playerData[key] = value;
            try {
                await this.player.setData( {[key]: value });
            } catch (error) {
                this.lastDataKey = key;
                this.Trigger(this.conditions.OnSetPlayerDataFailed);
            }
        },

        async LoadStats() {
            try {
                this.playerStats = (await this.player.getStats()) || {};
                this.Trigger(this.conditions.OnLoadPlayerStatsSuccess);
            } catch (err) {
                this.Trigger(this.conditions.OnLoadPlayerStatsFailed);
            }
        },

        async LoadData() {
            try {
                this.playerData = (await this.player.getData()) || {};
                this.Trigger(this.conditions.OnLoadPlayerDataSuccess);
            } catch (err) {
                this.Trigger(this.conditions.OnLoadPlayerDataFailed);
            }
        }
    };

    if (globalThis.C3) {
        C3.Plugins.Eponesh_YandexSDK.Acts = Acts;
    }

    try { module.exports = Acts } catch (e) {}

    Acts;
}
