import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';

export default function CommentsPage() {
    const { pageId } = useParams<{ pageId: string }>();

    if (!pageId) return <div>No pageId</div>;

    return (
        <div>
            <h2>Comments for: {pageId}</h2>
            <CommentForm pageId={pageId} />
            {/* <CommentList pageId={pageId} /> */}
        </div>
    );
}
