import './App.css'
import RecipesList from './Page/Public/RecipesList/RecipesList'
import RecipesDetail from './Page/Public/RecipesDetail/RecipeDetail'
import Layout from './Layout/Public/Layout'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './Page/Public/Home/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='Recipe' element={<RecipesList />} />
            <Route path='Recipe/:id' element={<RecipesDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
