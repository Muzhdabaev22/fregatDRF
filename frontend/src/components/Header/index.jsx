import css from './index.module.scss'
import cn from 'classnames'
import {Link} from 'react-router-dom'
import { getHomeRoute } from '../../lib/routes'
import logo from '../../assets/images/logo.png'

export const Header = () => {
    return (
        <header className={css.header}>
            <div className={cn(css.line_section, css.line_header)}></div>
            <div className={css.container_nav} >
                <nav className={css.nav}>
                    <div className={css.mobile_nav}>
                        <Link to={getHomeRoute}><img src={logo} alt='logo'/></Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}