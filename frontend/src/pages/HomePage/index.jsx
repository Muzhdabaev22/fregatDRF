import css from './index.module.scss'
import linehover from '../../assets/images/linehover.png'
import circle from '../../assets/images/circle.png'
import girl from '../../assets/images/bg1.png'
import cn from 'classnames'
import eng from '../../assets/images/1.png'
import franch from '../../assets/images/2.png'
import german from '../../assets/images/3.png'
import esp from '../../assets/images/4.png'
import italian from '../../assets/images/5.png'
import arab from '../../assets/images/6.png'
import chin from '../../assets/images/7.png'
import japan from '../../assets/images/8.png'
import korean from '../../assets/images/9.png'
import rus from '../../assets/images/10.png'
import khover from '../../assets/images/khover.png'
import arrow from '../../assets/images/arrow.png'
import bg2 from '../../assets/images/bg2.png'
import anim_arrow from '../../assets/images/anim-arrow.png'

export const HomePage = () => {
    return (
        <>
            <section className={css.main_section}>
                <div className={css.text_section_div}>
                    <img className={css.circle} src={circle} alt="circle"/>
                    <h1 className={css.h1_text_section}>Учи языки<br />на борту Фрегата!</h1>
                    <img className={css.line} src={linehover} alt="linehover"/>
                    <p className={css.other_text}>все языки в одном месте</p>
                    <p className={css.p_section}>Забудь о языке жестов и онлайн-переводчиках!</p>
                    <a href="#win1" className={css.button_contact}>
                        <button>ЗАПИСАТЬСЯ</button>
                    </a>
                </div>

                <div className={css.section_img}>
                    <img src={girl} alt="person" />
                </div>
            </section> 

            <div className={css.line_section_pink}></div>

            {/* languages section */}
            <section className={css.container}>
                <div className={cn(css.container_content, css.arrow_block)}>
                    <p className={css.arrow_title}>Выбирай язык по душе<br />и начинай свой путь изучения уже сегодня!</p>
                    <img src={arrow} alt="arrow" className={css.arrow} />
                </div>
                <div className={cn(css.container_content, css.block_languages)}>
                    <a href="" className={css.card_link_languages}>
                        <div className={css.languages_card}>
                            <img src={eng} alt="" className={css.img_card_languages}/>
                            <p className={css.text_card_languages}>АНГЛИЙСКИЙ</p>
                            <img src={khover} alt="khover" className={css.khover}/>
                        </div>
                    </a>
                    <a href="" className={css.card_link_languages}>
                        <div className={css.languages_card}>
                            <img src={franch} alt="" className={css.img_card_languages}/>
                            <p className={css.text_card_languages}>ФРАНЦУЗСКИЙ</p>
                            <img src={khover} alt="khover" className={css.khover}/>
                        </div>
                    </a>
                    <a href="" className={css.card_link_languages}>
                        <div className={css.languages_card}>
                            <img src={german} alt="" className={css.img_card_languages}/>
                            <p className={css.text_card_languages}>НЕМЕЦКИЙ</p>
                            <img src={khover} alt="khover" className={css.khover}/>
                        </div>
                    </a>
                    <a href="" className={css.card_link_languages}>
                        <div className={css.languages_card}>
                            <img src={esp} alt="" className={css.img_card_languages}/>
                            <p className={css.text_card_languages}>ИСПАНСКИЙ</p>
                            <img src={khover} alt="khover" className={css.khover}/>
                        </div>
                    </a>
                    <a href="" className={css.card_link_languages}>
                        <div className={css.languages_card}>
                            <img src={italian} alt="" className={css.img_card_languages}/>
                            <p className={css.text_card_languages}>ИТАЛЬЯНСКИЙ</p>
                            <img src={khover} alt="khover" className={css.khover}/>
                        </div>
                    </a>
                    <a href="" className={css.card_link_languages}>
                        <div className={css.languages_card}>
                            <img src={arab} alt="" className={css.img_card_languages}/>
                            <p className={css.text_card_languages}>АРАБСКИЙ</p>
                            <img src={khover} alt="khover" className={css.khover}/>
                        </div>
                    </a>
                    <a href="" className={css.card_link_languages}>
                        <div className={css.languages_card}>
                            <img src={chin} alt="" className={css.img_card_languages}/>
                            <p className={css.text_card_languages}>КИТАЙСКИЙ</p>
                            <img src={khover} alt="khover" className={css.khover}/>
                        </div>
                    </a>
                    
                    <div className={css.languages_card}>
                        <img src={japan} alt="" className={css.img_card_languages}/>
                        <p className={css.text_card_languages}>ЯПОНСКИЙ</p>
                        <img src={khover} alt="khover" className={css.khover}/>
                    </div>
                    
                    <div className={css.languages_card}>
                        <img src={korean} alt="" className={css.img_card_languages}/>
                        <p className={css.text_card_languages}>КОРЕЙСКИЙ</p>
                        <img src={khover} alt="khover" className={css.khover}/>
                    </div>
                    
                    <a href="" className={css.card_link_languages}>
                        <div className={css.languages_card}>
                            <img src={rus} alt="" className={css.img_card_languages}/>
                            <p className={css.text_card_languages}>РУССКИЙ</p>
                            <img src={khover} alt="khover" className={css.khover}/>
                        </div>
                    </a>
                </div>
            </section>

            <div className={css.line_section_orange}></div>

            <section className={css.container}> 
                <div className={cn(css.container_content, css.arrow_block)}>
                    <p className={css.arrow_title}>Форматы обучения -<br/>выбери свой!</p>
                    <img src={arrow} alt="arrow" className={css.arrow}/>
                </div>
                
                <div className={css.container_content}>
                    <div className={css.price_full}>
                        <img src={bg2} alt="img" className={css.bg_img}/>
                        <div className={css.price_text_block}>

                            <img src={circle} alt="circle" className={css.circle_two}/>
                            <p className={css.price_title}>ИНДИВИДУАЛЬНЫЕ<br/>ЗАНЯТИЯ</p>
                            
                            <p className={css.text_price}>Преимущества индивидуального обучения:</p>
                            <ul className={css.price_text_li_block}>
                                <li className={css.price_text_li}>гибкое расписание</li>
                                <li className={css.price_text_li}>полное внимание преподавателя</li>
                                <li className={css.price_text_li}>возможность советоваться с преподавателем вне занятий</li>
                                <li className={css.price_text_li}>программа может быть изменена или адаптирована согласно вашему запросу</li>
                                <li className={css.price_text_li}>конфиденциальность</li>
                                <li className={css.price_text_li}>много улыбок</li>
                            </ul>
                            <div className={css.duration_price_block}>
                                <p className={css.duration_price}>Абонемент: 4, 6, или 12 занятий</p>
                                <p className={css.duration_price}>Длительность: 50 минут</p>
                            </div>
                            <div className={css.price_and_button}>
                                <p className={css.price_bottom_text}>
                                    1200<br/><span>руб / урок</span>
                                </p>
                                <a href="#win1"><button className={css.price_button}>ЗАПИСАТЬСЯ</button></a>
                            </div>
                        </div>
                    </div>
                </div>

                <img src={anim_arrow} alt="arrow" className={css.anim_arrow}/>

                <div className={cn(css.container_ind_lessons, css.container_content)}>
                    <div className={cn(css.yellow_card, css.home_card)}>
                        <p className={css.text_price}>Как проходят занятия?</p>
                        <li className={css.li_arrow}>на интерактивной платформе и в Telegram</li>
                        <li className={css.li_arrow}>максимум речи на изучаемом языке, минимум родного языка</li>                 
                    </div>
                    <div className={cn(css.pink_card, css.home_card)}>
                        <p className={css.text_price}>Программа обучения:</p> 
                        <li className={css.li_arrow_yellow}>занятия проходят по структурированной программе, разработанной профессиональным методистом и дизайнером</li> 
                    </div>
                    <div className={cn(css.yellow_card, css.home_card)}>
                        <p className={css.text_price}>Почему стоит выбрать?</p>
                        <li className={css.li_arrow}>коммуникативный подход - главное говорить</li> 
                        <li className={css.li_arrow}>геймификация на уроках - интересно и увлекательно</li>  
                    </div>
                </div>

            </section>
        </>
    )
}