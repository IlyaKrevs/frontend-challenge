import React, { FC, useState } from 'react'
import styles from './SquareCard.module.scss'
import { heartsSVG } from 'assets/heartsSVG'

interface IProps {
    id: string,
    url: string,
    isChecked: boolean,
    onClickHandler: () => void
}

export const SquareCard: FC<IProps> = ({ id, url, isChecked, onClickHandler }) => {

    const [isHover, setIsHover] = useState(false)

    return (
        <article className={styles.container}>
            <img className={styles.imageContainer} src={url} />

            <div className={[styles.svgContainer, isChecked ? styles.svgContainerChecked : ''].join(' ')}
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={onClickHandler}
            >

                {isHover || isChecked ? heartsSVG.filledHeart : heartsSVG.emptyHeart}

            </div>
        </article>
    )
}

