import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface RoadmapPhase {
  phase?: string;
  title?: string;
  items?: string[];
  tasks?: string[];
}

interface RoadmapProps {
  data: {
    phases?: RoadmapPhase[];
    roadmap?: RoadmapPhase[];
  };
}

const Roadmap = ({ data }: RoadmapProps) => {
  // Handle different possible data structures from backend
  const phases = data?.phases || data?.roadmap || [];

  return (
    <Card className="h-full shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader className="border-b bg-gradient-card">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <CardTitle>Career Roadmap</CardTitle>
        </div>
        <CardDescription>Your personalized learning path</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {phases.length > 0 ? (
          <div className="space-y-6">
            {phases.map((phase, index) => {
              // Extract items/tasks from different possible structures
              const items = phase.items || phase.tasks || [];
              const phaseTitle = phase.phase || phase.title || `Phase ${index + 1}`;
              
              return (
                <div key={index} className="relative">
                  {/* Phase Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-md">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold">{phaseTitle}</h3>
                  </div>

                  {/* Phase Content */}
                  <div className="ml-[3.25rem] border-l-2 border-primary/20 pl-6 pb-2">
                    {items.length > 0 ? (
                      <ul className="space-y-2">
                        {items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-1.5 text-lg">•</span>
                            <span className="pt-0.5">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No items for this phase</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No roadmap data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Roadmap;
