({
  canvas: document.getElementById('background') as HTMLCanvasElement | null,
  color: (b: number) => 
    `rgb(${window.matchMedia('(prefers-color-schema: dark)').matches
      ? '51 51 51'
      : '230 238 250'} / ${b})`,
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

        ctx.fillStyle = this.color((wave + 1) / 2);
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
