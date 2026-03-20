import { getAppConfig } from "../../runtime-config.js";

const APP = getAppConfig();

export const APP_NAME = APP.appTitle || "Taskline";
export const STORAGE_KEY = "todo-app-items-v3";

export const SIDEBAR_ITEMS = [
  { id: "all", label: "My Tasks" },
  { id: "inbox", label: "Inbox" },
  { id: "today", label: "Today" },
  { id: "upcoming", label: "Upcoming" },
  { id: "done", label: "Completed" },
];

export const STARTER_TASKS = [
  { id: "task-1", text: "Product launch roadmap", done: false, category: "Marketing", due: "Today", flagged: true, bucket: "today" },
  { id: "task-2", text: "Review design mockups", done: false, category: "Website Redesign", due: "4 PM", flagged: false, bucket: "today" },
  { id: "task-3", text: "Client meeting notes", done: true, category: "Sales", due: "Oct 26", flagged: true, bucket: "upcoming" },
  { id: "task-4", text: "Schedule team sync", done: true, category: "Product", due: "", flagged: false, bucket: "inbox" },
  { id: "task-5", text: "Prepare presentation slides", done: false, category: "Q4 Planning", due: "Today", flagged: true, bucket: "today" },
  { id: "task-6", text: "Finalize content calendar", done: false, category: "Marketing", due: "Oct 27", flagged: false, bucket: "upcoming" },
  { id: "task-7", text: "Update software dependencies", done: false, category: "Engineering", due: "", flagged: false, bucket: "inbox" },
  { id: "task-8", text: "Code review: PR #45", done: false, category: "Engineering", due: "", flagged: false, bucket: "inbox" },
  { id: "task-9", text: "Order office supplies", done: false, category: "General", due: "", flagged: false, bucket: "inbox" },
];

export const CATEGORY_STYLES = {
  Marketing: "bg-[#e8f1ff] text-[#2563eb]",
  "Website Redesign": "bg-[#e6f9fc] text-[#0891b2]",
  Sales: "bg-[#eafaf1] text-[#16a34a]",
  Product: "bg-[#f2eaff] text-[#7c3aed]",
  "Q4 Planning": "bg-[#eaf1ff] text-[#4f46e5]",
  Engineering: "bg-[#edf2f7] text-[#475569]",
  General: "bg-[#eef2f6] text-[#64748b]",
};

export function getSidebarCount(items, id) {
  if (id === "all") return items.filter((item) => !item.done).length;
  if (id === "done") return items.filter((item) => item.done).length;
  return items.filter((item) => item.bucket === id && !item.done).length;
}

export function formatDateText() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());
}
