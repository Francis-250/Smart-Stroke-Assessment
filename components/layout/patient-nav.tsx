"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Stethoscope, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/patient", icon: Home },
  { label: "Assessment", href: "/patient/assessment", icon: Stethoscope },
  { label: "Alerts", href: "/patient/notifications", icon: Bell },
  { label: "Profile", href: "/patient/profile", icon: User },
];

export default function PatientNav({
  initials,
  unreadCount,
}: {
  initials?: string | null;
  unreadCount?: number;
}) {
  const path = usePathname();

  return (
    <>
      {/* Desktop — top */}
      <header className="hidden sm:flex h-14 sticky top-0 z-50 bg-background justify-center">
        <div className="w-full max-w-5xl px-4 sm:px-6 flex items-center justify-between border-b">
          <span className="text-sm font-semibold tracking-tight">
            StrokeCheck
          </span>

          <nav className="flex items-center gap-1">
            {links.map(({ label, href, icon: Icon }) => {
              const active = path === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                    active
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  )}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/patient/notifications" className="relative">
              <Bell size={17} className="text-muted-foreground" />
              {(unreadCount ?? 0) > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
              )}
            </Link>
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
              {initials ?? "--"}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile — bottom */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-background border-t flex">
        {links.map(({ label, href, icon: Icon }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 pt-3 pb-5 text-[11px] transition-colors",
                active
                  ? "text-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              <Icon size={20} strokeWidth={active ? 2 : 1.5} />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
