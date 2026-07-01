const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 1110;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session configuration
app.use(session({
  secret: 'kicukiro-district-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 }
}));

// Sample data - These are shared between admin and homepage
let activities = [
  {
    id: 1,
    activityNumber: 'KDA-2026-001',
    title: 'Community Development Meeting',
    category: 'Meeting',
    date: '2026-06-29',
    startTime: '07:00',
    endTime: '09:00',
    location: 'Kicukiro District Office',
    sector: 'Kicukiro',
    cell: 'Kicukiro Central',
    coordinator: 'Jean Pierre Habimana',
    department: 'Community Development',
    status: 'Completed',
    priority: 'High',
    participants: 45,
    expectedAttendance: 50,
    actualAttendance: 45,
    description: 'Monthly community development meeting focusing on infrastructure projects.',
    resources: 'Meeting hall, Projectors, Documents',
    budget: '2,500,000 RWF',
    progress: 100,
    createdAt: '2026-06-20',
    updatedAt: '2026-06-29'
  },
  {
    id: 2,
    activityNumber: 'KDA-2026-002',
    title: 'Infrastructure Inspection',
    category: 'Inspection',
    date: '2026-06-29',
    startTime: '09:00',
    endTime: '12:00',
    location: 'Various Sites',
    sector: 'Gikondo',
    cell: 'Gikondo A',
    coordinator: 'Marie Claire Uwimana',
    department: 'Infrastructure',
    status: 'In Progress',
    priority: 'High',
    participants: 12,
    expectedAttendance: 15,
    actualAttendance: 12,
    description: 'Inspection of ongoing road construction projects in the district.',
    resources: 'Vehicles, Safety gear, Documentation',
    budget: '1,800,000 RWF',
    progress: 65,
    createdAt: '2026-06-28',
    updatedAt: '2026-06-29'
  },
  {
    id: 3,
    activityNumber: 'KDA-2026-003',
    title: 'Community Work - Umuganda',
    category: 'Community Work',
    date: '2026-06-29',
    startTime: '11:00',
    endTime: '14:00',
    location: 'Various Locations',
    sector: 'Nyarugunga',
    cell: 'Nyarugunga B',
    coordinator: 'Emmanuel Niyonzima',
    department: 'Social Affairs',
    status: 'Pending',
    priority: 'High',
    participants: 200,
    expectedAttendance: 250,
    actualAttendance: 0,
    description: 'Monthly community work (Umuganda) for environmental cleanliness.',
    resources: 'Cleaning tools, Waste collection bags',
    budget: '500,000 RWF',
    progress: 0,
    createdAt: '2026-06-25',
    updatedAt: '2026-06-29'
  },
  {
    id: 4,
    activityNumber: 'KDA-2026-004',
    title: 'Youth Entrepreneurship Training',
    category: 'Training',
    date: '2026-06-29',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Youth Center',
    sector: 'Kicukiro',
    cell: 'Kicukiro B',
    coordinator: 'Alice Mukamana',
    department: 'Youth Development',
    status: 'Upcoming',
    priority: 'Medium',
    participants: 0,
    expectedAttendance: 30,
    actualAttendance: 0,
    description: 'Training session on entrepreneurship and business skills for youth.',
    resources: 'Training materials, Projectors, Computers',
    budget: '1,200,000 RWF',
    progress: 0,
    createdAt: '2026-06-27',
    updatedAt: '2026-06-29'
  },
  {
    id: 5,
    activityNumber: 'KDA-2026-005',
    title: 'Closing Coordination Meeting',
    category: 'Meeting',
    date: '2026-06-29',
    startTime: '16:00',
    endTime: '17:30',
    location: 'Kicukiro District Office',
    sector: 'Kicukiro',
    cell: 'Kicukiro Central',
    coordinator: 'Dr. Jean Paul Rwema',
    department: 'Administration',
    status: 'Cancelled',
    priority: 'Low',
    participants: 25,
    expectedAttendance: 30,
    actualAttendance: 0,
    description: 'Final coordination meeting for the month of June 2026.',
    resources: 'Conference room, Refreshments',
    budget: '350,000 RWF',
    progress: 0,
    createdAt: '2026-06-26',
    updatedAt: '2026-06-29'
  },
  {
    id: 6,
    activityNumber: 'KDA-2026-006',
    title: 'Health Sensitization Campaign',
    category: 'Health',
    date: '2026-06-30',
    startTime: '08:00',
    endTime: '12:00',
    location: 'Health Center',
    sector: 'Masaka',
    cell: 'Masaka A',
    coordinator: 'Dr. Rose Uwimana',
    department: 'Health',
    status: 'Upcoming',
    priority: 'High',
    participants: 0,
    expectedAttendance: 100,
    actualAttendance: 0,
    description: 'Health sensitization on malaria prevention and hygiene practices.',
    resources: 'Medical supplies, Educational materials',
    budget: '750,000 RWF',
    progress: 0,
    createdAt: '2026-06-28',
    updatedAt: '2026-06-29'
  }
];

let departments = [
  { id: 1, name: 'Administration', head: 'Dr. Jean Paul Rwema', staff: 25 },
  { id: 2, name: 'Community Development', head: 'Jean Pierre Habimana', staff: 30 },
  { id: 3, name: 'Infrastructure', head: 'Marie Claire Uwimana', staff: 20 },
  { id: 4, name: 'Social Affairs', head: 'Emmanuel Niyonzima', staff: 15 },
  { id: 5, name: 'Youth Development', head: 'Alice Mukamana', staff: 18 },
  { id: 6, name: 'Health', head: 'Dr. Rose Uwimana', staff: 22 }
];

let announcements = [
  { id: 1, title: 'Important Notice: Umuganda Day', content: 'All residents are reminded to participate in Umuganda this Saturday.', type: 'Important', date: '2026-06-28' },
  { id: 2, title: 'District Development Plan', content: 'The new development plan for Kicukiro District has been approved.', type: 'News', date: '2026-06-27' },
  { id: 3, title: 'Emergency: Weather Alert', content: 'Heavy rains expected. Please take necessary precautions.', type: 'Emergency', date: '2026-06-29' }
];

let participants = [
  { id: 1, name: 'Jean Paul Niyonzima', institution: 'Kicukiro Sector', position: 'Sector Executive', phone: '+250 788 123 456', email: 'jp.niyoni@gmail.com', gender: 'Male' },
  { id: 2, name: 'Marie Claire Uwimana', institution: 'District Office', position: 'Infrastructure Director', phone: '+250 788 234 567', email: 'mc.uwimana@kicukiro.gov.rw', gender: 'Female' },
  { id: 3, name: 'Emmanuel Habimana', institution: 'Youth Center', position: 'Youth Coordinator', phone: '+250 788 345 678', email: 'emmanuel.habimana@gmail.com', gender: 'Male' },
  { id: 4, name: 'Alice Mukamana', institution: 'Health Center', position: 'Health Officer', phone: '+250 788 456 789', email: 'alice.mukamana@health.gov.rw', gender: 'Female' },
  { id: 5, name: 'Jean Pierre Rwema', institution: 'District Administration', position: 'Administrative Officer', phone: '+250 788 567 890', email: 'jp.rwema@kicukiro.gov.rw', gender: 'Male' }
];

// Users for login
const users = [
  { username: 'admin', password: 'admin123', role: 'Administrator' },
  { username: 'manager', password: 'manager123', role: 'District Manager' },
  { username: 'staff', password: 'staff123', role: 'Staff' }
];

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Routes
app.get('/', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const todayActivities = activities.filter(a => a.date === today);
  const stats = {
    total: activities.length,
    completed: activities.filter(a => a.status === 'Completed').length,
    pending: activities.filter(a => a.status === 'Pending').length,
    ongoing: activities.filter(a => a.status === 'In Progress').length,
    upcoming: activities.filter(a => a.status === 'Upcoming').length,
    departments: departments.length,
    totalParticipants: activities.reduce((sum, a) => sum + a.participants, 0),
    totalLocations: new Set(activities.map(a => a.location)).size,
    totalVehicles: 7,
    emergency: 1
  };
  
  res.render('index', { 
    title: 'Kicukiro District - Daily Activity Management',
    activities: todayActivities, 
    stats, 
    announcements, 
    departments,
    session: req.session
  });
});

// Admin Login Page
app.get('/admin/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/admin');
  } else {
    res.render('admin/login', { title: 'Admin Login - Kicukiro District', error: null });
  }
});

// Admin Login POST
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    req.session.user = user;
    res.redirect('/admin');
  } else {
    res.render('admin/login', { title: 'Admin Login - Kicukiro District', error: 'Invalid username or password' });
  }
});

// Admin Logout
app.get('/admin/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Admin Routes (Protected)
app.get('/admin', isAuthenticated, (req, res) => {
  res.render('admin/dashboard', { 
    title: 'Admin Dashboard - Kicukiro District',
    activities, 
    departments, 
    participants,
    user: req.session.user
  });
});

app.get('/admin/activities', isAuthenticated, (req, res) => {
  res.render('admin/activities', { 
    title: 'Manage Activities - Admin Panel',
    activities,
    user: req.session.user
  });
});

app.get('/admin/departments', isAuthenticated, (req, res) => {
  res.render('admin/departments', { 
    title: 'Manage Departments - Admin Panel',
    activities, 
    departments,
    user: req.session.user
  });
});

app.get('/admin/participants', isAuthenticated, (req, res) => {
  res.render('admin/participants', { 
    title: 'Manage Participants - Admin Panel',
    participants,
    user: req.session.user
  });
});

app.get('/admin/reports', isAuthenticated, (req, res) => {
  res.render('admin/reports', { 
    title: 'Reports - Admin Panel',
    activities,
    user: req.session.user
  });
});

app.get('/admin/settings', isAuthenticated, (req, res) => {
  res.render('admin/settings', { 
    title: 'Settings - Admin Panel',
    user: req.session.user
  });
});

// ==================== ACTIVITY CRUD ROUTES ====================
app.get('/admin/activity/add', isAuthenticated, (req, res) => {
  res.render('admin/activity-form', { 
    title: 'Add Activity - Admin Panel',
    activity: null,
    activities: activities,
    departments,
    user: req.session.user
  });
});

app.get('/admin/activity/edit/:id', isAuthenticated, (req, res) => {
  const activity = activities.find(a => a.id === parseInt(req.params.id));
  res.render('admin/activity-form', { 
    title: 'Edit Activity - Admin Panel',
    activity,
    activities: activities,
    departments,
    user: req.session.user
  });
});

app.get('/admin/activity/view/:id', isAuthenticated, (req, res) => {
  const activity = activities.find(a => a.id === parseInt(req.params.id));
  res.render('admin/activity-view', { 
    title: 'View Activity - Admin Panel',
    activity,
    user: req.session.user
  });
});

app.post('/admin/activity/save', isAuthenticated, (req, res) => {
  const { id, title, activityNumber, category, department, date, coordinator, startTime, endTime, location, sector, status, priority, expectedAttendance, budget, description, resources } = req.body;
  
  if (id) {
    const index = activities.findIndex(a => a.id === parseInt(id));
    if (index !== -1) {
      activities[index] = {
        ...activities[index],
        title,
        activityNumber,
        category,
        department,
        date,
        coordinator,
        startTime,
        endTime,
        location,
        sector: sector || activities[index].sector,
        status,
        priority,
        expectedAttendance: parseInt(expectedAttendance) || 0,
        budget: budget || activities[index].budget,
        description: description || activities[index].description,
        resources: resources || activities[index].resources,
        updatedAt: new Date().toISOString().split('T')[0]
      };
    }
  } else {
    const newActivity = {
      id: activities.length + 1,
      activityNumber: activityNumber || `KDA-2026-00${activities.length + 1}`,
      title,
      category,
      department,
      date,
      coordinator,
      startTime,
      endTime,
      location,
      sector: sector || '',
      cell: '',
      status,
      priority,
      expectedAttendance: parseInt(expectedAttendance) || 0,
      actualAttendance: 0,
      participants: 0,
      budget: budget || '0 RWF',
      description: description || '',
      resources: resources || '',
      progress: status === 'Completed' ? 100 : 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    activities.push(newActivity);
  }
  
  res.redirect('/admin/activities');
});

app.post('/admin/activity/delete/:id', isAuthenticated, (req, res) => {
  const index = activities.findIndex(a => a.id === parseInt(req.params.id));
  if (index !== -1) {
    activities.splice(index, 1);
  }
  res.redirect('/admin/activities');
});

app.post('/admin/activity/status/:id', isAuthenticated, (req, res) => {
  const activity = activities.find(a => a.id === parseInt(req.params.id));
  if (activity) {
    const statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled', 'Upcoming'];
    const currentIndex = statuses.indexOf(activity.status);
    activity.status = statuses[(currentIndex + 1) % statuses.length];
    if (activity.status === 'Completed') {
      activity.progress = 100;
    } else if (activity.status === 'Cancelled') {
      activity.progress = 0;
    } else {
      activity.progress = Math.min(activity.progress + 25, 95);
    }
    activity.updatedAt = new Date().toISOString().split('T')[0];
  }
  res.redirect('/admin/activities');
});

// ==================== DEPARTMENT CRUD ROUTES ====================
app.get('/admin/department/add', isAuthenticated, (req, res) => {
  res.render('admin/department-form', { 
    title: 'Add Department - Admin Panel',
    department: null,
    user: req.session.user
  });
});

app.get('/admin/department/edit/:id', isAuthenticated, (req, res) => {
  const department = departments.find(d => d.id === parseInt(req.params.id));
  res.render('admin/department-form', { 
    title: 'Edit Department - Admin Panel',
    department,
    user: req.session.user
  });
});

app.post('/admin/department/save', isAuthenticated, (req, res) => {
  const { id, name, head, staff } = req.body;
  
  if (id) {
    const index = departments.findIndex(d => d.id === parseInt(id));
    if (index !== -1) {
      departments[index] = {
        ...departments[index],
        name,
        head: head || 'Not Assigned',
        staff: parseInt(staff) || 0
      };
    }
  } else {
    const newDepartment = {
      id: departments.length + 1,
      name,
      head: head || 'Not Assigned',
      staff: parseInt(staff) || 0
    };
    departments.push(newDepartment);
  }
  
  res.redirect('/admin/departments');
});

app.post('/admin/department/delete/:id', isAuthenticated, (req, res) => {
  const index = departments.findIndex(d => d.id === parseInt(req.params.id));
  if (index !== -1) {
    departments.splice(index, 1);
  }
  res.redirect('/admin/departments');
});

// ==================== PARTICIPANT CRUD ROUTES ====================
app.get('/admin/participant/add', isAuthenticated, (req, res) => {
  res.render('admin/participant-form', { 
    title: 'Add Participant - Admin Panel',
    participant: null,
    user: req.session.user
  });
});

app.get('/admin/participant/edit/:id', isAuthenticated, (req, res) => {
  const participant = participants.find(p => p.id === parseInt(req.params.id));
  res.render('admin/participant-form', { 
    title: 'Edit Participant - Admin Panel',
    participant,
    user: req.session.user
  });
});

app.post('/admin/participant/save', isAuthenticated, (req, res) => {
  const { id, name, institution, position, phone, email, gender } = req.body;
  
  if (id) {
    const index = participants.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      participants[index] = {
        ...participants[index],
        name,
        institution: institution || 'Not Specified',
        position: position || 'Not Specified',
        phone: phone || 'N/A',
        email: email || 'N/A',
        gender: gender || 'Not Specified'
      };
    }
  } else {
    const newParticipant = {
      id: participants.length + 1,
      name,
      institution: institution || 'Not Specified',
      position: position || 'Not Specified',
      phone: phone || 'N/A',
      email: email || 'N/A',
      gender: gender || 'Not Specified'
    };
    participants.push(newParticipant);
  }
  
  res.redirect('/admin/participants');
});

app.post('/admin/participant/delete/:id', isAuthenticated, (req, res) => {
  const index = participants.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    participants.splice(index, 1);
  }
  res.redirect('/admin/participants');
});

// Static files
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
  console.log('✅ Kicukiro District Activity Management System');
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🔐 Admin Panel: http://localhost:${PORT}/admin/login`);
  console.log('📋 System is ready!');
});
