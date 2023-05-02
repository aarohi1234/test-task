import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  age: yup.number().required('Age is required'),
  sex: yup.string().required('Sex is required'),
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, 'Mobile number is not valid')
    .required('Mobile number is required'),
  emergencyContact: yup
    .string()
    .matches(/^[6-9]\d{9}$/, 'Emergency contact number is not valid')
    .required('Emergency contact number is required'),
  idType: yup.string(),
  govtId: yup
    .string()
    .when('idType', {
      is: 'Aadhar',
      then: yup
        .string()
        .matches(/^[0-9]{12}$/, 'Aadhar number is not valid')
        .required('Aadhar number is required'),
      otherwise: yup
        .string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'PAN number is not valid')
        .required('PAN number is required'),
    }),
});

function RegistrationForm() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
        // send data to backend
        

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Name</label>
                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => <input {...field} />}
                />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
                <label>Age</label>
                <Controller
                    control={control}
                    name="age"
                    render={({ field }) => <input {...field} type="number" />}
                />
                {errors.age && <p>{errors.age.message}</p>}
            </div>
            <div>
                <label>Sex</label>
                <Controller
                    control={control}
                    name="sex"
                    render={({ field }) => <select {...field}>
                        <option value="">Select Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>}
                />
                {errors.sex && <p>{errors.sex.message}</p>}
            </div>
            <div>
                <label>Mobile</label>
                <Controller
                    control={control}
                    name="mobile"
                    render={({ field }) => <input {...field} />}
                />
                {errors.mobile && <p>{errors.mobile.message}</p>}
            </div>
            <div>
                <label>Emergency Contact Number</label>
                <Controller
                    control={control}
                    name="emergencyContact"
                    render={({ field }) => <input {...field} />}
                />
                {errors.emergencyContact && <p>{errors.emergencyContact.message}</p>}
            </div>
            <div>
                <label>ID Type</label>
                <Controller
                    control={control}
                    name="idType"
                    render={({ field }) => <select {...field}>
                        <option value="">Select ID Type</option>
                        <option value="Aadhar">Aadhar</option>
                        <option value="PAN">PAN</option>
                    </select>}
                />
            </div>
            <div>
                <label>Govt Issued ID</label>
                <Controller
                    control={control}
                    name="govtId"
                    render={({ field }) => <input {...field} />}
                />
                {errors.govtId && <p>{errors.govtId.message}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}
export default RegistrationForm