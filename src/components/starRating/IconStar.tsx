import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'

interface IconComponentProps {
  type: 'ratingHighlighted' | 'ratingDefault'
  width: number
  height: number
}

const IconComponent = ({ type, width, height }: IconComponentProps) => {
  const imageDataSource = {
    ratingHighlighted: (
      <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M12 4.5L14.3175 9.195L19.5 9.9525L15.75 13.605L16.635 18.765L12 16.3275L7.365 18.765L8.25 13.605L4.5 9.9525L9.6825 9.195L12 4.5Z'
          fill='#EBC03F'
          stroke='#EBC03F'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      //   <FaStar width={width} height={height} fill='#EBC03F' stroke='#EBC03F' strokeWidth={2} strokeLinecap='round' />
    ),

    ratingDefault: (
      <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M12.1053 3.68421L14.7074 8.95579L20.5263 9.80632L16.3158 13.9074L17.3095 19.7011L12.1053 16.9642L6.90105 19.7011L7.89473 13.9074L3.6842 9.80632L9.50315 8.95579L12.1053 3.68421Z'
          fill=''
          stroke='var(--gray-color)'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      //   <FaStar
      //     width={width}
      //     height={height}
      //     fill='#FCFBF8'
      //     stroke='#E2E0DA'
      //     strokeLinecap='round'
      //     strokeLinejoin='round'
      //   />
    )
  }

  return imageDataSource[type]
}

export default IconComponent
