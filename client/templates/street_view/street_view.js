Template.street_view_map.onRendered(function (){
    var stanford = new google.maps.LatLng(37.42410599999999, -122.1660756);
    var panoramaOptions = {
        position: stanford,
        pov: {
            heading: 34,
            pitch: 10
        }
    };
    panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
    panorama.setVisible(true);
});

Template.street_view_map.events({
    "click #follow-me-img": function(event) {
        Alerts.add("No touching!!");

    }
});
