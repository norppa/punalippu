import React from 'react'
import frontImage from '../img/liput.jpg'

const FrontPage = () => {
  return (
    <div>
        <p className="frontquote">Ken oikeutta puolustaapi, <br />
          niin käyköön suojaan lippumme.<br />
          Viel' kerran totuus voiton saapi, <br />
          se vahva ompi uskomme.<br /><br />
          <span>—Aatteen puolesta</span></p>
        <img src={frontImage} className="frontimage" alt='kolme miestä kantavat lippuja'/>
    </div>

  )
}

export default FrontPage
