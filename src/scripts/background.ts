({
  canvas: document.getElementById('background') as HTMLCanvasElement | null,
  color: getComputedStyle(document.documentElement).getPropertyValue('--fg-cv'),
  timer: 0,
  
  GAP: 50,
  WAVE: 800,
  RADIUS: 1,

  init() {
    if (!this.canvas) return;

    this.render = this.render.bind(this);

    window.addEventListener('resize', () => {
      this.reset();
    });

    this.reset();
    this.render();
  },

  render() {
    if (!this.canvas) return;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let x = 0; x < this.canvas.width; x += this.GAP) {
      for (let y = 0; y < this.canvas.height; y += this.GAP) {
        const wave = Math.sin((x + y) * Math.PI / this.WAVE  - this.timer);
        const t = (wave + 1) / 2;

        ctx.fillStyle = `rgb(${this.color} / ${t})`;

        ctx.beginPath();
        ctx.arc(x, y, this.RADIUS, 0, Math.PI * 2);
        ctx.fill();

      }
    }

    this.timer += 0.02;

    requestAnimationFrame(this.render);
  },

  reset() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}).init()
