//This document contains reusable javascript functions
//Documentations standards are as follows:
//Each function will be preceeded by a short description of what it does
//A line with it's arguments with datatype, name and presumptions
//A line describing the return value, datatype and presumptions
//See the getURLValue function for an example.

//getURLValue
//Desc: Given the name, returns the value from a 'name=value construction in the QueryString.
//		If that construction is not found for the name passed, getURLValue returns the sDefault string.
//		The name must be preceeded by either an ampersand (ASCII 38) or a question mark (ASCII 63).
//		The value is terminated by either an ampersand (ASCII 38) or the end of the string to search.
//Args: sURL (string) the string to search for the name/value pair
//		sAttrib (string) the name of the name/value pair
// 		sDefault (string) the string to return if the name/value pair is not found
	 function getURLValue(sURL, sAttrib, sDefault)
	 {
	 	var bIgnoreCase = false;
	 	if(getURLValue.arguments.length > 3)
				{bIgnoreCase = getURLValue.arguments[3];}
		if(bIgnoreCase)
		{
			sURL = sURL.toLowerCase();
			sAttrib = sAttrib.toLowerCase();
		}

	 	sAttrib = sAttrib + "=";
		var iValStart = sURL.indexOf(sAttrib);
		if(iValStart == -1)
			{return(sDefault);}
		else
		{
			var sDelim = sURL.charAt(iValStart - 1);
			if((sDelim == "&") || (sDelim == "?"))
				{iValStart += sAttrib.length;}
			else
				{return(sDefalut);}
		}
		var iValEnd = sURL.indexOf("&", iValStart);
		if(iValEnd == -1)
			{iValEnd = sURL.length;}
		return(sURL.substring(iValStart, iValEnd));
	 }

//repSubstring
//Desc: Returns a string with all instances of sFind in sString with sReplace
//Args: sString (string) the string to find and replace the substring
//		sFind (string) the substring to find in sString
// 		sReplace (string) the string to substitue for sFind
	 function repSubstring(sString, sFind, sReplace)
	 {
	     var iStart = sString.indexOf(sFind);
	     if(iStart == -1)
	     {
	     	return(sString);
	     }
	     var iEnd = iStart + sFind.length;
	     var sRet = sString.substring(0, iStart) + sReplace + sString.substring(iEnd, sString.length);
	     return(sRet);
	 }//end repSubstring	 
	 
	 
	 
	 
	 
	 /**Function stripNonNumericChars
		strips any non-numeric characters and returns the new string
	 */
	 function stripNonNumericChars(s)
	 {
		var sNewString = "";
		var sNumbers = "0123456789";
		if (s == null  || s == "")
		{
			return s;
		}
		for (i = 0; i < s.length; i++)
		{
			sChar = s.charAt(i);
			if (sNumbers.indexOf(sChar) != -1)
			{
				sNewString = sNewString + sChar;
			}
		}

		return sNewString;
	 }


	function repCharCode(sString, iFind, iReplace)
	 {
	 	var sNewString = "";	 	
	 	for (i = 0; i < sString.length; i++)
	 	{
	 		iCode = sString.charCodeAt(i);
	 		
	 		if (iCode == iFind)
	 		{
	 			sNewString = sNewString + String.fromCharCode(iReplace);
	 		}
	 		else
	 		{
	 			sNewString = sNewString + String.fromCharCode(iCode);
	 		}
	 	}
	 	
	 	return sNewString;
	 }
	 
	 function formatUSPhone(sPhone)
	 {
	 	
	 	if (sPhone == null || sPhone.length != 10)
		{
			return sPhone;
		}
		
		
		sArea = sPhone.substring(0,3);
		sPrefix = sPhone.substring(3,6);
		sSuffix = sPhone.substring(6,10);
		
		return "(" + sArea + ") " + sPrefix + "-" + sSuffix;
	}