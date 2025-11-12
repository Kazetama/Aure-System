import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { dashboard } from "@/routes";
import { type BreadcrumbItem } from "@/types";
import { Search, Edit, UserX, Plus, Trash } from "lucide-react"; // Assuming lucide-react for icons

// Interface for Student (as provided)
interface Student {
    id: number;
    uid_card: string;
    name: string;
    email: string;
    class: string;
    major: string;
    parent_phone: string;
    address: string;
    is_active: boolean;
}

// Interface for PageProps (as provided)
interface PageProps {
    students: {
        data: Student[];
    };
    filters: {
        search?: string;
    };
}

// Breadcrumbs (as provided)
const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: dashboard().url },
    { title: "Data Siswa", href: "/admin/students" },
];

export default function Index({ students, filters }: PageProps) {
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(`/admin/students`, { search }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Siswa" />

            {/* Main content area with padding */}
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-8">

                {/* Clean white card for content */}
                <div className="bg-white rounded-xl shadow-sm p-6">

                    {/* Header: Title, Subtitle, Search, and Add Button */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-900">
                                Data Siswa
                            </h1>
                            <p className="text-neutral-500 mt-1">
                                Kelola semua data siswa di dalam sistem.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            {/* Modern Search Form */}
                            <form onSubmit={handleSearch} className="flex-grow md:flex-grow-0">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cari siswa..."
                                        className="w-full md:w-64 pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-colors"
                                    />
                                </div>
                                {/* Hidden submit button for accessibility, form submits on Enter */}
                                <button type="submit" className="hidden">Cari</button>
                            </form>
                            {/* Add Student Button */}
                            <Link
                                href="/admin/students/create"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-700 transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Tambah</span>
                            </Link>
                        </div>
                    </div>

                    {/* Table container with horizontal scroll on mobile */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            {/* Clean Table Header */}
                            <thead>
                                <tr className="border-b border-neutral-200">
                                    <th className="p-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                                        Uid
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                                        Nama
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                                        Kelas
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                                        Jurusan
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.data.length > 0 ? (
                                    students.data.map((s) => (
                                        <tr
                                            key={s.id}
                                            className="hover:bg-neutral-50 transition-colors border-b border-neutral-200"
                                        >
                                            <td className="p-4 text-sm text-neutral-600">
                                                {s.uid_card}
                                            </td>
                                            <td className="p-4 text-sm text-neutral-800 font-medium">
                                                {s.name}
                                            </td>
                                            <td className="p-4 text-sm text-neutral-600">
                                                {s.email}
                                            </td>
                                            <td className="p-4 text-sm text-neutral-600">
                                                {s.class}
                                            </td>
                                            <td className="p-4 text-sm text-neutral-600">
                                                {s.major}
                                            </td>
                                            <td className="p-4">
                                                {/* Modern Status Badge */}
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${s.is_active
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                        }`}
                                                >
                                                    {s.is_active ? "Aktif" : "Nonaktif"}
                                                </span>
                                            </td>
                                            <td className="p-4 flex items-center gap-2">
                                                {/* Modern Edit Button */}
                                                <Link
                                                    href={`/admin/students/${s.id}/edit`}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-700 transition-colors"
                                                >
                                                    <Edit className="h-3 w-3" />
                                                    Edit
                                                </Link>

                                                {/* Delete Button */}
                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        if (confirm(`Yakin mau hapus data ${s.name}?`)) {
                                                            router.delete(`/admin/students/${s.id}`);
                                                        }
                                                    }}
                                                >
                                                    <button
                                                        type="submit"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors"
                                                    >
                                                        <Trash className="h-3 w-3" />
                                                        Hapus
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    // Modern Empty State
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-center p-16"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <UserX className="h-12 w-12 text-neutral-400" />
                                                <h3 className="text-xl font-semibold text-neutral-700">
                                                    Tidak Ada Siswa
                                                </h3>
                                                <p className="text-neutral-500 max-w-xs">
                                                    Tidak ada data siswa yang ditemukan
                                                    {filters.search ? ` dengan pencarian "${filters.search}".` : "."}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
