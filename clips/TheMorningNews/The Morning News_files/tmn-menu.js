function dropdownSelect(dropdown){
for (i=0;i<document.theform.elements[dropdown].options.length;i++){
if (document.theform.elements[dropdown].options[i].selected){

if (document.theform.elements[dropdown].options[i].value != ''){
location.href = 'http://themorningnews.org/archives/' + document.theform.elements[dropdown].options[i].value;
}
}
} 


}

