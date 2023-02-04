import { useState } from 'react'

/**
 * 
 *  This is a custom hook that encapuslates all modals
 *  that could be opened from header.
 * 
 */

function useMenuModals() {

  const [ isREADMEOpen, setIsREADMEOpen ] = useState(false)
  const [ isTermsOfUseOpen, setIsTermsOfUseOpen ] = useState(false)
  const [ isPrivacyOpen, setIsPrivacyOpen ] = useState(false)
  const [ isCookieOpen, setIsCookieOpen ] = useState(false)

  return {
    isREADMEOpen,
    setIsREADMEOpen,

    isTermsOfUseOpen,
    setIsTermsOfUseOpen,

    isPrivacyOpen,
    setIsPrivacyOpen,

    isCookieOpen,
    setIsCookieOpen

  }

}

export default useMenuModals