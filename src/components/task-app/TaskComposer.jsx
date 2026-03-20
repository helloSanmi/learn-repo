import { CalendarIcon, FolderIcon } from "./Icons.jsx";

export default function TaskComposer({ draft, onDraftChange, onSubmit }) {
  return (
    <form
      className="mt-5 rounded-[16px] border border-slate-200 bg-white px-4 py-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <input
          id="new-task-input"
          type="text"
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder='"What needs to be done?"'
          className="min-w-0 flex-1 text-[14px] text-slate-700 outline-none placeholder:text-slate-400"
        />

        <div className="flex flex-wrap items-center gap-6 text-slate-500">
          <span className="flex items-center gap-2 text-[14px]">
            <CalendarIcon />
            Set Date
          </span>
          <span className="flex items-center gap-2 text-[14px]">
            <FolderIcon />
            Project
          </span>
        </div>
      </div>
    </form>
  );
}
