import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ArrowDownIcon, PlusIcon } from "lib/@heroicons";
import { Divider, Skeleton, Modal } from "components";
import Option from "./../Option";
import SelectList from "../SelectList";
import AddRecipient from "../AddRecipient";
import { TransferCard } from "features/payout";
import EditRecipient from "../EditRecipient";
import { useSwrFetch, useModal } from "hooks";
import { API_SERVICES_URLS } from "data";

export default function Cash() {
  const [selectedOffice, setSelectedOffice] = useState();
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState();
  const addModalObj = useModal();
  const editModalObj = useModal();

  const {
    data,
    error: officesError,
    isLoading: isOfficeLoading,
  } = useSwrFetch(API_SERVICES_URLS.FREELANCER.OFFICE_LIST, {
    method: "GET",
    headers: {},
  });

  const {
    data: recipientsData,
    error: recipientsError,
    isLoading: isRecipientsLoading,
  } = useSwrFetch(API_SERVICES_URLS.FREELANCER.RECIPIENTS_LIST, {
    method: "GET",
    headers: {},
  });

  useEffect(() => {
    if (data) {
      setSelectedOffice(() => data.data[0]);
    }
  }, [data]);

  useEffect(() => {
    if (recipientsData) {
      setRecipients(() => recipientsData.data.recipients);
      setSelectedRecipient(() => recipientsData.data.recipients[0]);
    }
  }, [recipientsData]);
  console.log(selectedRecipient);

  return (
    <>
      <div className="max-w-[450px] mx-auto">
        {/* Office select */}
        <div className="office mb-8">
          <p className="text-lg">Office</p>
          {isOfficeLoading ? (
            <Skeleton height={50} />
          ) : (
            <SelectList
              selected={selectedOffice}
              setSelected={setSelectedOffice}
              selectedOptionComp={
                selectedOffice
                  ? () => <OfficeOption office={selectedOffice} />
                  : () => {}
              }
              // selectedOptionComp={() => {}}
            >
              <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data &&
                  data.data.map((office, idx) => {
                    const isLast = data.data.length - 1 != idx;
                    return (
                      <OfficeOption
                        office={office}
                        withDivider={isLast}
                        key={office._id}
                      />
                    );
                  })}
              </Listbox.Options>
            </SelectList>
          )}
          <p className="text-xs text-center text-red">
            {officesError && officesError}
          </p>
        </div>
        {/* Recipient select */}
        <div className="recipient">
          <p className="text-lg">
            Recipient{" "}
            <span
              className="text-xs text-blue-light cursor-pointer ml-2"
              onClick={editModalObj.openModal}
            >
              Edit
            </span>
          </p>
          {isRecipientsLoading ? (
            <Skeleton height={50} />
          ) : (
            <SelectList
              selected={selectedRecipient}
              setSelected={setSelectedRecipient}
              selectedOptionComp={
                selectedRecipient
                  ? () => <RecipentOption recipient={selectedRecipient} />
                  : () => {}
              }
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg  focus:outline-none sm:text-sm z-50">
                {recipientsData &&
                  recipients.map((recipient, idx) => {
                    const isLast = recipients.length - 1 != idx;
                    return (
                      <RecipentOption
                        recipient={recipient}
                        withDivider={isLast}
                        key={recipient._id}
                      />
                    );
                  })}
              </Listbox.Options>
            </SelectList>
          )}
          <div className="flex justify-end  ml-2 mt-2">
            <span
              className="flex items-center text-sm text-blue-light cursor-pointer"
              onClick={addModalObj.openModal}
            >
              <PlusIcon width={"20px"} /> Add recipient
            </span>
          </div>
        </div>
      </div>
      <Modal {...addModalObj}>
        <TransferCard
          centerTitle={false}
          title="Add Recipient"
          closeModal={addModalObj.closeModal}
        >
          <AddRecipient />
        </TransferCard>
      </Modal>

      <Modal {...editModalObj}>
        <TransferCard
          centerTitle={false}
          title="Recipient"
          closeModal={editModalObj.closeModal}
        >
          <EditRecipient />
        </TransferCard>
      </Modal>
    </>
  );
}

const RecipentOption = ({ recipient, withDivider }) => {
  return (
    <Listbox.Option
      className={`relative cursor-pointer select-none pt-2 pl-6 pr-6 list-none`}
      value={recipient}
    >
      <div className={`block truncate`}>
        <div className="flex mb-1">
          <span className="font-bold">{recipient.name}</span>
        </div>
        <div className="flex justify-between items-end text-sm text-gray-400">
          <span>{`Phone: ${recipient.mobile}`}</span>
          <span>{`ID: ${recipient.idNumber}`}</span>
        </div>
      </div>
      {withDivider && <Divider />}
    </Listbox.Option>
  );
};

const OfficeOption = ({ office, withDivider }) => {
  return (
    <Listbox.Option
      className={`relative cursor-pointer select-none pt-2 pl-6 pr-6 list-none`}
      value={office}
    >
      <div className={`block truncate`}>
        <div className="flex justify-between items-end mb-1">
          <span className="font-bold">{office.name}</span>
          <span className="text-xs text-gray-400">
            ساعات العمل {office.startingHour} صباحا- {office.endingHour}مساءً
          </span>
        </div>
        <div className="flex justify-between items-end text-xs text-gray-400">
          <span>{office.address}</span>
          <span>{office.fees == 0 ? "بدون عمولة" : office.fees}</span>
        </div>
      </div>
      {withDivider && <Divider />}
    </Listbox.Option>
  );
};
