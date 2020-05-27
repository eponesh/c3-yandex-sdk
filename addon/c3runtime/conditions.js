"use strict";
{
    function each (runtime, array, cb) {
        if ('getCurrentEventStack' in runtime) {
            eachC2(runtime, array, cb);
            return;
        }
        const eventSheetManager = runtime.GetEventSheetManager();
        const currentEvent = runtime.GetCurrentEvent();
        const solModifiers = currentEvent.GetSolModifiers();
        const eventStack = runtime.GetEventStack();
        // Get current stack frame and push new one
        const oldFrame = eventStack.GetCurrentStackFrame();
        const newFrame = eventStack.Push(currentEvent);

        array.forEach((item) => {
            cb(item);

            // Push a copy of the current SOL
            eventSheetManager.PushCopySol(solModifiers);
            // Retrigger the current event, running a single loop iteration
            currentEvent.Retrigger(oldFrame, newFrame);
            // Pop the current SOL
            eventSheetManager.PopSol(solModifiers);
        });

        // Pop the event stack frame
        eventStack.Pop();
    }

    function eachC2 (runtime, array, cb) {
        const current_frame = runtime.getCurrentEventStack();
		const current_event = current_frame.current_event;
        const colModifiedAfterCnds = current_frame.isModifierAfterCnds();

        if (colModifiedAfterCnds) {
            array.forEach((item) => {
                runtime.pushCopySol(current_event.solModifiers);
                cb(item);
                current_event.retrigger();
                runtime.popSol(current_event.solModifiers);
            });
        } else {
            array.forEach((item) => {
                cb(item);
                current_event.retrigger();
            });
        }
    }

    var Cnds = {
        OnAdvClosed() {
            return true;
        },

        OnFirstAdvClosed() {
            return true;
        },

        OnSignInFailed() {
            return true;
        },

        OnSignInSuccess() {
            return true;
        },

        IsSignedIn() {
            return !!this.player;
        },

        IsPurchasesAvailable() {
            return !!this.payments;
        },

        HasAnyPurchase() {
            return this.purchases.length > 0;
        },

        OnBuySuccess(purchaseId) {
            return purchaseId === this.lastPurchaseID;
        },

        OnBuyFailed(purchaseId) {
            return purchaseId === this.lastPurchaseID;
        },

        OnAnyBuySuccess() {
            return true;
        },

        OnAnyBuyFailed() {
            return true;
        },

        OnPurchasesLoadSuccess() {
            return true;
        },

        OnPurchasesLoadFailed() {
            return true;
        },

        OnCatalogLoadSuccess() {
            return true;
        },

        OnCatalogLoadFailed() {
            return true;
        },

        HasPurchase(productId) {
            return this.purchases.some(p => p.productID === productId);
        },

        EachProduct() {
            each(this._runtime, this.products, (product) => {
                this.currentProductID = product.id || product.productID;
                this.currentProductTitle = product.title;
                this.currentProductDescription = product.description;
                this.currentProductImage = product.imageURI;
                this.currentProductPrice = parseFloat(product.price);
            });

            return false;
        },

        EachPurchase() {
            each(this._runtime, this.purchases, (purchase) => {
                this.currentPurchaseID = purchase.productID;
                this.currentPurchaseToken = purchase.purchaseToken;
                this.currentPurchaseSign = purchase.signature;
            });

            return false;
        },

        OnRewardedVideoOpen() {
            return true;
        },

        OnRewardedVideoClose() {
            return true;
        },

        OnRewardedVideoError() {
            return true;
        },

        OnRewardedVideoReward() {
            return true;
        },

        IsRewardedVideoPlaying() {
            return this.isRewardedVideoPlaying;
        },

        OnIncrementPlayerStateFailed(key) {
            return key === this.lastStateKey;
        },

        OnSetPlayerStateFailed(key) {
            return key === this.lastStateKey;
        },

        OnSetPlayerDataFailed(key) {
            return key === this.lastDataKey;
        },

        OnLoadPlayerStatsSuccess() {
            return true;
        },

        OnLoadPlayerStatsFailed() {
            return true;
        },

        OnLoadPlayerDataSuccess() {
            return true;
        },

        OnLoadPlayerDataFailed() {
            return true;
        },

        OnConsumeSuccess(purchaseId) {
            return purchaseId === this.lastPurchaseID;
        },

        OnConsumeFailed(purchaseId) {
            return purchaseId === this.lastPurchaseID;
        },

        OnAnyConsumeSuccess() {
            return true;
        },

        OnAnyConsumeFailed() {
            return true;
        },

        OnBannerDisplayed(bannerID) {
            return bannerID === this.lastBannerID;
        },

        OnBannerDestroyed(bannerID) {
            return bannerID === this.lastBannerID;
        },

        IsBannerDisplaying(bannerID) {
            const banner = this.banners[bannerID];
            return !!(banner && banner.displayed);
        },
    };

    if (globalThis.C3) {
        C3.Plugins.Eponesh_YandexSDK.Cnds = Cnds;
    }

    try { module.exports = Cnds } catch (e) {}

    Cnds;
}
