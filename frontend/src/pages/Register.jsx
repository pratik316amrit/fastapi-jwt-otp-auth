import React, {useState} from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:''});
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    setMsg(null);
    try{
      const res = await API.post('/auth/register', form);
      setMsg({ type:'success', text: res.data.msg });
      // navigate to verify page to enter OTP
      setTimeout(()=> navigate('/verify'), 800);
    }catch(err){
      setMsg({ type:'error', text: err.response?.data?.detail || err.response?.data?.msg || 'Error' });
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="w-full px-3 py-2 border rounded"/>
        <input required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" type="email" className="w-full px-3 py-2 border rounded"/>
        <input required value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" type="password" className="w-full px-3 py-2 border rounded"/>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
      </form>
      {msg && <p className={`mt-4 ${msg.type==='error' ? 'text-red-600' : 'text-green-600'}`}>{msg.text}</p>}
    </div>
  );
}
