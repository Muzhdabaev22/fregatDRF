import { ContainerConctactForm } from '../ContainerContactForm'
import css from '../Header/index.module.scss'
import { getPoliticRoute } from '../../lib/routes'
import { Link } from 'react-router-dom'
import classNames from 'classnames'


export const ContactForm = ({typeForm}) => (
  <ContainerConctactForm onSuccess={() => {}}>
    {(formik) => (
      <div className={css.form_container}>
        <form onSubmit={formik.handleSubmit} className={classNames({[css.block__form__form]: typeForm === 1, [css.form]: typeForm === 2})}>
          
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Ваше имя"
            className={classNames({[css.block__form__input]: typeForm === 1, [css.block__form__input_second]: typeForm === 2})}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.name && formik.errors.name && (
            <div className={css.error}>{formik.errors.name}</div>
          )}

          <input
            name="social"
            value={formik.values.social}
            onChange={formik.handleChange}
            placeholder="Ссылка на соцсеть VK/TG/Whatsapp"
            className={classNames({[css.block__form__input]: typeForm === 1, [css.block__form__input_second]: typeForm === 2})}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.social && formik.errors.social && (
            <div className={css.error}>{formik.errors.social}</div>
          )}

          <div className={css.vocabulary_word_line}>
            <input
              type="checkbox"
              id={typeForm}
              name="agree"
              checked={formik.values.agree}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor={typeForm} className={css.label_vocabulary}>
              Согласие с {typeForm === 1 && (<br/>)}
              <Link
                to={getPoliticRoute}
                style={{ textDecoration: 'underline', color: 'black' }}
              >
                Политикой конфиденциальности
              </Link>
            </label>
          </div>
          {formik.touched.agree && formik.errors.agree && (
            <div className={css.error}>{formik.errors.agree}!</div>
          )}

          <button
            type="submit"
            className={css.block__form__button}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Отправка...' : 'Отправить'}
          </button>
        </form>

        {formik.status?.success && (
          <div className={css.success_notification}>
            Заявка отправлена! Свяжемся с вами в ближайшее время.
          </div>
        )}

        {formik.status?.error && (
          <div className={css.error_notification}>
            Отправить заявку не удалось.
          </div>
        )}
      </div>
    )}
  </ContainerConctactForm>
);
