
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
    this.firstConnectLine = undefined;
    this.secondConnectLine = undefined;
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
        self.drawConnectPath();
      }
      function ended() {}
      d3.event.on('drag', dragged).on('end', ended);
    }));
  }

  /**
   * Draw connect path.
   */
  drawConnectPath() {
    const startPosition = this.options.startPosition;
    const endPosition = this.options.endPosition;
    const controlPositions = this.options.controlPositions;
    if (controlPositions && controlPositions.length >= 2) {
      this.firstConnectLine = this.drawConnectPathForTwoPoint(
        this.firstConnectLine,
        startPosition,
        controlPositions[0]
      );

      this.secondConnectLine = this.drawConnectPathForTwoPoint(
        this.secondConnectLine,
        endPosition,
        controlPositions[1]
      );
    }
  }

  /**
   * Draw connect path by line and two positions
   */
  drawConnectPathForTwoPoint(line, position1, position2) {
    const path = this.director.d3.path();
    path.moveTo(position1.x, position1.y);
    path.lineTo(position2.x, position2.y);
    if (line) {
      line.attr('d', path.toString());
    } else {
      line = this.layout.append('path')
          .attr('d', path.toString())
          .attr('class', 'draw-connect-path');
    }
    return line;
  }

  /*
   * Using D3 path to get bezier curve path argument.
   */
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
    this.applyToLayout();
  }

  /*
   * Start Draw Bezier Curve.
   */
  draw() {
    this.drawBezierCurvePath();
    this.drawConnectPath();
    const startPosition = this.options.startPosition;
    const endPosition = this.options.endPosition;
    const controlPositions = this.options.controlPositions;
    if (controlPositions && controlPositions.length >= 2) {
      this.drawNodePoint(controlPositions[0]);
      this.drawNodePoint(controlPositions[1]);
    }

    this.drawNodePoint(startPosition);
    this.drawNodePoint(endPosition);
  }

  /**
   * Draw bezier curve path on layout.
   */
  applyToLayout() {
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

}

export default BezierCurvePath;
