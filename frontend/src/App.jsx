import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { Layout } from './components/Layout'
import { getHomeRoute } from './lib/routes'
import './styles/global.scss'


export const App = () => {
    return (
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getHomeRoute} element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    )
}