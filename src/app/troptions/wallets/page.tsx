import Image from "next/image";
import { DEMO_WALLET_SHOWCASE } from "@/content/troptions/demoWalletShowcaseRegistry";

export const metadata = {
  title: "Troptions Wallet Showcase",
  description: "Demo inventory of local XRPL and Stellar wallet patterns, asset types, and purposes across Troptions systems.",
};

const assetTypeCopy: Record<string, string> = {
  stablecoin: "Stablecoin",
  iou: "XRPL IOU",
  "regulated-asset": "Regulated Asset",
  lp: "LP / Liquidity",
  nft: "NFT / Evidence",
  token: "Utility Token",
};

export default function TroptionsWalletShowcasePage() {
  return (
    <main className="te-page">
      <div className="te-wrap space-y-6">
        <header className="te-panel">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="te-kicker">Wallet Demonstration</p>
              <h1 className="te-heading">Local XRP and Stellar wallet showcase</h1>
              <p className="te-subheading">
                This page uses wallet references and capability notes found in your local Troptions repos to show how the platform can present different wallet systems without importing private keys.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
              <Image
                src="/troptions/xrpl-ledger-horizontal-black.svg"
                alt="XRPL Ledger"
                width={220}
                height={55}
                className="h-auto w-[180px] md:w-[220px]"
                priority
              />
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Official XRPL brand asset applied to the live wallet and ledger verification section.
              </p>
            </div>
          </div>
        </header>

        <section className="te-panel">
          <p className="te-kicker">Cloudflare And Domain</p>
          <div className="te-grid-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-900">Canonical Domain</h2>
              <p className="mt-2 break-all text-sm leading-7 text-slate-600">https://troptions.unykorn.org</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">Root metadata now resolves against the production hostname so canonical links and deploy-time URLs point at the Cloudflare custom domain.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-900">Worker Route</h2>
              <p className="mt-2 break-all text-sm leading-7 text-slate-600">troptions.unykorn.org</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">The repo already includes this hostname as a Cloudflare custom domain in the Wrangler config.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-900">API Route</h2>
              <p className="mt-2 break-all text-sm leading-7 text-slate-600">api.troptions.unykorn.org</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">The worker config already reserves the API hostname for the Troptions Cloudflare deployment surface.</p>
            </article>
          </div>
        </section>

        <section className="te-panel">
          <p className="te-kicker">Live AMM And Explorer References</p>
          <div className="te-grid-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-900">XRPL AMM Pairs From Local Docs</h2>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-700">
                {[
                  "TROPTIONS / XRP",
                ].map((pair) => (
                  <span key={pair} className="rounded-full border border-slate-300 px-3 py-1">
                    {pair}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="https://livenet.xrpl.org/" target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">Open XRPL Ledger</a>
                <a href="https://xrpscan.com/" target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">Open XRPScan</a>
              </div>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-900">Stellar AMM Pairs From Local Docs</h2>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-700">
                {[
                  "TROPTIONS / XLM",
                ].map((pair) => (
                  <span key={pair} className="rounded-full border border-slate-300 px-3 py-1">
                    {pair}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="https://stellar.expert/explorer/public" target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">Open Stellar Expert</a>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">The local docs mark these 9 pools as live. The source material does not expose pool IDs, so this page links to the official explorers for ledger-level verification rather than inventing pool URLs.</p>
            </article>
          </div>
        </section>

        <section className="te-panel">
          <p className="te-kicker">What To Look For</p>
          <div className="te-grid-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-900">Stablecoins</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">TROPTIONS shows how a wallet view can distinguish settlement tokens, regulated mirror assets, and on-ramp balances.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-900">LP And Liquidity</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">XRPL and Stellar liquidity roles show the difference between an operational treasury wallet and an AMM provider or distribution wallet.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-900">NFT And Proof</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">Evidence markers and dual-chain proof flows show where attestation NFTs and Stellar `manage_data` entries belong inside the product.</p>
            </article>
          </div>
        </section>

        <section className="te-grid-2" aria-label="wallet-showcase-grid">
          {DEMO_WALLET_SHOWCASE.map((wallet) => (
            <article key={wallet.id} className="te-panel">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="te-kicker">{wallet.network}</p>
                  <h2 className="text-2xl font-semibold text-slate-900">{wallet.label}</h2>
                </div>
                <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                  {wallet.walletType}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-700">{wallet.summary}</p>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Source</p>
                <p className="mt-2 text-sm text-slate-700">{wallet.source}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Public Address</p>
                <p className="mt-2 break-all font-mono text-sm text-slate-700">{wallet.address ?? "Role documented locally; public key not surfaced in the source docs."}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {wallet.explorerLinks.map((link) => (
                    <a key={`${wallet.id}-${link.label}`} href={link.url} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {wallet.poolReferences && wallet.poolReferences.length > 0 && (
                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">AMM / LP References</p>
                  <div className="mt-3 space-y-3">
                    {wallet.poolReferences.map((pool) => (
                      <div key={`${wallet.id}-${pool.pair}`} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{pool.pair}</p>
                          <p className="mt-1 text-sm text-slate-600">{pool.network} pool documented locally as {pool.status.toLowerCase()}.</p>
                        </div>
                        <a href={pool.verificationUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                          Verify Live Rail
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 space-y-3">
                {wallet.assets.map((asset) => (
                  <div key={`${wallet.id}-${asset.symbol}`} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-slate-900">{asset.symbol}</h3>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                        {assetTypeCopy[asset.assetType]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{asset.purpose}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
