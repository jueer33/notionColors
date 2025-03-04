/* 应用颜色到 Notion 页面
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

        // 创建伪元素并设置样式
        sidebarOption.style.position = 'relative';
        const pseudoElement = document.createElement('div');
        pseudoElement.style.position = 'absolute';
        pseudoElement.style.bottom = '-8px';
        pseudoElement.style.left = '0';
        pseudoElement.style.right = '0';
        pseudoElement.style.height = '8px';
        pseudoElement.style.backgroundColor = colors.sidebar.option;
        sidebarOption.appendChild(pseudoElement);
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

    // 应用 setting 颜色
    const setting = document.querySelector('#notion-app > div > div.notion-overlay-container.notion-default-overlay-container > div:nth-child(2) > div > div > div.notion-dialog > div');
    const settingLeft = document.querySelector('#notion-app > div > div.notion-overlay-container.notion-default-overlay-container > div:nth-child(2) > div > div > div.notion-dialog > div > div:nth-child(1)');
    const settingRight = document.querySelector('#notion-app > div > div.notion-overlay-container.notion-default-overlay-container > div:nth-child(2) > div > div > div.notion-dialog > div > div:nth-child(2) > div');
    if (setting) setting.style.backgroundColor = colors.setting.main;
    if (settingLeft) settingLeft.style.backgroundColor = colors.setting.left;
    if (settingRight) settingRight.style.backgroundColor = colors.setting.right;

    // 应用 template 颜色
    const template = document.querySelector('div.layout.layout-marketplace');
    const templateTop = document.querySelector('.layout-full');
    if (template) template.style.setProperty('background-color', colors.template.main,);
    if (templateTop) templateTop.style.setProperty('background-color', colors.template.top,);

    // 应用背景颜色
    const background = document.querySelector('.notion-frame');
    if (background) background.style.backgroundColor = colors.background;

    // 应用 Inbox 颜色
    const inbox = document.getElementById('test-customer-io').previousElementSibling;
    if (inbox && !inbox.classList.contains('notion-scroller') && !inbox.classList.contains('vertical')) { inbox.style.backgroundColor = colors.inbox; }

    // 应用 trash 颜色
    const trash = document.querySelector('.notion-sidebar-trash-menu');
    if (trash) trash.style.backgroundColor = colors.trash;

    // 应用 search 颜色
    const search = document.querySelector('div.notion-search-menu').firstElementChild?.firstElementChild;
    if (search) search.style.backgroundColor = colors.search;

    // 应用 chat 颜色
    const chat = document.querySelector('div.layout.layout-chat');
    if (chat) chat.style.backgroundColor = colors.chat;
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
    setTimeout(() => {
            observer.disconnect(); // 停止观察
    }, 10000);
}

// 页面加载完成后执行
window.addEventListener('load', () => {
    observePageLoad();
});
