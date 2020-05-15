
let domains = [];
let failureHandledOnce = false;

async function loadDomains() {
    try {
        let response = await fetch('https://blocklist.cyberthreatcoalition.org/vetted/domain.txt');
        let txt = (await response.text());
        setList(txt);
    } catch (err) {
        handleFail()
    }
}

async function setList(res) {
    domains = res.split('\n');
    domains.splice(0, 1);
    await chrome.storage.local.set({ "domains": domains });
}

function handleFail() {
    try {
        chrome.storage.local.get(["domains"], function (result) {
            domains = result.domains;
        });
    } catch (err) {
        if (!failureHandledOnce) {
            loadDomains();
        }
    }
    failureHandledOnce = true;
}

chrome.webNavigation.onCompleted.addListener(function (tab) {
    if (tab.frameId == 0) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            let url = tabs[0].url;
            let parsedUrl = url.replace("https://", "")
                .replace("http://", "")
            let domain = parsedUrl.slice(0, parsedUrl.indexOf('/') == -1 ? parsedUrl.length : parsedUrl.indexOf('/'))
                .slice(0, parsedUrl.indexOf('?') == -1 ? parsedUrl.length : parsedUrl.indexOf('?'));
            if (domain.length < 3 || domain === null || domain === undefined) {
                return;
            } else if (domains.includes(domain)) {
                alert("Watch out! The Cyber Threat Coalition marked this domain (" + domain + ") as potentially malicious. Proceed with caution. Do as you wish, but I would recommend not sharing any data with this website.");
            } else {
                return;
            }
        });
    }
});

chrome.browserAction.onClicked.addListener(function (activeTab) {
    let projectUrl = "https://dvision.tech/leavemealone";
    chrome.tabs.create({ url: projectUrl });
});

loadDomains()
