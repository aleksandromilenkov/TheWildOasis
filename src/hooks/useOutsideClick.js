import React, { useCallback, useEffect, useRef } from "react";

const useOutsideClick = (close) => {
  const ref = useRef();
  const handleClick = useCallback(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    },
    [ref, close]
  );
  useEffect(() => {
    // handling the event in the capturing phase ( not in the bubbling )
    // because in the bubbling phase ( the default one) the Add New Cabin button is outside the StyledModal
    // and it will immediately detect that event and close the modal imeddiately
    // we are detecting in the capturing phase by specifyng third argument boolean true
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [close, handleClick]);

  return ref;
};

export default useOutsideClick;
