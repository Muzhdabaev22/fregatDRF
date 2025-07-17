import { Outlet } from 'react-router-dom'
import { Header } from '../Header'
import css from './index.module.scss'

export const Layout = () => {
    return (
        <div className={css.container}>
            <Header />
            <Outlet />
        </div>
    )
}