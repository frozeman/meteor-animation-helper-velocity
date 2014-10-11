Package.describe({
    name: "frozeman:animation-helper-velocity",
    summary: "Animates elements inside a {{> AnimateWithVelocity}} block by adding attributes.",
    version: "0.1.6",
    git: "https://github.com/frozeman/meteor-animation-helper-velocity.git"
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@0.9.0');

    // core
    api.use('underscore', 'client');
    api.use('templating', 'client');
    api.use('jquery', 'client');

    // thirdparty
    api.use('sewdn:velocityjs@0.8.0', 'client');
    api.use('mrt:underscore-string-latest@2.3.3', 'client');

    // FILES
    api.addFiles('animation-helper-velocity.html', 'client');
    api.addFiles('animation-helper-velocity.js', 'client');
});


Package.on_test(function (api) {
    // api.use('mrt:animation-helper-velocity');
    // api.use('tinytest');
});
