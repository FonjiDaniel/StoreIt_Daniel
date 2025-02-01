"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { sortTypes } from "@/constants";

const SortDropdown = () => {
    // const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get("sort") || "$createdAt-desc";

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = event.target.value;
        const params = new URLSearchParams(searchParams);
        params.set("sort", newSort); // Update sort param in URL

        // router.push(`?${params.toString()}`); // Update URL
    };

    return (
        <div className='flex items-center'>
            <label htmlFor="sort">Sort By:</label>
            <select
                name="sort"
                id="sort"
                className='p-1 rounded-sm'
                value={currentSort}
                onChange={handleSortChange}
            >
                {sortTypes.map((sort) => (
                    <option key={sort.value} value={sort.value} className='bg-white hover:bg-brand'>
                        {sort.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SortDropdown;
