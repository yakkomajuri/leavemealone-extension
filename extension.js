
let domains = [];
let failureHandledOnce = false;

// Use Fetch API to pull list of domains from CTC website
async function loadDomains() {
    try {
        let response = await fetch('https://blocklist.cyberthreatcoalition.org/vetted/domain.txt');
        let txt = await response.text()
        setList(txt);
    } catch (err) {
        handleFail()
    }
}

// Sets the domains list in a global variable + chrome.storage
async function setList(res) {
    domains = res.split('\n');
    // Uncomment next line to test the extension
    // domains[10387] = "example.com"
    await chrome.storage.local.set({ "domains": domains });
}

// Runs in case the GET request fails the first time
function handleFail() {
    try {
        // Fallback mechanism is to take the previously-stored list from chrome.storage.local
        chrome.storage.local.get(["domains"], function(result) {
            domains = result.domains;
        });        
    } catch (err) {
        // Only runs once
        if (!failureHandledOnce) {
            loadDomains();
        }
    }
    failureHandledOnce = true;
}

// Checks when a new tab is opened
chrome.webNavigation.onCompleted.addListener(function (tab) {
    // Run only on the first frame for a webpage (i.e. once)
    if (tab.frameId == 0) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            let url = tabs[0].url;
            // Get the domain from the URL
            let parsedUrl = url.replace("https://", "").replace("http://", "")
            let domain = parsedUrl.slice(0, parsedUrl.indexOf('/') == -1 ? parsedUrl.length : parsedUrl.indexOf('/'))
                .slice(0, parsedUrl.indexOf('?') == -1 ? parsedUrl.length : parsedUrl.indexOf('?'))
            // Check if domain is in the list and alert if it is
            if (domains.includes(domain)) {
                alert("Watch out! The Cyber Threat Coalition marked this domain (" + domain + ") as potentially malicious. Proceed with caution. Do as you wish, but I would recommend not sharing any data with this website.");
            }
        });
    }
});

// Clicking the icon takes user to the project website
chrome.browserAction.onClicked.addListener(function (activeTab) {
    let projectUrl = "https://dvision.tech/leavemealone";
    chrome.tabs.create({ url: projectUrl });
});

loadDomains()
