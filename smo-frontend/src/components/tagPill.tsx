import type { QuestionTag } from '../types';

interface TagPillProps {
    questionTag: QuestionTag;
    onRemove?: (name: string) => void;
}

function TagPill({ questionTag, onRemove }: TagPillProps) {
    return (
        <span className="tag">
            {questionTag.tag.name}
            {onRemove && (
                <button
                    type="button"
                    className="tag-remove"
                    aria-label={`remove ${questionTag.tag.name}`}
                    onClick={() => onRemove(questionTag.tag.name)}
                >
                    ×
                </button>
            )}
        </span>
    );
}

export default TagPill;
