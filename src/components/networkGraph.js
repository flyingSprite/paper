
import BasicComponent from '../core/basic';
import StandardLayout from './standardLayout';
import _ from 'lodash';

import CONFIG from '../config';

class NetworkGraph extends BasicComponent {
  constructor(director) {
    super(director);
    this.nodes = {};
    this.group = undefined;
    this.selectedNode = undefined;
    this.padding = 6;
    this.init();
  }

  init() {
    this.group = new StandardLayout(this.director).create();
    this.group.attr('class', 'svg-box');
  }

  /**
   *  One svg element contains one rect background and svg file in g label.
   *  this.group
   *    +-- background box rect
   *    +-- svg group
   *        +-- svg file
   */
  addSvg(name, dx=0, dy=0) {
    const self = this;
    const svgElement = this.group.append('g');
    this.d3.xml(CONFIG.svgPath + name, function(error, xml) {
      if (error) {
        throw error;
      }
      let importedNode = document.importNode(xml.documentElement, true);
      var node = { dx: dx, dy: dy };
      // Add background box in group.
      let backgroundBox = svgElement.append('rect')
          .attr('class', 'svg-box-background');
      let svgGroup = svgElement.append('g');
      // Add svg file in group
      svgGroup.select(function() {
        var svgNode = this.appendChild(importedNode.cloneNode(true));
        // Get width and height from svg element.
        node.width = self.getWidthFromSVG(svgNode) + self.padding;
        node.height = self.getHeightFromSVG(svgNode) + self.padding;
      });
      const newName = name + new Date().getTime();
      node.name = newName;
      node.element = svgElement;
      self.nodes[node.name] = node;
      // svgGroup.attr('transform', `translate(${node.width}, ${node.height})`);
      // TODO: let rect margin: 5px;
      svgElement.attr('transform', `translate(${node.dx}, ${node.dx})`);
      backgroundBox
          .attr('width', node.width)
          .attr('height', node.height);
      svgGroup.attr(
        'transform',
        `translate(${self.padding / 2}, ${self.padding / 2})`);

      self.addEvents(self.nodes[newName]);
    });
  }

  addPath(path) {
    this.group.append('path')
      .attr('d', path)
      .attr('fill', '#fff')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrow)');
  }

  getWidthFromSVG(svg) {
    if (svg && svg.width && svg.width.baseVal && svg.width.baseVal.value) {
      return _.round(svg.width.baseVal.value);
    }
    return 0;
  }

  getHeightFromSVG(svg) {
    if (svg && svg.height && svg.height.baseVal && svg.height.baseVal.value) {
      return _.round(svg.height.baseVal.value);
    }
    return 0;
  }

  addEvents(node) {
    const self = this;
    // Add click event
    node.element.on('click', function () {
      self.selected(node);
      self.director.touchClickEvent(node);
    });

    // Add drag event
    node.element.call(self.d3.drag().on('start', function() {
      self.selected(node);
      function dragged() {
        self.director.touchClickEvent(node);
        node.x = _.round(self.d3.event.x - node.width / 2);
        node.y = _.round(self.d3.event.y - node.height / 2);
        node.element.attr('transform', `translate(${node.x}, ${node.y})`);
      }
      function ended() {
        // Do closed
      }
      self.d3.event.on('drag', dragged).on('end', ended);
    }));
  }

  selected(node) {
    if (this.selectedNode) {
      this.selectedNode.element.attr('class', '');
      this.selectedNode.element.select('rect')
          .attr('stroke-width', 0);
    }
    this.selectedNode = node;
    this.selectedNode.element.attr('class', 'active');
    this.selectedNode.element.select('rect')
        .attr('stroke-width', 1)
        .attr('stroke', '#93d893');
  }

  setPosition(dx, dy) {
    if (!!this.selectedNode) {
      this.selectedNode.x = dx - this.selectedNode.width / 2;
      this.selectedNode.y = dy - this.selectedNode.height / 2;
      this.selectedNode.element.attr('transform', `translate(${dx}, ${dy})`);
    }
  }

  draw() {

  }
}

export default NetworkGraph;
