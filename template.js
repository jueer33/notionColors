// 定义模板颜色
const templates = {
    BlueWhite: {
        sidebar: {
            main: '#B3CEE5',
            user: '#F7E7CE',
            option: '#B3CEE5',
            item: '#B3CEE5',
            footer: '#F7E7CE'
        },
        topbar: {
            main: '#F7E7CE',
            option: '#B3CEE5',
            path: '#F7E7CE',
            share: '#F7E7CE'
        },
        setting: {
            main: '#B3CEE5',
            left: '#F0F0F4',
            right: '#B3CEE5',
        },
        template: {
            main: '#F0F0F4',
            top: '#F7E7CE',
        },
        background: '#F0F0F4',
        inbox: '#F7E7CE',
        trash: '#B3CEE5',
        search: '#F7E7CE',
        chat: '#F0F0F4',
    },
    GreenYellow: {
        sidebar: {
            main: '#ACE1AF',
            user: '#ACE1AF',
            option: '#ACE1AF',
            item: '#ACE1AF',
            footer: '#ACE1AF'
        },
        topbar: {
            main: '#E7D2CC',
            option: '#ACE1AF',
            path: '#E7D2CC',
            share: '#E7D2CC'
        },
        setting: {
            main: '#E7D2CC',
            left: '#E7D2CC',
            right: '#ACE1AF',
        },
        template: {
            main: '#FFFDD0',
            top: '#E7D2CC',
        },
        background: '#FFFDD0',
        inbox: '#E7D2CC',
        trash: '#ACE1AF',
        search: '#FFFDD0',
        chat: '#FFFDD0',
    },
};

// 应用模板颜色
const applyTemplate = (template) => {
    const colors = templates[template];

    // 设置侧边栏颜色
    document.getElementById('sidebar-color').value = colors.sidebar.main;
    document.getElementById('sidebar-user-color').value = colors.sidebar.user;
    document.getElementById('sidebar-option-color').value = colors.sidebar.option
    document.getElementById('sidebar-item-color').value = colors.sidebar.item;
    document.getElementById('sidebar-footer-color').value = colors.sidebar.footer;

    // 设置顶部栏颜色
    document.getElementById('topbar-color').value = colors.topbar.main;
    document.getElementById('topbar-option-color').value = colors.topbar.option;
    document.getElementById('topbar-path-color').value = colors.topbar.path;
    document.getElementById('topbar-share-color').value = colors.topbar.share;

    // 设置setting颜色
    document.getElementById('setting-color').value = colors.setting.main;
    document.getElementById('setting-left-color').value = colors.setting.left;
    document.getElementById('setting-right-color').value = colors.setting.right;

    // 设置template颜色
    document.getElementById('template-color').value = colors.template.main;
    document.getElementById('template-top-color').value = colors.template.top;

    // 设置背景颜色
    document.getElementById('background-color').value = colors.background;

    // 设置inbox颜色
    document.getElementById('inbox-color').value = colors.inbox;

    // 设置trash颜色
    document.getElementById('trash-color').value = colors.trash;

    // 设置search颜色
    document.getElementById('search-color').value = colors.search;

    // 设置chat颜色
    document.getElementById('chat-color').value = colors.chat;

    // 保存颜色配置
    saveColors(colors);
};

// 保存颜色配置
const saveColors = (colors) => {
    chrome.storage.sync.set({
        notionColors: colors
    });

    // 通知内容脚本更新颜色
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: applyColors,
                args: [colors]
            });
        }
    });
};

// 初始化事件监听
const initEventListeners = () => {
    // 主颜色监听
    handleMainColorChange('sidebar-color');
    handleMainColorChange('topbar-color');

    // 子颜色监听
    handleSubColorChange(document.querySelectorAll('[data-parent="sidebar-color"]'));
    handleSubColorChange(document.querySelectorAll('[data-parent="topbar-color"]'));

    // 模板按钮监听
    document.getElementById('blue-white')?.addEventListener('click', () => {
        applyTemplate('BlueWhite');
    });

    document.getElementById('green-yellow')?.addEventListener('click', () => {
        applyTemplate('GreenYellow');
    });
};

// 确保 DOM 完全加载后再初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
});