import React from 'react'
import '../comp/footer.css'
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <div className='footer'>
      <footer>
        {t('footerText')} &nbsp;
        <span><i className="fa-solid fa-heart foot"></i></span>
      </footer>
    </div>
  )
}

export default Footer;
