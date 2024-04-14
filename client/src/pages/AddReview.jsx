import { GENRE_TYPE } from '../../../utils/constants';
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action =
    (queryClient) =>
        async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            try {
                await customFetch.post('/reviews', data);
                queryClient.invalidateQueries(['reviews']);
                toast.success('Review added successfully ');
                return redirect('all-reviews');
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                return error;
            }
        };

const AddReview = () => {
    const { user } = useOutletContext();

    return (
        <Wrapper>
            <Form method='post' className='form'>
                <h4 className='form-title'>add review</h4>
                <div className='form-center'>
                    <FormRow type='text' name='movie Title' />
                    <FormRow type='number' name='release Date' />
                    <FormRowSelect
                        labelText='genre'
                        name='genre'
                        list={Object.values(GENRE_TYPE)}
                    />
                    <FormRow type='number' name='rating' />
                    <FormRow type='checkbox' name='spoilers' />
                    <FormRow type='text' name='review' maxLength={256} />
                    {user && <FormRow
                        type='text'
                        labelText='Movie Viewed'
                        name='reviewLocation'
                        defaultValue={user.location}
                    />}

                    <SubmitBtn formBtn />
                </div>
            </Form>
        </Wrapper>
    );
};
export default AddReview;