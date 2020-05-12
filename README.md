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

  
