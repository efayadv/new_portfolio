import { useState, useRef } from "react";
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
  const [isReturning, setIsReturning] = useState(false);
  const returningRef = useRef(false);
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
    if (returningRef.current) return;
    setSelection({
      item,
      trigger,
      rect: trigger.getBoundingClientRect(),
    });
  }

  async function returnToOptions() {
    if (returningRef.current || !activeSection) return;

    returningRef.current = true;
    setIsReturning(true);

    const section = activeSection;
    const clones: HTMLElement[] = [];

    try {
      const deck = document.querySelector<HTMLElement>(
        "[data-dealer-deck]",
      );
      const scroller = document.querySelector<HTMLElement>(
        ".hand-scroll",
      );

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (deck && scroller && !reducedMotion) {
        // Finish any cards that are still being dealt.
        document.querySelectorAll<HTMLElement>(".card-flight").forEach(
          (flight) => {
            flight.getAnimations().forEach((animation) => {
              animation.finish();
            });
          },
        );

        const deckRect = deck.getBoundingClientRect();
        const rowRect = scroller.getBoundingClientRect();

        const cards = Array.from(
          scroller.querySelectorAll<HTMLElement>(".card-deal"),
        ).filter((card) => {
          const rect = card.getBoundingClientRect();

          return rect.right > rowRect.left && rect.left < rowRect.right;
        });

        const animations = cards.map((card, index) => {
          const rect = card.getBoundingClientRect();
          const clone = card.cloneNode(true) as HTMLElement;

          clone.classList.add("card-return");
          clone.setAttribute("aria-hidden", "true");
          clone.inert = true;

          Object.assign(clone.style, {
            position: "fixed",
            left: `${rect.left}px`,
            top: `${rect.top}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            margin: "0",
            pointerEvents: "none",
            visibility: "visible",
            zIndex: `${100 + index}`,
          });

          document.body.appendChild(clone);
          clones.push(clone);

          card.style.visibility = "hidden";

          // Gather near the center of the card row.
          const stackX =
            rowRect.left + rowRect.width / 2 -
            (rect.left + rect.width / 2);

          const stackY =
            rowRect.top + rowRect.height / 2 -
            (rect.top + rect.height / 2);

          // Then move the stack to the actual dealer deck.
          const deckX =
            deckRect.left + deckRect.width / 2 -
            (rect.left + rect.width / 2);

          const deckY =
            deckRect.top + deckRect.height / 2 -
            (rect.top + rect.height / 2);

          return clone.animate(
            [
              {
                transform: "translate(0, 0) scale(1)",
                opacity: 1,
              },
              {
                transform: `translate(
                  ${stackX + index * 2}px,
                  ${stackY - index * 2}px
                ) scale(0.85)`,
                opacity: 1,
                offset: 0.45,
              },
              {
                transform: `translate(${deckX}px, ${deckY}px)
                  scale(
                    ${deckRect.width / rect.width},
                    ${deckRect.height / rect.height}
                  )`,
                opacity: 1,
                offset: 0.9,
              },
              {
                transform: `translate(${deckX}px, ${deckY}px)
                  scale(
                    ${deckRect.width / rect.width},
                    ${deckRect.height / rect.height}
                  )`,
                opacity: 0,
              },
            ],
            {
              duration: 800,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards",
            },
          );
        });

        await Promise.allSettled(
          animations.map((animation) => animation.finished),
        );
      }
    } finally {
      clones.forEach((clone) => clone.remove());

      setSelection(null);
      setActiveSection(null);
      setIsReturning(false);
      returningRef.current = false;

      requestAnimationFrame(() => {
        document
          .querySelector<HTMLButtonElement>(
            `.portfolio-nav__${section}`,
          )
          ?.focus();
      });
    }
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
              onClick={returnToOptions}
              disabled={isReturning}
            >
              {isReturning ? "Returning cards…" : "← Back to options"}
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
