import { toast } from 'react-toastify';
import { ReviewsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

const allReviewsQuery = (params) => {
    const { search, reviewStatus, reviewType, sort, page } = params;
    return {
        queryKey: [
            'reviews',
            search ?? '',
            reviewStatus ?? 'all',
            reviewType ?? 'all',
            sort ?? 'newest',
            page ?? 1,
        ],
        queryFn: async () => {
            const { data } = await customFetch.get('/reviews', {
                params,
            });
            return data;
        },
    };
};

export const loader =
    (queryClient) =>
        async ({ request }) => {
            const params = Object.fromEntries([
                ...new URL(request.url).searchParams.entries(),
            ]);

            await queryClient.ensureQueryData(allReviewsQuery(params));
            return { searchValues: { ...params } };
        };

const AllReviewsContext = createContext();
const AllReviews = () => {
    const { searchValues } = useLoaderData();
    const { data } = useQuery(allReviewsQuery(searchValues));
    return (
        <AllReviewsContext.Provider value={{ data, searchValues }}>
            <SearchContainer />
            <ReviewsContainer />
        </AllReviewsContext.Provider>
    );
};

export const useAllReviewsContext = () => useContext(AllReviewsContext);

export default AllReviews;
