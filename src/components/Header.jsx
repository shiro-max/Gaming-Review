import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'


const CATEGORIES = gql`
query  GetCategories {
    categories {
        documentId
        name
        }
}
`

const Header = () => {
    const { data, loading, error } = useQuery(CATEGORIES)

    return (
        <div className='header'>
            <Link to="/">
                <h1>Shiro Reviews</h1>
            </Link>
            <nav>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && data.categories.map(category => (
                    <div className='categories-list' key={category.documentId}>
                        <Link to={`/categories/${category.documentId}`}>
                            {category.name}
                        </Link>
                    </div>
                ))}
            </nav>
        </div>
    )
}

export default Header