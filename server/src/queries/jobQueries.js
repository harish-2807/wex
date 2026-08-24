const { toNumber } = require('../utils');

const getAllJobs = `
  MATCH (j:Job)
  OPTIONAL MATCH (j)-[:OFFERED_BY]->(c:Company)
  OPTIONAL MATCH (c)-[:LOCATED_IN]->(l:Location)
  OPTIONAL MATCH (j)-[req:REQUIRES]->(s:Skill)
  RETURN
    j.id AS id,
    j.title AS title,
    j.description AS description,
    j.experienceLevel AS experienceLevel,
    j.employmentType AS employmentType,
    j.salaryMin AS salaryMin,
    j.salaryMax AS salaryMax,
    c.id AS companyId,
    c.name AS companyName,
    l.city AS city,
    l.state AS state,
    COLLECT(DISTINCT {
      id: s.id,
      name: s.name,
      importance: req.importance
    }) AS requiredSkills
  ORDER BY j.title ASC
`;

const getJobById = `
  MATCH (j:Job {id: $id})
  OPTIONAL MATCH (j)-[:OFFERED_BY]->(c:Company)
  OPTIONAL MATCH (c)-[:LOCATED_IN]->(l:Location)
  OPTIONAL MATCH (j)-[req:REQUIRES]->(s:Skill)
  RETURN
    j.id AS id,
    j.title AS title,
    j.description AS description,
    j.experienceLevel AS experienceLevel,
    j.employmentType AS employmentType,
    j.salaryMin AS salaryMin,
    j.salaryMax AS salaryMax,
    c.id AS companyId,
    c.name AS companyName,
    l.city AS city,
    l.state AS state,
    COLLECT(DISTINCT {
      id: s.id,
      name: s.name,
      importance: req.importance
    }) AS requiredSkills
`;

const getJobRequirements = `
  MATCH (j:Job {id: $id})-[req:REQUIRES]->(s:Skill)
  RETURN s.name AS name
`;

function mapJobRecord(record) {
  const requiredSkills = (record.get('requiredSkills') || [])
    .filter((s) => s && s.name)
    .map((s) => ({
      id: s.id,
      name: s.name,
      importance: s.importance,
    }));

  return {
    id: record.get('id'),
    title: record.get('title'),
    description: record.get('description'),
    experienceLevel: record.get('experienceLevel'),
    employmentType: record.get('employmentType'),
    salaryMin: toNumber(record.get('salaryMin')),
    salaryMax: toNumber(record.get('salaryMax')),
    company: record.get('companyId')
      ? { id: record.get('companyId'), name: record.get('companyName') }
      : null,
    location: record.get('city')
      ? { city: record.get('city'), state: record.get('state') }
      : null,
    requiredSkills,
  };
}

module.exports = { getAllJobs, getJobById, getJobRequirements, mapJobRecord, toNumber };
