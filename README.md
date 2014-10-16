Animates elements inside a {{> AnimateWithVelocity}} block, by adding specific attributes to elements.

This package uses the new UI_hooks, allowing for animation when elements get add AND removed.

Installation
============

    $ meteor add frozeman:animation-helper-velocity

Usage
=====


Wrap templates or template parts with the {{#AnimateWithVelocity}}..{{/AnimateWithVelocity}} helper. Elements with the `data-animate` attribute and additional attributes will be animated when Meteor adds or removes them (e.g. when using {{#if}}...{{/if}} statements, or rendering templates):

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

Note: Animation is triggered on render by default, if you want to disable it add the following attribute to your data-animate element:

    data-animate-on-render="false"

## Possible attributes and defaults
	data-property: 'opacity',
	data-duration: 200, // milliseconds
	data-from-value: 0,
	data-to-value: 1,
	data-easing-in: 'linear',
	data-easing-out: 'linear'
	data-animate-on-render : 'true'

For properties to animate look at the velocity documentation at http://julian.com/research/velocity/

Note: You can use the attributes in plural or singular form as you wish (`data-to-value` or `data-to-values`).
