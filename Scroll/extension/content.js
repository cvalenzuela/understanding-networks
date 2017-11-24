// content.js - do things in the browser

//define scroll function
function pageScroll(direction) {
  let movement;
  if(direction == 'down'){
     movement = +100;
   } else {
     movement = -100;
  }
  window.scrollBy({
    top: movement,
    left: 0,
    behavior: 'smooth'
  });
}

// GET request from our server
function getData(){
	$.ajax({
		url: 'https://jas920.itp.io:443/',
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log(data);
			alert("Oh No! Try a refresh?");
		},
		success: function(data){
			console.log("SUCCESS");
      // page scroll when state is true
      if (data.data.direction) {
        pageScroll(data.data.direction) ;
      }
		}
	});
}

//function called when activated by chrome extension being clicked
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {

      setInterval(getData, 10);

    } // if clicked browser close
  } // function
); // addListener
