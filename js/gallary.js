
function printHeadderTitle(sTitle) {
	document.write("<title>Puddintater.com - " + sTitle + "</title>");
}

function printTitle() {
	document.write(sTitle_);
}

function printImg(iIndex) {
	document.write("<img src='images/" + sImageDir + "/" + saImageNames[iIndex] + ".jpg'>");
}

function printThumbImg(iIndex) {
	if(typeof sGallaryType_ == "undefined" || sGallaryType_ != "xp") {
		printACDCThumbImg(iIndex);
	}else {
		printXPThumbImg(iIndex);
	}
}

function printACDCThumbImg(iIndex) {
	document.write("<img src='images/" + sImageDir + "/thumbs/" + saImageNames[iIndex] + "_t.jpg'>");
}

function printXPThumbImg(iIndex) {
	//alert("printing " + saImageNames[iIndex] + ' = ' + "<img src='images/" + sImageDir + "/thumbs/" + saImageNames[iIndex] + "_t.jpg'>");
	document.write("<img src='images/" + sImageDir + "/thumbs/" + saImageNames[iIndex] + " (2).jpg'>");
}

function printCaption(iIndex) {
	document.write(saImageTitles[iIndex]);
}

function printPicFrameURL(sPageName, iIndex) {
	document.write("<a class='caption' href='" + sPageName + "?current=" + iIndex + "'>");
}

function printGallaryNav() {
	document.write("<a href='" + sCSFile_ + "'>Back to " + sGallaryTitle_ + "</a>");
}

function printGallariesNav() {
	document.write("<a href='" + sGallariesFile_ + "'>Back to " + sGallariesTitle_ + "</a>");
}