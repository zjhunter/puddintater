function getImageTitle(currentGallery, imageIndex) {	
	if(imageIndex < currentGallery.imageTitles.length) {		
		return(currentGallery.imageTitles[imageIndex]);
	}else {
		return("");
	}
}


var _contactSheetFile = "misc_cs.html";
var _pictureFrameFile = "misc_pf.html";
var galleryindex = 0;
var _galleries = new Array();

/* Gallery 0 */
galleryindex = 0;
_galleries[galleryindex] = new Object();
_galleries[galleryindex].parentFile = "index.html";
_galleries[galleryindex].parentTitle = "Puddintater";
_galleries[galleryindex].imageDirectory = "images/misc";
_galleries[galleryindex].imagePrefix = "";
_galleries[galleryindex].imageSuffix = ".JPG";
_galleries[galleryindex].thumbSuffix = " (Custom).JPG";
_galleries[galleryindex].index = galleryindex;

_galleries[galleryindex].title = "Blessing Of The Animals";
_galleries[galleryindex].subTitle = "Grace Episcopal April 19, 2008";
_galleries[galleryindex].imageFiles = new Array("GarageSalesAndAnimals036","GarageSalesAndAnimals039","GarageSalesAndAnimals043","GarageSalesAndAnimals044","GarageSalesAndAnimals077","GarageSalesAndAnimals079","GarageSalesAndAnimals081","GarageSalesAndAnimals082","GarageSalesAndAnimals083","GarageSalesAndAnimals084","GarageSalesAndAnimals087","pic 1 Grace","pic 2 grace","pic 3a grace","pic 3b grace","pic 4grace","pic 5 grace","pic 6 grace","pic 7 grace");
_galleries[galleryindex].imageTitles = new Array();
