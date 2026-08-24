require('dotenv').config();
const { driver } = require('../config/db');

const locations = [
  { id: 'loc-1', city: 'Hyderabad', state: 'Telangana' },
  { id: 'loc-2', city: 'Bengaluru', state: 'Karnataka' },
  { id: 'loc-3', city: 'Pune', state: 'Maharashtra' },
  { id: 'loc-4', city: 'Mumbai', state: 'Maharashtra' },
  { id: 'loc-5', city: 'Chennai', state: 'Tamil Nadu' },
  { id: 'loc-6', city: 'Gurugram', state: 'Haryana' },
  { id: 'loc-7', city: 'Noida', state: 'Uttar Pradesh' },
  { id: 'loc-8', city: 'Kochi', state: 'Kerala' },
];

const companies = [
  { id: 'comp-1', name: 'NovaTech Solutions', industry: 'Technology', website: 'https://example.com', locationId: 'loc-1' },
  { id: 'comp-2', name: 'CloudAxis Labs', industry: 'Technology', website: 'https://example.com', locationId: 'loc-2' },
  { id: 'comp-3', name: 'ByteBridge Technologies', industry: 'Technology', website: 'https://example.com', locationId: 'loc-3' },
  { id: 'comp-4', name: 'Vertex Digital', industry: 'Technology', website: 'https://example.com', locationId: 'loc-4' },
  { id: 'comp-5', name: 'CodeSphere Systems', industry: 'Technology', website: 'https://example.com', locationId: 'loc-5' },
  { id: 'comp-6', name: 'NexaSoft', industry: 'Technology', website: 'https://example.com', locationId: 'loc-6' },
  { id: 'comp-7', name: 'DataForge Labs', industry: 'Technology', website: 'https://example.com', locationId: 'loc-7' },
  { id: 'comp-8', name: 'AlgoPeak', industry: 'Technology', website: 'https://example.com', locationId: 'loc-2' },
  { id: 'comp-9', name: 'StackBridge', industry: 'Technology', website: 'https://example.com', locationId: 'loc-3' },
  { id: 'comp-10', name: 'CloudNative Systems', industry: 'Technology', website: 'https://example.com', locationId: 'loc-1' },
  { id: 'comp-11', name: 'DataStream Analytics', industry: 'Technology', website: 'https://example.com', locationId: 'loc-4' },
  { id: 'comp-12', name: 'SynapseTech', industry: 'Technology', website: 'https://example.com', locationId: 'loc-8' },
  { id: 'comp-13', name: 'QuantumLeap Software', industry: 'Technology', website: 'https://example.com', locationId: 'loc-7' },
  { id: 'comp-14', name: 'PixelForge Labs', industry: 'Technology', website: 'https://example.com', locationId: 'loc-5' },
  { id: 'comp-15', name: 'InfraCore Technologies', industry: 'Technology', website: 'https://example.com', locationId: 'loc-6' },
];

const skills = [
  { id: 'skill-1', name: 'Java', category: 'Programming' },
  { id: 'skill-2', name: 'Python', category: 'Programming' },
  { id: 'skill-3', name: 'JavaScript', category: 'Programming' },
  { id: 'skill-4', name: 'React', category: 'Frontend' },
  { id: 'skill-5', name: 'Node.js', category: 'Backend' },
  { id: 'skill-6', name: 'Express', category: 'Backend' },
  { id: 'skill-7', name: 'Next.js', category: 'Frontend' },
  { id: 'skill-8', name: 'Spring Boot', category: 'Backend' },
  { id: 'skill-9', name: 'SQL', category: 'Database' },
  { id: 'skill-10', name: 'PostgreSQL', category: 'Database' },
  { id: 'skill-11', name: 'MongoDB', category: 'Database' },
  { id: 'skill-12', name: 'Docker', category: 'DevOps' },
  { id: 'skill-13', name: 'Git', category: 'DevOps' },
  { id: 'skill-14', name: 'GitHub', category: 'DevOps' },
  { id: 'skill-15', name: 'AWS', category: 'Cloud' },
  { id: 'skill-16', name: 'Azure', category: 'Cloud' },
  { id: 'skill-17', name: 'REST APIs', category: 'Backend' },
  { id: 'skill-18', name: 'GraphQL', category: 'Backend' },
  { id: 'skill-19', name: 'Machine Learning', category: 'AI/ML' },
  { id: 'skill-20', name: 'TensorFlow', category: 'AI/ML' },
  { id: 'skill-21', name: 'Data Structures', category: 'Computer Science' },
  { id: 'skill-22', name: 'Algorithms', category: 'Computer Science' },
  { id: 'skill-23', name: 'HTML', category: 'Frontend' },
  { id: 'skill-24', name: 'CSS', category: 'Frontend' },
  { id: 'skill-25', name: 'Tailwind CSS', category: 'Frontend' },
  { id: 'skill-26', name: 'TypeScript', category: 'Programming' },
  { id: 'skill-27', name: 'Redis', category: 'Database' },
  { id: 'skill-28', name: 'Kubernetes', category: 'DevOps' },
  { id: 'skill-29', name: 'FastAPI', category: 'Backend' },
  { id: 'skill-30', name: 'Django', category: 'Backend' },
];

const jobs = [
  { id: 'job-1', title: 'Software Engineer', description: 'Build and maintain scalable software solutions.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 800000, salaryMax: 1500000, companyId: 'comp-1' },
  { id: 'job-2', title: 'Frontend Developer', description: 'Develop responsive user interfaces with modern frameworks.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 700000, salaryMax: 1400000, companyId: 'comp-2' },
  { id: 'job-3', title: 'React Developer', description: 'Create high-quality React applications.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 800000, salaryMax: 1500000, companyId: 'comp-3' },
  { id: 'job-4', title: 'Backend Developer', description: 'Design robust server-side services and APIs.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 800000, salaryMax: 1500000, companyId: 'comp-4' },
  { id: 'job-5', title: 'Node.js Developer', description: 'Implement efficient Node.js backend systems.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 700000, salaryMax: 1400000, companyId: 'comp-5' },
  { id: 'job-6', title: 'MERN Stack Developer', description: 'Work across MongoDB, Express, React and Node.js.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 900000, salaryMax: 1600000, companyId: 'comp-6' },
  { id: 'job-7', title: 'Full Stack Developer', description: 'Deliver end-to-end web applications.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 900000, salaryMax: 1600000, companyId: 'comp-7' },
  { id: 'job-8', title: 'Java Developer', description: 'Build enterprise applications using Java.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 800000, salaryMax: 1500000, companyId: 'comp-8' },
  { id: 'job-9', title: 'Spring Boot Developer', description: 'Develop microservices with Spring Boot.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 900000, salaryMax: 1600000, companyId: 'comp-9' },
  { id: 'job-10', title: 'Python Developer', description: 'Write clean Python services and scripts.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 700000, salaryMax: 1400000, companyId: 'comp-10' },
  { id: 'job-11', title: 'Django Developer', description: 'Build web apps with the Django framework.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 800000, salaryMax: 1500000, companyId: 'comp-11' },
  { id: 'job-12', title: 'Data Engineer', description: 'Design data pipelines and warehouses.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 1000000, salaryMax: 1800000, companyId: 'comp-12' },
  { id: 'job-13', title: 'Machine Learning Engineer', description: 'Train and deploy ML models.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 1200000, salaryMax: 2000000, companyId: 'comp-13' },
  { id: 'job-14', title: 'Cloud Engineer', description: 'Manage cloud infrastructure and automation.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 900000, salaryMax: 1600000, companyId: 'comp-14' },
  { id: 'job-15', title: 'DevOps Engineer', description: 'Improve CI/CD and infrastructure reliability.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 1000000, salaryMax: 1800000, companyId: 'comp-15' },
  { id: 'job-16', title: 'API Developer', description: 'Design and implement RESTful APIs.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 700000, salaryMax: 1400000, companyId: 'comp-1' },
  { id: 'job-17', title: 'Junior Software Engineer', description: 'Learn and contribute to software projects.', experienceLevel: 'Junior', employmentType: 'Full-time', salaryMin: 400000, salaryMax: 700000, companyId: 'comp-2' },
  { id: 'job-18', title: 'Associate Software Engineer', description: 'Support development across the stack.', experienceLevel: 'Junior', employmentType: 'Full-time', salaryMin: 500000, salaryMax: 800000, companyId: 'comp-3' },
  { id: 'job-19', title: 'Web Developer', description: 'Build and maintain websites.', experienceLevel: 'Junior', employmentType: 'Full-time', salaryMin: 400000, salaryMax: 700000, companyId: 'comp-4' },
  { id: 'job-20', title: 'Application Developer', description: 'Create business applications.', experienceLevel: 'Mid', employmentType: 'Full-time', salaryMin: 600000, salaryMax: 1200000, companyId: 'comp-5' },
  { id: 'job-21', title: 'Full Stack Developer', description: 'Lead end-to-end product development.', experienceLevel: 'Senior', employmentType: 'Full-time', salaryMin: 1500000, salaryMax: 2500000, companyId: 'comp-6' },
  { id: 'job-22', title: 'Software Engineer', description: 'Architect and deliver complex systems.', experienceLevel: 'Senior', employmentType: 'Full-time', salaryMin: 1500000, salaryMax: 2500000, companyId: 'comp-7' },
  { id: 'job-23', title: 'Backend Developer', description: 'Lead backend architecture and scaling.', experienceLevel: 'Senior', employmentType: 'Full-time', salaryMin: 1500000, salaryMax: 2500000, companyId: 'comp-8' },
  { id: 'job-24', title: 'DevOps Engineer', description: 'Drive platform reliability at scale.', experienceLevel: 'Senior', employmentType: 'Full-time', salaryMin: 1800000, salaryMax: 2800000, companyId: 'comp-15' },
  { id: 'job-25', title: 'Machine Learning Engineer', description: 'Lead ML research and production.', experienceLevel: 'Senior', employmentType: 'Full-time', salaryMin: 2000000, salaryMax: 3000000, companyId: 'comp-13' },
];

const userSkills = [
  { userId: 'user-1', skillId: 'skill-3', level: 'Advanced' },
  { userId: 'user-1', skillId: 'skill-4', level: 'Advanced' },
  { userId: 'user-1', skillId: 'skill-5', level: 'Intermediate' },
  { userId: 'user-1', skillId: 'skill-6', level: 'Intermediate' },
  { userId: 'user-1', skillId: 'skill-23', level: 'Advanced' },
  { userId: 'user-1', skillId: 'skill-24', level: 'Advanced' },
  { userId: 'user-1', skillId: 'skill-13', level: 'Intermediate' },
  { userId: 'user-1', skillId: 'skill-9', level: 'Intermediate' },
  { userId: 'user-1', skillId: 'skill-11', level: 'Intermediate' },
  { userId: 'user-1', skillId: 'skill-1', level: 'Beginner' },
];

const userInterestedJobs = [
  { userId: 'user-1', jobId: 'job-7' },
  { userId: 'user-1', jobId: 'job-6' },
  { userId: 'user-1', jobId: 'job-22' },
];

const relatedSkills = [
  { from: 'skill-3', to: 'skill-4', strength: 0.9 },
  { from: 'skill-3', to: 'skill-5', strength: 0.9 },
  { from: 'skill-4', to: 'skill-7', strength: 0.8 },
  { from: 'skill-5', to: 'skill-6', strength: 0.9 },
  { from: 'skill-1', to: 'skill-8', strength: 0.9 },
  { from: 'skill-2', to: 'skill-30', strength: 0.9 },
  { from: 'skill-2', to: 'skill-29', strength: 0.8 },
  { from: 'skill-2', to: 'skill-19', strength: 0.8 },
  { from: 'skill-9', to: 'skill-10', strength: 0.8 },
  { from: 'skill-11', to: 'skill-5', strength: 0.7 },
  { from: 'skill-12', to: 'skill-28', strength: 0.8 },
  { from: 'skill-15', to: 'skill-12', strength: 0.6 },
  { from: 'skill-23', to: 'skill-24', strength: 0.9 },
  { from: 'skill-3', to: 'skill-26', strength: 0.9 },
  { from: 'skill-5', to: 'skill-11', strength: 0.6 },
  { from: 'skill-13', to: 'skill-14', strength: 0.9 },
  { from: 'skill-2', to: 'skill-20', strength: 0.7 },
  { from: 'skill-21', to: 'skill-22', strength: 0.9 },
  { from: 'skill-18', to: 'skill-17', strength: 0.7 },
  { from: 'skill-27', to: 'skill-5', strength: 0.6 },
  { from: 'skill-6', to: 'skill-17', strength: 0.8 },
];

const jobRequirements = [
  { jobId: 'job-2', skillId: 'skill-3', importance: 'Required' },
  { jobId: 'job-2', skillId: 'skill-4', importance: 'Required' },
  { jobId: 'job-2', skillId: 'skill-23', importance: 'Required' },
  { jobId: 'job-2', skillId: 'skill-24', importance: 'Required' },
  { jobId: 'job-2', skillId: 'skill-13', importance: 'Preferred' },
  { jobId: 'job-3', skillId: 'skill-3', importance: 'Required' },
  { jobId: 'job-3', skillId: 'skill-4', importance: 'Required' },
  { jobId: 'job-3', skillId: 'skill-23', importance: 'Preferred' },
  { jobId: 'job-3', skillId: 'skill-24', importance: 'Preferred' },
  { jobId: 'job-3', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-4', skillId: 'skill-5', importance: 'Required' },
  { jobId: 'job-4', skillId: 'skill-6', importance: 'Required' },
  { jobId: 'job-4', skillId: 'skill-9', importance: 'Required' },
  { jobId: 'job-4', skillId: 'skill-17', importance: 'Required' },
  { jobId: 'job-4', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-5', skillId: 'skill-5', importance: 'Required' },
  { jobId: 'job-5', skillId: 'skill-3', importance: 'Required' },
  { jobId: 'job-5', skillId: 'skill-6', importance: 'Required' },
  { jobId: 'job-5', skillId: 'skill-11', importance: 'Preferred' },
  { jobId: 'job-5', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-6', skillId: 'skill-3', importance: 'Required' },
  { jobId: 'job-6', skillId: 'skill-4', importance: 'Required' },
  { jobId: 'job-6', skillId: 'skill-5', importance: 'Required' },
  { jobId: 'job-6', skillId: 'skill-6', importance: 'Required' },
  { jobId: 'job-6', skillId: 'skill-11', importance: 'Required' },
  { jobId: 'job-6', skillId: 'skill-17', importance: 'Required' },
  { jobId: 'job-6', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-7', skillId: 'skill-3', importance: 'Required' },
  { jobId: 'job-7', skillId: 'skill-4', importance: 'Required' },
  { jobId: 'job-7', skillId: 'skill-5', importance: 'Required' },
  { jobId: 'job-7', skillId: 'skill-9', importance: 'Required' },
  { jobId: 'job-7', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-8', skillId: 'skill-1', importance: 'Required' },
  { jobId: 'job-8', skillId: 'skill-8', importance: 'Required' },
  { jobId: 'job-8', skillId: 'skill-9', importance: 'Required' },
  { jobId: 'job-8', skillId: 'skill-17', importance: 'Required' },
  { jobId: 'job-8', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-9', skillId: 'skill-1', importance: 'Required' },
  { jobId: 'job-9', skillId: 'skill-8', importance: 'Required' },
  { jobId: 'job-9', skillId: 'skill-9', importance: 'Preferred' },
  { jobId: 'job-9', skillId: 'skill-17', importance: 'Required' },
  { jobId: 'job-9', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-10', skillId: 'skill-2', importance: 'Required' },
  { jobId: 'job-10', skillId: 'skill-9', importance: 'Preferred' },
  { jobId: 'job-10', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-11', skillId: 'skill-2', importance: 'Required' },
  { jobId: 'job-11', skillId: 'skill-30', importance: 'Required' },
  { jobId: 'job-11', skillId: 'skill-9', importance: 'Preferred' },
  { jobId: 'job-11', skillId: 'skill-17', importance: 'Preferred' },
  { jobId: 'job-11', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-12', skillId: 'skill-2', importance: 'Required' },
  { jobId: 'job-12', skillId: 'skill-9', importance: 'Required' },
  { jobId: 'job-12', skillId: 'skill-11', importance: 'Preferred' },
  { jobId: 'job-12', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-12', skillId: 'skill-21', importance: 'Preferred' },
  { jobId: 'job-13', skillId: 'skill-2', importance: 'Required' },
  { jobId: 'job-13', skillId: 'skill-19', importance: 'Required' },
  { jobId: 'job-13', skillId: 'skill-20', importance: 'Required' },
  { jobId: 'job-13', skillId: 'skill-9', importance: 'Preferred' },
  { jobId: 'job-13', skillId: 'skill-21', importance: 'Required' },
  { jobId: 'job-14', skillId: 'skill-15', importance: 'Required' },
  { jobId: 'job-14', skillId: 'skill-12', importance: 'Required' },
  { jobId: 'job-14', skillId: 'skill-28', importance: 'Required' },
  { jobId: 'job-14', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-15', skillId: 'skill-12', importance: 'Required' },
  { jobId: 'job-15', skillId: 'skill-28', importance: 'Required' },
  { jobId: 'job-15', skillId: 'skill-15', importance: 'Required' },
  { jobId: 'job-15', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-15', skillId: 'skill-16', importance: 'Preferred' },
  { jobId: 'job-16', skillId: 'skill-17', importance: 'Required' },
  { jobId: 'job-16', skillId: 'skill-5', importance: 'Preferred' },
  { jobId: 'job-16', skillId: 'skill-6', importance: 'Preferred' },
  { jobId: 'job-16', skillId: 'skill-9', importance: 'Preferred' },
  { jobId: 'job-16', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-17', skillId: 'skill-3', importance: 'Required' },
  { jobId: 'job-17', skillId: 'skill-23', importance: 'Required' },
  { jobId: 'job-17', skillId: 'skill-24', importance: 'Required' },
  { jobId: 'job-17', skillId: 'skill-13', importance: 'Preferred' },
  { jobId: 'job-18', skillId: 'skill-3', importance: 'Required' },
  { jobId: 'job-18', skillId: 'skill-5', importance: 'Preferred' },
  { jobId: 'job-18', skillId: 'skill-9', importance: 'Preferred' },
  { jobId: 'job-18', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-19', skillId: 'skill-23', importance: 'Required' },
  { jobId: 'job-19', skillId: 'skill-24', importance: 'Required' },
  { jobId: 'job-19', skillId: 'skill-3', importance: 'Preferred' },
  { jobId: 'job-19', skillId: 'skill-13', importance: 'Preferred' },
  { jobId: 'job-20', skillId: 'skill-1', importance: 'Required' },
  { jobId: 'job-20', skillId: 'skill-9', importance: 'Required' },
  { jobId: 'job-20', skillId: 'skill-17', importance: 'Preferred' },
  { jobId: 'job-20', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-21', skillId: 'skill-3', importance: 'Required' },
  { jobId: 'job-21', skillId: 'skill-4', importance: 'Required' },
  { jobId: 'job-21', skillId: 'skill-5', importance: 'Required' },
  { jobId: 'job-21', skillId: 'skill-6', importance: 'Required' },
  { jobId: 'job-21', skillId: 'skill-9', importance: 'Required' },
  { jobId: 'job-21', skillId: 'skill-26', importance: 'Preferred' },
  { jobId: 'job-21', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-22', skillId: 'skill-1', importance: 'Required' },
  { jobId: 'job-22', skillId: 'skill-9', importance: 'Required' },
  { jobId: 'job-22', skillId: 'skill-21', importance: 'Required' },
  { jobId: 'job-22', skillId: 'skill-22', importance: 'Required' },
  { jobId: 'job-22', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-23', skillId: 'skill-5', importance: 'Required' },
  { jobId: 'job-23', skillId: 'skill-6', importance: 'Required' },
  { jobId: 'job-23', skillId: 'skill-11', importance: 'Required' },
  { jobId: 'job-23', skillId: 'skill-9', importance: 'Required' },
  { jobId: 'job-23', skillId: 'skill-27', importance: 'Preferred' },
  { jobId: 'job-23', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-24', skillId: 'skill-12', importance: 'Required' },
  { jobId: 'job-24', skillId: 'skill-28', importance: 'Required' },
  { jobId: 'job-24', skillId: 'skill-15', importance: 'Required' },
  { jobId: 'job-24', skillId: 'skill-13', importance: 'Required' },
  { jobId: 'job-24', skillId: 'skill-16', importance: 'Preferred' },
  { jobId: 'job-25', skillId: 'skill-2', importance: 'Required' },
  { jobId: 'job-25', skillId: 'skill-19', importance: 'Required' },
  { jobId: 'job-25', skillId: 'skill-20', importance: 'Required' },
  { jobId: 'job-25', skillId: 'skill-21', importance: 'Required' },
  { jobId: 'job-25', skillId: 'skill-22', importance: 'Required' },
];

async function seed() {
  const session = driver.session();
  try {
    for (const loc of locations) {
      await session.run(
        'MERGE (l:Location {id: $id}) SET l.city = $city, l.state = $state',
        { id: loc.id, city: loc.city, state: loc.state }
      );
    }

    for (const comp of companies) {
      await session.run(
        'MERGE (c:Company {id: $id}) SET c.name = $name, c.industry = $industry, c.website = $website ' +
        'WITH c ' +
        'MATCH (l:Location {id: $locationId}) ' +
        'MERGE (c)-[:LOCATED_IN]->(l)',
        { id: comp.id, name: comp.name, industry: comp.industry, website: comp.website, locationId: comp.locationId }
      );
    }

    for (const skill of skills) {
      await session.run(
        'MERGE (s:Skill {id: $id}) SET s.name = $name, s.category = $category',
        { id: skill.id, name: skill.name, category: skill.category }
      );
    }

    for (const job of jobs) {
      await session.run(
        'MERGE (j:Job {id: $id}) SET j.title = $title, j.description = $description, ' +
        'j.experienceLevel = $experienceLevel, j.employmentType = $employmentType, ' +
        'j.salaryMin = $salaryMin, j.salaryMax = $salaryMax ' +
        'WITH j ' +
        'MATCH (c:Company {id: $companyId}) ' +
        'MERGE (j)-[:OFFERED_BY]->(c)',
        {
          id: job.id, title: job.title, description: job.description,
          experienceLevel: job.experienceLevel, employmentType: job.employmentType,
          salaryMin: job.salaryMin, salaryMax: job.salaryMax, companyId: job.companyId
        }
      );
    }

    await session.run(
      'MERGE (u:User {id: $id}) SET u.name = $name',
      { id: 'user-1', name: 'Demo Candidate' }
    );

    for (const us of userSkills) {
      await session.run(
        'MATCH (u:User {id: $userId}) ' +
        'MATCH (s:Skill {id: $skillId}) ' +
        'MERGE (u)-[:HAS_SKILL {level: $level}]->(s)',
        { userId: us.userId, skillId: us.skillId, level: us.level }
      );
    }

    for (const ui of userInterestedJobs) {
      await session.run(
        'MATCH (u:User {id: $userId}) ' +
        'MATCH (j:Job {id: $jobId}) ' +
        'MERGE (u)-[:INTERESTED_IN]->(j)',
        { userId: ui.userId, jobId: ui.jobId }
      );
    }

    for (const rs of relatedSkills) {
      await session.run(
        'MATCH (a:Skill {id: $from}) ' +
        'MATCH (b:Skill {id: $to}) ' +
        'MERGE (a)-[:RELATED_TO {strength: $strength}]->(b)',
        { from: rs.from, to: rs.to, strength: rs.strength }
      );
    }

    for (const req of jobRequirements) {
      await session.run(
        'MATCH (j:Job {id: $jobId}) ' +
        'MATCH (s:Skill {id: $skillId}) ' +
        'MERGE (j)-[:REQUIRES {importance: $importance}]->(s)',
        { jobId: req.jobId, skillId: req.skillId, importance: req.importance }
      );
    }

    const countQuery = async (label) => {
      const res = await session.run(`MATCH (n${label ? ':' + label : ''}) RETURN count(n) AS c`);
      return res.records[0].get('c').toNumber();
    };

    const countRelationships = async () => {
      const res = await session.run('MATCH ()-[r]->() RETURN count(r) AS c');
      return res.records[0].get('c').toNumber();
    };

    const users = await countQuery('User');
    const skillsCount = await countQuery('Skill');
    const jobsCount = await countQuery('Job');
    const companiesCount = await countQuery('Company');
    const locationsCount = await countQuery('Location');
    const relationships = await countRelationships();

    console.log('CareerGraph seed completed.');
    console.log(`Users: ${users}`);
    console.log(`Skills: ${skillsCount}`);
    console.log(`Jobs: ${jobsCount}`);
    console.log(`Companies: ${companiesCount}`);
    console.log(`Locations: ${locationsCount}`);
    console.log(`Relationships: ${relationships}`);
  } finally {
    await session.close();
    await driver.close();
  }
}

seed().catch((error) => {
  console.error('Seed failed:', error.message);
  process.exit(1);
});
