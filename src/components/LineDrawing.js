
class LineDrawing {

  constructor(director) {
    this.dr = director;
    this.d3 = this.dr.d3;
    this.drawLines = [];
  }

  on() {
    const self = this;
    self.line = self.d3.line().curve(self.d3.curveBasis);
    self.dr.scene
        .call(self.d3.drag()
            .container(function() { return this; })
            .subject(function() {
              var p = [ self.d3.event.x, self.d3.event.y ];
              return [p, p];
            })
            .filter(function() {
              return !self.d3.event.button;
            })
            .on('start', self.dragstarted.bind(self)));
  }

  dragstarted() {
    var self = this;
    var d = self.d3.event.subject,
        active = self.dr.scene.append('path').datum(d),
        x0 = self.d3.event.x,
        y0 = self.d3.event.y;

    // Add event drag
    self.d3.event.on('drag', function() {
      var x1 = self.d3.event.x,
          y1 = self.d3.event.y,
          dx = x1 - x0,
          dy = y1 - y0;

      if (dx * dx + dy * dy > 16) {
        d.push([ x0 = x1, y0 = y1 ]);
      } else {
        d[ d.length - 1 ] = [ x1, y1 ];
      }

      // Using the points d to draw new path.
      active.attr('d', self.line);
    });

    // Add event end
    self.d3.event.on('end', function() {
      // Put the draw path string in self.drawLines.
      self.drawLines.push(active.attr('d'));
    });
  }
}

export default LineDrawing;
