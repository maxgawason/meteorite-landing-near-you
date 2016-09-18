$(document).ready(


    function getLocat() {

        $.getJSON("https://freegeoip.net/json/", function(data) {
            var lat = data['latitude'];
            var long = data['longitude'];

            var meteorObject;

            function finder(lat, long) {
                for (i = 100000; i < 40000000; i = i + 100000) {
                    var url = "https://data.nasa.gov/resource/y77d-th95.json?$where=within_circle(geolocation,%20" + lat + ",%20" + long + ',%20' + i + ")"
                    var emptyArr = [];

                    $.ajax({
                        url: url,
                        async: false,
                        dataType: 'json',
                        success: function(data) {
                            if (data[0] != emptyArr[0]) {
                                i = 40000000;
                                meteorObject = data
                            }
                        }
                    });
                }
            }

            finder(lat, long)
            var meteorCoords = [];
            meteorCoords.push(meteorObject[0]['reclat']);
            meteorCoords.push(" " + meteorObject[0]['reclong']);


            document.getElementById("coord").innerHTML = meteorCoords;
            document.getElementById("name").innerHTML = meteorObject[0]['name'];
            var year = meteorObject[0]['year'];
            if(year != undefined){
              year = year.substring(0,10);
              document.getElementById("year").innerHTML = year;
            } else {
              document.getElementById("year").innerHTML = "Date Not Available";
            }
            var mass = meteorObject[0]['mass'];
            if(mass != undefined){
              document.getElementById("mass").innerHTML = meteorObject[0]['mass']
            } else {
                document.getElementById("mass").innerHTML = "Mass Not Available";
            }



            var marker;
            function initMap2() {
              var myLatLong = {lat: parseInt(meteorCoords[0]), lng: parseInt(meteorCoords[1])};

              map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLong,
                zoom: 8
              });

              marker = new google.maps.Marker({
                position: myLatLong,
                map: map,
                title: "Click Me and I'll Dance For You",
                animation: google.maps.Animation.DROP

              });
              marker.addListener('click', toggleBounce);
            }

            function toggleBounce() {
              if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
              } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
              }
            }
            initMap2();


        });
    }
  )
  function changeCity() {
    var city = document.getElementById("userInput").value;
    city = city.replace(/\s+/g, '');
    var cityCoord = [];
    function cityToCoordinates(city){
      url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=bea2b6445da179de8301b14deb5b9065';
      $.ajax({
          url: url,
          async: false,
          dataType: 'json',
          success: function(data) {
            cityCoord.push(data['coord']['lat']);
            cityCoord.push(data['coord']['lon']);
          }
      });
    }
      cityToCoordinates(city);
      if(cityCoord[0] === undefined) {
        document.getElementById('badcity').innerHTML = "Bad City Request, Please Try Again";
        return;
      }
    function getLocat2(cityCoord) {

        $.getJSON("https://freegeoip.net/json/", function(data) {
            var lat = cityCoord[0];
            var long = cityCoord[1];
            var meteorObject;

            function finder(lat, long) {
                for (i = 100000; i < 40000000; i = i + 100000) {
                    var url = "https://data.nasa.gov/resource/y77d-th95.json?$where=within_circle(geolocation,%20" + lat + ",%20" + long + ',%20' + i + ")"
                    var emptyArr = [];

                    $.ajax({
                        url: url,
                        async: false,
                        dataType: 'json',
                        success: function(data) {
                            if (data[0] != emptyArr[0]) {
                                i = 40000000;
                                meteorObject = data
                            }
                        }
                    });
                }
            }

            finder(lat, long)
            var meteorCoords = [];
            meteorCoords.push(meteorObject[0]['reclat']);
            meteorCoords.push(" " + meteorObject[0]['reclong']);


            document.getElementById("coord").innerHTML = meteorCoords;
            document.getElementById("name").innerHTML = meteorObject[0]['name'];
            var year = meteorObject[0]['year'];
            if(year != undefined){
              year = year.substring(0,10);
              document.getElementById("year").innerHTML = year;
            } else {
              document.getElementById("year").innerHTML = "Date Not Available";
            }
            var mass = meteorObject[0]['mass'];
            if(mass != undefined){
              document.getElementById("mass").innerHTML = meteorObject[0]['mass']
            } else {
                document.getElementById("mass").innerHTML = "Mass Not Available";
            }



            var marker;
            function initMap2() {
              var myLatLong = {lat: parseInt(meteorCoords[0]), lng: parseInt(meteorCoords[1])};

              map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLong,
                zoom: 8
              });

              marker = new google.maps.Marker({
                position: myLatLong,
                map: map,
                title: "Click Me and I'll Dance For You",
                animation: google.maps.Animation.DROP

              });
              marker.addListener('click', toggleBounce);
            }

            function toggleBounce() {
              if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
              } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
              }
            }
            initMap2();


        });
    }
  getLocat2(cityCoord);

}
