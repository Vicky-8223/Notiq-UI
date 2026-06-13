const Topbar = () => {
  return (
    <header className="h-12 bg-surface border-b border-border flex items-center px-5 gap-3 sticky top-0 z-10">
      {/* Logo */}
      <span className="font-mono font-semibold text-base text-white tracking-tight">
        Noti<span className="text-accent">q</span>
      </span>
      {/* Spacer */}
      <div className="ml-auto flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-[11px] text-green-400 bg-green-400/10 border border-green-400/25 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          All systems operational
        </div>
      </div>
    </header>
  );
};

export default Topbar;