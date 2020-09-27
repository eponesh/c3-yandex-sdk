"use strict";
{
    var Acts = {
        async ShowFullscreen() {
            await this.ready;
            this._showFullscreenAdv();
        },

        async CreateBanner(id, x = 0, y = 0, width = 0, height = 0, styles) {
            if (!this.banners[id]) {
                this.banners[id] = { displayed: false };
                await this.rtbReady;
                this._rtbCreateBanner({ id, x, y, width, height, styles });
            }
        },

        async CreateStickyBanner(id, position = 0, width = 0, height = 0, styles) {
            if (!this.banners[id]) {
                this.banners[id] = { displayed: false };
                await this.rtbReady;
                this._rtbCreateStickyBanner({ id, position, width, height, styles });
            }
        },

        async DisplayBanner(id) {
            if (this.banners[id]) {
                await this.rtbReady;
                this._rtbDisplayBanner({ id });
            }
        },

        async RefreshBanner(id) {
            if (this.banners[id]) {
                await this.rtbReady;
                this.banners[id].displayed = false;
                this._rtbRefreshBanner({ id });
            }
        },

        async DestroyBanner(id) {
            if (this.banners[id]) {
                await this.rtbReady;
                this.banners[id].displayed = false;
                this.lastBannerID = id;
                this._rtbDestroyBanner({ id });
                this.Trigger(this.conditions.OnBannerDestroyed);
            }
        },

        async ReachGoal(target) {
            await this.metricaReady;
            console.log('Reach Goal: ', target);
            this._reachGoal({ target });
        },

        async SignIn() {
            await this.getPlayer();
        },

        async LoadCatalog() {
            try {
                await this.paymentsReady;
                this.products = await this._getCatalog();
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
                await this.paymentsReady;
                this.purchases = await this._getPurchases();
                this.Trigger(this.conditions.OnPurchasesLoadSuccess);
            } catch (err) {
                this.Trigger(this.conditions.OnPurchasesLoadFailed);
            }
        },

        async Buy(purchaseId) {
            try {
                await this.paymentsReady;
                const purchase = await this._purchase({ purchaseId });
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
                await this._showRewardedVideo();
            } catch (error) {
                this.Trigger(this.conditions.OnRewardedVideoError);
            }
        },

        async ConsumePurchase(id) {
            const purchase = this.purchases.find(p => p.productID === id);
            try {
                await this.paymentsReady;
                await this._consumePurchase({ purchaseToken: purchase.purchaseToken });
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
                await this._incrementPlayerStats({ [key]: value });
                const stats = await this._getPlayerStats([key]);
                this.playerStats[key] = stats[key] || 0;
            } catch (error) {
                this.lastStateKey = key;
                this.Trigger(this.conditions.OnIncrementPlayerStateFailed);
            }
        },

        async SetState(key, value) {
            this.playerStats[key] = value;
            try {
                await this._setPlayerStats( {[key]: value });
                const stats = await this._getPlayerStats([key]);
                this.playerStats[key] = stats[key] || 0;
            } catch (error) {
                this.lastStateKey = key;
                this.Trigger(this.conditions.OnSetPlayerStateFailed);
            }
        },

        async SetData(key, value) {
            this.playerData[key] = value;
            try {
                await this._setPlayerData({ [key]: value });
                const data = await this._getPlayerData([key]);
                this.playerData[key] = data[key] || '';
            } catch (error) {
                this.lastDataKey = key;
                this.Trigger(this.conditions.OnSetPlayerDataFailed);
            }
        },

        async LoadStats() {
            try {
                this.playerStats = (await this._getPlayerFullStats()) || {};
                this.Trigger(this.conditions.OnLoadPlayerStatsSuccess);
            } catch (err) {
                this.Trigger(this.conditions.OnLoadPlayerStatsFailed);
            }
        },

        async LoadData() {
            try {
                this.playerData = (await this._getPlayerFullData()) || {};
                this.Trigger(this.conditions.OnLoadPlayerDataSuccess);
            } catch (err) {
                this.Trigger(this.conditions.OnLoadPlayerDataFailed);
            }
        }
    };

    if (globalThis.C3) {
        C3.Plugins.Eponesh_YandexSDK.Acts = Acts;
    }

    Acts;
}
