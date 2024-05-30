import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, TArrType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [actualArray, setActualArray] = useState<TArrType>(defaultArticleState);
	const [updatedArray, setUpdatedArray] = useState<TArrType | null>(null);
	const defaultArray: TArrType = defaultArticleState;

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': actualArray.fontFamilyOption.value,
					'--font-size': actualArray.fontSizeOption.value,
					'--font-color': actualArray.fontColor.value,
					'--container-width': actualArray.contentWidth.value,
					'--bg-color': actualArray.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				setActualArray={setActualArray}
				setUpdatedArray={
					setUpdatedArray as React.Dispatch<React.SetStateAction<TArrType>>
				}
				defaultArray={defaultArray}
				updatedArray={updatedArray as TArrType}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
