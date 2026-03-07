 
import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function TeacherMarks() {
  const [students, setStudents] = useState([]);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({
    student: '', exam: '', subject: '',
    marksObtained: '', maxMarks: '', grade: ''
  });

  useEffect(() => {
    api.get('/admin/users?role=student').then(r => setStudents(r.data.data));
  }, []);

  const handleSave = async () => {
    if (!form.student || !form.exam || !form.subject || !form.marksObtained || !form.maxMarks) {
      toast.error('Fill all required fields'); return;
    }
    setSaving(true);
    try {
      await api.post('/admin/marks', {
        ...form,
        marksObtained: Number(form.marksObtained),
        maxMarks:      Number(form.maxMarks),
      });
      toast.success('Marks added ✅');
      setForm({ student:'', exam:'', subject:'', marksObtained:'', maxMarks:'', grade:'' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold";

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">Add Marks</h1>

      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Student *</label>
            <select value={form.student}
              onChange={e => setForm({...form, student: e.target.value})}
              className={inputClass}>
              <option value="">Select Student</option>
              {students.map(s => (
                <option key={s._id} value={s._id}>
                  {s.name} — Class {s.class}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Exam Name *</label>
              <input type="text" placeholder="e.g. Unit Test 1" value={form.exam}
                onChange={e => setForm({...form, exam: e.target.value})} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Subject *</label>
              <select value={form.subject}
                onChange={e => setForm({...form, subject: e.target.value})}
                className={inputClass}>
                <option value="">Select</option>
                {['Physics','Chemistry','Maths','Biology','English','Accounts','Economics','Computer','History','General'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Marks Obtained *</label>
              <input type="number" placeholder="e.g. 85" value={form.marksObtained}
                onChange={e => setForm({...form, marksObtained: e.target.value})} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Max Marks *</label>
              <input type="number" placeholder="e.g. 100" value={form.maxMarks}
                onChange={e => setForm({...form, maxMarks: e.target.value})} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Grade</label>
              <select value={form.grade}
                onChange={e => setForm({...form, grade: e.target.value})}
                className={inputClass}>
                <option value="">Select Grade</option>
                {['A+','A','B+','B','C','D','F'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <button onClick={handleSave} disabled={saving}
            className="w-full py-3 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light disabled:opacity-60 transition-colors">
            {saving ? 'Saving...' : '📊 Add Marks'}
          </button>
        </div>
      </div>
    </div>
  );
}