window.onload = function () {
  var IPSTACK = "156aed5906a379aefdc0fa70b17fb022";
  var APPID = "7559a17ed368794014b655adee626a02";

  var weatherdata;
  var temperature;
  var city;
  var location;
  var weatherdata;
  var ipdata;
  var weathertype;
  var clouds;
  var windSpeed;
  var humidity;
  var country;

  var line1 = "thick wanket of snow";
  var line2 = "thick spanket of snow";
  var line3 = "with a winter wrap";


  
  
var fullHaiku = line1 + "\n " + line2 + "\n" + line3;
  function getCity() {

    var ipLookup = new XMLHttpRequest();
    ipLookup.onreadystatechange = function () {
      if (ipLookup.readyState == 4 && ipLookup.status == 200) {
        ipdata = JSON.parse(ipLookup.responseText);
        city = ipdata.city;
        country = ipdata.country_code;
        //document.getElementById("city").innerHTML = city;
        console.log(country);
        updateByCity();
      }

      
    };
    ipLookup.open("GET", "http://api.ipstack.com/check?access_key=" + IPSTACK, true);
    ipLookup.send();


    //console.log();


  }

  //document.getElementById("cityButton").addEventListener("click", gogogo()); 

  
  document.getElementById("cityButton").onclick = function fun() {
    gogogo();
    //validation code to see State field is mandatory.  
  }

  function gogogo(){
    m.message = 0;
    var shitty = document.getElementById("cityInput").value;
    console.log(shitty);
    var url = "http://api.openweathermap.org/data/2.5/weather?" + "q=" + shitty + "&APPID=" + APPID ;
    sendRequest(url);
  }

  
  function updateByCity() {
    var url = "http://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "," + country + "&APPID=" + APPID ;
    sendRequest(url);
  }



  function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        weatherdata = JSON.parse(xmlhttp.responseText);
        temperature = weatherdata.main.temp;
        location = weatherdata.name;
        weathertype = weatherdata.weather[0].main;
        windSpeed = weatherdata.wind.speed;
        humidity = weatherdata.main.humidity;
        clouds = weatherdata.clouds;
        changeImage();
        updateWeather();
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

  }

  function fixStyle() {
    document.getElementById("bg").style.backgroundSize = "cover";
  }

  function changeImage() {
    console.log(weathertype);
    switch (weathertype) {
      case "Rain":

        document.getElementById("bg").style.background = 'url(images/rain.jpg) no-repeat center center fixed';
        fixStyle();
        break;
      case "Clear":

        document.getElementById("bg").style.background = 'url(images/clear.jpg) no-repeat center center fixed';
        fixStyle();
        break;
      case "Clouds":

        document.getElementById("bg").style.background = 'url(images/cloudy.jpg) no-repeat center center fixed';
        fixStyle();
        break;
      case "Snow":

        document.getElementById("bg").style.background = 'url(images/snow.jpg) no-repeat center center fixed';
        fixStyle();
        break;
      case "Drizzle":

        document.getElementById("bg").style.background = 'url(images/drizzle.jpg) no-repeat center center fixed';
        fixStyle();
        break;
      case "Thunderstorm":

        document.getElementById("bg").style.background = 'url(images/thunder.jpg) no-repeat center center fixed';
        fixStyle();
        break;
      case "Mist":
        document.getElementById("bg").style.background = 'url(images/mist.jpg) no-repeat center center fixed';
        fixStyle();
        break;
    }
  }



  function updateWeather() {
    var messenger = new Messenger($('#messenger'));
    console.log(temperature);
    console.log(location);
    console.log(weathertype);
  }



  function tempFix(temp) {
    return Math.round(temp - 273.15);
  }

  var Messenger = function (el) {
    'use strict';
    var m = this;

    m.init = function () {
      m.codeletters = "abcdefghijklmnopqrstuvwxyz";
      m.message = 0;
      m.current_length = 0;
      m.fadeBuffer = false;
      m.messages = [
        line1, line2, line3, fullHaiku
      ];

      setTimeout(m.animateIn, 100);
    };

    m.generateRandomString = function (length) {
      var random_text = '';
      while (random_text.length < length) {
        random_text += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
      }

      return random_text;
    };

    m.animateIn = function () {
      if (m.current_length < m.messages[m.message].length) {
        m.current_length = m.current_length + 2;
        if (m.current_length > m.messages[m.message].length) {
          m.current_length = m.messages[m.message].length;
        }

        var message = m.generateRandomString(m.current_length);
        $(el).html(message);

        setTimeout(m.animateIn, 20);
      } else {
        setTimeout(m.animateFadeBuffer, 20);
      }
    };

    m.animateFadeBuffer = function () {
      if (m.fadeBuffer === false) {
        m.fadeBuffer = [];
        for (var i = 0; i < m.messages[m.message].length; i++) {
          m.fadeBuffer.push({ c: (Math.floor(Math.random() * 12)) + 1, l: m.messages[m.message].charAt(i) });
        }
      }

      var do_cycles = false;
      var message = '';

      for (var i = 0; i < m.fadeBuffer.length; i++) {
        var fader = m.fadeBuffer[i];
        if (fader.c > 0) {
          do_cycles = true;
          fader.c--;
          message += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
        } else {
          message += fader.l;
        }
      }

      $(el).html(message);

      if (do_cycles === true) {
        setTimeout(m.animateFadeBuffer, 50);
      } else {
        setTimeout(m.cycleText, 2000);
      }
    };

    m.cycleText = function () {
      m.message = m.message + 1;
      

      m.current_length = 0;
      m.fadeBuffer = false;
      $(el).html('');

      if(m.message < 4){
        setTimeout(m.animateIn, 200);
      }
    };

    m.init();
  }

  //console.clear();
  getCity();

};


