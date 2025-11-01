import React, { useCallback } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

export default function ParticlesBackground({ style }) {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles-auth"
      init={particlesInit}
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: true, mode: 'push' },
            onHover: { enable: true, mode: 'grab' },
            resize: true,
          },
          modes: {
            push: { quantity: 3 },
            grab: { distance: 140, links: { opacity: 0.5 } },
          },
        },
        particles: {
          color: { value: ['#ffffff', '#e0e7ff', '#c7d2fe'] },
          links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.2, width: 1 },
          collisions: { enable: true },
          move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: false, speed: 1.5, straight: false },
          number: { density: { enable: true, area: 800 }, value: 60 },
          opacity: { value: 0.4, animation: { enable: true, speed: 1, minimumValue: 0.1 } },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 4 }, animation: { enable: true, speed: 2, minimumValue: 0.1 } },
        },
        detectRetina: true,
        fullScreen: { enable: false, zIndex: -1 },
      }}
      style={{ position: 'absolute', inset: 0, ...style }}
    />
  );
}
