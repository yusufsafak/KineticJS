Test.prototype.tests = {
    ////////////////////////////////////////////////////////////////////////
    //  STAGE tests
    ////////////////////////////////////////////////////////////////////////

    'STAGE - instantiate stage with id': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
    },
    'STAGE - instantiate stage with dom element': function(containerId) {
        var containerDom = document.getElementById(containerId);
        var stage = new Kinetic.Stage({
            container: containerDom,
            width: 578,
            height: 200
        });
    },
    'STAGE - add shape then stage then layer': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        group.add(circle);
        stage.add(layer);
        layer.add(group);
        layer.draw();
    },
    'STAGE - add layer then group then shape': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        stage.add(layer);
        layer.add(group);
        group.add(circle);
        layer.draw();
    },
    'STAGE - serialize stage': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle',
            draggable: true
        });

        stage.add(layer);
        layer.add(group);
        group.add(circle);
        layer.draw();

        //console.log(stage.toJSON())

        var expectedJson = '{"attrs":{"width":578,"height":200,"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Stage","children":[{"attrs":{"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Layer","children":[{"attrs":{"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Group","children":[{"attrs":{"radius":70,"fill":"green","stroke":"black","strokeWidth":4,"detectionType":"path","visible":true,"listening":true,"name":"myCircle","alpha":1,"x":289,"y":100,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":true},"nodeType":"Shape","shapeType":"Circle"}]}]}]}';
        test(stage.toJSON() === expectedJson, 'problem with serialization');
    },
    'STAGE - test getAttrs()': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();
        var circle = new Kinetic.Circle({
            x: 100,
            y: 100,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle',
            draggable: true
        });

        stage.add(layer);
        layer.add(group);
        group.add(circle);
        layer.draw();

        var attrs = circle.getAttrs();

        test(attrs.x === 100, 'x attr should be 100');
        test(attrs.y === 100, 'y attr should be 100');
        test(attrs.radius === 70, 'radius attr should be radius');
        test(attrs.fill === 'green', 'fill attr should be fill');
        test(attrs.stroke === 'black', 'stroke attr should be stroke');
        test(attrs.strokeWidth === 4, 'strokeWidth attr should be strokeWidth');
        test(attrs.name === 'myCircle', 'name attr should be myCircle');
        test(attrs.draggable === true, 'draggable attr should be true');
    },
    'STAGE - load stage using json': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });

        var json = '{"attrs":{"width":578,"height":200,"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Stage","children":[{"attrs":{"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Layer","children":[{"attrs":{"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Group","children":[{"attrs":{"radius":70,"fill":"green","stroke":"black","strokeWidth":4,"detectionType":"path","visible":true,"listening":true,"name":"myCircle","alpha":1,"x":289,"y":100,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":true},"nodeType":"Shape","shapeType":"Circle"}]}]}]}';
        stage.load(json);

        test(stage.toJSON() === json, "serialized stage is incorrect");
    },
    'STAGE - serialize stage with custom shape': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        var drawTriangle = function() {
            var context = this.getContext();
            context.beginPath();
            context.moveTo(200, 50);
            context.lineTo(420, 80);
            context.quadraticCurveTo(300, 100, 260, 170);
            context.closePath();
            this.fillStroke();
        };
        var triangle = new Kinetic.Shape({
            drawFunc: drawTriangle,
            fill: "#00D2FF",
            stroke: "black",
            strokeWidth: 4,
            id: 'myTriangle'
        });

        stage.add(layer);
        layer.add(group);
        group.add(triangle);
        layer.draw();

        console.log(stage.toJSON());

        var expectedJson = '{"attrs":{"width":578,"height":200,"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Stage","children":[{"attrs":{"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Layer","children":[{"attrs":{"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Group","children":[{"attrs":{"fill":"#00D2FF","stroke":"black","strokeWidth":4,"detectionType":"path","visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false,"id":"myTriangle"},"nodeType":"Shape"}]}]}]}';
        test(stage.toJSON() === expectedJson, "problem with serialization");

    },
    'STAGE - load stage with custom shape using json': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });

        var drawTriangle = function() {
            var context = this.getContext();
            context.beginPath();
            context.moveTo(200, 50);
            context.lineTo(420, 80);
            context.quadraticCurveTo(300, 100, 260, 170);
            context.closePath();
            this.fillStroke();
        };
        var json = '{"attrs":{"width":578,"height":200,"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Stage","children":[{"attrs":{"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Layer","children":[{"attrs":{"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Group","children":[{"attrs":{"fill":"#00D2FF","stroke":"black","strokeWidth":4,"detectionType":"path","visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false,"id":"myTriangle"},"nodeType":"Shape"}]}]}]}';
        stage.load(json);

        var customShape = stage.get('#myTriangle');

        customShape.setDrawFunc(drawTriangle);

        stage.draw();

        //console.log(stage.toJSON());

        test(stage.toJSON() === json, "serialized stage is incorrect");
    },
    'STAGE - set stage size': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        test(stage.getSize().width === 578, 'stage height should be 578');
        test(stage.getSize().height === 200, 'stage width should be 200');

        stage.setSize(300, 150);

        test(stage.getSize().width === 300, 'stage height should be 300');
        test(stage.getSize().height === 150, 'stage width should be 150');

        layer.add(circle);
        stage.add(layer);

    },
    'STAGE - scale stage after add layer': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(circle);
        stage.add(layer);

        stage.setScale(0.5);

        stage.draw();
    },
    'STAGE - scale stage before add shape': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        stage.setScale(0.5);
        layer.add(circle);
        stage.add(layer);
    },
    'STAGE - scale stage with no shapes': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        stage.add(layer);
        stage.setScale(0.5);

        stage.draw();
    },
    'STAGE - select shape by id and name': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            id: 'myCircle'
        });

        var rect = new Kinetic.Rect({
            x: 300,
            y: 100,
            width: 100,
            height: 50,
            fill: 'purple',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myRect'
        });

        layer.add(circle);
        layer.add(rect);
        stage.add(layer);

        var node = stage.get('#myCircle');
        var nodes = stage.get('.myRect');

        test(node.shapeType === 'Circle', 'shape type should be circle');
        test(nodes[0].shapeType === 'Rect', 'shape type should be rect');

    },
    'STAGE - remove layer with shape': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        layer.add(circle);
        stage.add(layer);

        test(stage.children.length === 1, 'stage should have 1 children');

        stage.remove(layer);

        test(stage.children.length === 0, 'stage should have 0 children');
    },
    'STAGE - remove layer with no shapes': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        stage.add(layer);
        stage.remove(layer);
    },
    'STAGE - remove shape multiple times': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var shape1 = new Kinetic.Circle({
            x: 150,
            y: 100,
            radius: 50,
            fill: 'green',
            name: 'myCircle'
        });

        var shape2 = new Kinetic.Circle({
            x: 250,
            y: 100,
            radius: 50,
            fill: 'green',
            name: 'myCircle'
        });

        layer.add(shape1);
        layer.add(shape2);
        stage.add(layer);

        test(layer.getChildren().length === 2, 'layer should have two children');

        layer.remove(shape1);
        layer.remove(shape1);

        test(layer.getChildren().length === 1, 'layer should have two children');

        layer.draw();

    },
    'STAGE - remove layer multiple times': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer1 = new Kinetic.Layer();
        var layer2 = new Kinetic.Layer();

        var shape1 = new Kinetic.Circle({
            x: 150,
            y: 100,
            radius: 50,
            fill: 'green',
            name: 'myCircle'
        });

        var shape2 = new Kinetic.Circle({
            x: 250,
            y: 100,
            radius: 50,
            fill: 'green',
            name: 'myCircle'
        });

        layer1.add(shape1);
        layer2.add(shape2);
        stage.add(layer1);
        stage.add(layer2);

        test(stage.getChildren().length === 2, 'stage should have two children');

        stage.remove(layer1);
        stage.remove(layer1);

        test(stage.getChildren().length === 1, 'stage should have one child');

        stage.draw();

    },
    ////////////////////////////////////////////////////////////////////////
    //  LAYERS tests
    ////////////////////////////////////////////////////////////////////////

    'LAYERS - add layer': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        stage.add(layer);
    },
    'LAYERS - remove all children from layer': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle1 = new Kinetic.Circle({
            x: 100,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        var circle2 = new Kinetic.Circle({
            x: 300,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(circle1);
        layer.add(circle2);
        stage.add(layer);

        test(layer.children.length === 2, 'layer should have 2 children');

        layer.removeChildren();
        layer.draw();

        test(layer.children.length === 0, 'layer should have 0 children');
    },
    'LAYERS - hide layer': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(circle);
        stage.add(layer);

        layer.hide();
        layer.draw();
    },
    ////////////////////////////////////////////////////////////////////////
    //  GROUPS tests
    ////////////////////////////////////////////////////////////////////////

    'GROUPS - add group': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        group.add(circle);
        layer.add(group);
        stage.add(layer);
    },
    'GROUPS - hide group': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        group.add(circle);
        layer.add(group);
        stage.add(layer);

        group.hide();
        layer.draw();
    },
    'GROUPS - create two groups, move first group': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var greenLayer = new Kinetic.Layer();
        var blueLayer = new Kinetic.Layer();
        var greenGroup = new Kinetic.Group();
        var blueGroup = new Kinetic.Group();

        var greenCircle = new Kinetic.Circle({
            x: stage.getWidth() / 2 - 100,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true
        });

        var blueCircle = new Kinetic.Circle({
            x: stage.getWidth() / 2 + 100,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 4
        });

        greenGroup.add(greenCircle);
        blueGroup.add(blueCircle);
        greenLayer.add(greenGroup);
        blueLayer.add(blueGroup);
        stage.add(greenLayer);
        stage.add(blueLayer);

        blueLayer.removeChildren();
        var blueGroup2 = new Kinetic.Group();
        var blueCircle2 = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 4
        });
        blueGroup2.add(blueCircle2);
        blueLayer.add(blueGroup2);
        blueLayer.draw();

        blueGroup2.setPosition(100, 0);
        blueLayer.draw();
    },
    ////////////////////////////////////////////////////////////////////////
    //  SHAPES tests
    ////////////////////////////////////////////////////////////////////////

    'SHAPES - add rect': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            centerOffset: {
                x: 50
            },
            scale: {
                x: 2,
                y: 2
            }
        });

        layer.add(rect);
        stage.add(layer);

        stage.onFrame(function() {
            rect.rotate(Math.PI / 100);
            layer.draw();
        });
        //stage.start();
    },
    'SHAPES - add circle': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            centerOffset: {
                x: 0,
                y: 0
            },
            scale: {
                x: 2,
                y: 2
            }
        });
        layer.add(circle);
        stage.add(layer);

        stage.onFrame(function() {
            circle.rotate(Math.PI / 100);
            layer.draw();
        });
        //stage.start();
    },
    'SHAPES - set fill after instantiation': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });
        layer.add(circle);

        circle.setFill('blue');

        stage.add(layer);
    },
    'SHAPES - add image': function(containerId) {
        var imageObj = new Image();
        imageObj.onload = function() {
            var stage = new Kinetic.Stage({
                container: containerId,
                width: 578,
                height: 200
            });
            var layer = new Kinetic.Layer();
            darth = new Kinetic.Image({
                x: 200,
                y: 60,
                image: imageObj,
                width: 100,
                centerOffset: {
                    x: 50,
                    y: imageObj.height / 2
                }
            });

            layer.add(darth);
            stage.add(layer);
        };
        imageObj.src = '../darth-vader.jpg';
    },
    'STAGE - serialize stage with an image': function(containerId) {
        var imageObj = new Image();
        imageObj.onload = function() {
            var stage = new Kinetic.Stage({
                container: containerId,
                width: 578,
                height: 200
            });
            var layer = new Kinetic.Layer();
            darth = new Kinetic.Image({
                x: 200,
                y: 60,
                image: imageObj,
                centerOffset: {
                    x: 50,
                    y: imageObj.height / 2
                },
                id: 'darth'
            });

            layer.add(darth);
            stage.add(layer);

            var json = stage.toJSON();

            test(json === '{"attrs":{"width":578,"height":200,"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Stage","children":[{"attrs":{"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Layer","children":[{"attrs":{"detectionType":"path","visible":true,"listening":true,"alpha":1,"x":200,"y":60,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":50,"y":150},"dragConstraint":"none","dragBounds":{},"draggable":false,"id":"darth"},"nodeType":"Shape","shapeType":"Image"}]}]}', 'problem serializing stage');
        };
        imageObj.src = '../darth-vader.jpg';
    },
    'STAGE - load stage with an image': function(containerId) {
        var imageObj = new Image();
        imageObj.onload = function() {
            var stage = new Kinetic.Stage({
                container: containerId,
                width: 578,
                height: 200
            });

            var json = '{"attrs":{"width":578,"height":200,"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Stage","children":[{"attrs":{"visible":true,"listening":true,"alpha":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":0,"y":0},"dragConstraint":"none","dragBounds":{},"draggable":false},"nodeType":"Layer","children":[{"attrs":{"detectionType":"path","visible":true,"listening":true,"alpha":1,"x":200,"y":60,"scale":{"x":1,"y":1},"rotation":0,"centerOffset":{"x":50,"y":150},"dragConstraint":"none","dragBounds":{},"draggable":false,"id":"darth"},"nodeType":"Shape","shapeType":"Image"}]}]}';

            stage.load(json);

            var image = stage.get('#darth');

            image.setImage(imageObj);

            stage.draw();

        };
        imageObj.src = '../darth-vader.jpg';
    },
    'SHAPES - add polygon': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var points = [{
            x: 73,
            y: 192
        }, {
            x: 73,
            y: 160
        }, {
            x: 340,
            y: 23
        }, {
            x: 500,
            y: 109
        }, {
            x: 499,
            y: 139
        }, {
            x: 342,
            y: 93
        }];

        var poly = new Kinetic.Polygon({
            points: points,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 5
        });

        layer.add(poly);
        stage.add(layer);

        stage.onFrame(function() {
            poly.rotate(Math.PI / 100);
            layer.draw();
        });
        //stage.start();
    },
    'SHAPES - add regular polygon triangle': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var poly = new Kinetic.RegularPolygon({
            x: 200,
            y: 100,
            sides: 3,
            radius: 50,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 5,
            name: 'foobar',
            centerOffset: {
                y: -50
            }
        });

        layer.add(poly);
        stage.add(layer);

    },
    'SHAPES - add regular polygon square': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var poly = new Kinetic.RegularPolygon({
            x: 200,
            y: 100,
            sides: 4,
            radius: 50,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 5,
            name: 'foobar'
        });

        layer.add(poly);
        stage.add(layer);
    },
    'SHAPES - add regular polygon pentagon': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var poly = new Kinetic.RegularPolygon({
            x: 200,
            y: 100,
            sides: 5,
            radius: 50,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 5,
            name: 'foobar'
        });

        layer.add(poly);
        stage.add(layer);
    },
    'SHAPES - add regular polygon octogon': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var poly = new Kinetic.RegularPolygon({
            x: 200,
            y: 100,
            sides: 8,
            radius: 50,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 5,
            name: 'foobar'
        });

        layer.add(poly);
        stage.add(layer);
    },
    'SHAPES - add five point star': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var star = new Kinetic.Star({
            x: 200,
            y: 100,
            points: 5,
            innerRadius: 40,
            outerRadius: 70,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 5,
            name: 'foobar',
            centerOffset: {
                y: -70
            },
            scale: {
                x: 0.5,
                y: 0.5
            }
        });

        layer.add(star);
        stage.add(layer);
    },
    'SHAPES - add five point star with line join (ends up as bevel line join)': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var star = new Kinetic.Star({
            x: 200,
            y: 100,
            points: 5,
            innerRadius: 40,
            outerRadius: 70,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 5,
            lineJoin: "round"
        });

        layer.add(star);
        stage.add(layer);

        test(star.getLineJoin() === 'round', 'lineJoin property should be round');
        star.setLineJoin('bevel');
        test(star.getLineJoin() === 'bevel', 'lineJoin property should be bevel');

        layer.draw();
    },
    'SHAPES - add stroke rect': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            stroke: 'green',
            strokeWidth: 4
        });

        layer.add(rect);
        stage.add(layer);
    },
    'SHAPES - use default stroke (stroke color should be black)': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            strokeWidth: 4
        });

        layer.add(rect);
        stage.add(layer);
    },
    'SHAPES - use default stroke width (stroke width should be 2)': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            stroke: 'blue'
        });

        layer.add(rect);
        stage.add(layer);
    },
    'SHAPES - set center offset after instantiation': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            stroke: 'blue',
            centerOffset: {
                x: 20,
                y: 20
            }
        });

        layer.add(rect);
        stage.add(layer);

        test(rect.getCenterOffset().x === 20, 'center offset x should be 20');
        test(rect.getCenterOffset().y === 20, 'center offset y should be 20');

        rect.setCenterOffset(40, 40);

        test(rect.getCenterOffset().x === 40, 'center offset x should be 40');
        test(rect.getCenterOffset().y === 40, 'center offset y should be 40');

    },
    'SHAPES - custom shape with fill, stroke, and strokeWidth': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var shape = new Kinetic.Shape({
            drawFunc: function() {
                var context = this.getContext();
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(100, 0);
                context.lineTo(100, 100);
                context.closePath();
                this.fillStroke();
            },
            x: 200,
            y: 100,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 5
        });

        layer.add(shape);
        stage.add(layer);
    },
    'SHAPES - change custom shape draw func': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var shape = new Kinetic.Shape({
            drawFunc: function() {
                var context = this.getContext();
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(100, 0);
                context.lineTo(100, 100);
                context.closePath();
                this.fillStroke();
            },
            x: 200,
            y: 100,
            fill: 'green',
            stroke: 'blue',
            strokeWidth: 5
        });

        shape.setDrawFunc(function() {
            var context = this.getContext();
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(200, 0);
            context.lineTo(200, 100);
            context.closePath();
            this.fillStroke();
        });

        layer.add(shape);
        stage.add(layer);
    },
    'SHAPES - init with position, scale, rotation, then change scale': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            scale: {
                x: 0.5,
                y: 0.5
            },
            rotation: 20 * Math.PI / 180
        });

        test(rect.getPosition().x == 200, 'rect should be at x = 200');
        test(rect.getPosition().y == 100, 'rect should be at y = 100');
        test(rect.getScale().x == 0.5, 'rect x scale should be 0.5');
        test(rect.getScale().y == 0.5, 'rect y scale should be 0.5');
        test(rect.getRotation() == 20 * Math.PI / 180, 'rect should rotated by 20 degrees');

        rect.setScale(2, 0.3);
        test(rect.getScale().x == 2, 'rect x scale should be 2');
        test(rect.getScale().y == 0.3, 'rect y scale should be 0.3');

        layer.add(rect);
        stage.add(layer);
    },
    'SHAPES - rotation in degrees': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            rotationDeg: 10
        });

        test(rect.getRotationDeg() === 10, 'rotation should be 10 degrees');
        rect.setRotationDeg(20);
        test(rect.getRotationDeg() === 20, 'rotation should be 20 degrees');
        rect.rotateDeg(20);
        test(rect.getRotationDeg() === 40, 'rotation should be 40 degrees');

        layer.add(rect);
        stage.add(layer);
    },
    'Text - add text': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var text = new Kinetic.Text({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            stroke: 'green',
            strokeWidth: 5,
            fill: '#ddd',
            text: 'Hello World!',
            fontSize: 60,
            fontFamily: 'Calibri',
            fontStyle: 'normal',
            textFill: '#888',
            textStroke: '#333',
            padding: 10,
            fontStyle: 'normal',
            //draggable: true,
            align: 'center',
            verticalAlign: 'middle'
        });

        layer.add(text);
        stage.add(layer);

        stage.onFrame(function() {
            text.rotate(Math.PI / 100);
            layer.draw();
        });
        //stage.start();

        /*
         * test getters and setters
         */
        text.setText('Bye World!');
        test(text.getText() === 'Bye World!', 'text should be Bye World!');
        test(text.getPadding() === 10, 'padding should be 10');
        test(text.getFontStyle() == 'normal', 'font style should be normal');
        text.setPadding(20);
        test(text.getPadding() === 20, 'padding should be 20');

        layer.draw();

        text.setFontFamily('Arial');
        text.setFontSize(30);
        text.setFontStyle('italic');
        text.setAlign('right');
        text.setVerticalAlign('top');
        text.setTextFill('blue');
        text.setTextStroke('red');
        text.setTextStrokeWidth(10);

        test(text.getFontFamily() === 'Arial', 'font family should be Arial');
        test(text.getFontSize() === 30, 'text size should be 30');
        test(text.getFontStyle() == 'italic', 'font style should be italic');
        test(text.getAlign() === 'right', 'text align should be right');
        test(text.getVerticalAlign() === 'top', 'vertical align should be top');
        test(text.getTextFill() === 'blue', 'text fill should be blue');
        test(text.getTextStroke() === 'red', 'text stroke should be red');
        test(text.getTextStrokeWidth() === 10, 'test stroke width should be 10');
    },
    'Text - get metrics': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var text = new Kinetic.Text({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            text: 'Hello World!',
            fontSize: 60,
            fontFamily: 'Calibri',
            fontStyle: 'normal',
            textFill: 'green',
            fontStyle: 'italic',
            align: 'center',
            verticalAlign: 'middle'
        });

        layer.add(text);
        stage.add(layer);

        test(text.getTextSize().width > 0, 'text width should have a value');
        test(text.getTextSize().height > 0, 'text height should have a value');
        test(text.getTextWidth() > 0, 'text width should have a value');
        test(text.getTextHeight() > 0, 'text height should have a value');

    },
    'SHAPES - get shape name': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        layer.add(circle);
        stage.add(layer);

        test(circle.getName() == 'myCircle', 'name should be myCircle');
    },
    'SHAPES - remove shape': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        layer.add(circle);
        stage.add(layer);

        test(layer.children.length === 1, 'layer should have 1 children');

        layer.remove(circle);

        test(layer.children.length === 0, 'layer should have 0 children');
        //test(layer.getChild('myCircle') === undefined, 'shape should be null');

        layer.draw();
    },
    'NODE - test drag and drop properties and methods': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        stage.add(layer);
        layer.add(circle);
        layer.draw();

        // test defaults
        test(circle.attrs.draggable === false, 'draggable should be false');
        test(circle.attrs.dragConstraint === 'none', 'drag constraint should be none');
        test(circle.attrs.dragBounds.left === undefined, 'drag left should be undefined');
        test(circle.attrs.dragBounds.top === undefined, 'drag top should be undefined');
        test(circle.attrs.dragBounds.right === undefined, 'drag right should be undefined');
        test(circle.attrs.dragBounds.bottom === undefined, 'drag bottom should be undefined');
        test(circle.getDragConstraint() === 'none', 'drag constraint should be none');
        test(circle.getDragBounds().bottom === undefined, 'drag bottom should be undefined');

        //change properties
        circle.draggable(true);
        circle.setDragConstraint('vertical');
        circle.setDragBounds({
            left: 50,
            top: 100,
            right: 150,
            bottom: 200
        });

        // test new properties
        test(circle.attrs.draggable === true, 'draggable should be true');
        test(circle.attrs.dragConstraint === 'vertical', 'drag constraint should be vertical');
        test(circle.attrs.dragBounds.left === 50, 'drag left should be 50');
        test(circle.attrs.dragBounds.top === 100, 'drag top should be 100');
        test(circle.attrs.dragBounds.right === 150, 'drag right should be 150');
        test(circle.attrs.dragBounds.bottom === 200, 'drag bottom should be 200');
        test(circle.getDragConstraint() === 'vertical', 'drag constraint should be vertical');
        test(circle.getDragBounds().bottom === 200, 'drag bottom should be 200');
    },
    'NODE - translate, rotate, scale shape': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Rect({
            x: 100,
            y: 100,
            rotationDeg: 20,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            scale: {
                x: 2,
                y: 1
            },
            centerOffset: {
                x: 50,
                y: 25
            }
        });

        layer.add(circle);
        stage.add(layer);

        stage.onFrame(function(frame) {
            circle.rotation += .1;
            layer.draw();
        });
        //stage.start();

    },
    'STAGE - add layer then shape': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            name: 'myCircle'
        });

        stage.add(layer);
        layer.add(circle);
        layer.draw();
    },
    'TRANSFORMS - move shape, group, and layer, and then get absolute position': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group = new Kinetic.Group();

        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        group.add(circle);
        layer.add(group);
        stage.add(layer);

        circle.setPosition(100, 0);
        group.setPosition(100, 0);
        layer.setPosition(100, 0);

        // test relative positions
        test(circle.getPosition().x == 100, 'circle should be at x = 100');
        test(group.getPosition().x == 100, 'group should be at x = 100');
        test(layer.getPosition().x == 100, 'layer should be at x = 100');

        // test absolute positions
        test(circle.getAbsolutePosition().x == 300, 'circle should be at x = 300');
        test(group.getAbsolutePosition().x == 200, 'group should be at x = 200');
        test(layer.getAbsolutePosition().x == 100, 'layer should be at x = 100');

        layer.draw();
    },
    'TRANSFORMS - scale layer, rotate group, position shape, and then get absolute position': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer({
            scale: {
                x: 2,
                y: 2
            }
        });
        var group = new Kinetic.Group({
            x: 100,
            rotationDeg: 90
        });

        var rect = new Kinetic.Rect({
            x: 50,
            y: 10,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            draggable: true
        });

        group.add(rect);
        layer.add(group);
        stage.add(layer);

        // test absolute positions
        test(rect.getAbsolutePosition().x == 180, 'rect should be at x = 180');
        test(rect.getAbsolutePosition().y == 100, 'rect should be at y = 100');

        layer.draw();
    },
    'SHAPES - hide circle': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(circle);
        stage.add(layer);

        circle.hide();
        layer.draw();
    },
    'SHAPES - hide show circle': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(circle);
        stage.add(layer);

        circle.hide();
        layer.draw();

        circle.show();
        layer.draw();
    },
    'SHAPES - set shape alpha to 0.5': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        circle.setAlpha(0.5);
        layer.add(circle);
        stage.add(layer);
    },
    'SHAPES - set shape alpha to 0.5 then back to 1': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        circle.setAlpha(0.5);
        layer.add(circle);
        stage.add(layer);

        test(circle.getAbsoluteAlpha() === 0.5, 'abs alpha should be 0.5');

        circle.setAlpha(1);
        layer.draw();

        test(circle.getAbsoluteAlpha() === 1, 'abs alpha should be 1');
    },
    'STAGE - set shape and layer alpha to 0.5': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        circle.setAlpha(0.5);
        layer.setAlpha(0.5);
        layer.add(circle);
        stage.add(layer);

        test(circle.getAbsoluteAlpha() === 0.25, 'abs alpha should be 0.25');
        test(layer.getAbsoluteAlpha() === 0.5, 'abs alpha should be 0.5');
    },
    'SHAPES - scale shape by half': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        circle.setScale(0.5, 1);
        layer.add(circle);
        stage.add(layer);
    },
    'SHAPES - scale shape by half then back to 1': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var circle = new Kinetic.Circle({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        circle.setScale(0.5, 1);
        circle.setScale(1, 1);
        layer.add(circle);
        stage.add(layer);
    },
    ////////////////////////////////////////////////////////////////////////
    //  LAYERING tests
    ////////////////////////////////////////////////////////////////////////

    'LAYERING - get absolute z index': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var group1 = new Kinetic.Group();
        var group2 = new Kinetic.Group();
        var group3 = new Kinetic.Group();
        var group4 = new Kinetic.Group();

        var shape1 = new Kinetic.Circle({
            x: 150,
            y: stage.getHeight() / 2,
            radius: 40,
            fill: 'green'
        });

        var shape2 = new Kinetic.Circle({
            x: 250,
            y: stage.getHeight() / 2,
            radius: 40,
            fill: 'green'
        });

        /*
         *        Stage(0)
         *          |
         *        Layer(1)
         *          |
         *    +-----+-----+
         *    |           |
         *   G1(2)       G2(3)
         *    |           |
         *    +       +---+---+
         *    |       |       |
         *   S1(4)   G3(5)  G4(6)
         *            |
         *            +
         *            |
         *           S2(7)
         */

        group1.add(shape1);
        group2.add(group3);
        group2.add(group4);
        group3.add(shape2);
        layer.add(group1);
        layer.add(group2);
        stage.add(layer);

        test(stage.getAbsoluteZIndex() === 0, 'stage abs zindex should be 0');
        test(layer.getAbsoluteZIndex() === 1, 'layer abs zindex should be 1');
        test(group1.getAbsoluteZIndex() === 2, 'group1 abs zindex should be 2');
        test(group2.getAbsoluteZIndex() === 3, 'group2 abs zindex should be 3');
        test(shape1.getAbsoluteZIndex() === 4, 'shape1 abs zindex should be 4');
        test(group3.getAbsoluteZIndex() === 5, 'group3 abs zindex should be 5');
        test(group4.getAbsoluteZIndex() === 6, 'group4 abs zindex should be 6');
        test(shape2.getAbsoluteZIndex() === 7, 'shape2 abs zindex should be 7');
    },
    'LAYERING - move blue circle on top of green circle with moveToTop': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var blueCircle = new Kinetic.Circle({
            x: 200,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 4
        });

        var greenCircle = new Kinetic.Circle({
            x: 280,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(blueCircle);
        layer.add(greenCircle);
        stage.add(layer);

        test(blueCircle.getZIndex() === 0, 'blue circle should have zindex 0 before relayering');
        test(greenCircle.getZIndex() === 1, 'green circle should have zindex 1 before relayering');

        blueCircle.moveToTop();

        test(blueCircle.getZIndex() === 1, 'blue circle should have zindex 1 after relayering');
        test(greenCircle.getZIndex() === 0, 'green circle should have zindex 0 after relayering');

        layer.draw();
    },
    'LAYERING - move green circle below blue circle with moveDown': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();

        var blueCircle = new Kinetic.Circle({
            x: 200,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 4
        });

        var greenCircle = new Kinetic.Circle({
            x: 280,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(blueCircle);
        layer.add(greenCircle);
        stage.add(layer);

        test(blueCircle.getZIndex() === 0, 'blue circle should have zindex 0 before relayering');
        test(greenCircle.getZIndex() === 1, 'green circle should have zindex 1 before relayering');

        greenCircle.moveDown();

        test(blueCircle.getZIndex() === 1, 'blue circle should have zindex 1 after relayering');
        test(greenCircle.getZIndex() === 0, 'green circle should have zindex 0 after relayering');

        layer.draw();
    },
    'LAYERING - move blue group on top of green group with moveToTop': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var greenGroup = new Kinetic.Group();
        var blueGroup = new Kinetic.Group();

        var blueCircle = new Kinetic.Circle({
            x: 200,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 4
        });

        var greenCircle = new Kinetic.Circle({
            x: 280,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        blueGroup.add(blueCircle);
        greenGroup.add(greenCircle);

        layer.add(blueGroup);
        layer.add(greenGroup);
        stage.add(layer);

        test(blueGroup.getZIndex() === 0, 'blue group should have zindex 0 before relayering');
        test(greenGroup.getZIndex() === 1, 'green group should have zindex 1 before relayering');

        blueGroup.moveToTop();

        test(blueGroup.getZIndex() === 1, 'blue group should have zindex 1 after relayering');
        test(greenGroup.getZIndex() === 0, 'green group should have zindex 0 after relayering');

        layer.draw();
    },
    'LAYERING - move blue group on top of green group with moveUp': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var greenGroup = new Kinetic.Group();
        var blueGroup = new Kinetic.Group();

        var blueCircle = new Kinetic.Circle({
            x: 200,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 4
        });

        var greenCircle = new Kinetic.Circle({
            x: 280,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        blueGroup.add(blueCircle);
        greenGroup.add(greenCircle);

        layer.add(blueGroup);
        layer.add(greenGroup);
        stage.add(layer);

        test(blueGroup.getZIndex() === 0, 'blue group should have zindex 0 before relayering');
        test(greenGroup.getZIndex() === 1, 'green group should have zindex 1 before relayering');

        blueGroup.moveUp();

        test(blueGroup.getZIndex() === 1, 'blue group should have zindex 1 after relayering');
        test(greenGroup.getZIndex() === 0, 'green group should have zindex 0 after relayering');

        layer.draw();
    },
    'LAYERING - move blue layer on top of green layer with moveToTop': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var blueLayer = new Kinetic.Layer();
        var greenLayer = new Kinetic.Layer();

        var blueCircle = new Kinetic.Circle({
            x: 200,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 4
        });

        var greenCircle = new Kinetic.Circle({
            x: 280,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        blueLayer.add(blueCircle);
        greenLayer.add(greenCircle);

        stage.add(blueLayer);
        stage.add(greenLayer);

        blueLayer.moveToTop();
    },
    'LAYERING - move green layer below blue layer with moveToBottom': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var blueLayer = new Kinetic.Layer();
        var greenLayer = new Kinetic.Layer();

        var blueCircle = new Kinetic.Circle({
            x: 200,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'blue',
            stroke: 'black',
            strokeWidth: 4
        });

        var greenCircle = new Kinetic.Circle({
            x: 280,
            y: stage.getHeight() / 2,
            radius: 70,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        blueLayer.add(blueCircle);
        greenLayer.add(greenCircle);

        stage.add(blueLayer);
        stage.add(greenLayer);

        greenLayer.moveToBottom();
    },
    ////////////////////////////////////////////////////////////////////////
    //  ANIMATION tests
    ////////////////////////////////////////////////////////////////////////

    'ANIMATION - stage and global object animation properties': function(containerId) {
        var stage = new Kinetic.Stage({
            container: containerId,
            width: 578,
            height: 200
        });
        var layer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 200,
            y: 100,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4
        });

        layer.add(rect);
        stage.add(layer);

        var amplitude = 150;
        var period = 1000;
        // in ms
        var centerX = stage.getWidth() / 2 - 100 / 2;

        stage.onFrame(function(frame) {
            rect.x = amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX;
            layer.draw();
        });
        // TODO: need to re-add support for stop

        stage.start();

        stage.stop();

    }
};
