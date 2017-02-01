//     pipe
//     (c) simonfan
//     pipe is licensed under the MIT terms.

define("__pipe/streams/pump",["require","exports","module","lodash"],function(t,e,i){function s(t,e,i){n.each(i,function(i){return this._destSet(e,i,t)},this)}var n=t("lodash");i.exports=function(t,e,i){var n=this.destination,r=this._srcGet(this.source,t);(!this.isCached(t,r)||i)&&s.call(this,r,n,e)}}),define("__pipe/streams/drain",["require","exports","module","lodash"],function(t,e,i){t("lodash");i.exports=function(t,e,i){var s=this._destGet(this.destination,e[0]);return(!this.isCached(t,s)||i)&&this._srcSet(this.source,t,s),this}}),define("__pipe/streams/index",["require","exports","module","lodash","./pump","./drain"],function(t,e){function i(t,e,i){return e=e?s.pick(this._map,e):this._map,s.each(e,function(e,s){t.call(this,s,e,i)},this),this}var s=t("lodash");e.pump=s.partial(i,t("./pump")),e.drain=s.partial(i,t("./drain")),e.inject=function(t,e){if(!this.source)throw new Error("No source for pipe");s.each(t,function(t,i){(!this.isCached(i,t)||e)&&this._srcSet(this.source,i,t)},this),this.pump(null,!0)}}),define("__pipe/mapping",["require","exports","module","lodash"],function(t,e){var i=t("lodash");e.map=function(){var t,e;return i.isString(arguments[0])?(t=arguments[0],e=arguments[1]||t,e=i.isArray(e)?e:[e],this._map[t]=e):i.isObject(arguments[0])&&i.each(arguments[0],function(t,e){this.map(e,t)},this),this},e.removeLine=function(t){return delete this._map[t],this}}),define("pipe",["require","exports","module","subject","lodash","./__pipe/streams/index","./__pipe/mapping"],function(t,e,i){var s=t("subject"),n=t("lodash"),r=["srcGet","srcSet","destGet","destSet"],h=i.exports=s({initialize:function(t,e){e=e||{},n.each(r,function(t){this[t]=e[t]||this[t]},this),this._srcGet=this.srcGet||this.get,this._srcSet=this.srcSet||this.set,this._destGet=this.destGet||this.get,this._destSet=this.destSet||this.set,e.cache!==!1&&this.clearCache(),e.source&&this.from(e.source),e.destination&&this.to(e.destination),this._map={},this.map(t)},get:function(t,e){return t[e]},set:function(t,e,i){return t[e]=i,t},clearCache:function(){return this.cache={},this},isCached:function(t,e){return this.cache?this.cache[t]!==e?(this.cache[t]=e,!1):!0:!1},to:function(t){return this.clearCache(),this.destination=t,this},from:function(t){return this.clearCache(),this.source=t,this}});h.assignProto(t("./__pipe/streams/index")).assignProto(t("./__pipe/mapping"))});