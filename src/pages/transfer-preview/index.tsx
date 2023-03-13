import React, { useState, useEffect } from 'react'
import { Button, Divider, Image } from 'components'
import Modal from 'components/Modal'
import { getCookie } from 'lib/js-cookie';
import { useAxios } from 'hooks';
import { API_SERVICES_URLS } from 'data';
import { BalanceBankResponseType } from 'features/authentication/types'
import useModal from 'hooks/useModal'
import { TransferCard, MiniCard } from 'features/payout';

function TransferPage() {

  const modalObj = useModal();
  // const { _id } = getCookie("currentUser").user;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={modalObj.openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Modal {...modalObj}>
        <TransferCard centerTitle={true} title="Transfer Preview" closeModal={modalObj.closeModal}>
          <div className="text-center mb-5">
            <p className='text-sm font-bold text-[#8C8C8C]'>Amount</p>
            <h2 className='font-bold text-3xl text-[#4375FF]'>240.00 USD</h2>
          </div>
          <div>
            <p className='text-sm text-[#8C8C8C] mb-2'>Transferred to:</p>
            <Button fullWidth={true} className="!bg-transparent !hover:bg-transparent !p-0 mb-3">
              <MiniCard className='flex items-center gap-4'>
                <Image src="/assets/img/bank.png" alt="bankd image" width={35} height={35} />
                <div className="desc">
                  <p className='text-sm text-blue-light'>Bank of Palestine - Safa Mousa</p>
                  <p className='text-sm text-black'>0452-1064559-001-3100-000</p>
                </div>
              </MiniCard>
            </Button>
            <MiniCard className='text-black text-sm mb-3'>
              <div className="flex justify-between items-center ">
                <p>Transfer amount</p>
                <p>$300</p>
              </div>
              <div className="flex justify-between items-center ">
                <p>Fee</p>
                <p>Free</p>
              </div>
              <Divider />
              <div className="flex justify-between items-center ">
                <p>You'll get</p>
                <p>$300</p>
              </div>
            </MiniCard>
            {/* list of advises */}
            <ul className='text-sm mb-10 px-7'>
              <li className='mb-2 before:content-["-"] -indent-1.5'> Estimated arrival: 2 business days.</li>
              <li className='mb-2 before:content-["-"] -indent-1.5'> Transfers made after 9:00 PM or on weekends takes longer.</li>
              <li className='mb-2 before:content-["-"] -indent-1.5'> All transfers are subject to review and could be delayed or stopped if we identify an issue.</li>
            </ul>
            <Button fullWidth={true} onClick={modalObj.closeModal}>Confirm</Button>
          </div>
        </TransferCard>
      </Modal>
    </>
  )
}

export default TransferPage