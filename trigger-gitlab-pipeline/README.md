# Trigger GitLab Pipeline

This task triggers a GitLab Action via the GitLab API.

You can add user-defined params in the `parameters` section of the task definition and define input variables for the GitHub action in the `input` variable in the function script.

## Required Parameters
| Parameter    | Description                                |
|--------------|--------------------------------------------|
| project      | The project name                           |
| ref          | The branch or tag to trigger the action on |
| instance_url | The url of the gitlab instance             |

## Required Secure Parameters
```shell
export TOKEN=<your gitlab token>
kubectl create secret generic gitlab --from-literal=SECURE_DATA='{"gitlab_token": "'${TOKEN}'"}'
```

## Usage in KeptnTaskDefinition
````yaml
# This task refers to an example to change a configuration via a GitHub Action

apiVersion: lifecycle.keptn.sh/v1alpha2
kind: KeptnTaskDefinition
metadata:
  name: gitlab-trigger
spec:
  function:
    httpRef:
      url: https://raw.githubusercontent.com/keptn-contrib/klt-tasks/main/trigger-gitlab-pipeline/function.ts
    parameters:
      map:
        project: project-id
        ref: main
        instance_url: gitlab.com
    secureParameters:
      secret: gitlab
````