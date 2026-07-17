import { Message, Channel, User } from '../types';

// ── Current user ──────────────────────────────────────────────────────
export const currentUser: User = {
  id: 'user-khaled',
  username: 'Khaled',
  color: '#6366f1',
  status: 'online',
};

// ── Bot users ─────────────────────────────────────────────────────────
export const botUsers: User[] = [
  { id: 'user-sara', username: 'Sara', color: '#10b981', status: 'online' },
  { id: 'user-omar', username: 'Omar', color: '#f59e0b', status: 'online' },
  { id: 'user-lina', username: 'Lina', color: '#f43f5e', status: 'idle' },
  { id: 'user-ahmed', username: 'Ahmed', color: '#06b6d4', status: 'online' },
  { id: 'user-noor', username: 'Noor', color: '#a855f7', status: 'dnd' },
];

export const allUsers: User[] = [currentUser, ...botUsers];

// ── Channels ──────────────────────────────────────────────────────────
export const defaultChannels: Channel[] = [
  { id: 'general', name: 'general', icon: '💬', description: 'General team discussion', unreadCount: 0 },
  { id: 'development', name: 'development', icon: '💻', description: 'Dev talk, PRs, and code reviews', unreadCount: 0 },
  { id: 'design', name: 'design', icon: '🎨', description: 'UI/UX design discussions', unreadCount: 0 },
  { id: 'random', name: 'random', icon: '🎲', description: 'Off-topic fun and memes', unreadCount: 0 },
  { id: 'announcements', name: 'announcements', icon: '📢', description: 'Important team announcements', unreadCount: 0 },
];

// ── Helper to create message timestamps going backwards from "now" ───
function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString();
}

// ── Initial messages (20+ across channels) ───────────────────────────
export const initialMessages: Message[] = [
  // ── #general ──
  {
    id: 'msg-1',
    channelId: 'general',
    userId: 'user-sara',
    username: 'Sara',
    color: '#10b981',
    text: 'Good morning team! 🌅 Hope everyone had a good weekend.',
    timestamp: minutesAgo(120),
    reactions: { '👋': ['Omar', 'Lina', 'Ahmed'] },
  },
  {
    id: 'msg-2',
    channelId: 'general',
    userId: 'user-omar',
    username: 'Omar',
    color: '#f59e0b',
    text: 'Morning! Ready for sprint planning at 11?',
    timestamp: minutesAgo(118),
    reactions: {},
  },
  {
    id: 'msg-3',
    channelId: 'general',
    userId: 'user-ahmed',
    username: 'Ahmed',
    color: '#06b6d4',
    text: 'Yep, I updated the Jira board last night. We have 14 story points carried over from last sprint.',
    timestamp: minutesAgo(115),
    reactions: { '👍': ['Sara'] },
  },
  {
    id: 'msg-4',
    channelId: 'general',
    userId: 'user-lina',
    username: 'Lina',
    color: '#f43f5e',
    text: 'Can we also discuss the new onboarding flow? I have the mockups ready.',
    timestamp: minutesAgo(110),
    reactions: { '🔥': ['Khaled', 'Sara'] },
  },
  {
    id: 'msg-5',
    channelId: 'general',
    userId: 'user-noor',
    username: 'Noor',
    color: '#a855f7',
    text: 'Just pushed a hotfix for the login timeout issue. Should be on staging now.',
    timestamp: minutesAgo(90),
    reactions: { '🚀': ['Omar', 'Ahmed', 'Sara'] },
  },

  // ── #development ──
  {
    id: 'msg-6',
    channelId: 'development',
    userId: 'user-ahmed',
    username: 'Ahmed',
    color: '#06b6d4',
    text: 'PR #247 is up for review — refactored the auth middleware to use JWT refresh tokens. Would appreciate a second pair of eyes 👀',
    timestamp: minutesAgo(100),
    reactions: {},
  },
  {
    id: 'msg-7',
    channelId: 'development',
    userId: 'user-noor',
    username: 'Noor',
    color: '#a855f7',
    text: "I'll take a look after lunch. Did you update the integration tests?",
    timestamp: minutesAgo(95),
    reactions: {},
  },
  {
    id: 'msg-8',
    channelId: 'development',
    userId: 'user-ahmed',
    username: 'Ahmed',
    color: '#06b6d4',
    text: 'Yeah, all 34 tests passing. Also added coverage for the edge case Sara found last week.',
    timestamp: minutesAgo(93),
    reactions: { '✅': ['Noor'] },
  },
  {
    id: 'msg-9',
    channelId: 'development',
    userId: 'user-sara',
    username: 'Sara',
    color: '#10b981',
    text: 'Nice! Also heads up — I noticed our bundle size jumped 12% after the chart library update. We might want to lazy-load that module.',
    timestamp: minutesAgo(80),
    reactions: { '💡': ['Ahmed', 'Omar'] },
  },
  {
    id: 'msg-10',
    channelId: 'development',
    userId: 'user-omar',
    username: 'Omar',
    color: '#f59e0b',
    text: 'Good catch. I can add dynamic imports for the dashboard charts. Should shave off ~180kb from initial load.',
    timestamp: minutesAgo(75),
    reactions: {},
  },
  {
    id: 'msg-11',
    channelId: 'development',
    userId: 'user-omar',
    username: 'Omar',
    color: '#f59e0b',
    text: 'Also, has anyone tried the new Vite 6 features? The HMR is significantly faster.',
    timestamp: minutesAgo(60),
    reactions: { '👀': ['Sara'] },
  },

  // ── #design ──
  {
    id: 'msg-12',
    channelId: 'design',
    userId: 'user-lina',
    username: 'Lina',
    color: '#f43f5e',
    text: 'Uploaded the new dashboard wireframes to Figma. Check the "v3.2" page. I went with the card-based layout we discussed.',
    timestamp: minutesAgo(85),
    reactions: { '🎨': ['Sara', 'Khaled'] },
  },
  {
    id: 'msg-13',
    channelId: 'design',
    userId: 'user-sara',
    username: 'Sara',
    color: '#10b981',
    text: 'Love the spacing! One thing — can we make the sidebar collapsible on tablet breakpoints? The content area feels cramped at 768px.',
    timestamp: minutesAgo(82),
    reactions: {},
  },
  {
    id: 'msg-14',
    channelId: 'design',
    userId: 'user-lina',
    username: 'Lina',
    color: '#f43f5e',
    text: "Great point. I'll add a hamburger toggle for tablets. Also thinking we should use a bottom nav on mobile instead of the sidebar.",
    timestamp: minutesAgo(78),
    reactions: { '👍': ['Sara', 'Omar'] },
  },
  {
    id: 'msg-15',
    channelId: 'design',
    userId: 'user-noor',
    username: 'Noor',
    color: '#a855f7',
    text: 'The color contrast on the secondary buttons might not meet WCAG AA. Can we bump the text to at least #d1d5db?',
    timestamp: minutesAgo(50),
    reactions: { '♿': ['Lina'] },
  },

  // ── #random ──
  {
    id: 'msg-16',
    channelId: 'random',
    userId: 'user-omar',
    username: 'Omar',
    color: '#f59e0b',
    text: "Just discovered you can mass-rename variables in VS Code with F2. Where has this been all my life? 😂",
    timestamp: minutesAgo(70),
    reactions: { '😂': ['Sara', 'Ahmed', 'Lina'] },
  },
  {
    id: 'msg-17',
    channelId: 'random',
    userId: 'user-sara',
    username: 'Sara',
    color: '#10b981',
    text: "Wait till you discover multi-cursor editing. Ctrl+D is a game changer.",
    timestamp: minutesAgo(68),
    reactions: {},
  },
  {
    id: 'msg-18',
    channelId: 'random',
    userId: 'user-ahmed',
    username: 'Ahmed',
    color: '#06b6d4',
    text: 'Anyone up for team lunch tomorrow? That new shawarma place opened near the office 🌯',
    timestamp: minutesAgo(40),
    reactions: { '🌯': ['Omar', 'Sara', 'Lina', 'Noor'] },
  },

  // ── #announcements ──
  {
    id: 'msg-19',
    channelId: 'announcements',
    userId: 'user-noor',
    username: 'Noor',
    color: '#a855f7',
    text: '📋 Sprint 14 Retrospective notes are in Confluence. Key takeaway: we need to improve our PR review turnaround — average was 2.3 days last sprint.',
    timestamp: minutesAgo(200),
    reactions: { '📝': ['Khaled', 'Sara', 'Omar'] },
  },
  {
    id: 'msg-20',
    channelId: 'announcements',
    userId: 'user-sara',
    username: 'Sara',
    color: '#10b981',
    text: '🎉 Big win! Our performance optimization reduced API response times by 40%. Lighthouse score is now 96. Great work everyone!',
    timestamp: minutesAgo(150),
    reactions: { '🎉': ['Khaled', 'Omar', 'Lina', 'Ahmed', 'Noor'], '🚀': ['Ahmed', 'Omar'] },
  },
  {
    id: 'msg-21',
    channelId: 'announcements',
    userId: 'user-ahmed',
    username: 'Ahmed',
    color: '#06b6d4',
    text: '🔒 Reminder: Please enable 2FA on your GitHub accounts by EOD Friday. IT will be auditing access next week.',
    timestamp: minutesAgo(30),
    reactions: { '👍': ['Sara', 'Noor'] },
  },
];

// ── Bot response templates per channel ────────────────────────────────
export const botResponses: Record<string, string[]> = {
  general: [
    "Sounds good! Let's sync up after the standup.",
    "I'll add that to the sprint backlog 📝",
    "Has anyone checked the monitoring dashboard today? CPU usage looked high this morning.",
    "Quick reminder: team retro is at 4pm today!",
    "Agreed. Let's prioritize that for this sprint.",
    "I just updated the docs with the new API endpoints.",
    "Can we get a quick review on the deployment checklist?",
    "Nice work! That was a tricky one to debug.",
    "Let me loop in the product team on that decision.",
    "The staging environment is back up — false alarm on the alert.",
  ],
  development: [
    "Just ran the benchmark — 3x improvement on the query optimizer 🚀",
    "I'd suggest using `useMemo` there to avoid unnecessary re-renders.",
    "The TypeScript strict mode caught 12 potential null reference bugs. Worth enabling!",
    "Pushed a fix for the race condition in the WebSocket handler.",
    "Can we add some unit tests before merging? Coverage is at 78%.",
    "The new ESLint rules are catching a lot of dead code. Good call on adding them.",
    "I refactored the database queries — down from 23ms to 8ms average.",
    "Docker build is failing on CI. Looks like a Node version mismatch.",
    "Anyone else seeing flaky tests on the auth module? Passes locally but fails in CI.",
    "Just migrated the config to environment variables. No more hardcoded secrets 🔐",
  ],
  design: [
    "I updated the component library in Figma with the new tokens.",
    "The micro-interactions on the form submission feel really polished now ✨",
    "Should we use a modal or a slide-over panel for the settings?",
    "I'm leaning towards the 8px grid system for consistency.",
    "The dark mode palette needs a bit more contrast on the disabled states.",
    "Added loading skeletons for all the data-heavy pages.",
    "What do you think about adding subtle parallax to the landing hero?",
    "The icon set is finalized — 240 icons, all SVG optimized.",
    "I ran a usability test with 5 users. The navigation scored 4.2/5 🎯",
    "Let's keep the border-radius consistent — 8px for cards, 12px for modals.",
  ],
  random: [
    "Just found an amazing VS Code extension for Git visualization 😮",
    "Who broke the coffee machine again? ☕",
    "TIL: JavaScript was created in 10 days. And it shows sometimes 😂",
    "The new mechanical keyboard arrived. Cherry MX Browns — chef's kiss 🤌",
    "Anyone watching the new tech documentary on Netflix?",
    "I automated my morning standup notes with a script. Peak laziness achieved 🏆",
    "Hot take: tabs > spaces. Fight me.",
    "The office plant is dying again. Who forgot to water it? 🌱",
    "Friday playlist suggestions? I need coding music 🎵",
    "Just realized I've mass mass mass committed to main. Don't tell anyone 🤫",
  ],
  announcements: [
    "📊 Weekly metrics are in — DAU up 15% from last week!",
    "🛡️ Security patch deployed to production. All systems nominal.",
    "📅 Q3 planning kickoff is next Monday at 10am. Please review the pre-read.",
    "🎯 New OKRs are published in Notion. Please add your key results by Friday.",
    "🏆 Shoutout to the backend team for zero-downtime deployment!",
    "📦 Version 3.2.0 shipped to production. Release notes in Confluence.",
    "⚠️ Scheduled maintenance window: Saturday 2am-4am UTC.",
    "🤝 Welcome aboard! We have a new team member joining next week.",
  ],
};

// Fix the typo in random responses
botResponses.random[9] = "Just realized I've been mass committing to main. Don't tell anyone 🤫";
