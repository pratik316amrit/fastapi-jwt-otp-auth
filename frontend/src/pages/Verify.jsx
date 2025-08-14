import React, {useState} from 'react';
import API from '../api';

export default function Verify(){
  const [form, setForm] = useState({ email:'', otp:'' });
  const [msg, setMsg] = useState(null);

  async function submit(e){
    e.preventDefault();
    setMsg(null);
    try{
      const res = await API.post('/auth/verify', form);
      setMsg({ type:'success', text: res.data.msg });
    }catch(err){
      setMsg({ type:'error', text: err.response?.data?.detail || err.response?.data?.msg || 'Error' });
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Verify Email</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" type="email" className="w-full px-3 py-2 border rounded"/>
        <input required value={form.otp} onChange={e=>setForm({...form, otp:e.target.value})} placeholder="OTP" className="w-full px-3 py-2 border rounded"/>
        <button className="w-full bg-green-600 text-white py-2 rounded">Verify</button>
      </form>
      {msg && <p className={`mt-4 ${msg.type==='error' ? 'text-red-600' : 'text-green-600'}`}>{msg.text}</p>}
    </div>
  );
}
