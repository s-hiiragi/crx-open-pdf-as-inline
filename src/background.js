chrome.webRequest.onHeadersReceived.addListener((details) => {
    for (let i = 0; i < details.responseHeaders.length; i++) {
        const header = details.responseHeaders[i];
        if (header.name === 'Content-disposition') {
            if (/^attachment;\s*filename=.*\.pdf(?:"|$)/.test(header.value)) {
                header.value = 'inline';
                return {responseHeaders: details.responseHeaders};
            }
        }
    }
}, {urls: ['*://*/*'], types: ['main_frame']}, ['responseHeaders', 'blocking']);
