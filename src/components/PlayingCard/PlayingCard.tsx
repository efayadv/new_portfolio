import type { PortfolioItem } from "../../data/portfolio";

type Props = {
  item: PortfolioItem;
  onSelect: (
    item: PortfolioItem,
    element: HTMLButtonElement,
  ) => void;
};

export default function PlayingCard({ item, onSelect }: Props) {
  const isRed = item.suit === "♥" || item.suit === "♦";

  return (
    <button
      type="button"
      className={`playing-card ${isRed ? "playing-card--red" : ""}`}
      aria-label={`View ${item.title}: ${item.subtitle}`}
      aria-haspopup="dialog"
      onClick={(event) => onSelect(item, event.currentTarget)}
    >
      <span className="card-corner" aria-hidden="true">
        <span>{item.rank}</span>
        <span>{item.suit}</span>
      </span>

      <span className="card-content">
        <span className="card-suit" aria-hidden="true">
          {item.suit}
        </span>

        <span className="card-title">{item.title}</span>
        <span className="card-subtitle">{item.subtitle}</span>
      </span>

      <span
        className="card-corner card-corner--bottom"
        aria-hidden="true"
      >
        <span>{item.rank}</span>
        <span>{item.suit}</span>
      </span>
    </button>
  );
}