function applyColors(colors) {
    // 全局注入颜色样式
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        .notion-sidebar { background-color: ${colors.sidebar.main};}
        #notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(1) { background-color: ${colors.sidebar.user} ; }
        #notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(2) { 
            background-color: ${colors.sidebar.option}; 
            padding-left: 8px !important; 
            padding-right: 8px !important; 
            margin-left: 0 !important; 
            margin-right: 0 !important; 
        }
        #notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(4) > div > div:nth-child(2) > div:nth-child(1) { background-color: ${colors.sidebar.item} ; }
        #notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(5) { background-color: ${colors.sidebar.footer} ; }

        .notion-topbar { background-color: ${colors.topbar.main} ; }
        #notion-app > div > div:nth-child(1) > div > div:nth-child(2) > header > div.notion-topbar > div > div > div:nth-child(1) { background-color: ${colors.topbar.option} ; }
        div.notranslate.shadow-cursor-breadcrumb { background-color: ${colors.topbar.path} ; }
        .notion-topbar-action-buttons { background-color: ${colors.topbar.share} ; }

        .notion-frame { background-color: ${colors.background} ; }
        .notion-cursor-listener > :nth-child(3){ background-color: ${colors.inbox} ; }
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