import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React, {
	useState,
	SyntheticEvent,
	ReactElement,
	useEffect,
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

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsFormProps = {
	setActualArray: React.Dispatch<React.SetStateAction<TArrType>>;
	setUpdatedArray: React.Dispatch<React.SetStateAction<TArrType>>;
	defaultArray: TArrType;
	updatedArray: TArrType;
};

export const ArticleParamsForm = ({
	setActualArray,
	setUpdatedArray,
	defaultArray,
	updatedArray,
}: TArticleParamsFormProps): ReactElement => {
	const openContainerClass = `${styles.container} ${styles.container_open}`;

	const [font, setFont] = useState(defaultArticleState.fontFamilyOption);
	const [size, setSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackGroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [weight, setWeight] = useState(defaultArticleState.contentWidth);

	const [mod, setMod]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	] = useState<boolean>(false);

	const openSideBar = (): void => {
		setMod(!mod);
	};

	const resetAllParameters = (): void => {
		setFont(defaultArticleState.fontFamilyOption);
		setSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackGroundColor(defaultArticleState.fontColor);
		setWeight(defaultArticleState.contentWidth);
	};

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
			<ArrowButton mod={mod} pressButton={openSideBar} />
			<aside className={!mod ? styles.container : openContainerClass}>
				<form
					className={styles.form}
					onSubmit={(e: SyntheticEvent) => {
						e.preventDefault();
					}}>
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
					{/* {content} */}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => {
								setActualArray(defaultArray);
								resetAllParameters();
							}}
						/>
						<Button
							title='Применить'
							type='submit'
							onClick={() => {
								setActualArray(updatedArray);
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
