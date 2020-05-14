/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _addon_c3runtime_instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _addon_c3runtime_instance__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_addon_c3runtime_instance__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _addon_c3runtime_conditions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _addon_c3runtime_conditions__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_addon_c3runtime_conditions__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _addon_c3runtime_expressions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _addon_c3runtime_expressions__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_addon_c3runtime_expressions__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _addon_c3runtime_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _addon_c3runtime_actions__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_addon_c3runtime_actions__WEBPACK_IMPORTED_MODULE_3__);







cr.plugins_.Eponesh_YandexSDK = function(runtime) {
    this._runtime = runtime;
};

(function () {
    var pluginProto = cr.plugins_.Eponesh_YandexSDK.prototype;
    pluginProto.Type = class C2PluginProto {
        constructor (plugin) {
            this.plugin = plugin;
            this._runtime = plugin._runtime;
        }

        onCreate () { }
    }

    const instance = new _addon_c3runtime_instance__WEBPACK_IMPORTED_MODULE_0___default.a({});
    pluginProto.Instance = class C2PluginInstance {
        constructor(type) {
            this.type = type;
            instance._runtime = type._runtime;
        };

        onCreate () {
            instance.Trigger = (cb) => {
                instance._runtime.trigger(cb, this);
            }
            instance.init(this.properties);
        }

        saveToJSON () {
            return {};
        }

        loadFromJSON (o) {};
        getDebuggerValues (propsections) {};
    }

    Object.keys(_addon_c3runtime_conditions__WEBPACK_IMPORTED_MODULE_1___default.a).forEach((key) => {
        _addon_c3runtime_conditions__WEBPACK_IMPORTED_MODULE_1___default.a[key] = _addon_c3runtime_conditions__WEBPACK_IMPORTED_MODULE_1___default.a[key].bind(instance);
    });

    Object.keys(_addon_c3runtime_actions__WEBPACK_IMPORTED_MODULE_3___default.a).forEach((key) => {
        _addon_c3runtime_actions__WEBPACK_IMPORTED_MODULE_3___default.a[key] = _addon_c3runtime_actions__WEBPACK_IMPORTED_MODULE_3___default.a[key].bind(instance);
    });

    Object.keys(_addon_c3runtime_expressions__WEBPACK_IMPORTED_MODULE_2___default.a).forEach((key) => {
        var fn = _addon_c3runtime_expressions__WEBPACK_IMPORTED_MODULE_2___default.a[key];
        _addon_c3runtime_expressions__WEBPACK_IMPORTED_MODULE_2___default.a[key] = function (ret) {
            const value = fn.apply(instance, Array.from(arguments).slice(1));
            switch (typeof value) {
            case 'string': {
                ret.set_string(value);
                break;
            }
            case 'number': {
                if (Number.isInteger(value)) {
                    ret.set_int(value);
                } else {
                    ret.set_float(value);
                }
                break;
            }
            default: {
                ret.set_int(Number(value));
            }
            }
        }
    });

    function Cnds() {};
    Cnds.prototype = Object.assign(Cnds.prototype, _addon_c3runtime_conditions__WEBPACK_IMPORTED_MODULE_1___default.a);
    pluginProto.cnds = new Cnds();
    instance.conditions = pluginProto.cnds;

    function Acts() {};
    Acts.prototype = Object.assign(Acts.prototype, _addon_c3runtime_actions__WEBPACK_IMPORTED_MODULE_3___default.a);
    pluginProto.acts = new Acts();

    function Exps() {};
    Exps.prototype = Object.assign(Exps.prototype, _addon_c3runtime_expressions__WEBPACK_IMPORTED_MODULE_2___default.a);
    pluginProto.exps = new Exps();
}());


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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

            this.enableFullscreenOnStart = properties[0];
            this.setOrientation(properties[1]);
            this.isOrientationLocked = properties[2];

            this.metricaId = properties[3];

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

    if (globalThis.C3) {
        C3.Plugins.Eponesh_YandexSDK.Instance = Instance;
    }

    try { module.exports = Instance } catch (e) {}

    Instance;
}


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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
        }
    };

    if (globalThis.C3) {
        C3.Plugins.Eponesh_YandexSDK.Cnds = Cnds;
    }

    try { module.exports = Cnds } catch (e) {}

    Cnds;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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
        }
    };

    if (globalThis.C3) {
        C3.Plugins.Eponesh_YandexSDK.Exps = Exps;
    }

    try { module.exports = Exps } catch (e) {}

    Exps;
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

{
    var Acts = {
        async ShowFullscreen() {
            await this.ready;
            this.ysdk.adv.showFullscreenAdv({ callbacks: {} });
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
                    onOpen: () => this.Trigger(this.conditions.OnRewardedVideoOpen),
                    onRewarded: () => this.Trigger(this.conditions.OnRewardedVideoReward),
                    onClose: () => this.Trigger(this.conditions.OnRewardedVideoClose),
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


/***/ })
/******/ ]);