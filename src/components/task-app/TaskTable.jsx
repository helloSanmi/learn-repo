import { CATEGORY_STYLES } from "./data.js";
import { CheckMarkCircle, FlagIcon, PencilIcon, TrashIcon } from "./Icons.jsx";

function EmptyState() {
  return (
    <div className="px-6 py-14 text-center">
      <p className="text-2xl font-semibold text-slate-900">No tasks found</p>
      <p className="mt-2 text-slate-500">Try a different search or add a new task.</p>
    </div>
  );
}

function TaskRow({ item, isLast, onToggleItem, onToggleFlag, onDeleteItem }) {
  return (
    <article
      className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 ${
        isLast ? "" : "border-b border-slate-200"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggleItem(item.id)}
        className="text-slate-400 transition hover:text-sky-600"
        aria-label={item.done ? "Mark task as active" : "Mark task as done"}
      >
        <CheckMarkCircle checked={item.done} />
      </button>

      <div className="grid min-w-0 gap-3 xl:grid-cols-[minmax(0,1fr)_180px_80px] xl:items-center">
        <p
          className={`min-w-0 truncate pr-2 text-[14px] font-medium ${
            item.done ? "text-slate-400 line-through" : "text-slate-950"
          }`}
        >
          {item.text}
        </p>

        <span
          className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            CATEGORY_STYLES[item.category] || CATEGORY_STYLES.General
          }`}
        >
          {item.category}
        </span>

        <span className="text-[14px] text-slate-700">{item.due || ""}</span>
      </div>

      <div className="flex items-center gap-3 text-slate-400">
        <button
          type="button"
          onClick={() => onToggleFlag(item.id)}
          className="transition hover:text-red-500"
          aria-label="Toggle task flag"
        >
          <FlagIcon active={item.flagged} />
        </button>
        <button type="button" className="transition hover:text-slate-700" aria-label="Edit task">
          <PencilIcon />
        </button>
        <button
          type="button"
          onClick={() => onDeleteItem(item.id)}
          className="transition hover:text-slate-700"
          aria-label="Delete task"
        >
          <TrashIcon />
        </button>
      </div>
    </article>
  );
}

export default function TaskTable({
  items,
  onToggleItem,
  onToggleFlag,
  onDeleteItem,
}) {
  return (
    <div className="mt-5 overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
      <div className="grid grid-cols-[minmax(0,1fr)_180px_80px_112px] border-b border-slate-200 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        <span>Task</span>
        <span>Project</span>
        <span>Due</span>
        <span>Actions</span>
      </div>

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        items.map((item, index) => (
          <TaskRow
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
            onToggleItem={onToggleItem}
            onToggleFlag={onToggleFlag}
            onDeleteItem={onDeleteItem}
          />
        ))
      )}
    </div>
  );
}
