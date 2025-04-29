import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      localStorage.setItem('isAuthenticated', 'true');
      alert('✅ ورود با موفقیت انجام شد.');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || '❌ ورود ناموفق! لطفاً اطلاعات را چک کنید.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[320px] bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-lg font-bold text-right text-gray-800">ورود </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">نام کاربری</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder=""
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder=""
            />
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
  type="submit"
  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-xl transition"
>
  ورود
</button>
        </form>
      </div>
    </div>
  );
}

export default Login;