"use strict";
{
    var Exps = {
        PlayerName() {
            return this.player.name;
        },

        PlayerId() {
            return this.player.id;
        },

        PlayerPhotoSmall() {
            return this.player.photoSmall;
        },

        PlayerPhotoMedium() {
            return this.player.photoMedium;
        },

        PlayerPhotoLarge() {
            return this.player.photoLarge;
        },

        CurrentProductID() {
            return this.currentProductID || '';
        },

        CurrentProductTitle() {
            return this.currentProductTitle || '';
        },

        CurrentProductImage() {
            return this.currentProductImage || '';
        },

        CurrentProductDescription() {
            return this.currentProductDescription || '';
        },

        CurrentProductPrice() {
            return this.currentProductPrice || 0;
        },

        CurrentPurchaseID() {
            return this.currentPurchaseID || '';
        },

        CurrentPurchaseToken() {
            return this.currentPurchaseToken || '';
        },

        CurrentPurchaseSign() {
            return this.currentPurchaseSign || '';
        },

        GetPurchaseToken(productId) {
            return this.getPurchase(productId).purchaseToken || '';
        },

        LastPurchaseId() {
            return this.lastPurchaseID || '';
        },

        LastPurchaseToken() {
            return this.lastPurchaseToken || '';
        },

        GetProductTitle(productId) {
            return this.getProduct(productId).title || '';
        },

        GetProductDescription(productId) {
            return this.getProduct(productId).description || '';
        },

        GetProductImage(productId) {
            return this.getProduct(productId).imageURI || '';
        },

        GetProductPrice(productId) {
            return parseFloat(this.getProduct(productId).price || 0);
        },

        LastPlayerStateKey() {
            return this.lastStateKey || '';
        },

        LastPlayerDataKey() {
            return this.lastDataKey || '';
        },

        GetPlayerState(key) {
            return this.playerStats[key] || 0;
        },

        GetPlayerData(key) {
            return this.playerData[key] || '';
        },

        LastBanner() {
            return this.lastBannerID;
        }
    };

    if (globalThis.C3) {
        C3.Plugins.Eponesh_YandexSDK.Exps = Exps;
    }

    Exps;
}
