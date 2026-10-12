import { useLayoutEffect, useRef } from "react";
import ResumeViewer from "../ResumeViewer/ResumeViewer";
import type { PortfolioItem } from "../../data/portfolio";

export type CardSelection = {
  item: PortfolioItem;
  rect: DOMRect;
  trigger: HTMLButtonElement;
};

type Props = {
  selection: CardSelection;
  onClose: () => void;
};

export default function DetailModal({ selection, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { item, rect, trigger } = selection;

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();

    const target = dialog.getBoundingClientRect();

    const x =
      rect.left + rect.width / 2 -
      (target.left + target.width / 2);

    const y =
      rect.top + rect.height / 2 -
      (target.top + target.height / 2);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animation = reducedMotion
      ? undefined
      : dialog.animate(
          [
            {
              transform: `translate(${x}px, ${y}px) scale(
                ${rect.width / target.width},
                ${rect.height / target.height}
              )`,
              opacity: 0.5,
            },
            {
              transform: "translate(0, 0) scale(1)",
              opacity: 1,
            },
          ],
          {
            duration: 320,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          },
        );

    return () => {
      animation?.cancel();
      dialog.close();
      trigger.focus({ preventScroll: true });
    };
  }, [rect, trigger]);

  return (
    <dialog
      ref={dialogRef}
      className={`detail-modal${item.pdf ? " detail-modal--resume" : ""}`}
      aria-labelledby="detail-title"
      aria-describedby="detail-subtitle"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;

        const bounds = event.currentTarget.getBoundingClientRect();

        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          onClose();
        }
      }}
    >
      <button
        type="button"
        className="modal-close"
        aria-label="Close details"
        onClick={onClose}
        autoFocus
      >
        ×
      </button>

      <span className="modal-suit" aria-hidden="true">
        {item.rank} {item.suit}
      </span>

      <h2 id="detail-title">{item.title}</h2>
      <p id="detail-subtitle" className="modal-subtitle">
        {item.subtitle}
      </p>

      {item.pdf ? (
        <ResumeViewer url={item.pdf.url} downloadName={item.pdf.downloadName} />
      ) : (
        <>
      <p>{item.description}</p>

      {item.highlights && (
        <ul>
          {item.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}

      {item.links && (
        <div className="modal-links">
          {item.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
        </>
      )}
    </dialog>
  );
}