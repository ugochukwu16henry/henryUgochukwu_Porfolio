import { Moon, Sun } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "henry-portfolio:theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

function getThemeFromDocument(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getThemeFromDocument);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors in privacy-restricted environments.
    }
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export function ThemeToggle({ variant = "floating" }: { variant?: "floating" | "inline" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const className =
    variant === "floating"
      ? "fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full border border-hairline bg-background/90 px-3 py-2 text-xs font-mono uppercase tracking-widest text-foreground shadow-elegant backdrop-blur-md transition hover:border-primary hover:text-primary"
      : "inline-flex items-center gap-2 rounded-full border border-hairline bg-background/80 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      onClick={toggleTheme}
      className={className}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      {isDark ? "Day" : "Night"}
    </button>
  );
}

export function ThemeInitScript() {
  const code = `(() => {
  try {
    const key = "${THEME_STORAGE_KEY}";
    const stored = localStorage.getItem(key);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored === "light" || stored === "dark" ? stored : (prefersDark ? "dark" : "light");
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch {}
})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
