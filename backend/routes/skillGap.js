const express = require('express');
const router = express.Router();
const skillsData = require('../data/skills.json');

function findRoleKey(inputRole, rolesObject) {
  if (!inputRole || typeof inputRole !== "string") return null;

  const roleNormalized = inputRole.trim().toLowerCase();

  return Object.keys(rolesObject).find(
    key => key.toLowerCase() === roleNormalized
  );
}

router.post('/', (req, res) => {
  const { targetRole, currentSkills } = req.body;

// find matching role regardless of case
const roleKey = findRoleKey(targetRole, skillsData);

if (!roleKey) {
  return res.status(400).json({ error: 'Invalid or missing targetRole' });
}

const requiredSkills = skillsData[roleKey];
const userSkills = (currentSkills || [])
  .map(s => s.trim().toLowerCase());

const matchedSkills = requiredSkills.filter(
  skill => userSkills.includes(skill.toLowerCase())
);

const missingSkills = requiredSkills.filter(
  skill => !userSkills.includes(skill.toLowerCase())
);


const recommendations = missingSkills.map(skill => `Learn ${skill} — important for ${targetRole}`);

// "learningOrder" is requested to be exactly the missing skills in order
const learningOrder = [...missingSkills];

res.json({
    matchedSkills,
    missingSkills,
    recommendations,
    learningOrder
  });
});

module.exports = router;