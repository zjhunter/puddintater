/**
@Function boolean isBlank
	@Param String sName
	@Param String sType
	@Param Form formPanel
	Retruns true if the field named sName of type sType on form formPanel has a blank value.
		text/textarea - no characters in the value
		select list - no options selected or the item selected has no value
		checkbox || radio buttons - no options are checked
*/
function isBlank (sName, sType, formPanel)
{
	var bIsBlank = false;
	if (sType == "text" || sType == "textarea")
	{
		if (formPanel.elements[sName].value == "")
		{
			bIsBlank = true;
		}
	}
	if (sType == "select-one" || sType == "select-multiple")
	{
		var iSel = formPanel.elements[sName].selectedIndex;
		if (iSel != -1)
		{
			if (formPanel.elements[sName].options[iSel].value == "")
			{
				bIsBlank = true;
			}
		}
		else
		{
			bIsBlank = true;
		}
	}
	if (sType=="checkbox" || sType == "radio")
	{
		var bIsChecked = false;
		var sCheckName;
		for (var iNum = 0; iNum < formPanel.elements.length; iNum++)
		{
			sCheckName = formPanel.elements[iNum].name;
			while (sName == sCheckName)
			{
				if (formPanel.elements[iNum].checked)
				{
					var bIsChecked = true;
				}
				iNum++;
				if (iNum < formPanel.elements.length)
				{
					sCheckName = formPanel.elements[iNum].name;
				}
				else
				{
					sCheckName = "";
				}
			}
		}
		if (!bIsChecked)
		{
			bIsBlank = true;
		}
	}
	return bIsBlank;
} /* end isBlank function */


/**
@Function boolean isInteger
	@Param String sString
	Retruns true if the string sString represents an integer value.
*/
function isInteger(sString)
{
	var iLimit = 0;
	if(isInteger.arguments.length == 2)
		{iLimit = parseInt(isInteger.arguments[1]);}

	if(regExpSupported())
	{
		//^[0-9]$
		var sExp = "^[0-9]";

		if(iLimit > 0)
			{ sExp += "{0," + iLimit + "}$"; }
		else
			{ sExp += "*$"; }

		var r1 = new RegExp(sExp);
		return(r1.test(sString));
	}
	else
	{
		if(sString == "")
			{return(true);}

		if((iLimit > 0) && (sString.length != iLimit))
			{return(false);}

		for(var i = 0; i < sString.length; i++)
		{
			if((sString.charAt(i) < '0') || (sString.charAt(i) > '9'))
				{return(false);}
		}
		return(true);
	}
} /* end isInteger function */


/**
@Function boolean isNumber
	@Param String sValue
	Retruns true if the string sValue represents an number value.
*/
function isNumber(sValue)
{
	var sFormat = "";
	var bExact = false;

	if(isNumber.arguments.length > 1)
		{sFormat = isNumber.arguments[1];}

	if(isNumber.arguments.length > 2)
		{bExact = isNumber.arguments[2];}

	saFormat = split(sFormat, ".");

	if(regExpSupported())
	{
		//^[0-9\.]$
		var sExp = "^";
		if(sFormat != "")
		{
			for(var i = 0; i < saFormat.length; i++)
			{
				sExp += "[0-9]{" (bExact? saFormat[i]: "0") + "," + saFormat[i] + "}\\.";
			}
			sExp = sExp.substring(0, (sExp.length - 3));
		}
		else
			{ sExp = "^[0-9\\.]*$"; }

		var r1 = new RegExp(sExp);
		return(r1.test(sValue));
	}
	else
	{
		var iDot;
		var iDigits;
		var iDecimals;

		if(sValue == "")
			{return(true);}

		if((saFormat != null) && (saFormat[0] != ""))
			{iDigits = parseInt(saFormat[0]);}
		else
			{iDigits = -1;}

		if((saFormat != null) && (saFormat[1] != ""))
			{iDecimals = parseInt(saFormat[1]);}
		else
			{iDecimals = -1;}

		saValue = split(sValue, ".");

		if(sValue.charAt((sValue.length - 1)) == '.')
			{return(false);}

		if(saValue.length > 2)
			{return(false);}

		if(bExact)
		{
			if(!(isInteger(saValue[0], iDigits)))
				{return(false);}
		}
		else
		{
			if(!(isInteger(saValue[0])))
				{return(false);}
		}

		if(saValue.length > 1)
		{
			if(bExact)
			{
				if(!(isInteger(saValue[1], iDecimals)))
					{return(false);}
			}
			else
			{
				if(!(isInteger(saValue[1])))
					{return(false);}
			}
		}

		if(!(bExact) && (iDigits != -1))
		{
			if(saValue[0].length > iDigits)
				{return(false);}
		}

		if(!(bExact) && (iDecimals != -1) && (saValue.length > 1))
		{
			if(saValue[1].length > iDecimals)
				{return(false);}
		}

		return(true);
	}
} /* end isNumber function */


/**
@Function boolean checkLength
	@Param String sString
	@Param int iMaxLen
	Retruns true if the number of characters in string sString is less than iMaxLen.
*/
function checkLength(sString, iMaxLen)
{
	if(sString.length > iMaxLen)
		{return(false);}
	return(true);
} /* end checkLength function */


/**
@Function boolean isAlphaNum
	@Param String sString
	Retruns true if the string sString is comprised of only letters and numbers.
*/
function isAlphaNum(sString)
{
	if(regExpSupported())
	{
		//^[a-zA-Z0-9]*$
		var r1 = new RegExp("^[a-zA-Z0-9]*$");
		return(r1.test(sString));
	}
	else
	{
		var c;
		sString = sString.toUpperCase();

		for(var i = 0; i < sString.length; i++)
		{
			c = sString.charAt(i);
			if((c < '0') || ((c > '9') && (c < 'A')) || (c > 'Z'))
				{return(false);}
		}
		return(true);
	}
} /* end isAlphaNum function */


/**
@Function boolean isDate
	@Param String s
	Retruns true if the string s represents a valid date in mm/dd/yyyy format.
*/
function isDate(s)
{
	var iaDaysInMonth = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

	if(s == "")
		{return(true);}

	saEls = split(s, "/");
	if(saEls == null)
		{return(true);}

	if(saEls.length != 3)
		{return(false);}

	if(!isInteger(saEls[0], 2) || (!isInteger(saEls[1], 2)) || (!isInteger(saEls[2], 4)))
		{return(false);}

	if(saEls[0].charAt(0) == '0')
		{saEls[0] = saEls[0].substring(1,2);}

	if((parseInt(saEls[0]) > 12) || (parseInt(saEls[1]) > parseInt(iaDaysInMonth[parseInt(saEls[0])-1])))
		{return(false);}

	var iYear = parseInt(saEls[2]);

	if((iYear < 1900) || (iYear > 2100))
		{return(false);}

	if(((iYear % 4) != 0) && (saEls[0] == "2") && (saEls[1] == "29"))
		{return(false);}

	return(true);
} /* end isDate function */


/**
@Function boolean isPercentage
	@Param String s
	Retruns true if the string s represents an integer between 0 and 100.
*/
function isPercentage(s)
{
	if(!(isInteger(s)))
		{return(false);}
	if(parseInt(s) > 100)
		{return(false);}
	return(true);
} /* end isPercentage function */


/**
@Function boolean isMilitaryTime
	@Param String s
	Retruns true if the string s represents a time between 0:00 and 24:00.
*/
function isMilitaryTime(s)
{
	if(!(isInteger(s, 4)))
		{return(false);}
	if((parseInt(s) > 2400) || (s.charAt(2) > '6'))
		{return(false);}
	return(true);
} /* end isMilitaryTime function */


/**
@Function boolean isMilitaryTime
	@Param String s
	Retruns true if the string s represents a date between 1900 and 2100.
*/
function isYear(s)
{
	if(!(isInteger(s, 4)))
		{return(false);}
	if((parseInt(s) > 2100) || (parseInt(s) < 1900))
		{return(false);}
	return(true);
} /* end isYear function */


/**
@Function boolean isURL
	@Param String s
	Retruns true if the string s matches the format for a URL.
*/
function isURL(s)
{
	sPrefix = s.substring(0, 7);
	return(sPrefix.toLowerCase() == "http://" || sPrefix == "" || s.indexOf(" ") == -1);
}


/**
@Function boolean isEmail
	@Param String s
	Retruns true if the string s matches the format for an email address.
*/
function isEmail(s) {
  // are regular expressions supported?
	if (!regExpSupported())
		{ return((str.indexOf(".") > 2) && (str.indexOf("@") > 0) && (str.indexOf(" ") == -1)); }
	var r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
	var r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,3}|[0-9]{1,3})(\\]?)$");
	return ((!r1.test(s) && r2.test(s)) || s == "");
} /* end isEmail function */


/**
@Function boolean regExpSupported
	Retruns true if the browser supports regular expressions.
*/
function regExpSupported()
{
	if (window.RegExp)
	{
		var tempStr = "a";
		var tempReg = new RegExp(tempStr);
		if (tempReg.test(tempStr))
			{ return true; }
	}
	return false;
}/* end regExpSupported function*/


function checkRequired(fItem)
{
	var sType = fItem.type;
	var fForm = fItem.form;
	if(sType == null || fForm == null)
		{return(true);}
	else
		{return(!isBlank(fItem.name, sType, fForm));}
}