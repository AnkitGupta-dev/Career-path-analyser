const express = require('express');
const router = express.Router();

function findRoleKey(inputRole, rolesObject) {
  if (!inputRole || typeof inputRole !== "string") return null;

  const roleNormalized = inputRole.trim().toLowerCase();

  return Object.keys(rolesObject).find(
    key => key.toLowerCase() === roleNormalized
  );
}

router.post('/', (req, res) => {
  const { targetRole } = req.body;

  // Mock roadmaps for different roles
  const roadmaps = {
    "Frontend Developer": [
        {
            "phase": "Phase 1",
            "items": ["HTML", "CSS", "JavaScript Basics"]
        },
        {
            "phase": "Phase 2",
            "items": ["React", "Redux", "Tailwind CSS"]
        },
        {
            "phase": "Phase 3",
            "items": ["Next.js", "Performance Optimization", "Testing"]
        }
    ],
    "Backend Developer": [
      {
        "phase": "Phase 1",
        "items": [
          "Java basics",
          "OOP",
          "Git"
        ]
      },
      {
        "phase": "Phase 2",
        "items": [
          "Spring Boot",
          "SQL",
          "APIs"
        ]
      },
      {
        "phase": "Phase 3",
        "items": [
          "Deployment",
          "Projects",
          "System design basics"
        ]
      }
    ],
    "Data Analyst": [
        {
            "phase": "Phase 1",
            "items": ["Excel", "Basic Statistics", "SQL Basics"]
        },
        {
            "phase": "Phase 2",
            "items": ["Python", "Pandas", "Data Visualization"]
        },
        {
            "phase": "Phase 3",
            "items": ["Machine Learning Basics", "Big Data Tools", "Reporting"]
        }
    ]
  };

  // match role regardless of case
  const roleKey = findRoleKey(targetRole, roadmaps);
  const phases = roleKey ? roadmaps[roleKey] : [];

  res.json({ phases });
});

module.exports = router;
