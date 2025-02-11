import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'

const REVIEW = gql`
    query GetReview ($documentId: ID!) {
        review(documentId: $documentId) {
            documentId
            title
            rating
            body,
            categories {
                            name
                            documentId
                        }
        }
    }
`

const ReviewDeatail = () => {
    const { documentId } = useParams()
    const { data, loading, error } = useQuery(REVIEW, {
        variables: { documentId: documentId }
    })
    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data?.review && <div className='review-detail'>
                <h2>{data.review.title}</h2>
                <div className='rating'>
                    <span>Rating ⭐ </span>
                    <p>{data.review.rating}</p>
                </div>
                {data.review.categories.map(c => (
                    <small key={c.documentId}>{c.name}</small>
                ))}
                <p>{data.review.body}</p>
            </div>
            }
        </div>
    )
}

export default ReviewDeatail