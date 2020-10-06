//#region Animator

import AnimationHelper from '../helpers/animator';

function Animator(chart) {

  this.chart = chart;
  this.ctx = this.chart.plotArea.ctx;
  this.animations = [];
  this.animationRequestId = null;
}

//Animator.prototype.animate = function (duration, base, dest, source, animationCallback, onComplete) {
Animator.prototype.animate = function (startDelay, duration, animationCallback, onComplete, easingFunction) {
  var _this = this;

  this.chart.isAnimating = true;
  easingFunction = easingFunction || AnimationHelper.easing.linear;

  if (animationCallback) {

    this.animations.push({
      startTime: (new Date()).getTime() + (startDelay ? startDelay : 0),
      duration: duration,
      animationCallback: animationCallback,
      onComplete: onComplete
    });
  }

  var remainingAnimations = [];

  while (this.animations.length > 0) {

    var animation = this.animations.shift();
    var now = (new Date()).getTime();
    var fractionComplete = 0;
    //var fractionComplete = Math.min(((new Date()).getTime() - animation.startTime) / animation.duration, 1);

    if (animation.startTime <= now) {
      fractionComplete = easingFunction(Math.min((now - animation.startTime), animation.duration), 0, 1, animation.duration);
      //var fractionComplete = AnimationHelper.easing.easeOutQuad(Math.min(((new Date()).getTime() - animation.startTime), animation.duration), 0, 1, animation.duration);

      fractionComplete = Math.min(fractionComplete, 1);

      if (isNaN(fractionComplete) || !isFinite(fractionComplete))
        fractionComplete = 1;
    }

    if (fractionComplete < 1) {
      remainingAnimations.push(animation);
    }

    animation.animationCallback(fractionComplete);

    if (fractionComplete >= 1 && animation.onComplete)
      animation.onComplete();
  }

  this.animations = remainingAnimations;

  if (this.animations.length > 0) {
    this.animationRequestId = this.chart.requestAnimFrame.call(window, function () {
      _this.animate.call(_this);
    });
  } else {
    this.chart.isAnimating = false;
  }

}

Animator.prototype.cancelAllAnimations = function () {

  this.animations = [];

  if (this.animationRequestId) {
    this.chart.cancelRequestAnimFrame.call(window, this.animationRequestId);
  }

  this.animationRequestId = null;
  this.chart.isAnimating = false;
}

export default Animator;
