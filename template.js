// 定义模板颜色
const templates = {
    light: {
        sidebar: {
            main: '#f5f5f5',
            user: '#e0e0e0',
            item: '#eeeeee',
            footer: '#e0e0e0'
        },
        topbar: {
            main: '#f5f5f5',
            option: '#e0e0e0',
            path: '#eeeeee',
            share: '#e0e0e0'
        },
        background: '#ffffff'
    },
    dark: {
        sidebar: {
            main: '#2d2d2d',
            user: '#3d3d3d',
            item: '#4d4d4d',
            footer: '#3d3d3d'
        },
        topbar: {
            main: '#2d2d2d',
            option: '#3d3d3d',
            path: '#4d4d4d',
            share: '#3d3d3d'
        },
        background: '#1e1e1e'
    }
};

// 应用模板颜色
const applyTemplate = (template) => {
    const colors = templates[template];

    // 设置侧边栏颜色
    document.getElementById('sidebar-color').value = colors.sidebar.main;
    document.getElementById('sidebar-user-color').value = colors.sidebar.user;
    document.getElementById('sidebar-item-color').value = colors.sidebar.item;
    document.getElementById('sidebar-footer-color').value = colors.sidebar.footer;

    // 设置顶部栏颜色
    document.getElementById('topbar-color').value = colors.topbar.main;
    document.getElementById('topbar-option-color').value = colors.topbar.option;
    document.getElementById('topbar-path-color').value = colors.topbar.path;
    document.getElementById('topbar-share-color').value = colors.topbar.share;

    // 设置背景颜色
    document.getElementById('background-color').value = colors.background;

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

// 添加模板按钮的事件监听器
document.getElementById('template-light').addEventListener('click', () => {
    applyTemplate('light');
});

document.getElementById('template-dark').addEventListener('click', () => {
    applyTemplate('dark');
});

// 初始化事件监听
const initEventListeners = () => {
    // 主颜色监听
    handleMainColorChange('sidebar-color');
    handleMainColorChange('topbar-color');

    // 子颜色监听
    handleSubColorChange(document.querySelectorAll('[data-parent="sidebar-color"]'));
    handleSubColorChange(document.querySelectorAll('[data-parent="topbar-color"]'));

    // 模板按钮监听
    document.getElementById('template-light').addEventListener('click', () => {
        applyTemplate('light');
    });

    document.getElementById('template-dark').addEventListener('click', () => {
        applyTemplate('dark');
    });
};

// 初始化事件监听
initEventListeners();