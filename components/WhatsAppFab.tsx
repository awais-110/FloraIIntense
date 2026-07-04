import { WhatsAppBrandIcon } from "@/components/BrandIcons";
import { whatsappUrl } from "@/lib/utils";

export default function WhatsAppFab() {
  return (
    <a className="whatsapp-fab" href={whatsappUrl("Hi Floral Intense! I want to order perfume.")} target="_blank" rel="noreferrer" aria-label="WhatsApp order">
      <WhatsAppBrandIcon size={42} />
    </a>
  );
}
