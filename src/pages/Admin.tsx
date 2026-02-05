// Admin Dashboard
import { useEffect, useMemo, useState } from 'react';

const Admin = () => {
  // Protection simple côté client — redirige si pas admin
  const token = localStorage.getItem('auth_token');
  const userRaw = localStorage.getItem('tradescalpsnip-storage');
  let isAdmin = false;
  try {
    if (userRaw) {
      const parsed = JSON.parse(userRaw);
      const u = parsed?.state?.user;
      isAdmin = u?.role === 'admin';
    }
  } catch {}

  if (!token || !isAdmin) {
    window.location.href = '/login';
  }

  // Onglets
  type Tab = 'stats' | 'users' | 'analyses' | 'payments' | 'orders' | 'messages';
  const [active, setActive] = useState<Tab>('stats');

  // Données
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }), [token]);

  // Fetch helpers
  const fetchJSON = async (url: string, options: RequestInit = {}) => {
    const res = await fetch(url, { ...options, headers: { ...headers, ...(options.headers || {}) } });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };

  // Charger les données selon l'onglet
  useEffect(() => {
    const load = async () => {
      if (!token) return;
      try {
        setLoading(true);
        if (active === 'stats') {
          const r = await fetchJSON('/api/admin/stats');
          setStats(r.data);
        } else if (active === 'users') {
          const r = await fetchJSON('/api/admin/users?limit=50');
          setUsers(r.data.users);
        } else if (active === 'analyses') {
          const r = await fetchJSON('/api/admin/analyses?limit=50');
          setAnalyses(r.data.analyses);
        } else if (active === 'payments') {
          const r = await fetchJSON('/api/admin/payments');
          setPayments(r.data);
        } else if (active === 'orders') {
          const r = await fetchJSON('/api/admin/payments');
          setPayments((r.data || []).filter((p: any) => p.plan === 'custom'));
        } else if (active === 'messages') {
          const r = await fetchJSON('/api/admin/messages');
          setMessages(r.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [active, token]);

  // Actions simples
  const togglePro = async (id: string, currentPlan: string) => {
    await fetchJSON(`/api/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        isSubscribed: currentPlan !== 'pro',
        subscriptionPlan: currentPlan !== 'pro' ? 'pro' : 'free'
      })
    });
    const r = await fetchJSON('/api/admin/users?limit=50');
    setUsers(r.data.users);
  };

  const promoteAdmin = async (id: string) => {
    await fetchJSON(`/api/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ role: 'admin' })
    });
    const r = await fetchJSON('/api/admin/users?limit=50');
    setUsers(r.data.users);
  };

  const markMessage = async (id: string, status: 'read' | 'replied') => {
    await fetchJSON(`/api/admin/messages/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
    const r = await fetchJSON('/api/admin/messages');
    setMessages(r.data);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'stats', label: 'Statistiques' },
            { id: 'users', label: 'Utilisateurs' },
            { id: 'analyses', label: 'Analyses' },
            { id: 'payments', label: 'Abonnements' },
            { id: 'orders', label: 'Commandes' },
            { id: 'messages', label: 'Messages' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id as Tab)}
              className={`px-4 py-2 rounded-xl border ${active === t.id ? 'bg-white text-black' : 'bg-gray-900 border-white/10'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {active === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[{
              label: 'Utilisateurs', value: stats?.totalUsers || 0
            }, {
              label: 'Abonnés', value: stats?.subscribedUsers || 0
            }, {
              label: 'Analyses', value: stats?.totalAnalyses || 0
            }, {
              label: 'Revenu ($)', value: stats?.totalRevenue || 0
            }].map((s, i) => (
              <div key={i} className="bg-gray-900 border border-white/10 p-6 rounded-2xl">
                <p className="text-gray-400 text-sm">{s.label}</p>
                <h3 className="text-2xl font-bold">{s.value}</h3>
              </div>
            ))}
          </div>
        )}

        {active === 'users' && (
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="p-2">Nom</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Rôle</th>
                  <th className="p-2">Plan</th>
                  <th className="p-2">Abonné</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u: any) => (
                  <tr key={u._id} className="border-t border-white/5">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">{u.role}</td>
                    <td className="p-2">{u.subscriptionPlan}</td>
                    <td className="p-2">{u.isSubscribed ? 'Oui' : 'Non'}</td>
                    <td className="p-2 flex gap-2">
                      <button className="px-3 py-1 rounded bg-white text-black" onClick={() => togglePro(u._id, u.subscriptionPlan)}>
                        {u.subscriptionPlan !== 'pro' ? 'Activer Pro' : 'Désactiver Pro'}
                      </button>
                      {u.role !== 'admin' && (
                        <button className="px-3 py-1 rounded bg-pink-500" onClick={() => promoteAdmin(u._id)}>
                          Promouvoir Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 'analyses' && (
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="p-2">Utilisateur</th>
                  <th className="p-2">Signal</th>
                  <th className="p-2">Confiance</th>
                  <th className="p-2">Grade</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {analyses.map((a: any) => (
                  <tr key={a._id} className="border-t border-white/5">
                    <td className="p-2">{a.userId?.email || '-'}</td>
                    <td className="p-2">{a.signal}</td>
                    <td className="p-2">{a.confidence}%</td>
                    <td className="p-2">{a.grade}</td>
                    <td className="p-2">{new Date(a.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 'payments' && (
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="p-2">Utilisateur</th>
                  <th className="p-2">Plan</th>
                  <th className="p-2">Montant</th>
                  <th className="p-2">Statut</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.filter((p: any) => p.plan !== 'custom').map((p: any) => (
                  <tr key={p._id} className="border-t border-white/5">
                    <td className="p-2">{p.userId?.email || '-'}</td>
                    <td className="p-2">{p.plan}</td>
                    <td className="p-2">${p.amount}</td>
                    <td className="p-2">{p.status}</td>
                    <td className="p-2">{new Date(p.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 'orders' && (
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="p-2">Utilisateur</th>
                  <th className="p-2">Référence</th>
                  <th className="p-2">Montant</th>
                  <th className="p-2">Statut</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.filter((p: any) => p.plan === 'custom').map((p: any) => (
                  <tr key={p._id} className="border-t border-white/5">
                    <td className="p-2">{p.userId?.email || '-'}</td>
                    <td className="p-2">{p.paymentId}</td>
                    <td className="p-2">${p.amount}</td>
                    <td className="p-2">{p.status}</td>
                    <td className="p-2">{new Date(p.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {active === 'messages' && (
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-4">
            <div className="space-y-4">
              {messages.map((m: any) => (
                <div key={m._id} className="border border-white/10 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold">{m.name} • <span className="text-gray-400 text-sm">{m.email}</span></div>
                    <div className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-sm text-gray-300 mb-2">Sujet: {m.subject}</div>
                  <div className="text-gray-400 mb-3">{m.message}</div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded bg-white text-black" onClick={() => markMessage(m._id, 'read')}>Marquer lu</button>
                    <button className="px-3 py-1 rounded bg-pink-500" onClick={() => markMessage(m._id, 'replied')}>Marquer répondu</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && <div className="mt-6 text-gray-400">Chargement...</div>}
      </div>
    </div>
  );
};

export default Admin;