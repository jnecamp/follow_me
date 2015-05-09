Template.auto_search_bar.onRendered(function () {
    auto_service = new google.maps.places.AutocompleteService();
    street_view_service = new google.maps.StreetViewService();
    places_service = new google.maps.places.PlacesService(document.getElementById('pano'));
    geocoder = new google.maps.Geocoder();
});

function get_nearest_pano_location(loc, radius, callback) {
    street_view_service.getPanoramaByLocation(loc, radius, function(data, status) {
        if (status == "OK") {
            callback(data.location)
        } else if (status == "ZERO_RESULTS"){
            get_nearest_pano_location(loc, radius*5, callback);
        } else {
            console.log("Problem using Street View Service");
            callback(null);
        }
    });
};

Template.auto_search_bar.events({
    'keyup #auto_search': function (event) {
        var value = event.target.value
        if (value) {
            auto_service.getPlacePredictions({ input: value }, function(predictions, status) {
                if (status == "OK") {
                    predicted_place = predictions[0].description
                    places_service.getDetails({ placeId: predictions[0].place_id }, function (result, status) {
                        if (status == "OK") {
                            geocode_req = { address: result.formatted_address }
                            geocoder.geocode(geocode_req, function(result, status) {
                                if (status == "OK") {
                                    place_location = result[0].geometry.location
                                    get_nearest_pano_location(place_location, 25, function(pano_location) {
                                        if (pano_location) {
                                            displayed_location = document.getElementById('displaying-location');
                                            displayed_location.innerHTML = predicted_place;
                                            panorama.setPosition(pano_location.latLng);
                                        }
                                    });
                                }
                            });
                        }

                    });
                }
            });
        }

    }, 'submit': function (event) {
        event.preventDefault()
    }
});

