import { useAuth } from "@/_core/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { ArrowRight, BookOpen, Code, Users, Mail } from "lucide-react";
import { useLocation } from "wouter";
import { ContactForm } from "@/components/ContactForm";
import { NewsletterForm } from "@/components/NewsletterForm";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("home.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("home.subtitle")}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setLocation("/cursos")}
            >
              {t("home.cta_courses")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {isAuthenticated && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => setLocation("/perfil")}
              >
                {t("home.cta_profile")}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("home.why_choose")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>{t("home.feature_courses")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {t("home.feature_courses_desc")}
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Code className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>{t("home.feature_ai")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {t("home.feature_ai_desc")}
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>{t("home.feature_community")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {t("home.feature_community_desc")}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-slate-100 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold">{t("home.newsletter_title")}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("home.newsletter_subtitle")}
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">{t("home.contact_title")}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("home.contact_subtitle")}
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center text-white space-y-6">
            <h2 className="text-3xl font-bold">{t("home.cta_title")}</h2>
            <p className="text-lg opacity-90">
              {t("home.cta_subtitle")}
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              {t("home.cta_signup")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
