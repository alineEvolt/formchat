//     pump
//     (c) simonfan
//     pump is licensed under the MIT terms.

define("__pump/pipe",["require","exports","module","lodash"],function(e,i){var t=e("lodash");i.addPipe=function(){var e,i,s;t.isString(arguments[0])?(e=arguments[0],i=arguments[1],s=arguments[2]||{}):(e=t.uniqueId("pipe"),i=arguments[0],s=arguments[1]||{}),s.source=this.source;var r=this._buildPipe(i,s);return this.pipes[e]=r,r},i.pipe=i.addPipe,i.getPipe=function(e){return this.pipes[e]},i.removePipe=function(e,i){return t.isFunction(e)?t.each(this.pipes,function(t,s){e.call(i,t,s)&&delete this.pipes[s]},this):t.isArray(e)?t.each(e,function(i,s){t.contains(e,s)&&delete this.pipes[s]},this):delete this.pipes[e],this},i.unpipe=i.removePipe}),define("__pump/streams/pump",["require","exports","module","lodash"],function(e,i){var t=e("lodash");i.pump=function(e,i,s){var r;return e?(e=t.isArray(e)?e:[e],r=t.pick(this.pipes,e)):r=this.pipes,t.each(r,function(e){e.pump(i,s)}),this}}),define("__pump/streams/drain",["require","exports","module","lodash"],function(e,i){e("lodash");i.drain=function(e,i,t){if(!e&&0!==e)throw new Error("Drain must take a pipe id as first argument.");var s=this.pipes[e];if(!s)throw new Error('Pipe "'+e+'" not found.');return s.drain(i,t),this}}),define("__pump/streams/inject",["require","exports","module","lodash"],function(e,i){var t=e("lodash");i.inject=function(e,i){var s=this.srcSet||this.set;if(!this.source)throw new Error("No source for pump");return t.each(e,function(e,i){s.call(this,this.source,i,e)},this),this.pump(i,null,!0),this}}),define("pump",["require","exports","module","subject","lodash","pipe","./__pump/pipe","./__pump/streams/pump","./__pump/streams/drain","./__pump/streams/inject"],function(e,i,t){var s=e("subject"),r=e("lodash"),p=e("pipe"),n=["srcGet","srcSet","destGet","destSet"],u=t.exports=s({initialize:function(e){this.source=e,this._buildPipe=p.extend(r.pick(this,n)),this.pipes={}},from:function(e){return this.source=e,r.each(this.pipes,function(i){i.from(e)}),this},get:function(e,i){return e[i]},set:function(e,i,t){return e[i]=t,this}});u.assignProto(e("./__pump/pipe")).assignProto(e("./__pump/streams/pump")).assignProto(e("./__pump/streams/drain")).assignProto(e("./__pump/streams/inject"))});