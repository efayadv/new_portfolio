import "./ResumeViewer.css";

type Props = { url: string; downloadName: string };

export default function ResumeViewer({ url, downloadName }: Props) {
  return (
    <section className="resume-viewer" aria-label="Résumé PDF">
      <div className="resume-viewer__actions">
        <a href={url} download={downloadName}>Download PDF</a>
        <a href={url} target="_blank" rel="noopener noreferrer">Open in new tab ↗</a>
      </div>
      <object className="resume-viewer__document" data={url} type="application/pdf" aria-label="Emilio Fayad résumé">
        <p>This browser cannot preview the PDF here. <a href={url} target="_blank" rel="noopener noreferrer">Open the résumé</a> or use Download PDF above.</p>
      </object>
    </section>
  );
}
