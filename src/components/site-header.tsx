import { Link } from "@tanstack/react-router";
import { Menu, Search, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const nav = [
  { to: "/explore", label: "Explore" },
  { to: "/moods", label: "Moods" },
  { to: "/listen", label: "Listen" },
  { to: "/poets", label: "Poets" },
  { to: "/collections", label: "Collections" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { loggedIn, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5">
        <Link
          to="/"
          className="font-display text-2xl tracking-tight"
          activeProps={{ className: "font-bold" }}
        >
          Versify<span className="text-accent">.</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "font-bold text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button
            aria-label="Search"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Search className="size-4" />
          </button>
          {loggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Account"
              >
                <User className="size-5" />
              </Link>
              <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
                <AlertDialogTrigger asChild>
                  <button
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Log out"
                  >
                    <LogOut className="size-5" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You can always sign back in. Your drafts and saved poems will be here when you return.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        logout();
                      }}
                    >
                      Log out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              Sign in
            </Link>
          )}
          {!loggedIn && (
            <Link
              to="/signup"
              className="hidden rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              Start writing
            </Link>
          )}
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="animate-rise border-t border-border bg-card px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {[...nav, { to: "/dashboard", label: "Dashboard" }].map(
              (n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl"
                  activeProps={{ className: "font-bold" }}
                >
                  {n.label}
                </Link>
              ),
            )}
            {!loggedIn && (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="font-display text-2xl"
                activeProps={{ className: "font-bold" }}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}