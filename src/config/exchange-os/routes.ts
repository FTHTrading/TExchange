// TROPTIONS Exchange OS — Route Definitions

export interface NavRoute {
  href: string;
  label: string;
  icon: string;
  description: string;
  badge?: string;
}

export const PRIMARY_NAV: NavRoute[] = [
  { href: "/exchange-os", label: "Home", icon: "home", description: "TROPTIONS Exchange OS landing" },
  { href: "/exchange-os/trade", label: "Trade", icon: "chart-candlestick", description: "XRPL swap, AMM, and order book" },
  { href: "/exchange-os/launch", label: "Launch", icon: "rocket", description: "Token launchpad wizard" },
  { href: "/exchange-os/earn", label: "Earn", icon: "coins", description: "Creator rewards, referrals, LP" },
  { href: "/exchange-os/x402", label: "x402 Services", icon: "zap", description: "Paid AI reports and premium APIs", badge: "Premium" },
  { href: "/exchange-os/tokens", label: "Tokens", icon: "list", description: "Discover and search tokens" },
  { href: "/exchange-os/wallet", label: "Wallet", icon: "wallet", description: "Wallet analytics and holdings" },
] as const;

export const SECONDARY_NAV: NavRoute[] = [
  { href: "/exchange-os/creator", label: "Creator", icon: "code", description: "Creator and developer console" },
  { href: "/exchange-os/sponsor", label: "Sponsor", icon: "megaphone", description: "Sponsor campaign builder" },
  { href: "/exchange-os/admin", label: "Admin", icon: "settings", description: "Operator dashboard" },
  { href: "/exchange-os/deck", label: "Sales Deck", icon: "presentation", description: "10-slide TROPTIONS pitch deck" },
  { href: "/exchange-os/signup", label: "Join", icon: "user-plus", description: "Partner signup" },
  { href: "/exchange-os/voice", label: "Voice", icon: "mic", description: "WWAI voice assistant" },
] as const;

export const MOBILE_NAV: NavRoute[] = [
  { href: "/exchange-os", label: "Home", icon: "home", description: "Home" },
  { href: "/exchange-os/trade", label: "Trade", icon: "chart-candlestick", description: "Trade" },
  { href: "/exchange-os/launch", label: "Launch", icon: "rocket", description: "Launch" },
  { href: "/exchange-os/earn", label: "Earn", icon: "coins", description: "Earn" },
  { href: "/exchange-os/tokens", label: "Tokens", icon: "list", description: "Tokens" },
] as const;
