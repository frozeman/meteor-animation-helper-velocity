/**
Aniamtion-Helper

@module package animation-helper-velocity
**/

var defaultDuration = 200;


/**
The renderd method, which adds the hooks.

*/
Template['AnimateWithVelocity'].rendered = function(){

    // HACK: initial animation rendered, as insertElement, doesn't seem to fire
    this.$('*[data-animate]').each(function(){
        var $item = $(this);
        
        
        // prevent when the insertElement hook already animated and avoid animation on rendering if animate-on-render option is false
        var animateOnRender = $item.data('animate-on-render') === false ? false : true;
        if(!$item.hasClass('animating') && animateOnRender) {
            var animationProperty = generateAnimationProperties(this);
            $item.velocity(animationProperty.from, {duration: 0}).velocity(animationProperty.to, {
                duration: $item.data('duration') || defaultDuration,
                easing: animationProperty.easingIn[animationProperty.property],
                complete: function () {
                    $item = null;
                }
            });
        }
    });

    // add the parentNode te the instance, so we can access it in the destroyed function
    this._animation_helper_parentNode = this.firstNode.parentNode;

    this._animation_helper_parentNode._uihooks = {
        insertElement: function (node, next) {

            var $node = $(node);

            $node.insertBefore(next);

            if(typeof $node.data('animate') !== 'undefined') {
                var animationProperty = generateAnimationProperties(node);
                $node.velocity(animationProperty.from, {duration:0}).velocity(animationProperty.to, {
                    duration: $node.data('duration') || defaultDuration,
                    easing: animationProperty.easingIn[animationProperty.property],
                    complete: function () {
                        $node = null;
                    }
                });
            }

        },
        removeElement: function (node) {

            var $node = $(node);

            if(typeof $node.data('animate') !== 'undefined') {
                var animationProperty = generateAnimationProperties(node);


                // animate
                $node.velocity(animationProperty.from, {
                    duration: $node.data('duration') || defaultDuration,
                    easing: animationProperty.easingOut[animationProperty.property],
                    complete: function () {
                        $node.remove();
                        $node = null;
                    }
                });

            // otherwise remve immedediately
            } else {
                $node.remove();
                $node = null;
            }

        }
    };
};

/**
The destroyed method, which remove the hooks to make sure, they work again next time.

*/
Template['AnimateWithVelocity'].destroyed = function(){
    var template = this;
    Meteor.defer(function(){
        template._animation_helper_parentNode._uihooks = null;
    });
};


// METHODS

/**
Generate the property object for animation

@param {Object} element  the DOM element
*/
var generateAnimationProperties = function(element) {
    var animationProperty = {
            property: 'opacity',
            from: {},
            to: {},
            easingIn: {},
            easingOut: {}
        },
        $element = $(element),
        properties = ['opacity'],
        fromValues = [0],
        toValues = [1],
        easingsInValues = ['linear'],
        easingsOutValues = ['linear'];


    // use singular, or plural
    properties = typeof $element.data('property') !== 'undefined'
        ? $element.data('property').split(',')
        : ((typeof $element.data('properties') !== 'undefined') ? $element.data('properties').split(',') : properties),
    
    fromValues = typeof $element.data('from-value') !== 'undefined'
        ? String($element.data('from-value')).split(',')
        : ((typeof $element.data('from-values') !== 'undefined') ? String($element.data('from-values')).split(',') : fromValues),
    
    toValues = typeof $element.data('to-value') !== 'undefined'
        ? String($element.data('to-value')).split(',')
        : ((typeof $element.data('to-values') !== 'undefined') ? String($element.data('to-values')).split(',') : toValues);

    easingsInValues = typeof $element.data('easing-in') !== 'undefined'
        ? String($element.data('easing-in')).split(',')
        : ((typeof $element.data('easing-in') !== 'undefined') ? String($element.data('easing-in')).split(',') : easingsInValues);

    easingsOutValues = typeof $element.data('easing-out') !== 'undefined'
        ? String($element.data('easing-out')).split(',')
        : ((typeof $element.data('easing-out') !== 'undefined') ? String($element.data('easing-out')).split(',') : easingsOutValues);

    // go through each property and respective value and add them to the
    _.each(properties, function(property, index){
        property = _.trim(property),
        fromValue = fromValues[index] ? _.trim(fromValues[index]) : fromValues[0],
        toValue = toValues[index]? _.trim(toValues[index]) : toValues[0];
        easingInValue = easingsInValues[index]? _.trim(easingsInValues[index]) : easingsInValues[0];
        easingOutValue = easingsOutValues[index]? _.trim(easingsOutValues[index]) : easingsOutValues[0];

        animationProperty.property = property;
        animationProperty.from[property] = fromValue;
        animationProperty.to[property] = toValue;
        animationProperty.easingIn[property] = easingInValue;
        animationProperty.easingOut[property] = easingOutValue;
    });
    return animationProperty;
};
