function applyColors(colors) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        .notion-sidebar-container { background-color: ${colors.sidebar.main} !important; }
        #notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(1) { background-color: ${colors.sidebar.user} !important; }
        #notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(4) > div > div:nth-child(2) > div:nth-child(1) { background-color: ${colors.sidebar.item} !important; }
        #notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(5) { background-color: ${colors.sidebar.footer} !important; }
        .notion-topbar { background-color: ${colors.topbar.main} !important; }
        #notion-app > div > div:nth-child(1) > div > div:nth-child(2) > header > div.notion-topbar > div > div > div:nth-child(1) { background-color: ${colors.topbar.option} !important; }
        div.notranslate.shadow-cursor-breadcrumb { background-color: ${colors.topbar.path} !important; }
        .notion-topbar-action-buttons { background-color: ${colors.topbar.share} !important; }
        .notion-frame { background-color: ${colors.background} !important; }
    `;
    document.head.appendChild(style);
}

// 监听页面加载
window.addEventListener('load', () => {
    chrome.storage.sync.get('notionColors', (data) => {
        const colors = data.notionColors;
        if (colors) {
            applyColors(colors);
        }
    });
});