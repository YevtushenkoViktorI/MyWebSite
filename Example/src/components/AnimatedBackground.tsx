const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Gradient blobs */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.15] animate-gradient-slow"
        style={{ background: 'radial-gradient(circle, hsl(175 60% 45%), transparent 70%)' }}
      />
      <div
        className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.1] animate-gradient-slow"
        style={{ background: 'radial-gradient(circle, hsl(215 70% 35%), transparent 70%)', animationDelay: '-15s' }}
      />
      <div
        className="absolute -bottom-1/4 left-1/3 w-[550px] h-[550px] rounded-full opacity-[0.08] animate-gradient-slow"
        style={{ background: 'radial-gradient(circle, hsl(155 50% 25%), transparent 70%)', animationDelay: '-30s' }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }} />
    </div>
  );
};

export default AnimatedBackground;
