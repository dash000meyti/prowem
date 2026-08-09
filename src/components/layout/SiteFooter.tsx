import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-bg-1">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div>
          <p className="text-sm font-semibold tracking-[0.28em]">PROWEM</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Digital infrastructure for modern sports — events, clubs, live
            matches and fan communities on one data layer.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-orange">
            Platform
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/clubs">Clubs</Link>
            </li>
            <li>
              <Link href="/fans">Fans</Link>
            </li>
            <li>
              <Link href="/matches/live">Match Experience</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-orange">
            Company
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-orange">
            Resources
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>Documentation</li>
            <li>Support</li>
            <li className="pt-2">X · Instagram · LinkedIn</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted md:px-6">
        © 2026 PROWEM · Prototype for product strategy
      </div>
    </footer>
  );
}
