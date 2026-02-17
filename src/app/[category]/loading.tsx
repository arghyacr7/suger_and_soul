export default function Loading() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-brown/20 border-t-yellow rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">🍰</span>
                </div>
            </div>
            <h2 className="mt-4 text-xl font-heading font-bold text-brown animate-pulse">
                Baking your request...
            </h2>
        </div>
    )
}
