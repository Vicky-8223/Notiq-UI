import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../constants";

// Simple inline SVG icons
const icons = {
  grid: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  file: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  ),
  play: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
};

const Sidebar = () => {
  return (
    <aside className="w-52 min-w-52 bg-surface border-r border-border flex flex-col py-2">
      {/* Main nav */}
      <div className="px-3 pt-3 pb-1">
        <p className="text-[10px] font-mono text-muted uppercase tracking-widest px-2 mb-2">
          Navigation
        </p>
        {NAV_ITEMS.slice(0, 2).map((item) => (
          <NavLink
            key={item.id}
            to={`/${item.id === "overview" ? "" : item.id}`}
            end={item.id === "overview"}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm mb-0.5 transition-all duration-150 
              ${isActive
                ? "bg-accent/15 text-accent2"
                : "text-muted hover:bg-surface2 hover:text-white"
              }`
            }
          >
            {icons[item.icon]}
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="h-px bg-border mx-4 my-2" />

      {/* Developer section */}
      <div className="px-3">
        <p className="text-[10px] font-mono text-muted uppercase tracking-widest px-2 mb-2">
          Developer
        </p>
        {NAV_ITEMS.slice(2).map((item) => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm mb-0.5 transition-all duration-150
              ${isActive
                ? "bg-accent/15 text-accent2"
                : "text-muted hover:bg-surface2 hover:text-white"
              }`
            }
          >
            {icons[item.icon]}
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;