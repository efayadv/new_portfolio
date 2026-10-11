import { useLayoutEffect, useRef } from "react";
import type { PortfolioItem } from "../../data/portfolio";
import PlayingCard from "../PlayingCard/PlayingCard";

type Props = {
  items: PortfolioItem[];
  onSelect: (
    item: PortfolioItem,
    element: HTMLButtonElement,
  ) => void;
};

export default function CardHand({ items, onSelect }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const table = stage.closest(".blackjack-table");
    const deck = table?.querySelector<HTMLElement>(
      "[data-dealer-deck]",
    );

    if (!deck) {
      stage.dataset.ready = "true";
      return;
    }

    const origin = deck.getBoundingClientRect();
    const slots = stage.querySelectorAll<HTMLElement>(".card-slot");

    slots.forEach((slot, index) => {
      const destination = slot.getBoundingClientRect();

      const x =
        origin.left + origin.width / 2 -
        (destination.left + destination.width / 2);

      const y =
        origin.top + origin.height / 2 -
        (destination.top + destination.height / 2);

      slot.style.setProperty("--deal-x", `${x}px`);
      slot.style.setProperty("--deal-y", `${y}px`);

      slot.style.setProperty(
        "--deal-scale-x",
        `${origin.width / destination.width}`,
      );

      slot.style.setProperty(
        "--deal-scale-y",
        `${origin.height / destination.height}`,
      );

      slot.style.setProperty("--deal-delay", `${index * 180}ms`);
    });

    stage.dataset.ready = "true";
  }, []);

  return (
    <div className="deal-stage" ref={stageRef}>
      <div className="hand-scroll">
        <div className="card-hand">
          {items.map((item) => (
            <div className="card-slot" key={item.id}>
              <div className="card-deal">
                <PlayingCard item={item} onSelect={onSelect} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}