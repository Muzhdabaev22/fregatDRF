import { useState, useEffect } from 'react'
import css from './index.module.scss'
import blog_bg_1 from '../../assets/images/blog-bg-1.png'
import circle from '../../assets/images/circle.png'
import arrow from '../../assets/images/arrow.png'
import { getBlogPosts } from '../../api/api'

export const BlogPage = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [selectedPost, setSelectedPost] = useState(null)

    useEffect(() => {
        fetchPosts(currentPage)
    }, [currentPage])

    const fetchPosts = async (page = 1) => {
        try {
            setLoading(true)
            const response = await getBlogPosts(page)
            if (response && response.results) {
                setPosts(response.results)
                setTotalPages(Math.ceil(response.count / 12)) 
            }
        } catch (error) {
            console.error('Ошибка при загрузке постов:', error)
        } finally {
            setLoading(false)
        }
    }

    const handlePostClick = (post) => {
        setSelectedPost(post)
        document.body.style.overflow = 'hidden' // Блокируем прокрутку при открытии модального окна
    }

    const handleCloseModal = () => {
        setSelectedPost(null)
        document.body.style.overflow = 'auto' // Восстанавливаем прокрутку
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo(0, 0) // Прокручиваем наверх при смене страницы
    }

    const renderPagination = () => {
        const pages = []
        const maxVisiblePages = 5
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i}>
                    <button 
                        onClick={() => handlePageChange(i)}
                        className={i === currentPage ? css.active : ''}
                    >
                        {i}
                    </button>
                </li>
            )
        }

        return pages
    }

    return (
        <>
            <div className={css.blog_header_container}>
                <div className={css.container_content}>
                    <div className={css.blog_block_text_header}>
                        <img src={circle} alt="circle" className={css.circle}/>
                        <p className={css.blog_header_title}>Блог - сундук с сокровищами</p>

                        <div className={css.arrow_block}>
                            <p className={css.arrow_title}>
                                потому что здесь мы храним все секретные знания.
                                Читай и прокачивай свои навыки.
                            </p>    
                            <img src={arrow} alt="arrow" className={css.arrow}/>
                        </div>

                        <p className={css.text_description}>Здесь вы найдёте:</p>
                        <ul className={css.text_description_li_block}>
                            <li className={css.price_text_li}>мотивационные статьи</li>
                            <li className={css.price_text_li}>уникальные методы запоминания слов</li>
                            <li className={css.price_text_li}>советы по изучению языков</li>
                            <li className={css.price_text_li}>культурные особенности</li>
                            <li className={css.price_text_li}>истории из жизни преподавателей</li>
                            <li className={css.price_text_li}>кейсы учеников</li>
                        </ul>
                        <div className={css.img_bg_top}>
                            <img src={blog_bg_1} alt="animation"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={css.line_section_pink}></div>

            {/* Секция с постами блога */}
            <main className={css.main_blog}>
                <div>
                    {loading ? (
                        <div className={css.loading}>Загрузка постов...</div>
                    ) : (
                        <>
                            <div className={css.posts_div}>
                                {posts.map((post) => (
                                    <div 
                                        key={post.id}
                                        className={css.blog_card}
                                        onClick={() => handlePostClick(post)}
                                    >
                                        <img 
                                            src={post.img ? (post.img.startsWith('http') ? post.img : `http://127.0.0.1:8000${post.img}`) : '/placeholder.jpg'} 
                                            alt={post.title} 
                                            className={css.blog_img}
                                            onError={(e) => {
                                                console.error('Ошибка загрузки изображения:', post.img, e.target.src)
                                                e.target.src = '/placeholder.jpg'
                                            }}
                                        />
                                        <div className={css.blog_title}>
                                            {post.title}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Пагинация */}
                            {totalPages > 1 && (
                                <div className={css.pagination}>
                                    <ul className={css.pagination_list}>
                                        {currentPage > 1 && (
                                            <li>
                                                <button 
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    className={css.prev}
                                                >
                                                    &lt;
                                                </button>
                                            </li>
                                        )}
                                        
                                        {renderPagination()}
                                        
                                        {currentPage < totalPages && (
                                            <li>
                                                <button 
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    className={css.next}
                                                >
                                                    &gt;
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* Модальное окно для поста */}
            {selectedPost && (
                <div className={css.dm_overlay} onClick={handleCloseModal}>
                    <div className={css.dm_table}>
                        <div className={css.dm_cell}>
                            <div className={css.dm_modal2} onClick={(e) => e.stopPropagation()}>
                                <button className={css.close} onClick={handleCloseModal}></button>
                                <h1 className={css.modal_title}>{selectedPost.title}</h1>
                                <div 
                                    className={css.modal_content}
                                    dangerouslySetInnerHTML={{ __html: selectedPost.text }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </> 
    )
}