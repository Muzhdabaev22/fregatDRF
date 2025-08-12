import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { BlogPage } from './pages/BlogPage'
import { CinemaPage } from './pages/CinemaPage'
import { EpisodePage } from './pages/EpisodePage'
import { Layout } from './components/Layout'
import { getBlogRoute, getCinemaRoute, getHomeRoute } from './lib/routes'
import './styles/global.scss'


export const App = () => {
    return (
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getHomeRoute} element={<HomePage />} />
            <Route path={getBlogRoute} element={<BlogPage />} />
            <Route path={getCinemaRoute} element={<CinemaPage />} />
            <Route path="/episode/:episodeUrl" element={<EpisodePage />} />
          </Route>
        </Routes>
      </Router>
    )
}