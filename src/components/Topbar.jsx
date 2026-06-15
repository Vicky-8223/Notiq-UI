const Topbar = () => {
  return (
    <header className="h-14 bg-surface/80 backdrop-blur-md border-b border-border flex items-center px-6 gap-3 sticky top-0 z-50">
      {/* Brand Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-accent to-accent2 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.3)]">
          <span className="text-white font-black text-xs font-heading">N</span>
        </div>
        <span className="font-heading font-bold text-base text-white tracking-tight">
          Noti<span className="text-accent2">q</span>
        </span>
      </div>
      
      {/* Status Indicators */}
      {/* <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center gap-2 text-[10px] font-medium text-emerald-400 bg-emerald-500/8 border border-emerald-500/20 px-3 py-1.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.05)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          All systems operational
        </div>
      </div> */}
    </header>
  );
};

export default Topbar;