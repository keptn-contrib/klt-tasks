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

console.log(sdata)

if (params_raw != undefined) {
    params = JSON.parse(params_raw);
}

if (context != undefined) {
    contextdata = JSON.parse(context);
}

// Define the URL to the gitlab pipeline
let url = "https://" + params.instance_url + "/api/v4/projects/" + params.project + "/trigger/pipeline"

// Define the body of the request
let body = new FormData
body.append("ref", params.ref)
body.append("token", sdata.gitlab_token)
body.append("variables[GLOBAL_VAR]", "Hello from Keptn!")

console.log(body)
// Send the request
let resp = await fetch(url, {
    body,
    method: "POST"
})

// Print the response
console.log(resp)