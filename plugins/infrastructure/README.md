# Infrastructure

Installable plugin for AWS cloud, Kubernetes, Terraform, and Helm rollout infrastructure guidance.

## Skills

| Skill | Purpose | When to Use |
|------|---------|-------------|
| **aws-patterns** | AWS cloud services, architecture, monitoring, and infrastructure-as-code guidance | AWS services, cloud infrastructure, Terraform, or AWS architecture decisions |
| **kubernetes-patterns** | Kubernetes workload configuration guidance for probes, resources, autoscaling, and disruption budgets | Kubernetes manifests, Helm values, or workload availability and scaling work |
| **force-pod-restart-on-deploy** | Apply Helm `rollme` pod-template annotations with explicit Git authorization | Ensuring a Deployment rolls pods on each deploy |

## Installation

Install from the `agentic-marketplace` marketplace:

```bash
# Auggie
auggie plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
auggie plugin install infrastructure@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `infrastructure` from `/plugins` inside Codex
```
