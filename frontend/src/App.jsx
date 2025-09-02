import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { BlogPage } from './pages/BlogPage'
import { CinemaPage } from './pages/CinemaPage'
import { EpisodePage } from './pages/EpisodePage'
import { Layout } from './components/Layout'
import { getBlogRoute, getCinemaRoute, getHomeRoute, getOfertaRoute, getPoliticRoute, getLangRoute } from './lib/routes'
import './styles/global.scss'
import { OfertaPage } from './pages/OfertaPage'
import { PoliticPage } from './pages/PoliticPage'
import { LangPage } from './pages/LangPage'
import ErrorBoundary from './components/ErrorBoundary'


export const App = () => {
    return (
      <Router>
        <Routes>
          <Route element={<Layout />}>  
            <Route path={getHomeRoute} element={<HomePage />} />
            <Route path={getBlogRoute} element={<BlogPage />} />
            <Route path={getLangRoute} element={
              <ErrorBoundary>
                <LangPage />
              </ErrorBoundary>
            } />
            <Route path={getCinemaRoute} element={<CinemaPage />} />
            <Route path="/episode/:episodeUrl" element={<EpisodePage />} />
            <Route path={getOfertaRoute} element={<OfertaPage />} />
            <Route path={getPoliticRoute} element={<PoliticPage />} />
          </Route>
        </Routes>
      </Router>
    )
}