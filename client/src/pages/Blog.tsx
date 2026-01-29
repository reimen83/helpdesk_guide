import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Calendar, User } from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const { data: posts, isLoading: postsLoading } = trpc.blog.list.useQuery({
    limit: 12,
    offset: page * 12,
  });

  const { data: searchResults, isLoading: searchLoading } =
    trpc.blog.search.useQuery(
      { query: searchQuery, limit: 12 },
      { enabled: searchQuery.length > 0 }
    );

  const { data: categoryPosts, isLoading: categoryLoading } =
    trpc.blog.byCategory.useQuery(
      { category: selectedCategory || "", limit: 12 },
      { enabled: !!selectedCategory }
    );

  const { data: categories } = trpc.blog.categories.useQuery();

  const displayPosts = searchQuery
    ? searchResults
    : selectedCategory
      ? categoryPosts
      : posts;
  const isLoading = searchQuery
    ? searchLoading
    : selectedCategory
      ? categoryLoading
      : postsLoading;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery("");
    setPage(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Blog - Notícias Tech</h1>
          <p className="text-lg opacity-90">
            Acompanhe as principais notícias e tendências do mundo tech
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              placeholder="Buscar posts..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => handleCategorySelect(null)}
              size="sm"
            >
              Todos
            </Button>
            {categories?.map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category ? "default" : "outline"
                }
                onClick={() => handleCategorySelect(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin" size={40} />
          </div>
        ) : displayPosts && displayPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                    {post.thumbnail && (
                      <div className="h-48 bg-gray-200 overflow-hidden">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      {post.category && (
                        <Badge className="mb-2">{post.category}</Badge>
                      )}
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-col gap-2 text-xs text-gray-500">
                        {post.author && (
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            <span>{post.author}</span>
                          </div>
                        )}
                        {post.publishedAt && (
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString(
                                "pt-BR"
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {!searchQuery && !selectedCategory && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={
                    !displayPosts || displayPosts.length < 12
                  }
                >
                  Próximo
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum post encontrado. Tente outra busca.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
