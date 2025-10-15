import React, { useEffect, useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AIInsightsCard from '../components/AIInsightsCard';

const TaskTracker = () => {
  const { 
    tasks, 
    updateTaskProgress, 
    markTaskComplete, 
    calculateTotalScore, 
    getTaskStatus,
    initializeScores
  } = useTaskStore();
  
  const { toast } = useToast();
  const [totalScore, setTotalScore] = useState(0);

  // Initialize scores on component mount
  useEffect(() => {
    initializeScores();
  }, [initializeScores]);

  // Update total score when tasks change
  useEffect(() => {
    const newScore = calculateTotalScore();
    setTotalScore(newScore);
  }, [tasks, calculateTotalScore]);

  const handleProgressChange = (taskId, newProgress) => {
    const oldScore = calculateTotalScore();
    updateTaskProgress(taskId, parseInt(newProgress));
    
    // Show toast after a brief delay to allow state update
    setTimeout(() => {
      const newScore = calculateTotalScore();
      if (newScore !== oldScore) {
        toast({
          title: "✅ Performance score updated!",
          description: `New productivity score: ${newScore} points`,
          duration: 3000,
        });
      }
    }, 100);
  };

  const handleMarkComplete = (taskId) => {
    const oldScore = calculateTotalScore();
    markTaskComplete(taskId);
    
    // Show toast after a brief delay to allow state update
    setTimeout(() => {
      const newScore = calculateTotalScore();
      toast({
        title: "🎉 Task completed!",
        description: `Performance score updated: ${newScore} points (+${newScore - oldScore})`,
        duration: 3000,
      });
    }, 100);
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case 'completed':
        return 'default'; // Green
      case 'in-progress':
        return 'secondary'; // Yellow
      case 'overdue':
        return 'destructive'; // Red
      default:
        return 'outline';
    }
  };

  const getBadgeText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'overdue':
        return 'Overdue';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📋 Task Tracker & Productivity Monitor
          </h1>
          <p className="text-gray-600">
            Monitor task progress and track productivity scores in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Task Table */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Active Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px]">Task</TableHead>
                        <TableHead className="min-w-[150px]">Assigned To</TableHead>
                        <TableHead className="min-w-[120px]">Deadline</TableHead>
                        <TableHead className="min-w-[150px]">Status & Progress</TableHead>
                        <TableHead className="min-w-[80px]">Score</TableHead>
                        <TableHead className="min-w-[120px]">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasks.map((task) => {
                        const status = getTaskStatus(task);
                        return (
                          <TableRow key={task.id} className="hover:bg-gray-50">
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Badge variant={getBadgeVariant(status)}>
                                  {getBadgeText(status)}
                                </Badge>
                                <span className="font-medium">{task.task}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {task.assignedTo}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {formatDate(task.deadline)}
                            </TableCell>
                            <TableCell>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={task.progress}
                                    onChange={(e) => handleProgressChange(task.id, e.target.value)}
                                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={task.progress === 100}
                                  />
                                  <span className="text-sm text-gray-500">%</span>
                                </div>
                                <Progress value={task.progress} className="w-full h-2" />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-lg font-bold text-blue-600">
                                {task.score}
                              </div>
                              <div className="text-xs text-gray-500">points</div>
                            </TableCell>
                            <TableCell>
                              {task.progress < 100 && (
                                <Button
                                  onClick={() => handleMarkComplete(task.id)}
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Mark Complete
                                </Button>
                              )}
                              {task.progress === 100 && (
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  ✓ Done
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Productivity Score Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader className="text-center">
                <CardTitle className="text-lg font-semibold">Total Productivity Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {totalScore}
                  </div>
                  <div className="text-sm text-gray-500">Total Points</div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      Completed Tasks
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {tasks.filter(t => t.progress === 100).length} / {tasks.length}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      Avg Progress
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length)}%
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      Overdue Tasks
                    </div>
                    <div className="text-lg font-bold text-red-600">
                      {tasks.filter(t => getTaskStatus(t) === 'overdue').length}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs text-blue-700 mb-1">Scoring System:</div>
                  <div className="text-xs text-blue-600 space-y-1">
                    <div>✓ Complete: 20 pts</div>
                    <div>✓ On time: +10 pts</div>
                    <div>✗ Late: -5 pts</div>
                    <div>~ Partial: Proportional</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="mt-8 flex justify-center">
          <AIInsightsCard />
        </div>
      </div>
    </div>
  );
};

export default TaskTracker;