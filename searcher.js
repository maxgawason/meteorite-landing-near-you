


    $(document).ready(
        function getLocat() {
            $.getJSON("https://freegeoip.net/json/", function(data) {
                var lat = data['latitude'];
                var long = data['longitude'];

                var meteorObject;

                function finder(lat, long) {
                    for (i = 100000; i < 40000000; i = i + 1000) {
                        var url = "https://data.nasa.gov/resource/y77d-th95.json?$where=within_circle(geolocation,%20" + lat + ",%20" + long + ',%20' + i + ")"
                        var emptyArr = [];

                        $.ajax({
                            url: url,
                            async: false,
                            dataType: 'jsonp',
                            success: function(data) {
                                if (data[0] != emptyArr[0]) {
                                    i = 40000000;
                                    meteorObject = data
                                    return data;
                                }
                            }
                        });
                    }
                }

                finder(lat, long)
                console.log(meteorObject);
                document.getElementById("name").innerHTML = meteorObject[0]['name']


            });
        })
