import { useEffect, useState, useCallback } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const SUBJECTS = ['Physics','Chemistry','Maths','Biology','English','Accounts','Economics','Computer','History','General'];
const CLASSES  = [1,2,3,4,5,6,7,8,9,10,11,12];

const autoGrade = (obtained, max) => {
  if (!obtained || !max) return '';
  const p = (Number(obtained) / Number(max)) * 100;
  if (p >= 90) return 'A+';
  if (p >= 80) return 'A';
  if (p >= 70) return 'B+';
  if (p >= 60) return 'B';
  if (p >= 50) return 'C';
  if (p >= 35) return 'D';
  return 'F';
};

const gradeColor = {
  'A+': '#4ade80', 'A': '#4ade80',
  'B+': '#60a5fa', 'B': '#60a5fa',
  'C':  '#facc15', 'D': '#fb923c', 'F': '#f87171',
};

const inputCls  = "w-full px-3 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-[#f5c842] transition-colors";
const selectCls = inputCls;

export default function TeacherMarks() {
  const [tab, setTab] = useState('bulk');

  // ── Bulk state ──────────────────────────────────────────────────────────────
  const [meta, setMeta]       = useState({ exam: '', subject: '', classNo: '', date: '', maxMarks: '' });
  const [entries, setEntries] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [step,     setStep]     = useState(1);

  // ── View state ──────────────────────────────────────────────────────────────
  const [viewRecords, setViewRecords] = useState([]);
  const [viewLoading, setViewLoading] = useState(false);
  const [vClass,   setVClass]   = useState('');
  const [vSubject, setVSubject] = useState('');
  const [vExam,    setVExam]    = useState('');

  // ── Load students for selected class ────────────────────────────────────────
  const loadStudents = useCallback(async () => {
    if (!meta.classNo)       { toast.error('Select a class');    return; }
    if (!meta.exam.trim())   { toast.error('Enter exam name');   return; }
    if (!meta.subject)       { toast.error('Select subject');    return; }
    if (!meta.maxMarks)      { toast.error('Enter max marks');   return; }

    setFetching(true);
    try {
      const r = await api.get(`/admin/users?role=student&class=${meta.classNo}`);
      const list = Array.isArray(r.data.data) ? r.data.data : r.data.data?.users || [];
      if (list.length === 0) { toast.error('No students found in this class'); return; }
      setEntries(list.map(s => ({ studentId: s._id, name: s.name, obtained: '', absent: false })));
      setStep(2);
    } catch {
      toast.error('Failed to load students');
    } finally {
      setFetching(false);
    }
  }, [meta]);

  const updateEntry = (idx, field, value) =>
    setEntries(prev => { const n = [...prev]; n[idx] = { ...n[idx], [field]: value }; return n; });

  const fillAll = (val) =>
    setEntries(prev => prev.map(e => e.absent ? e : { ...e, obtained: val }));

  // ── Bulk submit ──────────────────────────────────────────────────────────────
  const handleBulkSave = async () => {
    const toSubmit = entries.filter(e => !e.absent && e.obtained !== '');
    if (toSubmit.length === 0) { toast.error('Enter marks for at least one student'); return; }
    const invalid = toSubmit.find(e => Number(e.obtained) > Number(meta.maxMarks));
    if (invalid) { toast.error(`${invalid.name}: marks exceed max marks`); return; }

    setSaving(true);
    try {
      const payload = toSubmit.map(e => ({
        student:       e.studentId,
        exam:          meta.exam.trim(),
        subject:       meta.subject,
        date:          meta.date || undefined,
        marksObtained: Number(e.obtained),
        maxMarks:      Number(meta.maxMarks),
        grade:         autoGrade(e.obtained, meta.maxMarks),
      }));
      await api.post('/admin/marks/bulk', { marks: payload });
      toast.success(`✅ Marks saved for ${toSubmit.length} student${toSubmit.length > 1 ? 's' : ''}`);
      setStep(1);
      setMeta({ exam: '', subject: '', classNo: '', date: '', maxMarks: '' });
      setEntries([]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save marks');
    } finally {
      setSaving(false);
    }
  };

  // ── Load view marks ──────────────────────────────────────────────────────────
  const loadMarks = async () => {
    setViewLoading(true);
    try {
      const p = new URLSearchParams();
      if (vClass)   p.append('class',   vClass);
      if (vSubject) p.append('subject', vSubject);
      if (vExam)    p.append('exam',    vExam);
      const r = await api.get(`/admin/marks?${p}`);
      setViewRecords(Array.isArray(r.data.data) ? r.data.data : []);
    } catch {
      toast.error('Failed to load marks');
    } finally {
      setViewLoading(false);
    }
  };

  useEffect(() => { if (tab === 'view') loadMarks(); }, [tab]);

  const filled = entries.filter(e => !e.absent && e.obtained !== '').length;
  const absent = entries.filter(e => e.absent).length;
  const avg    = filled > 0
    ? Math.round(entries.filter(e => !e.absent && e.obtained !== '')
        .reduce((s, e) => s + Number(e.obtained), 0) / filled)
    : 0;

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-6">Marks</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        {[
          { key: 'bulk', label: '📋 Add Marks (Bulk)' },
          { key: 'view', label: '📊 View Marks'        },
        ].map(t => (
          <button key={t.key} onClick={() => { setTab(t.key); setStep(1); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              tab === t.key
                ? 'bg-royal text-white shadow-lg shadow-royal/20'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ══ BULK ADD TAB ══ */}
      {tab === 'bulk' && (
        <div>
          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            {['Test Details', 'Enter Marks'].map((label, i) => {
              const s = i + 1;
              const active = step === s;
              const done   = step > s;
              return (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
                    done   ? 'bg-green-500 border-green-500 text-white' :
                    active ? 'bg-royal border-royal text-white' :
                             'bg-white/5 border-white/20 text-gray-500'
                  }`}>
                    {done ? '✓' : s}
                  </div>
                  <span className={`text-sm font-semibold ${active ? 'text-white' : 'text-gray-500'}`}>{label}</span>
                  {i < 1 && <div className="w-10 h-px bg-white/10 mx-1" />}
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">

            {/* Step 1 — Test details */}
            {step === 1 && (
              <motion.div key="step1"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-2xl space-y-5">

                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Test / Exam Name *</label>
                    <input type="text" placeholder="e.g. Unit Test 1, Mid-Term, Final Exam"
                      value={meta.exam}
                      onChange={e => setMeta({ ...meta, exam: e.target.value })}
                      className={inputCls} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Class *</label>
                      <select value={meta.classNo}
                        onChange={e => setMeta({ ...meta, classNo: e.target.value })}
                        className={selectCls}>
                        <option value="">Select Class</option>
                        {CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Subject *</label>
                      <select value={meta.subject}
                        onChange={e => setMeta({ ...meta, subject: e.target.value })}
                        className={selectCls}>
                        <option value="">Select Subject</option>
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Max Marks *</label>
                      <input type="number" placeholder="e.g. 100"
                        value={meta.maxMarks}
                        onChange={e => setMeta({ ...meta, maxMarks: e.target.value })}
                        className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">Date</label>
                      <input type="date"
                        value={meta.date}
                        onChange={e => setMeta({ ...meta, date: e.target.value })}
                        className={inputCls} />
                    </div>
                  </div>

                  {/* Preview tags */}
                  {meta.exam && meta.classNo && meta.subject && meta.maxMarks && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        { label: 'Exam',    val: meta.exam            },
                        { label: 'Class',   val: `Class ${meta.classNo}` },
                        { label: 'Subject', val: meta.subject          },
                        { label: 'Out of',  val: meta.maxMarks         },
                      ].map(b => (
                        <div key={b.label} className="px-3 py-1.5 rounded-lg text-xs border"
                          style={{ background: 'rgba(245,200,66,0.07)', borderColor: 'rgba(245,200,66,0.2)', color: '#f5c842' }}>
                          <span className="opacity-60">{b.label}: </span>
                          <span className="font-bold">{b.val}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button onClick={loadStudents} disabled={fetching}
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg,#1a3fd4,#1a56db)', color: 'white' }}>
                    {fetching ? 'Loading students...' : 'Next → Load Students'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Marks table */}
            {step === 2 && (
              <motion.div key="step2"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>

                {/* Test info bar */}
                <div className="flex flex-wrap gap-3 mb-5 p-4 rounded-2xl border"
                  style={{ background: 'rgba(245,200,66,0.05)', borderColor: 'rgba(245,200,66,0.18)' }}>
                  {[
                    { label: 'Exam',    val: meta.exam              },
                    { label: 'Class',   val: `Class ${meta.classNo}` },
                    { label: 'Subject', val: meta.subject            },
                    { label: 'Max',     val: meta.maxMarks           },
                  ].map((b, i) => (
                    <div key={b.label} className="flex items-center gap-2">
                      {i > 0 && <div className="w-px h-4 bg-white/10" />}
                      <span className="text-xs text-gray-500">{b.label}:</span>
                      <span className="text-sm font-bold text-white">{b.val}</span>
                    </div>
                  ))}
                  <button onClick={() => setStep(1)}
                    className="ml-auto text-xs text-gray-500 hover:text-white underline transition-colors">
                    ← Edit details
                  </button>
                </div>

                {/* Quick fill + stats */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Fill all with:</span>
                    <input type="number" placeholder={`0–${meta.maxMarks}`}
                      className="w-24 px-3 py-1.5 rounded-lg border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-[#f5c842]"
                      onBlur={e => { if (e.target.value) fillAll(e.target.value); e.target.value = ''; }} />
                  </div>
                  <div className="flex gap-3 ml-auto flex-wrap">
                    <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">👥 {entries.length} students</span>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-300">✅ {filled} filled</span>
                    <span className="text-xs px-3 py-1 rounded-full bg-red-900/30 border border-red-700/30 text-red-300">🚫 {absent} absent</span>
                    {filled > 0 && (
                      <span className="text-xs px-3 py-1 rounded-full bg-yellow-900/30 border border-yellow-700/30 text-yellow-300">
                        avg {avg}/{meta.maxMarks}
                      </span>
                    )}
                  </div>
                </div>

                {/* Table */}
                <div className="rounded-2xl border border-white/10 overflow-hidden mb-5">
                  <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-white/5 border-b border-white/10">
                    <div className="col-span-1 text-xs font-bold text-gray-500 uppercase">#</div>
                    <div className="col-span-4 text-xs font-bold text-gray-500 uppercase">Student</div>
                    <div className="col-span-3 text-xs font-bold text-gray-500 uppercase">Marks / {meta.maxMarks}</div>
                    <div className="col-span-2 text-xs font-bold text-gray-500 uppercase">Grade</div>
                    <div className="col-span-2 text-xs font-bold text-gray-500 uppercase text-center">Absent</div>
                  </div>

                  {entries.map((entry, idx) => {
                    const grade = entry.absent ? '—' : autoGrade(entry.obtained, meta.maxMarks);
                    const pct   = entry.obtained && meta.maxMarks
                      ? Math.round((Number(entry.obtained) / Number(meta.maxMarks)) * 100)
                      : null;
                    const over  = Number(entry.obtained) > Number(meta.maxMarks);

                    return (
                      <div key={entry.studentId}
                        className={`grid grid-cols-12 gap-3 px-5 py-3 items-center border-b border-white/5 transition-colors ${
                          entry.absent ? 'opacity-40' : 'hover:bg-white/[0.02]'
                        }`}>
                        <div className="col-span-1 text-xs text-gray-500 font-mono">{idx + 1}</div>
                        <div className="col-span-4">
                          <p className="text-sm font-semibold text-white truncate">{entry.name}</p>
                        </div>
                        <div className="col-span-3">
                          <input
                            type="number" min={0} max={meta.maxMarks}
                            placeholder={entry.absent ? 'Absent' : '—'}
                            value={entry.obtained}
                            disabled={entry.absent}
                            onChange={e => updateEntry(idx, 'obtained', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg text-sm font-mono border transition-colors focus:outline-none bg-[#0c1229] text-white ${
                              over ? 'border-red-500' : 'border-white/10 focus:border-[#f5c842]'
                            } disabled:opacity-30 disabled:cursor-not-allowed`}
                          />
                          {over && <p className="text-[10px] text-red-400 mt-0.5">Exceeds max</p>}
                        </div>
                        <div className="col-span-2 flex items-center gap-1.5">
                          {!entry.absent && entry.obtained !== '' && (
                            <>
                              <span className="text-sm font-black" style={{ color: gradeColor[grade] || '#9ca3af' }}>{grade}</span>
                              {pct !== null && <span className="text-[10px] text-gray-500">{pct}%</span>}
                            </>
                          )}
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <button
                            onClick={() => {
                              updateEntry(idx, 'absent', !entry.absent);
                              if (!entry.absent) updateEntry(idx, 'obtained', '');
                            }}
                            className={`w-9 h-5 rounded-full transition-all relative ${entry.absent ? 'bg-red-500' : 'bg-white/10'}`}>
                            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${entry.absent ? 'left-[18px]' : 'left-0.5'}`} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Submit */}
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 text-sm font-semibold hover:bg-white/5 transition-colors">
                    ← Back
                  </button>
                  <button onClick={handleBulkSave} disabled={saving || filled === 0}
                    className="flex-1 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg,#1a3fd4,#1a56db)', color: 'white' }}>
                    {saving ? 'Saving...' : `📊 Save Marks for ${filled} Student${filled !== 1 ? 's' : ''}`}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ══ VIEW TAB ══ */}
      {tab === 'view' && (
        <>
          <div className="flex gap-4 flex-wrap mb-6">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Class</label>
              <select value={vClass} onChange={e => setVClass(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-[#f5c842]">
                <option value="">All Classes</option>
                {CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Subject</label>
              <select value={vSubject} onChange={e => setVSubject(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-[#f5c842]">
                <option value="">All Subjects</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Exam Name</label>
              <input type="text" placeholder="e.g. Unit Test 1"
                value={vExam} onChange={e => setVExam(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-[#f5c842]" />
            </div>
            <div className="flex items-end">
              <button onClick={loadMarks}
                className="px-5 py-2.5 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-royal-light transition-colors">
                🔍 Search
              </button>
            </div>
          </div>

          {viewLoading ? (
            <p className="text-gray-400 text-center py-10">Loading...</p>
          ) : viewRecords.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">📊</p>
              <p className="text-gray-400">No marks found</p>
            </div>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Showing <span className="text-white font-bold">{viewRecords.length}</span> records
              </p>
              <div className="rounded-2xl border border-white/10 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      {['Student','Class','Exam','Subject','Marks','Grade'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {viewRecords.map(r => {
                      const pct = Math.round((r.marksObtained / r.maxMarks) * 100);
                      return (
                        <tr key={r._id} className="hover:bg-white/5">
                          <td className="px-5 py-3 text-white font-medium">{r.student?.name || '—'}</td>
                          <td className="px-5 py-3 text-gray-400">Class {r.student?.class || '—'}</td>
                          <td className="px-5 py-3 text-gray-400">{r.exam}</td>
                          <td className="px-5 py-3 text-gray-400">{r.subject}</td>
                          <td className="px-5 py-3">
                            <span className="text-white font-bold">{r.marksObtained}/{r.maxMarks}</span>
                            <span className="text-gray-500 text-xs ml-1">({pct}%)</span>
                          </td>
                          <td className="px-5 py-3">
                            <span className="font-black text-sm" style={{ color: gradeColor[r.grade] || '#9ca3af' }}>
                              {r.grade || '—'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
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