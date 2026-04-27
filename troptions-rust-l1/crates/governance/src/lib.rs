#![allow(dead_code)]

//! TSN Governance — stub crate.
//! HotStuff-style BFT governance proposal submission (simulation only).

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum ProposalStatus {
    Draft,
    Submitted,
    Voting,
    Approved,
    Rejected,
    Vetoed,
    Expired,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GovernanceProposal {
    pub proposal_id: Uuid,
    pub title: String,
    pub description: String,
    pub proposer_id: Uuid,
    pub status: ProposalStatus,
    pub simulation_only: bool,
    pub quorum_threshold_pct: u8,
    pub approval_threshold_pct: u8,
    pub submitted_at: DateTime<Utc>,
    pub voting_ends_at: Option<DateTime<Utc>>,
}

pub fn submit_proposal_simulation(
    proposer_id: Uuid,
    title: &str,
    description: &str,
) -> GovernanceProposal {
    GovernanceProposal {
        proposal_id: Uuid::new_v4(),
        title: title.to_string(),
        description: description.to_string(),
        proposer_id,
        status: ProposalStatus::Draft,
        simulation_only: true,
        quorum_threshold_pct: 51,
        approval_threshold_pct: 67,
        submitted_at: Utc::now(),
        voting_ends_at: None,
    }
}
