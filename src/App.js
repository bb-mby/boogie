import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Save, Users, Award, AlertCircle, CheckCircle, XCircle, Shield } from 'lucide-react';

const CybersecurityAssessment = () => {
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
      title: "1. Communication & Training Skills",
      questions: [
        {
          id: 1,
          title: "Question 1 – Awareness & Didactics",
          description: "How would you explain phishing to a non-technical business employee in maximum 2 minutes?",
          criteria: [
            "Uses simple, relatable analogies (e.g., 'digital fishing')",
            "Focuses on practical examples (fake emails, fake websites)",
            "Shows empathy and adapts to audience level",
            "Provides actionable tips (check sender, hover over links)",
            "Stays within 2 minutes without overwhelming details"
          ],
          redFlag: "Technical jargon, condescending tone, or unable to simplify complex concepts",
          goodAnswer: "Phishing is a fraud attempt via email or message, where someone pretends to be a trustworthy entity, such as a bank or colleague. The goal is to get the recipient to click a link, enter data, or open an attachment. The most important protection is: be suspicious, check the sender, and don't click or enter sensitive data."
        },
        {
          id: 2,
          title: "Question 2 – Practical Awareness",
          description: "What are the three most common security mistakes employees make – and how would you reduce them?",
          criteria: [
            "Names realistic, common mistakes (weak passwords, clicking links, public WiFi)",
            "Provides concrete, actionable solutions",
            "Understands human behavior and psychology",
            "Suggests measurable interventions (training, technical controls)",
            "Balances education with technical safeguards"
          ],
          redFlag: "Only theoretical answers, blames users, or no practical solutions",
          goodAnswer: "First: Blindly trusting emails. Second: Using passwords multiple times or making them too simple. Third: Ignoring security warnings. These mistakes can be reduced through regular training, simple rules, and clear examples."
        },
        {
          id: 10,
          title: "Question 10 – Reality Check",
          description: "What do you think is often done wrong in awareness trainings – and how would you do it better?",
          criteria: [
            "Shows critical thinking about common training failures",
            "Identifies real problems (too boring, too technical, no follow-up)",
            "Proposes concrete improvements (gamification, phishing simulations)",
            "Understands the difference between compliance and real behavior change",
            "Demonstrates quality awareness and differentiation"
          ],
          redFlag: "Defends bad practices, no self-reflection, or generic answers",
          goodAnswer: "They are often too theoretical or too infrequent. Better are short, practical sessions with real examples from daily work life. Focus on behavior change, not just checkbox compliance."
        }
      ]
    },
    {
      title: "2. Technical Fundamentals",
      questions: [
        {
          id: 3,
          title: "Question 3 – Technical Foundation",
          description: "Explain the difference between a Vulnerability Scan and a Penetration Test – and when to use each.",
          criteria: [
            "Clearly differentiates: Vuln Scan = automated, broad; Pentest = manual, deep",
            "Explains when to use what (compliance vs. real security validation)",
            "Understands limitations of each approach",
            "Shows professional terminology and methodology awareness",
            "Mentions practical tools or frameworks (Nessus, OWASP, etc.)"
          ],
          redFlag: "Confuses the two, purely theoretical, or no practical application knowledge",
          goodAnswer: "A vulnerability scan automatically searches for known vulnerabilities. A penetration test goes further and checks whether these vulnerabilities can actually be exploited. Scans are regular, pentests are targeted and more in-depth."
        },
        {
          id: 4,
          title: "Question 4 – Attack & Defense",
          description: "Name a typical attack vector in corporate networks and how you would analyze it technically.",
          criteria: [
            "Names realistic attack vector (phishing, unpatched systems, weak credentials)",
            "Describes technical analysis methodology",
            "Mentions tools and techniques (log analysis, traffic inspection)",
            "Shows systematic thinking (recon → exploit → post-exploit)",
            "Understands both offensive and defensive perspectives"
          ],
          redFlag: "Only theoretical knowledge, no methodology, or unrealistic scenarios",
          goodAnswer: "A common attack vector is an unpatched server. I would check which services are running, whether known vulnerabilities exist, and whether they are accessible from outside."
        },
        {
          id: 5,
          title: "Question 5 – Attacker Mindset",
          description: "If you had to attack a small company: Where would you start – and why?",
          criteria: [
            "Demonstrates hacker mindset and prioritization",
            "Starts with reconnaissance (OSINT, external footprint)",
            "Identifies realistic entry points (email, public services, human factor)",
            "Shows strategic thinking about weakest link",
            "Balances technical and social engineering approaches"
          ],
          redFlag: "Jumps to complex attacks, no methodology, or unrealistic approach",
          goodAnswer: "Usually at email access or publicly accessible systems, because they are often poorly secured. The goal is always the easiest path with the greatest effect."
        }
      ]
    },
    {
      title: "3. Professional Ethics & Client Management",
      questions: [
        {
          id: 6,
          title: "Question 6 – Responsibility & Ethics",
          description: "How do you handle discovering a critical vulnerability that nobody else knows about?",
          criteria: [
            "Shows mature, responsible approach",
            "Mentions immediate reporting to stakeholders",
            "Understands responsible disclosure principles",
            "Considers compliance and legal implications (NDA, data protection)",
            "Demonstrates professionalism and trustworthiness"
          ],
          redFlag: "Suggests publicizing immediately, cavalier attitude, or unethical approach",
          isKO: true,
          goodAnswer: "I document it cleanly, inform the responsible parties, and give clear recommendations for resolution. I do not use the information for my own purposes."
        },
        {
          id: 7,
          title: "Question 7 – Client Communication",
          description: "A client doesn't understand your security recommendation and thinks it's excessive. What do you do?",
          criteria: [
            "Shows consulting competence and patience",
            "Uses business language (risk, cost, impact) not technical jargon",
            "Provides real-world examples or analogies",
            "Demonstrates conflict resolution and persuasion skills",
            "Respects client perspective while educating"
          ],
          redFlag: "Gets defensive, insists without explaining, or gives up easily",
          isKO: true,
          goodAnswer: "I explain the risk understandably, preferably with examples. If the client still decides against it, I document that and respect their decision."
        }
      ]
    },
    {
      title: "4. Learning & Role Flexibility",
      questions: [
        {
          id: 8,
          title: "Question 8 – Learning & Development",
          description: "How do you keep your IT security knowledge current? Name concrete sources or methods.",
          criteria: [
            "Names specific, credible sources (blogs, podcasts, CVE feeds, Twitter/X)",
            "Shows intrinsic motivation and continuous learning",
            "Mentions practical learning (CTFs, labs, home lab)",
            "Demonstrates community involvement (conferences, forums)",
            "Balances breadth and depth in learning approach"
          ],
          redFlag: "Vague answers, no concrete sources, or only certificates without practical learning",
          goodAnswer: "I read tech blogs, use online training, follow security bulletins, and also try things out practically. Continuous learning is part of the job."
        },
        {
          id: 9,
          title: "Question 9 – Role Flexibility",
          description: "How would you switch your work focus between Awareness Trainer and Technical Pentester?",
          criteria: [
            "Shows understanding of both roles and their differences",
            "Demonstrates flexibility and context switching ability",
            "Explains mindset shift (teaching vs. breaking)",
            "Mentions time management or planning strategies",
            "Shows genuine interest in both aspects"
          ],
          redFlag: "Prefers only one role strongly, can't articulate differences, or shows inflexibility",
          goodAnswer: "Awareness requires communication, pentests require focus. I can separate both and see technical work as a good foundation for realistic training scenarios."
        }
      ]
    }
  ];

  const allQuestions = categories.flatMap(cat => cat.questions);

  useEffect(() => {
    const stored = localStorage.getItem('cybersecurityAssessments');
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
        reasoning: "Critical ethics or communication issues. Questions 6 and 7 are non-negotiable for client-facing security roles. Candidate shows insufficient professional maturity or client management skills."
      };
    }
    
    if (percentage >= 85) {
      return {
        decision: "STRONG HIRE",
        color: "green",
        icon: CheckCircle,
        reasoning: "Exceptional candidate with strong technical foundation, excellent communication skills, and professional ethics. Shows both hacker mindset and client-facing maturity. Ready for immediate deployment in dual-role capacity."
      };
    }
    
    if (percentage >= 75) {
      return {
        decision: "HIRE",
        color: "green",
        icon: CheckCircle,
        reasoning: "Solid candidate with good balance between technical and soft skills. Demonstrates potential for both awareness training and technical security work. May need some mentoring in weaker areas."
      };
    }
    
    if (percentage >= 65) {
      return {
        decision: "MAYBE",
        color: "yellow",
        icon: AlertCircle,
        reasoning: "Average candidate with some strengths but notable gaps. Consider for specialized role (either pure technical or pure training) rather than dual role. Extended trial period recommended."
      };
    }
    
    return {
      decision: "NO HIRE",
      color: "red",
      icon: XCircle,
      reasoning: "Insufficient competency for the hybrid security role. Candidate lacks either technical depth, communication skills, or professional awareness needed for MSP security consultant position."
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
    localStorage.setItem('cybersecurityAssessments', JSON.stringify(updated));
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
                All Cybersecurity Assessments
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
              <Shield className="w-8 h-8" />
              Cybersecurity Assessment: {candidateName}
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
                  Ethics & Communication questions (Questions 6-7) scored less than 3 points. These are non-negotiable for client-facing security roles.
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Cybersecurity Consultant<br/>Interview Assessment
          </h1>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Candidate Name
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="e.g. John Doe"
              autoFocus
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={() => candidateName.trim() && setCurrentStep('questions')}
              disabled={!candidateName.trim()}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold transition-colors"
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

          <div className="mt-8 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
            <p className="text-sm text-gray-700">
              <strong>10 Questions</strong> in 4 categories<br/>
              Maximum score: <strong>50 points</strong><br/>
              <span className="text-red-700 font-semibold">⚠️ KO criteria: Ethics & Communication (Q6-7)</span>
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
                  <Shield className="w-6 h-6 text-red-600" />
                  {candidateName}
                </h2>
                <p className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {allQuestions.length} • {ratedCount}/{allQuestions.length} rated
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-red-600">
                  {Object.values(ratings).reduce((sum, r) => sum + r, 0)}
                </div>
                <div className="text-sm text-gray-500">Points</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / allQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-6 p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold text-red-900">{currentCategory.title}</h3>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
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
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
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

export default CybersecurityAssessment;
