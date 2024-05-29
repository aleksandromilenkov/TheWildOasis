import React, { useEffect, useRef } from "react";

const useOutsideClick = (close) => {
  const ref = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };
    // handling the event in the capturing phase ( not in the bubbling )
    // because in the bubbling phase ( the default one) the Add New Cabin button is outside the StyledModal
    // and it will immediately detect that event and close the modal imeddiately
    // we are detecting in the capturing phase by specifyng thir argument boolean true
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [close]);

  return ref;
};

export default useOutsideClick;
