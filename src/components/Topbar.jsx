const Topbar = () => {
  return (
    <header className="h-14 bg-white border-b border-border flex items-center px-6 gap-3 sticky top-0 z-50 shadow-sm">
      {/* Brand Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-sm">
          <span className="text-white font-black text-xs font-heading">N</span>
        </div>
        <span className="font-heading font-bold text-base text-[#202124] tracking-tight">
          Noti<span className="text-accent">q</span>
        </span>
      </div>

      {/* Status pill */}
      <div className="ml-auto flex items-center gap-2 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Live
      </div>
    </header>
  );
};

export default Topbar;