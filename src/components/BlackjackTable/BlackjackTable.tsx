import type { ReactNode } from "react";
import "./BlackjackTable.css";

type BlackjackTable = {
    children: ReactNode
}

export default function BlackjackTable ({
    children, 
} : BlackjackTable) {
    return (
    <section className="blackjack-table" aria-label="Portfolio table">
      {children}
    </section>
  );
}

