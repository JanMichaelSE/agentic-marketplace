# Infrastructure

Installable plugin for AWS cloud, Kubernetes, and Terraform infrastructure guidance.

## Skills

| Skill | Purpose | When to Use |
|------|---------|-------------|
| **aws-patterns** | AWS cloud services, architecture, monitoring, and infrastructure-as-code guidance | AWS services, cloud infrastructure, Terraform, or AWS architecture decisions |
| **kubernetes-patterns** | Kubernetes workload configuration guidance for probes, resources, autoscaling, and disruption budgets | Kubernetes manifests, Helm values, or workload availability and scaling work |

## Installation

Install from the `agentic-marketplace` marketplace:

```bash
# Claude Code
claude plugin marketplace add JanMichaelSE/agentic-marketplace
claude plugin install infrastructure@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `infrastructure` from `/plugins` inside Codex
```
