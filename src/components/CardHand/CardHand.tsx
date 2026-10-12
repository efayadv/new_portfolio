import { useLayoutEffect, useRef, useState } from "react";
import type { PortfolioItem } from "../../data/portfolio";
import PlayingCard from "../PlayingCard/PlayingCard";

type Props = {
  items: PortfolioItem[];
  onSelect: (item: PortfolioItem, element: HTMLButtonElement) => void;
};

export default function CardHand({ items, onSelect }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ index: 0, overflow: false });

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const scroller = scrollRef.current;
    if (!stage || !scroller) return;
    const slots = Array.from(stage.querySelectorAll<HTMLElement>(".card-slot"));
    const deck = stage.closest(".blackjack-table")?.querySelector<HTMLElement>("[data-dealer-deck]");
    const flights: { clone: HTMLElement; animation: Animation; card: HTMLElement }[] = [];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const updatePosition = () => {
      const bounds = scroller.getBoundingClientRect();
      const center = bounds.left + bounds.width / 2;
      let index = 0;
      let distance = Infinity;
      slots.forEach((slot, i) => {
        const rect = slot.getBoundingClientRect();
        const next = Math.abs(rect.left + rect.width / 2 - center);
        if (next < distance) { distance = next; index = i; }
      });
      setPosition({ index, overflow: scroller.scrollWidth > scroller.clientWidth + 2 });
    };
    // Finish in-flight cards on resize/rotation, without replaying the deal.
    const finishFlights = () => flights.forEach(({ clone, animation, card }) => {
      animation.cancel(); clone.remove(); card.style.visibility = "";
    });
    const viewportChanged = () => { finishFlights(); updatePosition(); };
    let lastWidth = scroller.clientWidth;
    let lastHeight = scroller.clientHeight;
    const observer = new ResizeObserver(() => {
      if (lastWidth !== scroller.clientWidth || lastHeight !== scroller.clientHeight) finishFlights();
      lastWidth = scroller.clientWidth; lastHeight = scroller.clientHeight;
      updatePosition();
    });
    observer.observe(scroller);
    const table = stage.closest(".blackjack-table");
    if (table) observer.observe(table);
    scroller.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", viewportChanged);
    motion.addEventListener("change", viewportChanged);
    updatePosition();

    frame = requestAnimationFrame(() => {
      if (!deck || motion.matches) return;
      const origin = deck.getBoundingClientRect();
      const viewport = scroller.getBoundingClientRect();
      slots.forEach((slot, index) => {
        const card = slot.querySelector<HTMLElement>(".card-deal");
        if (!card) return;
        const target = slot.getBoundingClientRect();
        // Offscreen cards are already available when the visitor swipes.
        if (target.right <= viewport.left || target.left >= viewport.right) return;
        const clone = card.cloneNode(true) as HTMLElement;
        clone.classList.add("card-flight");
        clone.setAttribute("aria-hidden", "true");
        clone.inert = true;
        Object.assign(clone.style, { left: `${target.left}px`, top: `${target.top}px`, width: `${target.width}px`, height: `${target.height}px` });
        document.body.appendChild(clone);
        const dx = origin.left + origin.width / 2 - target.left - target.width / 2;
        const dy = origin.top + origin.height / 2 - target.top - target.height / 2;
        card.style.visibility = "hidden";
        const animation = clone.animate([
          { transform: `translate(${dx}px, ${dy}px) rotate(-8deg) scale(${origin.width / target.width}, ${origin.height / target.height})`, opacity: 0 },
          { opacity: 1, offset: .08 },
          { transform: "translate(0,0) rotate(0) scale(1)", opacity: 1 },
        ], { duration: 600, delay: index * 160, fill: "both", easing: "cubic-bezier(.22,1,.36,1)" });
        const flight = { clone, animation, card };
        flights.push(flight);
        animation.onfinish = () => { card.style.visibility = ""; clone.remove(); animation.cancel(); };
      });
    });
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); finishFlights();
      scroller.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", viewportChanged);
      motion.removeEventListener("change", viewportChanged);
    };
  }, [items]);

  function move(direction: number) {
    const scroller = scrollRef.current;
    const slots = stageRef.current?.querySelectorAll<HTMLElement>(".card-slot");
    const index = Math.max(0, Math.min(items.length - 1, position.index + direction));
    const slot = slots?.[index];
    if (!scroller || !slot) return;
    const a = slot.getBoundingClientRect();
    const b = scroller.getBoundingClientRect();
    scroller.scrollTo({ left: scroller.scrollLeft + a.left - b.left - (b.width - a.width) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <div className="deal-stage" ref={stageRef}>
      <div className="hand-scroll" ref={scrollRef}>
        <div className="card-hand">
          {items.map(item => (
            <div className="card-slot" key={item.id}><div className="card-deal">
              <PlayingCard item={item} onSelect={onSelect} />
            </div></div>
          ))}
        </div>
      </div>
      {position.overflow && <div className="hand-controls">
        <button type="button" aria-label="Previous card" disabled={position.index === 0} onClick={() => move(-1)}>‹</button>
        <span aria-live="polite">{position.index + 1} / {items.length}</span>
        <button type="button" aria-label="Next card" disabled={position.index === items.length - 1} onClick={() => move(1)}>›</button>
      </div>}
    </div>
  );
}
