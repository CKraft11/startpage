// JS for CKraft11's Startpagelog

// Stock Ticker API ###############################

var stockString = stocks.toString();
stockString = stockString.replace(/,/g,'%2C');
stockString = stockString.replace('^','%5E');

var apiBalance = Math.round(Math.random())

const stockOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': rapid_API_keys[apiBalance],
		'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
	}
};

fetch('https://mboum-finance.p.rapidapi.com/qu/quote?symbol='+stockString, stockOptions)
	.then(response => response.json())
	.then(response => stockStruct=stockParse(response))
	.catch(err => console.error(err));

function stockParse(apiData){
	console.log(apiData.body);
	for (var i = 0; i<stocks.length; i++) {
		var stock = apiData.body[i].symbol;
		stock = stock.replace('^','');
		var price = apiData.body[i].regularMarketPrice;
		var delta = apiData.body[i].regularMarketChange;
		var perc = apiData.body[i].regularMarketChangePercent;
		price = price.toFixed(2);
		delta = delta.toFixed(2);
		perc = perc.toFixed(2);
		if (Math.abs(delta) != delta) {
			var output = ["$" + stock +": " + price + "\xa0",delta + " (▼" + Math.abs(perc) + "%)"];
		} else {
			var output = ["$" + stock +": " + price + "\xa0","+" + delta + " (▲" + perc + "%)"];
		}
		$(document).ready(function() {
			jQuery("<a/>", {
				class: "ticker__item "+stock,
				style: "position: relative;",
				href: "https://finance.yahoo.com/quote/"+stock+"?p="+stock+"&.tsrc=fin-srch"
			}).appendTo(".ticker-scroll");
			jQuery("<a/>", {
				text: output[0],
				style: "position: relative; float: left;"
			}).appendTo("."+stock);
			if(output[1].indexOf("▼")>0){
				jQuery("<a/>", {
					text: output[1],
					style: "float: right; color: var(--red);"
				}).appendTo("."+stock);
			} else {
				jQuery("<a/>", {
					text: output[1],
					style: "float: right; color: var(--green);"
				}).appendTo("."+stock);
			}
		});
		if (debug_mode==true) {console.log(output)};
	}
	
	var stockElements = document.querySelectorAll('.ticker__item');
			console.log(stockElements);
			for (let i=0; i<stockElements.length; i++){
				stockElements[i].addEventListener('mouseenter', function(){
					document.querySelectorAll('.news__item').forEach(element => {
						element.style.display = 'none';
					});

					// This is the worst code I've ever written, but it works.
					// I'm sorry.
					// This code was mainly made for testing and messing with the API but it got bastardized into a stock screener and I went to bed.

					document.getElementsByClassName("stock__container")[0].style.display = 'flex';
					document.querySelectorAll('.ticker-scroll')[0].style.animationPlayState = 'paused';
					document.querySelectorAll('.ticker-scroll')[1].style.animationPlayState = 'paused';
					var b = i;
					if(b>=(stockElements.length)/2){
						b = b-(stockElements.length)/2;
					}
					var name = apiData.body[b].shortName;
					console.log(name);
					var ticker = apiData.body[b].symbol;	
					var ticker = ticker.replace('^','');	
					var ask = apiData.body[b].regularMarketPrice;
					if(ask>=1000){
						ask = ask.toFixed(1);
					}else {
						ask = ask.toFixed(2);
					}
					var close = apiData.body[b].regularMarketPreviousClose;
					if(close>=1000){
						close = close.toFixed(1);
					}else {
						close = close.toFixed(2);
					}
					var bid = apiData.body[b].bid;
					if(bid>=1000){
						bid = bid.toFixed(1);
					}else {
						bid = bid.toFixed(2);
					}
					var exchange = apiData.body[b].exchange;
					var exchange_TZ = apiData.body[b].exchangeTimezoneShortName;
					var marketState = apiData.body[b].marketState;
					var fifty_d_ave = apiData.body[b].fiftyDayAverage;
					fifty_d_ave = fifty_d_ave.toFixed(2);
					var fifty_d_delta = apiData.body[b].fiftyDayAverageChange;
					fifty_d_delta = fifty_d_delta.toFixed(2);
					var fifty_d_delta_perc = apiData.body[b].fiftyDayAverageChangePercent;
					fifty_d_delta_perc = (fifty_d_delta_perc*100).toFixed(2);
					var two_hund_d_ave = apiData.body[b].twoHundredDayAverage;
					two_hund_d_ave = two_hund_d_ave.toFixed(2);
					var two_hund_d_delta = apiData.body[b].twoHundredDayAverageChange;
					two_hund_d_delta = two_hund_d_delta.toFixed(2);
					var two_hund_d_delta_perc = apiData.body[b].twoHundredDayAverageChangePercent;
					two_hund_d_delta_perc = (two_hund_d_delta_perc*100).toFixed(2);

					if(apiData.body[b].quoteType == "EQUITY"){ // Allows both index funds and stocks to work
						var market_cap = apiData.body[b].marketCap;
						market_cap = market_cap.toString();
						var forward_PE = apiData.body[b].forwardPE;
						forward_PE = forward_PE.toFixed(2);
						var trailing_PE = apiData.body[b].trailingPE;
						trailing_PE = trailing_PE.toFixed(2);
					} else {
						var market_cap = "NA"
						var forward_PE = "NA"
						var trailing_PE = "NA"
					}
					

					var last_updated = apiData.body[b].regularMarketTime;// get time and convert to local string
					last_updated = new Date(last_updated * 1000);
					//console.log(last_updated.toLocaleTimeString("en-US"));
					last_updated_date = last_updated.toLocaleDateString();
					var date_options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
					last_updated_date = last_updated.toLocaleDateString('en-US', date_options);
					
					last_updated = last_updated.toLocaleTimeString("en-US");
					
					if(market_cap.length>12){
						market_cap = market_cap.substring(0,market_cap.length-12) + "T";
					}
					if(market_cap.length>9){
						market_cap = market_cap.substring(0,market_cap.length-9) + "B";
					} else if(market_cap.length>6){
						market_cap = market_cap.substring(0,market_cap.length-6) + "M";
					} else {
						market_cap = market_cap;
					}
					console.log(market_cap);
					var daily_high = apiData.body[b].regularMarketDayHigh;
					daily_high = daily_high.toFixed(2);
					var daily_low = apiData.body[b].regularMarketDayLow;
					daily_low = daily_low.toFixed(2);
					var fifty_two_w_high = apiData.body[b].fiftyTwoWeekHigh;
					fifty_two_w_high = fifty_two_w_high.toFixed(2);
					var fifty_two_w_low = apiData.body[b].fiftyTwoWeekLow;
					fifty_two_w_low = fifty_two_w_low.toFixed(2);
					if(name.length>18){
						name = name.substring(0,18) + "...";
					}
					document.getElementsByClassName("update")[0].innerHTML = "Last Updated: " + last_updated_date + " at " + last_updated;
					document.getElementById('stock__header').innerHTML = name + " ($" + ticker + ")";
					document.getElementById('ask').innerHTML = "$" + ask;
					document.getElementById('bid').innerHTML = "$" + bid;
					document.getElementById('close').innerHTML = "$" + close;
					document.getElementById('exchange').innerHTML = exchange;
					document.getElementById('exchange__tz').innerHTML = exchange_TZ;
					document.getElementById('market__state').innerHTML = marketState;
					if(marketState=="CLOSED"){
						document.getElementById('market__state').style.color = "var(--red)";
					} else {
						document.getElementById('market__state').style.color = "var(--green)";
					}
					document.getElementById('50__ave').innerHTML = fifty_d_ave;
					document.getElementById('50__change').innerHTML = fifty_d_delta;
					document.getElementById('50__change__perc').innerHTML = fifty_d_delta_perc;
					document.getElementById('200__ave').innerHTML = two_hund_d_ave;
					document.getElementById('200__change').innerHTML = two_hund_d_delta;
					document.getElementById('200__change__perc').innerHTML = two_hund_d_delta_perc;
					document.getElementById('market__cap').innerHTML = market_cap;
					document.getElementById('forward__pe').innerHTML = forward_PE;
					document.getElementById('trailing__pe').innerHTML = forward_PE;
					var daily_scale = (daily_high - daily_low)/100;
					var daily_ask = (ask-daily_low)/daily_scale;
					var fifty_two_w_scale = (fifty_two_w_high - fifty_two_w_low)/100;
					var fifty_two_w_ask = (ask-fifty_two_w_low)/fifty_two_w_scale;
					var daily_scale = (daily_high - daily_low)/100;
					var daily_close = (close-daily_low)/daily_scale;
					var daily_close_yr= (close-fifty_two_w_low)/fifty_two_w_scale;
					daily_close_yr = daily_close_yr.toFixed(2);
					if(daily_close_yr>100){
						daily_close = 100;
					}else if(daily_close_yr<0){
						daily_close = 0;
					}
					daily_close = daily_close.toFixed(2);
					if(daily_close>100){
						daily_close = 100;
					}else if(daily_close<0){
						daily_close = 0;
					}

					document.getElementById("d__marker__left").classList.remove("current__price");
					document.getElementById("d__marker__right").classList.remove("closing__price");
					document.getElementById("d__marker__right").classList.remove("current__price");
					document.getElementById("d__marker__left").classList.remove("closing__price");
					document.getElementById("y__marker__left").classList.remove("current__price");
					document.getElementById("y__marker__right").classList.remove("closing__price");
					document.getElementById("y__marker__right").classList.remove("current__price");
					document.getElementById("y__marker__left").classList.remove("closing__price");
					if(daily_ask>daily_close){
						document.getElementById('dl__delta').style.right= (100-daily_ask) + "%";
						document.getElementById('dl__delta').style.width= (daily_ask-daily_close) + "%";
						document.getElementById('dl__delta').style.borderColor= "var(--green)";
						document.getElementById('dl__delta').style.backgroundColor= "var(--green)";
						document.getElementById('yr__delta').style.right= (100-fifty_two_w_ask) + "%";
						document.getElementById('yr__delta').style.width= (fifty_two_w_ask-daily_close_yr) + "%";
						document.getElementById('yr__delta').style.borderColor= "var(--green)";
						document.getElementById('yr__delta').style.backgroundColor= "var(--green)";
						document.getElementById("y__marker__right").classList.add("current__price");
						document.getElementById("y__marker__right").innerHTML = ask;
						document.getElementById("y__marker__left").innerHTML = close;
						document.getElementById("y__marker__left").classList.add("closing__price");
						document.getElementById("d__marker__right").classList.add("current__price");
						document.getElementById("d__marker__right").innerHTML = ask;
						document.getElementById("d__marker__left").innerHTML = close;
						document.getElementById("d__marker__left").classList.add("closing__price");
					}else{
						document.getElementById('dl__delta').style.right= (100-daily_close) + "%";
						document.getElementById('dl__delta').style.width= (daily_close-daily_ask) + "%";
						document.getElementById('dl__delta').style.borderColor= "var(--red)";
						document.getElementById('dl__delta').style.backgroundColor= "var(--red)";
						document.getElementById('yr__delta').style.right= (100-daily_close_yr) + "%";
						document.getElementById('yr__delta').style.width= (daily_close_yr-fifty_two_w_ask) + "%";
						document.getElementById('yr__delta').style.borderColor= "var(--red)";
						document.getElementById('yr__delta').style.backgroundColor= "var(--red)";
						document.getElementById("y__marker__left").classList.add("current__price");
						document.getElementById("y__marker__right").innerHTML = close;
						document.getElementById("y__marker__left").innerHTML = ask;
						document.getElementById("y__marker__right").classList.add("closing__price");
						document.getElementById("d__marker__left").classList.add("current__price");
						document.getElementById("d__marker__right").innerHTML = close;
						document.getElementById("d__marker__left").innerHTML = ask;
						document.getElementById("d__marker__right").classList.add("closing__price");
					}

					// document.getElementById('d__current').style.left = daily_ask + "%";
					// console.log(daily_close);
					// document.getElementById('d__close').style.left = (d_offset_close-4) + "%";
					document.getElementById('dl__value').innerHTML = daily_low;
					document.getElementById('dh__value').innerHTML = daily_high;
					document.getElementById('yl__value').innerHTML = fifty_two_w_low;
					document.getElementById('yh__value').innerHTML = fifty_two_w_high;

					// * Ctrl + F "document.getElementById" *
					// * 78 results *
					// I really should fix this at some point
				});
				stockElements[i].addEventListener('mouseleave', function(){
					document.querySelectorAll('.ticker-scroll')[0].style.animationPlayState = 'running';
					document.querySelectorAll('.ticker-scroll')[1].style.animationPlayState = 'running';
					document.querySelectorAll('.news__item').forEach(element => {
						element.style.display = 'flex';
					});
					document.getElementsByClassName("stock__container")[0].style.display = 'none';
				});
			}
	return apiData;
}
window.onload = () => {
// News API #######################################
	fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=20&news_site=arstechnica")
	.then(response => response.json())
	.then(result => newsParse(result,2))
	.catch(error => console.log('error', error));

	var NYTnewsQueryUrl = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + nyt_API_key;
	fetch(NYTnewsQueryUrl)
	.then(function (newsData) {
		return newsData.json();
	})
	.then(function (newsData) {
		newsParse(newsData,5);
	});

	function getMultipleRandom(arr, num) {
		const shuffled = [...arr].sort(() => 0.5 - Math.random());
	
		return shuffled.slice(0, num);
	}
	async function newsParse(apiData, count) {
		console.log(apiData.results);
		var apiArticles = apiData.results
		ct = 0;
		var stories = []
		var world = 0;
		var us = 0;
		if(apiArticles[0].url.indexOf("nytimes")>0){
			for (var i = 0; i < apiArticles.length; i++) {
				if(apiArticles[i].section == "world" && world == 0) { // Making sure there is only one world story
					stories.push(apiArticles[i]);
					world++;
				}
				else if(apiArticles[i].section == "us" && us<=1) { // Making sure there is only one US story
					stories.push(apiArticles[i]);
					us++;
				}
				else if(apiArticles[i].section == "business" || apiArticles[i].section == "science" || apiArticles[i].section == "technology" || apiArticles[i].section == "politics" || apiArticles[i].section == "briefing") {
					stories.push(apiArticles[i]);
				}
			}
		} else {
			stories = apiArticles
		}
		curated = getMultipleRandom(stories, count)
		console.log(curated);
		for (var i = 0; i < curated.length; i++) {
			var title = curated[i].title;
			var url = curated[i].url;
			if(url.indexOf("nytimes")>0){
				var image = curated[i].multimedia[2].url;
				var section = curated[i].section;
				var date = curated[i].updated_date;
				var source = "NY Times"
				var urlPrefix = "https://archive.vn/newest/"
			} else{
				var image = curated[i].image_url;
				if(url.indexOf("science")>0){
					var section = "science"
				} else {
					var section = "space"
				}
				var date = curated[i].published_at;
				var source = curated[i].news_site;
				var urlPrefix = ""
			}
			
			var date = date.substring(5,7) + "-" + date.substring(8,10) + "-" + date.substring(0,4);
			console.log(date);
			var output = [title, url, image, section, date, source, urlPrefix];
			j=document.querySelectorAll('.news__item').length+1;
			$(document).ready(function() {
				jQuery("<a/>", {
					class: "news__item story_"+j,
					href: output[6] + output[1] + "#0%"
				}).appendTo(".news");
				jQuery("<div/>", {
					class: "news__info info__"+j,
					text: output[5]+" • "
				}).appendTo(".story_"+j);
				
				jQuery("<div/>", {
					class: "news__category color",
					text: output[3]
				}).appendTo(".info__"+j);
				jQuery("<div/>", {
					text: "• " + output[4],
					style: "font-size: inherit;"
				}).appendTo(".info__"+j);
				document.querySelectorAll(".news__category").forEach(element => {
					element.setAttribute('data-color', "1");
				});
				jQuery("<div/>", {
					class: "news__title",
					text: output[0]
				}).appendTo(".story_"+j);
				jQuery("<img/>", {
					class: "news__image",
					src: output[2]
				}).appendTo(".story_"+j);
			});
			if (debug_mode==true) {console.log(output)};
			}
			
		}
		return;
	}

	// Search #########################################

	function search(e) {
		if (e.keyCode == 13) {
			var val = document.getElementById("search-field").value;
			window.open("https://google.com/search?q=" + val);
		}
	}
	document.addEventListener("keydown", event => {
		if (event.keyCode == 32) {          // Spacebar code to open search
			document.getElementById('search').style.display = 'flex';
			var divsToHide = document.getElementsByClassName("container"); //divsToHide is an array
				for(var i = 0; i < divsToHide.length; i++){
					divsToHide[i].style.visibility = "hidden"; // or
			}
			var stockHide = document.getElementsByClassName("ticker__item"); //divsToHide is an array
				for(var i = 0; i < stockHide.length; i++){
					stockHide[i].style.visibility = "hidden"; // or
			}
			
			document.getElementById('search-field').focus();
		} else if (event.keyCode == 27) {   // Esc to close search
			document.getElementById('search-field').value = '';
			document.getElementById('search-field').blur();
			document.getElementById('search').style.display = 'none';
			var divsToHide = document.getElementsByClassName("container"); //divsToHide is an array	
				for(var i = 0; i < divsToHide.length; i++){
					divsToHide[i].style.visibility = "visible"; // or
			}
			var stockHide = document.getElementsByClassName("ticker__item"); //divsToHide is an array
				for(var i = 0; i < stockHide.length; i++){
					stockHide[i].style.visibility = "visible"; // or
			}
		}
	});

	// Clock ##########################################

	function getTime() {
		let date = new Date(),
			min = date.getMinutes(),
			sec = date.getSeconds(),
			hour = date.getHours();

		return "" + 
			(hour < 10 ? ("0" + hour) : hour) + ":" + 
			(min < 10 ? ("0" + min) : min) + ":" + 
			(sec < 10 ? ("0" + sec) : sec);
	}
	document.getElementById("clock").innerHTML = getTime();
    // Set clock interval to tick clock
    setInterval( () => {
        document.getElementById("clock").innerHTML = getTime();
	},100);


// Weather API ####################################

	document.getElementById("weather").innerHTML = localStorage['weather'];
	let xhr = new XMLHttpRequest();
	// Request to open weather map
	navigator.geolocation.getCurrentPosition((position) => {
		let lat = position.coords.latitude.toFixed(2);
		let long = position.coords.longitude.toFixed(2);
		xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&units=imperial&appid='+weather_API_key);
		xhr.onload = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					let json = JSON.parse(xhr.responseText);
					if (debug_mode==true) {console.log(json)};
					let location = json.name; 
					if(location.indexOf(' ')>-1){
						let locationArr = location.split(" ");
						if (debug_mode==true) {console.log(locationArr)};
						location = locationArr[0]+" "+locationArr[1];
					}
					document.getElementById("weather").innerHTML = json.weather[0].description + ", ";
					document.getElementById("weather").innerHTML += json.main.temp.toFixed(0) + "°F in " + location;
					localStorage['weather'] = document.getElementById("weather").innerHTML;
					document.getElementById("weather").setAttribute("href", "https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat="+lat+"&lon="+long+"&zoom=12");
				} else {
					console.log('weather error msg: ' + xhr.status);
				}
			}
		}
		xhr.send();
	});
	
// Link Manipulation ##################################

	var tabs = document.querySelectorAll('.tab:not(.space):not(.extra)');
		for (let i=0; i<tabs.length; i++){
			for (let j=0; j<links_var[i].length; j++){
				var k = 0;
				var a_element = document.createElement('a');
				a_element.setAttribute('data-id', 'i' + i + '_j' + j);
				a_element.setAttribute('class', 'linksel');
				a_element.innerHTML = links_var[i][j][0];
				pingStatus = links_var[i][j][2];

				// Idk why I defined all the b_element stuff twice or why there isn't a CSS class for it but it breaks things if I change anything so thats a later problem.

				if(pingStatus.indexOf('true')>-1){
					ping(links_var[i][j][1]).then(function(delta) {
						if (debug_mode==true) {console.log(links_var[i][j][1]+ ' Ping time was ' + String(delta) + ' ms')};
						var b_element = document.createElement('span');
						b_element.setAttribute('ping-id', 'i' + i + '_j' + j);
						b_element.setAttribute('class', 'linksel');
						b_element.setAttribute('class', 'tab'+(i+1));
						b_element.style.position="relative";
						b_element.style.marginLeft="auto";
						b_element.style.float="right";
						b_element.style.justifyContent="right";
						b_element.style.color="#A3BE8C";
						b_element.innerHTML = "Online ("+String(delta)+"ms) ⬤";
						document.querySelector('a[data-id="i' + i + '_j' + j + '"]').insertAdjacentElement('beforeend', b_element)
						

					}).catch(function(err) {
						var b_element = document.createElement('span');
						b_element.setAttribute('ping-id', 'i' + i + '_j' + j);
						b_element.setAttribute('class', 'tab'+(i+1));
						b_element.style.position="relative";
						b_element.style.marginLeft="auto";
						b_element.style.float="right";
						b_element.style.justifyContent="right";
						b_element.style.color="#BF616A";
						b_element.innerHTML = "Offline ⬤";
						document.querySelector('a[data-id="i' + i + '_j' + j + '"]').insertAdjacentElement('beforeend', b_element)
						console.error(links_var[i][j][1]+ 'Could not ping remote URL', err);
					});
				}
				//a_element = a_element.style.display = 'none';	
				if (typeof links_var[i][j][1] == 'string'){
					a_element.href = links_var[i][j][1];
					a_element.classList.add("tab"+(i+1));
					document.getElementsByClassName("content")[0].appendChild(a_element);
					a_element = a_element.style.display = 'none';	
				}
				else {
					a_element.classList.add("tab"+(i+1));
					document.getElementsByClassName("content")[0].appendChild(a_element);
					a_element = a_element.style.display = 'none';
					for (let k=0; k<links_var[i][j][1].length; k++){
						document.querySelector('a[data-id="i' + i + '_j' + j + '"]').setAttribute('data-link_' + k, links_var[i][j][1][k][1]);
					}
					document.querySelector('a[data-id="i' + i + '_j' + j + '"]').addEventListener('click', function(event){
						for (let k=0; k<links_var[i][j][1].length; k++){
							event.preventDefault();
							window.open(document.querySelector('a[data-id="i' + i + '_j' + j + '"]').getAttribute('data-link_' + k));
						}
					})
				}
			}
		}
	
// Color Changing #################################
	
	var tabs = document.querySelectorAll('.tab:not(.space):not(.extra)');
	var contents = document.querySelectorAll('.content');
	document.querySelectorAll('.tab1').forEach(element => {
		element.style.display = 'flex';
	});
	for (let i=0; i<tabs.length; i++){
		tabs[i].addEventListener('mouseenter', function(){
			var color = document.querySelectorAll('.color');
			document.querySelectorAll('.linksel').forEach(element => {
				element.style.display = 'none';
			});
			document.querySelectorAll('.tab'+(i+1)).forEach(element => {
				element.style.display = 'flex';
			});
			color.forEach(element => {
				element.setAttribute('data-color', i+1);
			});
			for (let j=0; j<tabs.length; j++){
				tabs[j].classList.remove('active');
			}
			tabs[i].classList.add('active');
		})
	}
		
