import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Save, Users, AlertCircle, CheckCircle, XCircle, Shield, Instagram, ShoppingCart, Server } from 'lucide-react';

const MultiJobAssessment = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentStep, setCurrentStep] = useState('job-selection');
  const [candidateName, setCandidateName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [ratings, setRatings] = useState({});
  const [notes, setNotes] = useState({});
  const [allCandidates, setAllCandidates] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const jobTypes = {
    fieldservice: {
      name: "Dynamics 365 Field Service",
      icon: Server,
      color: "blue",
      storageKey: "fieldServiceAssessments",
      questions: [
        {
          id: 1,
          title: "Q1 – Understanding the Goal",
          description: "Do you understand this is an MSP product, not a single project?",
          criteria: [
            "Understands MSP (managed service) vs. one-off project",
            "Focuses on standardization over individualization",
            "Mentions templates, reusability, scalability",
            "Goal is creating Field Service blueprints",
            "Thinks about enablement and documentation"
          ],
          redFlag: "Focuses only on technology or treats it as a 'customer project'",
          goodAnswer: "Yes, I understand this is an MSP product where we create standardized Field Service solutions that multiple clients can use. The focus is on building reusable templates and processes, not custom solutions for each client. We need comprehensive documentation and enablement materials so clients can self-serve and scale."
        },
        {
          id: 2,
          title: "Q2 – Process Understanding",
          description: "Can you describe a typical Field Service process from dispatch to completion?",
          criteria: [
            "Mentions work order creation and scheduling",
            "Explains technician dispatch and routing",
            "Describes on-site service execution",
            "Includes completion, documentation, and invoicing",
            "Shows understanding of end-to-end workflow"
          ],
          redFlag: "Vague or missing critical steps in the process",
          goodAnswer: "A typical process: 1) Work order is created (manual or automatic from IoT alert). 2) Scheduler assigns technician based on skills, location, and availability. 3) Technician receives mobile notification with customer details and service history. 4) Technician travels to site (optimized routing). 5) Performs service and documents work with photos/notes. 6) Customer signs off digitally. 7) Work order closes and triggers invoicing. Everything syncs in real-time."
        },
        {
          id: 3,
          title: "Q3 – Documentation Approach",
          description: "How do you ensure your Field Service solution is well-documented for MSP clients?",
          criteria: [
            "Creates clear, step-by-step documentation",
            "Uses screenshots and visual guides",
            "Documents both admin and end-user processes",
            "Includes troubleshooting and FAQs",
            "Thinks about different audience levels"
          ],
          redFlag: "No documentation strategy or 'I'll explain it verbally'",
          isKO: true,
          goodAnswer: "I create layered documentation: 1) Admin guides for setup and configuration with screenshots. 2) End-user guides for dispatchers and technicians with simple workflows. 3) Video tutorials for common tasks. 4) FAQ section for troubleshooting. 5) Configuration reference with all settings explained. I use clear language, avoid jargon, and test documentation with real users before delivery."
        },
        {
          id: 4,
          title: "Q4 – Technical Depth: Work Orders",
          description: "What are the key components of a work order in Dynamics 365 Field Service?",
          criteria: [
            "Mentions work order type and service account",
            "Includes tasks, products, and services",
            "Discusses booking and scheduling",
            "Knows about work order lifecycle and statuses",
            "Understands relationship with assets and agreements"
          ],
          redFlag: "Surface-level knowledge or can't explain technical details",
          goodAnswer: "Key components: 1) Service Account (customer). 2) Work Order Type (defines workflow). 3) Primary Incident (issue description). 4) Tasks (checklist of work to perform). 5) Products and Services (parts and labor). 6) Bookable Resource Booking (assigned technician and time slot). 7) Work Order Status (lifecycle stages). 8) Customer Asset (equipment being serviced). Work orders can link to agreements for recurring maintenance."
        },
        {
          id: 5,
          title: "Q5 – Consulting Approach",
          description: "A client wants heavy customization. How do you handle this in an MSP model?",
          criteria: [
            "Explains MSP constraints clearly and early",
            "Offers alternative solutions within standard",
            "Knows when to say 'no' professionally",
            "Suggests workarounds or configuration options",
            "Focuses on client's actual business need"
          ],
          redFlag: "Agrees to everything or gets defensive",
          isKO: true,
          goodAnswer: "I'd first understand the business need behind the request. Often custom requests come from not knowing the standard features. I'd explain: 'In our MSP model, we maintain a standardized solution to ensure quality, security, and quick deployment for all clients. However, let's explore if we can meet your need through configuration, PowerApps, or our existing features.' If it's truly unique, I'd assess if it benefits all clients (then we add it) or suggest a separate custom project outside the MSP scope."
        }
      ]
    },
    cybersecurity: {
      name: "Cybersecurity Consultant",
      icon: Shield,
      color: "red",
      storageKey: "cybersecurityAssessments",
      questions: [
        {
          id: 1,
          title: "Q1 – Awareness & Didactics",
          description: "How would you explain phishing to a non-technical business employee in maximum 2 minutes?",
          criteria: [
            "Uses simple, relatable analogies",
            "Focuses on practical examples",
            "Shows empathy and adapts to audience",
            "Provides actionable tips",
            "Stays within 2 minutes without overwhelming"
          ],
          redFlag: "Technical jargon, condescending tone, or unable to simplify",
          goodAnswer: "Phishing is like digital fishing - criminals cast a wide net hoping someone bites. You get an email that looks like it's from your bank, IT department, or a colleague, asking you to click a link or enter your password. Red flags: urgency ('Your account will be locked!'), suspicious sender email, generic greetings ('Dear Customer'), and links that don't match the real website. Always hover over links before clicking, verify sender directly if unsure, and never enter passwords from email links."
        },
        {
          id: 2,
          title: "Q2 – Practical Awareness",
          description: "What are the three most common security mistakes employees make – and how would you reduce them?",
          criteria: [
            "Names concrete, realistic mistakes",
            "Explains business impact clearly",
            "Proposes practical, achievable solutions",
            "Focuses on behavior change, not just rules",
            "Shows understanding of human psychology"
          ],
          redFlag: "Blames users or proposes unrealistic/complex solutions",
          goodAnswer: "1) Weak/reused passwords - Solution: Implement password manager company-wide with training. 2) Clicking phishing links - Solution: Monthly simulated phishing tests with immediate education (not punishment). 3) Using unsecured personal devices - Solution: Provide clear BYOD policy and easy VPN access. Key is making security convenient - if it's too hard, people find workarounds that are less secure."
        },
        {
          id: 3,
          title: "Q3 – Risk Assessment",
          description: "How do you prioritize which security measures to implement first in a small business?",
          criteria: [
            "Starts with risk assessment methodology",
            "Considers business impact and likelihood",
            "Focuses on quick wins and critical gaps",
            "Mentions cost-benefit thinking",
            "Proposes realistic roadmap"
          ],
          redFlag: "Generic checklist without prioritization logic",
          goodAnswer: "I start with a quick risk assessment: 1) Identify critical assets (customer data, financial systems). 2) Assess current vulnerabilities (no MFA, outdated software, weak backups). 3) Prioritize by risk = likelihood × impact. Quick wins first: MFA on all accounts (low cost, high impact), automated backups (critical), endpoint protection (basic hygiene). Then layer in: security awareness training, patch management, email filtering. Create 90-day roadmap with clear milestones."
        },
        {
          id: 4,
          title: "Q4 – Incident Response",
          description: "An employee reports their email account is sending spam. What are your first three steps?",
          criteria: [
            "Stays calm and acts quickly",
            "Immediately contains the threat",
            "Gathers information systematically",
            "Communicates clearly with stakeholders",
            "Documents the incident"
          ],
          redFlag: "Panics, blames user, or doesn't contain threat quickly",
          goodAnswer: "Immediate: 1) Disable the compromised account to stop spam (contain threat). 2) Force password reset and enable MFA. 3) Check email rules for auto-forwarding or deletion rules attackers often add. Then investigate: Review sent items, check login locations, scan for malware. Communicate: Notify IT team and affected contacts. Document everything for post-incident review. Finally, check if other accounts show similar indicators of compromise."
        },
        {
          id: 5,
          title: "Q5 – Ethics & Client Management",
          description: "A client asks you to help them monitor employee emails without telling staff. How do you respond?",
          criteria: [
            "Addresses legal and ethical implications immediately",
            "Explains potential consequences clearly",
            "Offers legitimate alternatives",
            "Maintains professional relationship",
            "Shows clear ethical boundaries"
          ],
          redFlag: "Agrees without question or judges client harshly",
          isKO: true,
          goodAnswer: "I'd explain that monitoring without consent has serious legal implications in most countries (GDPR, labor laws) and could result in lawsuits. Ethically, it damages trust and morale. I'd ask what problem they're trying to solve - often it's productivity or data leakage concerns. Legitimate alternatives: transparent monitoring policy with employee acknowledgment, DLP (data loss prevention) tools that don't read content, or productivity tools employees agree to. I can't help with covert monitoring, but I can help solve the underlying business problem legally."
        }
      ]
    },
    socialmedia: {
      name: "Social Media Manager",
      icon: Instagram,
      color: "pink",
      storageKey: "socialMediaAssessments",
      questions: [
        {
          id: 1,
          title: "Q1 – Platform Understanding",
          description: "Which social media platforms do you work with, and how do they differ?",
          criteria: [
            "Names 3+ major platforms confidently",
            "Explains key differences in audience and content",
            "Shows practical platform-specific knowledge",
            "Understands algorithms and best practices",
            "Can match platform to business goals"
          ],
          redFlag: "Only knows one platform or gives generic answers",
          goodAnswer: "I work mainly with Instagram, TikTok, and LinkedIn. Instagram is visual storytelling for 18-34 year olds, great for brand building with photos, Reels, and Stories. TikTok is short-form video focused on trends and virality, skews younger (16-30). LinkedIn is B2B professional content, longer posts and articles work well. Each has unique algorithms: Instagram rewards engagement time and shares, TikTok prioritizes completion rate, LinkedIn values meaningful discussions. I choose platform based on target audience and content type."
        },
        {
          id: 2,
          title: "Q2 – Goal-Driven Content",
          description: "How do you decide what kind of content to post for a brand?",
          criteria: [
            "Starts with business goals and audience",
            "Considers brand identity and values",
            "Uses data from past performance",
            "Balances trending and evergreen content",
            "Mentions content pillars or strategy"
          ],
          redFlag: "Just posts trending content with no strategy",
          goodAnswer: "I start with: 1) Business goals - awareness, sales, or community? 2) Target audience - what do they care about, when are they online? 3) Brand values - what should we stand for? Then I create content pillars (e.g., educational, entertaining, promotional in 60/30/10 ratio). I analyze past posts to see what resonated, monitor competitors, and stay flexible for trends. Every post should tie back to a goal and serve the audience."
        },
        {
          id: 3,
          title: "Q3 – Content Planning",
          description: "How do you plan content for one month?",
          criteria: [
            "Uses a content calendar or planning tool",
            "Plans ahead but stays flexible",
            "Considers posting frequency and timing",
            "Balances content types and formats",
            "Includes campaigns, holidays, and events"
          ],
          redFlag: "Posts randomly or 'whenever I have time'",
          goodAnswer: "I use Later or Planoly for visual planning. Start of month: Map key dates (holidays, product launches, campaigns). Create a content mix: 60% educational, 30% engaging/entertaining, 10% promotional. Plan 3-4 posts per week per platform with optimal posting times based on analytics. I batch-create content but leave 20% buffer for real-time trending content. Weekly reviews to adjust based on performance. Always have 1 week of content ready as backup."
        },
        {
          id: 4,
          title: "Q4 – Engagement & Community",
          description: "What do you do to increase engagement (likes, comments, shares)?",
          criteria: [
            "Creates interactive content (polls, questions)",
            "Responds to comments quickly",
            "Uses strong CTAs",
            "Posts at optimal times",
            "Builds community through interaction"
          ],
          redFlag: "Only focuses on posting, doesn't engage back",
          goodAnswer: "I create conversation starters: polls, 'this or that' posts, open questions. Use CTAs like 'Tag someone who needs this' or 'Save for later'. I respond to every comment within 2 hours to boost algorithm visibility. Post at peak times when audience is most active (check insights). I also engage with followers' content, not just wait for them to engage with ours. DM responses are quick and personal. Engagement is 50% posting, 50% active community management."
        },
        {
          id: 5,
          title: "Q5 – Crisis Management",
          description: "How do you handle negative comments or a social media crisis?",
          criteria: [
            "Stays calm and professional",
            "Responds quickly but thoughtfully",
            "Takes serious issues to DMs",
            "Knows when to escalate",
            "Learns from criticism"
          ],
          redFlag: "Deletes all negative comments or gets defensive",
          isKO: true,
          goodAnswer: "I stay calm and respond within 1 hour. For constructive criticism, I acknowledge publicly and offer solution. For serious complaints, I respond with empathy and move to DMs to resolve privately. I never delete comments unless spam/abusive. I don't argue or get defensive. For crises (viral negativity, PR issue), I immediately notify management and follow crisis protocol: pause scheduled posts, craft official statement, monitor sentiment. After resolution, I do post-mortem to learn and prevent future issues."
        }
      ]
    },
    shopify: {
      name: "Shopify / E-commerce Specialist",
      icon: ShoppingCart,
      color: "green",
      storageKey: "shopifyAssessments",
      questions: [
        {
          id: 1,
          title: "Q1 – Shopify Basics",
          description: "Can you explain what Shopify is and when you would recommend it to a client?",
          criteria: [
            "Explains Shopify as hosted e-commerce platform",
            "Mentions ease of use and no coding required",
            "Understands pricing tiers",
            "Knows when Shopify fits vs. alternatives",
            "Can articulate business benefits"
          ],
          redFlag: "Doesn't understand SaaS model or thinks it's only for small shops",
          goodAnswer: "Shopify is a cloud-based e-commerce platform - you get hosting, payments, inventory, and store management in one place. I recommend it when clients want to launch quickly (days not months), need reliable hosting, and want access to 8,000+ apps for features. Perfect for small to medium businesses and scales to enterprise (Shopify Plus). I wouldn't recommend it if client needs very specific custom backend functionality that Shopify's API can't handle, or if they have complex B2B requirements. Key benefit: focus on selling, not managing servers."
        },
        {
          id: 2,
          title: "Q2 – Store Setup Experience",
          description: "Have you set up a Shopify store from scratch? What were the main steps?",
          criteria: [
            "Names key setup steps in logical order",
            "Includes theme and product setup",
            "Mentions payment and shipping configuration",
            "Addresses legal requirements",
            "Shows hands-on experience"
          ],
          redFlag: "No practical experience or misses critical steps",
          goodAnswer: "Yes, multiple times. Steps: 1) Choose plan and connect domain. 2) Select theme (I usually start with Dawn or Debut). 3) Customize branding (logo, colors, fonts). 4) Add products with SEO-optimized titles, descriptions, high-quality images. 5) Set up payment gateway (Shopify Payments or PayPal). 6) Configure shipping zones and rates. 7) Add legal pages (privacy, terms, refunds). 8) Test entire checkout flow. 9) Set up Google Analytics. 10) Launch and monitor. Takes 2-3 days for basic store, 1-2 weeks for complex setup."
        },
        {
          id: 3,
          title: "Q3 – Theme & Design",
          description: "How do you customize a Shopify theme without breaking the store?",
          criteria: [
            "Always duplicates theme before changes",
            "Uses theme customizer for safe changes",
            "Knows when to use code vs. visual editor",
            "Tests in preview mode",
            "Understands basic Liquid"
          ],
          redFlag: "Edits live theme directly or doesn't understand risks",
          goodAnswer: "Safety first: 1) Duplicate the live theme before any changes. 2) Make changes in the duplicate, preview thoroughly. 3) Use theme customizer for colors, fonts, sections - it's safe and reversible. 4) For code changes, I edit in theme code editor (know basic Liquid for product pages). 5) Test on mobile and desktop, test entire checkout flow. 6) Once confirmed working, publish the new theme. 7) Keep the old theme as backup. Never delete original theme files, only modify copies."
        },
        {
          id: 4,
          title: "Q4 – Performance & Speed",
          description: "What do you do if a Shopify store becomes slow?",
          criteria: [
            "Runs speed diagnostics first",
            "Checks image optimization",
            "Reviews app bloat",
            "Considers theme performance",
            "Understands conversion impact"
          ],
          redFlag: "Doesn't know how to diagnose or doesn't prioritize speed",
          goodAnswer: "Speed kills conversions - 1 second delay = 7% fewer sales. My process: 1) Run Google PageSpeed Insights and Shopify's speed report. 2) Compress all images (use TinyPNG or Shopify's optimizer, aim for under 200KB). 3) Audit apps - remove unused ones, each adds scripts. 4) Check for heavy custom code or third-party scripts. 5) Consider switching to a faster theme if current one is bloated. 6) Use lazy loading for images. 7) Minimize font files. Target: under 3 seconds load time on mobile."
        },
        {
          id: 5,
          title: "Q5 – Problem Solving",
          description: "A client says: 'My sales dropped suddenly.' How do you start analyzing?",
          criteria: [
            "Stays calm and asks clarifying questions",
            "Checks analytics systematically",
            "Reviews recent changes",
            "Considers external factors",
            "Provides structured troubleshooting"
          ],
          redFlag: "Panics or guesses without data",
          isKO: true,
          goodAnswer: "I stay calm and gather data first. Check Shopify Analytics: 1) Did traffic drop or just conversion rate? If traffic dropped: Check Google Ads/Facebook Ads status, organic rankings, was there a recent SEO penalty? 2) If traffic is same but conversions dropped: Check for recent theme changes, payment gateway issues, broken checkout, shipping cost increases. 3) Review: Any out-of-stock bestsellers? Price changes? Negative reviews? 4) External factors: Seasonality (compare to last year), competitor campaigns? I work through systematically, test fixes one at a time, monitor results."
        }
      ]
    }
  };

  useEffect(() => {
    if (selectedJob) {
      const stored = localStorage.getItem(jobTypes[selectedJob].storageKey);
      if (stored) {
        setAllCandidates(JSON.parse(stored));
      }
    }
  }, [selectedJob]);

  const getRecommendation = (totalScore, maxScore, koScores, jobType) => {
    const percentage = (totalScore / maxScore) * 100;
    const hasKOFailure = koScores.some(score => score < 3);
    
    if (hasKOFailure) {
      return {
        decision: "NO HIRE",
        color: "red",
        icon: XCircle,
        reasoning: `Critical failure in essential competencies. KO criteria not met - candidate shows insufficient professionalism or skills required for ${jobTypes[jobType].name} role.`
      };
    }
    
    if (percentage >= 85) {
      return {
        decision: "STRONG HIRE",
        color: "green",
        icon: CheckCircle,
        reasoning: "Exceptional candidate with comprehensive understanding and hands-on experience. Ready for immediate deployment with minimal supervision."
      };
    }
    
    if (percentage >= 75) {
      return {
        decision: "HIRE",
        color: "green",
        icon: CheckCircle,
        reasoning: "Solid candidate with good fundamentals and practical knowledge. Will succeed with proper onboarding and clear expectations."
      };
    }
    
    if (percentage >= 65) {
      return {
        decision: "MAYBE",
        color: "yellow",
        icon: AlertCircle,
        reasoning: "Entry to mid-level candidate with gaps in key areas. Consider for junior role or with extended training and mentorship plan."
      };
    }
    
    return {
      decision: "NO HIRE",
      color: "red",
      icon: XCircle,
      reasoning: `Insufficient competency for ${jobTypes[jobType].name} position. Candidate lacks fundamental knowledge or practical experience needed for the role.`
    };
  };

  const saveAssessment = () => {
    const questions = jobTypes[selectedJob].questions;
    const totalScore = Object.values(ratings).reduce((sum, r) => sum + r, 0);
    const maxScore = questions.length * 5;
    const percentage = (totalScore / maxScore * 100).toFixed(1);
    
    const koQuestions = questions.filter(q => q.isKO);
    const koScores = koQuestions.map(q => ratings[q.id] || 0);
    const recommendation = getRecommendation(totalScore, maxScore, koScores, selectedJob);

    const assessment = {
      name: candidateName,
      jobType: selectedJob,
      jobName: jobTypes[selectedJob].name,
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
    localStorage.setItem(jobTypes[selectedJob].storageKey, JSON.stringify(updated));
    setShowResults(true);
  };

  const resetAssessment = () => {
    setCandidateName('');
    setCurrentStep('job-selection');
    setSelectedJob(null);
    setCurrentQuestionIndex(0);
    setRatings({});
    setNotes({});
    setShowResults(false);
    setShowHistory(false);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-600', border: 'border-blue-500', light: 'bg-blue-50', gradient: 'from-blue-50 to-indigo-100' },
      red: { bg: 'bg-red-600', hover: 'hover:bg-red-700', text: 'text-red-600', border: 'border-red-500', light: 'bg-red-50', gradient: 'from-red-50 to-orange-100' },
      pink: { bg: 'bg-pink-600', hover: 'hover:bg-pink-700', text: 'text-pink-600', border: 'border-pink-500', light: 'bg-pink-50', gradient: 'from-pink-50 to-purple-100' },
      green: { bg: 'bg-green-600', hover: 'hover:bg-green-700', text: 'text-green-600', border: 'border-green-500', light: 'bg-green-50', gradient: 'from-green-50 to-emerald-100' }
    };
    return colors[color];
  };

  const getRatingColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 65) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (currentStep === 'job-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-4xl w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
            Interview Assessment System
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Select the position you are interviewing for
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {Object.entries(jobTypes).map(([key, job]) => {
              const Icon = job.icon;
              const colors = getColorClasses(job.color);
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedJob(key);
                    setCurrentStep('name');
                  }}
                  className={`p-6 md:p-8 border-2 rounded-xl hover:shadow-lg transition-all ${colors.border} hover:scale-105`}
                >
                  <Icon className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 ${colors.text}`} />
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                    {job.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Top 5 Questions • {job.questions.length * 5} Max Points
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-700">
              <strong>Lite Multi-Job System</strong> • Quick screening with the most important questions per role<br/>
              Each position has 5 carefully selected questions (25 points max)
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedJob) return null;

  const currentJobData = jobTypes[selectedJob];
  const colors = getColorClasses(currentJobData.color);
  const Icon = currentJobData.icon;
  const questions = currentJobData.questions;
  const currentQuestion = questions[currentQuestionIndex];

  if (showHistory) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Users className="w-6 h-6 md:w-8 md:h-8" />
                {currentJobData.name} Assessments
              </h1>
              <button
                onClick={() => {
                  setShowHistory(false);
                  setCurrentStep('job-selection');
                  setSelectedJob(null);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Back
              </button>
            </div>

            {allCandidates.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No assessments yet for this position</p>
            ) : (
              <div className="space-y-4">
                {allCandidates.sort((a, b) => new Date(b.date) - new Date(a.date)).map((candidate, index) => {
                  const DecisionIcon = candidate.recommendation.icon;
                  const decisionColor = candidate.recommendation.color;
                  
                  return (
                    <div key={index} className="border rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
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
    const maxScore = questions.length * 5;
    const percentage = (totalScore / maxScore * 100).toFixed(1);
    const koQuestions = questions.filter(q => q.isKO);
    const koScores = koQuestions.map(q => ratings[q.id] || 0);
    const hasKOFailure = koScores.some(score => score < 3);
    const recommendation = getRecommendation(totalScore, maxScore, koScores, selectedJob);
    const DecisionIcon = recommendation.icon;

    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Icon className={`w-6 h-6 md:w-8 md:h-8 ${colors.text}`} />
              {currentJobData.name}: {candidateName}
            </h1>

            <div className={`mb-8 p-6 bg-gradient-to-r ${colors.gradient} rounded-lg`}>
              <div className="text-center">
                <div className={`text-5xl md:text-6xl font-bold mb-2 ${getRatingColor(totalScore, maxScore)}`}>
                  {percentage}%
                </div>
                <div className="text-xl text-gray-700">
                  {totalScore} of {maxScore} points
                </div>
              </div>
            </div>

            <div className={`mb-8 p-6 rounded-lg border-4 ${
              recommendation.color === 'green' ? 'bg-green-50 border-green-500' :
              recommendation.color === 'yellow' ? 'bg-yellow-50 border-yellow-500' :
              'bg-red-50 border-red-500'
            }`}>
              <div className="flex items-start gap-4">
                <DecisionIcon className={`w-10 h-10 md:w-12 md:h-12 flex-shrink-0 ${
                  recommendation.color === 'green' ? 'text-green-600' :
                  recommendation.color === 'yellow' ? 'text-yellow-600' :
                  'text-red-600'
                }`} />
                <div>
                  <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${
                    recommendation.color === 'green' ? 'text-green-800' :
                    recommendation.color === 'yellow' ? 'text-yellow-800' :
                    'text-red-800'
                  }`}>
                    {recommendation.decision}
                  </h2>
                  <p className={`text-base md:text-lg ${
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
                  Essential competency requirements failed. This is non-negotiable for the role.
                </p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className={`${colors.light} p-4 rounded-lg text-center`}>
                <div className={`text-3xl font-bold ${colors.text}`}>{totalScore}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-600">{Object.values(ratings).filter(r => r === 5).length}</div>
                <div className="text-sm text-gray-600">Perfect (5/5)</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-orange-600">{Object.values(ratings).filter(r => r < 3).length}</div>
                <div className="text-sm text-gray-600">Weak (&lt;3)</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {questions.map(q => (
                <div key={q.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
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
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={resetAssessment}
                className={`flex-1 px-6 py-3 ${colors.bg} text-white rounded-lg ${colors.hover} font-semibold`}
              >
                New Interview
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'name') {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${colors.gradient} flex items-center justify-center p-4 md:p-8`}>
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Icon className={`w-12 h-12 md:w-16 md:h-16 ${colors.text}`} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            {currentJobData.name}
          </h1>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Candidate Name
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              placeholder="e.g. John Smith"
              autoFocus
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={() => candidateName.trim() && setCurrentStep('questions')}
              disabled={!candidateName.trim()}
              className={`w-full px-6 py-3 ${colors.bg} text-white rounded-lg ${colors.hover} disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold transition-colors`}
            >
              Start Interview
            </button>
            
            <button
              onClick={() => {
                setSelectedJob(null);
                setCurrentStep('job-selection');
              }}
              className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
            >
              ← Change Position
            </button>
          </div>

          <div className={`mt-8 p-4 ${colors.light} rounded-lg border-l-4 ${colors.border}`}>
            <p className="text-sm text-gray-700">
              <strong>5 Questions</strong><br/>
              Maximum score: <strong>25 points</strong><br/>
              {questions.some(q => q.isKO) && (
                <span className="text-red-700 font-semibold">⚠️ Contains KO criteria questions</span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const ratedCount = Object.keys(ratings).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${colors.text}`} />
                  {candidateName}
                </h2>
                <p className="text-sm text-gray-500">
                  {currentJobData.name} • Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
              <div className="text-right">
                <div className={`text-2xl md:text-3xl font-bold ${colors.text}`}>
                  {Object.values(ratings).reduce((sum, r) => sum + r, 0)}
                </div>
                <div className="text-sm text-gray-500">Points</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${colors.bg} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              {currentQuestion.isKO && (
                <span className="text-red-600 text-2xl">⚠️</span>
              )}
              {currentQuestion.title}
            </h3>
            
            <p className="text-gray-700 mb-4 text-base md:text-lg">
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

            {currentQuestion.goodAnswer && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
                <p className="font-semibold text-blue-900 mb-2">💡 Good Answer Example:</p>
                <p className="text-blue-800 text-sm italic">"{currentQuestion.goodAnswer}"</p>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">
                Rating (0-5 points)
              </label>
              <div className="flex gap-2 justify-center flex-wrap">
                {[0, 1, 2, 3, 4, 5].map(score => (
                  <button
                    key={score}
                    onClick={() => setRatings({...ratings, [currentQuestion.id]: score})}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-lg font-bold text-xl transition-all ${
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent resize-none"
                rows="3"
                placeholder="Candidate's answer or additional remarks..."
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              disabled={currentQuestionIndex === 0}
              className="px-4 md:px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={saveAssessment}
                disabled={ratedCount < questions.length}
                className="flex-1 px-4 md:px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Complete {ratedCount < questions.length && `(${ratedCount}/${questions.length})`}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className={`flex-1 px-4 md:px-6 py-3 ${colors.bg} text-white rounded-lg ${colors.hover} flex items-center justify-center gap-2`}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {currentQuestionIndex === questions.length - 1 && ratedCount < questions.length && (
            <p className="text-center text-red-500 text-sm mt-4 font-semibold">
              Please rate all questions ({questions.length - ratedCount} remaining)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiJobAssessment;
