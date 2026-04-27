//! TSN Node — devnet binary (simulation only).
//! No live chain, banking, token, or settlement execution is enabled.

use tsn_consensus::{BLOCK_TIME_TARGET_MS, FINALITY_THRESHOLD_PCT, MAX_VALIDATORS, MIN_VALIDATORS};

fn main() {
    println!("╔═══════════════════════════════════════════════════════════════╗");
    println!("║   Troptions Settlement Network (TSN) — Devnet Node v0.1.0    ║");
    println!("╠═══════════════════════════════════════════════════════════════╣");
    println!("║  SIMULATION ONLY — No live chain, banking, or settlement      ║");
    println!("║  execution is enabled in this scaffold build.                 ║");
    println!("╠═══════════════════════════════════════════════════════════════╣");
    println!("║  Consensus params:                                            ║");
    println!("║    min_validators:        {:<5}                               ║", MIN_VALIDATORS);
    println!("║    max_validators:        {:<5}                               ║", MAX_VALIDATORS);
    println!("║    block_time_target_ms:  {:<5}                               ║", BLOCK_TIME_TARGET_MS);
    println!("║    finality_threshold_%:  {:<5}                               ║", FINALITY_THRESHOLD_PCT);
    println!("╠═══════════════════════════════════════════════════════════════╣");
    println!("║  Crates loaded:                                               ║");
    println!("║    tsn-runtime, tsn-consensus, tsn-rpc, tsn-telemetry        ║");
    println!("║    tsn-bridge-xrpl, tsn-bridge-stellar, tsn-rln              ║");
    println!("║    tsn-agora, tsn-mbridge                                     ║");
    println!("╠═══════════════════════════════════════════════════════════════╣");
    println!("║  Cross-rail adapters:                                         ║");
    println!("║    XRPL, Stellar, RLN, Agorá, mBridge (all simulation-only)  ║");
    println!("╚═══════════════════════════════════════════════════════════════╝");
    println!();
    println!("TSN devnet node started in simulation mode. Exiting.");
}
