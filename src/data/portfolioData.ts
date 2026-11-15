import { ProfileData, Project, SkillCategory, ExperienceItem, EducationItem, CertificationItem, GraduateInsight, FinTechRoadmapItem } from '../types/portfolio';

export const initialProfileData: ProfileData = {
  name: "Rishitha Ayyapparaju",
  title: "Computer Science Graduate (AI & Data Science) · Aspiring FinTech & Quantitative Systems Builder",
  roleKicker: "Computer Science Graduate (AI & Data Science) · Aspiring FinTech & Quantitative Systems Builder",
  bio: "Recent Computer Science & Engineering graduate specializing in Artificial Intelligence & Data Science (GPA: 8.76 / 10), currently preparing to pursue a Master's degree in Financial Technology (FinTech). Practical foundations developed through graduate trainee and internship programs at Infosys India, Besant Technologies, Swentic Educo, and Strydo Technologies. Proficient in Python, SQL, Core Java, Power BI, and full-stack development with FastAPI and Next.js. My academic ambition connects quantitative data science, financial market systems, fraud prevention algorithms, and scalable database software.",
  email: "rishitharaju26@gmail.com",
  phone: "+91 9989854679",
  location: "Tirupati, Andhra Pradesh, India",
  githubUrl: "https://github.com/Rishitharaju",
  linkedinUrl: "https://www.linkedin.com/in/rishitha-ayyapparaju-9040b4299/",
  availability: "Preparing for Master's in FinTech · Open to Software Engineer, Data Analyst, & Research Assistant roles",
  targetDegree: "Master of Science in Financial Technology (FinTech) & Computational Finance",
  coreCompetencies: [
    "Analytical Thinking",
    "Problem Solving",
    "Team Collaboration",
    "Integrity & Accountability",
    "Continuous Learning",
    "Commitment to Excellence",
    "Innovative & Adaptable",
    "High Motivation"
  ]
};

export const fintechRoadmapData: FinTechRoadmapItem[] = [
  {
    area: "Quantitative Indicators & Algorithmic Trading",
    focus: "Technical analysis automation, mathematical momentum models (RSI, EMA, MACD, Bollinger Bands), and backtesting logic.",
    foundationBuilt: "Engineered in the Educational Trading Signal Tool project using FastAPI, Next.js, and simulated paper execution."
  },
  {
    area: "Financial Crime & Fraud Risk Detection",
    focus: "Statistical anomaly detection, transaction outlier filtering (z-scores), and risk distribution dashboards.",
    foundationBuilt: "Analyzed transaction datasets in the Fraud Detection Analysis project, achieving a 16% reduction in false-positive alerts."
  },
  {
    area: "High-Volume Financial Data & SQL Query Tuning",
    focus: "Relational database schema optimization, indexing strategies, multi-table joins, and business intelligence reporting.",
    foundationBuilt: "Practiced during graduate training at Infosys and cut reporting turnaround by 40% using Power BI at Besant Technologies."
  },
  {
    area: "Industry Grounding & Generative AI in Finance",
    focus: "Institutional software workflows, financial data streaming libraries (Perspective), and applied Generative AI.",
    foundationBuilt: "Completed the JPMorgan Software Engineering Simulation and Google Introduction to Generative AI credentials."
  }
];

export const impactMetrics = [
  { label: "Academic Standing", value: "8.76 / 10", context: "B.Tech in CSE (AI & Data Science)" },
  { label: "Reporting Turnaround", value: "40% Faster", context: "Power BI KPI dashboards at Besant" },
  { label: "Fraud Alert Precision", value: "-16% Noise", context: "False positive reduction in fraud analysis" },
  { label: "Graduate Study Goal", value: "FinTech M.S.", context: "Preparing for Master's admissions" }
];

export const projectsData: Project[] = [
  {
    id: "trading-signal-tool",
    title: "Educational Trading Signal Tool",
    subtitle: "Full-Stack Trading Signal Platform & Simulated Paper-Trading Engine",
    category: "fullstack-web",
    categoryLabel: "Full-Stack Engineering & Python",
    featured: true,
    year: "Personal Project · Ongoing",
    summary: "A full-stack application developed with FastAPI and Next.js to help students understand quantitative market indicators. Features live technical calculations (RSI, EMA, MACD, Bollinger Bands), a custom confidence-scoring model, and a simulated paper-trading engine.",
    verifiedOutcome: "Multi-indicator confidence scoring model + simulated paper-trading engine in active testing",
    tags: ["FastAPI", "Next.js", "Python", "RSI / MACD / Bollinger", "PostgreSQL", "REST APIs"],
    svgBadgeVariant: "trading",
    caseStudy: {
      overview: "As a student interested in both financial markets and software development, I noticed beginner retail investors often find technical indicators overwhelming. I built this full-stack tool to demonstrate how overlapping signals (momentum, trend, volatility) synthesize into a cohesive decision without risking real capital.",
      motivation: "To learn modern asynchronous web frameworks (FastAPI) and reactive UI (Next.js) by engineering a real-world quantitative dashboard from scratch.",
      implementation: "Built a Python backend that ingests simulated price ticks, computes rolling window mathematical indicators (14-period RSI, 9/21-period EMA crossovers, MACD histogram, and 2σ Bollinger Bands), and exposes clean RESTful endpoints. The Next.js frontend renders multi-timeframe price charts and provides a virtual paper-trading engine.",
      keyLearnings: [
        "Implementing asynchronous API endpoints in FastAPI with Pydantic schema validation",
        "Calculating rolling mathematical statistics (RSI, Exponential Moving Averages) in pure Python and NumPy",
        "Designing stateful client-side paper trading logic where virtual order fills track account balances",
        "Structuring a clean modular codebase separating mathematical indicator logic from presentation layers"
      ],
      metrics: [
        { label: "Key Indicators", value: "RSI, EMA, MACD, BB" },
        { label: "Calculation Response", value: "Real-time async ticks" },
        { label: "Trading Engine", value: "Simulated paper execution" },
        { label: "Frontend Stack", value: "Next.js & Tailwind" }
      ],
      techStack: ["Python", "FastAPI", "Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/Rishitharaju/trading-signal-tool",
      demoType: "trading-signals"
    }
  },
  {
    id: "fraud-detection-analysis",
    title: "Financial Fraud Detection Analysis",
    subtitle: "Statistical Anomaly Modeling & Risk Distribution Dashboards",
    category: "data-analytics",
    categoryLabel: "Data Science & Statistical Modeling",
    featured: true,
    year: "Project Showcase",
    summary: "Conducted exploratory data analysis and statistical modeling on transaction datasets using Python (Pandas, NumPy) and SQL. Isolated fraud patterns to reduce false positives by 16% and designed risk review dashboards.",
    verifiedOutcome: "Reduced false-positive alerts by 16% through statistical z-score outlier filtering",
    tags: ["Python", "SQL", "Pandas", "Statistical Analysis", "Seaborn", "Risk Modeling"],
    svgBadgeVariant: "fraud",
    caseStudy: {
      overview: "In financial institutions, flagging too many legitimate transactions as fraud creates customer dissatisfaction, while missing fraudulent ones causes heavy losses. This project explored statistical data analysis to find an optimal balance between precision and recall.",
      motivation: "Apply statistical modeling, exploratory data analysis, and SQL queries to a realistic business problem and visualize transaction risk distribution clearly.",
      implementation: "Analyzed transaction records using Pandas and NumPy, computed statistical deviations from customer historical spending means, and crafted multi-table SQL queries to isolate high-risk merchant categories. Designed risk tier thresholds that successfully filtered out benign anomalies.",
      keyLearnings: [
        "Feature engineering on transaction velocity and spending deviation ratios",
        "Using z-scores and IQR filtering to differentiate legitimate spikes from true anomalies",
        "Reducing false-positive alert volume by 16% through iterative threshold tuning",
        "Creating informative visualization heatmaps and distributions using Matplotlib and Seaborn"
      ],
      metrics: [
        { label: "False Positive Reduction", value: "16% drop" },
        { label: "Methods Used", value: "Z-Score & SQL Filtering" },
        { label: "Risk Tiers", value: "Low, Moderate, High" },
        { label: "Data Stack", value: "Pandas, NumPy, SQL" }
      ],
      techStack: ["Python", "Pandas", "NumPy", "SQL", "PostgreSQL", "Matplotlib", "Seaborn"],
      githubUrl: "https://github.com/Rishitharaju/fraud-detection-analysis",
      demoType: "fraud-detection"
    }
  },
  {
    id: "customer-behavior-analysis",
    title: "Customer Behavior Analysis",
    subtitle: "SQL Cohort Segmentation & Executive Power BI Dashboards",
    category: "data-analytics",
    categoryLabel: "Business Intelligence & SQL Analytics",
    featured: false,
    year: "Internship & Project",
    summary: "Performed comprehensive exploratory data analysis on transaction datasets, wrote multi-table SQL joins and CTEs to derive customer segmentation insights, and built interactive Power BI dashboards cutting reporting turnaround by 40%.",
    verifiedOutcome: "Reduced reporting turnaround time by 40% with automated Power BI dashboards",
    tags: ["Power BI", "SQL Joins", "Python", "Pandas", "ETL", "Tableau / Excel"],
    svgBadgeVariant: "analytics",
    caseStudy: {
      overview: "During my Data Science internship at Besant Technologies, regular reporting was slowed down by manual spreadsheet compilation. I applied SQL queries and Power BI dashboard design to turn raw sales records into automated, interactive KPI dashboards.",
      motivation: "Eliminate repetitive manual reporting tasks and provide non-technical decision-makers with clear, drillable views into purchasing habits.",
      implementation: "Cleaned and normalized transactional data using Python (Pandas). Formulated SQL scripts featuring multi-table joins, subqueries, and aggregations to compute Recency, Frequency, and Monetary (RFM) cohorts. Built Power BI dashboards equipped with dynamic date slicers and customer health cards.",
      keyLearnings: [
        "Authoring complex SQL queries involving multi-table joins, subqueries, and CTEs",
        "Structuring automated Power BI data models with DAX measures and interactive visualizations",
        "Achieving a 40% reduction in reporting turnaround time through workflow automation",
        "Translating raw data metrics into strategic insights accessible to stakeholders"
      ],
      metrics: [
        { label: "Turnaround Reduction", value: "40% faster" },
        { label: "SQL Technique", value: "Joins, CTEs, Aggregations" },
        { label: "Dashboard Tool", value: "Power BI & Excel" },
        { label: "Data Cleansing", value: "Python (Pandas)" }
      ],
      techStack: ["Power BI", "SQL (PostgreSQL / MySQL)", "Python", "Pandas", "NumPy", "MS Excel"],
      githubUrl: "https://github.com/Rishitharaju/customer-behavior-analysis",
      demoType: "customer-behavior"
    }
  },
  {
    id: "smart-recommendations-online-learning",
    title: "Smart Recommendations for Online Learning",
    subtitle: "B.Tech Final Year Capstone Project (Feb 2025)",
    category: "ai-ml",
    categoryLabel: "Machine Learning & Neural Networks",
    featured: false,
    year: "Final Year Project · Feb 2025",
    summary: "Designed and implemented a personalized book recommendation system for online learning platforms using neural networks and optimized algorithms, outperforming traditional collaborative filtering approaches.",
    verifiedOutcome: "Outperformed traditional recommendation baselines in suggestion accuracy and relevance",
    tags: ["Neural Networks", "Python", "Machine Learning", "FastAPI", "Data Structures", "Scikit-Learn"],
    svgBadgeVariant: "neural",
    caseStudy: {
      overview: "As my final year capstone project for my B.Tech in CSE (AI & Data Science), I addressed the challenge of guiding learners to textbooks and resources that match their prerequisite knowledge and learning goals rather than generic popularity lists.",
      motivation: "Deepen my understanding of neural network embeddings, vector representations, and recommendation algorithms on educational datasets.",
      implementation: "Trained a neural network to learn dual embeddings for student study profiles and educational book metadata. Evaluated accuracy against standard collaborative filtering and integrated the model with a Python backend for fast inference.",
      keyLearnings: [
        "Designing neural network architectures to capture student-content interaction embeddings",
        "Addressing cold-start recommendation challenges when new educational resources are added",
        "Evaluating model performance with precision, recall, and ranking metrics",
        "Completing and presenting a major academic project evaluated by faculty"
      ],
      metrics: [
        { label: "Project Scope", value: "B.Tech Final Year" },
        { label: "Core Model", value: "Neural Network Embeddings" },
        { label: "Advantage", value: "Higher suggestion relevance" },
        { label: "Evaluation", value: "Academic Distinction" }
      ],
      techStack: ["Python", "TensorFlow / PyTorch", "Pandas", "NumPy", "FastAPI", "Scikit-Learn"],
      githubUrl: "https://github.com/Rishitharaju/smart-recommendations",
      demoType: "smart-recommendation"
    }
  }
];

export const skillCategories: SkillCategory[] = [
  {
    name: "AI, ML & Data Science",
    description: "Core AI, Machine Learning, and Data Science languages, statistical modeling libraries, and neural network frameworks applied across academic and internship projects.",
    skills: [
      { name: "Python (AI / ML & Data Science)", proficiency: "Proficient", summary: "Primary language for Machine Learning, Exploratory Data Analysis (EDA), feature engineering, z-score anomaly detection, automation scripts, and FastAPI model serving." },
      { name: "SQL (Data Extraction & Analytics)", proficiency: "Proficient", summary: "Multi-table joins, CTEs, subqueries, and cohort aggregations used to extract, clean, and prepare structured datasets for fraud modeling and BI pipelines." },
      { name: "Machine Learning & Scikit-Learn", proficiency: "Working Knowledge", summary: "Supervised and unsupervised modeling workflows, feature engineering, precision/recall evaluation, and recommendation system baselines." },
      { name: "Neural Networks (TensorFlow / PyTorch)", proficiency: "Working Knowledge", summary: "Designed dual-embedding neural network architectures for the B.Tech final year Smart Recommendations for Online Learning capstone project." },
      { name: "Pandas, NumPy & Statistical Analysis", proficiency: "Proficient", summary: "Vectorized data preprocessing, missing-value handling, z-score and IQR outlier filtering (16% false-positive drop), and rolling quantitative indicators." },
      { name: "Generative AI Fundamentals", proficiency: "Academic Foundation", summary: "Foundational Large Language Model (LLM) concepts, prompt design, and responsible AI principles gained through Google Cloud training." }
    ]
  },
  {
    name: "Core Programming & CS",
    description: "Core programming languages, object-oriented design, and algorithmic problem-solving foundations.",
    skills: [
      { name: "Python (Core & OOP)", proficiency: "Proficient", summary: "Clean modular architecture, object-oriented programming, workflow automation at Strydo Technologies, and full-stack Python development at Swentic Educo." },
      { name: "Core Java", proficiency: "Working Knowledge", summary: "OOP principles, Collections Framework, Exception Handling, and JDBC learned during Infosys graduate training." },
      { name: "Data Structures & Algorithms", proficiency: "Working Knowledge", summary: "Arrays, Linked Lists, Stacks, Queues, Trees, Hash Maps, sorting, searching, and ranking algorithm optimization." },
      { name: "HTML, CSS, JavaScript & TypeScript", proficiency: "Working Knowledge", summary: "Responsive UI development, DOM manipulation, and TypeScript/Next.js frontend integration for interactive data applications." }
    ]
  },
  {
    name: "BI, Visualization & Databases",
    description: "Exploratory data visualization, business intelligence dashboards, and relational database tuning.",
    skills: [
      { name: "Power BI (DAX & KPI Dashboards)", proficiency: "Proficient", summary: "DAX calculations, interactive KPI cards, and automated reporting pipelines that cut turnaround time by 40% at Besant Technologies." },
      { name: "Matplotlib & Seaborn", proficiency: "Working Knowledge", summary: "Distribution histograms, risk correlation heatmaps, and statistical visual storytelling for financial fraud detection." },
      { name: "Tableau & MS Excel", proficiency: "Working Knowledge", summary: "Pivot tables, summary statistics, cohort charts, and stakeholder-ready operational reports." },
      { name: "MySQL & PostgreSQL", proficiency: "Working Knowledge", summary: "Relational schema design, foreign keys, indexing, query execution tuning, and transactional data integrity." }
    ]
  },
  {
    name: "Cloud, APIs & Engineering Tools",
    description: "Full-stack web frameworks, enterprise cloud exposure, and collaborative software engineering workflows.",
    skills: [
      { name: "FastAPI & RESTful APIs", proficiency: "Working Knowledge", summary: "Asynchronous Python backend endpoints, Pydantic validation, JSON payloads, and ML/quantitative signal serving." },
      { name: "Next.js & Tailwind CSS", proficiency: "Working Knowledge", summary: "Building dynamic interactive frontends for educational quantitative signal tools and portfolio projects." },
      { name: "AWS & Azure Exposure", proficiency: "Academic Foundation", summary: "Conceptual exposure to enterprise cloud architecture, storage, virtual machines, and cloud data workflows at Infosys." },
      { name: "Git, GitHub & Agile / Scrum", proficiency: "Proficient", summary: "Version control, branching, pull requests, sprint collaboration, and SDLC best practices." }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    role: "System Engineer Trainee",
    company: "Infosys India",
    location: "India",
    period: "Sep 2025 – Jan 2026",
    type: "Graduate Trainee",
    highlights: [
      "Extracted, queried, and analyzed large-scale enterprise datasets using SQL to produce operational KPI reports for business stakeholders.",
      "Gained practical exposure to Azure and AWS cloud services within enterprise-grade solution architectures.",
      "Completed structured training in Core Java, covering OOP principles, Collections, Exception Handling, and JDBC.",
      "Tuned and optimized database queries to improve execution performance while collaborating within Agile, cross-functional teams."
    ],
    technologies: ["SQL", "Core Java", "OOP", "JDBC", "Azure", "AWS", "Agile / Scrum"]
  },
  {
    role: "Data Science Intern",
    company: "Besant Technologies",
    location: "India",
    period: "Apr 2025 – Sep 2025",
    type: "Internship",
    highlights: [
      "Conducted exploratory data analysis on structured datasets using Python (Pandas, NumPy) to identify trends and data quality issues.",
      "Authored complex SQL queries involving multi-table joins, subqueries, and aggregations to support data extraction and reporting.",
      "Designed and built Power BI dashboards to track KPIs and performance metrics, cutting reporting turnaround time by 40%.",
      "Performed statistical analysis and feature engineering to support downstream predictive modeling efforts."
    ],
    technologies: ["Python", "Pandas", "NumPy", "SQL", "Power BI", "EDA", "Statistical Analysis"]
  },
  {
    role: "Full Stack Python Developer",
    company: "Swentic Educo Pvt. Ltd.",
    location: "India",
    period: "Sep 2024 – Nov 2024",
    type: "Project Contract",
    highlights: [
      "Built and maintained scalable web applications in Python, following clean-code practices and thorough documentation.",
      "Integrated RESTful APIs and managed backend database connections to enable seamless frontend-backend communication.",
      "Debugged and tested application components to ensure reliability, delivering on tight project timelines."
    ],
    technologies: ["Python", "REST APIs", "DBMS", "HTML/CSS", "JavaScript"]
  },
  {
    role: "Software Engineering Intern",
    company: "Strydo Technologies",
    location: "India",
    period: "Oct 2023 – May 2024",
    type: "Internship",
    highlights: [
      "Automated data analysis workflows using Python, Pandas, and NumPy to streamline recurring reporting tasks.",
      "Applied object-oriented design principles to improve code structure, reusability, and maintainability."
    ],
    technologies: ["Python", "Pandas", "NumPy", "OOP", "Automation Scripts"]
  }
];

export const educationData: EducationItem[] = [
  {
    degree: "B.Tech, Computer Science & Engineering (AI & Data Science)",
    institution: "Siddharth Institute of Engineering & Technology, Puttur",
    period: "2021 — 2025 (Nov 2021 Batch)",
    grade: "GPA: 8.76 / 10",
    details: [
      "Specialized in Artificial Intelligence, Machine Learning, Data Structures, and Database Management Systems.",
      "Final Year Project: 'Smart Recommendations for Personalized Online Learning Experiences' using neural networks.",
      "Graduated with First Class with Distinction, consistently excelling in core computer science coursework."
    ]
  }
];

export const certificationsData: CertificationItem[] = [
  {
    title: "JPMorgan Software Engineering Job Simulation",
    issuer: "JPMorgan Chase & Co. / Forage",
    year: "2024",
    skillsGained: "Financial Data Feeds, Perspective Python Library, Live Market Data Streaming, Git Workflows",
    linkText: "Verified Simulation"
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google Cloud",
    year: "2024",
    skillsGained: "Large Language Models, Prompt Design, Generative AI Principles, Responsible AI",
    linkText: "Google Credential"
  },
  {
    title: "Project Management Fundamentals",
    issuer: "IBM SkillsBuild",
    year: "2024",
    skillsGained: "Agile Methodologies, Sprint Management, Risk Mitigation, Cross-functional Stakeholder Alignment",
    linkText: "IBM Certificate"
  },
  {
    title: "Becoming an Effective Leader",
    issuer: "edX / The University of Queensland",
    year: "2023",
    skillsGained: "Leadership Dynamics, Strategic Decision Making, Team Motivation, Professional Ethics",
    linkText: "edX Verified"
  }
];

export const graduateInsightsData: GraduateInsight[] = [
  {
    title: "Enterprise Rigor at Infosys",
    domain: "Core Java, SQL & Cloud Exposure",
    takeaway: "Working with large enterprise datasets taught me that query efficiency directly impacts business operations. Learning to tune SQL queries and apply Core Java OOP principles helped me understand how production code differs from classroom exercises.",
    practicalApplication: "Learned to write maintainable code, test boundary conditions, and collaborate within cross-functional Agile teams."
  },
  {
    title: "Data-Driven Impact at Besant Technologies",
    domain: "Power BI & Exploratory Data Analysis",
    takeaway: "Building executive dashboards in Power BI showed me that the true value of data lies in making it immediately clear and actionable. Automating the reporting pipeline cut turnaround time by 40%.",
    practicalApplication: "Gained strong hands-on expertise in Pandas, multi-table SQL joins, and DAX calculations."
  },
  {
    title: "Full-Stack Development at Swentic Educo",
    domain: "Python & RESTful API Integration",
    takeaway: "Building web components in Python helped bridge the gap between frontend user interfaces and backend database connections, emphasizing the importance of thorough documentation and API reliability.",
    practicalApplication: "Strengthened full-stack troubleshooting, clean coding habits, and API design standards."
  },
  {
    title: "Process Automation at Strydo Technologies",
    domain: "Python, Pandas & Automation",
    takeaway: "Automating recurring reporting tasks demonstrated how Python scripts can eliminate hours of repetitive manual data entry, freeing teams to focus on strategic insights.",
    practicalApplication: "Solidified foundational Python programming and practical object-oriented design."
  }
];
