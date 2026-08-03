import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Heart, X, Undo2, Flame, Users, Clock, Award, BookOpen, Laptop,
  Languages, FileText, Mic, Phone, Check, RotateCcw, Lock, Sparkles,
  Compass, ListChecks, BarChart3,
} from "lucide-react";

const COLORS = {
  bg: "#EAEFE4",
  frame: "#131C19",
  surface: "#FFFFFF",
  surfaceAlt: "#F6F3EA",
  ink: "#1C2B27",
  inkSoft: "#5B6B63",
  inkFaint: "#8B9990",
  marigold: "#F4A93E",
  marigoldDeep: "#C8801F",
  coral: "#FF7A59",
  coralDeep: "#D85A3C",
  teal: "#2F6F62",
  tealDeep: "#1F4E44",
  line: "#DEE4D5",
};

const FONT_DISPLAY = "'Space Grotesk', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const FONT_MONO = "'IBM Plex Mono', monospace";

const CATEGORIES = [
  { id: "reading", label: "Reading", icon: BookOpen },
  { id: "tech", label: "Tech Help", icon: Laptop },
  { id: "language", label: "Language", icon: Languages },
  { id: "forms", label: "Forms", icon: FileText },
  { id: "interview", label: "Interview", icon: Mic },
  { id: "company", label: "Company", icon: Phone },
];

const CAT = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

const INITIAL_TASKS = [
  { id: 1, name: "Maria", age: 78, category: "company", mode: "Video call", minutes: 5,
    ask: "Could use some company on a video call — feeling a little lonely today." },
  { id: 2, name: "Diego", age: 16, category: "reading", mode: "Text chat", minutes: 5,
    ask: "Can someone proofread my English essay before I submit it tonight?" },
  { id: 3, name: "Alan", age: 82, category: "forms", mode: "Video call", minutes: 5,
    ask: "I can't make sense of this medicine copay form online. Could use a hand." },
  { id: 4, name: "Priya", age: 20, category: "interview", mode: "Video call", minutes: 5,
    ask: "Nervous about a job interview tomorrow — want a 5-minute practice round?" },
  { id: 5, name: "Fatima", age: 45, category: "language", mode: "Text chat", minutes: 5,
    ask: "New to the US — could someone explain what an 'HOA' actually is?" },
  { id: 6, name: "Jordan", age: 14, category: "tech", mode: "Video call", minutes: 5,
    ask: "Stuck installing Python for a school project. Laptop is fighting me." },
  { id: 7, name: "Ruth", age: 70, category: "reading", mode: "Video call", minutes: 5,
    ask: "Would love someone to read me today's headlines out loud." },
  { id: 8, name: "Sam", age: 19, category: "forms", mode: "Text chat", minutes: 5,
    ask: "Could someone glance at my resume before I send it out?" },
];

const BADGES = [
  { id: "first", label: "First Step", desc: "Complete 1 task", need: 1, type: "count" },
  { id: "five", label: "High Five", desc: "Complete 5 tasks", need: 5, type: "count" },
  { id: "pillar", label: "Community Pillar", desc: "Complete 10 tasks", need: 10, type: "count" },
  { id: "hour", label: "Hour of Kindness", desc: "Give 60 total minutes", need: 60, type: "minutes" },
];

function useGoogleFonts() {
  useEffect(() => {
    const id = "givefive-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

function TicketCard({ task, index, drag, onPointerDown, onPointerMove, onPointerUp }) {
  const isTop = index === 0;
  const Icon = CAT[task.category].icon;
  const scale = 1 - index * 0.045;
  const translateY = index * 14;
  const rotate = isTop ? drag.x / 18 : 0;
  const tx = isTop ? drag.x : 0;
  const ty = isTop ? drag.y * 0.35 : translateY;

  const likeOpacity = isTop ? Math.min(Math.max(drag.x, 0) / 90, 1) : 0;
  const passOpacity = isTop ? Math.min(Math.max(-drag.x, 0) / 90, 1) : 0;

  return (
    <div
      onPointerDown={isTop ? onPointerDown : undefined}
      onPointerMove={isTop ? onPointerMove : undefined}
      onPointerUp={isTop ? onPointerUp : undefined}
      onPointerCancel={isTop ? onPointerUp : undefined}
      style={{
        position: "absolute",
        inset: 0,
        transform: `translate(${tx}px, ${ty}px) rotate(${rotate}deg) scale(${scale})`,
        transition: drag.active && isTop ? "none" : "transform 0.32s cubic-bezier(.2,.8,.2,1)",
        zIndex: 10 - index,
        touchAction: "none",
        cursor: isTop ? "grab" : "default",
      }}
    >
      <div
        style={{
          background: COLORS.surface,
          borderRadius: 22,
          height: "100%",
          width: "100%",
          boxShadow: isTop
            ? "0 18px 36px -12px rgba(28,43,39,0.28)"
            : "0 6px 14px -8px rgba(28,43,39,0.15)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: `1px solid ${COLORS.line}`,
          position: "relative",
        }}
      >
        {/* stamps */}
        <div style={{ position: "absolute", top: 22, left: 20, opacity: likeOpacity, transform: "rotate(-14deg)",
          border: `3px solid ${COLORS.teal}`, color: COLORS.teal, borderRadius: 10, padding: "4px 12px",
          fontFamily: FONT_DISPLAY, fontWeight: 700, letterSpacing: 2, fontSize: 20, zIndex: 5 }}>
          GIVE
        </div>
        <div style={{ position: "absolute", top: 22, right: 20, opacity: passOpacity, transform: "rotate(14deg)",
          border: `3px solid ${COLORS.coral}`, color: COLORS.coral, borderRadius: 10, padding: "4px 12px",
          fontFamily: FONT_DISPLAY, fontWeight: 700, letterSpacing: 2, fontSize: 20, zIndex: 5 }}>
          PASS
        </div>

        <div style={{ background: COLORS.tealDeep, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={18} color="#F6F3EA" />
            </div>
            <div>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, color: "#fff" }}>{task.name}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: "rgba(246,243,234,0.7)" }}>Age {task.age} · {task.mode}</div>
            </div>
          </div>
          <div style={{ background: COLORS.marigold, color: COLORS.frame, fontFamily: FONT_MONO, fontWeight: 600, fontSize: 13, padding: "6px 10px", borderRadius: 999, display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={13} /> {task.minutes}m
          </div>
        </div>

        <div style={{ flex: 1, padding: "26px 22px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: COLORS.inkFaint, marginBottom: 10, fontWeight: 600 }}>
            {CAT[task.category].label}
          </div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 21, lineHeight: 1.35, color: COLORS.ink, fontWeight: 600 }}>
            "{task.ask}"
          </div>
        </div>

        {/* perforated tear line */}
        <div style={{ position: "relative", height: 1, background: "transparent" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, borderTop: `2px dashed ${COLORS.line}` }} />
          <div style={{ position: "absolute", left: -10, top: -9, width: 18, height: 18, borderRadius: "50%", background: COLORS.bg }} />
          <div style={{ position: "absolute", right: -10, top: -9, width: 18, height: 18, borderRadius: "50%", background: COLORS.bg }} />
        </div>

        <div style={{ padding: "14px 22px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", background: COLORS.surfaceAlt }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11.5, color: COLORS.inkFaint }}>TICKET #GF-{String(task.id).padStart(3, "0")}</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 11.5, color: COLORS.inkFaint }}>5-MIN COMMITMENT</span>
        </div>
      </div>
    </div>
  );
}

function StatPill({ icon: Icon, value, label, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, background: COLORS.surface, border: `1px solid ${COLORS.line}`, borderRadius: 999, padding: "6px 12px" }}>
      <Icon size={14} color={color} />
      <span style={{ fontFamily: FONT_MONO, fontWeight: 600, fontSize: 13, color: COLORS.ink }}>{value}</span>
      <span style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: COLORS.inkSoft }}>{label}</span>
    </div>
  );
}

export default function GiveFiveApp() {
  useGoogleFonts();

  const [queue, setQueue] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState(null);
  const [committed, setCommitted] = useState([]); // {id, task, status, committedAt}
  const [history, setHistory] = useState([]); // {task, direction}
  const [streak, setStreak] = useState(3);
  const [tab, setTab] = useState("discover");
  const [toast, setToast] = useState(null);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });

  const startRef = useRef({ x: 0, y: 0 });
  const toastTimer = useRef(null);

  const deck = useMemo(
    () => (filter ? queue.filter((t) => t.category === filter) : queue),
    [queue, filter]
  );

  const completedCount = committed.filter((c) => c.status === "done").length;
  const totalMinutes = committed
    .filter((c) => c.status === "done")
    .reduce((sum, c) => sum + c.task.minutes, 0);
  const peopleHelped = completedCount;

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }

  function commitSwipe(direction) {
    const task = deck[0];
    if (!task) return;
    setHistory((h) => [...h, { task, direction }]);
    setQueue((q) => q.filter((t) => t.id !== task.id));
    if (direction === "right") {
      setCommitted((c) => [...c, { id: task.id, task, status: "pending", committedAt: Date.now() }]);
      showToast(`You're set to help ${task.name} 💛`);
    }
    setDrag({ x: 0, y: 0, active: false });
  }

  function triggerSwipe(direction) {
    if (!deck[0]) return;
    const dir = direction === "right" ? 1 : -1;
    setDrag({ x: dir * 520, y: 0, active: false });
    setTimeout(() => commitSwipe(direction), 260);
  }

  function undo() {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setQueue((q) => [last.task, ...q]);
    if (last.direction === "right") {
      setCommitted((c) => c.filter((e) => e.id !== last.task.id));
    }
    setDrag({ x: 0, y: 0, active: false });
  }

  function markDone(id) {
    setCommitted((c) => c.map((e) => (e.id === id ? { ...e, status: "done" } : e)));
    setStreak((s) => s + 1);
    const entry = committed.find((e) => e.id === id);
    if (entry) showToast(`Nice! +${entry.task.minutes} min logged for ${entry.task.name}`);
  }

  function resetDemo() {
    setQueue(INITIAL_TASKS);
    setFilter(null);
    setCommitted([]);
    setHistory([]);
    setStreak(3);
    setDrag({ x: 0, y: 0, active: false });
    setTab("discover");
    showToast("Demo reset ✨");
  }

  function onPointerDown(e) {
    startRef.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0, active: true });
  }
  function onPointerMove(e) {
    setDrag((d) => {
      if (!d.active) return d;
      return { x: e.clientX - startRef.current.x, y: e.clientY - startRef.current.y, active: true };
    });
  }
  function onPointerUp() {
    setDrag((d) => {
      if (!d.active) return d;
      if (d.x > 110) {
        setTimeout(() => triggerSwipe("right"), 0);
        return { ...d, active: false };
      }
      if (d.x < -110) {
        setTimeout(() => triggerSwipe("left"), 0);
        return { ...d, active: false };
      }
      return { x: 0, y: 0, active: false };
    });
  }

  const pendingCommitted = committed.filter((c) => c.status === "pending");
  const doneCommitted = committed.filter((c) => c.status === "done");

  return (
    <div className="gf-shell" style={{ background: COLORS.bg, fontFamily: FONT_BODY }}>
      <style>{`
        .gf-shell { min-height: 100dvh; display: flex; align-items: center; justify-content: center; padding: 0; }
        .gf-frame { width: 100%; height: 100dvh; background: ${COLORS.frame}; padding: 0; border-radius: 0; box-shadow: none; }
        .gf-inner { border-radius: 0; }
        @media (min-width: 560px) {
          .gf-shell { padding: 28px 12px; }
          .gf-frame { width: 390px; height: 844px; padding: 12px; border-radius: 44px; box-shadow: 0 40px 80px -30px rgba(19,28,25,0.55); }
          .gf-inner { border-radius: 34px; }
        }
      `}</style>
      <div style={{ position: "relative" }}>
        {/* Phone frame: full-bleed on real mobile viewports, bezeled card on desktop */}
        <div className="gf-frame">
          <div className="gf-inner" style={{ width: "100%", height: "100%", background: COLORS.bg, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>

            {/* Header */}
            <div style={{ padding: "18px 20px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: COLORS.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Sparkles size={16} color="#fff" />
                  </div>
                  <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 20, color: COLORS.ink, letterSpacing: -0.3 }}>GiveFive</span>
                </div>
                <button onClick={resetDemo} title="Reset demo" style={{ background: COLORS.surface, border: `1px solid ${COLORS.line}`, borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <RotateCcw size={14} color={COLORS.inkSoft} />
                </button>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <StatPill icon={Clock} value={totalMinutes} label="min given" color={COLORS.teal} />
                <StatPill icon={Users} value={peopleHelped} label="helped" color={COLORS.marigoldDeep} />
                <StatPill icon={Flame} value={streak} label="streak" color={COLORS.coralDeep} />
              </div>
            </div>

            {/* Tab content */}
            <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
              {tab === "discover" && (
                <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", gap: 8, padding: "4px 20px 12px", overflowX: "auto" }}>
                    <button
                      onClick={() => setFilter(null)}
                      style={{
                        flexShrink: 0, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 12.5,
                        padding: "7px 14px", borderRadius: 999, border: `1px solid ${filter === null ? COLORS.teal : COLORS.line}`,
                        background: filter === null ? COLORS.teal : COLORS.surface,
                        color: filter === null ? "#fff" : COLORS.inkSoft, cursor: "pointer",
                      }}
                    >
                      All
                    </button>
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setFilter(filter === c.id ? null : c.id)}
                        style={{
                          flexShrink: 0, display: "flex", alignItems: "center", gap: 5, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 12.5,
                          padding: "7px 14px", borderRadius: 999, border: `1px solid ${filter === c.id ? COLORS.teal : COLORS.line}`,
                          background: filter === c.id ? COLORS.teal : COLORS.surface,
                          color: filter === c.id ? "#fff" : COLORS.inkSoft, cursor: "pointer",
                        }}
                      >
                        <c.icon size={12} /> {c.label}
                      </button>
                    ))}
                  </div>

                  <div style={{ flex: 1, position: "relative", padding: "0 20px 8px" }}>
                    {deck.length === 0 ? (
                      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 10, color: COLORS.inkSoft }}>
                        <div style={{ width: 56, height: 56, borderRadius: "50%", background: COLORS.surface, border: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Check size={24} color={COLORS.teal} />
                        </div>
                        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17, color: COLORS.ink }}>You're all caught up</div>
                        <div style={{ fontFamily: FONT_BODY, fontSize: 13, maxWidth: 220 }}>Check back later for more 5-minute ways to help — or reset the demo to see it again.</div>
                        <button onClick={resetDemo} style={{ marginTop: 6, background: COLORS.teal, color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                          Refill deck
                        </button>
                      </div>
                    ) : (
                      <div style={{ position: "relative", height: "100%" }}>
                        {deck.slice(0, 3).map((task, i) => (
                          <TicketCard
                            key={task.id}
                            task={task}
                            index={i}
                            drag={drag}
                            onPointerDown={onPointerDown}
                            onPointerMove={onPointerMove}
                            onPointerUp={onPointerUp}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, padding: "10px 20px 18px" }}>
                    <button onClick={undo} disabled={history.length === 0} title="Undo"
                      style={{ width: 42, height: 42, borderRadius: "50%", background: COLORS.surface, border: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: history.length ? "pointer" : "not-allowed", opacity: history.length ? 1 : 0.4 }}>
                      <Undo2 size={17} color={COLORS.inkSoft} />
                    </button>
                    <button onClick={() => triggerSwipe("left")} disabled={deck.length === 0} title="Pass"
                      style={{ width: 58, height: 58, borderRadius: "50%", background: COLORS.surface, border: `2px solid ${COLORS.coral}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: deck.length ? "pointer" : "not-allowed", opacity: deck.length ? 1 : 0.4 }}>
                      <X size={24} color={COLORS.coral} />
                    </button>
                    <button onClick={() => triggerSwipe("right")} disabled={deck.length === 0} title="Give 5"
                      style={{ width: 58, height: 58, borderRadius: "50%", background: COLORS.teal, border: `2px solid ${COLORS.teal}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: deck.length ? "pointer" : "not-allowed", boxShadow: "0 8px 18px -6px rgba(47,111,98,0.6)", opacity: deck.length ? 1 : 0.4 }}>
                      <Heart size={24} color="#fff" fill="#fff" />
                    </button>
                  </div>
                </div>
              )}

              {tab === "commitments" && (
                <div style={{ height: "100%", overflowY: "auto", padding: "6px 20px 20px" }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, color: COLORS.ink, margin: "6px 0 12px" }}>My Commitments</div>
                  {pendingCommitted.length === 0 && doneCommitted.length === 0 && (
                    <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: COLORS.inkSoft, marginTop: 40, textAlign: "center" }}>
                      Swipe right on a ticket in Discover to commit to helping someone.
                    </div>
                  )}
                  {pendingCommitted.length > 0 && (
                    <>
                      <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 11.5, letterSpacing: 1, textTransform: "uppercase", color: COLORS.inkFaint, margin: "10px 0 8px" }}>In progress</div>
                      {pendingCommitted.map((e) => {
                        const Icon = CAT[e.task.category].icon;
                        return (
                          <div key={e.id} style={{ background: COLORS.surface, border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <Icon size={16} color={COLORS.teal} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14.5, color: COLORS.ink }}>{e.task.name} · {e.task.minutes} min</div>
                              <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: COLORS.inkSoft, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.task.ask}</div>
                            </div>
                            <button onClick={() => markDone(e.id)} style={{ flexShrink: 0, background: COLORS.marigold, border: "none", borderRadius: 10, padding: "7px 10px", display: "flex", alignItems: "center", gap: 5, fontFamily: FONT_BODY, fontWeight: 700, fontSize: 12, color: COLORS.frame, cursor: "pointer" }}>
                              <Check size={13} /> Done
                            </button>
                          </div>
                        );
                      })}
                    </>
                  )}
                  {doneCommitted.length > 0 && (
                    <>
                      <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 11.5, letterSpacing: 1, textTransform: "uppercase", color: COLORS.inkFaint, margin: "16px 0 8px" }}>Completed</div>
                      {doneCommitted.map((e) => {
                        const Icon = CAT[e.task.category].icon;
                        return (
                          <div key={e.id} style={{ background: COLORS.surfaceAlt, border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 12, opacity: 0.75 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <Icon size={16} color={COLORS.inkFaint} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14.5, color: COLORS.ink, textDecoration: "line-through" }}>{e.task.name} · {e.task.minutes} min</div>
                              <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: COLORS.inkSoft }}>Marked done</div>
                            </div>
                            <Check size={16} color={COLORS.teal} />
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              )}

              {tab === "impact" && (
                <div style={{ height: "100%", overflowY: "auto", padding: "6px 20px 20px" }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 18, color: COLORS.ink, margin: "6px 0 14px" }}>Your Impact</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                    <div style={{ background: COLORS.teal, borderRadius: 16, padding: 16 }}>
                      <Clock size={16} color="#fff" />
                      <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 26, color: "#fff", marginTop: 8 }}>{totalMinutes}</div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(255,255,255,0.8)" }}>minutes given</div>
                    </div>
                    <div style={{ background: COLORS.marigold, borderRadius: 16, padding: 16 }}>
                      <Users size={16} color={COLORS.frame} />
                      <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 26, color: COLORS.frame, marginTop: 8 }}>{peopleHelped}</div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: "rgba(19,28,25,0.7)" }}>people helped</div>
                    </div>
                    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.line}`, borderRadius: 16, padding: 16, gridColumn: "span 2", display: "flex", alignItems: "center", gap: 12 }}>
                      <Flame size={22} color={COLORS.coralDeep} />
                      <div>
                        <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 20, color: COLORS.ink }}>{streak} in a row</div>
                        <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: COLORS.inkSoft }}>kindness streak</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 11.5, letterSpacing: 1, textTransform: "uppercase", color: COLORS.inkFaint, marginBottom: 10 }}>Badges</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {BADGES.map((b) => {
                      const progress = b.type === "count" ? completedCount : totalMinutes;
                      const unlocked = progress >= b.need;
                      return (
                        <div key={b.id} style={{ background: unlocked ? COLORS.surface : COLORS.surfaceAlt, border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: 14, position: "relative", opacity: unlocked ? 1 : 0.55 }}>
                          <div style={{ width: 30, height: 30, borderRadius: 9, background: unlocked ? COLORS.marigold : COLORS.line, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                            {unlocked ? <Award size={15} color={COLORS.frame} /> : <Lock size={13} color={COLORS.inkFaint} />}
                          </div>
                          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13.5, color: COLORS.ink }}>{b.label}</div>
                          <div style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: COLORS.inkSoft, marginTop: 2 }}>{b.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Tab bar */}
            <div style={{ display: "flex", borderTop: `1px solid ${COLORS.line}`, background: COLORS.surface }}>
              {[
                { id: "discover", label: "Discover", icon: Compass },
                { id: "commitments", label: "Commitments", icon: ListChecks },
                { id: "impact", label: "Impact", icon: BarChart3 },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    flex: 1, background: "none", border: "none", padding: "10px 0 12px", display: "flex", flexDirection: "column",
                    alignItems: "center", gap: 3, cursor: "pointer",
                  }}
                >
                  <t.icon size={18} color={tab === t.id ? COLORS.teal : COLORS.inkFaint} />
                  <span style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 10.5, color: tab === t.id ? COLORS.teal : COLORS.inkFaint }}>{t.label}</span>
                </button>
              ))}
            </div>

            {/* Toast */}
            {toast && (
              <div style={{
                position: "absolute", bottom: 74, left: "50%", transform: "translateX(-50%)",
                background: COLORS.frame, color: "#F6F3EA", fontFamily: FONT_BODY, fontWeight: 600, fontSize: 12.5,
                padding: "9px 16px", borderRadius: 999, boxShadow: "0 10px 24px -8px rgba(0,0,0,0.4)", whiteSpace: "nowrap", zIndex: 50,
              }}>
                {toast}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
