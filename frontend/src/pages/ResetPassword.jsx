import React, {useState, useEffect} from 'react';
import API from '../api';
import { useSearchParams } from 'react-router-dom';

export default function ResetPassword(){
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  async function submit(e){
    e.preventDefault();
    setMsg(null);
    try{
      const res = await API.post('/auth/reset-password', { token, new_password: password });
      setMsg({ type:'success', text: res.data.msg });
    }catch(err){
      setMsg({ type:'error', text: err.response?.data?.detail || err.response?.data?.msg || 'Error' });
    }
  }

  useEffect(()=> {
    if(!token) setMsg({ type:'error', text:'Missing token in URL' });
  }, [token]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder="New password" type="password" className="w-full px-3 py-2 border rounded"/>
        <button className="w-full bg-green-600 text-white py-2 rounded">Reset Password</button>
      </form>
      {msg && <p className={`mt-4 ${msg.type==='error' ? 'text-red-600' : 'text-green-600'}`}>{msg.text}</p>}
    </div>
  );
}
