///////////////////////////////////////////////////////////////////////
//  Circle
///////////////////////////////////////////////////////////////////////
/**
 * Circle constructor
 * @constructor
 * @augments Kinetic.Shape
 * @param {Object} config
 */
Kinetic.Circle = function(config) {
    // default attrs
    if(this.attrs === undefined) {
        this.attrs = {};
    }
    this.attrs.radius = 0;
    this.shapeType = "Circle";

    config.drawFunc = function() {
        var canvas = this.getCanvas();
        var context = this.getContext();
        context.beginPath();
        this.applyLineJoin();
        context.arc(0, 0, this.attrs.radius, 0, Math.PI * 2, true);
        context.closePath();
        this.fillStroke();
    };
    // call super constructor
    Kinetic.Shape.apply(this, [config]);
};
/*
 * Circle methods
 */
Kinetic.Circle.prototype = {
    /**
     * set radius
     * @param {Number} radius
     */
    setRadius: function(radius) {
        this.attrs.radius = radius;
    },
    /**
     * get radius
     */
    getRadius: function() {
        return this.attrs.radius;
    }
};

// extend Shape
Kinetic.GlobalObject.extend(Kinetic.Circle, Kinetic.Shape);
