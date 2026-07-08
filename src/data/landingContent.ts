export const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4'

export const TOTAL_STUDY_SECONDS = 25 * 60

export const NAV_ITEMS = [
  { label: 'Home', href: '#', active: true },
  { label: 'Courses', href: '#courses', active: false },
  { label: 'How it works', href: '#process', active: false },
  { label: 'Programs', href: '#stories', active: false },
  { label: 'FAQ', href: '#faq', active: false },
] as const

export const ASSIGNMENTS = [
  { tag: 'DUE', title: 'Digital basics project', meta: 'Submit by Friday' },
  { tag: 'GRADED', title: 'English practice quiz', meta: '92% / Reviewed by mentor' },
  { tag: 'NEW', title: 'Career skills module', meta: 'Just unlocked' },
  { tag: 'DUE', title: 'Entrepreneurship worksheet', meta: 'Due tomorrow' },
  { tag: 'GRADED', title: 'Computer literacy task', meta: '88% / 2 comments' },
] as const

export const SCHEDULE_ITEMS = [
  { time: '08:30', label: "Review yesterday's module", completedAtTick: 0 },
  { time: '09:00', label: 'Watch module / Digital skills', completedAtTick: 0 },
  { time: '15:30', label: 'Practice task / 30 min', completedAtTick: 1 },
  { time: '17:00', label: 'Mentor feedback / online', completedAtTick: 2 },
  { time: '19:30', label: 'Reflect and plan tomorrow', completedAtTick: 3 },
] as const

export const NOTE_PHRASES = [
  'learn skills you can use in real life',
  'strong courses should be easy to access',
  'practice today, grow tomorrow',
  'mentors turn questions into progress',
] as const

export const MARQUEE_WORDS = ['Explore', 'Learn', 'Practice', 'Mentor', 'Certify', 'Grow'] as const

export const COURSE_ITEMS = [
  {
    number: '01',
    title: 'Practical Course Catalog',
    description: 'Zerek Bala publishes structured online courses that help learners build useful knowledge and real-world skills.',
  },
  {
    number: '02',
    title: 'Online Learning Paths',
    description: 'Learners study modules, complete assignments, and move through each course in a clear step-by-step format.',
  },
  {
    number: '03',
    title: 'Teacher & Mentor Support',
    description: 'Courses can include self-paced study, teacher sessions, mentor feedback, and guided practice when support is needed.',
  },
  {
    number: '04',
    title: 'Progress & Certificates',
    description: 'Participants can track progress, submit work, earn completion proof, and build confidence course by course.',
  },
] as const

export const PROCESS_STEPS = [
  {
    number: 'I',
    title: 'Choose',
    description: 'Browse available courses and choose the learning path that matches your goals, schedule, and current skill level.',
  },
  {
    number: 'II',
    title: 'Learn',
    description: 'Learners study online, complete tasks, meet teachers or mentors when needed, and keep moving through a clear path.',
  },
  {
    number: 'III',
    title: 'Grow',
    description: 'Complete modules, earn proof of progress, and use new skills for study, work, personal growth, or team development.',
  },
] as const

export const PROGRAM_ITEMS = [
  { tag: 'Program 001', title: 'Free learning access for communities.', meta: 'Learners / access' },
  { tag: 'Program 002', title: 'Structured courses from Zerek Bala.', meta: 'Course catalog / quality' },
  { tag: 'Program 003', title: 'Learning tools for teams and partners.', meta: 'Organizations / training' },
] as const

export const TESTIMONIALS = [
  {
    quote: 'Accessible courses help learners start building useful skills without waiting for expensive programs or distant institutions.',
    author: 'Learners',
    role: 'Free course access',
    initial: 'L',
    mark: 'Accessible learning',
  },
  {
    quote: 'Structured modules, assignments, and mentor support make online learning easier to follow from start to finish.',
    author: 'Course team',
    role: 'Learning design',
    initial: 'C',
    mark: 'Guided progress',
  },
  {
    quote: 'The same platform can support individual learners, community programs, partner organizations, and company training.',
    author: 'Partners',
    role: 'Organizations and teams',
    initial: 'P',
    mark: 'Flexible LMS',
  },
] as const

export const FAQ_ITEMS = [
  {
    question: 'Who is the platform for?',
    answer:
      'Zerek Bala is for learners who want practical online courses, including teenagers, young adults, job seekers, community members, employees, and teams.',
  },
  {
    question: 'Is it free?',
    answer:
      'Selected courses are available for free so learners can start building skills with fewer barriers. Course availability and access terms may vary by program.',
  },
  {
    question: 'How do courses work?',
    answer:
      'Learners enroll in a course, study online modules, complete tasks, and receive teacher or mentor support when the course format includes guided learning.',
  },
  {
    question: 'Who creates the courses?',
    answer: 'Courses are created and published by Zerek Bala, with a focus on clear structure, practical learning outcomes, and support for learners.',
  },
  {
    question: 'Can organizations use the platform?',
    answer:
      'Yes. Zerek Bala can support organizations that want online learning, employee training, partner education, or structured courses for their communities.',
  },
] as const

export const FOOTER_COLUMNS = [
  { heading: 'Platform', links: ['Home', 'Courses', 'Programs', 'Contact'] },
  { heading: 'Learning', links: ['Online Modules', 'Assignments', 'Mentors', 'Certificates'] },
  { heading: 'Organizations', links: ['Team Training', 'Partner Courses', 'Employee Learning', 'Support'] },
] as const

export const PROGRESS_METRICS = [
  { label: 'Study hrs', value: '4.2' },
  { label: 'Avg score', value: '91%' },
  { label: 'Modules', value: '48' },
] as const

export const CASE_CLOCK_STATS = [
  { value: '+2.1h', label: 'focused study / day' },
  { value: '-41%', label: 'cramming nights' },
] as const

export const CASE_SCORE_STATS = [
  { value: '+38', label: 'points' },
  { value: 'x2.4', label: 'confidence' },
] as const

export const CASE_HOMEWORK_STATS = [
  { value: '0', label: 'overdue this week' },
  { value: '23', label: 'day streak' },
] as const

export const HOMEWORK_BARS = [18, 22, 14, 6, 3, 2, 1] as const

export const EQUALIZER_BARS = [0.3, 0.6, 0.9, 0.5, 0.7, 0.4] as const
