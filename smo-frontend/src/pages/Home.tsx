import { questionSummaries } from '../mocks';
import QuestionCard from '../components/QuestionCard';

function Home() {
    return (
        <ul className="question-list">
            {questionSummaries.map((q) => (
                <QuestionCard key={q.id} question={q} />
            ))}
        </ul>
    );
}

export default Home;
