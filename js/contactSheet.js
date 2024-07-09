function printContactSheet()
{
	document.write("<table width='100%' cellpadding='5' border='1'>\n<tr>\n");
	for(var i = 0; i<saImageNames.length; i++)
	{
		if(i%4 == 0)
		{
			document.write("\n</tr>\n<tr>\n");
		}
		document.write("<td width='25%' align='center'>");
		printPicFrameURL(sPFFile_, i);
		printImg(i);
		document.write("</a><br>");
		printPicFrameURL(sPFFile_, i);
		printCaption(i);
		document.write("</a></td>\n");
	}
	document.write("\n</tr>\n</table>\n");
}

function printHeadderTitle()
{
	document.write("<title>Puddintater.com - ");
	document.write(sTitle_);
	document.write("</title>");
}

function printTitle()
{
	document.write(sTitle_);
}

function printImg(iIndex)
{
	//alert("printing " + saImageNames[iIndex]);
	document.write("<img src='images/france/" + saImageNames[iIndex] + "'>");
}

function printCaption(iIndex)
{
	document.write(saImageTitles[iIndex]);
}

function printPicFrameURL(sPageName, iIndex)
{
	document.write("<a class='caption' href='" + sPageName + "?current=" + iIndex + "'>");
}