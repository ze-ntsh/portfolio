'use strict';
export interface Config {
  scale: number;
  font?: {
    family: string;
    style: 'normal' | 'italic' | 'oblique' | 'bold';
    size: number;
  }
  transition?: 'converge' | 'diverge' | 'random',
  duration?: number;
  particles?: {
    color: string | 'rainbow' | 'random';
    density: number;
    size: number;
  },
  background?: string;
}

export interface TimelineObject {
  type: 'image' | 'text';
  content: string;
  config: Config;
}

export interface Interactivity {
  [key: string]: {
    mode: 'grab' | 'push' | 'bubble' | 'repulse';
  }
}

const defaultConfig: Config = {
  scale: 1,
  font: {
    family: 'Arial',
    style: 'normal',
    size: 60,
  },
  transition: 'converge',
  duration: 1000,
  particles: {
    color: 'random',
    density: 150,
    size: 1,
  },
  background: 'transparent',
};

const deepMerge = (target: any, source: any) => {
  for (const key in source) {
    if (source[key] instanceof Object) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }

  Object.assign(target || {}, source);
  return target;
};

const getParticles = async (canvas: HTMLCanvasElement, type: 'image' | 'text', content: string, config: Config) => {
  config = deepMerge(defaultConfig, config);

  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  const secondaryCanvas = document.createElement('canvas');
  secondaryCanvas.width = canvas.width;
  secondaryCanvas.height = canvas.height;

  const secondaryCtx = secondaryCanvas.getContext('2d', { willReadFrequently: true });

  secondaryCtx?.clearRect(0, 0, secondaryCanvas.width, secondaryCanvas.height);

  if (secondaryCtx === null || ctx === null) {
    throw new Error('Canvas context not found');
  }

  if (!content) return;

  let height = 0;
  let width = 0;
  let x = 0;
  let y = 0;

  if (type === 'image') {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = content;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject();
    });

    if (img.width >= img.height) {
      if (secondaryCanvas.width > secondaryCanvas.height) {
        width = secondaryCanvas.width * config.scale;
        height = (secondaryCanvas.width * img.height) / img.width * config.scale;
      } else {
        height = secondaryCanvas.height * config.scale;
        width = (secondaryCanvas.height * img.width) / img.height * config.scale;
      }
    } else {
      if (secondaryCanvas.width >= secondaryCanvas.height) {
        height = secondaryCanvas.height * config.scale;
        width = (secondaryCanvas.height * img.width) / img.height * config.scale;
      } else {
        width = secondaryCanvas.width * config.scale;
        height = (secondaryCanvas.width * img.height) / img.width * config.scale;
      }
    }

    x = (secondaryCanvas.width - width) / 2;
    y = (secondaryCanvas.height - height) / 2;

    secondaryCtx.drawImage(img, x, y, width, height);
    // ctx.drawImage(img, x, y, width, height);
  } else if (type === 'text') {
    if (!config.font) {
      throw new Error('Font config not found');
    };

    secondaryCtx.font = `${config.font.style} ${config.font.size * config.scale}px ${config.font.family}`;
    secondaryCtx.textAlign = 'center';
    secondaryCtx.fillText(content, secondaryCanvas.height / 2, secondaryCanvas.width / 2);

    // ctx.font = `${config.font.style} ${config.font.size * config.scale}px ${config.font.family}`;
    // ctx.textAlign = 'center';
    // ctx.fillText(content, secondaryCanvas.height / 2, secondaryCanvas.width / 2);

    let metrics = secondaryCtx.measureText(content);
    height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
    width = metrics.width;

    x = (secondaryCanvas.width - width) / 2;
    y = secondaryCanvas.height / 2 - config.font.size * config.scale;
  }

  const imageData = secondaryCtx.getImageData(x, y, width, height);

  if (imageData === null) {
    throw new Error('Image data not found');
  }

  // destroy the secondary canvas
  secondaryCanvas.remove();

  return {
    data: imageData.data,
    width: imageData.width,
    height: imageData.height,
    x,
    y,
  }
};

const calculateTrajectory = (x: number, y: number, x2: number, y2: number) => {
  return Math.atan2(y2 - y, x2 - x);
};


class Particle {
  x: number;
  y: number;
  dest_x: number;
  dest_y: number;
  color: string;
  speed: number;
  radius: number;
  opacity: number;
  particleSystem: ParticleSystem;
  constructor(x: number, y: number, dest_x: number, dest_y: number, color: string, trajectory: number, speed: number, radius: number, opacity: number, particleSystem: ParticleSystem) {
    this.x = x;
    this.y = y;
    this.dest_x = dest_x;
    this.dest_y = dest_y;
    this.color = color;
    this.speed = speed;
    this.radius = radius;
    this.opacity = opacity;
    this.particleSystem = particleSystem;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    // stop the particle if it reaches the destination
    if (Math.abs(this.x - this.dest_x) < 3 && Math.abs(this.y - this.dest_y) < 3) {
      this.x = this.dest_x;
      this.y = this.dest_y;
      return;
    }

    const traj = calculateTrajectory(this.x, this.y, this.dest_x, this.dest_y);
    this.x += Math.cos(traj) * this.speed;
    this.y += Math.sin(traj) * this.speed;
  }
}

export class ParticleSystem {
  timeline: TimelineObject[];
  interactivity: Interactivity;
  particles: Particle[];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stage: number = 0;
  interactivityFunctions: {
    [key: string]: (e: MouseEvent) => void;
  } = {
    'click': (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.particles.forEach((particle) => {
        if (Math.abs(particle.x - x) < 20 && Math.abs(particle.y - y) < 20) {
          particle.x = particle.x + (particle.x - x) * 2;
          particle.y = particle.y + (particle.y - y) * 2;
        }
      });
    },
    'hover': (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.particles.forEach((particle) => {
        if (Math.abs(particle.x - x) < 20 && Math.abs(particle.y - y) < 20) {
          particle.x = particle.x + (particle.x - x) * 2;
          particle.y = particle.y + (particle.y - y) * 2;
        }
      });
    }
  }

  constructor(canvas: HTMLCanvasElement, timeline: TimelineObject[], interactivity: Interactivity) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (context === null) {
      throw new Error('Canvas context not found');
    }
    this.ctx = context;
    this.timeline = timeline;
    this.interactivity = interactivity;
    this.particles = [];
  };

  init = async () => {
    this.particles = [];
    const { type, content, config } = this.timeline[this.stage];
    const imageData = await getParticles(this.canvas, type, content, config);

    const { data, width, height, x, y } = imageData as { data: Uint8ClampedArray, width: number, height: number, x: number, y: number };

    let { color, density, size } = config.particles || { color: 'rgb(0,0,0)', density: 150, size: 1 };

    const increment = Math.round(width / density) || 1;

    for (let i = 0; i < width; i += increment) {
      for (let j = 0; j < height; j += increment) {
        if (data[(j * width + i) * 4 + 3] > 128) {
          // random color
          let particleColor = color;
          if (particleColor === 'random') {
            particleColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
          }
          const dest_x = x + i;
          const dest_y = y + j;
          this.particles.push(new Particle(
            this.canvas.width * (Math.random()),
            this.canvas.height * (Math.random()),
            dest_x,
            dest_y,
            particleColor,
            0,
            4,
            size,
            1,
            this
          ));
        }
      }
    }

    if (this.interactivity) {
      if (this.interactivity['click']) {
        this.canvas.addEventListener('click', (e) => {
          this.interactivityFunctions['click'](e);
        });
      }
      if (this.interactivity['hover']) {
        this.canvas.addEventListener('mousemove', (e) => {
          this.interactivityFunctions['hover'](e);
        });
      }
    }

    this.animate();
  }

  animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach((particle) => {
      particle.draw(this.ctx);
      particle.update();
    });

    requestAnimationFrame(this.animate);
  }
}




