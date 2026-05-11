import type { Answer, Comment, Question, QuestionSummary, Tag } from './types';

const users = {
    ada: { id: 'u-001', username: 'ada' },
    linus: { id: 'u-002', username: 'linus' },
    grace: { id: 'u-003', username: 'grace' },
    margaret: { id: 'u-004', username: 'margaret' },
    aiBot: { id: 'u-bot', username: 'smo-ai' },
};

const tags: Record<string, Tag> = {
    react: { name: 'react' },
    typescript: { name: 'typescript' },
    vite: { name: 'vite' },
    css: { name: 'css' },
    hooks: { name: 'react-hooks' },
    routing: { name: 'react-router' },
};

export const questionSummaries: QuestionSummary[] = [
    {
        id: 'q-001',
        title: 'Why does my useEffect run twice in development?',
        is_solved: true,
        vote_count: 42,
        created_at: '2026-05-04T09:21:00.000Z',
        author: users.ada,
        question_tags: [{ tag: tags.react }, { tag: tags.hooks }],
        answer_count: 3,
    },
    {
        id: 'q-002',
        title: 'How do I type a generic React component with forwardRef?',
        is_solved: false,
        vote_count: 17,
        created_at: '2026-05-06T14:08:00.000Z',
        author: users.linus,
        question_tags: [{ tag: tags.react }, { tag: tags.typescript }],
        answer_count: 1,
    },
    {
        id: 'q-003',
        title: 'Vite HMR loses state after editing a context provider',
        is_solved: false,
        vote_count: 8,
        created_at: '2026-05-09T18:45:00.000Z',
        author: users.grace,
        question_tags: [{ tag: tags.vite }, { tag: tags.react }],
        answer_count: 0,
    },
    {
        id: 'q-004',
        title: 'Centering a div in 2026: what is the current best practice?',
        is_solved: true,
        vote_count: 123,
        created_at: '2026-04-28T11:02:00.000Z',
        author: users.margaret,
        question_tags: [{ tag: tags.css }],
        answer_count: 6,
    },
    {
        id: 'q-005',
        title: 'react-router v7 data loaders: when to prefer loader vs useEffect',
        is_solved: false,
        vote_count: 24,
        created_at: '2026-05-10T07:30:00.000Z',
        author: users.ada,
        question_tags: [{ tag: tags.routing }, { tag: tags.react }],
        answer_count: 2,
    },
];

const q001Comments: Comment[] = [
    {
        id: 'c-001',
        body: 'Are you on React 18 or 19? The double-invoke behavior changed.',
        target_id: 'q-001',
        target_type: 'question',
        created_at: '2026-05-04T09:45:00.000Z',
        author: { username: 'linus' },
    },
    {
        id: 'c-002',
        body: 'React 19, with Strict Mode on.',
        target_id: 'q-001',
        target_type: 'question',
        created_at: '2026-05-04T10:02:00.000Z',
        author: { username: 'ada' },
    },
];

const q001Answers: Answer[] = [
    {
        id: 'a-001',
        body: 'Strict Mode intentionally mounts components twice in development to surface effects that are not idempotent. Move setup into the effect and return a cleanup function. Once you do, the double-run becomes harmless.',
        question_id: 'q-001',
        author_id: users.grace.id,
        vote_count: 38,
        is_accepted: true,
        is_ai_generated: false,
        created_at: '2026-05-04T10:30:00.000Z',
        author: users.grace,
        comments: [
            {
                id: 'c-003',
                body: 'This was the fix. Adding the cleanup made the duplicate request go away.',
                target_id: 'a-001',
                target_type: 'answer',
                created_at: '2026-05-04T11:15:00.000Z',
                author: { username: 'ada' },
            },
        ],
    },
    {
        id: 'a-002',
        body: 'You can disable Strict Mode in main.tsx, but I would not recommend it. You will just hide other bugs of the same shape.',
        question_id: 'q-001',
        author_id: users.linus.id,
        vote_count: 5,
        is_accepted: false,
        is_ai_generated: false,
        created_at: '2026-05-04T12:10:00.000Z',
        author: users.linus,
        comments: [],
    },
    {
        id: 'a-003',
        body: 'In React 18+ with Strict Mode, components mount, unmount, and remount in development. Any effect that fires a side-effect (network request, subscription, timer) must be paired with a cleanup function. If your effect runs twice and the second run causes a problem, that is a signal the effect is not safe to re-run. Fix it with cleanup rather than by disabling Strict Mode.',
        question_id: 'q-001',
        author_id: users.aiBot.id,
        vote_count: 12,
        is_accepted: false,
        is_ai_generated: true,
        created_at: '2026-05-04T09:25:00.000Z',
        author: users.aiBot,
        comments: [],
    },
];

export const question: Question = {
    id: 'q-001',
    title: 'Why does my useEffect run twice in development?',
    description:
        'I just upgraded to React 19 and noticed that my useEffect hook fires twice on mount when running `npm run dev`. In production builds it only fires once. I am calling an analytics endpoint inside the effect and I am now getting duplicate events. What is going on, and is the fix to disable Strict Mode?',
    author_id: users.ada.id,
    is_solved: true,
    allow_ai_companion: true,
    vote_count: 42,
    created_at: '2026-05-04T09:21:00.000Z',
    author: users.ada,
    question_tags: [{ tag: tags.react }, { tag: tags.hooks }],
    answers: q001Answers,
    comments: q001Comments,
};

export const questionsById: Record<string, Question> = {
    [question.id]: question,
};
