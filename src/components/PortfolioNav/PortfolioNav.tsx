import type { Section } from "../../data/portfolio";

const options: { id: Section; label: string }[] = [
  { id: "resume", label: "Résumé" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
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
          aria-pressed={activeSection === id}
          onClick={() => onSelect(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}