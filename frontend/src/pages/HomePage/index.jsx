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
import bg3 from '../../assets/images/bg3.png'
import bg6 from '../../assets/images/bg-6.png'
import white_card from '../../assets/images/white-card.png'
import white_card_mbl from '../../assets/images/white-card-mbl.png'
import bg4 from '../../assets/images/bg4.png'
import loop from '../../assets/images/loop.png'
import bg7 from '../../assets/images/bg7.png'

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

            <section className={css.container} id='price'> 
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

                <div className={css.container_content}>
                    <div className={css.price_full_two}>
                        <div className={css.price_text_block_two}>
                            <img src={circle} alt="circle" className={css.circle}/>
                            <p className={css.price_title_two}>ЗАНЯТИЯ<br/>В ГРУППАХ</p>
                            <p className={css.text_price}>Преимущества группового обучения:</p>
                            
                            
                            <ul className={css.price_text_li_block}>
                                <li className={css.price_text_li_yellow}>четкое расписание</li>
                                <li className={css.price_text_li_yellow}>дисциплина обучения</li>
                                <li className={css.price_text_li_yellow}>разговорная практика с участниками группы</li>
                                <li className={css.price_text_li_yellow}>более активные занятия</li>
                                <li className={css.price_text_li_yellow}>чат группы с преподавателем, <br/>чтобы задавать доп. вопросы вне занятий</li>
                                <li className={css.price_text_li_yellow}>видеозаписи пропущенных уроков</li>
                            </ul>
                            <div>
                                <p className={css.duration_price}>Абонемент: 4 или 8 занятий</p>
                                <p className={css.duration_price}>Длительность: 60 или 90 минут</p>
                            </div>
                            <div className={css.price_and_button}>
                                <p className={css.price__ot}>от</p>
                                <p className={css.price_bottom_text}>
                                    900<br/><span>руб / урок</span>
                                </p>
                                <a href="#win1"><button className={css.price_button}>ЗАПИСАТЬСЯ</button></a>
                            </div>
                        </div>
                        <img src={bg3} alt="img" className={css.bg_img}/>
                    </div>

                    <img src={anim_arrow} alt="arrow" className={css.anim_arrow} style={{marginLeft: '90%'}}/>
                </div>
                

                <div className={cn(css.container_groups_card, css.container_content)}>
                    <div className={css.group_card_description}>
                        <p className={css.text_price}>Почему выбрать группу?</p>
                        <p className={css.description_text}>это возможность находиться рядом и общаться с теми:</p>
                        
                        <li className={css.li_arrow_description}>кто занимается тем же, что и ты,</li>
                        <li className={css.li_arrow_description}>кто спотыкается на тех же граблях,</li>
                        <li className={css.li_arrow_description}>кто имеет те же страхи и препятствия,</li>
                        <li className={css.li_arrow_description}>кто так же, как и ты, делает маленькие шажки на пути к цели!</li>
                        
                    </div>

                    <div className={css.middle_group_card}></div>

                    <div className={css.group_card_description}> 
                        <p className={css.text_price}>Как собирается группа?</p>

                        <li className={css.li_arrow}>вы проходите вводную встречу-знакомство с методистом</li>
                        <li className={css.li_arrow_description}>после выбираете подходящее время</li>
                        <li className={css.li_arrow_description}>группа собирается по возрасту, уровню, полу, целям, а также скорости обучения</li>
                        <li className={css.li_arrow_description}>количество человек от 2 до 5</li>
                    </div>
                </div>

                
                <div className={css.container_content}>
                    <div className={css.price_full}>
                        <img src={bg6} alt="img" className={css.bg_img}/>
                        <div className={css.price_text_block}>
                            <img src={circle} alt="circle" className={css.circle_two}/>
                            <p className={css.price_title}>РАЗГОВОРНЫЕ<br/>КЛУБЫ</p>

                            <p className={css.text_price}>Преимущества разговорных клубов:</p>

                            <ul className={css.price_text_li_block}>
                                <li className={css.price_text_li_yellow}>эффективная практика вне уроков</li>
                                <li className={css.price_text_li_yellow}>возможность избавиться от барьера</li>
                                <li className={css.price_text_li_yellow}>способ провериить себя в «реальном мире»</li>
                                <li className={css.price_text_li_yellow}>возможность общаться не только с учителем</li>
                                <li className={css.price_text_li_yellow}>возможность сравнить себя с другими изучающими</li>
                            </ul>
                            <div className={css.duration_price_block}>
                                <p className={css.duration_price}>Формат: speed date/смена собеседника каждые 20 минут</p>
                                <p className={css.duration_price}>Длительность: 60 минут</p>
                            </div>
                                <div className={css.price_and_button}>
                                <p className={css.price_bottom_text}>
                                    600<br/><span>руб / встреча</span>
                                </p>
                                <a href="#win1"><button className={css.price_button}>ЗАПИСАТЬСЯ</button></a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <img src={anim_arrow} alt="arrow" className={css.anim_arrow}/>

                <div className={cn(css.container_ind_lessons, css.container_content)}>
                    <div className={cn(css.green_card, css.home_card)}>
                        <p className={css.text_price}>Как проходят клубы?</p>
                        <li className={css.li_arrow}>В виртуальном кабинете, где находясь в одном звонке, вы слишите только того, кто сидит рядом.</li>
                        <li className={css.li_arrow_description}>Это позволяет общаться 100% встречи один на один с собеседником.</li>                 
                    </div>
                    <div>
                        <div className={css.text_feedback}>
                            <p className={css.text_price}>Отзыв от ученицы:</p>
                            <p className={css.description_text}>Впервые посетила разговорный клуб на арабском языке, <b className={css.text_price}>мне понравилось!</b> Интересно было потренировать язык вне урока и в непринужденной обстановке. Собеседники попались приятные, иногда помогали мне сформулировать предложения. Еще <b className={css.text_price}>мне понравилась платформа</b>, создаётся ощущение, что <b className={css.text_price}>ты в самом деле сидишь в кресле</b> и разговариваешь на различные темы.</p>
                        </div>
                        <img src={white_card} alt="" className={css.bg_feedback}/>
                        <img src={white_card_mbl} alt="" className={css.bg_feedback_mbl}/>
                    </div>   
                </div>

                <div className={css.container_content}>
                    <div className={css.price_full_two}>
                        <div className={css.price_text_block_two}>
                            <img src={circle} alt="circle" className={css.circle}/>
                            <p className={css.price_title_two}>САМОСТОЯТЕЛЬНОЕ<br/>ОБУЧЕНИЕ</p>
                            <p className={css.text_price}>Преимущества самостоятельного обучения:</p>
                            
                            <ul className={css.price_text_li_block}>
                                <li className={css.price_text_li_yellow}>отсутствие давления и собственный темп</li>
                                <li className={css.price_text_li_yellow}>возможность изучать больше и быстрее</li>
                                <li className={css.price_text_li_yellow}>возможность изучать медленнее</li>
                                <li className={css.price_text_li_yellow}>обратная связь в любое время</li>
                                <li className={css.price_text_li_yellow}>изменение программы по запросу</li>
                                <li className={css.price_text_li_yellow}>наличие дедлайна по запросу</li>
                                <li className={css.price_text_li_yellow}>индивидуальный урок раз в месяц</li>
                            </ul>
                            <div className={css.duration_price_block} >
                                <p className={css.duration_price}>Абонемент: 4 недели</p>
                                <p className={css.duration_price}>Состав: задания, обратная связь, индивидуальный урок раз в месяц - для практики</p>
                            </div>
                            <div className={css.price_and_button}>
                                <p className={css.price__ot}>от</p>
                                <p className={css.price_bottom_text}>
                                    3500<br/><span>руб / 4 недели</span>
                                </p>
                                <a href="#win1"><button className={css.price_button}>ЗАПИСАТЬСЯ</button></a>
                            </div>
                        </div>
                        <img src={bg4} alt="img" className={css.bg_img}/>
                    </div>
                </div>
            </section>

            <div className={css.line_section_green}></div>

            <section className={css.container}>
                <div className={cn(css.container_content, css.arrow_block)}>
                    <p className={css.arrow_title}>Как начать обучение:</p>
                    <img src={arrow} alt="arrow" className={css.arrow}/>
                </div>
                <div className={cn(css.container_ind_lessons, css.container_content)}>
                    <div className={cn(css.orange_card, css.home_card, css.card_laptop)}>
                        <p className={css.text_price}>1. Оставьте заявку</p>
                        <li className={css.li_arrow} style={{marginTop: '55px'}}>оставьте свой номер телефона, привязанный к WhatsApp или Telegram (с открытым профилем), чтобы мы с вами связались</li>                 
                    </div>
                    <img src={loop} alt="" className={css.loop_left}/>
                    <div className={cn(css.home_card, css.card_laptop, css.white_card)}>
                        <p className={css.text_price} style={{paddingLeft: '30px'}}>2. Пройдите вводную беседу с методистом</p> 
                        <li className={css.li_arrow}>на вводном звонке познакомьтесь с методистом, программой, задайте вопросы и назначьте удобное расписание</li> 
                    </div>
                        <img src={loop} alt="" className={css.loop_right}/>
                    <div className={cn(css.orange_card, css.home_card, css.card_laptop)}>
                        <p className={css.text_price} style={{paddingLeft: '30px'}}>3. Начните обучение</p>
                        <li className={css.li_arrow} style={{marginTop: '55px'}}>идём по выбранному формату с преподавателем, который вам понравился</li> 
                        
                    </div>
                </div>
            </section> 

            <div className={css.line_section_yellow} id='about'></div>

            <section className={css.container}>    
                <div className={cn(css.container_content, css.arrow_block)}>
                    <p className={css.arrow_title}>О Фрегате</p>
                    <img src={arrow} alt="arrow" className={css.arrow}/>
                </div>
                <div className={css.container_content}>
                    <div className={css.price_full}>
                        <img src={bg7} alt="img" className={css.bg7_img}/>
                        <div className={css.price_text_block_bottom}>
                            <p className={css.price_title_bottom}>Языковая школа «Фрегат»<br/>- это яркое пространство<br/>для изучения языков<br/>и обмена опытом. <br/></p>

                            <p className={css.text_price_bottom}>В мире живут миллионы людей, которые горят тем же, что и наши студенты, но всех их разделяет языковой и культурный барьер. Наша миссия:  объединить родственные души и дать понять, что изучать иностранные языки - это весело и увлекательно. </p>
                            <p className={css.text_price_bottom}><span className={css.text_price_bottom_span}>основатель школы <span style={{whiteSpace: 'nowrap'}}>Елизавета Муждабаева</span></span> - эксперт в сфере преподавания иностранных языков, автор и дизайнер методических пособий и курсов</p>
                        </div>
                    </div>
                </div>
            </section> 
        </>
    )
}