var data;



function formatDate(date){
	var d = new Date(date).toLocaleDateString("en-US",
	  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
	return d;
}


function Node(appendTo, domType, className, optionalText){
	var node = document.createElement(domType); 
	node.className = className;
	appendTo.appendChild(node);
	if(optionalText){
		var tNode = document.createTextNode(optionalText);
		node.appendChild(tNode);
	}
	return node;
}

function createPromoPage(promoNum){
	var prom = data.promotion_objects[promoNum-1];
	console.log(formatDate(prom.drawings[0].drawing_date))
	
	var centerHolder = Node(document.body, "div", "pholder" ); 
	
	var redDate = formatDate(prom.drawings[0].entry_deadline)
	var redLine = Node(centerHolder, "P", "predtop", "The Next Entry Deadline is "+redDate ); 
	
	var promoImg = Node(centerHolder, "img", "pimg" ); 
	promoImg.src = prom.promo_image_url;
	
	var name = Node(centerHolder, "P", "ppromname", prom.promotion_name);
	var summary = Node(centerHolder, "P", "psum", prom.summary);
	
	var drawsched = Node(centerHolder, "P", "ptabletitle", "Drawing Schedule");
	
	var drawTable = Node(centerHolder, "table", "pdtab");
	var drawHead = Node(drawTable, "thead", "draw");
	var drawHeadRow = Node(drawHead, "tr", "draw");
	 var drawHeadt1 = Node(drawHeadRow, "th", "draw", "PRIZE");
	 var drawHeadt2 = Node(drawHeadRow, "th", "draw", "ENTRY DEADLINE");
	 var drawHeadt3 = Node(drawHeadRow, "th", "draw", "DRAWING DATE");
	for(var currdraw in prom.drawings){
		var tempRow = Node(drawTable, "tr", "draw");
		 var drawHeadt1 = Node(tempRow, "td", "draw", (prom.drawings[currdraw].prize).replace(" Cash Prize","") );
		 var drawHeadt2 = Node(tempRow, "td", "draw", formatDate(prom.drawings[currdraw].entry_deadline) );
		 var drawHeadt3 = Node(tempRow, "td", "draw", formatDate(prom.drawings[currdraw].drawing_date) );
	}
	
	var summary = Node(centerHolder, "P", "psum", prom.entry_info);
	
	var enterNum = prom.entries.length;
	var enters = Node(centerHolder, "P", "ptabletitle", "Your Total Tickets Entered: " + enterNum);
	
	var enters = Node(centerHolder, "P", "predsubtext", "All entries are locked in at the time they are submitted and cannot be deleted.");

	var entTable = Node(centerHolder, "table", "pdtab");
	var entHead = Node(entTable, "thead", "ent");
	var entHeadRow = Node(entHead, "tr", "ent");
	 var entHeadt1 = Node(entHeadRow, "th", "ent", "ENTRY NUMBER");
	 var entHeadt2 = Node(entHeadRow, "th", "ent", "DATE");
	for(var current in prom.entries){
		var tempRow = Node(entTable, "tr", "ent");
		 var entHeadt1 = Node(tempRow, "td", "ent", prom.entries[current].entry_number );
		 var entHeadt2 = Node(tempRow, "td", "ent", formatDate(prom.entries[current].date) );
	}
	
}


function crateMainNode(prom, n){
	try{
	var nodeHolder = Node(document.body, "div", "mholder" ); 
	
	var promoImg = Node(nodeHolder, "img", "mimg" ); 
	promoImg.src = prom.promo_image_url;
	
	var titleLinkP = Node(nodeHolder, "P", "mlinkp" ); 
	var titleLink = Node(titleLinkP, "A", "mlink", prom.promotion_name); 
	titleLink.href = "?promo=promo0"+(n+1);
	
	var summary = Node(nodeHolder, "P", "msum", prom.summary); 
	
	var usDate = formatDate(prom.drawings[0].drawing_date)
	var nextDate = Node(nodeHolder, "P", "mdate", "Next Drawing Date: " + usDate); 
	
	
	return;
	}catch(e){console.log(e)}
}

function createMainPage(){
	
	for(var i=0; i<data.promotion_objects.length; i++){
		var currProm = data.promotion_objects[i];
		crateMainNode(currProm, i)	
	}
	
	return;
}



function decidePage(){
	var urlParams = new URLSearchParams(window.location.search);
	if (urlParams.has("promo")){
		document.body.className = "promo";
		var promoNum = parseInt(urlParams.get("promo").replace("promo",""))
		createPromoPage( promoNum );
	} else {
		document.body.className = "main";
		createMainPage();
	}
}

function loadData(){
	fetch("js/webdevtest-data.js").then(response => response.json())
    .then(data => {
        window.data = data;
		decidePage();
    });

	return;
}




