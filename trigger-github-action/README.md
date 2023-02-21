# Trigger GitHub Action

This task triggers a GitHub Action via the GitHub API.

You can add user-defined params in the `parameters` section of the task definition and define input variables for the GitHub action in the `input` variable in the function script.

## Required Parameters
| Parameter  | Description                                                    |
|------------|----------------------------------------------------------------|
| repository | The repository name                                            |
| username   | The username of the repository owner                           |
| job        | The name of the job to trigger (Filename in .github/workflows) |
| ref        | The branch or tag to trigger the action on                     |

## Required Secure Parameters
```shell
export TOKEN=<your github token>
kubectl create secret generic github --from-literal=SECURE_DATA='{"github_token": "'${TOKEN}'"}'
```

## Usage in KeptnTaskDefinition
````yaml
# This task refers to an example to change a configuration via a GitHub Action

apiVersion: lifecycle.keptn.sh/v1alpha2
kind: KeptnTaskDefinition
metadata:
  name: promote-staging
spec:
  function:
    httpRef:
      url: https://raw.githubusercontent.com/keptn-contrib/klt-tasks/main/trigger-github-action/function.ts
    parameters:
      map:
        nextStage: staging
        username: thschue
        repository: easy-promotion-example
        job: promotion.yaml
        ref: main
    secureParameters:
      secret: github
````