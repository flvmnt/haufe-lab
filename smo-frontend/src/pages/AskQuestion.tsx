import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import TagPill from '../components/tagPill';

function normalizeTag(raw: string): string {
    return raw.trim().toLowerCase().replace(/\s+/g, '-');
}

interface FormErrors {
    title?: string;
    description?: string;
}

function AskQuestion() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});

    function addTag(raw: string) {
        const normalized = normalizeTag(raw);
        if (!normalized) return;
        setTags((prev) => (prev.includes(normalized) ? prev : [...prev, normalized]));
        setTagInput('');
    }

    function handleTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(tagInput);
        }
    }

    function handleRemoveTag(name: string) {
        setTags((prev) => prev.filter((t) => t !== name));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const next: FormErrors = {};
        if (!title.trim()) {
            next.title = 'title is required';
        }
        if (description.trim().length < 20) {
            next.description = 'description must be at least 20 characters';
        }
        setErrors(next);
        if (Object.keys(next).length === 0) {
            console.log({ title, description, tags });
        }
    }

    return (
        <article className="question-detail ask-question">
            <Link to="/" className="back-link">back to questions</Link>

            <header className="question-header">
                <h1 className="question-detail-title">ask a question</h1>
                <div className="question-detail-meta">
                    be specific, and share what you've already tried.
                </div>
            </header>

            <form className="ask-form" onSubmit={handleSubmit} noValidate>
                <label className="ask-label">
                    <span>title</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="how do I ..."
                    />
                    {errors.title && <span className="field-error">{errors.title}</span>}
                </label>

                <label className="ask-label">
                    <span>description</span>
                    <textarea
                        rows={10}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="markdown is supported. describe what you've tried and what didn't work."
                    />
                    {errors.description && (
                        <span className="field-error">{errors.description}</span>
                    )}
                </label>

                <label className="ask-label">
                    <span>tags</span>
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder="press enter or comma to add"
                    />
                    {tags.length > 0 && (
                        <div className="question-tags ask-tag-list">
                            {tags.map((name) => (
                                <TagPill
                                    key={name}
                                    questionTag={{ tag: { name } }}
                                    onRemove={handleRemoveTag}
                                />
                            ))}
                        </div>
                    )}
                </label>

                <button type="submit" className="btn btn-primary ask-submit">
                    post your question
                </button>
            </form>
        </article>
    );
}

export default AskQuestion;
