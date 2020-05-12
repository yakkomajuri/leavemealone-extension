
let domains = [];
let failureHandledOnce = false;

async function loadDomains() {
    $.ajax({
        type: 'get',
        url: 'https://blocklist.cyberthreatcoalition.org/vetted/domain.txt',
    }).done(async function (response) {
        try {
            let respArr = response.split('\n');
            domains = respArr.slice(1, respArr.length);
            await chrome.storage.local.set({ "domains": domains });
        } catch (err) {
            handleFail();
        }
    }).fail(() => {
        handleFail()
    });
}

async function handleFail() {
    try {
        let list = await chrome.storage.local.get(["domains"]);
        domains = list.domains;
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
                .slice(0, parsedUrl.indexOf('?') == -1 ? parsedUrl.length : parsedUrl.indexOf('?'))
            if (domains.includes(domain)) {
                alert("Watch out! The Cyber Threat Coalition marked this domain (" + domain + ") as potentially malicious. Proceed with caution. Do as you wish, but I would recommend not sharing any data with this website.");
            }
        });
    }
});

chrome.browserAction.onClicked.addListener(function (activeTab) {
    let projectUrl = "https://dvision.tech/leavemealone";
    chrome.tabs.create({ url: projectUrl });
});

loadDomains()
