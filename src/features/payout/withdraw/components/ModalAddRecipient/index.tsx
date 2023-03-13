import { Button, Input } from "components";
import Modal from "components/Modal";
import { useForm } from "react-hook-form";
import { TransferCard } from 'features/payout';

type FormAddRecipient = {
    fullName: string;
    phone: number;
    id: number;
};

export const ModalAddRecipient = (modalAdd) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormAddRecipient>();

    const onSubmit = (data: FormAddRecipient) => console.log(data);
    return (
        <Modal {...modalAdd}>
            <TransferCard centerTitle={false} title="Add Recipient" closeModal={modalAdd.closeModal}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5 mt-10">
                        <Input type="text" label="Recipients Full Name (Arabic)" {...register("fullName", { required: "field is empty" })} />
                        {errors.fullName && <p className="text-[#EE404C] text-center mt-[-30px] mb-3">{errors.fullName.message}</p>}

                        <Input type="text" label="Recipients Phone Number" className="mt-[-20px]"  {...register("phone", { required: "field is empty" })} />
                        {errors.phone && <p className="text-[#EE404C] text-center mt-[-30px] mb-3">{errors.phone.message}</p>}

                        <Input type="text" label="Recipients ID Number (National ID or Passport)" className="mt-[-20px]" {...register("id", { required: "field is empty" })} />
                        {errors.phone && <p className="text-[#EE404C] text-center mt-[-30px] mb-3">{errors.phone.message}</p>}
                    </div>
                    <div className="mt-[-20px]">
                        <Button fullWidth={true} type="submit">Confirm</Button>
                    </div>
                </form>
            </TransferCard>
        </Modal>
    )
}

export default ModalAddRecipient;