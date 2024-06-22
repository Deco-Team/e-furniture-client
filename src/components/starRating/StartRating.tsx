import React, { useState } from 'react'
import { string, number, func, bool } from 'prop-types'
import defaultClasses from './rating.module.css'
import IconComponent from './IconStar'

interface RatingProps {
  iconSize?: string
  ratingInPercent: number
  showOutOf: boolean
  enableUserInteraction: boolean
  onClick?: (index: number) => void
}

const SIZES = {
  SMALL: {
    key: 's',
    size: 10
  },
  MEDIUM: {
    key: 'm',
    size: 18
  },
  LARGE: {
    key: 'l',
    size: 28
  }
}

const OUT_OF_VALUE = 5

const Rating: React.FC<RatingProps> = ({
  iconSize = SIZES.LARGE.key,
  ratingInPercent = 50,
  showOutOf = false,
  enableUserInteraction = false,
  onClick = () => null
}) => {
  const [activeStar, setActiveStar] = useState<number>(-1)
  const decimal = ratingInPercent / 20
  const nonFraction = Math.trunc(decimal)
  const fraction = Number((decimal - nonFraction).toFixed(2))
  const fractionPercent = fraction * 100

  const classes = defaultClasses

  const numberOfStar = OUT_OF_VALUE
  const size =
    iconSize === SIZES.SMALL.key
      ? SIZES.SMALL.size
      : iconSize === SIZES.MEDIUM.key
        ? SIZES.MEDIUM.size
        : SIZES.LARGE.size

  const RatingHighlighted = <IconComponent type={'ratingHighlighted'} width={size} height={size} />
  const RatingDefault = <IconComponent type={'ratingDefault'} width={size} height={size} />

  const handleClick = (index: number) => {
    if (index == activeStar) {
      if (onClick) {
        onClick(-1)
      }
      setActiveStar(-1)
    } else {
      if (onClick) {
        onClick(index + 1)
      }
      setActiveStar(index)
    }
  }

  const showDefaultStar = () => {
    return RatingDefault
  }

  let isShow = true
  const getStar = (index: number) => {
    if (index <= nonFraction - 1) {
      isShow = true
      return '100%'
    } else if (fractionPercent > 0 && isShow) {
      isShow = false
      return `${fractionPercent}%`
    } else {
      return '0%'
    }
  }

  const isShowOutOfStar = (index: number) => {
    if (showOutOf) {
      return showOutOf
    }

    const isLoopThrough = (fraction === 0 ? nonFraction : nonFraction + 1) - 1
    return index <= isLoopThrough
  }

  const withoutUserInteraction = (index: number) => {
    return isShowOutOfStar(index) ? (
      <div className='relative cursor-default' key={index}>
        <div
          style={{
            width: getStar(index)
          }}
          className='overflow-hidden absolute'
        >
          {RatingHighlighted}
        </div>
        {showDefaultStar()}
      </div>
    ) : null
  }

  const withUserInteraction = (index: number) => {
    return (
      <div style={{ position: 'relative' }} onClick={() => handleClick(index)} key={index}>
        <div
          style={{
            width: index <= activeStar ? '100%' : '0%',
            overflow: 'hidden',
            position: 'absolute'
          }}
        >
          {RatingHighlighted}
        </div>
        {showDefaultStar()}
      </div>
    )
  }

  return (
    <div className={classes.root + ' max-w-fit'}>
      {[...new Array(numberOfStar)].map((arr, index) =>
        enableUserInteraction ? withUserInteraction(index) : withoutUserInteraction(index)
      )}
    </div>
  )
}

Rating.propTypes = {
  ratingInPercent: number.isRequired,
  iconSize: string,
  showOutOf: bool.isRequired,
  enableUserInteraction: bool.isRequired,
  onClick: func
}

export default Rating
