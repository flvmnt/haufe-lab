import { Link, useParams } from 'react-router-dom';
import { questionsById } from '../mocks';
import TagPill from '../components/tagPill';

function QuestionDetail() {
    const { id } = useParams<{ id: string }>();
    const question = id ? questionsById[id] : undefined;

    if (!question) {
        return (
            <div className="not-found">
                <p>Question not found.</p>
                <Link to="/" className="back-link">back to questions</Link>
            </div>
        );
    }

    return (
        <article className="question-detail">
            <Link to="/" className="back-link">back to questions</Link>

            <header className="question-header">
                <h1 className="question-detail-title">{question.title}</h1>
                <div className="question-detail-meta">
                    asked by <span className="handle">@{question.author?.username ?? 'anonymous'}</span>
                    {question.is_solved && <span className="solved">solved</span>}
                </div>
            </header>

            <section className="question-block">
                <div className="vote-rail">
                    <strong>{question.vote_count}</strong>
                    <span>votes</span>
                </div>
                <div className="block-content">
                    <p className="block-body">{question.description}</p>
                    <div className="question-tags">
                        {question.question_tags.map((qt) => (
                            <TagPill key={qt.tag.name} questionTag={qt} />
                        ))}
                    </div>
                    {question.comments.length > 0 && (
                        <ul className="comment-list">
                            {question.comments.map((c) => (
                                <li key={c.id} className="comment">
                                    <span className="comment-body">{c.body}</span>
                                    <span className="handle"> · @{c.author?.username ?? 'anonymous'}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>

            <section className="answers-section">
                <h2 className="answers-heading">{question.answers.length} answers</h2>
                <ul className="answer-list">
                    {question.answers.map((a) => (
                        <li
                            key={a.id}
                            className={`answer${a.is_accepted ? ' answer-accepted' : ''}`}
                        >
                            <div className="vote-rail">
                                <strong>{a.vote_count}</strong>
                                <span>votes</span>
                            </div>
                            <div className="block-content">
                                <p className="block-body">{a.body}</p>
                                <div className="answer-author">
                                    answered by{' '}
                                    <span className="handle">
                                        @{a.author?.username ?? 'anonymous'}
                                    </span>
                                    {a.is_accepted && <span className="solved">accepted</span>}
                                    {a.is_ai_generated && <span className="ai-chip">ai</span>}
                                </div>
                                {a.comments.length > 0 && (
                                    <ul className="comment-list">
                                        {a.comments.map((c) => (
                                            <li key={c.id} className="comment">
                                                <span className="comment-body">{c.body}</span>
                                                <span className="handle"> · @{c.author?.username ?? 'anonymous'}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
}

export default QuestionDetail;
