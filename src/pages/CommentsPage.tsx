import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';

export default function CommentsPage() {

    return (
        <div>
            <h2>Comments</h2>
            <CommentForm />
            {/* <CommentList pageId={pageId} /> */}
        </div>
    );
}
