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
		printThumbImg(i);
		document.write("</a><br>");
		printPicFrameURL(sPFFile_, i);
		printCaption(i);
		document.write("</a></td>\n");
	}
	document.write("\n</tr>\n</table>\n");
}
