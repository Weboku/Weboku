import React from "react";
import { useNavigate } from "react-router-dom";
import { useTeamContext } from "../../../context/TeamContext"; // ⬅️ import context
import "./Ourteam.css";

function initialsOf(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatSince(yyyy_mm_dd = "") {
  if (!yyyy_mm_dd) return null;
  const d = new Date(yyyy_mm_dd + "T00:00:00");
  if (isNaN(d)) return null;
  const now = new Date();
  let years = now.getFullYear() - d.getFullYear();
  const mDelta = now.getMonth() - d.getMonth();
  if (mDelta < 0 || (mDelta === 0 && now.getDate() < d.getDate())) years--;
  return { label: `Since ${d.getFullYear()}`, years: Math.max(0, years) };
}

const EMPLOYMENT_LABEL = {
  full_time: "Full-time",
  part_time: "Part-time",
  contractor: "Contractor",
  intern: "Intern",
};

const MAX_SKILLS = 5;

const Ourteam = ({
  title = "Our Team",
  subtitle = "The people behind QuizCraft",
  onlyActive = false, // optional toggle if you want to hide inactive members
}) => {
  const navigate = useNavigate();
  const { members: ctxMembers = [], getPathFor } = useTeamContext();

  // normalize comma or array
  const normSkills = (s) =>
    Array.isArray(s)
      ? s.filter(Boolean)
      : String(s || "")
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean);

  // optionally filter out inactive
  const members = onlyActive
    ? ctxMembers.filter((m) => (m.status || "active") === "active")
    : ctxMembers;

  // ---------- derived meta (for sections below the grid) ----------
  const getDept = (m) => (m.department || m.team || "").toString().trim();

  const total = members.length;
  const activeCount = members.filter((m) => (m.status || "active") === "active").length;

  const yearsArr = members
    .map((m) => formatSince(m.workingSince)?.years)
    .filter((n) => typeof n === "number" && !Number.isNaN(n));
  const avgYears = yearsArr.length
    ? (yearsArr.reduce((a, b) => a + b, 0) / yearsArr.length).toFixed(1)
    : "—";

  const deptMap = members.reduce((acc, m) => {
    const d = getDept(m);
    if (!d) return acc;
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});
  const deptList = Object.entries(deptMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <section className="team" aria-label="Our Team">
      <header className="team-header">
        <h2 className="team-title">
          <span className="team-title-accent" aria-hidden="true"></span>
          {title}
        </h2>
        {subtitle && <p className="team-subtitle">{subtitle}</p>}
      </header>

      <div className="team-grid">
        {members.map((m) => {
          const photo = m.avatarUrl || m.photo;
          const since = formatSince(m.workingSince);
          const allSkills = normSkills(m.skills);
          const shownSkills = allSkills.slice(0, MAX_SKILLS);
          const extraCount = allSkills.length - shownSkills.length;
          const employment = EMPLOYMENT_LABEL[m.employmentType] || m.employmentType || "";
          const designation = m.designation || m.role || "—";
          const social = m.socials || m.links || {};
          const to = typeof getPathFor === "function" ? getPathFor(m.name) : `/about/team/${encodeURIComponent(m.name)}`;

          const handleCardClick = (e) => {
            if (e.defaultPrevented) return; // allow ctrl/cmd/middle clicks on inner links
            navigate(to);
          };
          const handleKey = (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate(to);
            }
          };

          return (
            <article
              className={`team-card clickable ${m.status === "inactive" ? "is-inactive" : ""}`}
              key={m.email || m.name}
              role="link"
              tabIndex={0}
              aria-label={`View profile: ${m.name}`}
              onClick={handleCardClick}
              onKeyDown={handleKey}
            >
              {/* Avatar */}
              <div className="avatar-wrap">
                {photo ? (
                  <img
                    className="avatar-img"
                    src={photo}
                    alt={`${m.name} profile photo`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fb = e.currentTarget.nextElementSibling;
                      if (fb) fb.style.display = "grid";
                    }}
                  />
                ) : null}
                <div
                  className="avatar-fallback"
                  style={{ display: photo ? "none" : "grid" }}
                  aria-hidden={!!photo}
                >
                  {initialsOf(m.name)}
                </div>

                {/* Optional badges */}
                {/* {employment ? <span className="role-badge">{employment}</span> : null} */}
                {m.status === "inactive" ? <span className="status-badge">Inactive</span> : null}
              </div>

              {/* Info */}
              <h3 className="name">{m.name}</h3>

              <p className="role-line">
                {designation}
                {m.location ? <span className="role-dot">•</span> : null}
                {m.location}
                {since ? (
                  <>
                    <span className="role-dot">•</span>
                    <span title={`${since.years}+ years`}>{since.label}</span>
                  </>
                ) : null}
              </p>

              {m.bio && <p className="bio">{m.bio}</p>}

              {shownSkills.length > 0 && (
                <div className="skills">
                  {shownSkills.map((s, i) => (
                    <span className="skill" key={i}>
                      {s}
                    </span>
                  ))}
                  {extraCount > 0 && (
                    <span
                      className="skill skill--more"
                      title={allSkills.slice(MAX_SKILLS).join(", ")}
                      aria-label={`${extraCount} more skills: ${allSkills.slice(MAX_SKILLS).join(", ")}`}
                    >
                      +{extraCount} more
                    </span>
                  )}
                </div>
              )}

              {/* Links (stop click bubbling so card doesn't navigate) */}
              {(social.linkedin || social.github || social.twitter || social.website || m.email || m.phone) && (
                <div
                  className="socials"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  {social.linkedin && (
                    <a href={social.linkedin} className="icon-btn" aria-label="LinkedIn" onClick={(e) => e.stopPropagation()}>
                      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                        <path fill="currentColor" d="M4.98 3.5A2.5 2.5 0 102.5 6a2.5 2.5 0 002.48-2.5zM3 8.98h4v12H3v-12zM9 8.98h3.83v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v6.31h-4v-5.6c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.69H9v-12z"/>
                      </svg>
                    </a>
                  )}
                  {social.github && (
                    <a href={social.github} className="icon-btn" aria-label="GitHub" onClick={(e) => e.stopPropagation()}>
                      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                        <path fill="currentColor" d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.18-3.36-1.18-.45-1.15-1.1-1.46-1.1-1.46-.9-.63.07-.62.07-.62 1 .07 1.52 1.04 1.52 1.04.89 1.53 2.34 1.09 2.9.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.67-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 015 0c1.9-1.29 2.74-1.02 2.74-1.02.56 1.37.21 2.39.1 2.64.64.69 1.03 1.58 1.03 2.67 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0012 2z"/>
                      </svg>
                    </a>
                  )}
                  {social.twitter && (
                    <a href={social.twitter} className="icon-btn" aria-label="Twitter/X" onClick={(e) => e.stopPropagation()}>
                      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                        <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.6 8.6 0 01-2.72 1.04A4.27 4.27 0 0015.5 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.98-3.57-.18-6.74-1.89-8.86-4.49-.37.63-.58 1.36-.58 2.14 0 1.48.75 2.79 1.89 3.55a4.25 4.25 0 01-1.94-.54v.05c0 2.07 1.47 3.8 3.43 4.19-.36.1-.74.15-1.13.15-.28 0-.54-.03-.8-.07.54 1.69 2.09 2.92 3.94 2.95A8.57 8.57 0 012 19.55 12.1 12.1 0 008.29 21c7.54 0 11.67-6.25 11.67-11.67 0-.18 0-.36-.01-.53A8.36 8.36 0 0022.46 6z"/>
                      </svg>
                    </a>
                  )}
                  {social.website && (
                    <a href={social.website} className="icon-btn" aria-label="Website" onClick={(e) => e.stopPropagation()}>
                      ↗
                    </a>
                  )}
                  {m.email && (
                    <a href={`mailto:${m.email}`} className="icon-btn" aria-label={`Email ${m.name}`} onClick={(e) => e.stopPropagation()}>
                      ✉
                    </a>
                  )}
                  {m.phone && (
                    <a href={`tel:${m.phone}`} className="icon-btn" aria-label={`Call ${m.name}`} onClick={(e) => e.stopPropagation()}>
                      ☎
                    </a>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* ---------- BELOW THE GRID ---------- */}
      <section className="team-meta">
        {/* Quick Stats */}
        <div className="team-stats">
          <div className="stat">
            <span className="stat-num">{total}</span>
            <span className="stat-label">Total members</span>
          </div>
          <div className="stat">
            <span className="stat-num">{activeCount}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat">
            <span className="stat-num">{avgYears}</span>
            <span className="stat-label">Avg tenure (yrs)</span>
          </div>
        </div>

        {/* Departments */}
        {deptList.length > 0 && (
          <div className="team-depts">
            <h3 className="team-h3">Teams & Functions</h3>
            <div className="dept-chips">
              {deptList.map(([d, c]) => (
                <span className="dept-chip" key={d} title={`${c} member(s)`}>
                  {d} <b>· {c}</b>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Culture values */}
        <div className="team-values">
          <h3 className="team-h3">Our Culture</h3>
          <ul className="value-cards" role="list">
            <li className="value-card">
              <h4>Bias for Action</h4>
              <p>We ship fast, learn faster, and iterate in the open.</p>
            </li>
            <li className="value-card">
              <h4>Owning the Outcome</h4>
              <p>Context over control, but we’re accountable to our users.</p>
            </li>
            <li className="value-card">
              <h4>Craft & Clarity</h4>
              <p>Simple, reliable solutions that scale—without the fluff.</p>
            </li>
          </ul>
        </div>

        {/* Open roles CTA */}
        <div className="roles-cta">
          <div className="roles-cta-inner">
            <div className="roles-cta-text">
              <h3 className="roles-title">We’re hiring!</h3>
              <p className="roles-sub">
                Like what you see? Join the folks building QuizCraft.
              </p>
            </div>
            <div className="roles-cta-actions">
              <a className="roles-btn" href="/careers">View open roles</a>
              <a className="roles-btn roles-btn--ghost" href="/about/team">Meet the team</a>
            </div>
          </div>
        </div>

        {/* Mini-FAQ */}
        <div className="team-faq">
          <h3 className="team-h3">Team FAQ</h3>
          <details className="faq-item">
            <summary>Where is your team based?</summary>
            <p>We’re remote-first with flexible hours; some teammates co-work in Ranchi.</p>
          </details>
          <details className="faq-item">
            <summary>Do you take interns?</summary>
            <p>Yes—paid internships in engineering, design, and growth. Check <a href="/careers">careers</a>.</p>
          </details>
          <details className="faq-item">
            <summary>How do I contact the team?</summary>
            <p>Use the contact links on each profile or write to <a href="mailto:hello@quizcraft.example">hello@quizcraft.example</a>.</p>
          </details>
        </div>
      </section>
    </section>
  );
};

export default Ourteam;
