import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, TrendingUp, Target, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [targetRole, setTargetRole] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  const [loading, setLoading] = useState(false);

  // Backend API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleAnalyze = async () => {
    // Validation
    if (!targetRole.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your target role",
        variant: "destructive",
      });
      return;
    }

    if (!currentSkills.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your current skills",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Parse skills from comma-separated string
      const skillsArray = currentSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      // Call all three backend APIs in parallel
      const [skillGapResponse, roadmapResponse, newsResponse] = await Promise.all([
        axios.post(`${API_BASE_URL}/skill-gap`, {
          targetRole,
          currentSkills: skillsArray,
        }),
        axios.post(`${API_BASE_URL}/roadmap`, {
          targetRole,
        }),
        axios.get(`${API_BASE_URL}/news`),
      ]);

      // Store results in localStorage to pass to dashboard
      localStorage.setItem(
        "careerAnalysisData",
        JSON.stringify({
          targetRole,
          skillGap: skillGapResponse.data,
          roadmap: roadmapResponse.data,
          news: newsResponse.data,
        })
      );

      toast({
        title: "Analysis Complete!",
        description: "Your career path has been analyzed successfully",
      });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during analysis:", error);
      toast({
        title: "Analysis Failed",
        description:
          axios.isAxiosError(error) && error.response
            ? `Server error: ${error.response.status}`
            : "Failed to connect to the backend. Please ensure the server is running at http://localhost:5000",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        
        <div className="relative container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-1 animate-fade-in">
              Career Path Analyzer
            </h1>
            <p className="text-xl md:text-2xl mb-1 opacity-90">
              Discover your skill gaps, get personalized roadmaps, and stay updated with the latest tech news
            </p>
          </div>
        </div>
      </section>

      {/* Input Form Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto p-8 shadow-card hover:shadow-hover transition-all duration-300">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-primary bg-clip-text text-transparent">
            Start Your Career Analysis
          </h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="targetRole" className="block text-sm font-medium mb-2">
                Target Role <span className="text-destructive">*</span>
              </label>
              <Input
                id="targetRole"
                type="text"
                placeholder="e.g., Backend Developer, Frontend Developer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="text-base"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="currentSkills" className="block text-sm font-medium mb-2">
                Current Skills <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="currentSkills"
                placeholder="Enter your current skills separated by commas&#10;e.g., HTML, CSS, JavaScript, React"
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                className="min-h-32 text-base"
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Separate multiple skills with commas
              </p>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full text-lg py-6 bg-gradient-primary hover:opacity-90 transition-opacity"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Your Career Path...
                </>
              ) : (
                "Analyze My Career Path"
              )}
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;
