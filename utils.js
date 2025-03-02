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
    const search = document.querySelector('.notion-search-menu');
    if (search) search.style.backgroundColor = colors.search;

    // 应用 chat 颜色
    const chat = document.querySelector('div.layout.layout-chat');
    if (chat) chat.style.backgroundColor = colors.chat;
}
// 主颜色变化处理函数
const handleMainColorChange = (mainInputId) => {
    const mainInput = document.getElementById(mainInputId);
    mainInput.addEventListener('input', function () {
        const subInputs = document.querySelectorAll(`[data-parent="${mainInputId}"]`);
        subInputs.forEach(input => {
            if (input.getAttribute('data-customized') === 'false') {
                input.value = this.value;
            }
        });
    });
};

// 子颜色输入处理函数
const handleSubColorChange = (subInputs) => {
    subInputs.forEach(input => {
        input.addEventListener('input', function () {
            this.setAttribute('data-customized', 'true');
        });
    });
};
