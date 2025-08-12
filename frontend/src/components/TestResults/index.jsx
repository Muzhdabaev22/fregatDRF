import { useState, useEffect } from 'react'
import css from './index.module.scss'

export const TestResults = ({ results, onReset }) => {
    const [visibleResults, setVisibleResults] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (results && results.length > 0) {
            // Показываем результаты последовательно с анимацией
            const timer = setInterval(() => {
                if (currentIndex < results.length) {
                    setVisibleResults(prev => [...prev, results[currentIndex]])
                    setCurrentIndex(prev => prev + 1)
                } else {
                    clearInterval(timer)
                }
            }, 200)

            return () => clearInterval(timer)
        }
    }, [results, currentIndex])

    if (!results || results.length === 0) return null

    const correctCount = results.filter(r => r.isCorrect).length
    const totalCount = results.length
    const percentage = Math.round((correctCount / totalCount) * 100)

    return (
        <div className={css.test_results}>
            <div className={css.test_results_header}>
                <h3>Результаты теста</h3>
                <div className={css.test_summary}>
                    <div className={css.score_circle}>
                        <span className={css.score_percentage}>{percentage}%</span>
                        <span className={css.score_fraction}>{correctCount}/{totalCount}</span>
                    </div>
                    <div className={css.score_text}>
                        <p className={css.score_title}>
                            {percentage >= 80 ? 'Отлично!' : 
                             percentage >= 60 ? 'Хорошо!' : 
                             percentage >= 40 ? 'Удовлетворительно' : 'Попробуйте еще раз'}
                        </p>
                        <p className={css.score_subtitle}>
                            Правильных ответов: {correctCount} из {totalCount}
                        </p>
                    </div>
                </div>
            </div>
            
            <div className={css.results_list}>
                {visibleResults.map((result, index) => (
                    <div 
                        key={index} 
                        className={`${css.question_result} ${css.question_result_visible}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <p className={css.text_explanation}>{result.question}</p>
                        <div className={css.test_result_line}>
                            {result.isCorrect ? (
                                <div className={css.correct_answer}>
                                    <span className={css.result_icon}>✓</span>
                                    <p className={css.qsm_text_correct_option}>Ваш ответ правильный!</p>
                                </div>
                            ) : (
                                <div className={css.wrong_answer}>
                                    <span className={css.result_icon}>✗</span>
                                    <p className={css.qsm_text_wrong_option}>
                                        Ваш ответ неправильный. Правильный ответ: {result.correctAnswer}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
            <button onClick={onReset} className={css.submit_again}>
                Пройти тест заново
            </button>
        </div>
    )
}
