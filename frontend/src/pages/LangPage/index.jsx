import css from './index.module.scss'
import eng_girl from '../../assets/images/eng-girl.png'
import circle from '../../assets/images/circle.png'
import linehover from '../../assets/images/linehover.png'
import { gsap } from '../../lib/gsap'
import cn from 'classnames'
import { useEffect, useRef } from 'react'

export const LangPage = () => {
    const centerBlock = useRef(null)
    const langBlock1 = useRef(null)
    const langBlock2 = useRef(null)
    const langBlock3 = useRef(null)
    const langBlock4 = useRef(null)
    const langBlock5 = useRef(null)
    const langBlock6 = useRef(null)
    const langBlock7 = useRef(null)
    const langBlock8 = useRef(null)

    useEffect(() => {
        if (!centerBlock.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: centerBlock.current,
                    start: 'top top',
                    end: '+=2000',
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                    refreshPriority: 1,
                }
            });

            tl.fromTo(langBlock1.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.1)
              .fromTo(langBlock2.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.5)
              .fromTo(langBlock3.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.7)
              .fromTo(langBlock4.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.3)
              .fromTo(langBlock5.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.8)
              .fromTo(langBlock6.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.4)
              .fromTo(langBlock7.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.2)
              .fromTo(langBlock8.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.6);
        }, centerBlock); 

        return () => {
            ctx.revert(); 
        };
    }, []); 

    return (
        <>
            <div className={css.center_block_wrapper}>
                <div ref={centerBlock} className={css.center_block}>
                    <div style={{ position: 'relative' }}>
                        <img className={css.circle} src={circle} alt="circle" />
                        <h1 className={css.h1_langs} style={{ paddingTop: '70px' }}>
                            АНГЛИЙСКИЙ ЯЗЫК
                        </h1>
                        <img className={css.line} src={linehover} alt="linehover" />
                    </div>
                    <img src={eng_girl} alt="girl" className={css.eng_girl_img} />

                    <div ref={langBlock1} className={cn(css.lang_animation_block, css.lang_block_1)}>
                        разговорный английский
                    </div>
                    <div ref={langBlock2} className={cn(css.lang_animation_block, css.lang_block_2)}>
                        подготовка к ЕГЭ/ОГЭ
                    </div>
                    <div ref={langBlock3} className={cn(css.lang_animation_block, css.lang_block_3)}>
                        английский для детей
                    </div>
                    <div ref={langBlock4} className={cn(css.lang_animation_block, css.lang_block_4)}>
                        английский для профессий
                    </div>
                    <div ref={langBlock5} className={cn(css.lang_animation_block, css.lang_block_5)}>
                        подготовка к иммиграции
                    </div>
                    <div ref={langBlock6} className={cn(css.lang_animation_block, css.lang_block_6)}>
                        подготовка к IELTS
                    </div>
                    <div ref={langBlock7} className={cn(css.lang_animation_block, css.lang_block_7)}>
                        корпоративное обучение
                    </div>
                    <div ref={langBlock8} className={cn(css.lang_animation_block, css.lang_block_8)}>
                        английский для путешествий
                    </div>
                </div>
            </div>

            <div className={css.line_section_pink}></div>
            <div style={{ height: '1000px' }}></div>
        </>
    );
};