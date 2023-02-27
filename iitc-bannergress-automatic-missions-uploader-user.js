// ==UserScript==
// @name           IITC Plugin: Bannergress automatic missions uploader
// @id             missions-plugin-private
// @category       Misc
// @version        0.2
// @updateURL      https://github.com/KirDE/iitc-plugin-bannergress-automatic-upload/raw/main/iitc-bannergress-automatic-missions-uploader-user.js
// @downloadURL    https://github.com/KirDE/iitc-plugin-bannergress-automatic-upload/raw/main/iitc-bannergress-automatic-missions-uploader-user.js
// @author         KirillDE
// @description    Automatically uploads new found missions to bannergress after area scan or opening mission link.
// @match          https://intel.ingress.com/*
// @match          https://intel-x.ingress.com/*
// @grant          none
// ==/UserScript==


function wrapper(pluginInfo) {
    uploadMissions();
}

function uploadMissions() {
    jQuery(".bannerIndexer-mission-status-new").trigger('click');
    setTimeout(uploadMissions, 1000);
}

((() => {
  const pluginInfo = {};
  if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) {
    pluginInfo.script = {
      version: GM_info.script.version,
      name: GM_info.script.name,
      description: GM_info.script.description,
    };
  }
  // Greasemonkey. It will be quite hard to debug
  if (typeof unsafeWindow !== 'undefined' || typeof GM_info === 'undefined' || GM_info.scriptHandler != 'Tampermonkey') {
    // inject code into site context
    const script = document.createElement('script');
    script.appendChild(document.createTextNode(`(${wrapper})(${JSON.stringify(pluginInfo)});`));
    (document.body || document.head || document.documentElement).appendChild(script);
  } else {
    // Tampermonkey, run code directly
    wrapper(pluginInfo);
  }
})());
