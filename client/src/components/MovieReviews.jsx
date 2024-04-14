import PropTypes from 'prop-types';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ReviewsContainer';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import ReviewInfo from "./ReviewInfo.js";

day.extend(advancedFormat);

const MovieReviews = ({
                          _id,
                          title,
                          rating,
                          genre,
                          createdAt,
                          tags,
                      }) => {
  const date = day(createdAt).format('MMM Do, YYYY');
  return (
      <Wrapper>
        <header>
          <div className='main-icon'>{title.charAt(0)}</div>
          <div className='info'>
            <h5>{genre}</h5>
            <p>{rating}</p>
          </div>
        </header>
        <div className='content'>
          <div className='content-center'>
            <ReviewInfo icon={<FaLocationArrow />} text={reviewLocation} />
            <ReviewInfo icon={<FaCalendarAlt />} text={date} />
            <ReviewInfo icon={<FaBriefcase />} text={reviewType} />
            <div className={`status ${genre}`}>{genre}</div>
          </div>
          <footer className='actions'>
            <Link to={`../edit-review/${_id}`} className='btn edit-btn'>
              Edit
            </Link>
            <Form method='post' action={`../delete-review/${_id}`}>
              <button type='submit' className='btn delete-btn'>
                Delete
              </button>
            </Form>
          </footer>
        </div>
      </Wrapper>
  );
};


export default MovieReviews;

