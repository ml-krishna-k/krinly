import { business } from "@/data/business";

/**
 * A live map of the office address, filtered to a monochrome dark treatment so
 * it reads as part of the blueprint aesthetic rather than a bright Google map
 * dropped into the page. Lazy-loaded, and paired with a real "get directions"
 * link for anyone who wants to navigate.
 */
export function MapEmbed({ className = "" }: { className?: string }) {
  const q = encodeURIComponent(business.location.mapQuery);
  const embedSrc = `https://maps.google.com/maps?q=${q}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/search/?api=1&query=${q}`;

  return (
    <div className={`relative overflow-hidden bg-ink-2 ${className}`}>
      <iframe
        title={`Map showing ${business.name} at ${business.location.full}`}
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="map-embed absolute inset-0 h-full w-full border-0"
      />
      {/* Corner label + directions link, on top of the map. */}
      <a
        href={directions}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 z-10 u-label bg-paper text-ink px-4 py-3 hover:bg-accent hover:text-on-ink transition-colors duration-[var(--duration-micro)]"
      >
        Get directions →
      </a>
    </div>
  );
}
