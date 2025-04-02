// ================== Mock Data & State ==================
let playerGold = 210; // 玩家初始金币
let rosterCurrent = 0; // 将根据 playerRoster 长度更新
let rosterMax = 50;
let shopRefreshCost = 10;
let isSellModeActive = false;

// 商店物品 (示例)
let shopItems = {
    totems: [
        { id: 't1', name: '阵型校准', icon: '📐', cost: 120, description: '部署随机性略微降低...' },
        { id: 't2', name: '应急储备', icon: '⏳', cost: 90, description: '兵团低于50%时...' },
        // 可以再加一个图腾示例
        { id: 't3', name: '持久战意', icon: '❤️‍🔥', cost: 150, description: '单位存活时小幅回血...' },
    ],
    packs: [
        // 原有的普通包
        { id: 'p1', name: '普通奖励包', icon: '🎁', cost: 80, description: '可能包含新士兵、装备、技能或少量资源。' },
        // 新增的奖励包
        { id: 'p2', name: '装备补给箱', icon: '📦', cost: 100, description: '必定开出至少一件随机装备。' },
        { id: 'p3', name: '战士补给包', icon: '⚔️', cost: 70, description: '大概率开出战士职业士兵或战士相关物品。' },
        { id: 'p4', name: '稀有发现', icon: '✨', cost: 250, description: '有更高几率开出稀有单位、高级装备或技能。' }
    ],
    recruits: [
        { id: 'r1', name: '人类战士', icon: '👤', cost: 30, description: '基础近战单位' },
        { id: 'r2', name: '精灵弓箭手', icon: '🏹', cost: 50, description: '远程输出单位' },
        { id: 'r3', name: '兽人战士', icon: '👹', cost: 40, description: '强壮的近战单位' },
        // 可以再加一个招募示例
        { id: 'r4', name: '不死侍僧', icon: '💀', cost: 60, description: '基础不死族单位，可能有特殊效果' },
    ]
};

// **修改: equippedTotems 添加 description**
let equippedTotems = [
    { id: 't101', name: '冲锋号角', icon: '📢', originalCost: 100, description: '援兵部署时+20%移速(3秒)' },
    { id: 't102', name: '精锐先锋', icon: '🛡️', originalCost: 100, description: '首轮单位+5%攻防' },
    null,
    null
];

// **新增: 玩家消耗品数据 (示例)**
let playerConsumables = [
    { id: 'c1', name: '治疗药水', icon: '🧪', quantity: 3, description: '立即恢复少量单位生命值', sellPrice: 5 },
    { id: 'c2', name: '代券', icon: '🎟️', quantity: 1, description: '刷新商店', sellPrice: 8 }
];

// 玩家兵团数据
let playerRoster = [
    {
        id: 'u1',
        name: '新兵约翰',
        race: '人类',
        class: '战士',
        icon: '👤',
        rarityStars: '★',
        stats: { hp: 100, atk: 10, def: 5, res: 0, aspd: 1.0, acc: 90, eva: 5, mov: 1.0, critP: 5, critD: 150 },
        racialTrait: { name: '标准', description: ['无特殊加成或减益'] },
        equipment: { id: 'eq1', name: '生锈的剑', icon: '🗡️', stats: '+1 ATK' },
        skill: { id: 'sk1', name: '冲锋 (人类)', icon: '⚔️', description: '冲向敌人造成伤害并减速' }
    },
    {
        id: 'u2',
        name: '格鲁姆·碎颅者',
        race: '兽人',
        class: '战士',
        icon: '👹',
        rarityStars: '★★★',
        stats: { hp: 115, atk: 12, def: 7, res: 5, aspd: 0.95, acc: 95, eva: 5, mov: 0.95, critP: 5, critD: 150 },
        racialTrait: { name: '强壮', description: ['基础生命+10%', '基础攻击+10%', '基础防御+10%', '攻速-5%', '移速-5%'] },
        equipment: { id: 'eq2', name: '铁质胸甲', icon: '🛡️', stats: '+1 ATK, +1 DEF' },
        skill: { id: 'sk2', name: '野蛮冲撞', icon: '💥', description: '造成150%伤害并减甲 (CD: 8s)' }
    },
    {
        id: 'u3',
        name: '艾拉',
        race: '精灵',
        class: '弓箭手',
        icon: '🏹',
        rarityStars: '★★',
        stats: { hp: 95, atk: 9, def: 4, res: 0, aspd: 1.05, acc: 95, eva: 10, mov: 1.1, critP: 8, critD: 150 },
        racialTrait: { name: '敏捷', description: ['基础闪避+5%', '移速+5%'] },
        equipment: null, // 无装备
        skill: { id: 'sk3', name: '多重射击', icon: '🎯', description: '同时攻击多个目标 (CD: 10s)' }
    },
    {
        id: 'u4',
        name: '凋零者-玛尔',
        race: '不死',
        class: '法师',
        icon: '💀',
        rarityStars: '★★★★',
        isRare: true, // 标记稀有
        stats: { hp: 100, atk: 10, def: 5, res: 10, aspd: 1.0, acc: 90, eva: 5, mov: 1.0, critP: 5, critD: 150 },
        racialTrait: { name: '吸灵', description: ['攻击吸取造成伤害2%的生命值'] },
        equipment: { id: 'eq3', name: '学徒法杖', icon: '🪄', stats: '+2 抵抗' },
        skill: { id: 'sk4', name: '召唤骷髅', icon: '☠️', description: '召唤一个骷髅兵为你作战 (CD: 15s)' }
    },
    // ... 可以添加更多单位 ...
];
// 更新 rosterCurrent 以匹配数据
rosterCurrent = playerRoster.length;


// ================== Rendering Functions ==================

// 更新顶部 Header 显示的金币、兵团、刷新成本等信息
// 注意：这个函数目前只更新带有特定 ID 的元素，主要在商店界面
function renderHeaderInfo() {
    const goldDisplay = document.getElementById('player-gold-display');
    const rosterDisplay = document.getElementById('roster-count-display');
    const refreshCostDisplay = document.getElementById('refresh-cost-display');
    const refreshButtonCostSpan = document.getElementById('refresh-button-cost');
    const recruitCostInfo = document.getElementById('recruit-cost-info'); // ID for recruit cost info in shop header

    if (goldDisplay) goldDisplay.textContent = playerGold;
    if (rosterDisplay) rosterDisplay.textContent = `${rosterCurrent} / ${rosterMax}`;

    // 更新招募成本提示 (示例逻辑)
    let costIncreasePercent = 0;
    if (rosterCurrent > 50) { // 假设软上限是50
        costIncreasePercent = Math.round((rosterCurrent - 50) * 5); // 每超出1人增加5%? GDD是当前人口5%
        // GDD逻辑： costIncreasePercent = Math.round(rosterCurrent * 0.05 * 100); // 假设是百分比
        costIncreasePercent = Math.max(0, Math.round(rosterCurrent * 0.05)); // 按 GDD 计算百分比值
    }
    if (recruitCostInfo) recruitCostInfo.textContent = `(+${costIncreasePercent}%)`;


    if (refreshCostDisplay) refreshCostDisplay.textContent = `${shopRefreshCost} [G]`;
    if (refreshButtonCostSpan) refreshButtonCostSpan.textContent = shopRefreshCost;
}

// 渲染整个商店界面 (物品 + 图腾)
function renderShopScreen() {
    renderShopItems();
    renderHeaderInfo(); // 更新商店顶部的 header 信息
    // 注意：商店界面也调用 renderTotemBar 来显示顶部的图腾栏
    // 这个调用现在放在 showScreen 函数里
}

// 渲染商店物品列表
function renderShopItems() {
    console.log("[renderShopItems] Rendering items into separate columns...");
    const packList = document.getElementById('shop-packs-list');          // 左栏
    const totemList = document.getElementById('shop-totems-for-sale-list'); // 右栏 - 图腾购买区
    const recruitList = document.getElementById('shop-recruits-list');       // 右栏 - 招募区

    // 检查容器是否存在
    if (!packList || !totemList || !recruitList) {
        console.error("[renderShopItems] One or more list containers not found! Check IDs: #shop-packs-list, #shop-totems-for-sale-list, #shop-recruits-list");
        return;
    }

    // 清空现有列表
    packList.innerHTML = '';
    totemList.innerHTML = '';
    recruitList.innerHTML = '';

    // --- 渲染奖励包 (到左栏) ---
    shopItems.packs.forEach(item => {
        packList.innerHTML += `
            <div class="flex justify-between items-center bg-slate-700/50 p-2 rounded border border-slate-600 mb-1.5">
                <span><span class="text-lg mr-1">${item.icon}</span>${item.name}</span>
                <div class="flex items-center gap-x-3">
                    <span class="text-yellow-400 font-semibold">${item.cost} [G]</span>
                    <button onclick="buyItem('${item.id}', 'pack', ${item.cost})" class="text-xs py-1 px-3 bg-emerald-600 hover:bg-emerald-700 rounded">购买</button>
                </div>
            </div>`;
    });

    // --- 渲染待售图腾 (到右栏) ---
    shopItems.totems.forEach(item => {
        totemList.innerHTML += `
            <div class="flex justify-between items-center bg-slate-700/50 p-2 rounded border border-slate-600 mb-1.5">
                <span><span class="text-lg mr-1">${item.icon}</span>${item.name}</span>
                <div class="flex items-center gap-x-3">
                    <span class="text-yellow-400 font-semibold">${item.cost} [G]</span>
                    <button onclick="buyItem('${item.id}', 'totem', ${item.cost})" class="text-xs py-1 px-3 bg-emerald-600 hover:bg-emerald-700 rounded">购买</button>
                </div>
            </div>`;
    });

    // --- 渲染招募单位 (到右栏) ---
    shopItems.recruits.forEach(item => {
        let currentCost = item.cost; // 成本计算逻辑保持
        if (rosterCurrent > 50) {
            const increaseFactor = 1 + Math.max(0, rosterCurrent - 50) * 0.05;
            currentCost = Math.round(item.cost * increaseFactor);
        }

        recruitList.innerHTML += `
            <div class="flex justify-between items-center bg-slate-700/50 p-2 rounded border border-slate-600 mb-1.5">
                <span><span class="text-lg mr-1">${item.icon}</span>${item.name}</span>
                <div class="flex items-center gap-x-3">
                    <span class="text-yellow-400 font-semibold">${currentCost} [G]</span> ${currentCost > item.cost ? '<span class="text-red-400 text-xs">(' + Math.round((currentCost / item.cost - 1) * 100) + '%)</span>' : ''}
                    <button onclick="buyItem('${item.id}', 'recruit', ${currentCost})" class="text-xs py-1 px-3 bg-sky-600 hover:bg-sky-700 rounded">招募</button>
                </div>
            </div>`;
    });
    console.log("[renderShopItems] Finished rendering all item lists.");
}
// !! 修改: renderTopStatusBar - 优化图标垂直居中 !!
function renderTopStatusBar(containerId, showSellButtons = false) {
    console.log(`Rendering top status bar for ${containerId}, Show Sell Buttons: ${showSellButtons}`);
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    // --- 图腾信息区 ---
    let totemsHtml = `<div class="totem-badge-area flex justify-center items-stretch gap-x-1.5 sm:gap-x-2 flex-wrap">`;
    totemsHtml += '<span class="font-semibold text-xs text-cyan-300 mr-2 self-center">图腾:</span>';
    equippedTotems.forEach((totem, index) => {
        if (totem) {
            const sellPrice = Math.floor(totem.originalCost * 0.5);
            const sellButtonHtml = showSellButtons
                ? `<button onclick="sellTotem(${index}, ${sellPrice})" class="text-[9px] py-0.5 px-1.5 mt-1 bg-red-600 hover:bg-red-700 rounded shadow-sm w-full opacity-80 group-hover:opacity-100 transition-opacity">
                       卖(${sellPrice}G)
                   </button>`
                : '';
            const cardJustifyClass = showSellButtons ? 'justify-between' : 'justify-center';

            totemsHtml += `
                <div class="totem-card relative flex flex-col ${cardJustifyClass} items-center bg-gray-700/70 border border-cyan-600/50 p-1 rounded-md shadow w-16 h-[60px] group"
                     data-tooltip="${totem.name}: ${totem.description || ''}">
                    <div class="flex flex-col items-center mt-1">
                        <span class="text-2xl leading-none">${totem.icon}</span>
                    </div>
                    ${sellButtonHtml}
                </div>`;
        } else {
            totemsHtml += `<div class="flex items-center justify-center bg-gray-800/50 border border-dashed border-gray-600 rounded-md text-gray-500 text-xs italic w-16 h-[60px]">空</div>`;
        }
    });
    totemsHtml += `</div>`;

    // --- 消耗品信息区 ---
    // !! 添加 shift-consumables-left 类, 移除 slice(0, 3) !!
    let consumablesHtml = `<div class="consumable-badge-area shift-consumables-left flex items-center gap-x-1.5 sm:gap-x-2 border-l border-gray-600 pl-2 flex-wrap">`; // 添加了 shift-consumables-left
    consumablesHtml += '<span class="font-semibold text-xs text-orange-300 mr-1 self-center">物品:</span>';
    if (playerConsumables.length === 0) {
         consumablesHtml += '<span class="text-xs text-gray-500 italic self-center">无</span>';
    } else {
        // !! 恢复遍历所有消耗品 !!
        playerConsumables.forEach(item => {
             const sellButtonHtml = showSellButtons
                 ? `<button onclick="sellConsumable('${item.id}', ${item.sellPrice})" class="text-[9px] py-0.5 px-1 mt-0.5 bg-red-600 hover:bg-red-700 rounded shadow-sm w-full opacity-80 group-hover:opacity-100 transition-opacity">
                        卖(${item.sellPrice}G)
                    </button>`
                 : '';
             const cardJustifyClass = showSellButtons ? 'justify-between' : 'justify-center';

             consumablesHtml += `
                <div class="consumable-card relative flex flex-col ${cardJustifyClass} items-center bg-gray-700/70 border border-gray-600/50 p-1 rounded-md shadow w-16 h-[60px] cursor-default group"
                     data-tooltip="${item.name}: ${item.description || ''} (售价: ${item.sellPrice}G)">
                     <div class="flex flex-col items-center mt-1">
                        <span class="text-xl leading-none">${item.icon}</span>
                     </div>
                    <span class="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-gray-900">${item.quantity}</span>
                    ${sellButtonHtml}
                </div>`;
        });
         // !! 移除数量超过3个时的 "..." !!
    }
    consumablesHtml += `</div>`;

    // 组合
    container.innerHTML = `${totemsHtml}${consumablesHtml}`;
    console.log(`Finished rendering top status bar. Show Sell Buttons: ${showSellButtons}. Showing ALL consumables.`); // 更新日志
}

function sellConsumable(itemId, sellPrice) {
    const itemIndex = playerConsumables.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        // ... (扣钱、减数量/移除、日志、alert 不变) ...
        playerGold += sellPrice;
        playerConsumables[itemIndex].quantity--;
        const itemName = playerConsumables[itemIndex].name;
        console.log(`出售 ${itemName}, 获得 ${sellPrice}G, 剩余 ${playerConsumables[itemIndex].quantity} 个`);
        alert(`出售 1 个 ${itemName} 成功，获得 ${sellPrice}G！`);
        if (playerConsumables[itemIndex].quantity <= 0) { playerConsumables.splice(itemIndex, 1); }

        renderSellConsumableModal(); // 更新出售弹窗列表

        // **更新当前活动屏幕的顶部状态栏，并传入当前的出售模式状态**
         const activeScreen = document.querySelector('.screen.active');
         if (activeScreen) {
             const statusBarId = `top-status-bar-${activeScreen.id.replace('screen-', '')}`;
             const statusBar = document.getElementById(statusBarId);
             if (statusBar) {
                 renderTopStatusBar(statusBarId, isSellModeActive); // !! 传入 isSellModeActive !!
             }
         }
        renderHeaderInfo(); // 更新金币显示
    } else { /* ... 错误处理 ... */ }
}

function toggleSellMode() {
    isSellModeActive = !isSellModeActive; // 切换状态
    console.log("Sell mode toggled:", isSellModeActive);

    const toggleButton = document.getElementById('toggle-sell-mode-button');
    if (toggleButton) {
        toggleButton.textContent = isSellModeActive ? '取消出售' : '出售物品'; // 改变按钮文字
        toggleButton.classList.toggle('bg-yellow-600', !isSellModeActive); // 切换背景色
        toggleButton.classList.toggle('hover:bg-yellow-700', !isSellModeActive);
        toggleButton.classList.toggle('bg-red-600', isSellModeActive);
        toggleButton.classList.toggle('hover:bg-red-700', isSellModeActive);
    }

    // 重新渲染当前屏幕的顶部状态栏以显示/隐藏出售按钮
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen) {
        const statusBarId = `top-status-bar-${activeScreen.id.replace('screen-', '')}`;
        const statusBar = document.getElementById(statusBarId);
        if (statusBar) { // 只在有状态栏的屏幕上刷新
            renderTopStatusBar(statusBarId, isSellModeActive); // **关键：传入新的状态**
        }
    }
}

// **新增: 出售消耗品函数**
function sellConsumable(itemId, sellPrice) {
    const itemIndex = playerConsumables.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        playerGold += sellPrice;
        playerConsumables[itemIndex].quantity--;
        const itemName = playerConsumables[itemIndex].name;

        console.log(`出售 ${itemName}, 获得 ${sellPrice}G, 剩余 ${playerConsumables[itemIndex].quantity} 个`);
        alert(`出售 1 个 ${itemName} 成功，获得 ${sellPrice}G！`);

        // 如果数量为 0，则从数组中移除该物品
        if (playerConsumables[itemIndex].quantity <= 0) {
            playerConsumables.splice(itemIndex, 1);
            console.log(`${itemName} 已售完，从列表中移除。`);
        }

        renderSellConsumableModal(); // 更新出售弹窗列表
        renderTopStatusBar(document.querySelector('.top-status-bar-container.active')?.id || 'top-status-bar-shop'); // 更新顶部状态栏 (需要找到当前活动的栏) - **改进点: showScreen 中处理更好**
        renderHeaderInfo(); // 更新金币显示
    } else {
        console.error(`尝试出售未找到的消耗品 ID: ${itemId}`);
        alert('出售失败，找不到该物品！');
    }
}



// 渲染兵团管理界面
function renderRosterScreen() {
    const gridContainer = document.getElementById('roster-grid');
    const rosterCountHeader = document.getElementById('roster-count-header');

    if (gridContainer) gridContainer.innerHTML = ''; // 清空网格
    else return; // 如果找不到 grid 容器，则不继续

    // 更新头部人口显示
    rosterCurrent = playerRoster.length; // 确保使用的是最新长度
    if (rosterCountHeader) {
        rosterCountHeader.innerHTML = `人口: <span class="font-bold text-white">${rosterCurrent} / ${rosterMax}</span>`;
        // 更新招募成本提示
        let costIncreasePercent = 0;
        if (rosterCurrent > 50) {
            costIncreasePercent = Math.max(0, Math.round(rosterCurrent * 0.05)); // 按 GDD 计算百分比值
        }
        rosterCountHeader.innerHTML += ` <span class="text-xs opacity-80">(+${costIncreasePercent}% 招募成本)</span>`;
    }

    playerRoster.forEach(unit => {
        const equipmentIcon = unit.equipment ? `<span class="text-green-400" title="装备: ${unit.equipment.name}">${unit.equipment.icon || '🛡️'}</span>` : `<span class="text-gray-500" title="无装备">--</span>`;
        const skillIcon = unit.skill ? `<span class="text-blue-400" title="技能: ${unit.skill.name}">${unit.skill.icon || '⚔️'}</span>` : `<span class="text-gray-500" title="无技能">--</span>`;
        const rarityHtml = unit.rarityStars ? `<div class="text-yellow-400 text-xs mt-1">${unit.rarityStars}</div>` : '';
        const raceClassAbbr = `${unit.race.charAt(0)}${unit.class.charAt(0)}`;
        const rareTag = unit.isRare ? `<div class="absolute top-1 right-1 text-xs text-purple-300 font-bold italic opacity-80">RARE!</div>` : '';
        let borderColor = 'border-slate-500';
        if (unit.isRare) borderColor = 'border-purple-500';
        else if (unit.race === '兽人') borderColor = 'border-orange-500';
        else if (unit.race === '精灵') borderColor = 'border-green-500';

        const cardHtml = `
            <div onclick="openModal('unit-detail-modal', '${unit.id}')"
                 class="unit-card relative aspect-square flex flex-col items-center justify-center bg-slate-700 ${borderColor} rounded-lg p-1 shadow-md hover:bg-slate-600 hover:border-cyan-500 cursor-pointer transition duration-150 ease-in-out text-center">
                ${rareTag}
                <div class="text-xs font-bold mb-0.5 text-gray-300">${raceClassAbbr}</div>
                <div class="text-2xl leading-tight">${unit.icon || '?'}</div>
                <div class="flex text-xs gap-1 mt-0.5">
                    <span>E:${equipmentIcon}</span>
                    <span>S:${skillIcon}</span>
                </div>
                ${rarityHtml}
            </div>`;
        gridContainer.innerHTML += cardHtml;
    });
    // TODO: 更新分页信息
}

// 渲染单位详情弹窗内容
function renderUnitDetailModal(unitData) {
    if (!unitData) return;

    const modalName = document.getElementById('modal-unit-name');
    const modalRace = document.getElementById('modal-unit-race');
    const modalClass = document.getElementById('modal-unit-class');
    const modalIcon = document.getElementById('modal-unit-icon');
    const modalTraitName = document.getElementById('modal-trait-name');
    const modalTraitDesc = document.getElementById('modal-trait-desc');
    const modalEquipmentInfo = document.getElementById('modal-equipment-info');
    const modalSkillInfo = document.getElementById('modal-skill-info');

    if (modalName) modalName.textContent = unitData.name;
    if (modalRace) modalRace.textContent = unitData.race;
    if (modalClass) modalClass.textContent = unitData.class;
    if (modalIcon) modalIcon.textContent = unitData.icon || '?';

    if (modalTraitName) modalTraitName.textContent = `种族特性: ${unitData.racialTrait.name}`;
    if (modalTraitDesc) {
        modalTraitDesc.innerHTML = '';
        unitData.racialTrait.description.forEach(line => {
            modalTraitDesc.innerHTML += `<li>${line}</li>`;
        });
    }

    for (const statKey in unitData.stats) {
        const statElement = document.getElementById(`modal-stat-${statKey}`);
        if (statElement) {
            statElement.textContent = unitData.stats[statKey];
            // TODO: 处理加成显示，例如 (+1)
        }
    }

    if (modalEquipmentInfo) {
        if (unitData.equipment) {
            modalEquipmentInfo.innerHTML = `
                <div class="flex items-center">
                     <span class="text-xl mr-2">${unitData.equipment.icon || '🛡️'}</span>
                     <div>
                         <div class="font-medium text-sm text-gray-100">${unitData.equipment.name}</div>
                         <div class="text-xs text-green-400">${unitData.equipment.stats || ''}</div>
                     </div>
                 </div>
                <button onclick="alert('更换装备功能未实现')" class="text-xs py-0.5 px-2 bg-blue-600 hover:bg-blue-700 rounded shadow ml-auto">更换</button>`; // 添加 ml-auto
        } else {
            modalEquipmentInfo.innerHTML = `<div class="text-gray-500 italic h-full flex items-center justify-center text-xs w-full">无装备</div>`; // 充满宽度
        }
    }

    if (modalSkillInfo) {
        if (unitData.skill) {
            modalSkillInfo.innerHTML = `
                <div class="flex items-center">
                     <span class="text-xl mr-2">${unitData.skill.icon || '⚔️'}</span>
                     <div>
                         <div class="font-medium text-sm text-gray-100">${unitData.skill.name}</div>
                         <div class="text-xs text-blue-300">${unitData.skill.description || ''}</div>
                     </div>
                 </div>
                <button onclick="alert('更换技能功能未实现')" class="text-xs py-0.5 px-2 bg-blue-600 hover:bg-blue-700 rounded shadow ml-auto">更换</button>`; // 添加 ml-auto
        } else {
            modalSkillInfo.innerHTML = `<div class="text-gray-500 italic h-full flex items-center justify-center text-xs w-full">无技能</div>`; // 充满宽度
        }
    }
}


// ================== Action Functions ==================

function buyItem(itemId, itemType, cost) {
    const itemInfo = shopItems[itemType + 's']?.find(i => i.id === itemId);
    const purchasedItemName = itemInfo?.name || '物品';

    if (playerGold >= cost) {
        playerGold -= cost;
        console.log(`购买 ${itemType} ${itemId} (${purchasedItemName}), 花费 ${cost} G, 剩余 ${playerGold} G`);
        alert(`购买 ${purchasedItemName} 成功！剩余 ${playerGold} G`);

        if (itemType === 'recruit') {
            // ... (招募逻辑不变) ...
            if (itemInfo) {
                const newUnit = { /* ... 创建新单位 ... */ id: generateUniqueId(), name: `${itemInfo.name} #${rosterCurrent + 1}`, race: itemInfo.name.includes('人类') ? '人类' : (itemInfo.name.includes('精灵') ? '精灵' : (itemInfo.name.includes('兽人') ? '兽人' : '未知')), class: itemInfo.name.includes('战士') ? '战士' : (itemInfo.name.includes('弓箭手') ? '弓箭手' : (itemInfo.name.includes('法师') ? '法师' : '未知')), icon: itemInfo.icon, rarityStars: '★', stats: { hp: 100, atk: 10, def: 5, res: 0, aspd: 1.0, acc: 90, eva: 5, mov: 1.0, critP: 5, critD: 150 }, racialTrait: { name: '标准', description: ['待定'] }, equipment: null, skill: null };
                if (newUnit.race === '兽人') newUnit.stats.hp = 110; if (newUnit.class === '弓箭手') newUnit.stats.atk = 9;
                playerRoster.push(newUnit);
                rosterCurrent = playerRoster.length;
                console.log(`新单位 ${newUnit.name} (ID: ${newUnit.id}) 已添加到兵团。当前人口: ${rosterCurrent}`);
            } else { console.error(`无法找到 ID 为 ${itemId} 的招募项信息！`); playerGold += cost; /* 撤销扣款 */ }

        } else if (itemType === 'totem') {
            // !! 修改: 不再自动装备，仅提示购买成功 !!
            // TODO: 需要一个“背包”或机制来存放购买的图腾，以便后续从某个界面装备
            alert('图腾已购买！(装备功能需后续实现)');
            // 可以在这里将购买的图腾信息存入一个 playerInventory.totems 数组
            // const boughtTotemData = {...itemInfo}; // 复制数据
            // playerInventory.totems.push(boughtTotemData);

            // 如果需要从商店移除
            // shopItems.totems = shopItems.totems.filter(t => t.id !== itemId);

        } else if (itemType === 'pack') {
            alert('奖励包已购买，打开功能未实现');
        }

        renderHeaderInfo();
        renderShopItems(); // 重新渲染商店，招募价格可能变了

    } else {
        alert('金币不足！');
    }
}

function sellTotem(slotIndex, sellPrice) {
    if (equippedTotems[slotIndex]) {
        // ... (扣钱、置空数组、日志、alert 不变) ...
        const totemName = equippedTotems[slotIndex].name;
        playerGold += sellPrice;
        equippedTotems[slotIndex] = null;
        console.log(`出售图腾 ${totemName}, 获得 ${sellPrice} G`);
        alert(`出售 ${totemName} 成功，获得 ${sellPrice} G！`);

        // **更新当前活动屏幕的顶部状态栏，并传入当前的出售模式状态**
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen) {
            const statusBarId = `top-status-bar-${activeScreen.id.replace('screen-', '')}`;
            const statusBar = document.getElementById(statusBarId);
            if (statusBar) {
                renderTopStatusBar(statusBarId, isSellModeActive); // !! 传入 isSellModeActive !!
            }
        }
        renderHeaderInfo(); // 更新金币显示
    }
}
function attemptRefreshShop() {
    if (playerGold >= shopRefreshCost) {
        playerGold -= shopRefreshCost;
        const oldCost = shopRefreshCost;
        // TODO: 实际刷新商品逻辑
        shopRefreshCost += 5;
        console.log(`刷新商店成功！花费 ${oldCost} G, 下次刷新成本 ${shopRefreshCost} G`);
        alert(`刷新商店成功！花费 ${oldCost} G。\n(原型中商品未实际刷新)`);
        renderHeaderInfo();
    } else {
        alert(`金币不足以刷新商店 (需要 ${shopRefreshCost} G)`);
    }
}


// ================== Navigation & Modal Functions ==================

function showScreen(screenId) {

    if (isSellModeActive) {
        toggleSellMode(); // 调用切换函数来重置状态和按钮文本
    }
    const screens = document.querySelectorAll('.screen');
    console.log(`[showScreen] Attempting to navigate to: ${screenId}`);
    let screenFound = false;

    screens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.add('active');
            screenFound = true;
            console.log(`[showScreen] Activated screen: ${screenId}`);

            const statusBarContainerId = `top-status-bar-${screenId.replace('screen-', '')}`; // 生成对应的状态栏 ID

            // --- 根据屏幕 ID 调用对应的渲染函数 ---
            if (screenId === 'screen-shop') {
                renderTopStatusBar(statusBarContainerId, false); // **传入 true, 显示出售按钮**
                renderShopScreen();
            } else if (screenId === 'screen-roster') {
                renderRosterScreen();
            } else if (screenId === 'screen-stage-preview') {
                renderTopStatusBar(statusBarContainerId); // **调用新的渲染函数**
                // TODO: 更新此屏幕顶部的金币/人口信息 (需要统一 ID 或新函数)
                // renderHeaderInfo(); // 暂时注释，避免只更新商店的 header
            } else if (screenId === 'screen-decision') {
                renderTopStatusBar(statusBarContainerId); // **调用新的渲染函数**
                // TODO: 更新此屏幕顶部的金币/人口信息
                // renderHeaderInfo(); // 暂时注释
            }
            // 对于战斗和游戏结束界面，不渲染图腾栏

        } else {
            screen.classList.remove('active');
        }
    });

    if (!screenFound) {
        console.error(`[showScreen] Screen element with ID "${screenId}" not found in HTML! Check ID spelling.`);
    }
}

function openModal(modalId, unitId = null) {
    const modal = document.getElementById(modalId);
    if (modal) {
        if (modalId === 'unit-detail-modal' && unitId) {
            const unitData = playerRoster.find(unit => unit.id === unitId);
            if (unitData) {
                renderUnitDetailModal(unitData);
            } else {
                console.error(`Unit data not found for ID: ${unitId}`);
                // renderUnitDetailModal(null); // 显示空状态或错误信息
                return;
            }
        }
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        console.error(`Modal element with ID "${modalId}" not found!`);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// ================== Event Listeners & Initialization ==================

document.addEventListener('DOMContentLoaded', () => {
    // 初始化：显示主菜单
    showScreen('screen-main-menu');

    // 给所有弹窗的遮罩层添加关闭事件监听
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                closeModal(overlay.id);
            }
        });
    });

    // 可能需要初始调用 renderHeaderInfo 来显示初始金币等 (如果 header 在所有界面都可见且需要动态数据)
    // renderHeaderInfo(); // 但目前 header 是各屏幕独立的
});