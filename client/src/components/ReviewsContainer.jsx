import MovieReviews from './MovieReviews';
import Wrapper from '../assets/wrappers/ReviewsContainer';
import { useAllReviewsContext } from '../pages/AllReviews';
import PageBtnContainer from './PageBtnContainer';

const ReviewsContainer = () => {
    const { data } = useAllReviewsContext();

    // Check if data and reviews exist
    if (!data || !data.reviews) {
        return <div>Loading...</div>;
    }

    const { reviews, totalReviews, numOfPages } = data;
    if (reviews.length === 0) {
        return (
            <Wrapper>
                <h2>No reviews to display...</h2>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h5>
                {totalReviews} review{reviews.length > 1 && 's'} found
            </h5>
            <div className='reviews'>
                {reviews.map((review) => {
                    return <MovieReviews key={review._id} {...reviews} />;
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    );
};
export default ReviewsContainer;