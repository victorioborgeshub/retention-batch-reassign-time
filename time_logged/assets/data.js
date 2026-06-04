// ─────────────────────────────────────────────────────
// HUBSTAFF REASSIGN TIME — MOCKUP DATA
// 100 members across 4 teams. All Engineering entries
// are on Hubstaff Classic (the wrong project) to power
// all 3 usability test scenarios.
// ─────────────────────────────────────────────────────

const TASKS = [
  { id: 'k1', name: 'Backend migration' },
  { id: 'k2', name: 'UI components' },
  { id: 'k3', name: 'API integration' },
  { id: 'k4', name: 'Code review' },
  { id: 'k5', name: 'Database optimization' },
  { id: 'k6', name: 'Feature development' },
  { id: 'k7', name: 'Bug fixes' },
  { id: 'k8', name: 'Sprint planning' },
];

const PROJECTS = [
  { id: 'p1', name: 'Hubstaff Classic',  dot: '#9ca3af' }, // wrong — retired project
  { id: 'p2', name: 'Hubstaff New',      dot: '#2aa7ff' }, // correct destination
  { id: 'p3', name: 'Marketing & Ops',   dot: '#f59e0b' }, // unrelated, neutral
];

// ─── TEAMS ────────────────────────────────────────────
// IDs are built from sequential ranges to stay in sync with MEMBERS below.
const ENGINEERING_IDS = Array.from({ length: 60 }, (_, i) => `m${i + 1}`);
const DESIGN_IDS      = Array.from({ length: 8  }, (_, i) => `m${i + 61}`);
const PRODUCT_IDS     = Array.from({ length: 15 }, (_, i) => `m${i + 69}`);
const SALES_IDS       = Array.from({ length: 17 }, (_, i) => `m${i + 84}`);

const TEAMS = [
  { id: 't1', name: 'Engineering', memberIds: ENGINEERING_IDS },
  { id: 't2', name: 'Design',      memberIds: DESIGN_IDS      },
  { id: 't3', name: 'Product',     memberIds: PRODUCT_IDS     },
  { id: 't4', name: 'Sales',       memberIds: SALES_IDS       },
];

// ─── MEMBERS ──────────────────────────────────────────
// Color rotation across 8 avatar colors.
const _col = i => 'c' + ((i % 8) + 1);

// Engineering — m1 to m60
// Scenario anchors kept at their original IDs:
//   m1  Lucas Ferreira   (Scenario B: deselect this one)
//   m2  Marina Costa     (Scenario C: select only her Mon entries)
//   m3  Rafael Mendes    (Scenario C: select only his Mon entries)
const ENGINEERING_NAMES = [
  'Lucas Ferreira',    'Marina Costa',      'Rafael Mendes',     'Priya Nair',
  'Diego Oliveira',    'Aisha Patel',        'Connor Walsh',      'Yuki Tanaka',
  'Fernanda Lima',     'Marcus Johnson',    'Sara Chen',          'Ivan Petrov',
  'Natalia Vargas',    'James Okafor',       'Emily Rodriguez',   'Tomás García',
  'Nina Kimura',       'David Park',         'Leila Hassan',      'André Silva',
  'Sophie Müller',     'Carlos Torres',      'Mei Lin',           'Patrick O\'Brien',
  'Valentina Russo',   'Kevin Ose',          'Anastasia Novak',   'Omar Khalil',
  'Isabel Santos',     'William Nakamura',  'Fatima Al-Rashid',  'Ethan Brooks',
  'Claudia Ferreira',  'Arjun Sharma',       'Hannah Weber',      'Mohammed Ali',
  'Lily Johnson',      'Bruno Carvalho',     'Elena Popescu',     'Jayden Williams',
  'Chloe Dupont',      'Ravi Kumar',         'Laura Svensson',    'Felix Bauer',
  'Amara Diallo',      'Samuel Cohen',       'Xiomara Herrera',   'Nikolai Volkov',
  'Grace Adeyemi',     'Alex Kim',           'Thiago Barbosa',    'Mia Schmidt',
  'Daniel Martínez',   'Jasmine Okonkwo',    'Thomas Hughes',     'Elena Sokolova',
  'Pedro Alves',       'Zara Ahmed',         'Lucas Andrade',     'Hana Suzuki',
];

// Design — m61 to m68
const DESIGN_NAMES = [
  'Camila Ribeiro',  'Noah Baker',     'Sofia Pereira', 'Enzo Moreau',
  'Isabela Santos',  'Ryan Cooper',    'Alice Fontaine', 'Marcus Webb',
];

// Product — m69 to m83
const PRODUCT_NAMES = [
  'Juliana Martins',  'Ethan Clarke',   'Ana Rodrigues',   'Michael Torres',
  'Beatriz Oliveira', 'Joshua Kim',     'Carla Mendoza',   'Dominic Chen',
  'Paula Ferreira',   'Sam Wilson',     'Renata Costa',    'Liam Murphy',
  'Gabriela Souza',   'Oscar Lindqvist','Maya Patel',
];

// Sales — m84 to m100
const SALES_NAMES = [
  'Débora Alves',    'Tom Eriksson',   'Brandon Lee',    'Daniela Cruz',
  'Eric Nguyen',     'Laura Mitchell', 'Jordan Hayes',   'Valentina Lima',
  'Aaron Scott',     'Giovanna Ferrari','Tyler Morris',  'Mariana Gomes',
  'Chris Anderson',  'Lucia Vega',     'Nathan Brown',   'Stefanie Meyer',
  'Adrian Rojas',
];

const MEMBERS = [
  ...ENGINEERING_NAMES,
  ...DESIGN_NAMES,
  ...PRODUCT_NAMES,
  ...SALES_NAMES,
].map((name, i) => ({ id: `m${i + 1}`, name, color: _col(i) }));

// ─── ENTRIES ──────────────────────────────────────────
// Every Engineering member has 2 entries: Mon Jun 1 + Tue Jun 2,
// all logged to Hubstaff Classic (p1 — the wrong project).
//
// Time slots — 10 patterns, deterministically distributed:
//   Jun 1  → slot[i % 10]
//   Jun 2  → slot[(i + 4) % 10]   (shifted to vary per member)
//
// To-do task IDs cycle across k1–k8.

const _SLOTS = [
  ['08:00', '10:00'],
  ['08:30', '11:00'],
  ['09:00', '11:30'],
  ['09:00', '12:00'],
  ['09:30', '11:30'],
  ['10:00', '12:30'],
  ['10:00', '13:00'],
  ['08:00', '11:00'],
  ['09:15', '10:45'],
  ['10:30', '12:30'],
];

const _TASK_IDS = TASKS.map(t => t.id);

const ENTRIES = [];
let _eid = 1;

ENGINEERING_IDS.forEach((memberId, i) => {
  const s1 = _SLOTS[i % _SLOTS.length];
  const s2 = _SLOTS[(i + 4) % _SLOTS.length];
  ENTRIES.push({
    id: _eid++, memberId,
    iso: '2026-06-01', dateLabel: 'Mon, Jun 1',
    from: s1[0], to: s1[1],
    projectId: 'p1',
    todoId: _TASK_IDS[i % _TASK_IDS.length],
  });
  ENTRIES.push({
    id: _eid++, memberId,
    iso: '2026-06-02', dateLabel: 'Tue, Jun 2',
    from: s2[0], to: s2[1],
    projectId: 'p1',
    todoId: _TASK_IDS[(i + 3) % _TASK_IDS.length],
  });
});

// ─── USABILITY TEST SCENARIO REFERENCE ────────────────
//
// Scenario A — Full bulk
//   Filter: Engineering + Hubstaff Classic + Jun 1–2
//   Select All → Reassign 120 entries to Hubstaff New
//
// Scenario B — All except one
//   Same filter → deselect Lucas Ferreira (m1, 2 entries) → Reassign 118 entries
//
// Scenario C — Specific rows
//   Same filter → deselect all → select Marina Costa (m2) + Rafael Mendes (m3) on Jun 1 only
//   → Reassign 4 entries
