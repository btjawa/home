// Credit: https://github.com/JIEJOE-WEB-Tutorial/018-magnetic-pointer

({
  el: document.getElementById('cursor'),
  moved: false,

  rect: null as DOMRect | null,
  target: null as Element | null | undefined,

  BORDER: '32px',

  init() {
    this.event = this.event.bind(this);
    this.reset = this.reset.bind(this);
    this.reset();

    window.addEventListener('pointermove', this.event);
    window.addEventListener('touchstart', (e) => {
      if (e.touches.length) this.event(e.touches[0]);
    });
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length) this.event(e.touches[0]);
    });
  },

  event(e: PointerEvent | Touch) {
    if (!this.el) return;
    if (!this.moved) {
      this.moved = true;
      this.el.classList.add('active');
    }

    const target = document.elementFromPoint(e.clientX, e.clientY)?.closest('a');

    if (target !== this.target) {
      this.target = target;

      if (this.target) {
        this.rect = this.target.getBoundingClientRect();
        this.el.style.setProperty('--width', this.rect.width + 'px');
        this.el.style.setProperty('--height', this.rect.height + 'px');
      } else {
        this.reset();
      }
    }

    requestAnimationFrame(() => {
      if (!this.el) return;
      let x = e.clientX;
      let y = e.clientY;
      if (this.target && this.rect) {
        const targetX = this.rect.left + this.rect.width / 2;
        const targetY = this.rect.top + this.rect.height / 2;
        x = targetX + (x - targetX) * 0.1;
        y = targetY + (y - targetY) * 0.1;
      }
      this.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });
  },

  reset() {
    if (!this.el) return;
    this.rect = null;
    this.el.style.setProperty('--width', this.BORDER);
    this.el.style.setProperty('--height', this.BORDER);
  }
}).init();
