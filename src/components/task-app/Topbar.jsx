import { BellIcon, ChevronIcon, SearchIcon } from "./Icons.jsx";

export default function Topbar({ search, onSearchChange }) {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
      <label className="flex w-full max-w-[560px] items-center gap-3 rounded-[14px] border border-slate-200 bg-[#f8fafc] px-4 py-2.5 text-slate-400">
        <SearchIcon />
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks..."
          className="w-full bg-transparent text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
        />
      </label>

      <div className="flex items-center gap-5 self-end lg:self-auto">
        <button type="button" className="relative text-slate-500 transition hover:text-slate-700">
          <BellIcon />
          <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7d949e] text-sm font-semibold text-white">
          A
        </div>
        <span className="text-slate-500">
          <ChevronIcon />
        </span>
      </div>
    </header>
  );
}
