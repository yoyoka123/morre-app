import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { letters } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Home() {
  // Group letters by month/year key
  const groupedLetters = letters.reduce((acc, letter) => {
    if (!acc[letter.month]) {
      acc[letter.month] = [];
    }
    acc[letter.month].push(letter);
    return acc;
  }, {} as Record<string, typeof letters>);

  // Sort groups by date descending (newest first)
  const groups = Object.entries(groupedLetters).sort((a, b) => {
    // Extract year from month key (e.g., "2026 / 01" -> 2026, "2025" -> 2025)
    const getYear = (key: string) => parseInt(key.split('/')[0].trim());
    const getMonth = (key: string) => {
      const parts = key.split('/');
      return parts.length > 1 ? parseInt(parts[1].trim()) : 1;
    };

    const yearA = getYear(a[0]);
    const yearB = getYear(b[0]);

    if (yearA !== yearB) {
      return yearB - yearA; // Descending by year
    }
    return getMonth(b[0]) - getMonth(a[0]); // Descending by month
  });

  return (
    <div className="min-h-screen max-w-md mx-auto bg-[#F8F6F1] relative">
      {/* Header */}
      <header className="relative flex items-center justify-center px-4 pt-14 pb-4 sticky top-0 z-10 bg-[#F8F6F1]/90 backdrop-blur-sm">
        <Link href="/" className="absolute left-4 p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </Link>
        <h1 className="text-lg font-medium text-gray-900">来信</h1>
      </header>

      <main className="px-5 pb-10">
        {groups.map(([header, items]) => (
          <div key={header} className="mb-8">
            {/* Section Header */}
            <div className="flex items-center mb-4">
              <span className="px-3 py-1 bg-gray-200/50 rounded-full text-xs font-medium text-gray-600">
                {header} <span className="ml-1 text-gray-400">▶</span>
              </span>
            </div>

            <div className="space-y-4">
              {items.map((letter) => (
                <Link href={`/letter/${letter.id}`} key={letter.id} className="block">
                  <div className="bg-white rounded-[20px] p-4 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="flex gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[17px] font-semibold text-gray-900 mb-2 leading-tight">
                          {letter.title}
                        </h3>
                        <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-3">
                          {letter.preview}
                        </p>
                        <div className="flex items-center text-[11px] text-gray-400 gap-2">
                          <span>{letter.sender}</span>
                          <span>{letter.date}</span>
                        </div>
                      </div>
                      
                      {/* Image Thumbnail with Polaroid effect */}
                      <div className="relative w-24 h-24 flex-shrink-0 transform group-hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 bg-gray-100 rotate-3 rounded-lg shadow-sm border-4 border-white overflow-hidden">
                           <Image
                            src={letter.image}
                            alt={letter.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                         <div className="absolute inset-0 bg-gray-100 -rotate-2 rounded-lg shadow-sm border-4 border-white overflow-hidden -z-10 translate-x-1 translate-y-1 opacity-60"></div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
