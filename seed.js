require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');

(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
  await db.collection('users').deleteMany({});
  await db.collection('projects').deleteMany({});
  await db.collection('tasks').deleteMany({});
  await db.collection('notes').deleteMany({});

  // =============================================================================
  //  TODO: Insert your seed data below.
  //
  //  Hints:
  //    - Hash passwords:   const hash = await bcrypt.hash('password123', 10);
  //    - Capture inserted ids:
  //        const u = await db.collection('users').insertOne({ ... });
  //        const userId = u.insertedId;
  //    - Use those ids when inserting projects/tasks/notes.
  //    - Demonstrate schema flexibility: include at least one optional field
  //      on SOME documents but not all (e.g. dueDate on some tasks only).

  const password1 = await bcrypt.hash('hellokitty', 10);
  const password2 = await bcrypt.hash('majula', 10);

  const user1Result = await db.collection('users').insertOne({
    email: 'mohib@example.com',
    passwordHash: password1,
    name: 'Mohib Abdul Karim',
    createdAt: new Date()
  });

  const user2Result = await db.collection('users').insertOne({
    email: 'ashen@example.com',
    passwordHash: password2,
    name: 'Ashen One',
    createdAt: new Date()
  });

  const user1Id = user1Result.insertedId;
  const user2Id = user2Result.insertedId;



  const proj1Result = await db.collection('projects').insertOne({
    ownerId: user1Id,
    name: 'Jahhhaazzzzzz',
    description: 'Made a fully automated flight management system with cron jobs',
    archived: false,
    createdAt: new Date()
  });

  const proj2Result = await db.collection('projects').insertOne({
    ownerId: user1Id,
    name: 'Trap Adventure',
    description: 'The game will make you want to off yourself',
    archived: false,
    createdAt: new Date()
  });

  const proj3Result = await db.collection('projects').insertOne({
    ownerId: user2Id,
    name: '2PL with WAL with crash recovery',
    description: 'blah blah blah',
    archived: false,
    createdAt: new Date()
  });

  const proj4Result = await db.collection('projects').insertOne({
    ownerId: user2Id,
    name: 'Database Dimagh Kharab',
    description: 'What am i doing here',
    archived: false,
    createdAt: new Date()
  });

  const proj1Id = proj1Result.insertedId;
  const proj2Id = proj2Result.insertedId;
  const proj3Id = proj3Result.insertedId;
  const proj4Id = proj4Result.insertedId;



  const task1Result = await db.collection('tasks').insertOne({
    ownerId: user1Id,
    projectId: proj1Id,
    title: 'Do nothing',
    status: 'in-progress',
    priority: 1,
    tags: ['design', 'ui', 'critical'],
    subtasks: [
      { title: 'eat', done: true },
      { title: 'sleep', done: false },
      { title: 'pray', done: false }
    ],
    description: 'Create a modern, responsive homepage design that reflects our brand',
    dueDate: new Date('2026-05-15'),
    createdAt: new Date()
  });

  const task2Result = await db.collection('tasks').insertOne({
    ownerId: user1Id,
    projectId: proj2Id,
    title: 'Cat daily duties',
    status: 'todo',
    priority: 2,
    tags: ['frontend', 'setup', 'react'],
    subtasks: [
      { title: 'feed cat', done: true },
      { title: 'pet cat', done: true },
      { title: 'play with cat', done: false },
      { title: 'kill cat', done: false }
    ],
    createdAt: new Date()
    
  });

  const task3Result = await db.collection('tasks').insertOne({
    ownerId: user2Id,
    projectId: proj3Id,
    title: 'Write social media content calendar',
    status: 'todo',
    priority: 3,
    tags: ['marketing', 'content', 'social-media'],
    subtasks: [
      { title: 'Define themes for each week', done: false },
      { title: 'Create content matrix', done: false },
      { title: 'Schedule posts in buffer', done: false }
    ],
    dueDate: new Date('2026-05-01'),
    createdAt: new Date()
  });

  const task4Result = await db.collection('tasks').insertOne({
    ownerId: user2Id,
    projectId: proj4Id,
    title: 'Backup existing database',
    status: 'done',
    priority: 1,
    tags: ['database', 'backup', 'critical'],
    subtasks: [
      { title: 'Schedule backup window', done: true },
      { title: 'Execute full backup', done: true },
      { title: 'Verify backup integrity', done: true }
    ],
    description: 'Create a complete backup of the production database before migration begins',
    dueDate: new Date('2026-04-28'),
    createdAt: new Date()
  });

  const task5Result = await db.collection('tasks').insertOne({
    ownerId: user1Id,
    projectId: proj1Id,
    title: 'Write homepage copy',
    status: 'todo',
    priority: 2,
    tags: ['writing', 'content'],
    subtasks: [
      { title: 'Outline sections', done: false },
      { title: 'Draft value propositions', done: false }
    ],
    createdAt: new Date()
  });

  const task1Id = task1Result.insertedId;
  const task2Id = task2Result.insertedId;
  const task3Id = task3Result.insertedId;
  const task4Id = task4Result.insertedId;
  const task5Id = task5Result.insertedId;


  await db.collection('notes').insertOne({
    ownerId: user1Id,
    projectId: proj1Id,
    title: 'Color scheme research',
    body: 'Found great inspiration from Material Design and Tailwind. The blue/orange combination tested well with focus groups.',
    tags: ['design', 'reference'],
    pinned: true,
    createdAt: new Date()
  });

  await db.collection('notes').insertOne({
    ownerId: user1Id,
    projectId: proj2Id,
    title: 'React best practices',
    body: 'Remember to use functional components and hooks. Keep state management simple with Context API for now.',
    tags: ['frontend', 'reminder'],
    createdAt: new Date()
  });

  await db.collection('notes').insertOne({
    ownerId: user2Id,
    projectId: proj3Id,
    title: 'Content calendar notes',
    body: 'Post twice daily on weekdays, once on weekends. Engagement is highest at 9am and 6pm EST.',
    tags: ['marketing', 'social-media'],
    createdAt: new Date()
  });

  await db.collection('notes').insertOne({
    ownerId: user2Id,
    title: 'General meeting notes',
    body: 'Discussed Q2 roadmap and priorities. Need to follow up with engineering team about database timeline.',
    tags: ['meeting', 'action-item'],
    createdAt: new Date()
  });

  await db.collection('notes').insertOne({
    ownerId: user1Id,
    projectId: proj1Id,
    title: 'Copy refinements',
    body: 'Updated homepage headline to be more compelling. Test "Transform your workflow" vs "Simplify your tasks".',
    tags: ['content', 'copywriting'],
    pinned: true,
    createdAt: new Date()
  });

  console.log(' Database seeded successfully!');
  console.log(`   - 2 users created`);
  console.log(`   - 4 projects created`);
  console.log(`   - 5 tasks created (with embedded subtasks and tags)`);
  console.log(`   - 5 notes created (optional projectId and pinned fields)`);
  process.exit(0);
})();