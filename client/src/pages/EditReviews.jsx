import { GENRE_TYPE } from '../../../utils/constants';
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

const singleReviewQuery = (id) => {
    return {
        queryKey: ['review', id],
        queryFn: async () => {
            const { data } = await customFetch.get(`/reviews/${id}`);
            return data;
        },
    };
};

export const loader =
    (queryClient) =>
        async ({ params }) => {
            try {
                await queryClient.ensureQueryData(singleReviewQuery(params.id));
                return params.id;
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                return redirect('/dashboard/all-reviews');
            }
        };
export const action =
    (queryClient) =>
        async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            try {
                await customFetch.put(`/reviews/${data.id}`, data);
                queryClient.invalidateQueries(['reviews']);
                toast.success('Review updated successfully ');
                return redirect('all-reviews');
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                return error;
            }
        };

const EditReview = () => {
    const { user } = useOutletContext();

    return (
        <Wrapper>
            <Form method='post' className='form'>
                <h4 className='form-title'>edit review</h4>
                <div className='form-center'>
                    <FormRow type='text' name='movieTitle' />
                    <FormRow type='text' name='movieDirector' />
                    <FormRow type='number' name='movieYear' />
                    <FormRowSelect
                        labelText='genre'
                        name='genre'
                        list={Object.values(GENRE_TYPE)}
                    />
                    <FormRow type='number' name='rating' />
                    <FormRow type='checkbox' name='spoilers' />
                    <FormRow type='text' name='overview' maxLength={256} />
                    {user && <FormRow
                        type='text'
                        labelText='Movie Viewed'
                        name='reviewLocation'
                        defaultValue={user.location}
                    />}
                    <FormRowSelect
                        labelText='Review status'
                        name='reviewStatus'
                        defaultValue={REVIEW_STATUS.PENDING}
                        list={Object.values(REVIEW_STATUS)}
                    />
                    <SubmitBtn formBtn />
                </div>
            </Form>
        </Wrapper>
    );
};
export default EditReview;