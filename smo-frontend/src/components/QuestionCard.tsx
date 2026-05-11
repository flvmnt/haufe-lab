import { useNavigate } from 'react-router-dom';
import type { QuestionSummary } from '../types';
import TagPill from './tagPill';

interface QuestionCardProps {
    question: QuestionSummary;
}

function QuestionCard({ question }: QuestionCardProps) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/q/${question.id}`);
    };

    return (
        <li className="question-item" onClick={handleClick}>
            <div className="question-meta">
                <span className="votes">
                    <strong>{question.vote_count}</strong>votes
                </span>
                <span className="answers">
                    <strong>{question.answer_count}</strong>answers
                </span>
            </div>
            <div className="question-body">
                <h2 className="question-title">{question.title}</h2>
                <div className="question-tags">
                    {question.question_tags.map((qt) => (
                        <TagPill key={qt.tag.name} questionTag={qt} />
                    ))}
                </div>
                <div className="question-author">
                    asked by <span className="handle">@{question.author?.username ?? 'anonymous'}</span>
                    {question.is_solved && <span className="solved">solved</span>}
                </div>
            </div>
        </li>
    );
}

export default QuestionCard;
