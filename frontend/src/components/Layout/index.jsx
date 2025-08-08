import { Outlet } from 'react-router-dom'
import { Header } from '../Header'
import css from './index.module.scss'
import { Footer } from '../Footer'

export const Layout = () => {
    return (
        <div className={css.container}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}