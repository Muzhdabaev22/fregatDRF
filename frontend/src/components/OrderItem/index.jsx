import { useState } from 'react'
import css from './index.module.scss'

export const OrderItem = ({ 
    item, 
    index, 
    totalItems, 
    onMoveUp, 
    onMoveDown, 
    isAnimating 
}) => {
    const [isHovered, setIsHovered] = useState(false)

    const handleMoveUp = () => {
        if (index > 0 && !isAnimating) {
            onMoveUp(index)
        }
    }

    const handleMoveDown = () => {
        if (index < totalItems - 1 && !isAnimating) {
            onMoveDown(index)
        }
    }

    return (
        <div 
            className={`${css.item} ${isHovered ? css.item_hovered : ''}`}
            data-order={item.priority}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <p className={css.container_quest_order}>{item.question}</p>
            <div className={css.button_container_order}>
                <button 
                    onClick={handleMoveUp} 
                    className={`${css.button_order} ${css.button_up}`}
                    disabled={isAnimating || index === 0}
                    title="Переместить вверх"
                >
                    ⇑
                </button>
                <button 
                    onClick={handleMoveDown} 
                    className={`${css.button_order} ${css.button_down}`}
                    disabled={isAnimating || index === totalItems - 1}
                    title="Переместить вниз"
                >
                    ⇓
                </button>
            </div>
        </div>
    )
}
