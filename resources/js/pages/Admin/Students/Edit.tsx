import { useForm, Link, Head } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Save, ArrowLeft } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";

interface Student {
    id: number;
    uid_card: string;
    name: string;
    image?: string;
    parent_phone?: string;
    address?: string;
    class?: string;
    major?: string;
    email?: string;
    is_active: boolean;
}

interface Props {
    student: Student;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Data Siswa", href: "/admin/students" },
    { title: "Edit Data", href: "#" },
];

export default function Edit({ student }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        uid_card: student.uid_card || "",
        name: student.name || "",
        image: student.image || "",
        parent_phone: student.parent_phone || "",
        address: student.address || "",
        class: student.class || "",
        major: student.major || "",
        email: student.email || "",
        is_active: student.is_active || false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/students/${student.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Siswa - ${student.name}`} />

            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Edit Data Siswa
                    </h2>
                    <Link
                        href="/admin/students"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </div>

                <div className="relative rounded-xl border border-sidebar-border/70 bg-white p-6 dark:border-sidebar-border dark:bg-neutral-900">
                    <form
                        onSubmit={submit}
                        className="relative z-10 space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Nama
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 dark:border-gray-700 dark:bg-neutral-800 dark:text-gray-100"
                            />
                            {errors.name && (
                                <div className="text-sm text-red-600">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 dark:border-gray-700 dark:bg-neutral-800 dark:text-gray-100"
                            />
                            {errors.email && (
                                <div className="text-sm text-red-600">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Nomor Orang Tua
                            </label>
                            <input
                                type="text"
                                value={data.parent_phone}
                                onChange={(e) =>
                                    setData("parent_phone", e.target.value)
                                }
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 dark:border-gray-700 dark:bg-neutral-800 dark:text-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Alamat
                            </label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 dark:border-gray-700 dark:bg-neutral-800 dark:text-gray-100"
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Kelas
                                </label>
                                <input
                                    type="text"
                                    value={data.class}
                                    onChange={(e) =>
                                        setData("class", e.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 dark:border-gray-700 dark:bg-neutral-800 dark:text-gray-100"
                                />
                            </div>

                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Jurusan
                                </label>
                                <input
                                    type="text"
                                    value={data.major}
                                    onChange={(e) =>
                                        setData("major", e.target.value)
                                    }
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-900 focus:ring-neutral-900 dark:border-gray-700 dark:bg-neutral-800 dark:text-gray-100"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData("is_active", e.target.checked)
                                }
                                id="is_active"
                            />
                            <label
                                htmlFor="is_active"
                                className="text-sm text-gray-700 dark:text-gray-200"
                            >
                                Aktif
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-md hover:bg-neutral-700 transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Simpan Perubahan
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
