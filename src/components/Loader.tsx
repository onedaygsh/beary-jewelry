export default function Loader() {
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#F9F7F2]/80 backdrop-blur-sm">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#C04035] rounded-full animate-spin mb-4"></div>

            {/* Text */}
            <div className="flex flex-col items-center gap-2">
                <span className="font-serif text-[#2B2B2B] tracking-[0.3em] text-lg">加载中</span>
                <span className="font-sans text-[#D4AF37] text-xs uppercase tracking-widest">Loading Atelier</span>
            </div>
        </div>
    )
}
