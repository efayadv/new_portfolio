
import "./DealerDeck.css";

export default function DealerDeck() {
  return (
    <div className="dealer-area" aria-hidden="true">
      <div className="dealer-deck" data-dealer-deck>
        <div className="dealer-deck__back">
          <span className="dealer-deck__ornament">♠</span>
        </div>
      </div>
    </div>
  );
}