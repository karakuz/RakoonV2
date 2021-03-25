import React from 'react'
import Logo from './raccoon.png'

const RakoonLogo = () => {
  return (
    <div>
      <img src={Logo} alt="Rakoon"
        style={{
          height: "100%",
          verticalAlign: "middle"
        }}
      />
    </div>
  )
}

export default RakoonLogo
