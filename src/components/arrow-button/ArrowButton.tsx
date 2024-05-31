import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;
export type Button = {
	isMenuOpen: boolean;
	pressButton: OnClick;
};

export const ArrowButton = (props: Button | any) => {
	const openContainerClass = `${styles.container} ${styles.container_open}`;
	const openArrowClass = `${styles.arrow} ${styles.arrow_open}`;

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: props.isMenuOpen,
			})}
			onClick={props.pressButton}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: props.isMenuOpen,
				})}
			/>
		</div>
	);
};
