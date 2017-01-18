
import BasicComponent from '../core/basic';

class AxisBackground extends BasicComponent {
  constructor(director) {
    super(director);
    this.margin = {top: 5, right: 5, bottom: 5, left: 5};
    this.width = +this.director.width;
    this.height = +this.director.height;
  }

  gen() {
    const self = this;
    const x = self.d3.scaleLinear()
      .domain([0, self.width - self.margin.right - self.margin.left])
      .range([0, self.width - self.margin.right - self.margin.left]);
    const y = self.d3.scaleLinear()
      .domain([self.height - self.margin.top - self.margin.bottom, 0])
      .range([self.height - self.margin.top - self.margin.bottom, 0]);
    const xAxis = self.d3.axisTop(x);
    const yAxis = self.d3.axisRight(y);
    self.layout.append('g')
      .attr('class', 'axis axis--x')
      .attr(
        'transform',
        `translate(${self.margin.left}, ${self.height - self.margin.bottom})`)
      .call(xAxis);

    self.layout.append('g')
      .attr('class', 'axis axis--y')
      .attr(
        'transform',
        `translate(${self.margin.top}, ${self.margin.left})`)
      .call(yAxis);

  }
}

export default AxisBackground;
