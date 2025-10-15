import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const AIInsightsCard = () => {
  const [currentInsight, setCurrentInsight] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [trendBadge, setTrendBadge] = useState({ text: '', variant: 'secondary' });
  const { toast } = useToast();

  // Comprehensive list of realistic AI insights for government productivity
  const insights = [
    {
      text: "Employee productivity dropped by 12% this week. Delay detected in 2 DPR tasks. Suggested action: Reassign workload to distribute capacity more effectively.",
      trend: { text: "Trend: Negative ↓", variant: "destructive" }
    },
    {
      text: "Performance rose 8% due to faster task completion rates. Keep momentum by implementing recognition program for high performers in Digital Processing Cell.",
      trend: { text: "Trend: Positive ↑", variant: "default" }
    },
    {
      text: "Three tasks show risk of delay based on historical patterns. Recommend immediate progress review meeting tomorrow with concerned officers.",
      trend: { text: "Risk Alert ⚠️", variant: "secondary" }
    },
    {
      text: "Overall efficiency stable at 85% target. Minor slowdown in clerical section reported due to increased document verification requirements.",
      trend: { text: "Trend: Stable →", variant: "outline" }
    },
    {
      text: "Productivity index increased by 15% compared to last month. Best performing unit: Digital Processing Cell with 94% completion rate.",
      trend: { text: "Trend: Positive ↑", variant: "default" }
    },
    {
      text: "Frequent late submissions detected in Infrastructure Division. Recommend re-prioritizing deadlines and providing additional training resources.",
      trend: { text: "Action Required 🔔", variant: "destructive" }
    },
    {
      text: "AI detected optimal task distribution pattern. Current workload allocation shows 23% efficiency improvement potential through strategic reassignment.",
      trend: { text: "Optimization ⚡", variant: "default" }
    },
    {
      text: "Cross-department collaboration increased by 18%. File processing time reduced due to improved inter-office communication protocols.",
      trend: { text: "Trend: Positive ↑", variant: "default" }
    },
    {
      text: "Quality score improvement detected: 7% increase in first-time approval rates. Recommend standardizing current review processes across all divisions.",
      trend: { text: "Quality ⭐", variant: "default" }
    },
    {
      text: "Peak productivity hours identified: 10 AM - 12 PM and 2 PM - 4 PM. Consider scheduling critical tasks during these high-performance windows.",
      trend: { text: "Insight 💡", variant: "secondary" }
    },
    {
      text: "Digital adoption rate reached 89% department-wide. Officers using e-Filing system show 34% faster task completion compared to manual processes.",
      trend: { text: "Tech Adoption 📱", variant: "default" }
    },
    {
      text: "Seasonal workload pattern analysis suggests upcoming busy period. Recommend preparing additional resources for Q4 compliance deadlines.",
      trend: { text: "Forecast 📊", variant: "secondary" }
    }
  ];

  // Function to get random insight
  const getRandomInsight = () => {
    const randomIndex = Math.floor(Math.random() * insights.length);
    return insights[randomIndex];
  };

  // Function to refresh insight with animation
  const refreshInsight = () => {
    setIsAnimating(true);
    
    // Fade out animation
    setTimeout(() => {
      const newInsight = getRandomInsight();
      setCurrentInsight(newInsight.text);
      setTrendBadge(newInsight.trend);
      
      // Fade in animation
      setTimeout(() => {
        setIsAnimating(false);
      }, 150);
      
      // Show toast notification
      toast({
        title: "🤖 AI analysis refreshed!",
        description: "New productivity insights generated",
        duration: 2000,
      });
    }, 150);
  };

  // Initialize with random insight on component mount
  useEffect(() => {
    const initialInsight = getRandomInsight();
    setCurrentInsight(initialInsight.text);
    setTrendBadge(initialInsight.trend);
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg font-bold text-gray-800">
          <div className="flex items-center space-x-2">
            <span className="animate-pulse">🧩</span>
            <span>AI Insights</span>
          </div>
          <Badge variant={trendBadge.variant} className="text-xs">
            {trendBadge.text}
          </Badge>
        </CardTitle>
        <Separator className="bg-purple-200" />
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Insight Text Area */}
        <div className="min-h-[120px] flex items-center">
          <div 
            className={`
              italic text-gray-700 leading-relaxed text-sm p-4 
              bg-white/60 rounded-lg border border-purple-200 
              transition-all duration-300 ease-in-out
              ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}
            `}
          >
            <div className="flex items-start space-x-2">
              <span className="text-purple-500 mt-1">💡</span>
              <span className="flex-1">
                {currentInsight || "Analyzing productivity patterns..."}
              </span>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center pt-2">
          <Button
            onClick={refreshInsight}
            variant="outline"
            size="sm"
            className="bg-white/80 hover:bg-purple-100 border-purple-300 text-purple-700 font-medium transition-all duration-200 hover:scale-105"
            disabled={isAnimating}
          >
            <span className="mr-2">🔄</span>
            {isAnimating ? 'Analyzing...' : 'Refresh Insight'}
          </Button>
        </div>

        {/* AI Confidence Indicator */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          <span className="text-xs text-gray-500">AI Confidence:</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div
                key={dot}
                className={`w-2 h-2 rounded-full ${
                  dot <= 4 ? 'bg-green-400' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-green-600 font-medium">85%</span>
        </div>

        {/* Timestamp */}
        <div className="text-center">
          <span className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightsCard;