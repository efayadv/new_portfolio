import { useState } from "react";
import BlackjackTable from "./components/BlackjackTable/BlackjackTable";
import TableBrand from "./components/TableBrand/TableBrand";
import PortfolioNav from "./components/PortfolioNav/PortfolioNav";
import CardHand from "./components/CardHand/CardHand";
import DetailModal from "./components/DetailModal/DetailModal";
import type { CardSelection } from "./components/DetailModal/DetailModal";
import { portfolio } from "./data/portfolio";
import type { PortfolioItem, Section } from "./data/portfolio";
import "./App.css";
import "./styles/cards.css";
import DealerDeck from "./components/DealerDeck/DealerDeck";

export default function App() {
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [dealNumber, setDealNumber] = useState(0);
  const [selection, setSelection] = useState<CardSelection | null>(null);

  function selectSection(section: Section) {
    setActiveSection(section);
    setDealNumber((current) => current + 1);
  }

  function selectCard(
    item: PortfolioItem,
    trigger: HTMLButtonElement,
  ) {
    setSelection({
      item,
      trigger,
      rect: trigger.getBoundingClientRect(),
    });
  }

  return (
    <main className="portfolio">
      <BlackjackTable>
        <DealerDeck />
        <TableBrand />

        {activeSection ? (
          <>
            <CardHand
              key={dealNumber}
              items={portfolio[activeSection]}
              onSelect={selectCard}
            />

            <button
              type="button"
              className="table-back"
              onClick={() => {
                setSelection(null);
                setActiveSection(null);
                const section = activeSection;
                requestAnimationFrame(() => {
                  document.querySelector<HTMLButtonElement>(`.portfolio-nav__${section}`)?.focus();
                });
              }}
            >
              ← Back to options
            </button>
          </>
        ) : (
          <PortfolioNav
            activeSection={activeSection}
            onSelect={selectSection}
          />
        )}
      </BlackjackTable>

      {selection && (
        <DetailModal
          selection={selection}
          onClose={() => setSelection(null)}
        />
      )}
    </main>
  );
}
