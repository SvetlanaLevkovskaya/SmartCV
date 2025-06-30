import { Props } from '../SectionFields.types.ts';

export const PersonalInfoFields = ({ register, onBlur }: Props) => {
  return (
    <>
      <input placeholder="Full Name" {...register('fullName')} onBlur={onBlur} className="input" />
      <input placeholder="Position" {...register('position')} onBlur={onBlur} className="input" />
      <input placeholder="Email" {...register('email')} onBlur={onBlur} className="input" />
      <input placeholder="Phone Number" {...register('phoneNumber')} onBlur={onBlur} className="input" />
      <input placeholder="Location" {...register('location')} onBlur={onBlur} className="input" />
    </>
  );
};
