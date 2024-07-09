function printContactSheet(currentGallery)
{
	document.write("<table width='100%' cellpadding='5' border='1'>\n<tr>\n");
	for(var i = 0; i<currentGallery.imageFiles.length; i++)
	{
		if(i%4 == 0)
		{
			document.write("\n</tr>\n<tr>\n");
		}
		document.write("<td width='25%' align='center'>");
		document.write("<a class='caption' href='" + _pictureFrameFile + "?current=" + i + "&gallery=" + currentGallery.index + "'>");
		document.write("<img src='" + currentGallery.imageDirectory + "/thumbs/" + currentGallery.imagePrefix + currentGallery.imageFiles[i] + currentGallery.thumbSuffix + "'></a><br>");
		document.write("<a class='caption' href='" + _pictureFrameFile + "?current=" + i + "&gallery=" + currentGallery.index + "'>");
		document.write(getImageTitle(currentGallery,i));
		document.write("</a></td>\n");
	}
	document.write("\n</tr>\n</table>\n");
}
