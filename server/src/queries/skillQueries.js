const getAllSkills = `
  MATCH (s:Skill)
  RETURN s.id AS id, s.name AS name, s.category AS category
  ORDER BY s.name ASC
`;

const getSkillById = `
  MATCH (s:Skill {id: $id})
  RETURN s.id AS id, s.name AS name, s.category AS category
`;

const getRelatedSkills = `
  MATCH (s:Skill {id: $id})-[r:RELATED_TO]->(related:Skill)
  RETURN related.id AS id, related.name AS name, related.category AS category, r.strength AS strength
  ORDER BY r.strength DESC
  LIMIT $limit
`;

function mapSkill(record) {
  return {
    id: record.get('id'),
    name: record.get('name'),
    category: record.get('category'),
  };
}

module.exports = { getAllSkills, getSkillById, getRelatedSkills, mapSkill };
