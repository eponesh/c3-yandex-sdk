(() => {
    const ELEMENT_ID = 'Eponesh_YandexSDK';
    const DEFAULT_BANNER_STYLES = `
        display: flex;
        justify-content: center;
        align-tems: center;
        position: absolute;
        z-index: 10;
    `;
    const POSITIONS_MAP = {
        0: 'top: 0; left: 0;',
        1: 'top: 0; left: 50%; transform: translateX(-50%);',
        2: 'top: 0; right: 0;',
        3: 'top: 0; left: 0; bottom: 0;',
        4: 'top: 50%; left: 50%; transform: translate(-50%, -50%);',
        5: 'top: 0; right: 0; bottom: 0;',
        6: 'bottom: 0; left: 0;',
        7: 'bottom: 0; left: 50%; transform: translateX(-50%);',
        8: 'bottom: 0; right: 0;',
    };

    class DomHandler extends DOMElementHandler {
        constructor(iRuntime) {
            super(iRuntime, ELEMENT_ID);

            // INIT
            this.AddDOMElementMessageHandler('INIT_SDK', (_, sdkOptions) => this.loadSDK(sdkOptions));
            this.AddDOMElementMessageHandler('INIT_RTB', () => this.loadRTB());
            this.AddDOMElementMessageHandler('INIT_METRICA', (_, { metricaId }) => {
                this.metricaId = metricaId;
                this.loadMetrica();

                return new Promise((resolve) => {
                    if (window[`yaCounter${this.metricaId}`]) {
                        resolve();
                        return;
                    }

                    document.addEventListener(`yacounter${this.metricaId}inited`, () => resolve());
                });
            });

            // PAYMENTS
            this.AddDOMElementMessageHandler('YSDK_PAYMENTS_GET', async (_, options) => {
                this.payments = await this.ysdk.getPayments(options);
            });
            this.AddDOMElementMessageHandler('YSDK_PAYMENTS_GET_CATALOG', async () => {
                const products = await this.payments.getCatalog();
                // map symbol to objects
                return products.map(p => ({
                    productID: p.id || p.productID,
                    title: p.title,
                    description: p.description,
                    imageURI: p.imageURI,
                    price: parseFloat(p.price)
                }));
            });
            this.AddDOMElementMessageHandler('YSDK_PAYMENTS_GET_PURCHASES', async () => {
                const purchases = await this.payments.getPurchases();
                // map symbol to objects
                return purchases.map(p => ({
                    productID: p.productID,
                    purchaseToken: p.purchaseToken,
                    signature: p.signature
                }));
            });
            this.AddDOMElementMessageHandler('YSDK_PAYMENTS_PURCHASE', (_, { purchaseId }) => this.payments.purchase(purchaseId));
            this.AddDOMElementMessageHandler('YSDK_PAYMENTS_CONSUME_PURCHASE', (_, { purchaseToken }) => this.payments.consumePurchase(purchaseToken));

            // PLAYER
            this.AddDOMElementMessageHandler('YSDK_PLAYER_GET', async () => {
                this.player = await this.ysdk.getPlayer();
                return {
                    name: this.player.getName() || '',
                    id: this.player.getUniqueID() || '',
                    photoSmall: this.player.getPhoto('small') || '',
                    photoMedium: this.player.getPhoto('medium') || '',
                    photoLarge: this.player.getPhoto('large') || ''
                };
            });

            this.AddDOMElementMessageHandler('YSDK_PLAYER_GET_FULL_STATS', () => this.player.getStats());
            this.AddDOMElementMessageHandler('YSDK_PLAYER_GET_STATS', (_, p) => this.player.getStats(p));
            this.AddDOMElementMessageHandler('YSDK_PLAYER_SET_STATS', (_, p) => this.player.setStats(p));
            this.AddDOMElementMessageHandler('YSDK_PLAYER_INCREMENT_STATS', (_, p) => this.player.incrementStats(p));

            this.AddDOMElementMessageHandler('YSDK_PLAYER_GET_FULL_DATA', () => this.player.getData());
            this.AddDOMElementMessageHandler('YSDK_PLAYER_GET_DATA', (_, p) => this.player.getData(p));
            this.AddDOMElementMessageHandler('YSDK_PLAYER_SET_DATA', (_, p) => this.player.setData(p));

            // AUTH
            this.AddDOMElementMessageHandler('YSDK_AUTH_OPEN', () => this.ysdk.auth.openAuthDialog());

            // ADS
            this.AddDOMElementMessageHandler('YSDK_ADS_SHOW_FULLSCREEN', () => this.ysdk.adv.showFullscreenAdv({ callbacks: {} }));
            this.AddDOMElementMessageHandler('YSDK_ADS_SHOW_REWARDED', () => {
                const callbacks = {
                    onOpen: () => this.PostToRuntimeElement('YSDK_ADS_REWARDED_OPEN', ELEMENT_ID),
                    onRewarded: () => this.PostToRuntimeElement('YSDK_ADS_REWARDED_REWARD', ELEMENT_ID),
                    onClose: () => this.PostToRuntimeElement('YSDK_ADS_REWARDED_CLOSE', ELEMENT_ID),
                    onError: () => this.PostToRuntimeElement('YSDK_ADS_REWARDED_ERROR', ELEMENT_ID)
                };
                this.ysdk.adv.showRewardedVideo({ callbacks });
            });

            // METRICA
            this.AddDOMElementMessageHandler('YSDK_METRICA_REACH_GOAL', (_, { target }) => ym(this.metricaId, 'reachGoal', target));

            // RTB BANNERS
            this.AddDOMElementMessageHandler('YSDK_RTB_CREATE_BANNER', (_, { id, x, y, width, height, styles }) => {
                this.insertBanner(id, `
                    ${DEFAULT_BANNER_STYLES}
                    top: ${x}px;
                    left: ${y}px;
                    width: ${width === 0 ? 'auto' : `${width}px`};
                    height: ${height === 0 ? 'auto' : `${height}px`};
                    ${styles}
                `);
                this.rtbRenderBanner(id);
            });

            this.AddDOMElementMessageHandler('YSDK_RTB_CREATE_STICKY_BANNER', (_, { id, position, width, height, styles }) => {
                this.insertBanner(id, `
                    ${DEFAULT_BANNER_STYLES}
                    ${POSITIONS_MAP[position] || ''}
                    width: ${width === 0 ? '100%' : `${width}px`};
                    height: ${height === 0 ? '100%' : `${height}px`};
                    ${styles}
                `);
                this.rtbRenderBanner(id);
            });

            this.AddDOMElementMessageHandler('YSDK_RTB_DESTROY_BANNER', (_, { id }) => Ya.Context.AdvManager.destroy(id));
            this.AddDOMElementMessageHandler('YSDK_RTB_DISPLAY_BANNER', (_, { id }) => {
                this.rtbRenderBanner(id);
            });
            this.AddDOMElementMessageHandler('YSDK_RTB_REFRESH_BANNER', (_, { id }) => {
                Ya.Context.AdvManager.destroy(id);
                this.rtbRenderBanner(id);
            });
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

        loadSDK({ screen }) {
            return new Promise((resolve) => {
                const initSDK = async () => {
                    this.ysdk = await YaGames.init({
                        screen,
                        adv: {
                            onAdvClose: (wasShown) => this.PostToRuntimeElement('SDK_ADS_CLOSED', ELEMENT_ID, { wasShown })
                        },
                    });
                    resolve();
                }

                (function(d) {
                    var t = d.getElementsByTagName('script')[0];
                    var s = d.createElement('script');
                    s.src = 'https://yandex.ru/games/sdk/v2';
                    s.async = true;
                    t.parentNode.insertBefore(s, t);
                    s.onload = initSDK;
                })(document);
            });
        }

        loadRTB () {
            return new Promise((resolve) => {
                ((w, d, n, s, t) => {
                    w[n] = w[n] || [];
                    t = d.getElementsByTagName("script")[0];
                    s = d.createElement("script");
                    s.onload = () => resolve();
                    s.type = "text/javascript";
                    s.src = "//an.yandex.ru/system/context.js";
                    s.async = true;
                    t.parentNode.insertBefore(s, t);
                })(window, document, "yandexContextAsyncCallbacks");
            });
        }

        rtbRenderBanner (id) {
            Ya.Context.AdvManager.render({
                blockId: id,
                renderTo: id,
                async: true,
                onRender: () => this.PostToRuntimeElement('SDK_RTB_RENDER', ELEMENT_ID, { id })
            });
        }

        insertBanner (id, styles) {
            const div = document.createElement('div');
            div.id = id;
            div.style.cssText = styles;
            document.body.appendChild(div);
        }
    }

    RuntimeInterface.AddDOMHandlerClass(DomHandler);
})();
