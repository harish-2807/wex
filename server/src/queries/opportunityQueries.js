// Graph-native opportunity discovery.
//
// Why this is graph-native: instead of joining a skills table to a jobs table to a
// companies table to a locations table, we simply walk relationships outward from the
// starting skill nodes. The traversal follows RELATED_TO to nearby skills, then REQUIRES
// back to jobs, then OFFERED_BY to companies and LOCATED_IN to locations — all in a single
// pattern-matching query. The database engine performs the joins as traversals, and we
// annotate whether each matched skill was a direct match or discovered through a related skill.
const opportunities = `
  MATCH (start:Skill)
  WHERE start.name IN $skills
  MATCH (start)-[rel:RELATED_TO*0..1]-(s:Skill)
  WHERE s.name IN $skills OR EXISTS { MATCH (start)-[:RELATED_TO]->(s) }
  WITH start, COLLECT(DISTINCT s) AS directAndRelated
  UNWIND directAndRelated AS s
  MATCH (j:Job)-[req:REQUIRES]->(s)
  MATCH (j)-[:OFFERED_BY]->(c:Company)
  MATCH (c)-[:LOCATED_IN]->(l:Location)
  RETURN
    j.id AS jobId,
    j.title AS jobTitle,
    c.id AS companyId,
    c.name AS companyName,
    l.city AS city,
    l.state AS state,
    s.name AS matchedSkillName,
    CASE WHEN s.name IN $skills THEN true ELSE false END AS directMatch
  ORDER BY j.title ASC, s.name ASC
`;

function aggregateOpportunities(records) {
  const byJob = new Map();

  for (const record of records) {
    const jobId = record.get('jobId');
    const jobTitle = record.get('jobTitle');
    const companyId = record.get('companyId');
    const companyName = record.get('companyName');
    const city = record.get('city');
    const state = record.get('state');
    const skillName = record.get('matchedSkillName');
    const directMatch = record.get('directMatch');

    if (!byJob.has(jobId)) {
      byJob.set(jobId, {
        job: { id: jobId, title: jobTitle },
        company: { id: companyId, name: companyName },
        location: { city, state },
        directlyMatchedSkills: [],
        discoveredThroughSkills: [],
        allMatchedSkills: [],
      });
    }

    const entry = byJob.get(jobId);
    entry.allMatchedSkills.push(skillName);
    if (directMatch) {
      entry.directlyMatchedSkills.push(skillName);
    } else {
      entry.discoveredThroughSkills.push(skillName);
    }
  }

  return Array.from(byJob.values()).map((entry) => {
    const direct = Array.from(new Set(entry.directlyMatchedSkills));
    const discovered = Array.from(new Set(entry.discoveredThroughSkills));
    const total = new Set(entry.allMatchedSkills).size;
    const relevanceScore = Math.round(
      (direct.length * 2 + discovered.length) / 3
    );

    return {
      job: entry.job,
      company: entry.company,
      location: entry.location,
      directlyMatchedSkills: direct,
      discoveredThroughSkills: discovered,
      missingSkills: [],
      relevanceScore,
    };
  });
}

module.exports = { opportunities, aggregateOpportunities };
