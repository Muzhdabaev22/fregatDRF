import css from './index.module.scss'
import cn from 'classnames'
import {Link, useLocation} from 'react-router-dom'
import { getHomeRoute, getLangRoute, getBlogRoute, getCinemaRoute } from '../../lib/routes'
import logo from '../../assets/images/logo.png'
import buttonMobile from '../../assets/images/button-mobile.png'
import line_cinema from '../../assets/images/line-cinema.png'
import linehover from '../../assets/images/linehover.png'


export const Header = () => {
    const location = useLocation()

    const isActive = (path) => {
        return location.pathname === path

    }

    const openbox = () => {
        return 
    }
    return (
        <header className={css.header}>
            <div className={cn(css.line_section, css.line_header)}></div>
            <nav className={css.nav}>
                <div className={css.mobile_nav}>
                    <Link to={getHomeRoute}><img src={logo} alt='logo' className={css.logo} /></Link>
                    {/* <div onClick={openbox} className={css.div_btn_mobile} role='button' tabIndex={0}>
                        <img src={buttonMobile} alt="mobile menu button" className={css.button_mobile} />
                    </div> */}
                </div>
                <ul className={css.nav_list}>
                    <div className={css.linehover_block}>
                        <li className={css.mobile_padding_nav}><a href="/#about" className={css.nav_link}>О ФРЕГАТЕ</a></li>
                        <img src={linehover} alt="linehover" className={cn(css.linehover1, {[css.active]: isActive('/')})}/>
                    </div>
                    <div className={css.linehover_block}>
                        <li><Link to={getLangRoute} className={css.nav_link}>ЯЗЫКИ</Link></li>
                        <img src={linehover} alt="linehover" className={cn(css.linehover2, {[css.active]: isActive(getLangRoute)})}/>
                    </div>
                    <div className={css.linehover_block}>
                        <li><a href="/#price" className={css.nav_link}>СТОИМОСТЬ</a></li>
                        <img src={linehover} alt="linehover" className={css.linehover3}/>
                    </div>
                    <div className={css.linehover_block}>
                        <li><a href={getBlogRoute} className={css.nav_link}>БЛОГ</a></li>
                        <img src={linehover} alt="linehover" className={cn(css.linehover4, {[css.active]: isActive(getBlogRoute)})}/>
                    </div>
                    <div className={cn(css.linehover_block, css.block_form_hov, css.mobile_link)}>
                        <li><a href="/" className={css.nav_link}>СВЯЗАТЬСЯ</a></li>
                        <img src={linehover} alt="linehover" className={css.linehover5}/>

                        {/* добавить форму */}

                    </div>
                    <div className={cn(css.linehover_block, css.club_padding)}>
                        <li><Link to={getCinemaRoute} className={css.nav_link}>КИНОКЛУБ</Link></li>
                        <img src={line_cinema} alt="linehover" className={cn(css.linehover6, {[css.active]: isActive(getCinemaRoute)})}></img>
                    </div>
                    <div className={css.button_nav_block}>
                        <a href=""> 
                            <button className={css.button_nav}>ЗАПИСАТЬСЯ НА УРОК</button>
                        </a>
                    </div>
                    <div className={css.button_nav_block}>
                        <a href="">
                            <button className={cn(css.button_nav, css.entrence)}>ВОЙТИ</button>
                        </a>
                    </div>
                </ul>
            </nav>
        </header>
    )
}