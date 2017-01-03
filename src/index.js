import * as d3 from 'd3';

import Director from './components/director.js';

let director = new Director(d3, 'center-point');
// director.centerPoint();

const dx = $('#dx');
const dy = $('#dy');
const set = $('#set');

director.addEvent(function (node) {
  dx.val(node.x + node.width / 2);
  dy.val(node.y + node.height / 2);
});

let bezierCurvePath = director.createBezierCurvePath();
bezierCurvePath.draw();

let networkGraph = director.createNetworkGraph();
networkGraph.addSvg('security_device.svg', -161, -194);
networkGraph.addSvg('ax.svg', -157, 90);

networkGraph.addSvg('unlock.svg', -158.5, -100.5);
networkGraph.addSvg('locked.svg', -348, 22);
networkGraph.addSvg('locked.svg', 56, 22);

networkGraph.addSvg('router.svg', 155.5, 85.5);
networkGraph.addSvg('laptop.svg', -483, 92);
networkGraph.addSvg('cloud.svg', 323, 60);

networkGraph.addPath('M -420, 90, -300, 90');
networkGraph.addPath('M -20, 90, 110, 90');
networkGraph.addPath('M 200, 90, 250, 90');

networkGraph.addPath('M -310, 50, L-310, -190, L-260, -190');
networkGraph.addPath('M 0, 50, L0, -190, L-50, -190');

set.on('click', function() {
  // networkGraph.setPosition(dx.val(), dy.val());
});
