import React, { useEffect, useRef } from 'react';

interface AudioAmbiancePlayerProps {
  isPlaying: boolean;
}

export const AudioAmbiancePlayer: React.FC<AudioAmbiancePlayerProps> = ({ isPlaying }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  useEffect(() => {
    if (isPlaying) {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }

        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Create pink noise for gentle soothing cafe ambient rain
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          data[i] *= 0.04; // Very quiet gentle volume
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        // Lowpass filter for warm cozy coffee shop rain feel
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start();
        noiseNodeRef.current = noise;
        gainNodeRef.current = gainNode;
      } catch {
        // AudioContext restricted before gesture
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 0.5
        );
        setTimeout(() => {
          if (noiseNodeRef.current) {
            (noiseNodeRef.current as AudioBufferSourceNode).stop();
            noiseNodeRef.current.disconnect();
            noiseNodeRef.current = null;
          }
        }, 500);
      }
    }

    return () => {
      if (noiseNodeRef.current) {
        try {
          (noiseNodeRef.current as AudioBufferSourceNode).stop();
        } catch {
          // ignore
        }
      }
    };
  }, [isPlaying]);

  return null;
};
