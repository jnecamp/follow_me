Template.buttons.events( {
    'click': function(event) {
        event.preventDefault();
        image = document.getElementById("follow-me-img");
        if (event.target.id === 'single') {
            image.style.visibility = 'hidden';
        } else {
            image.src = "images/" + event.target.id + ".png";
            image.style.visibility = 'visible';
        }
    }
});

