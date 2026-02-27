export function createInputController(canvas) {
  const pressed = new Set();
  let pointerX = null;

  function onKeyDown(event) {
    pressed.add(event.key.toLowerCase());
  }

  function onKeyUp(event) {
    pressed.delete(event.key.toLowerCase());
  }

  function updatePointer(clientX) {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    pointerX = Math.max(0, Math.min(canvas.width, x));
  }

  function onPointerMove(event) {
    updatePointer(event.clientX);
  }

  function onTouchMove(event) {
    const touch = event.touches[0];
    if (!touch) return;
    event.preventDefault();
    updatePointer(touch.clientX);
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  canvas?.addEventListener("pointermove", onPointerMove);
  canvas?.addEventListener("touchstart", onTouchMove, { passive: false });
  canvas?.addEventListener("touchmove", onTouchMove, { passive: false });

  return {
    getHorizontalAxis() {
      const left = pressed.has("arrowleft") || pressed.has("a");
      const right = pressed.has("arrowright") || pressed.has("d");
      return Number(right) - Number(left);
    },
    getPointerX() {
      return pointerX;
    },
    cleanup() {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas?.removeEventListener("pointermove", onPointerMove);
      canvas?.removeEventListener("touchstart", onTouchMove);
      canvas?.removeEventListener("touchmove", onTouchMove);
      pressed.clear();
      pointerX = null;
    },
  };
}
