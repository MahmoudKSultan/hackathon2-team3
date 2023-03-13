import { Button, IconButton, Input } from "components";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import useModal from "hooks/useModal";
import Modal from "components/Modal";
import { DeleteIcon, EditIcon } from "lib/@heroicons";
import { Dialog } from "@headlessui/react";
import { MiniCard, TransferCard, ModalAddRecipient, SelectListBox } from 'features/payout';

type FormValues = {
    amount: string;
    // select: object;
}

export const Cash = () => {
    const modalRecipient = useModal();
    const modalDelete = useModal();
    const modalAdd = useModal();

    const dataOffice = [
        {
            address: 'غزة - مكتب الدانا',
            addressDes: "الرمال _ تقاطع شارع فلسطين مع الشهداء",
            dateWork: "ساعات العمل: 9 صباحا -7مساءا",
            commission: "بدون عمولة"
        },
        {
            address: 'غزة - مكتب البرعصي',
            addressDes: "الرمال _ تقاطع شارع فلسطين مع الشهداء",
            dateWork: "ساعات العمل: 9 صباحا -7مساءا",
            commission: "بدون عمولة"
        },
        {
            address: 'غزة - مكتب شقليه',
            addressDes: "الرمال _ تقاطع شارع فلسطين مع الشهداء",
            dateWork: "ساعات العمل: 9 صباحا -7مساءا",
            commission: "بدون عمولة"
        },
        {
            address: 'غزة - مكتب حرزالله',
            addressDes: "الرمال _ تقاطع شارع فلسطين مع الشهداء",
            dateWork: "ساعات العمل: 9 صباحا -7مساءا",
            commission: "بدون عمولة"
        },
    ]

    const [text, setText] = useState('');

    const [recipient, setRecipient] = useState({
        name: '',
        phone: '',
        id: '',
    });

    const handleRecipient = (data) => {
        setRecipient(data);
    }

    const handleParagraphClick = (event: any) => {
        var value: any = Math.floor(event.target.textContent);
        setText(value);
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const validateNumberField = (value: string): string | boolean => {
        if (value.includes(".")) {
            return "You can't withdraw cents in cash.";
        }
        return true;
    };

    const handleKeyPress = (event: any) => {
        if (event.key === "+" || event.key === "-") {
            event.preventDefault();
        }
    }

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <>
            <div className="flex justify-center mt-6 gap-6">
                <div>
                    <p className="text-base text-[#707070]">Amount</p>
                </div>
                <div className="flex gap-2">
                    <p className=" text-[#9E9E9E] text-xs flex items-center">Available</p>
                    <p onClick={handleParagraphClick} className="text-[#4375FF] text-sm flex items-center cursor-pointer">255.5</p>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex justify-center">
                    <Input type="number" className="w-48 text-lg text-right text-black" placeholder="$00.00" min={0}
                        {...register("amount", {
                            required: "field is empty",
                            validate: validateNumberField,
                            onChange: (e) => setText(() => e.target.value),
                        })}
                        onKeyPress={handleKeyPress}
                        id="amount"
                        value={text}

                    />
                </div>
                {errors.amount && <p className="text-[#EE404C] text-center mt-[-30px] mb-3">{errors.amount.message}</p>}

                <div className="flex flex-col ml-20 mt-[-20px]">
                    <div>
                        <p className="text-[#707070]">Office</p>
                    </div>
                    <SelectListBox data={dataOffice} />
                </div>

                <div className="flex flex-col ml-20 mt-4 z-0">
                    <div className="flex gap-2">
                        <p className="text-[#707070]">Recipient</p>
                        <button type="button" className="text-[#4375FF]" onClick={modalRecipient.openModal}>edit</button>
                    </div>
                    {/* <ListBoxRecipient /> */}
                    <SelectListBox data={dataOffice} />

                    <div className="flex justify-end w-10/12 mt-1">
                        <button type="button" className="text-[#4375FF] flex" onClick={modalAdd.openModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add recipient
                        </button>
                    </div>
                </div>


                <div className="flex justify-center mt-4">
                    <Button className="w-9/12" type="submit">Withdraw</Button>
                </div>
            </form>

            <Modal {...modalRecipient}>
                <TransferCard centerTitle={false} title="Recipients" closeModal={modalRecipient.closeModal}>
                    <div className="mb-8">
                        <MiniCard className='!py-2 mb-3 hover:border-blue'>
                            <div onClick={() => handleRecipient({ name: "محمد خلف", phone: "Phone: 0599898987", id: "ID: 488345512" })} className="flex justify-between items-start items-start flex-row-reverse">
                                <div className="main">
                                    <h3 className="text-lg font-semibold text-right">محمد خلف</h3>
                                    <p className="text-right text-gray-400 text-sm mt-[6px]">Phone: 0599898987</p>
                                </div>
                                <div>
                                    <div className="flex flex-col sm:flex-row justify-start ml-[-12px]">
                                        <IconButton onClick={modalDelete.openModal}><DeleteIcon /></IconButton>
                                        <IconButton><EditIcon /></IconButton>
                                    </div>
                                    <p className="text-gray-400 text-sm">ID: 488345512</p>
                                </div>
                            </div>
                        </MiniCard>
                        <MiniCard className='!py-2 mb-3'>
                            <div className="flex justify-between items-start">
                                <div className="main">
                                    <h3 className="text-lg font-semibold">Sada Mousa</h3>
                                    <p>0452-1064559-001-3100-000</p>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <IconButton><DeleteIcon /></IconButton>
                                    <IconButton><EditIcon /></IconButton>
                                </div>
                            </div>
                        </MiniCard>
                        <MiniCard className='!py-2 mb-3'>
                            <div className="flex justify-between">
                                <div className="main">
                                    <h3 className="text-lg font-semibold">Sada Mousa</h3>
                                    <p>0452-1064559-001-3100-000</p>
                                </div>

                                <div className="flex flex-col sm:flex-row">
                                    <IconButton><DeleteIcon /></IconButton>
                                    <IconButton><EditIcon /></IconButton>
                                </div>
                            </div>
                        </MiniCard>

                    </div>
                    <div className="flex gap-3">
                        <Button fullWidth={true} className="!bg-transparent !text-blue-light hover:bg-blue hover:text-white border-gray-light border-2" >Add</Button>
                        <Button fullWidth={true}>Select</Button>
                    </div>
                </TransferCard>
            </Modal>

            <Modal {...modalDelete} className="!w-80">
                <TransferCard centerTitle={false} closeModal={modalDelete.closeModal}>
                    <div className="mb-5 mt-10">
                        <p>Are you sure you want to delete this recipient?</p>
                    </div>
                    <div className="flex gap-3">
                        <Button fullWidth={true} className="bg-white hover:bg-white text-black border-gray-light border-2" >Cancel</Button>
                        <Button fullWidth={true} className="bg-red hover:bg-red">Delete</Button>
                    </div>
                </TransferCard>
            </Modal>

            <ModalAddRecipient {...modalAdd} />
        </>
    );
};
export default Cash;