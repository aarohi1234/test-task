import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required(),
  sex: yup.string().required(),
  mobile: yup.string().matches(/^[6-9]\d{9}$/, { message: 'Invalid Indian mobile number' }).required(),
  emergencyContact: yup.string().matches(/^[6-9]\d{9}$/, { message: 'Invalid Indian mobile number' }).required(),
  address: yup.string(),
  govtIdType: yup.string(),
  govtId: yup.string().when('govtIdType', {
    is: 'Aadhar',
    then: yup.string().matches(/^\d{12}$/, { message: 'Invalid Aadhar number' }).required(),
    otherwise: yup.string().matches(/^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/, { message: 'Invalid PAN number' }).required(),
  }),
  guardianName: yup.string(),
  guardianMobile: yup.string().matches(/^[6-9]\d{9}$/, { message: 'Invalid Indian mobile number' }),
  nationality: yup.string(),
});

const UserRegistrationForm = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" ref={register} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" ref={register} />
        {errors.age && <span>{errors.age.message}</span>}
      </div>
      <div>
        <label htmlFor="sex">Sex</label>
        <input type="text" id="sex" name="sex" ref={register} />
        {errors.sex && <span>{errors.sex.message}</span>}
      </div>
      <div>
        <label htmlFor="mobile">Mobile</label>
        <input type="text" id="mobile" name="mobile" ref={register} />
        {errors.mobile && <span>{errors.mobile.message}</span>}
      </div>
      <div>
        <label htmlFor="emergencyContact">Emergency Contact Number</label>
        <input type="text" id="emergencyContact" name="emergencyContact" ref={register} />
        {errors.emergencyContact && <span>{errors.emergencyContact.message}</span>}
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" ref={register} />
        {errors.address && <span>{errors.address.message}</span>}
      </div>
      <div>
        <label htmlFor="govtIdType">ID Type</label>
        <select id="govtIdType" name="govtIdType" ref={register}>
          <option value="">Select</option>
          <option value="Aadhar">Aadhar</option>
          <option value="PAN">PAN</option>
        </select>
      </div>
      <div>
        <label htmlFor="govtId">Govt Issued ID</label>
        <input type="text" id="govtId" name="govtId" ref={register} />
        {errors.govtId && <span>{errors.govtId.message}</span>}
      </div>
      <div>
        <label htmlFor="guardianName">Guardian Name</label>
        <input type="text" id="guardianName" name="guardianName" ref={register} />
        {errors.guardianName && <span>{errors.guardianName.message}</span>}
      </div>
      <div>
        <label htmlFor="guardianMobile">Guardian Mobile</label>
        <input type="text" id="guardianMobile" name="guardianMobile" ref={register} />
        {errors.guardianMobile && <span>{errors.guardianMobile.message}</span>}
      </div>
      <div>
        <label htmlFor="nationality">Nationality</label>
        <input type="text" id="nationality" name="nationality" ref={register} />
        {errors.nationality && <span>{errors.nationality.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserRegistrationForm;
