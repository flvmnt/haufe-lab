import { questionSummaries } from '../mocks';
import TagPill from '../components/tagPill';

function Home() {
    return (
        <>
            <ul className="question-list">
                {questionSummaries.map((q) => (
                    <li key={q.id} className="question-item">
                        <div className="question-meta">
                            <span className="votes">
                                <strong>{q.vote_count}</strong>votes
                            </span>
                            <span className="answers">
                                <strong>{q.answer_count}</strong>answers
                            </span>
                        </div>
                        <div className="question-body">
                            <h2 className="question-title">{q.title}</h2>
                            <div className="question-tags">
                                {q.question_tags.map((qt) => (
                                    <TagPill key={qt.tag.name} questionTag={qt} />
                                ))}
                            </div>
                            <div className="question-author">
                                asked by <span className="handle">@{q.author?.username ?? 'anonymous'}</span>
                                {q.is_solved && <span className="solved">solved</span>}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Home;
