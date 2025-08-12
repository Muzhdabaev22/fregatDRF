import css from './index.module.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCinemaPosts } from '../../api/api'

export const CinemaPage = () => {
    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedLevel, setSelectedLevel] = useState('all')
    const [availableLevels, setAvailableLevels] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchFilms()
    }, [])

    useEffect(() => {
        filterMoviesByLevel()
    }, [selectedLevel, movies])

    const fetchFilms = async () => {
        try {
            setLoading(true)
            const response = await getCinemaPosts()
            if (response && response.results) {
                setMovies(response.results)
                
                // Собираем все доступные уровни из эпизодов
                const levels = new Set()
                response.results.forEach(movie => {
                    movie.episodes.forEach(episode => {
                        if (episode.level && episode.level.length > 0) {    
                            episode.level.forEach(level => {
                                if (typeof level === 'object') {
                                    levels.add(level.level)
                                } else {
                                    levels.add(level)
                                }
                            })
                        }
                    })
                })
                setAvailableLevels(Array.from(levels).sort())
            }
        } catch (error) {
            console.error('Ошибка при загрузке фильмов:', error)
        } finally {
            setLoading(false)
        }
    }

    const filterMoviesByLevel = () => {
        if (selectedLevel === 'all') {
            setFilteredMovies(movies)
        } else {
            const filtered = movies.filter(movie => 
                movie.episodes.some(episode => {
                    if (episode.level && episode.level.length > 0) {
                        return episode.level.some(level => {
                            if (typeof level === 'object') {
                                return level.level === selectedLevel
                            }
                            return level === selectedLevel
                        })
                    }
                    return false
                })
            )
            setFilteredMovies(filtered)
        }
    }

    const handleLevelChange = (event) => {
        setSelectedLevel(event.target.value)
    }

    const handleEpisodeClick = (episodeUrl) => {
        navigate(`/episode/${episodeUrl}`)
    }

    const handleMovieClick = (movie) => {
        // Переходим на первый эпизод фильма
        if (movie.episodes && movie.episodes.length > 0) {
            const firstEpisode = movie.episodes[0]
            navigate(`/episode/${firstEpisode.url}`)
        }
    }
    
    return (
        <div className={css.cinema_page}>
            {/* Форма выбора уровня */}
            <div className={css.filter_container}>
                <label htmlFor="level-select" className={css.filter_label}>
                    Выберите уровень:
                </label>
                <select 
                    id="level-select" 
                    value={selectedLevel} 
                    onChange={handleLevelChange}
                    className={css.level_select}
                >
                    <option value="all">Все уровни</option>
                    {availableLevels.map(level => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className={css.cinema_films}>
                {loading ? (
                    <div className={css.loading}>Загрузка фильмов...</div>
                ) : filteredMovies.length === 0 ? (
                    <div className={css.no_results}>
                        {selectedLevel === 'all' 
                            ? 'Фильмы не найдены' 
                            : `Фильмы для уровня "${selectedLevel}" не найдены`
                        }
                    </div>
                ) : (
                    filteredMovies.map((movie) => (
                        <div className={css.cinema_film} key={movie.id}>
                            <div 
                                className={css.cinema_film_linkImg}
                                onClick={() => handleMovieClick(movie)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={movie.img} alt="logo_film" />
                            </div>                    
                            <div 
                                className={css.cinema_film_title}
                                onClick={() => handleMovieClick(movie)}
                                style={{ cursor: 'pointer' }}
                            >
                                {movie.title}
                            </div>
                            
                            {/* Показываем только эпизоды выбранного уровня */}
                            <div className={css.film_episodes}> 
                                {movie.episodes
                                    .filter(episode => {
                                        if (selectedLevel === 'all') return true
                                        if (episode.level && episode.level.length > 0) {
                                            return episode.level.some(level => {
                                                if (typeof level === 'object') {
                                                    return level.level === selectedLevel
                                                }
                                                return level === selectedLevel
                                            })
                                        }
                                        return false
                                    })
                                    .map((episode) => (
                                        <button 
                                            key={episode.id} 
                                            onClick={() => handleEpisodeClick(episode.url)}
                                            className={css.episode_link}
                                        >
                                            Эпизод {episode.number_epis}
                                        </button>
                                    ))
                                }
                            </div> 
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}