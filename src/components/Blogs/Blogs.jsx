import React, { useEffect, useMemo, useState, useTransition, useDeferredValue, useRef } from "react";
import { Link } from "react-router-dom";
import { useBlogContext } from "../../context/BlogContext";
import "./Blogs.css";

const slugify = (t = "") =>
  t.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const toDate = (v) => {
  if (!v) return null;
  if (typeof v?.toDate === "function") return v.toDate();
  if (typeof v === "string") return new Date(v);
  return v;
};
const formatDate = (v) => {
  const d = toDate(v);
  return !d || isNaN(d.getTime())
    ? "-"
    : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};
const plainText = (html = "") => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

/** small hook to debounce a value */
function useDebouncedValue(value, delay = 200) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

const Blogs = () => {
  const { fetchBlogs, fetchCategories } = useBlogContext();

  const [rawBlogs, setRawBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [activeCat, setActiveCat] = useState("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(9);

  // React 18 concurrency helpers (avoid blocking the UI)
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const debouncedQuery = useDebouncedValue(deferredQuery, 200);

  // one-shot load
  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const [blogs, cats] = await Promise.all([fetchBlogs(), fetchCategories()]);
        if (!ok) return;
        setRawBlogs(blogs || []);
        setCategories(cats || []);
      } finally {
        if (ok) setLoading(false);
      }
    })();
    return () => { ok = false; };
  }, [fetchBlogs, fetchCategories]);

  // category id -> name map
  const catMap = useMemo(() => {
    const m = Object.create(null);
    (categories || []).forEach((c) => { m[c.id] = c.name || c.id; });
    return m;
  }, [categories]);

  // ⚡️ Normalize once so filtering is cheap
  const normalizedBlogs = useMemo(() => {
    if (!rawBlogs?.length) return [];
    return rawBlogs
      .map((b) => {
        const title = b.title || "Untitled";
        const category = b.category || "uncategorized";
        const dateObj = toDate(b.createdAt || b.formattedDate);
        const dateMs = dateObj?.getTime?.() || 0;
        const text = plainText(b.content || "");
        const hay = [
          title,
          b.author,
          catMap[category] || category,
          text,
          b.seoTitle,
          b.seoDescription,
          b.seoKeywords,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return {
          id: b.id,
          title,
          slug: b.urlSlug || slugify(title),
          category,
          categoryName: catMap[category] || category,
          dateText: formatDate(b.createdAt || b.formattedDate),
          dateMs,
          image: b.imageBase64 || b.imageLink || "",
          excerpt: text.slice(0, 160),
          author: b.author || "",
          hay,
        };
      })
      // newest first once
      .sort((a, b) => b.dateMs - a.dateMs);
  }, [rawBlogs, catMap]);

  // counts (also fast now)
  const countsByCat = useMemo(() => {
    const m = new Map();
    for (const b of normalizedBlogs) {
      m.set(b.category, (m.get(b.category) || 0) + 1);
    }
    return m;
  }, [normalizedBlogs]);

  // 💡 super fast filtering using precomputed fields
  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return normalizedBlogs.filter((b) => {
      const catOk = activeCat === "all" || b.category === activeCat;
      if (!catOk) return false;
      if (!q) return true;
      return b.hay.includes(q);
    });
  }, [normalizedBlogs, activeCat, debouncedQuery]);

  const visibleItems = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  // handlers (non-blocking)
  const onChipClick = (catId) => {
    startTransition(() => {
      setActiveCat(catId);
      setVisible(9);
    });
  };
  const onSearchChange = (e) => {
    const v = e.target.value;
    startTransition(() => {
      setQuery(v);
      setVisible(9);
    });
  };

  return (
    <div className="user-blogs-page">
      <div className="user-blogs-head">
        <div>
          <h1>Latest Posts</h1>
          <p className="user-muted">
            {loading ? "Loading…" : `${filtered.length} ${filtered.length === 1 ? "post" : "posts"}`}
            {isPending && " • updating…"}
          </p>
        </div>
        <div className="user-search-wrap">
          <input
            className="user-search"
            type="search"
            placeholder="Search posts, authors, keywords…"
            value={query}
            onChange={onSearchChange}
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="user-chip-row">
        <button
          className={`user-chip ${activeCat === "all" ? "user-active" : ""}`}
          onClick={() => onChipClick("all")}
        >
          All <span className="user-badge">{normalizedBlogs.length}</span>
        </button>

        {Array.from(countsByCat.keys()).map((catId) => (
          <button
            key={catId}
            className={`user-chip ${activeCat === catId ? "user-active" : ""}`}
            onClick={() => onChipClick(catId)}
          >
            {catMap[catId] || catId}
            <span className="user-badge">{countsByCat.get(catId)}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="user-blogs-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="user-blog-card user-skeleton">
              <div className="user-media" />
              <div className="user-body">
                <div className="user-line user-w60" />
                <div className="user-line user-w90" />
                <div className="user-meta-skel">
                  <div className="user-dot" /><div className="user-dot" /><div className="user-dot" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="user-empty">
          <div className="user-empty-card">
            <h3>No posts found</h3>
            <p>Try clearing filters or searching for something else.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="user-blogs-grid">
            {visibleItems.map((b) => {
              const to = `/blogs/${b.category}/${b.slug}`;
              return (
                <article key={b.id} className="user-blog-card">
                  <Link to={to} className="user-media" aria-label={b.title}>
                    {b.image ? (
                      <img
                        src={b.image}
                        alt={b.title}
                        loading="lazy"
                        decoding="async"
                        fetchpriority="low"
                        width="640"
                        height="360"
                        style={{ aspectRatio: "16 / 9", objectFit: "cover", width: "100%", height: "100%" }}
                      />
                    ) : (
                      <div className="user-media-fallback" />
                    )}
                  </Link>

                  <div className="user-body">
                    <div className="user-topline">
                      <span className="user-pill">{b.categoryName}</span>
                      <span className="user-muted">{b.dateText}</span>
                    </div>

                    <h2 className="user-title">
                      <Link to={to}>{b.title}</Link>
                    </h2>

                    <p className="user-excerpt">
                      {b.excerpt}
                      {b.excerpt.length === 160 && "…"}
                    </p>

                    <div className="user-meta">
                      {b.author && <span>By {b.author}</span>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {canLoadMore && (
            <div className="user-load-more-wrap">
              <button className="user-btn user-load-more" onClick={() => setVisible((v) => v + 9)}>
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blogs;
