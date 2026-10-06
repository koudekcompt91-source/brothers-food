/** Moves a small marker from a click target toward the cart icon. */
export function flyToCart(from: DOMRect) {
  if (typeof document === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cart = document.getElementById("cart-trigger");
  if (!cart) return;
  const to = cart.getBoundingClientRect();
  const dot = document.createElement("div");
  dot.setAttribute("aria-hidden", "true");
  dot.style.position = "fixed";
  dot.style.left = "0";
  dot.style.top = "0";
  dot.style.width = "14px";
  dot.style.height = "14px";
  dot.style.borderRadius = "999px";
  dot.style.background = "#ff6a00";
  dot.style.zIndex = "96";
  dot.style.pointerEvents = "none";
  dot.style.transform = `translate(${from.left + from.width / 2}px, ${from.top + from.height / 2}px)`;
  document.body.appendChild(dot);
  const animation = dot.animate(
    [
      { transform: `translate(${from.left + from.width / 2}px, ${from.top + from.height / 2}px) scale(1)`, opacity: 1 },
      { transform: `translate(${to.left + to.width / 2}px, ${to.top + to.height / 2}px) scale(0.4)`, opacity: 0.2 },
    ],
    { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
  );
  animation.onfinish = () => dot.remove();
}
