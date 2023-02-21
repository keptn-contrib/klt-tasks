// Description: This function triggers a github action

// Get Keptn context and variables
let sdata_raw = Deno.env.get("SECURE_DATA");
let params_raw = Deno.env.get("DATA");
let context = Deno.env.get("CONTEXT");
let params;
let sdata;
let contextdata;

if (sdata_raw != undefined) {
    sdata = JSON.parse(sdata_raw);
}

if (params_raw != undefined) {
    params = JSON.parse(params_raw);
}

if (context != undefined) {
    contextdata = JSON.parse(context);
}

// Define the URL to the github action
let url = "https://api.github.com/repos/" + params.username + "/" + params.repository + "/actions/workflows/" + params.job + "/dispatches"

// Define input parameters for the github action - replace this with your own parameters
let input = `"target_version": "${contextdata.workloadVersion}", "target_env": "${params.nextStage}"`

// Define the body of the request
let body = `{ "ref":"main", "inputs": { ${input} }}`

// Send the request
let resp = await fetch(url, {
    headers: {
        Accept: "application/vnd.github.everest-preview+json",
        Authorization: "token " + sdata.github_token,
    },
    body,
    method: "POST"
})

// Print the response
console.log(resp)