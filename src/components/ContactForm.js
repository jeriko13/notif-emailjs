import { useEffect, useState } from "react"
import InputField from "./InputField"
import SelectField from "./SelectField";
import TextareaField from "./TextareaField";
import { ChevronRightIcon } from '@heroicons/react/solid'
import emailjs from 'emailjs-com';
import axios from "axios";
// import { useHistory } from "react-router";
// import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
  // let history = useHistory();

  // const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  // const [showAlert, setShowAlert] = React.useState(true);

  const sendDataToAPI = () => {
    axios
      .post(
        `https://simwas.inspektorat.banjarkota.go.id/inspektorat_api/api/add/t_laporan_konsultasi`,
        {
          // nik,
          nama,
          email,
          pesan,
        }
      )
      .then(() => {
        // history.push("/LayananKonsultasi");
        // setShowAlert(true);
      });
  };

  const [values, setValues] = useState({
    
    
    nama: '',
    email: '',
    pesan: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send('service_89ewt5b', 'template_4t2s9hw', values, '2eIhO3RxgReqrWoP1')
      .then(response => {
        console.log('SUCCESS!', response);
        sendDataToAPI({
         
          nama: '',
          email: '',
          pesan: ''
        });
        setStatus('SUCCESS');
      }, error => {
        console.log('FAILED...', error);
      });
  }

  useEffect(() => {
    if(status === 'SUCCESS') {
      setTimeout(() => {
        setStatus('');
      }, 3000);
    }
  }, [status]);

  const handleChange = (e) => {
    sendDataToAPI(sendDataToAPI => ({
      ...sendDataToAPI,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <div className="lg:mt-48 lg:mr-48 pt-6 pb-8 bg-white shadow-xl rounded p-5">
      {status && renderAlert()}
      <form onSubmit={handleSubmit}>
        <h3 className="text-gray-700 mb-7 text-xl font-semibold">Send us message</h3>
        <InputField value={sendDataToAPI.nama} handleChange={handleChange} label="Nama Anda" name="nama" type="text" placeholder="John Doe" />
        <InputField value={sendDataToAPI.email} handleChange={handleChange} label="E-Mail" name="email" type="email" placeholder="jphn@example.com" />
        <SelectField handleChange={handleChange} name="opsi" label="Opsi" />
        <TextareaField value={sendDataToAPI.pesan} handleChange={handleChange} label="Isi Pesan Kamu disini" name="pesan" />
        <button type="submit"
          className="mt-4 bg-gray-900 text-gray-200 rounded hover:bg-gray-700 px-4 py-2 focus:outline-none"
        >Send <ChevronRightIcon className="w-6 ml-2 float-right" />
        </button>
      </form>
    </div>
  )
}

const renderAlert = () => (
  <div className="px-4 py-3 leading-normal text-blue-700 bg-blue-100 rounded mb-5 text-center">
    <p>Pesan Anda Berhasil Terkirim!</p>
  </div>
)

export default ContactForm
