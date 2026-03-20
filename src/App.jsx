import { useEffect, useState } from "react";
import Sidebar from "./components/task-app/Sidebar.jsx";
import Topbar from "./components/task-app/Topbar.jsx";
import TaskComposer from "./components/task-app/TaskComposer.jsx";
import TaskTable from "./components/task-app/TaskTable.jsx";
import InsightsPanel from "./components/task-app/InsightsPanel.jsx";
import {
  APP_NAME,
  SIDEBAR_ITEMS,
  STARTER_TASKS,
  STORAGE_KEY,
  formatDateText,
  getSidebarCount,
} from "./components/task-app/data.js";

function loadItems() {
  if (typeof window === "undefined") return STARTER_TASKS;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return STARTER_TASKS;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : STARTER_TASKS;
  } catch {
    return STARTER_TASKS;
  }
}

export default function App() {
  const [items, setItems] = useState(() => loadItems());
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("all");

  useEffect(() => {
    document.title = APP_NAME;
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const visibleItems = items.filter((item) => {
    const matchesSection =
      section === "all"
        ? true
        : section === "done"
          ? item.done
          : item.bucket === section;
    const matchesSearch = item.text.toLowerCase().includes(search.toLowerCase());
    return matchesSection && matchesSearch;
  });

  const totalCount = items.length;
  const doneCount = items.filter((item) => item.done).length;
  const overdueCount = items.filter((item) => item.flagged && !item.done).length;
  const streakDays = 5;

  function addItem(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setItems((current) => [
      {
        id: crypto.randomUUID(),
        text,
        done: false,
        category: "General",
        due: "Today",
        flagged: false,
        bucket: "today",
      },
      ...current,
    ]);
    setDraft("");
  }

  function toggleItem(id) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  }

  function toggleFlag(id) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, flagged: !item.flagged } : item,
      ),
    );
  }

  function deleteItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <main className="min-h-screen bg-[#eef3f7] text-slate-900">
      <section className="min-h-screen overflow-hidden bg-[#eef3f7]">
        <div className="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
          <Sidebar
            appName={APP_NAME}
            items={items}
            navItems={SIDEBAR_ITEMS}
            section={section}
            onSectionChange={setSection}
            getCount={getSidebarCount}
          />

          <section className="bg-[#eef3f7]">
            <Topbar search={search} onSearchChange={setSearch} />

            <div className="grid gap-6 px-6 py-6 xl:grid-cols-[minmax(0,1fr)_260px]">
              <section>
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[2.4rem]">
                      My Tasks
                    </h2>
                    <p className="mt-1 text-[15px] text-slate-600">
                      {formatDateText()} | Total: {totalCount} tasks
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => document.getElementById("new-task-input")?.focus()}
                    className="rounded-[14px] bg-[linear-gradient(180deg,#4492ff_0%,#2170eb_100%)] px-4 py-2.5 text-[14px] font-medium text-white shadow-[0_8px_16px_rgba(32,112,235,0.18)] transition hover:brightness-105"
                  >
                    + Add New Task
                  </button>
                </div>

                <TaskComposer
                  draft={draft}
                  onDraftChange={setDraft}
                  onSubmit={addItem}
                />

                <TaskTable
                  items={visibleItems}
                  onToggleItem={toggleItem}
                  onToggleFlag={toggleFlag}
                  onDeleteItem={deleteItem}
                />
              </section>

              <InsightsPanel
                totalCount={totalCount}
                doneCount={doneCount}
                overdueCount={overdueCount}
                streakDays={streakDays}
              />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
