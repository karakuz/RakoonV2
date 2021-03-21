import React from 'react'
import Logo from './rakoon_logo.jpg'

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
