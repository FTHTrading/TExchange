#![allow(dead_code)]

//! TSN RLN Adapter — Regulated Liability Network compatibility (simulation only).

use chrono::Utc;
use serde::{Deserialize, Serialize};
use tsn_state::{AuditEvent, AuditEventType};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum RegulatedLiabilityType {
    BankDeposit,
    CentralBankMoney,
    EMoney,
    WholesaleCbdc,
    RetailCbdc,
    InstitutionalSettlement,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RegulatedLiability {
    pub liability_id: Uuid,
    pub liability_type: RegulatedLiabilityType,
    pub issuing_institution: String,
    pub amount_string: String,
    pub currency_code: String,
    pub simulation_only: bool,
    pub regulated: bool,
    pub created_at: chrono::DateTime<Utc>,
}

pub fn simulate_rln_transfer(
    liability: &RegulatedLiability,
    destination_institution: &str,
) -> (RegulatedLiability, AuditEvent) {
    let settled = RegulatedLiability {
        liability_id: Uuid::new_v4(),
        simulation_only: true,
        ..liability.clone()
    };
    let audit = AuditEvent::new(
        AuditEventType::CrossRailRouteSimulated,
        "tsn_rln_adapter",
        &format!("RLN transfer simulated → {}", destination_institution),
        serde_json::json!({
            "source_liability_id": liability.liability_id.to_string(),
            "destination_institution": destination_institution,
            "simulation_only": true,
        }),
    );
    (settled, audit)
}
