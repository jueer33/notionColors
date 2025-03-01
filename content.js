/**
 * 应用颜色到 Notion 页面
 * @param {Object} colors - 颜色配置对象
 */
function applyColors(colors) {
    // 应用侧边栏颜色
    const sidebar = document.querySelector('.notion-sidebar');
    const sidebarUser = document.querySelector('#notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(1)');
    const sidebarOption = document.querySelector("#notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(2)");
    const sidebarItem = document.querySelector("#notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(4) > div > div:nth-child(2) > div:nth-child(1)");
    const sidebarFooter = document.querySelector('#notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(5)');

    if (sidebar) sidebar.style.backgroundColor = colors.sidebar.main;
    if (sidebarUser) sidebarUser.style.backgroundColor = colors.sidebar.user;
    if (sidebarOption) {
        sidebarOption.style.backgroundColor = colors.sidebar.option;
        sidebarOption.style.paddingLeft = '8px';
        sidebarOption.style.paddingRight = '8px';
        sidebarOption.style.marginLeft = '0';
        sidebarOption.style.marginRight = '0';
    }
    if (sidebarItem) sidebarItem.style.backgroundColor = colors.sidebar.item;
    if (sidebarFooter) sidebarFooter.style.backgroundColor = colors.sidebar.footer;

    // 应用顶部栏颜色
    const topbar = document.querySelector('.notion-topbar');
    const topbarOption = document.querySelector('#notion-app > div > div:nth-child(1) > div > div:nth-child(2) > header > div.notion-topbar > div > div > div:nth-child(1)');
    const topbarPath = document.querySelector('div.notranslate.shadow-cursor-breadcrumb');
    const topbarShare = document.querySelector('.notion-topbar-action-buttons');

    if (topbar) topbar.style.backgroundColor = colors.topbar.main;
    if (topbarOption) topbarOption.style.backgroundColor = colors.topbar.option;
    if (topbarPath) topbarPath.style.backgroundColor = colors.topbar.path;
    if (topbarShare) topbarShare.style.backgroundColor = colors.topbar.share;

    // 应用背景颜色
    const background = document.querySelector('.notion-frame');
    if (background) background.style.backgroundColor = colors.background;

    // 应用 Inbox 颜色
    const inbox = document.getElementById('test-customer-io')?.previousElementSibling;
    if (inbox) inbox.style.backgroundColor = colors.inbox;
}

/**
 * 监听 Notion 页面加载完成，应用颜色配置
 */
function observePageLoad() {
    // 使用 MutationObserver 监听页面变化，确保颜色应用时页面已经渲染完成
    const observer = new MutationObserver(() => {
        chrome.storage.sync.get('notionColors', (data) => {
            const colors = data.notionColors;
            if (colors) {
                applyColors(colors);
            }
        });
    });

    // 配置观察参数：观察整个 document.body 和所有子节点
    observer.observe(document.body, { childList: true, subtree: true });
}

// 页面加载完成后执行
window.addEventListener('load', () => {
    // 延迟5秒后开始监测，确保页面元素渲染完成
    setTimeout(() => {
        observePageLoad();
    }, 1000);
});
