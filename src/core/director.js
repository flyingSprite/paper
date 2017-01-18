
class Director {

  /**
   * @{pramas d3} Unbind with d3 package.
   */
  constructor(d3) {
    this.d3 = d3;
  }

  register() {

  }

  svg(id) {
    this.scene = this.d3.select('#' + id).append('svg')
        .style('width', '100%')
        .style('height', '100%');
    // Get svg label width.
    this.width = parseInt(this.scene.style('width').replace('px', ''));
    // Get svg label height.
    this.height = parseInt(this.scene.style('height').replace('px', ''));
  }
}

export default Director;
