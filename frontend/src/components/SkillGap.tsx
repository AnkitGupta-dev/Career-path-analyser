import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Lightbulb, TrendingUp } from "lucide-react";

interface SkillGapProps {
  data: {
    matchedSkills?: string[];
    missingSkills?: string[];
    recommendations?: string[];
    learningOrder?: string[];
  };
}

const SkillGap = ({ data }: SkillGapProps) => {
  // Handle empty or undefined data
  const matchedSkills = data?.matchedSkills || [];
  const missingSkills = data?.missingSkills || [];
  const recommendations = data?.recommendations || [];
  const learningOrder = data?.learningOrder || [];

  return (
    <Card className="h-full shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader className="border-b bg-gradient-card">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle>Skill Gap Analysis</CardTitle>
        </div>
        <CardDescription>Your current skills vs. required skills</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        {/* Matched Skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <h3 className="font-semibold text-lg">Matched Skills</h3>
          </div>
          
          {matchedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No matched skills found</p>
          )}
        </div>

        {/* Missing Skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="h-5 w-5 text-destructive" />
            <h3 className="font-semibold text-lg">Missing Skills</h3>
          </div>
          
          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-destructive/10 text-destructive border-destructive/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No missing skills identified</p>
          )}
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Recommendations</h3>
            </div>
            
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learning Order */}
        {learningOrder.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Suggested Learning Order</h3>
            </div>
            
            <ol className="space-y-2">
              {learningOrder.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Empty State */}
        {matchedSkills.length === 0 &&
          missingSkills.length === 0 &&
          recommendations.length === 0 &&
          learningOrder.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No skill gap data available</p>
            </div>
          )}
      </CardContent>
    </Card>
  );
};

export default SkillGap;
