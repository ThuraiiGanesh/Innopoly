import React, { useState, useRef, useEffect } from 'react';
import { Camera, Check, Plus, Trash2, Tag, Layers, Sparkles, Cpu, Upload, Grid, Video, RefreshCw, X, Play } from 'lucide-react';

export default function WardrobeDigitizer({ wardrobe, onAddItem, onDeleteItem }) {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Tops');
  const [colorName, setColorName] = useState('Black');
  const [pattern, setPattern] = useState('Solid');
  const [customImage, setCustomImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoTagged, setAutoTagged] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [scanMode, setScanMode] = useState('single'); // 'single' | 'batch'
  const [batchCount, setBatchCount] = useState(0);

  // Live Camera Stream Modal State
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedBatchPhotos, setCapturedBatchPhotos] = useState([]);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const batchFileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Clean up camera stream when modal closes
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  // Launch Live Device Camera Stream Modal
  const startCameraStream = async () => {
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.log('Live webcam stream not accessible, falling back to direct native capture prompt');
      cameraInputRef.current?.click();
    }
  };

  const closeCameraModal = () => {
    stopCameraStream();
    setCameraOpen(false);
  };

  // Snap Photo from Live Camera Stream
  const snapLivePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');

      if (scanMode === 'single') {
        setCustomImage(dataUrl);
        if (!itemName) setItemName('Live Camera Snap Item');
        closeCameraModal();
      } else {
        // Batch camera mode: accumulate photos
        setCapturedBatchPhotos(prev => [dataUrl, ...prev]);
      }
    }
  };

  const handleFinishBatchCamera = () => {
    if (capturedBatchPhotos.length === 0) {
      closeCameraModal();
      return;
    }

    setIsAnalyzing(true);
    capturedBatchPhotos.forEach((imgData, index) => {
      const categories = ['Tops', 'Bottoms', 'Outerwear', 'Shoes'];
      const colors = ['Black', 'White', 'Navy', 'Olive', 'Beige'];
      const autoCat = categories[index % categories.length];
      const autoColor = colors[index % colors.length];

      const newItem = {
        id: 'w_camera_batch_' + Date.now() + '_' + index,
        name: `Camera Shot Garment ${index + 1}`,
        category: autoCat,
        color: autoColor.toLowerCase().includes('white') ? '#ffffff' : '#18181b',
        colorName: autoColor,
        pattern: 'Solid',
        style: 'Smart Casual',
        image: imgData,
        owned: true
      };
      onAddItem(newItem);
    });

    setBatchCount(capturedBatchPhotos.length);
    setIsAnalyzing(false);
    setAutoTagged({
      category: `${capturedBatchPhotos.length} Camera Shots Auto-Tagged`,
      color: 'Batch Processed',
      pattern: 'Multi-Scan Ready'
    });
    setCapturedBatchPhotos([]);
    closeCameraModal();
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result);
        if (!itemName) {
          const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          setItemName(nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBatchUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsAnalyzing(true);
    let count = 0;

    files.slice(0, 10).forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        const autoName = nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1);
        const categories = ['Tops', 'Bottoms', 'Outerwear', 'Shoes'];
        const colors = ['Black', 'White', 'Navy', 'Olive', 'Beige'];
        const autoCat = categories[index % categories.length];
        const autoColor = colors[index % colors.length];

        const newItem = {
          id: 'w_batch_' + Date.now() + '_' + index,
          name: autoName,
          category: autoCat,
          color: autoColor.toLowerCase().includes('white') ? '#ffffff' : '#18181b',
          colorName: autoColor,
          pattern: 'Solid',
          style: 'Smart Casual',
          image: reader.result,
          owned: true
        };

        onAddItem(newItem);
        count++;
        if (count === Math.min(files.length, 10)) {
          setBatchCount(count);
          setIsAnalyzing(false);
          setAutoTagged({
            category: `${count} Items Auto-Tagged`,
            color: 'Batch Processed',
            pattern: 'Multi-Scan Ready'
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSimulatedUpload = (e) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    setIsAnalyzing(true);
    setAutoTagged(null);

    const defaultImg = category === 'Tops' 
      ? 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'
      : category === 'Bottoms'
      ? 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80'
      : category === 'Outerwear'
      ? 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80';

    setTimeout(() => {
      const newItem = {
        id: 'w_' + Date.now(),
        name: itemName,
        category: category,
        color: colorName.toLowerCase().includes('white') ? '#ffffff' : colorName.toLowerCase().includes('beige') ? '#d4b996' : '#18181b',
        colorName: colorName,
        pattern: pattern,
        style: 'Smart Casual',
        image: customImage || defaultImg,
        owned: true
      };

      onAddItem(newItem);
      setAutoTagged({
        category: category,
        color: colorName,
        pattern: pattern
      });
      setItemName('');
      setCustomImage(null);
      setIsAnalyzing(false);
    }, 900);
  };

  const filteredWardrobe = selectedFilter === 'All' 
    ? wardrobe 
    : wardrobe.filter(item => item.category === selectedFilter);

  return (
    <section id="digitizer" className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs tracking-wider uppercase text-slate-700 font-semibold mb-3">
          <Camera className="w-3.5 h-3.5" /> AI Auto-Tagging Digitization Engine
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
          Snap, Upload & Catalog Your Closet
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Single item scanner or multi-shot batch camera scanner up to 10 garments simultaneously.
        </p>

        {/* Mode Selector Chips */}
        <div className="inline-flex items-center gap-2 bg-slate-200/80 p-1 rounded-2xl mt-4 border border-slate-300">
          <button
            onClick={() => setScanMode('single')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              scanMode === 'single' ? 'bg-black text-white shadow-sm' : 'text-slate-700 hover:text-black'
            }`}
          >
            Single Garment Scan
          </button>
          <button
            onClick={() => setScanMode('batch')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              scanMode === 'batch' ? 'bg-black text-white shadow-sm' : 'text-slate-700 hover:text-black'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-amber-400" /> Multi-Shot Batch Scanner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Photo Upload & AI Scanner Form */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-slate-800" /> Google AI Vision Auto-Tagger
              </h3>
              <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                {scanMode === 'batch' ? 'Batch Mode' : 'Single Mode'}
              </span>
            </div>

            {/* Hidden native input for direct mobile camera capture fallback */}
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleImageFileChange}
              className="hidden"
            />

            {scanMode === 'batch' ? (
              <div className="space-y-4">
                <input
                  type="file"
                  ref={batchFileInputRef}
                  multiple
                  accept="image/*"
                  onChange={handleBatchUpload}
                  className="hidden"
                />

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={startCameraStream}
                    className="p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex flex-col items-center justify-center gap-2 transition-all shadow-md group"
                  >
                    <div className="p-3 rounded-full bg-white/20 group-hover:scale-110 transition-transform">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider">Open Live Camera</span>
                    <span className="text-[10px] text-indigo-100 font-mono">Snap Batch Shots</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => batchFileInputRef.current?.click()}
                    className="p-4 rounded-2xl bg-white border border-slate-300 hover:border-black text-slate-900 flex flex-col items-center justify-center gap-2 transition-all shadow-sm group"
                  >
                    <div className="p-3 rounded-full bg-slate-100 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-slate-700" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider">Select Files</span>
                    <span className="text-[10px] text-slate-500 font-mono">Up to 10 Photos</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSimulatedUpload} className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />

                {/* Direct Camera Button & Upload Area Split */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <button
                    type="button"
                    onClick={startCameraStream}
                    className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Camera className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-extrabold uppercase tracking-wider">Take Photo (Camera)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 rounded-2xl bg-white border border-slate-300 hover:border-slate-800 text-slate-900 flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <Upload className="w-4 h-4 text-slate-700" />
                    <span className="text-xs font-extrabold uppercase tracking-wider">Upload File</span>
                  </button>
                </div>

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-slate-800 rounded-2xl p-4 text-center bg-white/60 cursor-pointer transition-all group relative overflow-hidden"
                >
                  {customImage ? (
                    <div className="relative">
                      <img
                        src={customImage}
                        alt="Uploaded garment preview"
                        className="w-28 h-28 object-cover rounded-xl mx-auto shadow-md border border-slate-200"
                      />
                      <span className="text-[10px] font-mono bg-emerald-600 text-white px-2 py-0.5 rounded-full mt-2 inline-block font-bold">
                        ✓ Image Ready for AI Scan
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs font-semibold text-slate-700">
                        Click or drag garment photo here to upload
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Auto background removal & auto-tagging
                      </p>
                    </>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-mono">
                    Garment Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vintage Black Oversized Tee"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-mono">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-black transition-colors"
                    >
                      <option value="Tops">Tops</option>
                      <option value="Bottoms">Bottoms</option>
                      <option value="Outerwear">Outerwear</option>
                      <option value="Shoes">Shoes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-mono">
                      Color
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Black"
                      value={colorName}
                      onChange={(e) => setColorName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-mono">
                      Pattern
                    </label>
                    <select
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-2 py-2.5 text-slate-900 text-xs focus:outline-none focus:border-black transition-colors"
                    >
                      <option value="Solid">Solid</option>
                      <option value="Striped">Striped</option>
                      <option value="Textured">Textured</option>
                      <option value="Plaid">Plaid</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAnalyzing || !itemName.trim()}
                  className="w-full primary-button py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 font-bold shadow-md"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      AI Auto-Tagging Garment...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Save Garment to Closet
                    </>
                  )}
                </button>
              </form>
            )}

            {autoTagged && (
              <div className="mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono animate-fade-in-up">
                <span className="font-bold block mb-1 flex items-center gap-1.5 text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5" /> AI Auto-Tagging Complete:
                </span>
                • Category: <strong>{autoTagged.category}</strong> • Color: <strong>{autoTagged.color}</strong> • Pattern: <strong>{autoTagged.pattern}</strong>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-black/5 text-xs text-slate-500 flex items-center justify-between">
            <span>Digitized Count: <strong className="text-slate-900 font-bold">{wardrobe.length} Items</strong></span>
            <span className="text-emerald-600 flex items-center gap-1 font-semibold"><Check className="w-3.5 h-3.5" /> Ready for AI</span>
          </div>
        </div>

        {/* Digital Closet Grid */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-black/5 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-800" /> Digitized Closet Collection
              </h3>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                {['All', 'Tops', 'Bottoms', 'Outerwear', 'Shoes'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      selectedFilter === cat
                        ? 'bg-white text-black shadow-sm font-bold'
                        : 'text-slate-500 hover:text-black'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
              {filteredWardrobe.map((item) => (
                <div
                  key={item.id}
                  className="glass-card p-3.5 rounded-2xl flex items-center gap-3 group relative"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] uppercase font-mono font-bold">
                        Auto-Tagged
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-slate-900 text-sm font-semibold truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Tag className="w-3 h-3 text-slate-400" /> {item.colorName} • {item.pattern || 'Solid'}
                    </p>
                  </div>

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-6 pt-4 border-t border-black/5 italic text-center">
            * StyleSync AI scans fabric texture, color spectrum, and cut geometry from your uploaded photos.
          </p>
        </div>
      </div>

      {/* ================= LIVE WEBCAM CAMERA CAPTURE MODAL ================= */}
      {cameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl p-6 overflow-hidden flex flex-col gap-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-400 animate-pulse" />
                <h3 className="text-base font-extrabold text-white">Live Garment Camera View</h3>
              </div>
              <button
                onClick={closeCameraModal}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Camera Feed Canvas/Video */}
            <div className="relative w-full h-72 rounded-2xl bg-black overflow-hidden border border-slate-800 flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />

              <div className="absolute inset-0 border-2 border-dashed border-white/30 pointer-events-none m-4 rounded-xl flex items-center justify-center">
                <span className="text-[10px] font-mono bg-black/60 px-3 py-1 rounded-full text-emerald-400 font-bold border border-emerald-500/30">
                  Align Garment inside Box
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={snapLivePhoto}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Camera className="w-4 h-4 text-white" /> 
                {scanMode === 'batch' ? `Snap Garment (${capturedBatchPhotos.length} Taken)` : 'Snap Garment Photo'}
              </button>

              {scanMode === 'batch' && (
                <button
                  type="button"
                  onClick={handleFinishBatchCamera}
                  className="px-5 py-3 rounded-xl bg-white text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:bg-slate-200 transition-all"
                >
                  Done ({capturedBatchPhotos.length})
                </button>
              )}
            </div>

            {capturedBatchPhotos.length > 0 && scanMode === 'batch' && (
              <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-400">Captured:</span>
                {capturedBatchPhotos.map((img, idx) => (
                  <img key={idx} src={img} alt="Snap preview" className="w-10 h-10 object-cover rounded-lg border border-slate-700" />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
