#![allow(dead_code)]

//! TSN Agorá Adapter — BIS Agorá-style wholesale settlement compatibility (simulation only).

use chrono::Utc;
use serde::{Deserialize, Serialize};
use tsn_state::{AuditEvent, AuditEventType};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AgoraStyleSettlement {
    pub settlement_id: Uuid,
    pub originating_bank: String,
    pub correspondent_bank: String,
    pub amount_string: String,
    pub currency_code: String,
    pub fx_rate_string: String,
    pub simulation_only: bool,
    pub created_at: chrono::DateTime<Utc>,
}

pub fn simulate_agora_settlement(
    originating_bank: &str,
    correspondent_bank: &str,
    amount_string: &str,
    currency_code: &str,
) -> (AgoraStyleSettlement, AuditEvent) {
    let settlement_id = Uuid::new_v4();
    let settlement = AgoraStyleSettlement {
        settlement_id,
        originating_bank: originating_bank.to_string(),
        correspondent_bank: correspondent_bank.to_string(),
        amount_string: amount_string.to_string(),
        currency_code: currency_code.to_string(),
        fx_rate_string: "1.0".to_string(), // placeholder
        simulation_only: true,
        created_at: Utc::now(),
    };
    let audit = AuditEvent::new(
        AuditEventType::CrossRailRouteSimulated,
        "tsn_agora_adapter",
        "Agorá-style wholesale settlement simulated",
        serde_json::json!({
            "settlement_id": settlement_id.to_string(),
            "simulation_only": true,
        }),
    );
    (settlement, audit)
}
