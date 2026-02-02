import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Save, Users, AlertCircle, CheckCircle, XCircle, Instagram } from 'lucide-react';

const SocialMediaAssessment = () => {
  const [currentStep, setCurrentStep] = useState('name');
  const [candidateName, setCandidateName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [ratings, setRatings] = useState({});
  const [notes, setNotes] = useState({});
  const [allCandidates, setAllCandidates] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const categories = [
    {
      title: "1. Platform & Strategy Knowledge",
      questions: [
        {
          id: 1,
          title: "Question 1 – Platform Understanding",
          description: "Which social media platforms do you usually work with, and how do they differ?",
          criteria: [
            "Names 3+ major platforms (Instagram, TikTok, LinkedIn, Facebook, Twitter/X)",
            "Explains key differences (audience, content type, algorithm)",
            "Shows practical experience with platform-specific features",
            "Understands each platform's strengths and use cases",
            "Can match platform to business goals"
          ],
          redFlag: "Only knows one platform, or gives generic answers without real understanding",
          goodAnswer: "I mainly work with Instagram, TikTok, and LinkedIn. Instagram is great for visual storytelling and younger audiences (18-34). TikTok focuses on short-form video and trends, perfect for viral reach. LinkedIn is B2B-focused with professional content. Each has different algorithms - Instagram favors engagement time, TikTok prioritizes completion rate, LinkedIn values meaningful interactions."
        },
        {
          id: 2,
          title: "Question 2 – Goal-Driven Content",
          description: "How do you decide what kind of content to post for a brand?",
          criteria: [
            "Starts with business goals and target audience",
            "Considers brand identity and values",
            "Uses data and insights from past performance",
            "Balances trending content with evergreen content",
            "Mentions content pillars or themes"
          ],
          redFlag: "Just posts what's trending or what they personally like, no strategy",
          goodAnswer: "I start by understanding the brand's goals - are we building awareness, driving sales, or growing community? Then I analyze the target audience: what they care about, when they're online, what format they prefer. I create content pillars (e.g., educational, entertaining, promotional) and mix trending topics with evergreen content that aligns with brand values."
        }
      ]
    },
    {
      title: "2. Content Planning & Brand Consistency",
      questions: [
        {
          id: 3,
          title: "Question 3 – Content Planning",
          description: "How do you plan content for one month?",
          criteria: [
            "Uses a content calendar or planning tool",
            "Plans ahead but stays flexible for trends",
            "Considers posting frequency and optimal times",
            "Balances different content types and formats",
            "Includes holidays, events, and campaigns"
          ],
          redFlag: "Posts randomly or 'whenever I have time', no structure",
          goodAnswer: "I use a content calendar tool like Later or Asana. At the start of each month, I map out key dates (holidays, product launches, campaigns) and create a mix of planned content and buffer slots for trending topics. I plan 3-4 posts per week per platform, considering optimal posting times for each audience. I batch-create content in advance but leave room for real-time engagement."
        },
        {
          id: 8,
          title: "Question 8 – Brand Voice",
          description: "How do you make sure posts match a brand's tone and values?",
          criteria: [
            "Creates or follows brand guidelines/style guide",
            "Understands brand personality (formal, playful, professional)",
            "Reviews content before posting for consistency",
            "Gives examples of adapting tone for different contexts",
            "Considers visual consistency (colors, fonts, filters)"
          ],
          redFlag: "Posts inconsistently or doesn't understand brand identity",
          goodAnswer: "I start by creating or studying the brand's style guide - tone of voice, key phrases, visual identity. For example, if a brand is 'approachable and helpful,' I use conversational language and emojis. If it's 'professional and expert,' I keep it formal. I always review captions and visuals against brand guidelines before posting and maintain consistent filters, colors, and fonts."
        }
      ]
    },
    {
      title: "3. Engagement & Community Management",
      questions: [
        {
          id: 4,
          title: "Question 4 – Engagement & Community",
          description: "What do you do to increase engagement (likes, comments, shares)?",
          criteria: [
            "Creates interactive content (polls, questions, challenges)",
            "Responds to comments and DMs promptly",
            "Uses strong CTAs (call-to-actions)",
            "Posts at optimal times for the audience",
            "Builds community through consistent interaction"
          ],
          redFlag: "Focuses only on posting, doesn't engage with audience",
          goodAnswer: "I create interactive content like polls, 'this or that' posts, and open-ended questions to spark conversation. I always respond to comments within 2 hours to boost algorithm visibility. I use clear CTAs like 'Tag a friend who needs this' or 'Save this for later.' I also engage with our followers' content, not just expect them to engage with ours."
        },
        {
          id: 7,
          title: "Question 7 – Handling Negative Comments",
          description: "How do you handle negative comments or a social media crisis?",
          criteria: [
            "Stays calm and professional",
            "Responds quickly but thoughtfully",
            "Takes serious issues to DMs or offline",
            "Knows when to escalate to management",
            "Learns from criticism and adjusts if valid"
          ],
          redFlag: "Deletes all negative comments, gets defensive, or ignores issues",
          isKO: true,
          goodAnswer: "I stay calm and respond professionally. For constructive criticism, I acknowledge it and offer a solution publicly. For serious complaints, I move the conversation to DMs to resolve privately. I never delete comments unless they're spam or abusive. For a crisis, I immediately inform management and follow our crisis communication plan. I always respond within 1 hour during a crisis."
        }
      ]
    },
    {
      title: "4. Analytics & Performance",
      questions: [
        {
          id: 5,
          title: "Question 5 – Analytics & KPIs",
          description: "Which metrics do you track to measure success on social media?",
          criteria: [
            "Names relevant KPIs (engagement rate, reach, impressions, CTR)",
            "Connects metrics to business goals",
            "Understands difference between vanity and valuable metrics",
            "Uses analytics tools (platform insights, Google Analytics)",
            "Makes data-driven decisions"
          ],
          redFlag: "Only tracks follower count, doesn't understand meaningful metrics",
          goodAnswer: "I track engagement rate (likes, comments, shares divided by reach) as the most important metric. For awareness campaigns, I focus on reach and impressions. For conversion campaigns, I track click-through rate and website traffic via UTM links. I use platform insights and tools like Sprout Social to analyze trends weekly and adjust strategy monthly based on what's working."
        },
        {
          id: 6,
          title: "Question 6 – Paid Ads Basics",
          description: "What is your experience with paid social media ads?",
          criteria: [
            "Has created or managed paid campaigns",
            "Understands targeting options (demographics, interests, lookalikes)",
            "Knows basic ad formats and placements",
            "Tracks ROI and cost per result",
            "Can optimize campaigns based on performance"
          ],
          redFlag: "No experience with paid ads or doesn't understand ROI",
          goodAnswer: "I've managed paid campaigns on Meta (Facebook/Instagram) and TikTok. I set up campaigns with clear objectives (awareness, traffic, conversions), create custom audiences based on demographics and interests, and use A/B testing for creative and copy. I monitor cost per click and conversion rate daily and optimize by pausing underperforming ads and scaling winners. My recent campaign achieved a 3.2% CTR and €2.50 CPA."
        }
      ]
    },
    {
      title: "5. Learning & Adaptation",
      questions: [
        {
          id: 9,
          title: "Question 9 – Trends & Updates",
          description: "How do you stay up to date with social media trends and algorithm changes?",
          criteria: [
            "Follows industry leaders and creators",
            "Reads blogs, newsletters (Social Media Examiner, Later, HubSpot)",
            "Tests new features early",
            "Participates in communities or groups",
            "Shows genuine curiosity and experimentation"
          ],
          redFlag: "Doesn't follow trends or learn about platform updates",
          goodAnswer: "I follow social media experts like Matt Navarra and Later's blog for algorithm updates. I'm active in Facebook groups for social media managers where we share insights. I test new features immediately when platforms roll them out - like Instagram Reels when it launched. I also spend 30 minutes daily scrolling to see what's trending and how brands are adapting."
        }
      ]
    }
  ];

  const allQuestions = categories.flatMap(cat => cat.questions);

  useEffect(() => {
    const stored = localStorage.getItem('socialMediaAssessments');
    if (stored) {
      setAllCandidates(JSON.parse(stored));
    }
  }, []);

  const getRecommendation = (totalScore, maxScore, koScores) => {
    const percentage = (totalScore / maxScore) * 100;
    const hasKOFailure = koScores.some(score => score < 3);
    
    if (hasKOFailure) {
      return {
        decision: "NO HIRE",
        color: "red",
        icon: XCircle,
        reasoning: "Critical crisis management failure. Question 7 is non-negotiable for community-facing roles. Candidate shows insufficient professionalism or conflict resolution skills needed for brand reputation management."
      };
    }
    
    if (percentage >= 85) {
      return {
        decision: "STRONG HIRE",
        color: "green",
        icon: CheckCircle,
        reasoning: "Exceptional candidate with strong strategic thinking, hands-on platform experience, and data-driven approach. Ready to manage social media independently and drive measurable results."
      };
    }
    
    if (percentage >= 75) {
      return {
        decision: "HIRE",
        color: "green",
        icon: CheckCircle,
        reasoning: "Solid candidate with good understanding of social media fundamentals and practical experience. Shows potential to grow with proper guidance and clear KPIs."
      };
    }
    
    if (percentage >= 65) {
      return {
        decision: "MAYBE",
        color: "yellow",
        icon: AlertCircle,
        reasoning: "Entry-level candidate with basic knowledge but gaps in strategy, analytics, or crisis management. Consider for junior role with close supervision and training plan."
      };
    }
    
    return {
      decision: "NO HIRE",
      color: "red",
      icon: XCircle,
      reasoning: "Insufficient competency for social media management role. Candidate lacks strategic thinking, platform knowledge, or professionalism needed to represent brands online."
    };
  };

  const saveAssessment = () => {
    const totalScore = Object.values(ratings).reduce((sum, r) => sum + r, 0);
    const maxScore = allQuestions.length * 5;
    const percentage = (totalScore / maxScore * 100).toFixed(1);
    
    const koQuestions = allQuestions.filter(q => q.isKO);
    const koScores = koQuestions.map(q => ratings[q.id] || 0);
    const recommendation = getRecommendation(totalScore, maxScore, koScores);

    const assessment = {
      name: candidateName,
      date: new Date().toISOString(),
      ratings,
      notes,
      totalScore,
      maxScore,
      percentage,
      recommendation
    };

    const updated = [...allCandidates, assessment];
    setAllCandidates(updated);
    localStorage.setItem('socialMediaAssessments', JSON.stringify(updated));
    setShowResults(true);
  };

  const resetAssessment = () => {
    setCandidateName('');
    setCurrentStep('name');
    setCurrentQuestionIndex(0);
    setRatings({});
    setNotes({});
    setShowResults(false);
    setShowHistory(false);
  };

  const getRatingColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 65) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDecisionColor = (decision) => {
    if (decision === "STRONG HIRE" || decision === "HIRE") return "green";
    if (decision === "MAYBE") return "yellow";
    return "red";
  };

  const currentQuestion = allQuestions[currentQuestionIndex];

  if (showHistory) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="w-8 h-8" />
                All Social Media Assessments
              </h1>
              <button
                onClick={() => setShowHistory(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Back
              </button>
            </div>

            {allCandidates.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No assessments yet</p>
            ) : (
              <div className="space-y-4">
                {allCandidates.sort((a, b) => new Date(b.date) - new Date(a.date)).map((candidate, index) => {
                  const DecisionIcon = candidate.recommendation.icon;
                  const decisionColor = getDecisionColor(candidate.recommendation.decision);
                  
                  return (
                    <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{candidate.name}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(candidate.date).toLocaleDateString('en-US', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className={`text-3xl font-bold ${getRatingColor(candidate.totalScore, candidate.maxScore)}`}>
                              {candidate.percentage}%
                            </div>
                            <div className="text-sm text-gray-600">
                              {candidate.totalScore} / {candidate.maxScore} points
                            </div>
                          </div>
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${
                            decisionColor === 'green' ? 'bg-green-100 text-green-800' :
                            decisionColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            <DecisionIcon className="w-5 h-5" />
                            {candidate.recommendation.decision}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-2 mt-4">
                        {Object.entries(candidate.ratings).map(([qId, rating]) => (
                          <div key={qId} className="text-center">
                            <div className="text-xs text-gray-500 mb-1">Q{qId}</div>
                            <div className={`font-semibold ${rating === 5 ? 'text-green-600' : rating >= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {rating}/5
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const totalScore = Object.values(ratings).reduce((sum, r) => sum + r, 0);
    const maxScore = allQuestions.length * 5;
    const percentage = (totalScore / maxScore * 100).toFixed(1);
    const koQuestions = allQuestions.filter(q => q.isKO);
    const koScores = koQuestions.map(q => ratings[q.id] || 0);
    const hasKOFailure = koScores.some(score => score < 3);
    const recommendation = getRecommendation(totalScore, maxScore, koScores);
    const DecisionIcon = recommendation.icon;

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Instagram className="w-8 h-8" />
              Social Media Assessment: {candidateName}
            </h1>

            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <div className="text-center">
                <div className={`text-6xl font-bold mb-2 ${getRatingColor(totalScore, maxScore)}`}>
                  {percentage}%
                </div>
                <div className="text-xl text-gray-700">
                  {totalScore} of {maxScore} points
                </div>
              </div>
            </div>

            {/* Hiring Recommendation */}
            <div className={`mb-8 p-6 rounded-lg border-4 ${
              recommendation.color === 'green' ? 'bg-green-50 border-green-500' :
              recommendation.color === 'yellow' ? 'bg-yellow-50 border-yellow-500' :
              'bg-red-50 border-red-500'
            }`}>
              <div className="flex items-start gap-4">
                <DecisionIcon className={`w-12 h-12 flex-shrink-0 ${
                  recommendation.color === 'green' ? 'text-green-600' :
                  recommendation.color === 'yellow' ? 'text-yellow-600' :
                  'text-red-600'
                }`} />
                <div>
                  <h2 className={`text-3xl font-bold mb-3 ${
                    recommendation.color === 'green' ? 'text-green-800' :
                    recommendation.color === 'yellow' ? 'text-yellow-800' :
                    'text-red-800'
                  }`}>
                    {recommendation.decision}
                  </h2>
                  <p className={`text-lg ${
                    recommendation.color === 'green' ? 'text-green-700' :
                    recommendation.color === 'yellow' ? 'text-yellow-700' :
                    'text-red-700'
                  }`}>
                    {recommendation.reasoning}
                  </p>
                </div>
              </div>
            </div>

            {hasKOFailure && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex items-center gap-2 text-red-800 font-semibold mb-2">
                  <AlertCircle className="w-5 h-5" />
                  Critical KO Criteria Not Met!
                </div>
                <p className="text-red-700 text-sm">
                  Crisis Management question (Question 7) scored less than 3 points. This is non-negotiable for community-facing roles.
                </p>
              </div>
            )}

            {/* Summary Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600">{totalScore}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-600">{Object.values(ratings).filter(r => r === 5).length}</div>
                <div className="text-sm text-gray-600">Perfect Scores (5/5)</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-orange-600">{Object.values(ratings).filter(r => r < 3).length}</div>
                <div className="text-sm text-gray-600">Weak Areas (&lt;3)</div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              {categories.map((category, catIndex) => (
                <div key={catIndex} className="border rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">{category.title}</h3>
                  <div className="space-y-2">
                    {category.questions.map(q => (
                      <div key={q.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex-1">
                          <div className="font-medium text-gray-700">
                            {q.isKO && <span className="text-red-600 font-bold">⚠️ </span>}
                            {q.title}
                          </div>
                          {notes[q.id] && (
                            <div className="text-sm text-gray-600 mt-1 italic">"{notes[q.id]}"</div>
                          )}
                        </div>
                        <div className={`text-2xl font-bold ml-4 ${
                          ratings[q.id] === 5 ? 'text-green-600' : 
                          ratings[q.id] >= 3 ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}>
                          {ratings[q.id] || 0}/5
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetAssessment}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                New Interview
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                View All Assessments
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'name') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Instagram className="w-16 h-16 text-pink-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Social Media Manager<br/>Interview Assessment
          </h1>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Candidate Name
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="e.g. Sarah Miller"
              autoFocus
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={() => candidateName.trim() && setCurrentStep('questions')}
              disabled={!candidateName.trim()}
              className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold transition-colors"
            >
              Start Interview
            </button>
            
            {allCandidates.length > 0 && (
              <button
                onClick={() => setShowHistory(true)}
                className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Previous Assessments ({allCandidates.length})
              </button>
            )}
          </div>

          <div className="mt-8 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
            <p className="text-sm text-gray-700">
              <strong>9 Questions</strong> in 5 categories<br/>
              Maximum score: <strong>45 points</strong><br/>
              <span className="text-pink-700 font-semibold">⚠️ KO criteria: Crisis Management (Q7)</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const categoryIndex = categories.findIndex(cat => 
    cat.questions.some(q => q.id === currentQuestion.id)
  );
  const currentCategory = categories[categoryIndex];
  const ratedCount = Object.keys(ratings).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Instagram className="w-6 h-6 text-pink-600" />
                  {candidateName}
                </h2>
                <p className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {allQuestions.length} • {ratedCount}/{allQuestions.length} rated
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-pink-600">
                  {Object.values(ratings).reduce((sum, r) => sum + r, 0)}
                </div>
                <div className="text-sm text-gray-500">Points</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / allQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-6 p-4 bg-pink-50 rounded-lg">
            <h3 className="font-semibold text-pink-900">{currentCategory.title}</h3>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              {currentQuestion.isKO && (
                <span className="text-red-600 text-2xl">⚠️</span>
              )}
              {currentQuestion.title}
            </h3>
            
            <p className="text-gray-700 mb-4 text-lg">
              {currentQuestion.description}
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded">
              <p className="font-semibold text-green-900 mb-2">✅ 5 points if candidate demonstrates:</p>
              <ul className="space-y-1">
                {currentQuestion.criteria.map((criterion, idx) => (
                  <li key={idx} className="text-green-800 text-sm">• {criterion}</li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <p className="font-semibold text-red-900 mb-1">❌ Red Flag:</p>
              <p className="text-red-800 text-sm">{currentQuestion.redFlag}</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
              <p className="font-semibold text-blue-900 mb-2">💡 Good Answer Example:</p>
              <p className="text-blue-800 text-sm italic">"{currentQuestion.goodAnswer}"</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">
                Rating (0-5 points)
              </label>
              <div className="flex gap-2 justify-center">
                {[0, 1, 2, 3, 4, 5].map(score => (
                  <button
                    key={score}
                    onClick={() => setRatings({...ratings, [currentQuestion.id]: score})}
                    className={`w-16 h-16 rounded-lg font-bold text-xl transition-all ${
                      ratings[currentQuestion.id] === score
                        ? score === 5 ? 'bg-green-600 text-white scale-110'
                          : score >= 3 ? 'bg-yellow-500 text-white scale-110'
                          : 'bg-red-500 text-white scale-110'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Notes (optional)
              </label>
              <textarea
                value={notes[currentQuestion.id] || ''}
                onChange={(e) => setNotes({...notes, [currentQuestion.id]: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                rows="3"
                placeholder="Candidate's answer or additional remarks..."
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            {currentQuestionIndex === allQuestions.length - 1 ? (
              <button
                onClick={saveAssessment}
                disabled={ratedCount < allQuestions.length}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Complete Assessment {ratedCount < allQuestions.length && `(${ratedCount}/${allQuestions.length})`}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="flex-1 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center justify-center gap-2"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {currentQuestionIndex === allQuestions.length - 1 && ratedCount < allQuestions.length && (
            <p className="text-center text-red-500 text-sm mt-4 font-semibold">
              Please rate all questions before completing ({allQuestions.length - ratedCount} remaining)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAssessment;
