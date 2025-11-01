import Link from "next/link";
import { getAllTags } from "@/lib/tags";
import { Tag } from "@/types/tag";

export default async function VerticalMenu() {
  const tags = await getAllTags();

  return (
    <aside className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-64 h-fit">
      <h2 className="text-lg font-semibold mb-3 text-pink-600">Tags</h2>
      <nav className="flex flex-col gap-2">
        {tags.map((tag: Tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className="text-gray-700 hover:text-pink-600 transition-colors"
          >
            #{tag.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
