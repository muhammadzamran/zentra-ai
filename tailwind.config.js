export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'z-bg':      '#030303',
        'z-surface': '#0c0c0c',
        'z-card':    '#111111',
        'z-border':  '#1a1a1a',
        'z-violet':  '#7C3AED',
        'z-cyan':    '#06B6D4',
        'z-amber':   '#F59E0B',
        'z-green':   '#10B981',
        'z-red':     '#EF4444',
        'z-muted':   '#444444',
        'z-text':    '#F0F0F0',
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"','sans-serif'],
        sans:    ['Inter','sans-serif'],
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'scan':       'scan 8s linear infinite',
      },
      keyframes: {
        float:     { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-16px)' } },
        glowPulse: { '0%,100%':{ opacity:0.4 }, '50%':{ opacity:1 } },
        scan:      { '0%':{ transform:'translateY(-100%)' }, '100%':{ transform:'translateY(100vh)' } },
      }
    }
  },
  plugins: []
}
