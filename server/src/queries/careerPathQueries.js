const { toNumber } = require('../utils');

// Missing skills for a given job, compared to supplied skills.
const jobMissingSkills = `
  MATCH (j:Job {id: $id})-[req:REQUIRES]->(s:Skill)
  WITH j, COLLECT(DISTINCT { name: s.name, importance: req.importance }) AS allReqs
  RETURN
    j.id AS id,
    [r IN allReqs WHERE r.name IN $skills | r.name] AS matchedSkills,
    [r IN allReqs WHERE NOT r.name IN $skills | r.name] AS missingSkills
`;

// Multi-hop career path traversal:
// Selected Skill -> RELATED_TO -> Related Skill <- REQUIRES <- Job -> OFFERED_BY -> Company -> LOCATED_IN -> Location
const careerPaths = `
  MATCH (start:Skill)
  WHERE start.name IN $skills
  MATCH (start)-[r:RELATED_TO]->(related:Skill)
  MATCH (related)<-[req:REQUIRES]-(j:Job)
  MATCH (j)-[:OFFERED_BY]->(c:Company)
  MATCH (c)-[:LOCATED_IN]->(l:Location)
  RETURN
    start.name AS startingSkill,
    related.id AS relatedSkillId,
    related.name AS relatedSkill,
    r.strength AS relationshipStrength,
    j.id AS jobId,
    j.title AS jobTitle,
    c.id AS companyId,
    c.name AS companyName,
    l.city AS city,
    l.state AS state
  ORDER BY r.strength DESC, j.title ASC
  LIMIT $limit
`;

function mapMissingSkills(record) {
  return {
    jobId: record.get('id'),
    matchedSkills: record.get('matchedSkills') || [],
    missingSkills: record.get('missingSkills') || [],
  };
}

function mapCareerPath(record) {
  return {
    startingSkill: record.get('startingSkill'),
    relatedSkill: record.get('relatedSkill'),
    relatedSkillId: record.get('relatedSkillId'),
    relationshipStrength: toNumber(record.get('relationshipStrength')),
    job: {
      id: record.get('jobId'),
      title: record.get('jobTitle'),
    },
    company: {
      id: record.get('companyId'),
      name: record.get('companyName'),
    },
    location: {
      city: record.get('city'),
      state: record.get('state'),
    },
  };
}

module.exports = { jobMissingSkills, careerPaths, mapMissingSkills, mapCareerPath, toNumber };
