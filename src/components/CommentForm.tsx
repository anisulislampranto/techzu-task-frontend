import React, { useState } from 'react';

export default function CommentForm() {
    const [text, setText] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        console.log('e', e);
    };

    return (
        <form onSubmit={onSubmit}>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <button type="submit">Add comment</button>
        </form>
    );
}
