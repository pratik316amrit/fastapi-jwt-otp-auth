import React, {useState} from 'react';
import API from '../api';

export default function ForgotPassword(){
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(null);

  async function submit(e){
    e.preventDefault();
    setMsg(null);
    try{
      const res = await API.post('/auth/forgot-password', { email });
      setMsg({ type:'success', text: res.data.msg });
    }catch(err){
      setMsg({ type:'error', text: err.response?.data?.detail || err.response?.data?.msg || 'Error' });
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full px-3 py-2 border rounded"/>
        <button className="w-full bg-yellow-600 text-white py-2 rounded">Send Reset Link</button>
      </form>
      {msg && <p className={`mt-4 ${msg.type==='error' ? 'text-red-600' : 'text-green-600'}`}>{msg.text}</p>}
    </div>
  );
}
