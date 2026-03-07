import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function ManageAttendance() {
  const [students,    setStudents]    = useState([]);
  const [records,     setRecords]     = useState({});
  const [date,        setDate]        = useState(new Date().toISOString().split('T')[0]);
  const [subject,     setSubject]     = useState('General');
  const [filterClass, setFilterClass] = useState('');
  const [saving,      setSaving]      = useState(false);
  const [loading,     setLoading]     = useState(true);
  const [tab,         setTab]         = useState('mark'); // 'mark' or 'view'

  // View tab state
  const [viewRecords,      setViewRecords]      = useState([]);
  const [viewLoading,      setViewLoading]      = useState(false);
  const [viewFilterClass,  setViewFilterClass]  = useState('');
  const [viewFilterDate,   setViewFilterDate]   = useState('');
  const [viewFilterSubject,setViewFilterSubject]= useState('');

  useEffect(() => {
    api.get('/admin/users?role=student')
      .then(r => {
        const list = Array.isArray(r.data.data) ? r.data.data
          : r.data.data?.users || [];
        setStudents(list);
        const init = {};
        list.forEach(s => { init[s._id] = 'present'; });
        setRecords(init);
      })
      .catch(() => toast.error('Failed to load students'))
      .finally(() => setLoading(false));
  }, []);

  const loadAttendance = async () => {
    setViewLoading(true);
    try {
      const params = new URLSearchParams();
      if (viewFilterClass)   params.append('class',   viewFilterClass);
      if (viewFilterDate)    params.append('date',    viewFilterDate);
      if (viewFilterSubject) params.append('subject', viewFilterSubject);
      const r = await api.get(`/admin/attendance?${params}`);
      setViewRecords(Array.isArray(r.data.data) ? r.data.data : []);
    } catch {
      toast.error('Failed to load attendance records');
    } finally {
      setViewLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 'view') loadAttendance();
  }, [tab]);

  const filtered = filterClass
    ? students.filter(s => String(s.class) === filterClass)
    : students;

  const handleSave = async () => {
    if (filtered.length === 0) { toast.error('No students to mark'); return; }
    setSaving(true);
    try {
      const recs = filtered.map(s => ({
        student: s._id,
        date,
        status:  records[s._id] || 'present',
        subject,
        class:   s.class,
      }));
      await api.post('/admin/attendance', { records: recs });
      toast.success(`Attendance saved for ${recs.length} students ✅`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const statusColor = {
    present: 'bg-green-900/30 text-green-400',
    absent:  'bg-red-900/30 text-red-400',
    late:    'bg-yellow-900/30 text-yellow-400',
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-6">Attendance</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        {[
          { key: 'mark', label: '✏️ Mark Attendance' },
          { key: 'view', label: '📋 View Records'    },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              tab === t.key
                ? 'bg-royal text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* MARK TAB */}
      {tab === 'mark' && (
        <>
          <div className="flex gap-4 flex-wrap mb-6">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Date</label>
              <input type="date" value={date}
                onChange={e => setDate(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Subject</label>
              <select value={subject} onChange={e => setSubject(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
                {['General','Physics','Chemistry','Maths','Biology','English','Accounts','Computer'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Filter by Class</label>
              <select value={filterClass} onChange={e => setFilterClass(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
                <option value="">All Classes</option>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(c => (
                  <option key={c} value={String(c)}>Class {c}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-400 text-center py-10">Loading students...</p>
          ) : (
            <>
              <div className="rounded-2xl border border-white/10 overflow-hidden mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      {['Student','Class','Status'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filtered.map(s => (
                      <tr key={s._id} className="hover:bg-white/5">
                        <td className="px-5 py-3 text-white font-medium">{s.name}</td>
                        <td className="px-5 py-3 text-gray-400">Class {s.class}</td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            {['present','absent','late'].map(status => (
                              <button key={status}
                                onClick={() => setRecords({...records, [s._id]: status})}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                                  records[s._id] === status
                                    ? status === 'present' ? 'bg-green-500 text-white'
                                    : status === 'absent'  ? 'bg-red-500 text-white'
                                    : 'bg-yellow-500 text-white'
                                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                                }`}>
                                {status}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <p className="text-center text-gray-500 py-10">No students found</p>
                )}
              </div>
              <button onClick={handleSave} disabled={saving}
                className="px-8 py-3 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light disabled:opacity-60 transition-colors">
                {saving ? 'Saving...' : `✅ Save Attendance (${filtered.length} students)`}
              </button>
            </>
          )}
        </>
      )}

      {/* VIEW TAB */}
      {tab === 'view' && (
        <>
          {/* Filters */}
          <div className="flex gap-4 flex-wrap mb-6">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Filter by Class</label>
              <select value={viewFilterClass}
                onChange={e => setViewFilterClass(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
                <option value="">All Classes</option>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(c => (
                  <option key={c} value={String(c)}>Class {c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Filter by Date</label>
              <input type="date" value={viewFilterDate}
                onChange={e => setViewFilterDate(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Filter by Subject</label>
              <select value={viewFilterSubject}
                onChange={e => setViewFilterSubject(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
                <option value="">All Subjects</option>
                {['General','Physics','Chemistry','Maths','Biology','English','Accounts','Computer'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={loadAttendance}
                className="px-5 py-2.5 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-royal-light transition-colors">
                🔍 Search
              </button>
            </div>
          </div>

          {/* Results */}
          {viewLoading ? (
            <p className="text-gray-400 text-center py-10">Loading...</p>
          ) : viewRecords.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-gray-400">No records found</p>
              <p className="text-gray-500 text-xs mt-2">Try different filters</p>
            </div>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Showing <span className="text-white font-bold">{viewRecords.length}</span> records
              </p>
              <div className="rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      {['Student','Class','Date','Subject','Status'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {viewRecords.map(r => (
                      <tr key={r._id} className="hover:bg-white/5">
                        <td className="px-5 py-3 text-white font-medium">
                          {r.student?.name || '—'}
                        </td>
                        <td className="px-5 py-3 text-gray-400">
                          Class {r.student?.class || r.class}
                        </td>
                        <td className="px-5 py-3 text-gray-400">
                          {new Date(r.date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-5 py-3 text-gray-400">{r.subject}</td>
                        <td className="px-5 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusColor[r.status]}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}