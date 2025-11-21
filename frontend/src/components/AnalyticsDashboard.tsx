import React, { useState } from 'react';
import { TrendingUp, Award, Clock, Zap, Target, BookOpen } from 'lucide-react';
import { Course } from '../types/course';

interface AnalyticsDashboardProps {
  courses: Course[];
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ courses }) => {
  const [selectedPeriod] = useState<'week' | 'month' | 'all'>('month');

  const totalCourses = courses.length;
  const completedCourses = courses.filter(c => c.progress === 100).length;
  const avgProgress = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + (c.progress || 0), 0) / courses.length)
    : 0;

  const totalLessons = courses.reduce((sum, c) => sum + (c.lessons?.length || 0), 0);
  const completedLessons = courses.reduce((sum, c) => {
    const completed = c.lessons?.filter(l => l.completed).length || 0;
    return sum + completed;
  }, 0);

  const strengths = [
    { topic: 'Data Structures', score: 92, questionsCorrect: 46, questionsTotal: 50 },
    { topic: 'Algorithms', score: 88, questionsCorrect: 44, questionsTotal: 50 },
    { topic: 'System Design', score: 85, questionsCorrect: 42, questionsTotal: 50 }
  ];

  const weaknesses = [
    { topic: 'Dynamic Programming', score: 62, questionsCorrect: 31, questionsTotal: 50 },
    { topic: 'Graph Theory', score: 68, questionsCorrect: 34, questionsTotal: 50 },
    { topic: 'Advanced Trees', score: 70, questionsCorrect: 35, questionsTotal: 50 }
  ];

  const recentActivities = [
    { type: 'completed_lesson', title: 'Array Manipulation Advanced', course: 'Data Structures', date: 'Today' },
    { type: 'quiz_passed', title: 'Sorting Algorithms Quiz', course: 'Algorithms', date: 'Yesterday', score: 95 },
    { type: 'assignment_submitted', title: 'Binary Tree Implementation', course: 'Data Structures', date: '2 days ago' },
    { type: 'test_taken', title: 'Dynamic Programming Test', course: 'Advanced Algorithms', date: '3 days ago', score: 78 }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed_lesson':
        return '✓';
      case 'quiz_passed':
        return '🎯';
      case 'assignment_submitted':
        return '📝';
      case 'test_taken':
        return '📊';
      default:
        return '•';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Learning Analytics</h1>
          <p className="text-gray-600 mt-2">Track your progress and identify areas for improvement</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Overall Progress</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{avgProgress}%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Courses Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{completedCourses}/{totalCourses}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Award className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Learning Hours</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{Math.round(completedLessons * 1.5)}h</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Learning Streak</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">7 days</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Strengths */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Target className="h-5 w-5 text-green-600 mr-2" />
                <h2 className="text-lg font-bold text-gray-900">Your Strengths</h2>
              </div>
              <div className="space-y-3">
                {strengths.map((strength, idx) => (
                  <div key={idx} className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-gray-900">{strength.topic}</p>
                      <span className="text-sm font-bold text-green-600">{strength.score}%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-1.5">
                      <div
                        className="bg-green-600 h-1.5 rounded-full"
                        style={{ width: `${strength.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{strength.questionsCorrect}/{strength.questionsTotal} correct</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weaknesses */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Zap className="h-5 w-5 text-orange-600 mr-2" />
                <h2 className="text-lg font-bold text-gray-900">Areas to Improve</h2>
              </div>
              <div className="space-y-3">
                {weaknesses.map((weakness, idx) => (
                  <div key={idx} className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-gray-900">{weakness.topic}</p>
                      <span className="text-sm font-bold text-orange-600">{weakness.score}%</span>
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-1.5">
                      <div
                        className="bg-orange-600 h-1.5 rounded-full"
                        style={{ width: `${weakness.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{weakness.questionsCorrect}/{weakness.questionsTotal} correct</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-bold text-gray-900">Course Progress</h2>
              </div>
              <div className="space-y-3">
                {courses.slice(0, 3).map((course) => (
                  <div key={course.id}>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-gray-900">{course.title}</p>
                      <span className="text-sm font-bold text-blue-600">{course.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                <span className="text-xl mr-3">{getActivityIcon(activity.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">{activity.date}</p>
                  {activity.score && (
                    <p className="text-xs font-semibold text-green-600 mt-1">Score: {activity.score}%</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
