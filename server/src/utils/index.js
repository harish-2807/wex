function toNumber(value) {
  if (value === null || value === undefined) return value;
  if (typeof value === 'object' && typeof value.toNumber === 'function') {
    return value.toNumber();
  }
  return Number(value);
}

function parseSkillsParam(raw) {
  if (!raw) return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .filter((s, index, arr) => arr.indexOf(s) === index)
    .slice(0, 20);
}

module.exports = { toNumber, parseSkillsParam };
