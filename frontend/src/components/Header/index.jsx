import css from './index.module.scss'
import cn from 'classnames'
import {Link, useLocation} from 'react-router-dom'
import { getHomeRoute, getLangRoute, getBlogRoute, getCinemaRoute, getPoliticRoute } from '../../lib/routes'
import logo from '../../assets/images/logo.png'
import buttonMobile from '../../assets/images/button-mobile.png'
import line_cinema from '../../assets/images/line-cinema.png'
import linehover from '../../assets/images/linehover.png'
import mail from '../../assets/images/mailform.png'
import {throttle} from 'lodash'
import { useEffect, useState } from 'react'

export const Header = () => {
    const location = useLocation()
    const [hasBackground, setHasBackground] = useState(false)
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        social: '',
        agree: false,
    }) 

    useEffect(() => {
        const checkScroll = throttle(() => {
            const shouldHaveBackground = window.scrollY > 200;
            if (shouldHaveBackground !== hasBackground) {
                setHasBackground(shouldHaveBackground)
            }
        }, 200)
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [hasBackground])

    const isActive = (path) => {
        return location.pathname === path
    }

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        // Здесь логика отправки формы
        console.log('Form submitted:', formData)
        setIsFormVisible(false)
    }

    return (
        <header className={css.header}>
            <div className={cn(css.line_section, css.line_header)}></div>
            <nav className={cn(css.nav, {[css.scrollBackground]: hasBackground})}>
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
                    <div className={cn(css.linehover_block, css.block_form_hov, css.mobile_link)} 
                        onMouseEnter={() => setIsFormVisible(true)}
                        onMouseLeave={() => setIsFormVisible(false)}
                    >
                        <li><span className={css.nav_link}>СВЯЗАТЬСЯ</span></li>
                        <img src={linehover} alt="linehover" className={css.linehover5}/>

                        {isFormVisible && (
                            <>  
                                <div className={css.block__form}>
                                    <h1 className={css.block__form__title}>Контакты</h1>
                                    <div className={css.block__form__mail}>
                                        <img src={mail} alt="mail" />
                                        <p className={css.block__form__mail__text}>frigateschool@gmail.com</p>
                                    </div>
                                    
                                    <form onSubmit={handleFormSubmit} className={css.block__form__form}>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleFormChange}
                                            placeholder="Ваше имя"
                                            className={css.block__form__input}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="social"
                                            value={formData.social}
                                            onChange={handleFormChange}
                                            placeholder="Ссылка на соцсеть VK/Telegram/Whatsapp"
                                            className={css.block__form__input}
                                        />
                                        <div className={css.vocabulary_word_line}>
                                            <input
                                                type="checkbox"
                                                id="contact-agree"
                                                name="agree"
                                                checked={formData.agree}
                                                onChange={handleFormChange}
                                                required
                                            />
                                            <label htmlFor="contact-agree" className={css.label_vocabulary}>
                                                Согласие с <br /><Link to={getPoliticRoute} style={{ textDecoration: 'underline', color: 'black'}}>Политикой конфиденциальности</Link>
                                            </label>
                                        </div>
                                        <button type="submit" className={css.block__form__button}>
                                            Отправить
                                        </button>
                                    </form>
                                <p className={css.block__form__title}>Напишите нам в мессенджерах:</p>
                                <div className={css.social_media_icons}>
                                    {/* VK Icon */}
                                    <a href="https://vk.com/frigateschool" className={css.icon_soc} target="_blank" rel="noopener noreferrer">
                                        <svg fill="#875216" width="65" height="55" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" stroke="#875216">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M17.802 12.298s1.617 1.597 2.017 2.336a.127.127 0 0 1 .018.035c.163.273.203.487.123.645-.135.261-.592.392-.747.403h-2.858c-.199 0-.613-.052-1.117-.4-.385-.269-.768-.712-1.139-1.145-.554-.643-1.033-1.201-1.518-1.201a.548.548 0 0 0-.18.03c-.367.116-.833.639-.833 2.032 0 .436-.344.684-.585.684H9.674c-.446 0-2.768-.156-4.827-2.327C2.324 10.732.058 5.4.036 5.353c-.141-.345.155-.533.475-.533h2.886c.387 0 .513.234.601.444.102.241.48 1.205 1.1 2.288 1.004 1.762 1.621 2.479 2.114 2.479a.527.527 0 0 0 .264-.07c.644-.354.524-2.654.494-3.128 0-.092-.001-1.027-.331-1.479-.236-.324-.638-.45-.881-.496.065-.094.203-.238.38-.323.441-.22 1.238-.252 2.029-.252h.439c.858.012 1.08.067 1.392.146.628.15.64.557.585 1.943-.016.396-.033.842-.033 1.367 0 .112-.005.237-.005.364-.019.711-.044 1.512.458 1.841a.41.41 0 0 0 .217.062c.174 0 .695 0 2.108-2.425.62-1.071 1.1-2.334 1.133-2.429.028-.053.112-.202.214-.262a.479.479 0 0 1 .236-.056h3.395c.37 0 .621.056.67.196.082.227-.016.92-1.566 3.016-.261.349-.49.651-.691.915-1.405 1.844-1.405 1.937.083 3.337z"></path>
                                        </g>
                                        </svg>
                                    </a>

                                    {/* WhatsApp Icon */}
                                    <a href="https://wa.me/+79785502653" className={css.icon_soc} target="_blank" rel="noopener noreferrer">
                                        <svg width="45" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill="#875216"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill="#875216"></path>
                                        </g>
                                        </svg>
                                    </a>

                                    {/* Telegram Icon */}
                                    <a href="https://t.me/frigateschool" className={css.icon_soc} target="_blank" rel="noopener noreferrer">
                                        <svg width="45" height="55" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="#875216"></path>
                                        </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        
                        </>
                        )}
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