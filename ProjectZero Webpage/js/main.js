/* global console */
/* global i */
/* global alert */

  //====================================================================//
 // Global Variables
//====================================================================//
//settings
var animationHoldLength			= 4500, 	//the time that a greeting is held for
	timeBetweenHellos			= 5500, 	//the time between hello greetings before another can trigger
	timeBetweenInstagrams 		= 10000, 	//the time between each instagram grid
	hashtag 					= "ideony", 	//new york hashtag
	location1					= "60047", 		//San fran location id
	location2					= "3379961", 	//London location id
	location3					= "8085344", 	//Chicago location id
	location4					= "100138", 	//Palo alto location id
	location5					= "2507883", 	//Boston location id
	location6					= "51333", 		//Munich location id
	location7					= "10515124", 	//Singapore location id
	location8					= "70798210", 	//Tokyo location id
	location9					= "5838184", 	//Shanghai location id
	clientID 					= "c02881f3b2be4c04b016212322378bf2"; //clientID for instagram API

//global elements
var helloSection				= $(".helloSection"),
	instagramSection			= $(".instagramFeedContainer"),
	instagramAnimationInterval 	= null,
	timeoutBeforeAnimation		= null,
	currentSection 				= 0,
	timeout 					= 0,	//time out to get rid of custom input
	isThereCustomInput 			= false,
	isItAHoliday 				= false,
	initialAnimate  			= false,
	textGreeting 				= [],
	customGreetingArray 		= [];


function helloBounce(){
	helloSection.addClass("helloBounceStart");
	setTimeout(function(){
		helloSection.addClass("helloBounce");
	}, 20);
	setTimeout(function(){
		helloSection.removeClass("helloBounce helloBounceStart").addClass("helloBounceEnd");
		setTimeout(function(){
			helloSection.removeClass("helloBounceEnd");
		}, 600);
	}, animationHoldLength);
}

function helloScaleIn(){
	helloSection.addClass("helloScaleInStart");
	instagramSection.addClass("helloScaleInInstagram");
	setTimeout(function(){
		helloSection.addClass("helloScaleIn");
	}, 20);
	setTimeout(function(){
		helloSection.removeClass("helloScaleIn helloScaleInStart").addClass("helloScaleInEnd");
		instagramSection.removeClass("helloScaleInInstagram").addClass("helloScaleInInstagramEnd");
		setTimeout(function(){
			helloSection.removeClass("helloScaleInEnd");
			instagramSection.removeClass("helloScaleInInstagramEnd");
		}, 600);
	}, animationHoldLength);
}

function helloFlipFromTop(){
	helloSection.addClass("helloFlipFromTopStart");
	instagramSection.addClass("helloFlipFromTopInstagram");
	setTimeout(function(){
		helloSection.addClass("helloFlipFromTop");
		instagramSection.addClass("helloFlipFromTopStartInstagram");
	}, 20);
	setTimeout(function(){
		helloSection.removeClass("helloFlipFromTop helloFlipFromTopStart").addClass("helloFlipFromTopEnd");
		instagramSection.removeClass("helloFlipFromTopInstagram helloFlipFromTopStartInstagram").addClass("helloFlipFromTopEndInstagram");
		setTimeout(function(){
			helloSection.removeClass("helloFlipFromTopEnd");
			instagramSection.removeClass("helloFlipFromTopEndInstagram");
		}, 1200);
	}, animationHoldLength);
}

function helloZoomIn(){
	helloSection.addClass("helloZoomInStart");
	instagramSection.addClass("helloZoomInInstagramStart");
	setTimeout(function(){
		helloSection.addClass("helloZoomIn");
		instagramSection.addClass("helloZoomInInstagram");
	}, 20);
	setTimeout(function(){
		helloSection.removeClass("helloZoomIn helloZoomInStart").addClass("helloZoomInEnd");
		instagramSection.removeClass("helloZoomInInstagram").addClass("helloZoomInInstagramEnd");
		setTimeout(function(){
			helloSection.removeClass("helloZoomInEnd");
			instagramSection.removeClass("helloZoomInInstagramEnd");
		}, 600);
	}, animationHoldLength);
}

  //====================================================================//
 // Main Hello Animation
//====================================================================//
function helloAnimation(greetingMessage, textColor, secondaryColor){
	//variables for text
	var letterCount		= greetingMessage.length,
		fontSize 		= (((-letterCount * letterCount) / 10) + ($(window).height() / 4)),
		helloText		= $(".helloText"),
		//choose random font
		fontArray 		= ['Gotham-Bold', 'Conv_Sentinel-Bold'],
		chosenFont		= fontArray[Math.round(Math.random() * (2 - 1))];

	//make sure font-size doesn't shrink too small
	if (fontSize <= $(window).height() / 8){
		fontSize = $(window).height() / 8;
	}

	//change text, font, and color
	helloText.css({
		"color": textColor,
		"font-size": fontSize,
		"font-family": chosenFont
	}).html(greetingMessage);

	//
	$(".helloText span").css("color", secondaryColor);
	
	//choose animations
	var animationList	= [helloBounce, helloScaleIn, helloFlipFromTop, helloZoomIn],
		randomAnimNum   = Math.round(Math.random() * (animationList.length - 1)),
		randomAnimation	= animationList[randomAnimNum];

	//execture the hello
	randomAnimation();

	//stop instagram animation
	clearInterval(instagramAnimationInterval);

	//then reinitiate it
	clearTimeout(timeoutBeforeAnimation);
	timeoutBeforeAnimation = setTimeout(function(){
		studioTransitions();
	}, (animationHoldLength + timeBetweenHellos));
}

  //====================================================================//
 // Build array for text greeting
//====================================================================//
function buildTextHelloArray(){
	//basic hellos
	textGreeting 		= ["Hello", "Yo", "Welcome", "Sup", "Sup?", "Hi", "What's up?", "What is up?", "How's it going", "Why hello there", "Hiya", "G'day Mate", "Hey", "Ello", "Bonjour", "Buongiorno", "Guten tag", "Aloha", "Hola", "He-yo", "Cheerio!", "How do you do?", "No Soliciting. Unless you are selling thin mints", "<span>OMG</span> you’re here!", "You had us at hello", "You’re not in Kansas anymore", "Hello, gorgeous", "Shalom", "You made it!", "I love you so much! Sorry… too soon?", "<span>Hello</span> – Lionel Richie", "We were just thinking about you!", "#hi #howareyou", ":-)", "Howdy partner", "IDE-<span>YO Whats Up?</span>", "Namaste", "Namaskar", "Boo!", "Ni-Hao", "Greetings, Earthling!", "Ciao!", "Come on in yo", "helloWorld();", "<span>&lt;greet&gt;</span>Whats up?<span>&lt;&#47;greet&gt;</span>"];

  	  //================================================================//
	 // Time based
	//================================================================//
	var theDate		= new Date(),
		dayOfWeek 	= theDate.getDay(), //day based on 0 based index ie 0 = sunday
		timeOfDay 	= theDate.getHours(); //hours based on 0 based index

	//==DAY OF THE WEEK==//

	//if Monday
	if (dayOfWeek === 1){
		textGreeting.push(	"How was your weekend?", 
							"I hope you had a fun weekend!", 
							"It's almost Friday! Just kidding, it's Monday.");
	}

	//if Wednesday
	if (dayOfWeek === 3){
		textGreeting.push(	"Happy hump day!",
							"Happy Wednesday!",
							"Have a good hump day.");
	}

	//if Friday
	if (dayOfWeek === 5){
		textGreeting.push(	"It's almost the weekend!",
							"<span>Smile!</span> It's Friday!",
							"It's Friday, Friday!",
							"It’s Friiiiiiiiiidaaay!",
							"Happy Friday!");
	}

	//==TIME OF DAY==//

	// if between 6am and 8am
	if (timeOfDay >= 6 && timeOfDay <= 8){
		textGreeting.push(	"Srsly what are you doing here this early?",
							"Whoa, up at the break of dawn!");
	}

	// if between 8am and 11am
	if (timeOfDay >= 8 && timeOfDay <= 11){
		textGreeting.push(	"Good morning!",
							"Cock-a-doodle-doo!",
							"Good morning! We have coffee!",
							"Good morning! How’s it going?",
							"Rise and shine!",
							"Welcome, we just woke up too!",
							"Morning coffee can be found in the kitchen.",
							"Good morrow!",
							"Bon jour mon ami",
							"Top of the morning to ya!",
							"Good morning friend!");
	}

	//if between 11 and noon
	if (timeOfDay >= 11 && timeOfDay <= 12){
		textGreeting.push(	"IDEO <span>Munich</span> is just finishing work.",
							"It’s almost lunch time!");
	}

	// if between noon and 1
	if (timeOfDay >= 12 && timeOfDay <= 13){
		textGreeting.push(	"IDEO <span>San Francisco</span> just started work &amp; IDEO <span>London</span> just finished work.",
							"IDEO <span>San Francisco</span> just started work.",
							"IDEO <span>London</span> just finished work.",
							"Lunch time!",
							"Food time!",
							"Om nom nom. It's lunch time!",
							"It's lunch time. Where do you like to eat?",
							"Time to go eat lunch!",
							"It's the best part of the day, lunch!");
	}

	//if between 1pm and 2pm
	if (timeOfDay >= 13 && timeOfDay <= 14){
		textGreeting.push(	"I hope your lunch was delicious!",
							"Go somewhere exciting for lunch?",
							"I hope you had a good lunch!",
							"I wish I could eat lunch too, but I'm just a machine.");
	}

	//if between 1pm and 5pm
	if (timeOfDay >= 13 && timeOfDay <= 17){
		textGreeting.push(	"Good Afternoon!",
							"How about an afternoon pick me up?",
							"<span>CAUTION!</span> Design in progress.",
							"Do not feed the designers.",
							"Do not tap the glass. Designers scare easily.",
							"I hope you brought your Sharpies and Post-its.",
							"Beware of falling foamcore.");
	}

	

	  //================================================================//
	 // Weather
	//================================================================//
	var tomorrowsTempHigh,
		tomorrowsTempLow,
		tomorrowsTempMedian,
		tomorrowsCondition,
		newyorkTemp, bostonTemp, chicagoTemp, paloaltoTemp, sanfranTemp, munichTemp, tokyoTemp, singaporeTemp, ShanghaiTemp, londonTemp,
		newyorkCondition, bostonCondition, chicagoCondition, paloaltoCondition, sanfranCondition, munichCondition, tokyoCondition, singaporeCondition, ShanghaiCondition, londonCondition,
		weatherArray 	= [],
		hotWeatherArray = [],
		coldWeatherArray= [];

	//repeating functions
	function toCelsius(value){
		var celsius = Math.round(((value -32) * 5) / 9);
		return celsius;
	}

	//GATHER DATA
	var $url = "http://query.yahooapis.com/v1/public/yql?callback=?";
	$.when(
		//New York
		$.getJSON($url, {
			    q: "select * from xml where url=" + "\"http://weather.yahooapis.com/forecastrss?w=2459115\"",
			    format: "json"
		  	}, function (data) {
		  		newyorkTemp 		= data.query.results.rss.channel.item.condition.temp;
		  		newyorkCondition	= data.query.results.rss.channel.item.condition;
		  		tomorrowsTempHigh	= data.query.results.rss.channel.item.forecast[1].high;
		  		tomorrowsTempLow	= data.query.results.rss.channel.item.forecast[1].low;
		  		tomorrowsCondition	= data.query.results.rss.channel.item.forecast[1].text;
		  		tomorrowsTempMedian = (tomorrowsTempHigh + tomorrowsTempLow) / 2;
		}),

		//Boston
		$.getJSON($url, {
			    q: "select * from xml where url=" + "\"http://weather.yahooapis.com/forecastrss?w=2367105\"",
			    format: "json"
		  	}, function (data) {
		  		bostonTemp 		= data.query.results.rss.channel.item.condition.temp;
		  		bostonCondition = data.query.results.rss.channel.item.condition;
		  		weatherArray.push({'location': 'Boston', 'temp': bostonTemp, 'condition': bostonCondition.text.toLowerCase(), 'conditionCode': bostonCondition.code});
		}),

		//Chicago
		$.getJSON($url, {
			    q: "select * from xml where url=" + "\"http://weather.yahooapis.com/forecastrss?w=2379574\"",
			    format: "json"
		  	}, function (data) {
		  		chicagoTemp 	= data.query.results.rss.channel.item.condition.temp;
		  		chicagoCondition= data.query.results.rss.channel.item.condition;
		  		weatherArray.push({'location': 'Chicago', 'temp': chicagoTemp, 'condition': chicagoCondition.text.toLowerCase(), 'conditionCode': chicagoCondition.code});
		}),

		//Palo Alto
		$.getJSON($url, {
			    q: "select * from xml where url=" + "\"http://weather.yahooapis.com/forecastrss?w=2467861\"",
			    format: "json"
		  	}, function (data) {
		  		paloaltoTemp 		= data.query.results.rss.channel.item.condition.temp;
		  		paloaltoCondition 	= data.query.results.rss.channel.item.condition;
		  		weatherArray.push({'location': 'Palo Alto', 'temp': paloaltoTemp, 'condition': paloaltoCondition.text.toLowerCase(), 'conditionCode': paloaltoCondition.code});
		}),

		//San Francisco
		$.getJSON($url, {
			    q: "select * from xml where url=" + "\"http://weather.yahooapis.com/forecastrss?w=2487956\"",
			    format: "json"
		  	}, function (data) {
		  		sanfranTemp 	= data.query.results.rss.channel.item.condition.temp;
		  		sanfranCondition= data.query.results.rss.channel.item.condition;
		  		weatherArray.push({'location': 'San Francisco', 'temp': sanfranTemp, 'condition': sanfranCondition.text.toLowerCase(), 'conditionCode': sanfranCondition.code});
		}),

		//Munich
		$.getJSON($url, {
			    q: "select * from xml where url=" + "\"http://weather.yahooapis.com/forecastrss?w=676757\"",
			    format: "json"
		  	}, function (data) {
		  		munichTemp 		= data.query.results.rss.channel.item.condition.temp;
		  		munichCondition = data.query.results.rss.channel.item.condition;
		  		weatherArray.push({'location': 'Munich', 'temp': munichTemp, 'condition': munichCondition.text.toLowerCase(), 'conditionCode': munichCondition.code});
		}),

		//Tokyo
		$.getJSON($url, {
			    q: "select * from xml where url=" + "\"http://weather.yahooapis.com/forecastrss?w=1118370\"",
			    format: "json"
		  	}, function (data) {
		  		tokyoTemp 		= data.query.results.rss.channel.item.condition.temp;
		  		tokyoCondition	= data.query.results.rss.channel.item.condition;
		  		weatherArray.push({'location': 'Tokyo', 'temp': tokyoTemp, 'condition': tokyoCondition.text.toLowerCase(), 'conditionCode': tokyoCondition.code});
		}),

		//Singapore
		$.getJSON($url, {
			    q: "select * from xml where url=" + "\"http://weather.yahooapis.com/forecastrss?w=24703044\"",
			    format: "json"
		  	}, function (data) {
		  		singaporeTemp 		= data.query.results.rss.channel.item.condition.temp;
		  		singaporeCondition	= data.query.results.rss.channel.item.condition;
		  		weatherArray.push({'location': 'Singapore', 'temp': singaporeTemp, 'condition': singaporeCondition.text.toLowerCase(), 'conditionCode': singaporeCondition.code});
		}),

		//Shanghai
		$.getJSON($url, {
			    q: "select * from xml where url=" + "\"http://weather.yahooapis.com/forecastrss?w=2151849\"",
			    format: "json"
		  	}, function (data) {
		  		ShanghaiTemp 		= data.query.results.rss.channel.item.condition.temp;
		  		ShanghaiCondition	= data.query.results.rss.channel.item.condition;
		  		weatherArray.push({'location': 'Shanghai', 'temp': ShanghaiTemp, 'condition': ShanghaiCondition.text.toLowerCase(), 'conditionCode': ShanghaiCondition.code});
		}),

		//London
		$.getJSON($url, {
			    q: "select * from xml where url=" + "\"http://weather.yahooapis.com/forecastrss?w=26355493\"",
			    format: "json"
		  	}, function (data) {
		  		londonTemp 		= data.query.results.rss.channel.item.condition.temp;
		  		londonCondition	= data.query.results.rss.channel.item.condition;
		  		weatherArray.push({'location': 'London', 'temp': londonTemp, 'condition': londonCondition.text.toLowerCase(), 'conditionCode': londonCondition.code});
		})
	).done(function() {
		//repeating variables
		var weatherArraySize = weatherArray.length;


		//==JUST THE WEATHER==//

		//if snowing
		if (newyorkCondition.code >= 13 && newyorkCondition.code <= 16 || newyorkCondition.code === 43 || newyorkCondition.code === 46){
			textGreeting.push(	"Let It Snow! Let It Snow! Let It Snow!!",
								"Oh the weather outside is frightful.",
								"Oh the weather outside is frightful, but your smile is so delightful.",
								"Let the storm rage on! The cold never bothered me anyway.");	
		}

		//if raining
		if (newyorkCondition.code >= 10 && newyorkCondition.code <= 12 || newyorkCondition.code === 35){
			textGreeting.push(	"Rain, rain, go away. Come again another day.",
								"Remember your umbrella?",
								"Need a shower? Just head outside!");	
		}

		//if thunder
		if (newyorkCondition.code >= 2 && newyorkCondition.code <= 4 || newyorkCondition.code >= 37 && newyorkCondition.code <= 39 || newyorkCondition.code === 45 || newyorkCondition.code === 47){
			textGreeting.push(	"THOR!!!",
								"Na na-na, na na-na, THUNDER!");
		}


		//===COMPARING STUDIO===//

		//if poor condition in NY
		if (newyorkCondition.code >= 27 && newyorkCondition.code <= 30 || newyorkCondition.code >= 19 && newyorkCondition.code <= 24 || newyorkCondition.code === 25 || newyorkCondition.code === 36){
			//worse somewhere else
			for (i = 0; i < weatherArraySize; i++) { 
				if (weatherArray[i].conditionCode === 3 || weatherArray[i].conditionCode === 35 || weatherArray[i].conditionCode >= 4 && weatherArray[i].conditionCode <= 13 || weatherArray[i].conditionCode >= 15 && weatherArray[i].conditionCode <= 19 || weatherArray[i].conditionCode >= 37 && weatherArray[i].conditionCode <= 43 || weatherArray[i].conditionCode >= 46 && weatherArray[i].conditionCode <= 47){
					textGreeting.push(  "I know it's bad out, but at IDEO <span>" + weatherArray[i].location + "</span> theres <span>" + weatherArray[i].condition + ".</span>",
										"If you think it's bad here, IDEO <span>" + weatherArray[i].location + "</span> theres <span>" + weatherArray[i].condition + ".</span>");
				}
				if (weatherArray[i].conditionCode >= 0 && weatherArray[i].conditionCode <= 2){
					textGreeting.push(  "I know it's bad out, but at IDEO <span>" + weatherArray[i].location + "</span> theres a <span>" + weatherArray[i].condition + ".</span>",
										"If you think it's bad here, IDEO <span>" + weatherArray[i].location + "</span> theres a <span>" + weatherArray[i].condition + ".</span>");
				}
			}
		}

		//if bad condition in NY
		if (newyorkCondition.code >= 0 && newyorkCondition.code <= 25 || newyorkCondition.code >= 37 && newyorkCondition.code <= 47){
			//better somewhere else
			for (i = 0; i < weatherArraySize; i++) { 
				if(weatherArray[i].conditionCode >= 29 && weatherArray[i].conditionCode <= 34 || weatherArray[i].conditionCode === 36){
					textGreeting.push(  "At IDEO <span>" + weatherArray[i].location + "</span> the weather is <span>" + weatherArray[i].condition + "</span> right now",
										"Wish you were at IDEO <span>" + weatherArray[i].location + "</span>? The weather is <span>" + weatherArray[i].condition + "</span> there.");
				}
			}
			//better tomorrow
			if (weatherArray[i].conditionCode >= 29 && weatherArray[i].conditionCode <= 34 || weatherArray[i].conditionCode === 36){
				textGreeting.push(	"Don't worry, the weather will be beautiful tomorrow.",
									"Tomorrow's weather will be better. I promise.",
									"Tomorrow will be (condition).");
			}
		}

		//if its a nice condition here
		if (newyorkCondition.code >= 29 && newyorkCondition.code <= 34 || newyorkCondition.code === 24 || newyorkCondition.code === 25 || newyorkCondition.code === 36 || newyorkCondition.code === 44){
			//just for when its nice here
			textGreeting.push(	"How are you on this fine day?",
								"Isn’t is beautiful outside?",
								"It's beautiful outside, but now it's beautiful in here too.");

			//worse somewhere else
			for (i = 0; i < weatherArraySize; i++) { 
				if (weatherArray[i].conditionCode === 3 || weatherArray[i].conditionCode === 35 || weatherArray[i].conditionCode >= 4 && weatherArray[i].conditionCode <= 13 || weatherArray[i].conditionCode >= 15 && weatherArray[i].conditionCode <= 19 || weatherArray[i].conditionCode >= 37 && weatherArray[i].conditionCode <= 43 || weatherArray[i].conditionCode >= 46 && weatherArray[i].conditionCode <= 47){
					textGreeting.push( 	"Be happy it's nice outside. There are <span>" + weatherArray[i].condition + "</span>, at IDEO <span>" + weatherArray[i].location + ".</span>",
										"Poor IDEO <span>" + weatherArray[i].location + "</span>. There are <span>" + weatherArray[i].condition + "</span> there.");
				}
				if (weatherArray[i].conditionCode >= 0 && weatherArray[i].conditionCode <= 2){
					textGreeting.push( 	"Be happy it's nice outside. Theres a <span>" + weatherArray[i].condition + "</span>, at IDEO <span>" + weatherArray[i].location + ".</span>",
										"Poor IDEO <span>" + weatherArray[i].location + "</span>. Theres a <span>" + weatherArray[i].condition + ".</span>");

				}
			}
		}


		//===WEATHER THROUGHOUT THE WEEK===//

		//if its friday and the weekends weather is looking good
		if (dayOfWeek === 5){
			if (tomorrowsCondition.code >= 29 && tomorrowsCondition.code <= 34 || tomorrowsCondition.code === 24 || tomorrowsCondition.code === 25 || tomorrowsCondition.code === 36 || tomorrowsCondition.code === 44){
				textGreeting.push(	"This weekend is suppose to look beautiful!",
									"It's going to be a beautiful weekend!",
									"This weekend is looking sexy!",
									"It's going to be a sexy weekend.");
			}
		}

		//if temp > 78, but tomorrow is cooler
		if (newyorkCondition.temp > 78){
			if (tomorrowsTempMedian < newyorkCondition.temp){
				textGreeting.push(	"It'll be cooler tommorrow. I promise.",
									"It'll cool down by tomorrow.");
			}
		}

		//if temp < 50, but tomorrow is warmer
		if (newyorkCondition.temp < 50){
			if (tomorrowsTempMedian > newyorkCondition.temp){
				textGreeting.push(	"It'll be warmer tommorrow. I promise.",
									"It'll warm up by tomorrow.");
			}
		}


		//===TEMPERATURE===//

		//if its really hot here
		if (newyorkCondition.temp > 80){
			textGreeting.push(	"Remember to drink a lot of water, it’s hot.",
								"Hydrate people!",
								"Gotta love AC!",
								"I could use some ice cream right about now...",
								"Is it hot in here or is it just you?",
								"Is it hot in here or is it just my processor?");
		}
		
		//if its hot here
		if (newyorkCondition.temp > 70){
			//but hotter somewhere else
			for (i = 0; i < weatherArraySize; i++) { 
				if(weatherArray[i].temp > newyorkCondition.temp){
					hotWeatherArray.push(weatherArray[i]);
				}
			}
			if (hotWeatherArray.length > 0){
				//sort results by hottest to coolest
				hotWeatherArray.sort(function(a,b) {
				 	return a.temp < b.temp;
				});

				//use two hottest locations
				for (i = 0; i < 1; i++) {
					textGreeting.push(	"If you think it's hot here, it's <span>" + (hotWeatherArray[i].temp - newyorkCondition.temp) + "&deg;F / " + ( toCelsius(hotWeatherArray[i].temp) - toCelsius(newyorkCondition.temp) ) + "&deg;C</span> hotter at IDEO <span>" + hotWeatherArray[i].location + ".</span>",
										"If you think it's hot here, it's <span>" + hotWeatherArray[i].temp + "&deg;F / " + toCelsius( hotWeatherArray[i].temp ) + "&deg;C</span> at IDEO <span>" + hotWeatherArray[i].location + ".</span>",
										"It's <span>" + (hotWeatherArray[i].temp - newyorkCondition.temp) + "&deg;F / " + ( toCelsius(hotWeatherArray[i].temp) - toCelsius(newyorkCondition.temp) ) + "&deg;C</span> cooler here than at IDEO <span>" + hotWeatherArray[i].location + ".</span>",
										"You may be sweating, but at IDEO <span>" + hotWeatherArray[i].location + "</span> it's <span>" + hotWeatherArray[i].temp + "&deg;F / " + toCelsius( hotWeatherArray[i].temp ) + "&deg;C.</span>");
				}
			} 
		}

		//if its cold as hell here
		if (newyorkCondition.temp < 40){
			//if its cold
			textGreeting.push(	"Ice, ice baby.",
								"We have hot chocolate and coffee :)",
								"We should huddle together for warmth. Group hug!");
		}

		//if its cold here
		if (newyorkCondition.temp < 50){
			//but colder somewhere else
			for (i = 0; i < weatherArraySize; i++) { 
				if(weatherArray[i].temp < newyorkCondition.temp){
					coldWeatherArray.push(weatherArray[i]);
				}
			}
			if (coldWeatherArray.length > 0){
				//sort results by coldest to warmest
				coldWeatherArray.sort(function(a,b) {
				 	return a.temp > b.temp;
				});

				//use two coldest locations
				for (i = 0; i < 1; i++) {
					textGreeting.push(	"If you think it's cold here, it's <span>" + (newyorkCondition.temp - coldWeatherArray[i].temp) + "&deg;F / " + ( toCelsius(newyorkCondition.temp) - toCelsius(coldWeatherArray[i].temp) ) + "&deg;C</span> colder at IDEO <span>" + coldWeatherArray[i].location + ".</span>",
										"If you think it's cold here, it's <span>" + coldWeatherArray[i].temp + "&deg;F / " + toCelsius( coldWeatherArray[i].temp ) + "&deg;C</span> at IDEO <span>" + coldWeatherArray[i].location + ".</span>",
										"It's <span>" + (newyorkCondition.temp - coldWeatherArray[i].temp) + "&deg;F / " + ( toCelsius(newyorkCondition.temp) - toCelsius(coldWeatherArray[i].temp) ) + "&deg;C</span> warmer here than at IDEO <span>" + coldWeatherArray[i].location + ".</span>",
										"You may be freezing, but at IDEO <span>" + coldWeatherArray[i].location + "</span> it's <span>" + coldWeatherArray[i].temp + "&deg;F / " + toCelsius( coldWeatherArray[i].temp ) + "&deg;C.</span>");
				}
			}
		}
	});


	  //================================================================//
	 // Twitter feeds
	//================================================================//

	//if tweets from today add to array + ignore retweets
	//insert code here
	

	//https://twitter.com/NewYorkFunFacts

	//https://twitter.com/OMGFactsAnimals

	//https://twitter.com/nycgov

	//

	//trending in New York?*/
}

  //====================================================================//
 // holiday hellos
//====================================================================//
function isHoliday(){
	var date 	= new Date(),
		month 	= date.getMonth(),
		day 	= date.getDate();

		   if (month === 0 && (day >= 1 || day <= 7)){//new years week
		helloAnimation("Happy New Year!", "#62FF00", "#62FF00");
		isItAHoliday = true;
	} else if (month === 1 && day === 14){//Valentines Day
		helloAnimation("Happy valentines day!", "#FF00FF", "#FF00FF");
		isItAHoliday = true;
	} else if (month === 2 && day === 17){//St. Patrick's Day
		helloAnimation("St. Patrick's Day", "#00FF00", "#00FF00");
		isItAHoliday = true;
	} else if (month === 2 && day === 20){//first day of spring
		helloAnimation("Happy first day of spring!", "#00FF95", "#00FF95");
		isItAHoliday = true;
	} else if (month === 5 && day === 21){//first day of summer
		helloAnimation("Happy first day of summer!", "#FFBF00", "#FFBF00");
		isItAHoliday = true;
	} else if (month === 6 && day === 4){//Independence day
		helloAnimation("Happy independence day!", "#006AFF");
		isItAHoliday = true;
	} else if (month === 6 && day === 1){//Canada day
		helloAnimation("Happy Canada day from your friends up north!", "#FF0000", "#FF0000");
		isItAHoliday = true;
	} else if (month === 8 && day === 10){//Easter Egg
		helloAnimation("HELP ME I'M TRAPPED IN THIS MACHINE", "#BADA55", "#BADA55");
		isItAHoliday = true;
	} else if (month === 8 && day === 23){//first day of fall
		helloAnimation("Happy first day of fall!", "#FFBF00", "#FFBF00");
		isItAHoliday = true;
	} else if (month === 9 && day === 31){//Halloween
		helloAnimation("Boo! It's Halloween!", "#FF8000", "#FF8000");
		isItAHoliday = true;
	} else if (month === 11 && day === 21){//first day of winter
		helloAnimation("Happy first day of winter!", "#00FBFF", "#00FBFF");
		isItAHoliday = true;
	} else if (month === 11 && (day >= 20 || day <= 30)){//Happy Holidays (Christmas and such)
		helloAnimation("Happy Holidays!", "#FF0000", "#FF0000");
		isItAHoliday = true;
	}/* else { //test holiday
		helloAnimation("Test Holiday", "#F45358", "#F45358");
		isItAHoliday = true;
	}*/
}

  //====================================================================//
 // Custom input hello
//====================================================================//
//functions to test if color is valid html
function colorNameToHex(color) {
    var colors = {
        "aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff","beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887","cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff","darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f","darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1","darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff","firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff","gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f","honeydew":"#f0fff0","hotpink":"#ff69b4","indianred":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c","lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2","lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de","lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6","magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee","mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5","navajowhite":"#ffdead","navy":"#000080","oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6","palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1","saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4","tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0","violet":"#ee82ee","wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5","yellow":"#ffff00","yellowgreen":"#9acd32"
    };

    if (typeof colors[color.toLowerCase()] !== 'undefined'){
        return colors[color.toLowerCase()];
    }

    return false;
}

function checkHex(color) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
}

//update custom input message on submit click
$(".submit").click(function(){
	//get values
	var customGreeting 		= $(".formContainer textarea").val(),
		greetingDuration	= $(".formContainer select").val(),
		greetingColor		= $(".formContainer input").val(),
		errorText			= $(".errorMessage"),
		successMessage		= $(".successMessage"),
		isValidColor		= false;

	//clear error text
	errorText.html("");
	successMessage.html("");

	//check if greetingColor is a valid css color
	if (checkHex(greetingColor) || colorNameToHex(greetingColor)) {
		isValidColor = true;
	}

	//validate
	if ( customGreeting.length === 0 ){ //if custom greeting textarea is empty
		errorText.html("Input a greeting please.");
	} else if ( greetingColor.length === 0 ){ //if there is no color present
		errorText.html("Input a color like #000000, or red. You can also find colors <a href='http://color.hailpixel.com/'>here</a> or <a href='http://www.colorpicker.com/'>here</a>");
	} else if (isValidColor === false){ //if the color is valid html
		errorText.html("Format your color like #000000, or red. You can also find colors <a href='http://color.hailpixel.com/'>here</a> or <a href='http://www.colorpicker.com/'>here</a>");
	} else if ( greetingDuration.length === 0 ){
		errorText.html("Choose a duration please and thank you.");
	} else{
		//make it the default input
		isThereCustomInput = true;

		//update error text
		errorText.html("");
		successMessage.html("Your message has been updated");

		//run a test animation
		helloAnimation(customGreeting, greetingColor, greetingColor);

		//push this into a function in the global scope
		customGreetingArray = [customGreeting, greetingColor];

		//refresh page after the duration length to reset the message
		clearTimeout(timeout);
		timeout = setTimeout("location.reload(true);", greetingDuration);
	}
});

function customHello(customGreetingArray){
	helloAnimation(customGreetingArray[0], customGreetingArray[1], customGreetingArray[1]);
}

  //====================================================================//
 // The main greeting function
//====================================================================//
function textHello(){
	//variables for text
	var textColor 		= [ ["#F45358", "#3FA8B0"], ["#3FA8B0", "#D1DBBD"], ["#1695A3", "#EB7F00"], ["#F7E967", "#04BFBF"], ["#FF5335", "#306E73"], ["#45BF55", "#96ED89"], ["#FFCC5C", "#96CEB4"], ["#C93482", "#B0276F"], ["#70E8CB", "#FF5B5B"], ["#44D487", "#109489"] ],
		randomColor 	= Math.round(Math.random() * (textColor.length - 1)),
		mainColor 		= textColor[randomColor][0],
		secondaryColor  = textColor[randomColor][1],
		randomGreeting 	= Math.round(Math.random() * (textGreeting.length - 1)),
		chosenGreeting 	= textGreeting[randomGreeting];

	//animate it
	helloAnimation(chosenGreeting, mainColor, secondaryColor);
}

  //====================================================================//
 // Hello Logic
//====================================================================//
function helloLogic(){
	isHoliday();

	//test if theres a custom input
	if (isThereCustomInput === true){
		console.log("There is a custom input");
		customHello(customGreetingArray);
	//test if its a holiday
	} else if (isItAHoliday === true){
		console.log("Today is a holiday");
		isHoliday();
	} else if (isItAHoliday === false){
		//choose between text hello or video hello
		textHello();
	}
}

//on page click hello is triggered (for testing)
$(".perspective").click(function(){
	helloLogic();
});

  //====================================================================//
 // Get sensor info from Arduino and trigger hello
//====================================================================//
function getSensorInfo(){
	$.ajax({
		url: "http://10.7.1.161",
        cache: false,
        type: 'GET',
        success: function(data) {
        	//parse data into 1 or 0
			var parsedData = Number( $(data).filter(".switchState").text() );
			//if there is motion
			if (parsedData === 1){
				//function to say hello
				helloLogic();
				console.log("Motion detected");
				//only trigger hello every X seconds
				setTimeout(function(){
					getSensorInfo();
				}, timeBetweenHellos);
			//if theres no motion
			} else if (parsedData === 0){
				setTimeout(function(){
					getSensorInfo();
				}, 150);
			//in case of errors
			} else {
				setTimeout(function(){
					getSensorInfo();
					alert("No information was given from the sensor. The internet may be disconnected or the sensor may need to be restarted.");
				}, 150);
			}
        },
        error: function(){
        	alert("No sensor detected. Do one of the following: restart the sensor by disconnecting and reconnecting it, check the network connection, make sure you are on the same network as the sensor ('IDEO' not 'IDEO-guest')");
        	setTimeout(getSensorInfo(), 800);
        },
        fail: function(){
        	alert("No sensor detected. Do one of the following: restart the sensor by disconnecting and reconnecting it, check the network connection, make sure you are on the same network as the sensor ('IDEO' not 'IDEO-guest')");
        	setTimeout(getSensorInfo(), 800);
        }
    });
}

  //====================================================================//
 // Get all instagram photos from all the IDEO offices
//====================================================================//
function getInstagram(){
	//get instagram images for ny based on our hashtag
	$.ajax({
		type: "GET", dataType: "jsonp", cache: false,
		url: "https://api.instagram.com/v1/tags/" + hashtag + "/media/recent?client_id=" + clientID,
		success: function(data) {
			var images = data.data;
			for (var i = 0; i < images.length; ++i) {
				var imageUrl = images[i].images.standard_resolution.url;
				$(".ideony").append("<div class='instagramImage' style='background: url(" + imageUrl + ") no-repeat center; background-size: cover;'></div>");
			}
		}
	});
	function instagramByLocation(location, element){
		$.ajax({
			type: "GET", dataType: "jsonp", cache: false,
			url: "https://api.instagram.com/v1/locations/" + location + "/media/recent?access_token=427885839.5b9e1e6.4eca594a2d304eac8631d5fbfdd9de95&count=35",
			success: function(data) {
				var images = data.data;
				//add images to the array
				for (var i = 0; i < images.length; ++i) {
					var imageUrl = images[i].images.standard_resolution.url;
					element.append("<div class='instagramImage' style='background: url(" + imageUrl + ") no-repeat center; background-size: cover;'></div>");
				}
				//if there aren't enough images to fill then look for some more
				if (images.length < 15){
					//get the next page of results and append them to the current results
					var nextPage = data.pagination.next_url;
					//look up more images
					$.ajax({
						type: "GET", dataType: "jsonp", cache: false,
						url: nextPage,
						success: function(data2) {
							//add the new images to the array
							var images2 = data2.data;
							//add those images to the html
							for (var i = 0; i < images2.length; ++i) {
								var imageUrl = images2[i].images.standard_resolution.url;
								element.append("<div class='instagramImage' style='background: url(" + imageUrl + ") no-repeat center; background-size: cover;'></div>");
							}
							//if we still need more images
							if (images.length < 15){
								//get the next page of results and append them to the current results
								var nextPage2 = data2.pagination.next_url;
								//look up even more images
								$.ajax({
									type: "GET", dataType: "jsonp", cache: false,
									url: nextPage2,
									success: function(data3) {
										//add the new images to the array
										var images3 = data3.data;
										//add those images to the html
										for (var i = 0; i < images3.length; ++i) {
											var imageUrl = images3[i].images.standard_resolution.url;
											element.append("<div class='instagramImage' style='background: url(" + imageUrl + ") no-repeat center; background-size: cover;'></div>");
										}
									}
								});
							}
						}
					});
				} 
			}
		});
	}
	instagramByLocation(location1, $(".ideosf")); //san fran
	instagramByLocation(location2, $(".ideolondon")); //london
	instagramByLocation(location3, $(".ideochicago")); //chicago
	instagramByLocation(location4, $(".ideopaloalto")); //palo alto
	instagramByLocation(location5, $(".ideoboston")); //boston
	instagramByLocation(location6, $(".ideomunich")); //munich
	instagramByLocation(location7, $(".ideosingapore")); //singapore
	instagramByLocation(location8, $(".ideotokyo")); //tokyo
	instagramByLocation(location9, $(".ideoshanghai")); //shanghai	
}

  //====================================================================//
 // Flipping animation between studios instagram feeds
//====================================================================//
function studioTransitions(){
	var studioCount 	= $(".instagramFeed").length - 1, 
		instagramFeed	= $(".instagramFeed"),
		visibleClass	= "visible";

	//initial animation so hteres no 20 second delay
	if (initialAnimate  === false){
		studioShowAnimation(0);
		initialAnimate = true;
	}
	//animation function
	function studioShowAnimation(index){
		var appearingElement = instagramFeed.eq(index).children(".instagramImage");
		//show the label
		$(".instagramFeed img").removeClass("fadeIn");
		instagramFeed.eq(index).children("img").addClass("fadeIn");
		//do the animate thing
		appearingElement.eq(0).addClass(visibleClass);
		setTimeout(function(){
			appearingElement.eq(1).addClass(visibleClass);
			appearingElement.eq(5).addClass(visibleClass);
		}, 150);
		setTimeout(function(){
			appearingElement.eq(2).addClass(visibleClass);
			appearingElement.eq(6).addClass(visibleClass);
			appearingElement.eq(10).addClass(visibleClass);
		}, 300);
		setTimeout(function(){
			appearingElement.eq(3).addClass(visibleClass);
			appearingElement.eq(7).addClass(visibleClass);
			appearingElement.eq(11).addClass(visibleClass);
		}, 450);
		setTimeout(function(){
			appearingElement.eq(4).addClass(visibleClass);
			appearingElement.eq(8).addClass(visibleClass);
			appearingElement.eq(12).addClass(visibleClass);
		}, 600);
		setTimeout(function(){
			appearingElement.eq(9).addClass(visibleClass);
			appearingElement.eq(13).addClass(visibleClass);
		}, 750);
		setTimeout(function(){
			appearingElement.eq(14).addClass(visibleClass);
		}, 900);
	}

	function studioHideAnimation(index){
		var hidingElement = instagramFeed.eq(index).children(".instagramImage");
		hidingElement.eq(0).removeClass(visibleClass);
		setTimeout(function(){
			hidingElement.eq(1).removeClass(visibleClass);
			hidingElement.eq(5).removeClass(visibleClass);
		}, 150);
		setTimeout(function(){
			hidingElement.eq(2).removeClass(visibleClass);
			hidingElement.eq(6).removeClass(visibleClass);
			hidingElement.eq(10).removeClass(visibleClass);
		}, 300);
		setTimeout(function(){
			hidingElement.eq(3).removeClass(visibleClass);
			hidingElement.eq(7).removeClass(visibleClass);
			hidingElement.eq(11).removeClass(visibleClass);
		}, 450);
		setTimeout(function(){
			hidingElement.eq(4).removeClass(visibleClass);
			hidingElement.eq(8).removeClass(visibleClass);
			hidingElement.eq(12).removeClass(visibleClass);
		}, 600);
		setTimeout(function(){
			hidingElement.eq(9).removeClass(visibleClass);
			hidingElement.eq(13).removeClass(visibleClass);
		}, 750);
		setTimeout(function(){
			hidingElement.eq(14).removeClass(visibleClass);
		}, 900);
	}

	//repeating animation
	instagramAnimationInterval = setInterval(function(){
		//update visual animations
		if (currentSection === 0){
			studioShowAnimation(currentSection);
			studioHideAnimation(studioCount);
		} else {
			studioShowAnimation(currentSection);
			studioHideAnimation(currentSection - 1);
		}
		//update counter
		if (currentSection === studioCount){
			//restart counter
			currentSection = 0;
		} else {
			//update counter
			currentSection++;
		}
	}, timeBetweenInstagrams);
}

  //====================================================================//
 // Initialize all functions
//====================================================================//
$(document).ready(function(){
	//infinite loop to check for sensor info
	getSensorInfo();

	//setup instagram + instagram animation
	getInstagram();
	$(window).load(function(){
		studioTransitions();
	});

	//refresh text array every 2 minutes
	buildTextHelloArray();
	setInterval(function(){
		buildTextHelloArray();
		console.log("Hello text array built");
	}, 120000);
});

  //====================================================================//
 // Refresh website at midnight
//====================================================================//
$(document).ready(function(){
	var now = new Date();
	var night = new Date(
	    now.getFullYear(),
	    now.getMonth(),
	    now.getDate() + 1, // the next day, ...
	    0, 0, 0 // ...at 00:00:00 hours
	);
	var msTillMidnight = night.getTime() - now.getTime();
	setTimeout("location.reload(true);", msTillMidnight);
});