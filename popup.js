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
        setting: {
            main: '#ffffff',
            left: '#ffffff',
            right: '#ffffff',
        },
        template: {
            main: '#ffffff',
            top: '#ffffff',
        },
        background: '#ffffff',
        inbox: '#ffffff',
        trash: '#ffffff',
        search: '#ffffff',
        user: '#ffffff',
        chat: '#ffffff',
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
        // 设置trash颜色
        document.getElementById('trash-color').value = colors.trash;
        // 设置search颜色
        document.getElementById('search-color').value = colors.search;
        // 设置chat颜色
        document.getElementById('chat-color').value = colors.chat;
        // 设置user颜色
        document.getElementById('user-color').value = colors.user;

        // 设置setting颜色
        const settingColor = colors.setting.main;
        document.getElementById('setting-color').value = settingColor;
        document.getElementById('setting-left-color').value = colors.setting.left || settingColor;
        document.getElementById('setting-right-color').value = colors.setting.right || settingColor;

        // 设置模板颜色
        const templateColor = colors.template.main;
        document.getElementById('template-color').value = templateColor;
        document.getElementById('template-top-color').value = colors.template.top || templateColor;

        // 初始化自定义状态
        initCustomization();
    });

    // 初始化自定义状态
    const initCustomization = () => {
        // 侧边栏
        const sidebarMain = document.getElementById('sidebar-color').value;
        ['user', 'option', 'item', 'footer'].forEach(type => {
            const input = document.getElementById(`sidebar-${type}-color`);
            input.setAttribute('data-customized', input.value !== sidebarMain ? 'true' : 'false');
        });

        // 顶部栏
        const topbarMain = document.getElementById('topbar-color').value;
        ['option', 'path', 'share'].forEach(type => {
            const input = document.getElementById(`topbar-${type}-color`);
            input.setAttribute('data-customized', input.value !== topbarMain ? 'true' : 'false');
        });

        // setting
        const settingMain = document.getElementById('setting-color').value;
        ['left', 'right'].forEach(type => {
            const input = document.getElementById(`setting-${type}-color`);
            input.setAttribute('data-customized', input.value !== settingMain ? 'true' : 'false');
        });

        // template
        const templateMain = document.getElementById('template-color').value;
        ['top'].forEach(type => {
            const input = document.getElementById(`template-${type}-color`);
            input.setAttribute('data-customized', input.value !== templateMain ? 'true' : 'false');
        });
    };

    // 初始化事件监听
    const initEventListeners = () => {
        // 主颜色监听
        handleMainColorChange('sidebar-color');
        handleMainColorChange('topbar-color');
        handleMainColorChange('setting-color');
        handleMainColorChange('template-color');

        // 子颜色监听
        handleSubColorChange(document.querySelectorAll('[data-parent="sidebar-color"]'));
        handleSubColorChange(document.querySelectorAll('[data-parent="topbar-color"]'));
        handleSubColorChange(document.querySelectorAll('[data-parent="setting-color"]'));
        handleSubColorChange(document.querySelectorAll('[data-parent="template-color"]'));
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
        // 获取setting颜色
        const settingColor = document.getElementById('setting-color').value;
        const settingLeftColor = document.getElementById('setting-left-color').value || settingColor;
        const settingRightColor = document.getElementById('setting-right-color').value || settingColor;
        const settingColors = {
            main: settingColor,
            left: settingLeftColor,
            right: settingRightColor
        };

        // 获取template颜色
        const templateColor = document.getElementById('template-color').value;
        const templateTopColor = document.getElementById('template-top-color').value || templateColor;
        const templateColors = {
            main: templateColor,
            top: templateTopColor,
        };

        // 获取背景颜色
        const backgroundColor = document.getElementById('background-color').value;
        // 获取index颜色
        const inboxColor = document.getElementById('inbox-color').value;
        // 获取trash颜色
        const trashColor = document.getElementById('trash-color').value;
        // 获取search颜色
        const searchColor = document.getElementById('search-color').value;
        // 获取chat颜色
        const chatColor = document.getElementById('chat-color').value
        // 获取user颜色
        const userColor = document.getElementById('user-color').value

        // 保存到浏览器存储
        chrome.storage.sync.set({
            notionColors: {
                sidebar: sidebarColors,
                topbar: topbarColors,
                background: backgroundColor,
                inbox: inboxColor,
                trash: trashColor,
                search: searchColor,
                setting: settingColors,
                template: templateColors,
                chat: chatColor,
                user:userColor
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
                        inbox: inboxColor,
                        trash: trashColor,
                        search: searchColor,
                        setting: settingColors,
                        template: templateColors,
                        chat: chatColor,
                        user: userColor
                    }]
                });
            }
        });
    });
});