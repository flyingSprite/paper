
import BasicComponent from '../core/basic';
// import StandardLayout from '../components/standardLayout';

class StandardBackground extends BasicComponent {
  constructor(director) {
    super(director);
    this.width = 1000;
    this.height = 600;
    this.density = 20;
    // this.layout = new StandardLayout(this.director).create();
  }

  gen() {
    const self = this;
    let lines = [];
    for (var i = this.density; i < this.width; i += this.density) {
      lines.push([{x: i, y: 0}, {x: i, y: this.height}]);
    }
    for (var j = this.density; j < this.height; j += this.density) {
      lines.push([{x: 0, y: j}, {x: this.width, y: j}]);
    }

    this.layout.selectAll('polyline').data(lines).enter().append('polyline')
      .attr('points', function(d) {
        const bline = self.d3.path();
        bline.moveTo(d[0].x, d[0].y);
        bline.lineTo(d[1].x, d[1].y);
        return [ [ d[0].x, d[0].y ], [ d[1].x, d[1].y ] ];
      })
      .attr('class', 'bg-line-standard');
  }

}

export default StandardBackground;
