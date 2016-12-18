
import Element from './Element';

class BezierCurvePath extends Element{

  /*
    options = {
      startPosition: {x: 0, y: 0},
      endPosition: {x: 0, y: 0}
    }
    if have one control point, so:
    options.controlPosition = {x: 0, y: 0};

    if have two control point, so:
    options.controlPositions: [
      {x: 0, y: 0},
      {x: 0, y: 0}
    ];
   */
  constructor(director, layout, options) {
    super(director, layout, options);
    this.line = undefined;
  }

  drawNodePoint(position) {
    const self = this;
    const d3 = self.director.d3;
    const point = self.layout.append('circle')
        .attr('cx', position.x)
        .attr('cy', position.y)
        .attr('r', 3)
        .attr('fill', '#fff')
        .attr('stroke', 'blue')
        .attr('stroke-width', '1');

    point.call(d3.drag().on('start', function() {
      function dragged() {
        position.x = d3.event.x;
        position.y = d3.event.y;
        point
          .attr('cx', position.x)
          .attr('cy', position.y);
        self.drawBezierCurvePath();
      }
      function ended() {}
      d3.event.on('drag', dragged).on('end', ended);
    }));
  }

  drawBezierCurvePath() {
    const startPosition = this.options.startPosition;
    const endPosition = this.options.endPosition;
    const controlPositions = this.options.controlPositions;

    this.path = this.director.d3.path();
    this.path.moveTo(startPosition.x, startPosition.y);
    if (controlPositions && controlPositions.length >= 2) {
      this.path.bezierCurveTo(
        controlPositions[0].x,
        controlPositions[0].y,
        controlPositions[1].x,
        controlPositions[1].y,
        endPosition.x,
        endPosition.y
      );
    }
    // this.path.closePath();
    this.applyToLayout();
  }

  draw() {
    this.drawBezierCurvePath();

    const startPosition = this.options.startPosition;
    const endPosition = this.options.endPosition;
    const controlPositions = this.options.controlPositions;
    this.drawNodePoint(startPosition);
    this.drawNodePoint(endPosition);
    if (controlPositions && controlPositions.length >= 2) {
      this.drawNodePoint(controlPositions[0]);
      this.drawNodePoint(controlPositions[1]);
    }

  }

  applyToLayout() {
    console.log(this.path.toString());
    if (this.line) {
      this.line.attr('d', this.path.toString());
    } else {
      this.line = this.layout.append('path')
          .attr('d', this.path.toString())
          .attr('stroke-width', 1)
          .attr('stroke', '#ddd')
          .attr('fill', 'transparent');
    }

  }

  startEdit() {

  }

  endEdit() {

  }

}

export default BezierCurvePath;
