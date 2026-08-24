const { toNumber } = require('../utils');

// Find jobs whose required skills overlap the selected skills.
// Uses collect + size to compute matched/total without row duplication.
const recommendJobs = `
  MATCH (j:Job)
  OPTIONAL MATCH (j)-[:OFFERED_BY]->(c:Company)
  OPTIONAL MATCH (c)-[:LOCATED_IN]->(l:Location)
  OPTIONAL MATCH (j)-[req:REQUIRES]->(s:Skill)
  WITH j, c, l, COLLECT(DISTINCT { name: s.name, importance: req.importance }) AS allReqs
  WITH j, c, l, allReqs, [r IN allReqs WHERE r.name IN $skills] AS matched
  WHERE size(matched) > 0
  RETURN
    j.id AS id,
    j.title AS title,
    c.name AS company,
    l.city AS city,
    l.state AS state,
    size(allReqs) AS totalRequired,
    [m IN matched | m.name] AS matchedSkills,
    [r IN allReqs WHERE NOT r.name IN $skills | r.name] AS missingSkills,
    size(matched) AS matchedSkillCount
  ORDER BY size(matched) DESC, j.title ASC
  LIMIT $limit
`;

function mapRecommendation(record) {
  const totalRequired = toNumber(record.get('totalRequired'));
  const matchedSkillCount = toNumber(record.get('matchedSkillCount'));
  const matchPercentage =
    totalRequired > 0 ? Math.round((matchedSkillCount / totalRequired) * 100) : 0;

  return {
    id: record.get('id'),
    title: record.get('title'),
    company: record.get('company'),
    location: record.get('city')
      ? { city: record.get('city'), state: record.get('state') }
      : null,
    totalRequired,
    matchedSkillCount,
    matchedSkills: record.get('matchedSkills') || [],
    missingSkills: record.get('missingSkills') || [],
    matchPercentage,
  };
}

module.exports = { recommendJobs, mapRecommendation, toNumber };
