import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../constants";

// Sleek, high-resolution custom SVG icons
const icons = {
  grid: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  book: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  code: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
};

const Sidebar = () => {
  const getLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium mb-1 transition-all duration-200 border border-transparent
    ${isActive
      ? "bg-gradient-to-r from-accent/10 to-accent/2 bg-surface2 text-accent2 border-accent/20 font-semibold shadow-[0_0_15px_rgba(99,102,241,0.08)]"
      : "text-muted hover:bg-surface2/60 hover:text-slate-200 hover:border-slate-800/40"
    }`;

  return (
    <aside className="w-56 min-w-56 bg-surface border-r border-border flex flex-col py-4 px-3 select-none">
      {/* Main nav */}
      <div className="mb-6">
        <p className="text-[10px] font-semibold font-heading text-muted uppercase tracking-widest px-3 mb-2.5">
          Navigation
        </p>
        <div className="space-y-0.5">
          {NAV_ITEMS.slice(0, 2).map((item) => (
            <NavLink
              key={item.id}
              to={`/${item.id === "overview" ? "" : item.id}`}
              end={item.id === "overview"}
              className={getLinkStyles}
            >
              <span className="opacity-90">{icons[item.icon]}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="h-px bg-border/60 mx-2 mb-6" />

      {/* Developer section */}
      <div>
        <p className="text-[10px] font-semibold font-heading text-muted uppercase tracking-widest px-3 mb-2.5">
          Developer
        </p>
        <div className="space-y-0.5">
          {NAV_ITEMS.slice(2).map((item) => (
            <NavLink
              key={item.id}
              to={`/${item.id}`}
              className={getLinkStyles}
            >
              <span className="opacity-90">{icons[item.icon]}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;