import { useParams, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download, Play, FileText, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function CourseDetails() {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  const courseIdNum = parseInt(courseId || "0");

  // Fetch course details
  const { data: course, isLoading: courseLoading } = trpc.courses.getById.useQuery(
    { id: courseIdNum },
    { enabled: !!courseIdNum }
  );

  // Fetch lessons
  const { data: lessons, isLoading: lessonsLoading } = trpc.lessons.getByCourse.useQuery(
    { courseId: courseIdNum },
    { enabled: !!courseIdNum }
  );

  // Fetch materials
  const { data: materials } = trpc.lessons.getMaterialsByCourse.useQuery(
    { courseId: courseIdNum },
    { enabled: !!courseIdNum }
  );

  // Fetch selected lesson details
  const { data: selectedLesson } = trpc.lessons.getById.useQuery(
    { lessonId: selectedLessonId || 0 },
    { enabled: !!selectedLessonId }
  );

  // Fetch lesson materials
  const { data: lessonMaterials } = trpc.lessons.getMaterials.useQuery(
    { lessonId: selectedLessonId || 0 },
    { enabled: !!selectedLessonId }
  );

  useEffect(() => {
    if (lessons && lessons.length > 0 && !selectedLessonId) {
      setSelectedLessonId(lessons[0].id);
    }
  }, [lessons, selectedLessonId]);

  if (courseLoading || lessonsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Curso não encontrado</h1>
          <Button onClick={() => setLocation("/cursos")}>Voltar aos Cursos</Button>
        </div>
      </div>
    );
  }

  const handleDownloadMaterial = (fileUrl: string, fileName: string) => {
    if (!isAuthenticated) {
      toast.error("Você precisa fazer login para baixar materiais");
      setLocation("/login");
      return;
    }

    // Create a link to download the file
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Material baixado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <Button
          variant="ghost"
          onClick={() => setLocation("/cursos")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar aos Cursos
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{course.description}</p>
          <div className="flex gap-4 mt-4 flex-wrap">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
              {course.category}
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
              {course.level === "beginner"
                ? "Iniciante"
                : course.level === "intermediate"
                ? "Intermediário"
                : "Avançado"}
            </span>
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm">
              ⭐ {course.rating}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lessons Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Aulas ({lessons?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {lessons?.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedLessonId === lesson.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <Play className="h-4 w-4 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{lesson.title}</p>
                        <p className="text-xs opacity-75">{lesson.duration} min</p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Lesson Details */}
          <div className="lg:col-span-3">
            {selectedLesson ? (
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">Conteúdo</TabsTrigger>
                  <TabsTrigger value="materials">Materiais</TabsTrigger>
                </TabsList>

                <TabsContent value="content">
                  <Card>
                    <CardHeader>
                      <CardTitle>{selectedLesson.title}</CardTitle>
                      <CardDescription>{selectedLesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {selectedLesson.content}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Duração</p>
                          <p className="font-bold">{selectedLesson.duration} minutos</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="materials">
                  <Card>
                    <CardHeader>
                      <CardTitle>Materiais da Aula</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {lessonMaterials && lessonMaterials.length > 0 ? (
                        <div className="space-y-3">
                          {lessonMaterials.map((material) => (
                            <div
                              key={material.id}
                              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-blue-600" />
                                <div>
                                  <p className="font-medium">{material.title}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {material.description}
                                  </p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleDownloadMaterial(
                                    material.fileUrl,
                                    `${material.title}.${material.fileType}`
                                  )
                                }
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Baixar
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                          Nenhum material disponível para esta aula.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    Selecione uma aula para ver o conteúdo
                  </p>
                </CardContent>
              </Card>
            )}

            {/* All Materials Section */}
            {materials && materials.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Todos os Materiais do Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {materials.map((material) => (
                      <div
                        key={material.id}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">{material.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {material.description}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleDownloadMaterial(
                              material.fileUrl,
                              `${material.title}.${material.fileType}`
                            )
                          }
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
