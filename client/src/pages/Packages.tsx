import { useState, useMemo } from "react";
import PackageCard from "@/components/PackageCard";
import { useQuery } from "@tanstack/react-query";
import type { Package } from "@shared/schema";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Packages() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");

  const { data: packages = [], isLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  const categories = useMemo(() => {
    const cats = new Set(packages.map((p: Package) => p.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [packages]);

  const filteredAndSortedPackages = useMemo(() => {
    let result = [...packages];

    // Search filter
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.destination.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [packages, search, category, sortBy]);

  if (isLoading) {
    return (
      <div>
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }}>
              Travel Packages
            </h1>
            <p className="text-lg text-muted-foreground">
              Loading packages...
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }} data-testid="text-packages-title">
            Travel Packages
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-packages-subtitle">
            Carefully curated travel experiences to destinations around the world
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b bg-white dark:bg-zinc-950 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations, packages..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-package-search"
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
              <div className="flex items-center gap-2 mr-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Category:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat as string}
                    variant={category === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategory(cat as string)}
                    className="rounded-full"
                    data-testid={`button-category-${(cat as string).toLowerCase()}`}
                  >
                    {cat as string}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name: A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(search || category !== "All") && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {search && (
                <Badge variant="secondary" className="gap-1">
                  Search: {search}
                  <button onClick={() => setSearch("")} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              {category !== "All" && (
                <Badge variant="secondary" className="gap-1">
                  Category: {category}
                  <button onClick={() => setCategory("All")} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={() => { setSearch(""); setCategory("All"); }} className="text-xs h-7">
                Clear all
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredAndSortedPackages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No packages found matching your criteria.</p>
              <Button variant="ghost" className="mt-4" onClick={() => { setSearch(""); setCategory("All"); }}>
                Reset all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedPackages.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
