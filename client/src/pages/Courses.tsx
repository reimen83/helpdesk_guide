import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Clock, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Courses() {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [enrollingCourseId, setEnrollingCourseId] = useState<number | null>(null);

  const { data: courses, isLoading: coursesLoading } = trpc.courses.list.useQuery({
    category: selectedCategory || undefined,
    level: (selectedLevel as any) || undefined,
    search: search || undefined,
  });

  const { data: categories } = trpc.courses.getCategories.useQuery();

  const { data: enrollments } = trpc.courses.myEnrollments.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const enrollMutation = trpc.courses.enroll.useMutation({
    onSuccess: () => {
      toast.success("Inscrito no curso com sucesso!");
      setEnrollingCourseId(null);
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao se inscrever no curso");
      setEnrollingCourseId(null);
    },
  });

  const handleEnroll = (courseId: number) => {
    if (!isAuthenticated) {
      toast.error("Você precisa estar logado para se inscrever");
      return;
    }
    setEnrollingCourseId(courseId);
    enrollMutation.mutate({ courseId });
  };

  const isEnrolled = (courseId: number) => {
    return enrollments?.some((e) => e.course.id === courseId);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "beginner":
        return "Iniciante";
      case "intermediate":
        return "Intermediário";
      case "advanced":
        return "Avançado";
      default:
        return level;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Nossos Cursos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Aprenda com os melhores cursos de Help Desk e Suporte Técnico
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg p-6 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Buscar</label>
              <Input
                placeholder="Buscar cursos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Categoria</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as categorias</SelectItem>
                  {categories?.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Nível</label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os níveis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os níveis</SelectItem>
                  <SelectItem value="beginner">Iniciante</SelectItem>
                  <SelectItem value="intermediate">Intermediário</SelectItem>
                  <SelectItem value="advanced">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))
          ) : courses && courses.length > 0 ? (
            courses.map((course: any) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                  <CardDescription>{course.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <Badge className={getLevelColor(course.level)}>
                      {getLevelLabel(course.level)}
                    </Badge>

                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                      {course.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration} min</span>
                        </div>
                      )}
                      {course.totalLessons && (
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{course.totalLessons} aulas</span>
                        </div>
                      )}
                    </div>

                    {course.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    )}
                  </div>

                  {course.instructor && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Instrutor:</span> {course.instructor}
                    </div>
                  )}

                  <Button
                    className="w-full"
                    disabled={
                      isEnrolled(course.id) ||
                      enrollingCourseId === course.id ||
                      !isAuthenticated
                    }
                    onClick={() => handleEnroll(course.id)}
                  >
                    {enrollingCourseId === course.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Inscrevendo...
                      </>
                    ) : isEnrolled(course.id) ? (
                      "Já inscrito"
                    ) : (
                      "Inscrever-se"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Nenhum curso encontrado. Tente ajustar os filtros.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
