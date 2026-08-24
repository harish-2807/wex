const constraints = [
  'CREATE CONSTRAINT unique_user_id IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE',
  'CREATE CONSTRAINT unique_skill_id IF NOT EXISTS FOR (s:Skill) REQUIRE s.id IS UNIQUE',
  'CREATE CONSTRAINT unique_job_id IF NOT EXISTS FOR (j:Job) REQUIRE j.id IS UNIQUE',
  'CREATE CONSTRAINT unique_company_id IF NOT EXISTS FOR (c:Company) REQUIRE c.id IS UNIQUE',
  'CREATE CONSTRAINT unique_location_id IF NOT EXISTS FOR (l:Location) REQUIRE l.id IS UNIQUE',
];

const indexes = [
  'CREATE INDEX skill_name_index IF NOT EXISTS FOR (s:Skill) ON (s.name)',
  'CREATE INDEX job_title_index IF NOT EXISTS FOR (j:Job) ON (j.title)',
  'CREATE INDEX company_name_index IF NOT EXISTS FOR (c:Company) ON (c.name)',
];

const sampleQueries = {
  findMatchingJobs: `
    MATCH (u:User {id: $userId})-[:HAS_SKILL]->(s:Skill)
    MATCH (j:Job)-[:REQUIRES]->(s)
    OPTIONAL MATCH (j)-[:OFFERED_BY]->(c:Company)
    RETURN DISTINCT j, c
  `,
  findMissingSkills: `
    MATCH (j:Job {id: $jobId})-[:REQUIRES]->(s:Skill)
    WHERE NOT EXISTS {
      MATCH (:User {id: $userId})-[:HAS_SKILL]->(s)
    }
    RETURN s
  `,
  relatedSkillsPath: `
    MATCH (u:User {id: $userId})-[:HAS_SKILL]->(s1:Skill)
    MATCH (s1)-[:RELATED_TO]->(s2:Skill)
    MATCH (j:Job)-[:REQUIRES]->(s2)
    OPTIONAL MATCH (j)-[:OFFERED_BY]->(c:Company)
    RETURN DISTINCT j, c, s1, s2
  `,
};

module.exports = {
  constraints,
  indexes,
  sampleQueries,
};
