import React, {useState} from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:''});
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    setMsg(null);
    try{
      const res = await API.post('/auth/login', form);
      const token = res.data.access_token;
      localStorage.setItem('token', token);
      setMsg({ type:'success', text:'Logged in' });
      setTimeout(()=> navigate('/'), 800);
    }catch(err){
      setMsg({ type:'error', text: err.response?.data?.detail || err.response?.data?.msg || 'Error' });
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" type="email" className="w-full px-3 py-2 border rounded"/>
        <input required value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" type="password" className="w-full px-3 py-2 border rounded"/>
        <div className="flex items-center justify-between">
          <button className="bg-blue-600 text-white py-2 px-4 rounded">Login</button>
          <a className="text-sm text-blue-600" href="/forgot-password">Forgot?</a>
        </div>
      </form>
      {msg && <p className={`mt-4 ${msg.type==='error' ? 'text-red-600' : 'text-green-600'}`}>{msg.text}</p>}
    </div>
  );
}
