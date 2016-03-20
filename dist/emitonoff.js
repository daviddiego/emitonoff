!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.emitonoff=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var EmitOnOff = module.exports = function(thing){
  if (!thing) thing = {};

  thing.subs = [];

  /**
   * Sub of pubsub
   * @param  {String}   name name of event
   * @param  {Function} cb   your callback
   * @param  {Obect} context   your desired this for your callback (optional)
   */
  thing.on = function(name, cb, context){
    thing.subs[name] = thing.subs[name] || [];
    if(context)
      thing.subs[name].push({cb:cb, cbtbc:cb.bind(context)});
    else
      thing.subs[name].push({cb:cb, cbtbc:cb});
  };

  /**
   * remove sub of pubsub
   * @param  {String}   name name of event
   * @param  {Function} cb   your callback
   */
  thing.off = function(name, cb){
    if (!thing.subs[name]) return;
    for (var i in thing.subs[name]){
      if (thing.subs[name][i].cb === cb){
        thing.subs[name].splice(i);
        break;
      }
    }
  };

  /**
   * Pub of pubsub
   * @param  {String}   name name of event
   * @param  {Mixed}    data the data to publish
   */
  thing.emit = function(name){
    if (!thing.subs[name]) return;
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i in thing.subs[name]){
      thing.subs[name][i].cb.apply(thing, args);
    }
  };

  return thing;
};
},{}]},{},[1])(1)
});
