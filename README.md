Animates elements inside a {{> AnimateWithVelocity}} block, by adding specific attributes to elements.

Requires at least Meteor version 0.8.3-rc5
<!-- Demo: http://templatesession2demo.meteor.com -->

This package uses the new UI_hooks, allowing for animation when elements get add AND removed.

Installation
============

    $ mrt add animation-helper-velocity

Usage
=====


Wrap the templates or template parts with the {{#Animate}}..{{/Animate}} helper and add the animate class to it. Then you can specify the `data-property`, `data-from-value` and `data-to-value` attributes to animate elements:

	{{#AnimateWithVelocity}}
		<div data-animate data-property="opacity" data-duration="500" data-from-value="0" data-to-value="1">
			...
		</div>
	{{/AnimateWithVelocity}}

	// or animating multiple css properties

	{{#AnimateWithVelocity}}
		<div data-animate data-properties="left, opacity" data-from-values="1000px, 0" data-to-values="0px, 1">
			...
		</div>
	{{/AnimateWithVelocity}}

Animation is triggered on render by default, if you want to disable it add:

    data-animate-on-render="false"

to your data-animate element.

## Attributes and defaults
	data-property: 'opacity',
	data-duration: 200, // milliseconds
	data-from-value: 0,
	data-to-value: 1,
	data-easing-in: 'linear',
	data-easing-out: 'linear'
	data-animate-on-render : 'true'

For properties to animate look at the velocity documentation at http://julian.com/research/velocity/

Note: You can use the attributes in plural or singular form as you wish.
