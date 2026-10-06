import Link from "next/link";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import PageHeading from "@/components/page-heading";
import { RESTAURANT } from "@/data/config";

export default function ContactPage() {
  return (
    <>
      <PageHeading eyebrow="BROTHERS FOOD / CONTACT" title="COME SAY HI">
        <p className="mt-6 max-w-xl text-black/75 text-lg">Replace the demo contact details below with your real restaurant information before launch.</p>
      </PageHeading>

      <section className="bg-black py-20 md:py-28">
        <div className="mx-auto max-w-shell px-5 md:px-10 grid gap-4 md:grid-cols-2">
          {[
            { icon: Phone, label: "PHONE", value: RESTAURANT.phone },
            { icon: MapPin, label: "ADDRESS", value: RESTAURANT.address },
            { icon: Clock, label: "OPENING HOURS", value: RESTAURANT.hours },
            { icon: MessageCircle, label: "WHATSAPP", value: `+${RESTAURANT.whatsappNumber}` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-navy border border-white/10 p-7 md:p-9">
              <Icon className="text-orange" size={26} />
              <p className="mt-8 font-display text-orange text-xs tracking-[0.25em]">{label}</p>
              <p className="mt-2 text-white text-xl md:text-2xl">{value}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-shell px-5 md:px-10 mt-8">
          <Link href="/menu" className="inline-flex bg-orange text-black font-display px-8 py-4 hover:bg-white transition-colors">ORDER NOW →</Link>
        </div>
      </section>
    </>
  );
}
