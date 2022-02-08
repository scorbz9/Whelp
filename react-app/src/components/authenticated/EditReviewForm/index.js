import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { editOneReview } from '../../../store/review';
import './EditReviewForm.css'

// Import pics
import bath from '../../../img/bath.png'
import stroller from '../../../img/stroller.png'
import walker from '../../../img/walker.png'

const EditReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams()
    const reviewId = parseInt(params.reviewId, 10)

    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviewState.entries)
    const currentReview = reviews.find(review => review.id === reviewId)

    if (currentReview) {
        localStorage.setItem('rating', currentReview.rating)
        localStorage.setItem('review', currentReview.review)
    }

    const [errors, setErrors] = useState([]);
    const [rating, setRating] = useState(localStorage.getItem('rating'));
    const [review, setReview] = useState(localStorage.getItem('review'));

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            id: parseInt(params.reviewId, 10),
            rating: parseInt(rating, 10),
            review,
            businessId: params.id,
            userId: user.id
        }

        const editedRev = await dispatch(editOneReview(payload))

        if (editedRev.errors) {
            setErrors(editedRev.errors)
        }
        else if (!editedRev.errors) {
            history.push(`/businesses/${editedRev.businessId}`)
        }
    }

    const handleCancel = e => {
        e.preventDefault()
        history.push(`/businesses/${params.id}`)
    }


    return (
        <div className='new-review-form-container'>
            <form onSubmit={handleSubmit}>
            <h1 className='new-review-h1'>Edit your review</h1>
                {errors.length ?
                <div className="error-container">
                    <ul>
                    {errors.map((error, ind) => (
                        <li key={ind}>{error}</li>
                    ))}
                    </ul>
                </div>
                :<></>}
                <label className="new-review-label" htmlFor="rating"> Rating
                <div className="rating" id="rating" onChange={e => setRating(e.target.value)}>
                        <input
                            className="star star-1"
                            type="radio"
                            name="stars"
                            id="star-1"
                            value="5"
                            defaultChecked={rating == 5}
                        />
                        <label className="star star-1 star-label" htmlFor="star-1"></label>
                        <input
                            className="star star-2"
                            type="radio"
                            name="stars"
                            id="star-2"
                            value="4"
                            defaultChecked={rating == 4}
                        />
                        <label className="star star-2 star-label" htmlFor="star-2"></label>
                        <input
                            className="star star-3"
                            type="radio"
                            name="stars"
                            id="star-3"
                            value="3"
                            defaultChecked={rating == 3}
                        />
                        <label className="star star-3 star-label" htmlFor="star-3"></label>
                        <input
                            className="star star-4"
                            type="radio"
                            name="stars"
                            id="star-4"
                            value="2"
                            defaultChecked={rating == 2}
                        />
                        <label className="star star-4 star-label" htmlFor="star-4"></label>
                        <input
                            className="star star-5"
                            type="radio"
                            name="stars"
                            id="star-5"
                            value="1"
                            defaultChecked={rating == 1}
                        />
                        <label className="star star-5 star-label" htmlFor="star-5"></label>
                </div>
                </label>
                <div>
                    <label className="new-review-label"> Review
                        <textarea
                            className='new-review-input'
                            id="review-text"
                            value={review}
                            onChange={e => setReview(e.target.value)}
                            required
                            autoComplete='off'
                            placeholder="Review"
                        />
                    </label>
                </div>
                <div className='buttons-container'>
                    <button className='add-review-button' type='submit'>Edit Review</button>

                    <button className='cancel-review-button' type='button' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
            <div className='add-business-pics'>
            <img className='icon-pics' id='review-pic' src={stroller} alt='Puppy in a stroller'/>
            </div>
        </div>
    )
}

export default EditReviewForm
