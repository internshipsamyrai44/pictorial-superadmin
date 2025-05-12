import React, {ComponentProps, ReactNode, useState} from 'react'
import SlickSlider, {Settings} from 'react-slick'
import s from './SliderPost.module.scss'

type Props = {
    children: ReactNode
    isDots: boolean
    setSlideId?: (id: number) => void
    sizeBtn: number
    slideId?: number
    sliderLength: number
}

export const SliderPost = ({
                               children,
                               isDots,
                               setSlideId,
                               sizeBtn,
                               slideId,
                               sliderLength,
                           }: Props) => {
    const [slideIdR, setSlideIdR] = useState<number>(0)

    const beforeChangeHandler = (currentSlide: number, nextSlide: number) => {
        if (setSlideId) {
            setSlideId(nextSlide)
        } else {
            setSlideIdR(nextSlide)
        }
    }

    const usedSlideId = slideId ? slideId : slideIdR

    const settings: Settings = {
        arrows: sliderLength > 1,
        beforeChange: beforeChangeHandler,
        dots: isDots,
        dotsClass: s.slickDots,
        infinite: false,
        nextArrow: (
            <Btn
                disabled={sliderLength - 1 === usedSlideId || sliderLength === 0}
                isRight
                size={sizeBtn}
            />
        ),
        prevArrow: <Btn disabled={usedSlideId === 0} isRight={false} size={sizeBtn}/>,
        slidesToScroll: 1,
        slidesToShow: 1,
        speed: 500,
        swipe: false,
        swipeToSlide: false,
    }

    return (
        <div className={s.sliderWrapper}>
            <SlickSlider {...settings} className={s.slider}>
                {children}
            </SlickSlider>
            {sliderLength > 1 && (
                <div className={s.dotsContainer} role="status" aria-live="polite">
                    {Array.from({length: sliderLength}).map((_, index) => (
                        <div
                            key={index}
                            className={`${s.dot} ${index === usedSlideId ? s.active : ''}`}
                            aria-label={`Slide ${index + 1} of ${sliderLength}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

type BtnType = {
    disabled?: boolean
    isRight: boolean
    onClick?: ComponentProps<'button'>['onClick']
    size: number
}

const Btn = ({disabled, isRight, onClick, size}: BtnType) => {
    return (
        <button
            className={`${s.sliderButton} ${isRight ? s.nextBtn : s.prevBtn}`}
            disabled={disabled}
            onClick={onClick}
            style={{width: size, height: size}}
            aria-label={isRight ? 'Next slide' : 'Previous slide'}
        >
            {isRight ? '⟩' : '⟨'}
        </button>
    )
} 