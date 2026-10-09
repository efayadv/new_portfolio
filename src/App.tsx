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
        <TableBrand />

        {activeSection ? (
          <CardHand
            key={dealNumber}
            items={portfolio[activeSection]}
            onSelect={selectCard}
          />
        ) : (
          <p className="table-prompt">
            Choose a section to deal your cards.
          </p>
        )}
      </BlackjackTable>

      <PortfolioNav
        activeSection={activeSection}
        onSelect={selectSection}
      />

      {selection && (
        <DetailModal
          selection={selection}
          onClose={() => setSelection(null)}
        />
      )}
    </main>
  );
}
