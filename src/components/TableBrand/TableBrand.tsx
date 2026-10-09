import "./TableBrand.css";

export default function TableBrand() {
  return (
    <header className="table-brand">
      <h1>Emilio Fayad</h1>

      <div className="table-badge" aria-hidden="true">
        <span>♣ ♥</span>
        <span className="monogram">EF</span>
        <span>♠ ♦</span>
      </div>
    </header>
  );
}