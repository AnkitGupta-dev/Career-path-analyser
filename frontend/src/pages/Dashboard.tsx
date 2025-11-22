import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SkillGap from "@/components/SkillGap";
import Roadmap from "@/components/Roadmap";
import NewsList from "@/components/NewsList";

interface AnalysisData {
  targetRole: string;
  skillGap: any;
  roadmap: any;
  news: any;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem("careerAnalysisData");
    
    if (!storedData) {
      // If no data found, redirect to home
      navigate("/");
      return;
    }

    try {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
    } catch (error) {
      console.error("Error parsing stored data:", error);
      navigate("/");
    }
  }, [navigate]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Loading your analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">Career Analysis Dashboard</h1>
              <p className="text-lg opacity-90">Target Role: {data.targetRole}</p>
            </div>
            <Button
              onClick={() => navigate("/")}
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-0"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Top Section: Skill Gap and Roadmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Skill Gap */}
          <div className="lg:col-span-1">
            <SkillGap data={data.skillGap} />
          </div>

          {/* Right: Roadmap */}
          <div className="lg:col-span-1">
            <Roadmap data={data.roadmap} />
          </div>
        </div>

        {/* Bottom Section: News */}
        <div>
          <NewsList data={data.news} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
