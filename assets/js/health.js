function xhrSuccess() {
    this.callback.apply(this, this.arguments);
}

function xhrError() {
    this.callback.apply(this, this.arguments);
}


function httpGet(url, callback) {
    var client = new XMLHttpRequest();
    client.callback = callback;
    client.arguments = Array.prototype.slice.call(arguments, 2);
    client.open("GET", url, true);
    client.onload = xhrSuccess;
    client.onerror = xhrError;
    client.send(null);
}

function getHealthEndpoint(health) {
    return health.attributes.data.value
}

function checkHealth() {
    var healths = [];
    healths = document.getElementsByTagName("health");
    for (const health of healths) {
        isHealthy(health);
    }
}

function isHealthy(element) {
    var endpoint = getHealthEndpoint(element);
    httpGet(endpoint, showIcon, element);
}

function showIcon(element) {
    if (this.status == 200 ) {
        res = JSON.parse(this.responseText);
        if (res.status) {
            element.innerHTML = '<i class="fa fa-check-circle-o" aria-hidden="true" style="color:#6fb38a"></i>'
        } else {
            console.warn("Non true status")
        }
    } else {
        element.innerHTML = '<i class="fa fa-times-circle-o" aria-hidden="true" style="color:red"></i>'
    }
}

window.onload = checkHealth();