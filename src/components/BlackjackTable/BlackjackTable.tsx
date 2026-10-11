import type { ReactNode } from "react";
import tableBackground from "../../assets/plainblack-jack.png";
import "./BlackjackTable.css";

type BlackjackTableProps = {
  children: ReactNode;
};

export default function BlackjackTable({
  children,
}: BlackjackTableProps) {
  return (
    <section className="blackjack-table" aria-label="Portfolio table">
      <img
        className="blackjack-table__background"
        src={tableBackground}
        alt=""
        draggable={false}
      />

      <div className="blackjack-table__content">
        {children}
      </div>
    </section>
  );
}

