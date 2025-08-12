import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import css from './index.module.scss'
import { getEpisodeDetails } from '../../api/api'
import { Notification } from '../../components/Notification'
import { OrderItem } from '../../components/OrderItem'
import { TestResults } from '../../components/TestResults'

export const EpisodePage = () => {
    const [episode, setEpisode] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [openSections, setOpenSections] = useState({
        script: false,
        vocabulary: false,
        test: false,
        order: false,
        discussion: false,
        substory: false
    })
    const [vocabularyState, setVocabularyState] = useState({})
    const [testAnswers, setTestAnswers] = useState({})
    const [orderItems, setOrderItems] = useState([])
    const [testResults, setTestResults] = useState(null)
    const [orderResults, setOrderResults] = useState(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const [notification, setNotification] = useState(null)
    const { episodeUrl } = useParams()
    const navigate = useNavigate()
    const orderContainerRef = useRef(null)

    useEffect(() => {
        if (episodeUrl) {
            fetchEpisodeDetails(episodeUrl)
        }
    }, [episodeUrl])

    useEffect(() => {
        const savedVocabulary = sessionStorage.getItem(`vocabulary_${episodeUrl}`)
        if (savedVocabulary) {
            setVocabularyState(JSON.parse(savedVocabulary))
        }
    }, [episodeUrl])

    const fetchEpisodeDetails = async (url) => {
        try {
            setLoading(true)
            setError(null)
            
            const response = await getEpisodeDetails(url)
            
            if (response && response.id) {
                setEpisode(response)
                
                if (response.order && response.order.length > 0) {
                    setOrderItems([...response.order].sort((a, b) => a.priority - b.priority))
                }
            } else {
                setError('Эпизод не найден или данные повреждены')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setError('Эпизод не найден')
                } else if (error.response.status >= 500) {
                    setError('Ошибка сервера. Попробуйте позже.')
                } else {
                    setError('Ошибка при загрузке эпизода')
                }
            } else if (error.request) {
                setError('Нет соединения с сервером. Проверьте интернет-соединение.')
            } else {
                setError('Ошибка при загрузке эпизода')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleBackToCinema = () => {
        navigate('/cinema')
    }

    const toggleSection = (sectionName) => {
        let isAvailable = false
        switch (sectionName) {
            case 'script':
                isAvailable = !!episode.script
                break
            case 'vocabulary':
                isAvailable = !!(episode.vocabulary && episode.vocabulary.length > 0)
                break
            case 'test':
                isAvailable = !!(episode.test && episode.test.length > 0)
                break
            case 'order':
                isAvailable = !!(episode.order && episode.order.length > 0)
                break
            case 'discussion':
                isAvailable = !!(episode.discus && episode.discus.length > 0)
                break
            case 'substory':
                isAvailable = !!(episode.story && episode.story.length > 0)
                break
            default:
                isAvailable = true
        }
        
        if (!isAvailable) {
            setNotification({
                message: `Секция "${sectionName}" недоступна для этого эпизода`,
                type: 'info',
                duration: 3000
            })
            return
        }
        
        setOpenSections(prev => ({
            ...prev,
            [sectionName]: !prev[sectionName]
        }))
    }

    const handleVocabularyChange = (vocabularyId, checked) => {
        const newState = { ...vocabularyState, [vocabularyId]: checked }
        setVocabularyState(newState)
        sessionStorage.setItem(`vocabulary_${episodeUrl}`, JSON.stringify(newState))
    }

    const handleTestAnswer = (questionId, value) => {
        setTestAnswers(prev => ({
            ...prev,
            [questionId]: value
        }))
    }

    const moveUp = (index) => {
        if (index > 0 && !isAnimating) {
            setIsAnimating(true)
            const newItems = [...orderItems]
            const temp = newItems[index]
            newItems[index] = newItems[index - 1]
            newItems[index - 1] = temp
            setOrderItems(newItems)
            
            setTimeout(() => setIsAnimating(false), 300)
        }
    }

    const moveDown = (index) => {
        if (index < orderItems.length - 1 && !isAnimating) {
            setIsAnimating(true)
            const newItems = [...orderItems]
            const temp = newItems[index]
            newItems[index] = newItems[index + 1]
            newItems[index + 1] = temp
            setOrderItems(newItems)
            
            setTimeout(() => setIsAnimating(false), 300)
        }
    }

    const checkOrder = () => {
        const correctOrder = orderItems.every((item, index) => item.priority === index + 1)
        
        setOrderResults({
            correct: correctOrder,
            message: correctOrder ? '✓ Порядок правильный!' : '✗ Порядок неправильный!'
        })
        
        setNotification({
            message: correctOrder ? 'Порядок правильный!' : 'Порядок неправильный!',
            type: correctOrder ? 'success' : 'error',
            duration: 3000
        })
        
        setTimeout(() => setOrderResults(null), 5000)
    }

    const checkTest = () => {
        if (!episode.test) return

        const allAnswered = episode.test.every(question => testAnswers[question.id])
        if (!allAnswered) {
            alert('Пожалуйста, ответьте на все вопросы перед проверкой.')
            return
        }

        const results = episode.test.map(question => {
            const userAnswer = testAnswers[question.id]
            const isCorrect = userAnswer === question.correct.toString()
            return {
                question: question.question,
                userAnswer: userAnswer,
                correctAnswer: getCorrectAnswerText(question, question.correct),
                isCorrect: isCorrect
            }
        })

        setTestResults({
            type: 'test',
            results: results
        })
    }

    const resetTest = () => {
        setTestAnswers({})
        setTestResults(null)
    }

    const getCorrectAnswerText = (question, correctValue) => {
        if (!question) return `Вариант ${correctValue}`
        const answers = [question.first, question.second, question.third]
        return answers[correctValue - 1] || `Вариант ${correctValue}`
    }

    if (loading) {
        return (
            <div className={css.episode_page}>
                <div className={css.loading_container}>
                    <div className={css.loading_spinner}></div>
                    <h2 className={css.loading_title}>Загрузка эпизода...</h2>
                    <p className={css.loading_subtitle}>Пожалуйста, подождите</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={css.episode_page}>
                <div className={css.error_container}>
                    <h2 className={css.error_title}>Ошибка</h2>
                    <p className={css.error_message}>{error}</p>
                    <div className={css.error_actions}>
                        <button 
                            onClick={() => fetchEpisodeDetails(episodeUrl)}
                            className={css.retry_button}
                        >
                            🔄 Попробовать снова
                        </button>
                        <button 
                            onClick={handleBackToCinema}
                            className={css.back_button}
                        >
                            ← Вернуться к фильмам
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (!episode) {
        return (
            <div className={css.episode_page}>
                <div className={css.error_container}>
                    <h2 className={css.error_title}>Эпизод не найден</h2>
                    <p className={css.error_message}>Запрашиваемый эпизод не существует</p>
                    <button 
                        onClick={handleBackToCinema}
                        className={css.back_button}
                    >
                        Вернуться к фильмам
                    </button>
                </div>
            </div>
        )
    }

    return (
        <main className={css.cinema_container}>
            
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    duration={notification.duration}
                    onClose={() => setNotification(null)}
                />
            )}
            
            <div className={css.episode}>
                <div className={css.episode__right}>
                    {episode.video ? (
                        <video 
                            id="my-video"
                            controls 
                            preload="metadata"
                            className={css.episode_video}
                            poster={episode.img}
                            crossOrigin="anonymous"
                            onError={(e) => {
                                console.error('Ошибка загрузки видео:', e);
                                setNotification({
                                    message: 'Ошибка загрузки видео. Попробуйте обновить страницу.',
                                    type: 'error',
                                    duration: 5000
                                });
                            }}
                        >
                            <source src={episode.video} type="video/mp4"/>
                            <source src={episode.video} type="video/webm"/>
                            Ваш браузер не поддерживает видео.
                        </video>
                    ) : (
                        <div className={css.no_video}>
                            <img 
                                src={episode.img} 
                                alt={episode.title} 
                                className={css.episode_image}
                            />
                            <div className={css.video_unavailable_message}>
                                <p>🎬 Видео недоступно</p>
                                <p className={css.video_unavailable_subtitle}>Для этого эпизода видео не было добавлено</p>
                            </div>
                        </div>
                    )}
                </div>  

                <div className={css.episode__left}>
                    <div className={css.episode_wrapper}>
                        <div className={css.episode_wrapper__header}>
                            <h1>{episode.title}</h1>
                        </div>
                        <div className={css.episode_wrapper__content}>
                            <div className={css.episode_desc}>
                                <div className={css.episode_desc__desc}>
                                    <p>
                                        <span className={css.bold_text}>Level</span> — {episode.level && episode.level[0] ? (typeof episode.level[0] === 'object' ? episode.level[0].level : episode.level[0]) : 'Не указан'}<br/>
                                        <span className={css.bold_text}>Accent</span> — {episode.accent && episode.accent[0] ? (typeof episode.accent[0] === 'object' ? episode.accent[0].accent : episode.accent[0]) : 'Не указан'}<br/>
                                        <span className={css.bold_text}>Topic</span> — {episode.topic && episode.topic[0] ? (typeof episode.topic[0] === 'object' ? episode.topic[0].topic : episode.topic[0]) : 'Не указан'}
                                    </p>
                                    <p>
                                        Автор материала — {episode.author && episode.author[0] ? (
                                            <a href={episode.author[0].url} target="_blank" rel="noopener noreferrer">
                                                {typeof episode.author[0] === 'object' ? episode.author[0].name : episode.author[0]}
                                            </a>
                                        ) : 'Не указан'}
                                    </p>
                                    <p>
                                        Встречи киноклуба каждую неделю.<br/>
                                        Пиши нам для записи.
                                    </p>
                                </div>
                                <div className={css.episode_desc__cover}>
                                    <img src={episode.img} alt="logo" className={css.episode_desc__img}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={css.episode_wrapper}>
                        <div 
                            className={`${css.cinema_block_arrow} ${openSections.script ? css.cinema_block_arrow_open : ''}`}
                            onClick={() => toggleSection('script')}
                        >
                            <p className={css.title_task}>
                                Script
                                {!episode.script && <span className={css.unavailable_indicator}> (недоступно)</span>}
                            </p>
                            <svg fill="#a7dd97" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                                <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                            </svg>
                        </div>
                        <div className={css.opened_window} style={{ display: openSections.script ? 'block' : 'none' }}>
                            {episode.script ? (
                                <div className={css.script_content} dangerouslySetInnerHTML={{ __html: episode.script }} />
                            ) : (
                                <div className={css.unavailable_message}>
                                    <p>📝 Скрипт недоступен</p>
                                    <p className={css.unavailable_subtitle}>Для этого эпизода скрипт не был добавлен</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={css.episode_wrapper}>
                        <div 
                            className={`${css.cinema_block_arrow} ${openSections.vocabulary ? css.cinema_block_arrow_open : ''}`}
                            onClick={() => toggleSection('vocabulary')}
                        >
                            <p className={css.title_task}>
                                Vocabulary box
                                {(!episode.vocabulary || episode.vocabulary.length === 0) && <span className={css.unavailable_indicator}> (недоступно)</span>}
                            </p>
                            <svg fill="#a7dd97" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                                <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                            </svg>
                        </div>
                        <div className={css.opened_window} style={{ display: openSections.vocabulary ? 'block' : 'none' }}>
                            {episode.vocabulary && episode.vocabulary.length > 0 ? (
                                <>
                                    <p className={css.text_explanation}>Click on the word when you hear it in the video.</p>
                                    {episode.vocabulary.map((vocab) => (
                                        <div key={vocab.id} className={css.vocabulary_word_line}>
                                            <input 
                                                type="checkbox" 
                                                className={css.input_vocabulary} 
                                                id={`voc_${vocab.id}`}
                                                checked={vocabularyState[vocab.id] || false}
                                                onChange={(e) => handleVocabularyChange(vocab.id, e.target.checked)}
                                            />
                                            <label className={css.label_vocabulary} htmlFor={`voc_${vocab.id}`}>
                                                {vocab.word}<br/>
                                            </label> 
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className={css.unavailable_message}>
                                    <p>🧠 Словарь недоступен</p>
                                    <p className={css.unavailable_subtitle}>Для этого эпизода словарь не был добавлен</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={css.episode_wrapper}>
                        <div 
                            className={`${css.cinema_block_arrow} ${openSections.test ? css.cinema_block_arrow_open : ''}`}
                            onClick={() => toggleSection('test')}
                        >
                            <p className={css.title_task}>
                                Test
                                {(!episode.test || episode.test.length === 0) && <span className={css.unavailable_indicator}> (недоступно)</span>}
                            </p>
                            <svg fill="#a7dd97" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                                <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                            </svg>
                        </div>
                        <div className={css.opened_window} style={{ display: openSections.test ? 'block' : 'none' }}>
                            {episode.test && episode.test.length > 0 ? (
                                <>
                                    <form name="test-form" id="test-form">
                                        {episode.test.map((question, index) => (
                                            <div key={question.id} className={css.test_question_container} data-correct={question.correct}>
                                                <p className={css.text_explanation}>{index + 1}. {question.question}</p>
                                                <div className={css.test_question_line}>
                                                    <div className={css.input_label_line}>
                                                        <input 
                                                            type="radio" 
                                                            className={css.input_test} 
                                                            name={`test-${question.id}`} 
                                                            id={`test_${question.id}_${question.first}`} 
                                                            value="1"
                                                            checked={testAnswers[question.id] === "1"}
                                                            onChange={() => handleTestAnswer(question.id, "1")}
                                                        />
                                                        <label className={css.label_test} htmlFor={`test_${question.id}_${question.first}`}>
                                                            {question.first}<br/>
                                                        </label> 
                                                    </div>
                                                    <div className={css.input_label_line}>
                                                        <input 
                                                            type="radio" 
                                                            className={css.input_test} 
                                                            name={`test-${question.id}`} 
                                                            id={`test_${question.id}_${question.second}`} 
                                                            value="2"
                                                            checked={testAnswers[question.id] === "2"}
                                                            onChange={() => handleTestAnswer(question.id, "2")}
                                                        />
                                                        <label className={css.label_test} htmlFor={`test_${question.id}_${question.second}`}>
                                                            {question.second}<br/>
                                                        </label> 
                                                    </div>
                                                    <div className={css.input_label_line}>
                                                        <input 
                                                            type="radio" 
                                                            className={css.input_test} 
                                                            name={`test-${question.id}`} 
                                                            id={`test_${question.id}_${question.third}`} 
                                                            value="3"
                                                            checked={testAnswers[question.id] === "3"}
                                                            onChange={() => handleTestAnswer(question.id, "3")}
                                                        />
                                                        <label className={css.label_test} htmlFor={`test_${question.id}_${question.third}`}>
                                                            {question.third}<br/>
                                                        </label> 
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className={css.submit_test_div}>           
                                            <button type="button" onClick={checkTest} className={css.submit_again}>
                                                Проверить ответы
                                            </button>
                                        </div> 
                                    </form>
                                    
                                    {testResults && testResults.type === 'test' && (
                                        <TestResults
                                            results={testResults.results}
                                            onReset={resetTest}
                                        />
                                    )}
                                </>
                            ) : (
                                <div className={css.unavailable_message}>
                                    <p>🧠 Тест недоступен</p>
                                    <p className={css.unavailable_subtitle}>Для этого эпизода тест не был добавлен</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={css.episode_wrapper}>
                        <div 
                            className={`${css.cinema_block_arrow} ${openSections.order ? css.cinema_block_arrow_open : ''}`}
                            onClick={() => toggleSection('order')}
                        >
                            <p className={css.title_task}>
                                Right order
                                {(!episode.order || episode.order.length === 0) && <span className={css.unavailable_indicator}> (недоступно)</span>}
                            </p>
                            <svg fill="#a7dd97" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                                <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                            </svg>
                        </div>
                        <div className={css.opened_window} style={{ display: openSections.order ? 'block' : 'none' }}>
                            {episode.order && episode.order.length > 0 ? (
                                <>
                                    <p className={css.text_explanation}>Put the events in the right order:</p>
                                    <div ref={orderContainerRef} id="container-order" className={css.container_order}>
                                        {orderItems.map((item, index) => (
                                            <OrderItem
                                                key={item.id}
                                                item={item}
                                                index={index}
                                                totalItems={orderItems.length}
                                                onMoveUp={moveUp}
                                                onMoveDown={moveDown}
                                                isAnimating={isAnimating}
                                            />
                                        ))}
                                    </div>
                                    <button onClick={checkOrder} className={css.submit_again}>
                                        Проверить порядок
                                    </button>
                                    
                                    {orderResults && (
                                        <div className={css.order_result}>
                                            <p className={orderResults.correct ? css.qsm_text_correct_option : css.qsm_text_wrong_option}>
                                                {orderResults.message}
                                            </p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className={css.unavailable_message}>
                                    <p>🧠 Упражнение "Правильный порядок" недоступно</p>
                                    <p className={css.unavailable_subtitle}>Для этого эпизода упражнение "Правильный порядок" не было добавлено</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={css.episode_wrapper}>
                        <div 
                            className={`${css.cinema_block_arrow} ${openSections.discussion ? css.cinema_block_arrow_open : ''}`}
                            onClick={() => toggleSection('discussion')}
                        >
                            <p className={css.title_task}>
                                Discussion board
                                {(!episode.discus || episode.discus.length === 0) && <span className={css.unavailable_indicator}> (недоступно)</span>}
                            </p>
                            <svg fill="#a7dd97" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                                <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                            </svg>
                        </div>
                        <div className={css.opened_window} style={{ display: openSections.discussion ? 'block' : 'none' }}>
                            {episode.discus && episode.discus.length > 0 ? (
                                episode.discus.map((discussion) => (
                                    <div key={discussion.id} className={css.discus_question}>
                                        {discussion.question}
                                    </div>
                                ))
                            ) : (
                                <div className={css.unavailable_message}>
                                    <p>💬 Вопросы для обсуждения недоступны</p>
                                    <p className={css.unavailable_subtitle}>Для этого эпизода вопросы для обсуждения не были добавлены</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={css.episode_wrapper}>
                        <div 
                            className={`${css.cinema_block_arrow} ${openSections.substory ? css.cinema_block_arrow_open : ''}`}
                            onClick={() => toggleSection('substory')}
                        >
                            <p className={css.title_task}>
                                SubStory
                                {(!episode.story || episode.story.length === 0) && <span className={css.unavailable_indicator}> (недоступно)</span>}
                            </p>
                            <svg fill="#a7dd97" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330">
                                <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                            </svg>
                        </div>
                        <div className={css.opened_window} style={{ display: openSections.substory ? 'block' : 'none' }}>
                            {episode.story && episode.story.length > 0 ? (
                                episode.story.map((story) => (
                                    <div key={story.id} className={css.container_substory}>
                                        <img src={story.image} alt="img" className={css.img_substory}/>
                                        <div className={css.substory_text_detail}>
                                            <span className={css.bold_text}>Let us think about what was before:</span>
                                            <p>{story.bef_one}</p>
                                            <p>{story.bef_two}</p>
                                            <p>{story.aft_one}</p>
                                            <br/>
                                            <span className={css.bold_text}>Now think about what will happen after:</span>
                                            <p>{story.aft_one}</p>
                                            <p>{story.aft_two}</p>
                                            <p>{story.aft_three}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={css.unavailable_message}>
                                    <p>🧠 SubStory недоступен</p>
                                    <p className={css.unavailable_subtitle}>Для этого эпизода SubStory не было добавлено</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
