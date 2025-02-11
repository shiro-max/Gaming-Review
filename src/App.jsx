import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import ReviewDeatail from "./pages/ReviewDeatail"
import Category from "./pages/Category"

const apiEndPoint = import.meta.env.VITE_API_ENDPOINT

const client = new ApolloClient({
  uri: apiEndPoint,
  cache: new InMemoryCache()
})

function App() {

  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories/:documentId" element={<Category />} />
            <Route path="/reviews/:documentId" element={<ReviewDeatail />} />
          </Routes>
        </div>
      </ApolloProvider>
    </Router>

  )
}

export default App
