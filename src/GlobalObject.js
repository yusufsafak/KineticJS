///////////////////////////////////////////////////////////////////////
//  Global Object
///////////////////////////////////////////////////////////////////////
/**
 * Kinetic Namespace
 * @namespace
 */
var Kinetic = {};
/**
 * Kinetic Global Object
 * @property {Object} GlobalObjet
 */
Kinetic.GlobalObject = {
    stages: [],
    idCounter: 0,
    ids: {},
    names: {},
    animations: [],
    animIdCounter: 0,
    frame: {
        time: 0,
        timeDiff: 0,
        lastTime: 0
    },
    drag: {
        moving: false,
        node: undefined,
        offset: {
            x: 0,
            y: 0
        }
    },
    extend: function(obj1, obj2) {
        for(var key in obj2.prototype) {
            if(obj2.prototype.hasOwnProperty(key) && obj1.prototype[key] === undefined) {
                obj1.prototype[key] = obj2.prototype[key];
            }
        }
    },
    addAnimation: function(anim) {
        anim.id = Kinetic.GlobalObject.animIdCounter++;
        this.animations.push(anim);
    },
    removeAnimation: function(id) {
        var animations = this.animations;
        for(var n = 0; n < animations.length; n++) {
            if(animations[n].id === id) {
                this.animations.splice(n, 1);
                return false;
            }
        }
    },
    _runFrames: function() {
        var nodes = {};
        for(var n = 0; n < this.animations.length; n++) {
            var anim = this.animations[n];
            if(anim.node && anim.node.id !== undefined) {
                nodes[anim.node.id] = anim.node;
            }
            anim.func(this.frame);
        }

        for(var key in nodes) {
            nodes[key].draw();
        }
    },
    _updateFrameObject: function() {
        var date = new Date();
        var time = date.getTime();
        if(this.frame.lastTime === 0) {
            this.frame.lastTime = time;
        }
        else {
            this.frame.timeDiff = time - this.frame.lastTime;
            this.frame.lastTime = time;
            this.frame.time += this.frame.timeDiff;
        }
    },
    _animationLoop: function() {
        if(this.animations.length > 0) {
            this._updateFrameObject();
            this._runFrames();
            var that = this;
            requestAnimFrame(function() {
                that._animationLoop();
            });
        }
        else {
            this.frame.lastTime = 0;
        }
    },
    _handleAnimation: function() {
        var that = this;
        if(this.animations.length > 0) {
            that._animationLoop();
        }
        else {
            this.frame.lastTime = 0;
        }
    },
    addId: function(node) {
        var go = Kinetic.GlobalObject;
        if(node.attrs.id !== undefined) {
            go.ids[node.attrs.id] = node;
        }
    },
    removeId: function(node) {

    },
    addName: function(node) {
        var go = Kinetic.GlobalObject;
        var name = node.attrs.name;
        if(name !== undefined) {
            if(go.names[name] === undefined) {
                go.names[name] = [];
            }
            go.names[name].push(node);
        }
    },
    removeName: function(node) {

    }
};

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
