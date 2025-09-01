import React, { useMemo } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useTeamContext } from "../../../../context/TeamContext";
import "./TeamMember.css";
import Services from "../../../Services/Services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";


/** utils */
function slugify(str = "") {
  return String(str).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}
function initialsOf(name = "") {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}
function normalizeSkills(s) {
  return Array.isArray(s)
    ? s.filter(Boolean)
    : String(s || "").split(",").map((x) => x.trim()).filter(Boolean);
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
function fmtRange(start, end) {
  const safe = (s) => (s ? new Date(s + "T00:00:00") : null);
  const toYYYY = (d) => (d && !isNaN(d) ? d.getFullYear() : null);
  const a = safe(start), b = safe(end);
  const ay = toYYYY(a), by = toYYYY(b);
  if (!ay && !by) return "—";
  if (ay && !by) return `${ay} — Present`;
  if (!ay && by) return `— ${by}`;
  return `${ay} — ${by}`;
}

/** labels */
const EMPLOYMENT_LABEL = { full_time: "Full-time", part_time: "Part-time", contractor: "Contractor", intern: "Intern" };
const STATUS_LABEL = { active: "Active", inactive: "Inactive" };

export default function TeamMember() {
  const { name: routeSlug = "" } = useParams();
  const slug = String(routeSlug).toLowerCase();
  const navigate = useNavigate();
  const location = useLocation();
  const { members, getMemberBySlug } = useTeamContext();

  // Prefer member passed via navigate(..., { state: { member } })
  const stateMember = location.state?.member;

  const member = useMemo(() => {
    if (stateMember) return stateMember;
    const m1 = getMemberBySlug(slug);
    if (m1) return m1;
    return (
      members.find(
        (m) => (m.__slug && m.__slug.toLowerCase() === slug) || slugify(m.name) === slug
      ) || null
    );
  }, [stateMember, getMemberBySlug, members, slug]);

  if (!member) {
    return (
      <div className="tm-wrap">
        <nav className="tm-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true">/</span>
          <Link to="/about/team">Team</Link><span aria-hidden="true">/</span>
          <span className="current">Not found</span>
        </nav>

        <div className="tm-card tm-not-found">
          <h1>Profile not found</h1>
          <p>We couldn’t find a team member for <code>/{slug}</code>.</p>
          <div className="tm-actions">
            <button className="tm-btn" onClick={() => navigate(-1)}>← Go Back</button>
            <Link className="tm-btn tm-btn--ghost" to="/about/team">View All Team</Link>
          </div>
        </div>
      </div>
    );
  }

  /** derived */
  const photo = member.avatarUrl || member.photo;
  const since = formatSince(member.workingSince);
  const employment = EMPLOYMENT_LABEL[member.employmentType] || member.employmentType || "";
  const status = STATUS_LABEL[member.status] || member.status || "";
  const skills = normalizeSkills(member.skills);
  const socials = member.socials || member.links || {};
  const portfolio = member.portfolio || {}; // optional richer content
  const projects = portfolio.projects || member.projects || []; // [{title, desc, link, image, tags}]
  const experience = portfolio.experience || member.experience || []; // [{company, role, start, end, summary}]
  const achievements = portfolio.achievements || member.achievements || []; // [string or {title, year, link}]
  const certifications = portfolio.certifications || member.certifications || []; // [string or {title, org, year, link}]
  const resumeUrl = portfolio.resumeUrl || member.resumeUrl; // optional CV
  const availability = portfolio.availability || member.availability; // e.g. "Open to freelance"
  const profileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/about/team/${member.__slug || slugify(member.name)}`
      : `/about/team/${member.__slug || slugify(member.name)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      alert("Profile link copied!");
    } catch {
      const tmp = document.createElement("input");
      tmp.value = profileUrl;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      document.body.removeChild(tmp);
      alert("Profile link copied!");
    }
  };

  return (
    <>
    <div className="tm-wrap">
      {/* Breadcrumbs */}
      <nav className="tm-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span aria-hidden="true">/</span>
        <Link to="/about/team">Team</Link><span aria-hidden="true">/</span>
        <span className="current">{member.name}</span>
      </nav>

      {/* PORTFOLIO LAYOUT */}
      <header className="pf-hero">
        <div className="pf-hero-inner">
          <div className="pf-left">
            <div className="pf-avatar-xl">
              <span className="pf-ring" aria-hidden="true" />
              {photo ? (
                <img
                  className="pf-avatar-img"
                  src={photo}
                  alt={`${member.name} profile photo`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <div className="pf-avatar-fallback" aria-label={`${member.name} initials`}>
                  {initialsOf(member.name)}
                </div>
              )}
            </div>

            {/* quick contact */}
            {/* <div className="pf-contact">
  {member.email && (
    <a href={`mailto:${member.email}`} className="pf-icon-btn">
      <FontAwesomeIcon icon={faEnvelope} /> <span>Email</span>
    </a>
  )}
  {member.phone && (
    <a href={`tel:${member.phone}`} className="pf-icon-btn">
      <FontAwesomeIcon icon={faPhone} /> <span>Call</span>
    </a>
  )}
  {socials.website && (
    <a href={socials.website} target="_blank" rel="noopener" className="pf-icon-btn">
      <FontAwesomeIcon icon={faGlobe} /> <span>Website</span>
    </a>
  )}
  {socials.linkedin && (
    <a href={socials.linkedin} target="_blank" rel="noopener" className="pf-icon-btn">
      <FontAwesomeIcon icon={faLinkedin} /> <span>LinkedIn</span>
    </a>
  )}
  {socials.github && (
    <a href={socials.github} target="_blank" rel="noopener" className="pf-icon-btn">
      <FontAwesomeIcon icon={faGithub} /> <span>GitHub</span>
    </a>
  )}
  {socials.twitter && (
    <a href={socials.twitter} target="_blank" rel="noopener" className="pf-icon-btn">
      <FontAwesomeIcon icon={faXTwitter} /> <span>Twitter</span>
    </a>
  )}
</div> */}


            {/* availability / status */}
            <div className="pf-badges">
              {/* {employment && <span className="pf-badge">{employment}</span>} */}
              {status && <span className={`pf-badge ${member.status === "active" ? "ok" : "muted"}`}>{status}</span>}
              {availability && <span className="pf-badge hire">{availability}</span>}
              {/* {since && <span className="pf-badge lite" title={`${since.years}+ years`}>{since.label}</span>} */}
            </div>
          </div>

          <div className="pf-right">
            <h1 className="pf-name">{member.name}</h1>
            <p className="pf-role">
              <span className="pf-strong">{member.designation || member.role || "—"}</span>
              {member.location ? <span className="pf-dot">•</span> : null}
              {member.location}
            </p>

            {/* CTA row */}
            <div className="pf-cta">
              {resumeUrl && <a className="pf-btn" href={resumeUrl} target="_blank" rel="noopener">Download CV</a>}
              <a className="pf-btn pf-btn--ghost" href="/about/team">All Profiles</a>
              <button className="pf-btn pf-btn--ghost" onClick={copyLink}>Copy Profile Link</button>
            </div>

            {/* short bio */}
            {member.bio && <p className="pf-bio">{member.bio}</p>}

            {/* skills / tech stack */}
            {skills.length > 0 && (
              <div className="pf-chips">
                {skills.map((s, i) => <span className="pf-chip" key={i}>{s}</span>)}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Grid: Left sidebar (About/Details), Right content (Portfolio) */}
      <section className="pf-grid">
        {/* left rail */}
        <aside className="pf-aside">
          <div className="tm-card pf-sticky">
            <h3 className="tm-h3">Profile</h3>
            <dl className="tm-dl">
              <div><dt>Role</dt><dd>{member.designation || member.role || "—"}</dd></div>
              <div><dt>Employment</dt><dd>{employment || "—"}</dd></div>
              <div><dt>Status</dt><dd>{status || "—"}</dd></div>
              {member.location && (<div><dt>Location</dt><dd>{member.location}</dd></div>)}
              {member.workingSince && (<div><dt>Working since</dt><dd>{member.workingSince}</dd></div>)}
            </dl>
          </div>

          {certifications.length > 0 && (
            <div className="tm-card">
              <h3 className="tm-h3">Certifications</h3>
              <ul className="pf-list">
                {certifications.map((c, i) => {
                  const item = typeof c === "string" ? { title: c } : c;
                  return (
                    <li key={i} className="pf-li">
                      <span className="pf-li-title">
                        {item.link ? <a href={item.link} target="_blank" rel="noopener">{item.title}</a> : item.title}
                      </span>
                      {(item.org || item.year) && (
                        <small className="pf-li-meta">{[item.org, item.year].filter(Boolean).join(" • ")}</small>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {achievements.length > 0 && (
            <div className="tm-card">
              <h3 className="tm-h3">Achievements</h3>
              <ul className="pf-list">
                {achievements.map((a, i) => {
                  const item = typeof a === "string" ? { title: a } : a;
                  return (
                    <li key={i} className="pf-li">
                      <span className="pf-li-title">
                        {item.link ? <a href={item.link} target="_blank" rel="noopener">{item.title}</a> : item.title}
                      </span>
                      {item.year && <small className="pf-li-meta">{item.year}</small>}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>

        {/* right content */}
        <div className="pf-col">
          {/* Experience timeline */}
          {experience.length > 0 && (
            <article className="tm-card">
              <h2 className="tm-h2">Experience</h2>
              <ol className="pf-timeline">
                {experience.map((e, i) => (
                  <li key={i} className="pf-tl-item">
                    <div className="pf-tl-dot" aria-hidden="true" />
                    <div className="pf-tl-body">
                      <div className="pf-tl-header">
                        <strong className="pf-tl-role">{e.role || "—"}</strong>
                        <span className="pf-tl-sep">•</span>
                        <span className="pf-tl-company">{e.company || "—"}</span>
                        <span className="pf-tl-range">{fmtRange(e.start, e.end)}</span>
                      </div>
                      {e.summary && <p className="pf-tl-text">{e.summary}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          )}

          {/* Projects grid */}
          {projects.length > 0 && (
            <article className="tm-card">
              <div className="pf-card-head">
                <h2 className="tm-h2">Projects</h2>
                <div className="pf-card-cta">
                  {socials.github && <a className="pf-mini" href={socials.github} target="_blank" rel="noopener">GitHub</a>}
                  {socials.website && <a className="pf-mini" href={socials.website} target="_blank" rel="noopener">Portfolio</a>}
                </div>
              </div>

              <div className="pf-projects">
                {projects.map((p, i) => (
                  <article key={i} className="pf-proj">
                    <div className="pf-proj-media">
                      {p.image ? (
                        <img src={p.image} alt={p.title || "Project image"} loading="lazy" decoding="async" />
                      ) : (
                        <div className="pf-proj-fallback" aria-hidden="true">{(p.title || "P").slice(0,2)}</div>
                      )}
                    </div>
                    <div className="pf-proj-body">
                      <h3 className="pf-proj-title">
                        {p.link ? <a href={p.link} target="_blank" rel="noopener">{p.title || "Untitled project"}</a> : (p.title || "Untitled project")}
                      </h3>
                      {p.description && <p className="pf-proj-desc">{p.description}</p>}
                      {Array.isArray(p.tags) && p.tags.length > 0 && (
                        <div className="pf-proj-tags">
                          {p.tags.map((t, k) => <span className="pf-chip pf-chip--mini" key={k}>{t}</span>)}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </article>
          )}

          {/* Contact panel */}
          <article className="tm-card pf-hire">
            <div className="pf-hire-inner">
              <div className="pf-hire-text">
                <h3 className="tm-h3">Let’s work together</h3>
                <p className="pf-hire-sub">Have a project or role in mind? Reach out for availability and collaboration.</p>
              </div>
              <div className="pf-hire-actions">
                <a
    className="pf-btn"
    href="/contact"
    target="_blank"
    rel="noopener noreferrer"
  >
    Hire / Collaborate
  </a>
                <a className="pf-btn pf-btn--ghost" href="/about/team">Back to Team</a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
    <Services />
    </>
  );
}
