import css from './index.module.scss'
import linehover from '../../assets/images/linehover.png'
import circle from '../../assets/images/circle.png'
import girl from '../../assets/images/bg1.png'


export const HomePage = () => {
    return (
        <>
            <section className={css.section}>
                <div className={css.text_section_div}>
                    <img className={css.circle} src={circle} alt="circle"/>
                    <h1 className={css.h1_text_section}>Учи языки<br />на борту Фрегата!</h1>
                    <img className={css.line} src={linehover} alt="linehover"/>
                    <p className={css.other_text}>все языки в одном месте</p>
                    <p className={css.p_section}>Забудь о языке жестов и онлайн-переводчиках!</p>
                    <a href="#win1" className={css.button_contact}>
                        <button className={css.one_main_section_button}>ЗАПИСАТЬСЯ</button>
                    </a>
                </div>

                <div className={css.section_img}>
                    <img src={girl} alt="person"  />
                </div>
            </section> 
        </>
    )
}