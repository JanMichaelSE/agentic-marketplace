---
name: force-pod-restart-on-deploy
description: "Apply the Helm rollme pod-template annotation so a Kubernetes Deployment rolls pods on every deploy. Start with a specified application repository; optionally coordinate an explicitly authorized multi-repository rollout."
---

# Force Pod Restarts on Deploy

Author: Jessica Engel

Apply this narrowly scoped change in a specified application repository. A single-repository Helm change is the default workflow. Use GitHub Enterprise discovery only for an explicitly requested and authorized multi-repository rollout.

## Required YAML shape

Place `rollme` inside the Deployment's pod-template metadata annotations. The resulting block should look like this, with existing application-specific annotations retained:

```yaml
spec:
  template:
    metadata:
      annotations:
        rollme: {{ randAlphaNum 10 | quote }}
        format: "ecs"
        co.elastic.logs/multiline.type: {{ .Values.annotations.multiline_type }}
        co.elastic.logs/multiline.pattern: {{ .Values.annotations.multiline_pattern }}
        co.elastic.logs/multiline.negate: {{ .Values.annotations.multiline_negate | quote }}
        co.elastic.logs/multiline.match: {{ .Values.annotations.multiline_match | quote }}
      labels:
        {{- include "app.selectorLabels" . | nindent 8 }}
```

The exact existing labels and annotations may differ by chart. Preserve those values and add only:

```yaml
rollme: {{ randAlphaNum 10 | quote }}
```

Do not put `rollme` under the Deployment's top-level `metadata.annotations`, because that will not change the pod-template hash.

## Single-repository workflow

1. Confirm the target application repository, its local checkout, the intended chart scope, and whether any Git or remote action is requested. Inspect local repository instructions and preserve unrelated work.
2. Discover the applicable base branch for that repository. Prefer an explicitly supplied PR target; otherwise inspect the repository's configured default branch and its contribution guidance. Verify the selected base branch before using it. If it cannot be determined, stop and ask rather than guessing.
3. Work in the current checkout unless the user explicitly authorizes creating or switching to a task branch. Before an authorized branch action, confirm the worktree can be preserved safely; never overwrite user changes.
4. Locate every active Helm Deployment template used by the application, including Bootstrap or legacy chart paths. Add the annotation under `spec.template.metadata.annotations`.
5. Avoid changing values files, application code, unrelated annotations, or deployment settings. If a chart has multiple active deployment paths, update each path consistently and explain why.
6. Validate with `git diff --check`, Helm template rendering when Helm and required values are available, and focused chart or repository tests. Confirm the rendered Deployment contains `spec.template.metadata.annotations.rollme`.
7. Report the verified base branch, current or authorized task branch, changed files, validation commands, and blockers. Push only when the user explicitly authorizes that push. After an authorized push, report a comparison link using the verified base and task branches. Create a pull request only with separate explicit authorization.

## Optional multi-repository rollout

Use this section only when the user explicitly requests a cross-repository rollout and authorizes remote discovery. Read and follow the `github-enterprise-search` skill to identify repositories and active Helm Deployment templates. Treat each discovered repository as a separate single-repository workflow: rediscover its base branch, preserve unrelated work, and obtain explicit authorization before creating or switching branches, pushing, or creating a pull request.

Report results by repository, including repositories skipped or blocked. Do not infer a complete application list from local directories or perform GitHub Enterprise discovery by default.

## Safety and evidence

- The specified local checkout is the primary source for a single-repository change. When authorized for optional remote discovery, treat GitHub Enterprise as authoritative for repository names, organization membership, default branches, and whether the pattern already exists.
- Authorization for one consequential Git or remote action does not authorize another. Obtain explicit authorization for branch creation or switching, pushing, and pull-request creation separately.
- Before editing, search for existing `rollme` annotations and avoid duplicate keys.
- A missing chart, ambiguous deployment path, unknown base branch, protected or archived repository, or unavailable credentials is a reportable blocker; do not guess.