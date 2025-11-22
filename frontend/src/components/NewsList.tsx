import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, TrendingUp, Clock, User } from "lucide-react";

interface NewsItem {
  title?: string;
  url?: string;
  score?: number;
  time?: number;
  by?: string;
}

interface NewsListProps {
  data: NewsItem[] | { stories?: NewsItem[]; news?: NewsItem[] };
}

const NewsList = ({ data }: NewsListProps) => {
  // Handle different possible data structures from backend
  let newsItems: NewsItem[] = [];
  
  if (Array.isArray(data)) {
    newsItems = data;
  } else if (data && typeof data === 'object') {
    newsItems = (data as any).stories || (data as any).news || [];
  }

  // Format timestamp to relative time
  const formatTime = (timestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;
    
    if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diff / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader className="border-b bg-gradient-card">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle>Latest Tech News</CardTitle>
        </div>
        <CardDescription>Top stories from Hacker News</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {newsItems.length > 0 ? (
          <div className="space-y-4">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="group p-4 rounded-lg border border-border bg-card hover:bg-accent/5 hover:border-primary/30 transition-all duration-200"
              >
                {/* Title */}
                <a
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-2"
                >
                  <h3 className="font-semibold text-base group-hover:text-primary transition-colors flex items-start gap-2">
                    <span className="flex-1">{item.title || 'Untitled'}</span>
                    <ExternalLink className="h-4 w-4 flex-shrink-0 mt-1 opacity-50 group-hover:opacity-100" />
                  </h3>
                </a>

                {/* Metadata */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {item.score !== undefined && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{item.score} points</span>
                    </div>
                  )}
                  
                  {item.time !== undefined && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(item.time)}</span>
                    </div>
                  )}
                  
                  {item.by && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>by {item.by}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No news available at the moment</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsList;
