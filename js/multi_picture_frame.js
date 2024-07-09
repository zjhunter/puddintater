function printNav(currentGallery)
{
	nextIndex = (_imageIndex + 1);
	sHREF = location.href.toString();
	sURLRoot = sHREF.substring(0,sHREF.indexOf('?'));

	if(_imageIndex > 0)
	{
		document.write("<a href='" + sURLRoot + "?current=" + (_imageIndex - 1) + "&gallery=" + currentGallery.index + "'>&lt; previous</a>");
	}

	document.write("&nbsp;&nbsp;&nbsp;");

	if(nextIndex < currentGallery.imageFiles.length)
	{
		document.write("<a href='" + sURLRoot + "?current=" + nextIndex + "&gallery=" + currentGallery.index + "'>next &gt;</a>");
	}
}
