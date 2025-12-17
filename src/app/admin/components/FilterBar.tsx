// Filter Bar Component for Admin Sections
export function FilterBar({ search, setSearch, sort, setSort, sortOptions, statusFilter, setStatusFilter, statusOptions, extraFilter, setExtraFilter, extraOptions, extraLabel }: any) {
    return (
        <div className="mb-4 flex flex-wrap gap-3">
            {/* Search */}
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 min-w-[200px] rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white placeholder:text-zinc-500"
            />

            {/* Sort */}
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white"
            >
                {sortOptions.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>

            {/* Status Filter */}
            {statusOptions && (
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white"
                >
                    {statusOptions.map((opt: string) => (
                        <option key={opt} value={opt === "All" ? "all" : opt}>{opt}</option>
                    ))}
                </select>
            )}

            {/* Extra Filter (e.g., Payment Status) */}
            {extraOptions && (
                <select
                    value={extraFilter}
                    onChange={(e) => setExtraFilter(e.target.value)}
                    className="rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white"
                >
                    <option value="all">All {extraLabel}</option>
                    {extraOptions.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            )}
        </div>
    );
}
