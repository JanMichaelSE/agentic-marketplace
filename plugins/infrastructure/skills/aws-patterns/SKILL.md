---
name: aws-patterns
description: Guidelines for AWS services, cloud patterns, Terraform, and infrastructure-as-code changes. Use when working with AWS services, cloud infrastructure, Terraform, or AWS-focused reliability, security, cost, monitoring, and service-selection decisions.
---

# AWS Patterns

Use these guidelines when working with AWS services, cloud architecture, or infrastructure-as-code changes.

## General AWS Principles

### Security
- Follow AWS Well-Architected Framework security pillar
- Use IAM roles instead of access keys where possible
- Apply principle of least privilege
- Enable encryption at rest and in transit
- Use VPCs for network isolation

### Cost Optimization
- Right-size resources
- Use appropriate pricing models (on-demand, reserved, spot)
- Set up billing alerts
- Clean up unused resources
- Consider serverless for variable workloads

### Reliability
- Design for failure
- Use multiple availability zones
- Implement health checks
- Set up automated recovery
- Test disaster recovery procedures

## Common Services

### Compute
- **Lambda**: Event-driven, short-duration tasks
- **ECS/EKS**: Container workloads
- **EC2**: Traditional server workloads

For Kubernetes workload configuration on EKS, see `kubernetes-patterns`.

### Storage
- **S3**: Object storage, static assets
- **EBS**: Block storage for EC2
- **EFS**: Shared file storage

### Database
- **RDS**: Managed relational databases
- **DynamoDB**: NoSQL, high-scale workloads
- **ElastiCache**: Caching layer

### Messaging
- **SQS**: Message queuing
- **SNS**: Pub/sub notifications
- **EventBridge**: Event routing

## Infrastructure as Code

### Best Practices
- Version control all infrastructure code
- Use consistent naming conventions
- Parameterize environment-specific values
- Document infrastructure decisions
- Review infrastructure changes like code

### CloudFormation/CDK/Terraform
- Organize stacks/modules logically
- Use outputs for cross-stack references
- Implement proper state management
- Test infrastructure changes in non-prod first

## Monitoring & Logging

- Use CloudWatch for metrics and logs
- Set up alarms for critical thresholds
- Implement distributed tracing (X-Ray)
- Centralize logs for analysis
- Create dashboards for visibility

## See Also

- Use `kubernetes-patterns` for Kubernetes workload configuration, including health probes, resource requests and limits, autoscaling, and Pod Disruption Budgets.
