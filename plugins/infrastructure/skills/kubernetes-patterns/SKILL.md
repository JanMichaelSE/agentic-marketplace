---
name: kubernetes-patterns
description: Guidelines for Kubernetes workload configuration including health probes, resource requests and limits, autoscaling, and Pod Disruption Budgets. Use when working with Kubernetes manifests, Helm values, or container runtime availability and scaling decisions.
---

# Kubernetes Patterns

Use these guidelines when working with Kubernetes manifests, Helm values, or workload runtime behavior.

## Health Probes

Configure all three probe types for production workloads:

| Probe Type | Purpose | Failure Action |
|------------|---------|----------------|
| **Startup** | Wait for app initialization | Block other probes |
| **Readiness** | Accept traffic when ready | Remove from load balancer |
| **Liveness** | Detect hung processes | Restart container |

**Configuration Example**:
```yaml
startupProbe:
  tcpSocket:
    port: 8080
  failureThreshold: 300
  periodSeconds: 1
  successThreshold: 1

readinessProbe:
  tcpSocket:
    port: 8080
  initialDelaySeconds: 0
  periodSeconds: 30

livenessProbe:
  tcpSocket:
    port: 8080
  initialDelaySeconds: 0
  periodSeconds: 30
```

**Best Practices**:
- Use `startupProbe` with high `failureThreshold` for slow-starting apps
- Keep `periodSeconds` reasonable (30s) to avoid excessive load
- Use `tcpSocket` for basic connectivity, `httpGet` for deeper health checks
- Consider separate `/health` and `/ready` endpoints

## Resource Allocation

Always specify both requests and limits:

```yaml
resources:
  requests:
    memory: "1Gi"
    cpu: "200m"
  limits:
    memory: "2Gi"
    cpu: "500m"
```

| Resource | Requests | Limits | Notes |
|----------|----------|--------|-------|
| Memory | Baseline usage | Max allowed | Set equal to prevent OOM issues |
| CPU | Guaranteed allocation | Burst capacity | Allow burst for spikes |

**Guidelines**:
- Requests = guaranteed resources (affects scheduling)
- Limits = maximum allowed (triggers throttling/OOM)
- Memory limits should often equal requests (avoid OOM kills)
- CPU can have higher limits for burst capacity
- Right-size based on actual usage metrics

## Autoscaling

```yaml
autoscaling:
  enabled: true
  minReplicas: 1
  maxReplicas: 5
  targetCPUUtilizationPercentage: 80
  targetMemoryUtilizationPercentage: 80
```

**Considerations**:
- Set `minReplicas` based on availability requirements
- Configure `maxReplicas` based on cost and capacity
- Use Pod Disruption Budgets for availability during updates

## Pod Disruption Budgets (PDB)

Ensure high availability during cluster updates and node maintenance. PDBs limit the number of pods that can be simultaneously unavailable.

**Values Configuration** (`values.yaml`):
```yaml
replicaCount: 2

disruptionBudget:
  minAvailable: 1
  maxUnavailable: 1
```

**PDB Template** (`templates/pdb.yaml`):
```yaml
{{- if gt (int .Values.replicaCount) 1 }}
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: {{ include "service-name.name" . }}-pdb
spec:
  maxUnavailable: {{ .Values.disruptionBudget.maxUnavailable }}
  selector:
    matchLabels:
      app.kubernetes.io/name: {{ include "service-name.name" . }}
{{- end }}
```

**Guidelines**:
- Only create PDB when `replicaCount > 1` (single replicas can't have disruption budgets)
- Use `maxUnavailable: 1` for most services (allows rolling updates)
- Use `minAvailable` when you need guaranteed minimum capacity
- PDBs protect against voluntary disruptions (node drains, cluster upgrades)
- PDBs do NOT protect against involuntary disruptions (hardware failures)

| Setting | Use Case |
|---------|----------|
| `maxUnavailable: 1` | Standard services, allows one pod down during updates |
| `minAvailable: 1` | Critical services, ensures at least one pod always running |
| `minAvailable: 50%` | Large deployments, percentage-based availability |

## See Also

- Use `aws-patterns` for AWS service selection, Terraform and broader infrastructure-as-code practices, and AWS monitoring and logging guidance.