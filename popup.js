// 基本功能，实现颜色的选取与保存
window.addEventListener('load', () => {
    // 初始化默认颜色值
    const defaultColors = {
        sidebar: {
            main: '#ffffff',
            user: '#ffffff',
            option: '#ffffff',
            item: '#ffffff',
            footer: '#ffffff'
        },
        topbar: {
            main: '#ffffff',
            option: '#ffffff',
            path: '#ffffff',
            share: '#ffffff'
        },
        background: '#ffffff',
        inbox: '#ffffff'
    };

    // 从存储中获取颜色设置
    chrome.storage.sync.get('notionColors', (data) => {
        const colors = data.notionColors || defaultColors;

        // 设置侧边栏颜色
        const sidebarColor = colors.sidebar.main;
        document.getElementById('sidebar-color').value = sidebarColor;
        document.getElementById('sidebar-user-color').value = colors.sidebar.user || sidebarColor;
        document.getElementById('sidebar-option-color').value = colors.sidebar.option || sidebarColor;
        document.getElementById('sidebar-item-color').value = colors.sidebar.item || sidebarColor;
        document.getElementById('sidebar-footer-color').value = colors.sidebar.footer || sidebarColor;

        // 设置顶部栏颜色
        const topbarColor = colors.topbar.main;
        document.getElementById('topbar-color').value = topbarColor;
        document.getElementById('topbar-option-color').value = colors.topbar.option || topbarColor;
        document.getElementById('topbar-path-color').value = colors.topbar.path || topbarColor;
        document.getElementById('topbar-share-color').value = colors.topbar.share || topbarColor;

        // 设置背景颜色
        document.getElementById('background-color').value = colors.background;
        // 设置inbox颜色
        document.getElementById('inbox-color').value = colors.inbox;


        // 初始化自定义状态
        initCustomization();
    });

    // 初始化自定义状态
    const initCustomization = () => {
        // 侧边栏
        const sidebarMain = document.getElementById('sidebar-color').value;
        ['user', 'option','item', 'footer'].forEach(type => {
            const input = document.getElementById(`sidebar-${type}-color`);
            input.setAttribute('data-customized', input.value !== sidebarMain ? 'true' : 'false');
        });

        // 顶部栏
        const topbarMain = document.getElementById('topbar-color').value;
        ['option', 'path', 'share'].forEach(type => {
            const input = document.getElementById(`topbar-${type}-color`);
            input.setAttribute('data-customized', input.value !== topbarMain ? 'true' : 'false');
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
    };

    // 初始化事件监听
    initEventListeners();

    // 保存按钮点击事件
    document.getElementById('save').addEventListener('click', () => {
        // 获取侧边栏主颜色
        const sidebarColor = document.getElementById('sidebar-color').value;
        const sidebarUserColor = document.getElementById('sidebar-user-color').value || sidebarColor;
        const sidebarOptionColor = document.getElementById('sidebar-option-color').value || sidebarColor;
        const sidebarItemColor = document.getElementById('sidebar-item-color').value || sidebarColor;
        const sidebarFooterColor = document.getElementById('sidebar-footer-color').value || sidebarColor;

        // 保存侧边栏颜色
        const sidebarColors = {
            main: sidebarColor,
            user: sidebarUserColor,
            option: sidebarOptionColor,
            item: sidebarItemColor,
            footer: sidebarFooterColor
        };

        // 获取顶部栏主颜色
        const topbarColor = document.getElementById('topbar-color').value;

        // 获取顶部栏子项颜色，未设置时继承主颜色
        const topbarOptionColor = document.getElementById('topbar-option-color').value || topbarColor;
        const topbarPathColor = document.getElementById('topbar-path-color').value || topbarColor;
        const topbarShareColor = document.getElementById('topbar-share-color').value || topbarColor;

        // 保存顶部栏颜色
        const topbarColors = {
            main: topbarColor,
            option: topbarOptionColor,
            path: topbarPathColor,
            share: topbarShareColor
        };

        // 获取背景颜色
        const backgroundColor = document.getElementById('background-color').value;
        const inboxColor = document.getElementById('inbox-color').value;

        // 保存到浏览器存储
        chrome.storage.sync.set({
            notionColors: {
                sidebar: sidebarColors,
                topbar: topbarColors,
                background: backgroundColor,
                inbox: inboxColor
            }
        });

        // 通知内容脚本更新颜色
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: applyColors,
                    args: [{
                        sidebar: sidebarColors,
                        topbar: topbarColors,
                        background: backgroundColor,
                        inbox: inboxColor
                    }]
                });
            }
        });
    });
});