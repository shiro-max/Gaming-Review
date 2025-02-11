import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'


const REVIWES = gql`
query GetReviews {
    reviews {
        documentId,
        title,
        body,
        rating
        categories {
                        name
                        documentId
                    }
    }
}
`

const HomePage = () => {
    const { data, loading, error } = useQuery(REVIWES)


    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && data?.reviews.map(review => (

                <div key={review.documentId} className='review-card'>
                    <div className='rating'>{review.rating}</div>
                    <h2>{review.title}</h2>
                    {review.categories.map(c => (
                        <small key={c.documentId}>{c.name}</small>
                    ))}
                    <p>{review.body.substring(0, 200)}...</p>
                    <div className='read-more'>
                        <Link to={`reviews/${review.documentId}`}>
                            Read more...
                        </Link>
                    </div>
                </div>
            ))

            }
        </div>
    )
}

export default HomePage