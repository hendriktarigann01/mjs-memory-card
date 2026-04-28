import { motion } from "framer-motion";
import Image from "next/image";
import { formatTimeMs } from "@/lib/utils";

interface WinModalProps {
  stage1TimeMs: number;
  stage2TimeMs: number;
  totalTimeMs: number;
  onLeaderboard: () => void;
  submitting?: boolean;
}

// Komponen Pembantu untuk menampilkan Label Waktu dan Kotak Waktu yang seragam
const TimeDisplay = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center gap-1.5 flex-1">
    <p className="font-sans text-xs text-[#0F5A7F] font-bold uppercase tracking-wide">
      {label}
    </p>
    <div className="w-full flex justify-center py-2.5 rounded-full bg-[#D1EAF8] border border-[#0F5A7F]">
      <span className="font-sans text-xl text-[#0F5A7F] font-bold tracking-tight">
        {value}
      </span>
    </div>
  </div>
);

export function WinModal({
  stage1TimeMs,
  stage2TimeMs,
  totalTimeMs,
  onLeaderboard,
  submitting = false,
}: WinModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative flex flex-col items-center justify-center w-full max-w-lg mt-24" // Tambahkan margin top untuk memberi ruang kelinci
      >
        {/* Gambar Kelinci - Diposisikan secara absolut di atas kartu */}
        <div className="absolute -top-2 right-5 -translate-y-[85%] z-20">
          <Image
            src="/common/rabbit.webp"
            alt="Rabbit Mascot"
            width={120} // Sesuaikan ukuran berdasarkan gambar aslinya
            height={120}
            priority
          />
        </div>

        {/* Kartu Utama */}
        <div className="relative bg-white border-[3px] border-[#0F5A7F] rounded-[32px] w-full flex flex-col items-center justify-center gap-6 px-10 pt-12 pb-10 z-10">
          {/* Judul Besar */}
          <h2 className="font-sans text-4xl text-[#0F5A7F] font-extrabold uppercase tracking-tight text-center leading-none">
            Congratulations!
          </h2>

          {/* Baris Waktu Panggung (Stage 1 & Stage 2) */}
          <div className="flex gap-4 justify-center w-full">
            <TimeDisplay label="TIME" value={formatTimeMs(stage1TimeMs)} />
            <TimeDisplay label="TIME" value={formatTimeMs(stage2TimeMs)} />
          </div>

          {/* Baris Waktu Total */}
          <div className="w-full">
            <TimeDisplay label="TIME" value={formatTimeMs(totalTimeMs)} />
          </div>

          {/* Tombol Leaderboard - Menggunakan Ikon Medali dan Teks yang sesuai desain */}
          <button
            onClick={onLeaderboard}
            disabled={submitting}
            className="flex items-center justify-center gap-3 w-full mt-2 py-3 rounded-full border-[3px] border-[#0F5A7F] bg-[#BBE2F7] font-sans text-base text-[#0F5A7F] font-extrabold uppercase tracking-widest hover:bg-[#A9D8F2] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {/* Ikon Medali dari image_0.png */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"></path>
              <path d="m15 11 1 10-4-2.5-4 2.5 1-10"></path>
            </svg>
            {submitting ? "Submitting…" : "View Leaderboard"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
