import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { BlogPage } from './pages/BlogPage'
import { Layout } from './components/Layout'
import { getBlogRoute, getHomeRoute } from './lib/routes'
import './styles/global.scss'


export const App = () => {
    return (
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getHomeRoute} element={<HomePage />} />
            <Route path={getBlogRoute} element={<BlogPage />} />
          </Route>
        </Routes>
      </Router>
    )
}