function getImageTitle(currentGallery, imageIndex) {	
	if(imageIndex < currentGallery.imageTitles.length) {		
		return(currentGallery.imageTitles[imageIndex]);
	}else {
		return("");
	}
}


var _contactSheetFile = "pow.html";
var _pictureFrameFile = "pow_pf.html";
var galleryindex = 0;
var _galleries = new Array();

/* Gallery 0 */
galleryindex = 0;
_galleries[galleryindex] = new Object();
_galleries[galleryindex].parentFile = "pow.html";
_galleries[galleryindex].parentTitle = "Picture of the Month";
_galleries[galleryindex].imageDirectory = "images/pow";
_galleries[galleryindex].imagePrefix = "";
_galleries[galleryindex].imageSuffix = " (Custom).jpg";
_galleries[galleryindex].thumbSuffix = " (Custom) (2).jpg";
_galleries[galleryindex].index = galleryindex;

_galleries[galleryindex].title = "Picture of the Month";
_galleries[galleryindex].subTitle = "Archive";
_galleries[galleryindex].imageFiles = new Array("DSC01376","L&K10th 020","Dave&ShelbysWedding.8.2003 043","GrahamsFirstWeek 041","SnowDay 008","Jack-O-Lantern 006","Peeps 004","AdriannesDeck.6-26-05 001","MitzisWedding.7.05 037","NaYoungBabyShower 016","DBReunion.9-05 037","10.7.05 026","ZacLounging 001","FirstDayOfBritishSchool 015","MyrtleBeach.12.05 014","BathAndTotLot038","ZooWithMartha 017","AshevilleAndMimis052","Easter2006705","KitchenGeorgesIslandAndPlayDate 109");
_galleries[galleryindex].imageTitles = new Array("Jan '04","May '04","Jun '04","Nov '04","Jan '05","Mar '05","Apr '05","Jun '05","Jul '05","Aug '05","Sep '05","Oct '05","Nov '05","Dec '05","Jan '06","Feb '06","Mar '06","Apr '06","May '06","Jun '06");
_galleries[galleryindex].imageComments = new Array("Taken New Year's Day 2004,<br>this photo captures the Hunter women recovering from the prior night's festivities.","Folks look down on the city during friends Limey and Kerry's 10th wedding anniversary.<br>Top of the Hub, Boston","Friend Milt looks out on the California sunset<br>during the Pehlke wedding.","Baby Graham, just days old and already with huge feet.<br>Here he's being held by his Mimi.","Pascale in snow","","These old Easter peeps were rescued from our trashcan by a squirrel","Lockie and Friend Adrianne pose on her new South End deck with Boston as the backdrop","'Mimi' and 'Grandad' Montgomery with Zac and Lockie as sister Mitzi's wedding","Lockie with friends Susan and Jode at their baby shower","Pascale and Lockie enjoy Mimi's pool","Lockie on the Emerson campus.  It's fun being a co-ed again!","Zac in the 80's.  Lockie scanned this and posted it","The castle, across the street from our house, all decked out for the holidays.<br>The lights were so bright that we needed blackout shades at night","Graham (aka baby new Year), Lockie and Gina celebrate the New Year 2006!","Graham at the tot lot","Pascale; bird's eye view","Zac contemplates nature at &quot;The Old Stone Inn&quot in North Carolina.","Busted! Graham raiding the fridge.","Zac and Pascale on George's Island");


