import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DATABASE_URL.split('@')[1].split('/')[0],
  user: process.env.DATABASE_URL.split('://')[1].split(':')[0],
  password: process.env.DATABASE_URL.split(':')[2].split('@')[0],
  database: process.env.DATABASE_URL.split('/').pop(),
});

const courses = [
  {
    title: 'Introdução ao Help Desk',
    description: 'Aprenda os fundamentos do atendimento ao cliente e gestão de tickets',
    category: 'Help Desk',
    level: 'beginner',
    duration: 120,
    totalLessons: 8,
    instructor: 'João Silva',
    rating: 4.8,
  },
  {
    title: 'Gestão de SLA e Indicadores',
    description: 'Domine os conceitos de SLA, KPI e métricas de atendimento',
    category: 'Help Desk',
    level: 'intermediate',
    duration: 180,
    totalLessons: 12,
    instructor: 'Maria Santos',
    rating: 4.9,
  },
  {
    title: 'Troubleshooting de Hardware',
    description: 'Diagnóstico e resolução de problemas de hardware',
    category: 'Hardware',
    level: 'intermediate',
    duration: 150,
    totalLessons: 10,
    instructor: 'Carlos Oliveira',
    rating: 4.7,
  },
  {
    title: 'Infraestrutura de Rede',
    description: 'Conceitos avançados de redes, TCP/IP e configuração',
    category: 'Infraestrutura',
    level: 'advanced',
    duration: 240,
    totalLessons: 16,
    instructor: 'Ana Costa',
    rating: 4.9,
  },
  {
    title: 'Segurança da Informação',
    description: 'Proteção de dados, segurança em Help Desk e boas práticas',
    category: 'Segurança',
    level: 'advanced',
    duration: 200,
    totalLessons: 14,
    instructor: 'Pedro Ferreira',
    rating: 4.8,
  },
  {
    title: 'Atendimento ao Cliente Avançado',
    description: 'Técnicas de comunicação, empatia e resolução de conflitos',
    category: 'Help Desk',
    level: 'beginner',
    duration: 90,
    totalLessons: 6,
    instructor: 'Juliana Rocha',
    rating: 4.9,
  },
];

for (const course of courses) {
  await connection.execute(
    'INSERT INTO courses (title, description, category, level, duration, totalLessons, instructor, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [course.title, course.description, course.category, course.level, course.duration, course.totalLessons, course.instructor, course.rating]
  );
}

console.log('✅ 6 cursos inseridos com sucesso!');
await connection.end();
