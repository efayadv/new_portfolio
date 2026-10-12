import type { Section } from "../../data/portfolio";

const options: { id: Section; label: string }[] = [
  { id: "about", label: "About Me" },
  { id: "resume", label: "Résumé" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

type Props = {
  activeSection: Section | null;
  onSelect: (section: Section) => void;
};

export default function PortfolioNav({
  activeSection,
  onSelect,
}: Props) {
  return (
    <nav className="portfolio-nav" aria-label="Portfolio sections">
      {options.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`portfolio-nav__${id}`}
          aria-pressed={activeSection === id}
          onClick={() => onSelect(id)}
        >
          {label}
        </button>
      ))}

      <p className="table-prompt">
        {activeSection
          ? "Select a card to explore."
          : "Choose a section to deal your cards."}
      </p>
    </nav>
  );
}