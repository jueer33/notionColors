/**
 * 应用颜色到 Notion 页面
 * @param {Object} colors - 颜色配置对象
 */
function applyColors(colors) {
    // 应用侧边栏颜色
    const sidebar = document.querySelector('.notion-sidebar-container');
    const sidebarUser = document.querySelector('#notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(1)');
    const sidebarItem = document.querySelector("#notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(4) > div > div:nth-child(2) > div:nth-child(1)");
    const sidebarFooter = document.querySelector('#notion-app > div > div:nth-child(1) > div > nav > div > div > div > div:nth-child(4) > div:nth-child(5)');

    if (sidebar) sidebar.style.backgroundColor = colors.sidebar.main;
    if (sidebarUser) sidebarUser.style.backgroundColor = colors.sidebar.user;
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
}