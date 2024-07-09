/**
@Function void ErrorMsg
	@Param String sKey
	@Param String sMessage
	Object to hold error messages
*/
function ErrorMsg(sKey, sMessage)
{
	this.key = sKey;
	this.message = sMessage;
}

//initialize the array
ErrorMsgArray = new Array();

//populate the values
ErrorMsgArray[0] = new ErrorMsg("checkRequired","You did not complete the following required fields:");
ErrorMsgArray[1] = new ErrorMsg("checkLength","*NL*You can only enter up to *ValidationFormula* characters in the *FieldLabel* field.*NL*Your entry is too long.");
ErrorMsgArray[2] = new ErrorMsg("isAlphaNum","*NL*You must enter a value with only letters and/or numbers for the *FieldLabel* field.*NL*'*FieldValue*' is not a valid value for this field.");
ErrorMsgArray[3] = new ErrorMsg("isDate","*NL*You must enter a valid date in the following format ('mm/dd/yyyy') for the *FieldLabel* field.*NL*'*FieldValue*' is not a valid date.");
ErrorMsgArray[4] = new ErrorMsg("isEmail","*NL*You must enter a valid E-Mail address for the *FieldLabel* field.*NL*'*FieldValue*' is not a valid value for this field.");
ErrorMsgArray[5] = new ErrorMsg("isFutureDate","*NL*You must enter a valid future date in the following format ('mm/dd/yyyy') for the *FieldLabel* field.*NL*'*FieldValue*' is not a valid date or does not fall after your computer's current date:  '*CurrentDate*'.");
ErrorMsgArray[6] = new ErrorMsg("isInteger","*NL*You must enter a whole number for the *FieldLabel* field.*NL*'*FieldValue*' is not a valid value for this field.");
ErrorMsgArray[7] = new ErrorMsg("isMilitaryTime","*NL*You must enter a valid time in the following format ('hhmm') between '0000' and '2400' for the *FieldLabel* field.*NL*'*FieldValue*' is not a valid military time.");
ErrorMsgArray[8] = new ErrorMsg("isNumber","*NL*You must enter a number in the following format (*FieldHelp*, e.g. *FieldExample*) for the *FieldLabel* field.*NL*'*FieldValue*' is not a valid value for this field.");
ErrorMsgArray[9] = new ErrorMsg("isPastDate","*NL*You must enter a valid past date in the following format ('mm/dd/yyyy') for the *FieldLabel* field.*NL*'*FieldValue*' is not a valid date or does not fall before your computer's current date:  '*CurrentDate*'.");
ErrorMsgArray[10] = new ErrorMsg("isTimeCardTime","*NL*You must enter a valid time in the following format ('hh:mm') between '1:00' and '12:45' for the *FieldLabel* field.*NL* The time must be on the quarter hour (e.g. xx:00, xx:15, xx:30 or xx:45)*NL*'*FieldValue*' is not a valid time.");
ErrorMsgArray[11] = new ErrorMsg("isTimeCardHours","*NL*You must enter a valid number in the following format ('x.xx') for the *FieldLabel* field.*NL* The value must represent quarter hours (e.g. x.25, x.5, x.75, x.0)*NL*'*FieldValue*' is not a valid entry.");
ErrorMsgArray[11] = new ErrorMsg("isUSPhone","*NL*You must enter a 10 digit phone number for the *FieldLabel* field.*NL* '*FieldValue*' is not a valid entry.");

