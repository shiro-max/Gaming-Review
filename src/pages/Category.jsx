import { gql, useQuery } from '@apollo/client'
import {  Link, useParams } from 'react-router-dom'

const CATEGORY = gql`
query GetCategory($documentId: ID!) {
    category(documentId: $documentId) {
        name
        documentId
        reviews {
                title
                rating
                documentId
                body
                categories {
                            name
                            documentId
                            }
                }
        }
}
`

const Category = () => {
    const { documentId } = useParams()

    const { data, loading, error } = useQuery(CATEGORY, {
        variables: { documentId: documentId }
    })

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <h2>{data?.category.name}</h2>
            {data?.category?.reviews.map(review=>(
                <div key={review.documentId} className='review-card'>
                    <div className='rating'>{review.rating}</div>
                    <h3>{review.title}</h3>
                    
                    {review.categories.map(c=>(
                        <small key={c.documentId}>{c.name}</small>
                    )
                    )}
                    <p>{review.body.substring(0, 200)}...</p>
                    <div className='read-more'>
                        <Link to={`/reviews/${review.documentId}`}>
                            Read more...
                        </Link>
                    </div>
                </div>
            ))

            }
        </div>

    )
}

export default Category