import { useEffect } from "react";
import { soundManager } from "../utils/sound";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="project-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="project-modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ "--accent": project.accent }}
      >
        {/* Modal Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="modal-head">
          <div className="modal-badge-row">
            <span className="modal-cat-badge">{project.category}</span>
            <span className="modal-highlight-badge">{project.badge}</span>
          </div>
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-what">{project.what}</p>
        </div>

        {/* Modal Screenshot Frame */}
        <div className="modal-media-frame">
          <div className="browser-bar">
            <div className="browser-dots">
              <i /><i /><i />
            </div>
            <span className="browser-url">{project.live.replace(/^https?:\/\//, "")}</span>
          </div>
          <img
            src={project.image}
            alt={`Full screenshot of ${project.title}`}
            className="modal-image"
          />
        </div>

        {/* Modal Body */}
        <div className="modal-body-grid">
          <div>
            <h3 className="modal-subheading">Architecture &amp; Features</h3>
            <ul className="modal-features-list">
              {project.highlights?.map((h, i) => (
                <li key={i}>
                  <span className="feature-bullet" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-sidebar">
            <div className="modal-side-block">
              <h4 className="modal-side-title">Technologies Used</h4>
              <div className="modal-tech-chips">
                {(project.techList || project.stack.split(", ")).map((t) => (
                  <span key={t} className="tech-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-side-block">
              <h4 className="modal-side-title">Live Production Links</h4>
              <div className="modal-action-btns">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--lamp w-full"
                  onClick={() => soundManager.playClick()}
                >
                  <span>Launch Live App</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
                <a
                  href={project.code}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--line w-full"
                  onClick={() => soundManager.playClick()}
                >
                  <span>View Source Code</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

