import { Moon, Sun, Monitor, Search, ChevronDown } from 'lucide-react'
import type { ThemeMode } from '../hooks/useTheme'

interface HeaderProps {
  title: string
  logo?: string
  searchQuery: string
  onSearchChange: (query: string) => void
  theme: 'light' | 'dark'
  mode: ThemeMode
  onModeChange: (mode: ThemeMode) => void
}

const options: { value: ThemeMode; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
  { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
  { value: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
]

export function Header({
  title,
  logo,
  searchQuery,
  onSearchChange,
  theme,
  mode,
  onModeChange,
}: HeaderProps) {
  const currentIcon = options.find((o) => o.value === mode)?.icon

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4">
      <div className="navbar-start gap-2">
        <img
          src={logo || '/favicon-512.png'}
          alt={title}
          className={`w-8 h-8 object-contain ${theme === 'light' ? 'invert' : ''}`}
        />
        <span className="text-xl font-bold">{title}</span>
      </div>

      <div className="navbar-end gap-2">
        <label className="input input-bordered flex items-center gap-2">
          <Search className="w-4 h-4 opacity-60" />
          <input
            type="text"
            placeholder="Search apps..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="grow"
          />
        </label>

        <div className="dropdown dropdown-end">
          <button type="button" tabIndex={0} className="btn btn-ghost gap-1">
            {currentIcon}
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>
          <ul className="dropdown-content menu bg-base-100 rounded-box shadow-lg w-36 p-1 mt-1">
            {options.map(({ value, label, icon }) => (
              <li key={value}>
                <button
                  type="button"
                  className={mode === value ? 'active' : ''}
                  onClick={() => onModeChange(value)}
                >
                  {icon} {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
