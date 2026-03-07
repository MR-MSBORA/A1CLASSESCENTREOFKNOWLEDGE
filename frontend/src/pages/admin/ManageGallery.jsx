import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function ManageGallery() {
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [uploading,setUploading]= useState(false);
  const [form, setForm] = useState({ caption: '', branch: 'All', type: 'image' });
  const [file, setFile] = useState(null);

  const load = () => {
    api.get('/gallery').then(r => setItems(r.data.data)).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleUpload = async () => {
    if (!file || !form.caption) { toast.error('Add caption and select file'); return; }
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('caption', form.caption);
    fd.append('branch',  form.branch);
    fd.append('type',    form.type);
    try {
      await api.post('/gallery', fd);
      toast.success('Uploaded ✅');
      setForm({ caption: '', branch: 'All', type: 'image' });
      setFile(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Deleted');
      load();
    } catch { toast.error('Failed'); }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold";

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">Manage Gallery</h1>

      {/* Upload */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-10">
        <h2 className="font-bold text-white mb-5">Upload Photo / Video</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Caption *</label>
            <input type="text" placeholder="e.g. Result Celebration 2024" value={form.caption}
              onChange={e => setForm({...form, caption: e.target.value})} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Branch</label>
            <select value={form.branch} onChange={e => setForm({...form, branch: e.target.value})}
              className={inputClass}>
              <option value="All">All Branches</option>
              <option value="Zirakpur">Zirakpur</option>
              <option value="Baltana">Baltana</option>
              <option value="Behlana">Behlana</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Type</label>
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
              className={inputClass}>
              <option value="image">Photo</option>
              <option value="video">Video</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="text-xs text-gray-400 mb-1.5 block">
            File * {form.type === 'image' ? '(JPG, PNG, WebP)' : '(MP4, MOV)'}
          </label>
          <input type="file"
            accept={form.type === 'image' ? 'image/*' : 'video/*'}
            onChange={e => setFile(e.target.files[0])}
            className="text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-royal file:text-white file:text-xs file:font-semibold file:cursor-pointer" />
        </div>
        <button onClick={handleUpload} disabled={uploading}
          className="px-8 py-3 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light disabled:opacity-60 transition-colors">
          {uploading ? 'Uploading...' : '📤 Upload'}
        </button>
      </div>

      {/* Grid */}
      <h2 className="font-bold text-white text-lg mb-4">Gallery ({items.length})</h2>
      {loading ? (
        <p className="text-gray-400 text-center py-10">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No items uploaded yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item._id} className="rounded-xl overflow-hidden border border-white/10 group relative">
              {item.type === 'video' ? (
                <video src={item.fileUrl} className="w-full aspect-square object-cover" controls />
              ) : (
                <img src={item.fileUrl} alt={item.caption}
                  className="w-full aspect-square object-cover" />
              )}
              <div className="p-3 bg-[#0c1229]">
                <p className="text-xs text-white font-semibold truncate">{item.caption}</p>
                <p className="text-xs text-gray-500">{item.branch}</p>
              </div>
              <button onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}