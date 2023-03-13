import React, { useState } from 'react';

export default function useModal () {
    let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return {isOpen, openModal, closeModal};
}