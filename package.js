Package.describe({
    summary: "Animates elements inside a {{> AnimateWithVelocity}} block, by adding specific attributes to elements."
});

Package.on_use(function (api) {

    // third party
    api.use('underscore', 'client');
    api.use('templating', 'client');
    api.use('jquery', 'client');

    api.use('velocityjs', 'client');
    api.use('underscore-string-latest', 'client');

    // FILES
    api.add_files('animation-helper-velocity.html', 'client');
    api.add_files('animation-helper-velocity.js', 'client');

});


Package.on_test(function (api) {

    api.use('animation-helper-velocity');
    api.use('tinytest');

});