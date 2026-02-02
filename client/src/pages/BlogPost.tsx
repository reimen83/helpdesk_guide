import { useState } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, ExternalLink, Calendar, User } from "lucide-react";
import { useLocation } from "wouter";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug as string;

  const { data: post, isLoading } = trpc.blog.bySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post não encontrado</h1>
          <p className="text-gray-500 mb-6">Desculpe, não conseguimos encontrar este post.</p>
          <Button onClick={() => setLocation("/blog")}>Voltar para o Blog</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => setLocation("/blog")}
            className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={20} />
            <span>Voltar para o Blog</span>
          </button>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm opacity-90">
            {post.author && (
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
            )}
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
            {post.category && <Badge variant="secondary">{post.category}</Badge>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Source Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Publicado em <strong>{post.source}</strong>
                </p>
              </div>
              {post.sourceUrl && (
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Ler no original
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Post Content */}
          <article className="prose dark:prose-invert max-w-none mb-12">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </article>

          {/* Call to Action */}
          {post.sourceUrl && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Quer ler o artigo completo com todos os detalhes?
              </p>
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2">
                  Acessar artigo completo
                  <ExternalLink size={18} />
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
