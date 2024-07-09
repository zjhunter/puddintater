var currentPanel;

function showPanel1(panelNum) {
	//hide visible panel, show selected panel, set tab
	if (currentPanel != null) {
		hidePanel();
	}
	document.getElementById ('panel'+panelNum).style.visibility = 'visible';
	currentPanel = panelNum;
	setState(panelNum);
}

function showPanel(tabId) {
	//hide visible panel, show selected panel, set tab
	if (currentPanel != null) {
		hidePanel();
	}
	panelNum = tabId.substring(3);
	document.getElementById ('panel'+panelNum).style.visibility = 'visible';
	currentPanel = panelNum;
	setState(tabId);
}

function hidePanel() {
	//hide visible panel, unhilite tab
	document.getElementById	('panel'+currentPanel).style.visibility = 'hidden';
	document.getElementById	('tab'+currentPanel).style.backgroundColor = '#ffffff';
	document.getElementById	('tab'+currentPanel).style.color = 'navy';
}

function setState(tabId) {
	tabNum = tabId.substring(3);
	if (tabNum==currentPanel) {
		document.getElementById (tabId).style.backgroundColor = '#ddddff';
		document.getElementById	(tabId).style.color = 'red';
	}
	else {
		document.getElementById	(tabId).style.backgroundColor = '#ffffff';
		document.getElementById	(tabId).style.color = 'navy';
	}
}

function hover(tab) {
	tab.style.backgroundColor = 'ddddff';
}
