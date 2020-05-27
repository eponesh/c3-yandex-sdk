"use strict";
{
    var Exps = {
        PlayerName() {
            return this.player ? this.player.getName() : '';
        },

        PlayerId() {
            return this.player ? this.player.getID() : '';
        },

        PlayerPhotoSmall() {
            return this.player ? this.player.getPhoto('small') : '';
        },

        PlayerPhotoMedium() {
            return this.player ? this.player.getPhoto('medium') : '';
        },

        PlayerPhotoLarge() {
            return this.player ? this.player.getPhoto('large') : '';
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

    try { module.exports = Exps } catch (e) {}

    Exps;
}
