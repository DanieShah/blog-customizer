import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React, {
	useState,
	SyntheticEvent,
	ReactElement,
	useEffect,
	useRef,
} from 'react';
import {
	TArrType,
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Text } from '../text';
import { Select } from '../select';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsFormProps = {
	setArticleState: React.Dispatch<React.SetStateAction<TArrType>>;
	setUpdatedArray: React.Dispatch<React.SetStateAction<TArrType>>;
	updatedArray: TArrType;
};

export const ArticleParamsForm = ({
	setArticleState,
	setUpdatedArray,
	updatedArray,
}: TArticleParamsFormProps): ReactElement => {

	const [font, setFont] = useState(defaultArticleState.fontFamilyOption);
	const [size, setSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackGroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [weight, setWeight] = useState(defaultArticleState.contentWidth);

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const openSideBar = (): void => {
		setIsMenuOpen(!isMenuOpen);
	};

	const resetAllParameters = (): void => {
		setFont(defaultArticleState.fontFamilyOption);
		setSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackGroundColor(defaultArticleState.fontColor);
		setWeight(defaultArticleState.contentWidth);
	};

	const formRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setUpdatedArray({
			fontFamilyOption: font,
			fontSizeOption: size,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: weight,
		});

	}, [font, size, fontColor, backgroundColor, weight]);

	return (
		<>
			<ArrowButton isMenuOpen={isMenuOpen} pressButton={openSideBar} />
			<aside className={clsx(styles.container, {
				[styles.container_open]: isMenuOpen,
			})}>
				<form
					className={styles.form}
					onSubmit={(e: SyntheticEvent) => {
						e.preventDefault();
						setArticleState(updatedArray);
					}}
					>
					<Text size={31} weight={800} family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						selected={font}
						onChange={setFont}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={size}
						name='radio'
						onChange={setSize}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						onChange={setBackGroundColor}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={weight}
						onChange={setWeight}
						options={contentWidthArr}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => {
								setArticleState(defaultArticleState);
								resetAllParameters();
							}}
						/>
						<Button
							title='Применить'
							type='submit'
						/>
					</div>
				</form>
			</aside>
			{isMenuOpen && <div className={styles.overlay} onClick={() => {
				setIsMenuOpen(false);
			}}></div>}
		</>
	);
};
