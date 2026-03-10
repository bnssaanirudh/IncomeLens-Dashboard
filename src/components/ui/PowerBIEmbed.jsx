import React from 'react';

const PowerBIEmbed = ({
    embedUrl,
    title,
    height = "600px"
}) => {
    return (
        <div className="glass-panel overflow-hidden w-full relative">
            <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl pointer-events-none z-10"></div>
            {embedUrl ? (
                <iframe
                    title={title}
                    width="100%"
                    height={height}
                    src={embedUrl}
                    allowFullScreen={true}
                    className="border-none w-full bg-black/40 mix-blend-screen"
                ></iframe>
            ) : (
                <div
                    className="w-full flex flex-col items-center justify-center bg-black/20 text-text-secondary"
                    style={{ height }}
                >
                    <div className="w-16 h-16 border-4 border-dashed border-primary/50 rounded-full animate-[spin_4s_linear_infinite] mb-4"></div>
                    <p className="font-medium tracking-wide">Connecting to Power BI Service...</p>
                </div>
            )}
        </div>
    );
};

export default PowerBIEmbed;
