import css from './index.module.scss'
import vk from '../../assets/images/vk.png'
import ws from '../../assets/images/ws.png'
import tg from '../../assets/images/tg.png'
import { getBlogRoute, getCinemaRoute, getHomeRoute, getLangRoute, getPoliticRoute, getOfertaRoute } from '../../lib/routes'

export const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.container_footer}>
                <div className={css.footer_links}>
                    <a href={getHomeRoute} className={css.link_footer}>Главная</a>
                    <a href={getLangRoute} className={css.link_footer}>Языки</a>
                    <a href="/#price" className={css.link_footer}>Стоимость</a>
                    <a href={getBlogRoute} className={css.link_footer}>Блог</a>
                    <a href="#win1" className={css.link_footer}>Связаться</a>
                    <a href={getCinemaRoute} className={css.link_footer}>Киноклуб</a>
                </div>
                <div className={css.footer_info}>
                    <div className={css.social_media_icons}>
                            <a href="https://vk.com/frigateschool" target="_blank">
                                <img src={vk} className={css.icon_soc} alt="icon"/>
                            </a>
                            <a href="https://wa.me/+79785502653" target="_blank">
                                <img src={ws} className={css.icon_soc} alt="icon"/>
                            </a>
                            <a href="https://t.me/frigateschool" target="_blank">
                                <img src={tg} className={css.icon_soc} alt="icon" style={{margin: '3px'}}/>
                            </a>
                    </div>
                    <p className={css.footer_text}>
                        © Языковая школа Фрегат 2021 <a href="https://vk.com/lizulya_mahboula?from=search"><br/> Дизайн - Елизавета Муждабаева <br/></a> 
                        <a href="https://vk.com/hurricane_chroniclenr">Разработка - Муждабаев Эдем</a><br />
                        <a href={getPoliticRoute}>Политика конфиденциальности</a><br/>
                        <a href={getOfertaRoute}>Договор оферты</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}