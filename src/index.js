import * as d3 from 'd3';

import Wacom from './solutions/Wacom';

var wacom = new Wacom(d3);
wacom.draw('d3-draw');

// import Director from './components/director.js';
// import ForceDrag from './components/forceDrag.js';
//
// const force = new ForceDrag(d3);
// force.draw();

// let director = new Director(d3, 'center-point');
// director.centerPoint();



// const dx = $('#dx');
// const dy = $('#dy');
// const set = $('#set');
//
// director.addEvent(function (node) {
//   dx.val(node.width / 2 + node.dx);
//   dy.val(node.height / 2 + node.dy);
// });



// let bezierCurvePath = director.createBezierCurvePath();
// bezierCurvePath.draw();

// let networkGraph = director.createNetworkGraph();
// networkGraph.addSvg('ax.svg', 157, 90);
// networkGraph.addSvg('security_device.svg', 20, 94);
//
// networkGraph.addSvg('unlock.svg', -158.5, -100.5);
// networkGraph.addSvg('locked.svg', -348, 22);
// networkGraph.addSvg('locked.svg', 56, 22);
//
// networkGraph.addSvg('router.svg', 155.5, 85.5);
// networkGraph.addSvg('laptop.svg', -483, 92);
// networkGraph.addSvg('cloud.svg', 323, 60);
//
// networkGraph.addPath('M -420, 90, -300, 90');
// networkGraph.addPath('M -20, 90, 110, 90');
// networkGraph.addPath('M 200, 90, 250, 90');
//
// networkGraph.addPath('M -310, 50, L-310, -190, L-260, -190');
// networkGraph.addPath('M 0, 50, L0, -190, L-50, -190');

// set.on('click', function() {
//   // networkGraph.setPosition(dx.val(), dy.val());
// });
