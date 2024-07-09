//initialize the FieldInfoArray
FieldInfoArray = new Array();
iNumFields = 0;


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
	//alert ("Running isBlank for " + sName + " - " + sType);
	var bIsBlank = false;
	if (sType == null)
	{
		sType = getFieldType(sName);
	}
	
	if (sType == "text" || sType == "textarea" || sType == "password")
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
			//alert ("checking " + sCheckName + " for blank value");
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
		{iLimit = parseInt(isInteger.arguments[1], 10);}

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
			{iDigits = parseInt(saFormat[0], 10);}
		else
			{iDigits = -1;}

		if((saFormat != null) && (saFormat[1] != ""))
			{iDecimals = parseInt(saFormat[1], 10);}
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

	if((parseInt(saEls[0], 10) > 12) || (parseInt(saEls[1], 10) > parseInt(iaDaysInMonth[parseInt(saEls[0], 10)-1], 10)))
		{return(false);}

	var iYear = parseInt(saEls[2], 10);

	if((iYear < 1900) || (iYear > 2100))
		{return(false);}

	if(((iYear % 4) != 0) && (saEls[0] == "2") && (saEls[1] == "29"))
		{return(false);}

	return(true);
} /* end isDate function */


/**
@Function boolean isFutureDate
	@Param String s
	Retruns true if the string s represents a valid future date in mm/dd/yyyy format.
*/
function isFutureDate (s) {
  if (isDate (s)) {
    var today=new Date();
    var mm=s.substring(0,2);
    var dd=s.substring(3,5);
    var yyyy=s.substring(6,10);
    if (mm.substring(0,1)=="0") {
      mm=mm.substring(1,2);
    }
    mm=parseInt(mm, 10)-1;
    dateSub=new Date (yyyy, mm, dd);
    if  (Date.parse(dateSub.toGMTString())<Date.parse(today.toGMTString())) {
      return false;
    }
  }
  else {
    return false;
  }
return true;
}//end function isFutureDate


/**
@Function boolean isPastDate
	@Param String s
	Retruns true if the string s represents a valid past date in mm/dd/yyyy format.
*/
function isPastDate (s) {
  if (isDate (s)) {
    var today=new Date();
    var mm=s.substring(0,2);
    var dd=s.substring(3,5);
    var yyyy=s.substring(6,10);
    if (mm.substring(0,1)=="0") {
      mm=mm.substring(1,2);
    }
    mm=parseInt(mm, 10)-1;
    dateSub=new Date (yyyy, mm, dd);
    if  (Date.parse(dateSub.toGMTString())>Date.parse(today.toGMTString())) {
      return false;
    }
  }
  else {
    return false;
  }
return true;
}//end function isPastDate


/**
@Function boolean isPercentage
	@Param String s
	Retruns true if the string s represents an integer between 0 and 100.
*/
function isPercentage(s)
{
	if(!(isInteger(s)))
		{return(false);}
	if(parseInt(s, 10) > 100)
		{return(false);}
	return(true);
} /* end isPercentage function */

/**
@Function boolean isTimeCardHours
	@Param String s
	Retruns true if the string s represents is a quarter integer.
*/
function isTimeCardHours(argHrs)
{
	if(argHrs == "")
		{return(true);}
	
	var saHrs = split(argHrs, ".");
	return((saHrs.length < 3) && ((parseInt(argHrs * 100, 10) % 25) == 0))
}/* end isTimeCardHours function */

/**
@Function boolean isMilitaryTime
	@Param String s
	Retruns true if the string s represents a time between 0:00 and 24:00.
*/
function isMilitaryTime(s)
{
	if(!(isInteger(s, 4)))
		{return(false);}
	if((parseInt(s) > 2400, 10) || (s.charAt(2) > '6'))
		{return(false);}
	return(true);
} /* end isMilitaryTime function */


/**
@Function boolean isTime
	@Param String s
	Retruns true if the string s represents a time between 1:00 and 12:59.
*/
function isTime(s)
{
	if(s == "")
		{return(true);}

	if(regExpSupported())
	{
		var r = new RegExp("^[0-9]{1,2}:[0-9]{2}$");
		if(!r.test(s))
			{return(false);}
		var sa = split(s, ":");
		return((parseInt(sa[0], 10) < 13) && (parseInt(sa[1], 10) < 60));
	}
	else //no regular expressions
	{
		var sa = split(s, ":");
		if(sa.lentgh != 2)
			{return(false);}
		if((!isInteger(sa[0], 2)) || (!isInteger(sa[1], 2)) || (sa[1].length != 2))
			{return(false);}		
		return((parseInt(sa[0], 10) < 13) && (parseInt(sa[1], 10) < 60));
	}
} /* end isTime function */


/**
@Function boolean isTimeCardTime
	@Param String s
	Retruns true if the string s represents a time on the quarter hour between 1:00 and 12:45.
*/
function isTimeCardTime(s)
{
	if(s == "")
		{return(true);}
		
	if(!isTime(s))
		{return(false);}
	var sa = split(s, ":");
	return((parseInt(sa[1], 10) % 15) == 0);
} /* end isTime function */


/**
@Function boolean isYear
	@Param String s
	Retruns true if the string s represents a date between 1900 and 2100.
*/
function isYear(s)
{
	if(!(isInteger(s, 4)))
		{return(false);}
	if((parseInt(s) > 2100, 10) || (parseInt(s, 10) < 1900))
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
@Function boolean isStandardCharSet
	@Param String s
	Returns true if the string s is composed of standard ANSI characters
*/
function isStandardCharSet(s)
{
	for (i = 0; i < s.length; i++)
	{
		iCode = s.charCodeAt(i);
		alert(iCode);
		if (iCode > 255)
		{
			return false;
		}
	}
	
	return true;
  
} /* end isStandardCharSet function */

/**Function isUSPhone
	Returns true if the number contains 10 numeric digits
 */
 function isUSPhone(s)
 {
	var sNewString = "";
	var sNumbers = "0123456789";
	if (s == null  || s == "")
	{
		return true;
	}
	for (i = 0; i < s.length; i++)
	{
		sChar = s.charAt(i);
		if (sNumbers.indexOf(sChar) != -1)
		{
			sNewString = sNewString + sChar;
		}
	}
	
	if (sNewString.length == 10)
	{
		return true;
	}
	
	return false;
}

/**
@Function boolean checkLength
	@Param String sString
	@Param int iMaxLen
	Retruns true if the number of characters in string sString is less than iMaxLen.
*/
function checkLength(sString, iMaxLen)
{
	
	if(sString.length > iMaxLen)
	{
		return(false);
	}
	return(true);
} /* end checkLength function */


/**
@Function boolean checkMinLength
	@Param String sString
	@Param int iMinLen
	Returns true if the number of characters in string sString is greater than iMinLen.
*/
function checkMinLength(sString, iMinLen)
{
	//alert("Checking " + sString + " for length " + iMinLen);
	if(sString.length >= iMinLen)
	{
		return(true);
	}
	return(false);
} /* end checkMinLength function */


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

/**
Begin functions pulled from Wizard Validation scripts
*/


/**
@Function String getFieldValue
	@Param String sName
	@Param String sType
	@Param Form formPanel
	Returns the value of a field as a string, separates
	multiple values with semicolons
*/
function getFieldValue (sName) {
  if (getFieldValue.arguments.length > 1) {
    sType = getFieldValue.arguments[1];
  }
  else {
    sType = getFieldType(sName);
  }
  if (getFieldValue.arguments.length > 2) {
    formPanel = getFieldValue.arguments[2];
  }
  else {
    formPanel = document.forms[0];
  }
  //alert("Type is " + sType);
  if (sType == "text" || sType == "textarea" || sType == "hidden" || sType == "password") {
    return formPanel.elements[sName].value;
  }
  if (sType == "select-one") {
    var iSel = formPanel.elements[sName].selectedIndex;
    if (iSel != -1) {
      return formPanel.elements[sName].options[iSel].value;
    }
    else {
      return "";
    }
  }      
  if (sType == "select-multiple") {
    var sValues = "";
    for (var iOptions = 0; iOptions < formPanel.elements[sName].options.length; iOptions++) {
      if (formPanel.elements[sName].options[iOptions].selected) {
        sValues = sValues + formPanel.elements[sName].options[iOptions].value + ";";
      }
    }
    sValues = sValues.substring (0, (sValues.length - 1));
    return sValues;
  }
  if (sType=="checkbox" || sType == "radio") {
    var sValues = "";
    var sCheckName;
    for (var iNum = 0; iNum < formPanel.elements.length; iNum++) {
      sCheckName = formPanel.elements[iNum].name;
      while (sName == sCheckName) {
        if (formPanel.elements[iNum].checked) {
            sValues = sValues + formPanel.elements[iNum].value + ";";
        }
        iNum++;
        if (iNum < formPanel.elements.length) {
          sCheckName = formPanel.elements[iNum].name;
        }
        else {
          sCheckName = "";
        }
      }
    }
    sValues = sValues.substring (0, (sValues.length - 1));
    return sValues;
  }
return "";
}

/**
@Function String getFieldType
	@Param String sName		
	Returns the field type given the name of a field	
*/
function getFieldType (sName) {

  if (document.forms[0].elements[sName].type != null)
  	{
  		//alert("Only one field");
  		return document.forms[0].elements[sName].type;
  	}
  	else
  	{
  		//alert("There are multiple fields");
  		return document.forms[0].elements[sName][0].type;
  	}  
}


/**
@Function String getErrorMessage
	@Param String sErrorKey
	@Param String sFieldName
	@Param Form formPanel
	@Param String sValidationFormula
	Gets the rror message for a particular error type
*/
function getErrorMessage (sErrorKey) {
  var sValidationFormula = "";
  var sFieldName = "";
  var formPanel = document.forms[0];
  var sStandardMsg = "";
  if (getErrorMessage.arguments.length > 1) {
    fieldInfo = getErrorMessage.arguments[1];
  }
  if (getErrorMessage.arguments.length > 2) {
    formPanel = getErrorMessage.arguments[2];
  }
  else {
    formPanel = document.forms[0];
  }
  if (getErrorMessage.arguments.length > 3) {
    sValidationFormula = getErrorMessage.arguments[3];
  }
  for (iMsgs=0; iMsgs < ErrorMsgArray.length; iMsgs++) {
    if (ErrorMsgArray[iMsgs].key == sErrorKey) {
      sStandardMsg = ErrorMsgArray[iMsgs].message;
      iMsgs = ErrorMsgArray.length;
    }
  }
  if (sStandardMsg != "") {
    var saMessage = split (sStandardMsg, "*");
    for (iNum=0; iNum < saMessage.length; iNum++) {
      if (saMessage[iNum] == "ValidationFormula") {
        saMessage[iNum] = sValidationFormula;
      }
      else {
        saMessage[iNum] = getMessageVariable (fieldInfo, formPanel, saMessage[iNum]);
      }     
    }
    sStandardMsg = "";
    for (iNum=0; iNum < saMessage.length; iNum++) {
      sStandardMsg = sStandardMsg + saMessage[iNum];
    }
  }
  return sStandardMsg;
}/* end function getErrorMessage */ 


/**
@Function String getMessageVariable
	@Param String sFieldName
	@Param Form formPanel
	@Param String sVal
	Returns a variable value to be used in an error message
*/
function getMessageVariable (fieldInfo, formPanel, sVal) {

  sFieldName = fieldInfo.fieldName;	
  if (sVal == "FieldLabel") {
    return fieldInfo.label;
  }
  if (sVal == "FieldValue") {
    var sType = getFieldType (sFieldName);
    return getFieldValue (sFieldName, sType, formPanel);
  }
  if (sVal == "NL") {
    return "\n";
  }
  if (sVal == "CurrentDate") {
    var today = new Date();
    var sDate = "";
    var iMonth = today.getMonth() + 1;
    if (iMonth < 10) {
      sDate = "0" + iMonth + "/";
    }
    else {
      sDate = iMonth + "/";
    }
    if (today.getDate() < 10) {
      sDate = sDate + "0" + today.getDate() + "/";
    }
    else {
      sDate = sDate + today.getDate() + "/";
    }
    var sYear = today.getYear();
   	if (today.getFullYear == null)
	{ 
		sYear = today.getYear();
		if (today.getYear() < 2000)
                 	 sYear += 1900;             
	}
    else
	{
          sYear = today.getFullYear();
	}
    sDate = sDate + sYear;
    return sDate;
  }  
return sVal
}/*EndFunction*/

/**
@Function boolean evalCondition
	@Param String sCondition
	@Param Form formPanel
	Given a formula in the form FIELD:fieldname=VAL:value
	returns the value of the expression
*/
function evalCondition (sCondition, formPanel) {
  
  if (sCondition == null || sCondition == "")
  {
  	return true;
  }
  
  var sType;  
  var saCon = split(sCondition, ";"); 
  if (saCon.length != 3) {
    return false;
  }
  var sArg1 = saCon[0];
  var sComp = saCon[1];
  var sArg2 = saCon[2];
  sType = "";
  var saArg1 = split (sArg1,":");
  if (saArg1[0].toUpperCase() == "FIELD") {
    var sName = saArg1[1];
    sType = formPanel.elements[sName].type;
    if (sType == "") {
      return false;
    }
    else {
      var sVal1 = getFieldValue (sName, sType, formPanel);
    }
  }
  else {
    var sVal1 = saArg1[1];
  }
  sType = "";
  var saArg2 = split(sArg2,":");
  if (saArg2[0].toUpperCase() == "FIELD") {
    var sName = saArg2[1];
    sType = formPanel.elements[sName].type;
    if (sType == "") {
      return false;
    }
    else {
      var sVal2 = getFieldValue (sName, sType, formPanel);
    }
  }//end FIELD if
  else {
    if(saArg2.length < 2)
     {var sVal2 = "";}
    else
     {var sVal2 = saArg2[1];}
  }
  //alert("Returning evaluation of formula " + sVal1 + "=" + sVal2);
  if (sComp == "=") { 
    return(sVal1 == sVal2);
  }
  if (sComp == "<") {
    return(sVal1 < sVal2);
  }
  if (sComp == ">") {
    return(sVal1 > sVal2);
  }
  if (sComp == "!=") {
    return(sVal1 != sVal2);
  }
  return false;
}/*end function*/


/**
@Function void setFocus
	@Param String sFieldName
	@Param String sFieldType	
	Sets the focus to the field passed to the function
*/
function setFocus(sFieldName, sFieldType)
{
  var formPanel;
  if (sFieldType == null)
  {
  	sFieldType = getFieldType(sFieldName);
  }
  for (var iForms=0; iForms < document.forms.length; iForms++) {
    formPanel = document.forms[iForms];
    if (sFieldType=="checkbox" || sFieldType == "radio") {
      if (!isOldIE ()) {
        for (var iNum = 0; iNum < formPanel.elements.length; iNum++) {
          var sCheckName = formPanel.elements[iNum].name;
          if (sFieldName == sCheckName) {
            formPanel.elements[iNum].focus();
          }
        }
      }
    }
    else {
      if(formPanel.elements[sFieldName])
      {
		formPanel.elements[sFieldName].focus();	
      }
    }
  }
}//end function


/**
@Function String[] split
	@Param String sString
	@Param String sSep
	Parses a string with the specified delimiter and returns an array
*/
function split(sString, sSep)
{ 
 if((sString == "") || (sSep == ""))
  {return(null);}

 var iToken = 0;
  for(var iSep = 0; ((iSep != -1) && (iSep != "")); iSep = sString.indexOf(sSep, (iSep += sSep.length)))
  {
    iToken++; 
    if(iSep == (sString.length - sSep.length))
     {iToken--;}
  }
  var saRet = new Array(iToken);

  iToken = 0;
  for(iStart = 0; iStart < sString.length; iStart = iEnd + sSep.length)
  {
    iEnd = sString.indexOf(sSep, iStart);
    if(iEnd == -1)
     {iEnd = sString.length;}
    saRet[iToken++] = sString.substring(iStart, iEnd);
  }
  if(saRet[0] == null)
   {saRet = null};
  return saRet;
}//end function

/**
@Function boolean isOldIE
	Returns true if browser is less than IE 3.x or lower
*/
function isOldIE()
{
  if((navigator.appName == "Microsoft Internet Explorer") && 
     (parseFloat(navigator.appVersion) < 4.0))
   {return(true);} 
  else
   {return(false);}
}//end function


/**
@Function String Trim
	@Param String s
	Removes leading and trailing spaces from the string
*/
function Trim(s)
{
  var sNew;
  var iLength = s.length;
  var i = 0;

  while(s.charAt(i) == " ")
   {i++;}

  sNew = s.substring(i,iLength);
  iLength = sNew.length;
  i = iLength - 1;

  while(sNew.charAt(i) == " ")
   {i--;}

  sNew = sNew.substring(0,++i);
  return sNew;
}


/**
@Function validateField
	Runs the validation specified in the fieldTypeInfo object
	
*/
function validateTypeInfo(fieldInfo)
{
		
	sValue = getFieldValue(fieldInfo.fieldName);
	//alert ("Running validateTypeInfo");
	if (fieldInfo.validationFunction != null && fieldInfo.validationFunction != "")
	{
		if (eval ("window." + fieldInfo.validationFunction + " != null;"))
		{
			//alert("Trying to run the validation function");
			//sFunction = "window." + fieldInfo.validationFunction + "(\"" + sValue + "\");";
			//alert(sFunction);
		  if (!(eval ("window." + fieldInfo.validationFunction + "(\"" + sValue + "\");")))
		  {
		  	alert(getErrorMessage(fieldInfo.validationFunction, fieldInfo));
		  	setFocus (fieldInfo.fieldName, formPanel.elements[fieldInfo.fieldName].type);
		  	//alert("Returning false");
			return false;
		  }
		}//end data type validation if
		
	}//end validationFunction null if
		
	//alert("maxlength " + fieldInfo.maxlength);	
	if (fieldInfo.maxlength != null && fieldInfo.maxlength != 0)
	{
		//alert("Need to check the maxlength " + fieldInfo.maxlength);
		if (!(checkLength(sValue, fieldInfo.maxlength)))
		{
			alert(getErrorMessage("checkLength", fieldInfo, document.forms[0], fieldInfo.maxlength));
			setFocus (fieldInfo.fieldName, formPanel.elements[fieldInfo.fieldName].type);
			return false;
		}
	}//end check length if
	
	return true;
	
}


/**
@Function fieldInfo
	Creates a fieldInformation object to store validation options for a given field
	
*/
function FieldInfo(sName, sLabel, bIsRequired, sConditionalFormula, sValidationFunction, iLength)
{
	
	this.fieldName = sName;
  	this.label = sLabel;
  	this.required = bIsRequired;
  	this.conditionalFormula = sConditionalFormula;
  	this.validationFunction = sValidationFunction;
  	this.maxlength = iLength;

}

function setFieldInfo(sName, sLabel, bIsRequired)
{
	//alert("Running setFieldInfo");
	
	//include the conditional validation formula if supplied
	if (setFieldInfo.arguments.length > 3) {
	    sConditionalFormula = setFieldInfo.arguments[3];
  	}
  	else {
  		sConditionalFormula = null;
  	}
  	
  	//include the validation function if supplied
  	if (setFieldInfo.arguments.length > 4) {
	    sValidationFunction = setFieldInfo.arguments[4];
	}
	else {
		sValidationFunction = null;
  	}
  	
  	//include the length if supplied
	if (setFieldInfo.arguments.length > 5) {
		iLength = setFieldInfo.arguments[5];
	}
	else {
		iLength = 0;
  	}
  	
  	//add the fieldinfo to the field information array
  	FieldInfoArray[iNumFields] = new FieldInfo(sName, sLabel, bIsRequired, sConditionalFormula, sValidationFunction, iLength);
  	iNumFields++;
  	
}


/**
@Function checkRequiredFields
	Checks all required fields as defined in the fieldInfo object	
*/
function checkRequiredFields() {
  var bAllowContinue = false;  
  if (checkRequiredFields.arguments.length > 0) {
    bAllowContinue = checkRequiredFields.arguments[0];
  }
  var sErrorMessage = "";
  var bIsComplete = true;
  var formPanel = document.forms[0];
  var firstField = null;
  
  for (var i=0; i < FieldInfoArray.length; i++) {
  	  currentField = FieldInfoArray[i];
      if (currentField.required)
      {   
      	  if (evalCondition (currentField.conditionalFormula, formPanel))
      	  {
			  if (isBlank (currentField.fieldName, formPanel.elements[currentField.fieldName].type, formPanel)) {
				sErrorMessage = sErrorMessage + currentField.label + "\n";
				bIsComplete = false;
				if (firstField == null)
				{
					firstField = currentField;
				}
			  }//end isBlank if  
		   }//end evalCondition if
      }
  }/*end FieldInfoArray loop*/
  
  if (!bIsComplete) {
    var sStandardMsg = getErrorMessage ("checkRequired", firstField.fieldName, formPanel);
    if (sStandardMsg != "") {
      sErrorMessage = sStandardMsg + "\n\n" + sErrorMessage;
    }
    else {
      sErrorMessage = "You did not complete the following required fields: \n\n" + sErrorMessage;
    }    
    if (bAllowContinue) {
      var bContinue = confirm (sErrorMessage + "\n" + sOptionalMsg);
      if (bContinue) {
        return true;
      }
      else {
        setFocus (firstField.fieldName, formPanel.elements[firstField.fieldName].type);
        return false;
      }
    }
    else { 
      alert (sErrorMessage);
      setFocus (firstField.fieldName, formPanel.elements[firstField.fieldName].type);
      return false;
    }
  }
  else {
    return true;
  }
}


/**
@Function validateFields
	Validates the data type and length of all fields
	as defined in the fieldInfo object	
*/
function validateFields() {

	formPanel = document.forms[0];
	for (var i=0; i < FieldInfoArray.length; i++)
	{
  		currentField = FieldInfoArray[i];
  		//alert("Validating " + currentField.fieldName);
  		if (!(validateTypeInfo(currentField)))
  		{
  			return false;
  		}
  	}//end for loop
  	
  	return true;
  	
}


/**
Begin navigation functions
**************************
*/

function goNext()
{
	bContinue = true;
	if (window.preValidationProcessing != null)
	{
		if (!(window.preValidationProcessing()))
		{			
			bContinue = false;
		}//end preValidation processing
	}//end preValidation if exists
	
	if (bContinue)
	{
		if (!(checkRequiredFields() && validateFields()))
		{
			bContinue = false;
		}//end checkFields if
	}
	
	if (bContinue)
	{
		if (window.postValidationProcessing != null)
		{
			if (!(window.postValidationProcessing()))
			{
				bContinue = false;
			}//end postValidation processing
		}//end postValidation if exists
	}
	
	if (bContinue)
	{
		document.forms[0].NavAction.value='next';
		document.forms[0].submit();
	}
					
}

function goPrevious()
{
	bContinue = true;
	if (window.preValidationProcessing != null)
	{
		if (!(window.preValidationProcessing()))
		{			
			bContinue = false;
		}//end preValidation processing
	}//end preValidation if exists

	if (bContinue)
	{
		if (!(validateFields()))
		{
			bContinue = false;
		}//end checkFields if
	}

	if (bContinue)
	{
		if (window.postValidationProcessing != null)
		{
			if (!(window.postValidationProcessing()))
			{
				bContinue = false;
			}//end postValidation processing
		}//end postValidation if exists
	}

	if (bContinue)
	{
		document.forms[0].NavAction.value='previous';
		document.forms[0].submit();
	}
}

function goFinish()
{
	bContinue = true;
	if (window.preValidationProcessing != null)
	{
		if (!(window.preValidationProcessing()))
		{			
			bContinue = false;
		}//end preValidation processing
	}//end preValidation if exists

	if (bContinue)
	{
		if (!(checkRequiredFields() && validateFields()))
		{
			bContinue = false;
		}//end checkFields if
	}

	if (bContinue)
	{
		if (window.postValidationProcessing != null)
		{
			if (!(window.postValidationProcessing()))
			{
				bContinue = false;
			}//end postValidation processing
		}//end postValidation if exists
	}

	if (bContinue)
	{
		document.forms[0].NavAction.value='finish';
		document.forms[0].submit();
	}
}

function goSubmit()
{
	bContinue = true;
	if (window.preValidationProcessing != null)
	{
		if (!(window.preValidationProcessing()))
		{			
			bContinue = false;
		}//end preValidation processing
	}//end preValidation if exists

	if (bContinue)
	{
		if (!(checkRequiredFields() && validateFields()))
		{
			bContinue = false;
		}//end checkFields if
	}

	if (bContinue)
	{
		if (window.postValidationProcessing != null)
		{
			if (!(window.postValidationProcessing()))
			{
				bContinue = false;
			}//end postValidation processing
		}//end postValidation if exists
	}

	return(bContinue);
	
}//end goSubmit()
			
