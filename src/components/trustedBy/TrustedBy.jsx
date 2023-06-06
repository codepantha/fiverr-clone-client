import React from 'react'
import './TrustedBy.scss';

import images from '../../constants/images'

const TrustedBy = () => {
  return (
    <section className="trustedBy container">
      <span>Trusted by:</span>
      <img src={images.fb} alt="facebook" />
      <img src={images.google} alt="facebook" />
      <img src={images.netflix} alt="facebook" />
      <img src={images.twitter} alt="facebook" />
      <img src={images.paypal} alt="facebook" />
    </section>
  )
}

export default TrustedBy