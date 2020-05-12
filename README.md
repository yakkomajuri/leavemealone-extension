# "LeaveMeAlone" Browser Extension

"Leave Me Alone" is a lightweight browser extension that will alert you if you are entering a website marked as potentially malicious by the [Cyber Threat Coalition](https://www.cyberthreatcoalition.org/). The extension will not do anything at all if you never visit a website on the list, and will simply warn you to stay away if you happen to enter one of these websites.

In fact, the best case scenario is that you download this extension and never hear from it again. However, it is there, never bothering you, never creating any problems, ready to help that one time you really need it. Because one mistake is enough: if you share your data with just one malicious website, that could cause you headaches for a lifetime. Stay safe and happy browsing!

*MIT License so do as you please - Would appreciate credits / a reference to the origin, but that's up to you*

# Releases

### 0.0.1 (Latest version approved by the Chrome Web Store)

  - Basic functionality to get the list of malicious domains and check if you're on one of them
 
### 0.0.2 (Pending Review on the Web Store)

  - Implements a fallback mechanism for failed GET requests
  - Includes the domain marked as malicious in the alert
  
### 0.0.3 (Ready for release)

  - Switches jQuery AJAX for Fetch API (~20% decrease in extension size)
  - Fixes incorrect implementation of `chrome.storage.local.get`

# For Developers

**Want the latest release before it comes out on the Chrome Web Store?** 

1. Clone the corresponding version branch.
*Latest stable version not on the Web Store is v0.0.3*

2. Go to "Extensions" on any Chromium-based browser

3. Enable "Developer Mode"

4. Click "Load Unpacked" and select the root directory of the cloned repo


**Want to contribute?** 

  * Issues and PRs are most welcome
  * Clone and submit PRs only to the `dev` branch. Here's an overview of the branches:
    * `master` hosts the latest version approved by the Chrome Web Store, with comments left in the code
    * Version branches (`0.0.2`, `0.0.3`, etc...) host versions that are ready for Chrome Web Store release
    * `dev` hosts the branch where the magic happens. It may be unstable, and once a new version is in order, it will be forked from `dev` and become a standalone branch.

