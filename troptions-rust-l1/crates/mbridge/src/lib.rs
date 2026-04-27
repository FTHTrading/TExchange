#![allow(dead_code)]

//! TSN mBridge Adapter — BIS mBridge multi-CBDC compatibility (simulation only).

use chrono::Utc;
use serde::{Deserialize, Serialize};
use tsn_state::{AuditEvent, AuditEventType};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum CentralBankRouteStatus {
    Pending,
    ValidatedByOrigin,
    ValidatedByDestination,
    Settled,
    Rejected,
    SimulationOnly,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FxQuoteRecord {
    pub quote_id: Uuid,
    pub source_currency: String,
    pub target_currency: String,
    pub mid_rate_string: String,
    pub quoted_at: chrono::DateTime<Utc>,
    pub simulation_only: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MbridgeStyleInstruction {
    pub instruction_id: Uuid,
    pub originating_central_bank: String,
    pub receiving_central_bank: String,
    pub amount_string: String,
    pub fx_quote: FxQuoteRecord,
    pub status: CentralBankRouteStatus,
    pub simulation_only: bool,
    pub created_at: chrono::DateTime<Utc>,
}

pub fn simulate_mbridge_instruction(
    originating_cb: &str,
    receiving_cb: &str,
    amount_string: &str,
    source_currency: &str,
    target_currency: &str,
    mid_rate: &str,
) -> (MbridgeStyleInstruction, AuditEvent) {
    let instruction_id = Uuid::new_v4();
    let fx_quote = FxQuoteRecord {
        quote_id: Uuid::new_v4(),
        source_currency: source_currency.to_string(),
        target_currency: target_currency.to_string(),
        mid_rate_string: mid_rate.to_string(),
        quoted_at: Utc::now(),
        simulation_only: true,
    };
    let instruction = MbridgeStyleInstruction {
        instruction_id,
        originating_central_bank: originating_cb.to_string(),
        receiving_central_bank: receiving_cb.to_string(),
        amount_string: amount_string.to_string(),
        fx_quote,
        status: CentralBankRouteStatus::SimulationOnly,
        simulation_only: true,
        created_at: Utc::now(),
    };
    let audit = AuditEvent::new(
        AuditEventType::CrossRailRouteSimulated,
        "tsn_mbridge_adapter",
        "mBridge-style multi-CBDC instruction simulated",
        serde_json::json!({
            "instruction_id": instruction_id.to_string(),
            "simulation_only": true,
        }),
    );
    (instruction, audit)
}
