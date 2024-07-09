var sSearch = location.search;
var iActiveImage;
var iFirstImage;
var iLastImage;

function parseURL()
{
	sSearch = location.search;
	iActiveImage = parseInt(getURLValue(sSearch, 'current', '0'));
	iFirstImage = parseInt(getURLValue(sSearch, 'start', '0'));
	iLastImage = parseInt(getURLValue(sSearch, 'end', saImageNames.length - 1));
}

function printNav()
{
	iPrevIndex = (iActiveImage - 1);
	iNextIndex = (iActiveImage + 1);
	sHREF= location.href.toString();
	sURLRoot = sHREF.substring(0,sHREF.indexOf('?'));

	if(iPrevIndex >= iFirstImage)
	{
		document.write("<a href='" + sURLRoot + "?start=" + iFirstImage + "&end=" + iLastImage + "&current=" + iPrevIndex + "'>&lt; previous</a>");
	}

	document.write("&nbsp;&nbsp;&nbsp;");

	if(iNextIndex <= iLastImage)
	{
		document.write("<a href='" + sURLRoot + "?start=" + iFirstImage + "&end=" + iLastImage + "&current=" + iNextIndex + "'>next &gt;</a>");
	}
}
