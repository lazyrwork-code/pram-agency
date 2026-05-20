import React, { useRef, useState, useEffect, useCallback } from 'react'

const services = [
  {
    icon: '🧑‍💼',
    title: 'HRIS',
    desc: 'Sistem manajemen SDM berbasis cloud — kelola karyawan, absensi, dan penggajian dalam satu platform.',
    badge: 'Tersedia',
    badgeClass: 'bg-blue-50 text-blue-600',
    cta: { label: 'Lihat Harga', href: '#harga' },
    color: 'from-blue-400 to-emerald-500',
    lightColor: 'bg-blue-50',
    accentColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    shadowColor: 'hover:shadow-blue-100',
    gradientBg: 'bg-gradient-to-br from-blue-400 to-emerald-500',
    images: [
      './public/images/HRIS-1.png',
      './public/images/HRIS-2.png',
      './public/images/HRIS-3.png',
    ],
    features: ['Manajemen Data Karyawan', 'Absensi & Jadwal Kerja', 'Penggajian Otomatis', 'Laporan & Analitik'],
    modalDesc: 'HRIS kami membantu perusahaan Anda mengelola seluruh siklus SDM — dari rekrutmen hingga pensiun — dalam satu dashboard yang intuitif dan mudah digunakan.',
  },
  {
    icon: '📄',
    title: 'Digital SKP',
    desc: 'Digitalisasi Sasaran Kinerja Pegawai — penilaian kinerja lebih cepat, akurat, dan transparan.',
    badge: 'Tersedia',
    badgeClass: 'bg-blue-50 text-blue-600',
    cta: { label: 'Hubungi Kami', href: 'https://wa.me/6285156585411', external: true },
    color: 'from-blue-400 to-indigo-600',
    lightColor: 'bg-indigo-50',
    accentColor: 'text-indigo-600',
    borderColor: 'border-indigo-200',
    shadowColor: 'hover:shadow-indigo-100',
    gradientBg: 'bg-gradient-to-br from-blue-400 to-indigo-600',
    images: [
      './public/images/DigitalSKP.png',
      './public/images/Manajemen.jpg',
      './public/images/Preview-ttd.jpg'
    ],
    features: ['Tanda Tangan Digital', 'Verifikasi Barcode', 'Manajemen Dokumen', 'Alur Persetujuan Otomatis'],
    modalDesc: 'Digital SKP mengubah proses penilaian kinerja yang rumit menjadi alur digital yang transparan, cepat, dan dapat diverifikasi kapan saja menggunakan barcode unik.',
  },
  {
    icon: '📚',
    title: 'OJS',
    desc: 'Platform Open Journal System siap pakai — publikasi jurnal ilmiah profesional dengan setup cepat.',
    badge: 'Segera Hadir',
    badgeClass: 'bg-purple-50 text-purple-500',
    cta: { label: 'Tanya via WhatsApp', href: 'https://wa.me/6285156585411', external: true },
    color: 'from-purple-400 to-violet-600',
    lightColor: 'bg-purple-50',
    accentColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    shadowColor: 'hover:shadow-purple-100',
    gradientBg: 'bg-gradient-to-br from-purple-400 to-violet-600',
    images: [
      'https://placehold.co/600x340/7c3aed/ffffff?text=OJS+Journal+Portal',
      'https://placehold.co/600x340/8b5cf6/ffffff?text=OJS+Peer+Review',
      'https://placehold.co/600x340/a855f7/ffffff?text=OJS+Publication',
    ],
    features: ['Manajemen Submission', 'Proses Peer Review', 'Publikasi Otomatis', 'DOI & Pengindeksan'],
    modalDesc: 'Platform OJS kami siap pakai tanpa konfigurasi rumit. Publikasikan jurnal ilmiah institusi Anda secara profesional dengan dukungan penuh dari tim kami.',
  },
]

// Auto Slideshow Hook
function useSlideshow(length, interval = 2800) {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % length)
        setTransitioning(false)
      }, 300)
    }, interval)
    return () => clearInterval(timer)
  }, [length, interval])

  const goTo = useCallback((idx) => {
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(idx)
      setTransitioning(false)
    }, 200)
  }, [])

  return { current, transitioning, goTo }
}

// Card Slideshow
function CardSlideshow({ images, title }) {
  const { current, transitioning, goTo } = useSlideshow(images.length, 2800)

  return (
    <div className="relative rounded-2xl overflow-hidden mb-5 h-36 bg-gray-100 group/slide">
      <img
        src={images[current]}
        alt={`${title} preview ${current + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
        style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? 'scale(1.04)' : 'scale(1)' }}
      />
      {/* Dot indicators */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i) }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '18px' : '6px',
              height: '6px',
              background: i === current ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
      {/* Slide label */}
      <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
        {current + 1}/{images.length}
      </div>
    </div>
  )
}

// Modal Slideshow
function ModalSlideshow({ images, title, accentColor, gradientBg }) {
  const { current, transitioning, goTo } = useSlideshow(images.length, 3200)

  return (
    <div className="relative h-52 overflow-hidden">
      <img
        src={images[current]}
        alt={`${title} screenshot ${current + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
        style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? 'scale(1.03)' : 'scale(1)' }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '22px' : '8px',
              height: '8px',
              background: i === current ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>
      {/* Prev/Next arrows */}
      <button
        onClick={() => goTo((current - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition text-sm"
      >‹</button>
      <button
        onClick={() => goTo((current + 1) % images.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition text-sm"
      >›</button>
      {/* Counter */}
      <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
        {current + 1} / {images.length}
      </div>
    </div>
  )
}

// Modal
function ServiceModal({ service, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.2s ease' }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
        style={{ animation: 'slideUp 0.3s ease' }}
      >
        {/* Slideshow header */}
        <div className="relative">
          <ModalSlideshow
            images={service.images}
            title={service.title}
            accentColor={service.accentColor}
            gradientBg={service.gradientBg}
          />
          {/* Info overlay at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-4 pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shadow">
                {service.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white drop-shadow">{service.title}</h2>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/20 text-white/90">
                  {service.badge}
                </span>
              </div>
            </div>
          </div>
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition text-sm font-bold"
          >✕</button>
        </div>

        {/* Desc */}
        <div className="px-6 pt-4 pb-2">
          <p className="text-sm text-gray-500 leading-relaxed">{service.modalDesc}</p>
        </div>

        {/* Features */}
        <div className="px-6 pb-4">
          <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">Fitur Utama</h3>
          <ul className="grid grid-cols-2 gap-2">
            {service.features.map((f, i) => (
              <li
                key={f}
                className="flex items-center gap-2 text-sm text-gray-600"
                style={{ animation: `fadeInLeft 0.3s ease ${i * 0.07}s both` }}
              >
                <span className={`w-5 h-5 rounded-full ${service.lightColor} ${service.accentColor} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className={`mx-6 mb-6 p-4 rounded-2xl ${service.lightColor} flex items-center justify-between`}>
          <span className={`text-sm font-semibold ${service.accentColor}`}>{service.badge}</span>
          <a
            href={service.cta.href}
            target={service.cta.external ? '_blank' : '_self'}
            rel={service.cta.external ? 'noopener noreferrer' : ''}
            className={`text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r ${service.color} text-white shadow hover:opacity-90 transition`}
          >
            {service.cta.label} →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(32px) scale(0.96) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes fadeInLeft { from { opacity:0; transform:translateX(-8px) } to { opacity:1; transform:translateX(0) } }
      `}</style>
    </div>
  )
}

// Service Card
function ServiceCard({ s, i, onClick }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`group bg-gray-50 hover:bg-white border border-transparent hover:${s.borderColor} rounded-2xl p-3 transition-all duration-300 hover:shadow-xl flex flex-col cursor-pointer`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
    >
      {/* Slideshow */}
      <CardSlideshow images={s.images} title={s.title} />

      {/* <div
        className="text-3xl mb-3 inline-block transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6"
      >
        {s.icon}
      </div> */}

      <div className="flex items-start justify-between mb-1"><h3 className="text-lg font-semibold text-gray-800">{s.title}</h3><span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${s.badgeClass} ml-2 flex-shrink-0`}>{s.badge}</span></div>

      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{s.desc}</p>

      <button
        className={`w-full mt-auto py-2.5 rounded-2xl text-sm font-semibold bg-gradient-to-r ${s.color} text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95`}
      >
        Lihat Detail →
      </button>
    </div>
  )
}

export default function Services() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <section id="layanan" className="py-24 px-6 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest text-blue-500 uppercase">Layanan Kami</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Apa yang kami tawarkan</h2>
            <p className="text-gray-400 mt-3 text-base">Solusi digital yang dirancang khusus untuk kebutuhan bisnis Anda</p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} i={i} onClick={() => setSelected(s)} />
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-300 mt-10">
            Klik kartu untuk melihat detail produk
          </p>
        </div>
      </section>

      {selected && (
        <ServiceModal service={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}