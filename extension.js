
let domains = [];
let failureHandledOnce = false;

/*
* GET Request to retrieve list of domains
* Runs once when the browser is first opened
* If the request fails, search for the list of domains in chrome.storage
*/
async function loadDomains() {
    $.ajax({
        type: 'get',
        url: 'https://blocklist.cyberthreatcoalition.org/vetted/domain.txt',
    }).done(async function (response) {
        try {
            let respArr = response.split('\n');
            domains = respArr.slice(1, respArr.length);
            // Uncomment line below to test the extension without having to access a malicious website
            // domains[1289] = "example.com";  
            await chrome.storage.local.set({ "domains": domains });
        } catch (err) {
            handleFail();
        }
    }).fail(() => {
        handleFail()
    });
}

// Try to pull a list from chrome.storage
// Otherwise try the request once more
async function handleFail() {
    try {
        let list = await chrome.storage.local.get(["domains"]);
        domains = list.domains;
    } catch (err) {
        if (!failureHandledOnce) {
            /*
            Could load default domains (hardcoded) here 
            but decided not to because I wanted to keep 
            the extension lightweight and the list has tens 
            of thousands of domains. Instead opted to try the 
            request once more then stop. 
            */
            loadDomains();
        }
    }
    failureHandledOnce = true;
}

// Every time a new tab is opened
chrome.webNavigation.onCompleted.addListener(function (tab) {
    // Prevents code from running on multiple frames for the same webpage
    if (tab.frameId == 0) {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            let url = tabs[0].url;
            // Get the domain from the full URL
            let parsedUrl = url.replace("https://", "")
                .replace("http://", "")
            let domain = parsedUrl.slice(0, parsedUrl.indexOf('/') == -1 ? parsedUrl.length : parsedUrl.indexOf('/'))
                .slice(0, parsedUrl.indexOf('?') == -1 ? parsedUrl.length : parsedUrl.indexOf('?'))
            // Check if the domain is in the list
            if (domains.includes(domain)) {
                alert("Watch out! The Cyber Threat Coalition marked this domain (" + domain + ") as potentially malicious. Proceed with caution. Do as you wish, but I would recommend not sharing any data with this website.");
            }
        });
    }
});

// Redirect icon clicks to the project webpage
chrome.browserAction.onClicked.addListener(function (activeTab) {
    let projectUrl = "https://dvision.tech/leavemealone";
    chrome.tabs.create({ url: projectUrl });
});

loadDomains()
