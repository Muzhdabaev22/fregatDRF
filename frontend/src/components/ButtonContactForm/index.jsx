import css from './index.module.scss'
import tgForm from '../../assets/images/tgform.png'
import vkForm from '../../assets/images/vkform.png'
import wsForm from '../../assets/images/wsform.png'
import {ContactForm} from '../ContactForm'

export const ButtonContactForm = () => {
    return (
        <div className={css.dm_overlay} id="win1">
            <div className={css.dm_table}>
                <div className={css.dm_cell}>
                    <div className={css.dm_modal}>
                        <a href="#close" className={css.close}></a>
                        <h3 className={css.block__form__title}>Заполните форму, мы свяжемся с вами!</h3>

                        <ContactForm typeForm={2}/>

                        <p className={css.form__title}>Напишите нам в мессенджерах:</p>
                        <div className={css.form__social}>
                            <a href="https://vk.com/frigateschool " target="_blank" rel="noopener noreferrer">
                                <img src={vkForm} alt="vk" />
                            </a>
                            <a href="https://wa.me/+79785502653 " target="_blank" rel="noopener noreferrer">
                                <img src={wsForm} alt="ws" />
                            </a>
                            <a href="https://t.me/frigateschool " target="_blank" rel="noopener noreferrer">
                                <img src={tgForm} alt="tg" />
                            </a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}