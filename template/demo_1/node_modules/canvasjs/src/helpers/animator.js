
function yScaleAnimation(fractionComplete, animationInfo) {

  if (fractionComplete === 0) return;

  const ctx = animationInfo.dest;
  const sourceCanvas = animationInfo.source.canvas;
  const base = animationInfo.animationBase;

  const offsetY = (base - base * fractionComplete);

  ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, 0, offsetY,
     ctx.canvas.width / devicePixelBackingStoreRatio, fractionComplete * ctx.canvas.height / devicePixelBackingStoreRatio);
}

function xScaleAnimation(fractionComplete, animationInfo) {

  if (fractionComplete === 0) return;

  const ctx = animationInfo.dest;
  const sourceCanvas = animationInfo.source.canvas;
  const base = animationInfo.animationBase;

  const offsetX = (base - base * fractionComplete);

  ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, offsetX, 0,
    fractionComplete * ctx.canvas.width / devicePixelBackingStoreRatio, ctx.canvas.height / devicePixelBackingStoreRatio);
}

function xClipAnimation(fractionComplete, animationInfo) {

  if (fractionComplete === 0) return;

  const ctx = animationInfo.dest;
  const sourceCanvas = animationInfo.source.canvas;

  ctx.save();

  if (fractionComplete > 0)
    ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width * fractionComplete, sourceCanvas.height, 0, 0,
      sourceCanvas.width * fractionComplete / devicePixelBackingStoreRatio, sourceCanvas.height / devicePixelBackingStoreRatio);

  ctx.restore();
}

function fadeInAnimation(fractionComplete, animationInfo) {

  if (fractionComplete === 0) return;

  const ctx = animationInfo.dest;
  const sourceCanvas = animationInfo.source.canvas;

  ctx.save();

  ctx.globalAlpha = fractionComplete;

  ctx.drawImage(sourceCanvas, 0, 0, sourceCanvas.width, sourceCanvas.height, 0, 0,
    ctx.canvas.width / devicePixelBackingStoreRatio, ctx.canvas.height / devicePixelBackingStoreRatio);

  ctx.restore();

}

const easing = {

  linear(t, b, c, d) {
    return c * t / d + b;
  },

  easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },

  easeOutQuart (t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },

  easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
  },

  easeInQuart(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  }
}

export default {

  yScaleAnimation,
  xScaleAnimation,
  xClipAnimation,
  fadeInAnimation,
  easing

}
