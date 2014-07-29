/**
Aniamtion-Helper

@module package animation-helper-velocity
**/

var defaultDuration = 200;


Template['AnimateWithVelocity'].rendered = function(){

    // HACK: initial animation rendered, as insertElement, doesn't seem to fire
    _.each(this.findAll('*[data-animate]'), function(item){
        var $item = $(item);

        // prevent when the insertElement hook already animated
        if(!$item.hasClass('animating')) {
            var animationProperty = generateAnimationProperties(item);

            $item.velocity(animationProperty.from, {duration:0}).velocity(animationProperty.to, {
                duration: $item.data('duration') || defaultDuration,
                complete: function () {
                    $item = null;
                }
            });
        }
    });


    this.firstNode.parentNode._uihooks = {
        insertElement: function (node, next) {

            var $node = $(node);

            $node.insertBefore(next);

            if(typeof $node.data('animate') !== 'undefined') {
                var animationProperty = generateAnimationProperties(node);

                $node.velocity(animationProperty.from, {duration:0}).velocity(animationProperty.to, {
                    duration: $node.data('duration') || defaultDuration,
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


// METHODS

/**
Generate the property object for animation

@param {Object} element  the DOM element
*/
var generateAnimationProperties = function(element) {
    var animationProperty = {
            from: {},
            to: {}
        },
        $element = $(element),
        properties = ['opacity'],
        fromValues = [0],
        toValues = [1];


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
    

    // go through each property and respective value and add them to the
    _.each(properties, function(property, index){
        property = _.trim(property),
        fromValue = fromValues[index] ? _.trim(fromValues[index]) : fromValues[0],
        toValue = toValues[index]? _.trim(toValues[index]) : toValues[0];

        animationProperty.from[property] = fromValue;
        animationProperty.to[property] = toValue;
    });

    return animationProperty;
};
