import { useState, useEffect } from 'react'
import css from './index.module.scss'

export const Notification = ({ message, type, duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        // Показываем уведомление
        const showTimer = setTimeout(() => setIsVisible(true), 10)
        
        // Скрываем уведомление через указанное время
        const hideTimer = setTimeout(() => {
            setIsExiting(true)
            setTimeout(() => {
                setIsVisible(false)
                onClose && onClose()
            }, 400)
        }, duration)

        return () => {
            clearTimeout(showTimer)
            clearTimeout(hideTimer)
        }
    }, [duration, onClose])

    if (!isVisible) return null

    return (
        <div className={`${css.notification} ${css[`notification_${type}`]} ${isExiting ? css.notification_exiting : ''}`}>
            <div className={css.notification_content}>
                <span className={css.notification_icon}>
                    {type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
                </span>
                <span className={css.notification_message}>{message}</span>
            </div>
        </div>
    )
}
