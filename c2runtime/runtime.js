"use strict";

import Instance from '../addon/c3runtime/instance';
import conditions from '../addon/c3runtime/conditions';
import expressions from '../addon/c3runtime/expressions';
import actions from '../addon/c3runtime/actions';

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

    const instance = new Instance({});
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

    Object.keys(conditions).forEach((key) => {
        conditions[key] = conditions[key].bind(instance);
    });

    Object.keys(actions).forEach((key) => {
        actions[key] = actions[key].bind(instance);
    });

    Object.keys(expressions).forEach((key) => {
        var fn = expressions[key];
        expressions[key] = function (ret) {
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
    Cnds.prototype = Object.assign(Cnds.prototype, conditions);
    pluginProto.cnds = new Cnds();
    instance.conditions = pluginProto.cnds;

    function Acts() {};
    Acts.prototype = Object.assign(Acts.prototype, actions);
    pluginProto.acts = new Acts();

    function Exps() {};
    Exps.prototype = Object.assign(Exps.prototype, expressions);
    pluginProto.exps = new Exps();
}());
