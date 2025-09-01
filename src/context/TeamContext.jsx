import { createContext, useContext, useEffect, useMemo, useState } from "react";

const Ctx = createContext(null);

export function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

// Normalize whatever we get into a plain array
function normalizeInitial(input) {
  if (Array.isArray(input)) return input;
  if (input && typeof input === "object") {
    // common shapes if the import is off
    if (Array.isArray(input.default)) return input.default;   // e.g. { default: [...] }
    if (Array.isArray(input.members)) return input.members;   // e.g. { members: [...] }
    if (Array.isArray(input.data)) return input.data;         // e.g. { data: [...] }
  }
  if (process.env.NODE_ENV !== "production") {
    console.warn("[TeamContext] Expected an array for `initial`, got:", input);
  }
  return [];
}

/**
 * Usage: <TeamContext initial={teamData}> ... </TeamContext>
 */
export function TeamContext({ initial = [], children }) {
  const [members, setMembers] = useState(() => normalizeInitial(initial));

  useEffect(() => {
    setMembers(normalizeInitial(initial));
  }, [initial]);

  const withSlug = useMemo(
    () =>
      members.map((m) => ({
        ...m,
        __slug: m?.__slug || slugify(m?.name || ""),
      })),
    [members]
  );

  const bySlug = useMemo(() => {
    const map = Object.create(null);
    for (const m of withSlug) if (m.__slug) map[m.__slug] = m;
    return map;
  }, [withSlug]);

  const getMemberBySlug = (slug) => bySlug[String(slug).toLowerCase()] || null;
  const getPathFor = (name) => `/about/team/${encodeURIComponent(slugify(name))}`;

  const value = useMemo(
    () => ({
      members: withSlug,
      setMembers,
      slugify,
      getMemberBySlug,
      getPathFor,
    }),
    [withSlug, bySlug]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useTeamContext = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTeamContext must be used within <TeamContext>");
  return ctx;
};
