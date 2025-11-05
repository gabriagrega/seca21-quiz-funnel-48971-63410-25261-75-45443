import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConsentModal from "@/components/ConsentModal";
import { useNavigate } from "react-router-dom";

const ConsentWidget = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  const [acceptedAt, setAcceptedAt] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const c = localStorage.getItem('seca21_consent');
      if (!c) {
        setConsentGiven(null);
        setAcceptedAt(null);
        return;
      }
      const parsed = JSON.parse(c);
      if (parsed && parsed.acceptedAt) {
        setConsentGiven(true);
        setAcceptedAt(parsed.acceptedAt);
      } else if (parsed && parsed.given === false) {
        setConsentGiven(false);
        setAcceptedAt(parsed.decidedAt || null);
      } else {
        setConsentGiven(null);
        setAcceptedAt(null);
      }
    } catch (e) {
      setConsentGiven(null);
      setAcceptedAt(null);
    }
  }, []);

  const handleRevoke = async () => {
    const decidedAt = new Date().toISOString();
    try { localStorage.setItem('seca21_consent', JSON.stringify({ given: false, decidedAt })); } catch (e) { /* ignore */ }
    setConsentGiven(false);
    setAcceptedAt(null);
    // Consent revocation recorded locally; no external call — quiz data will be sent only on Kiwify CTA
    // If you want to track revocations server-side, add a fetch here pointing to your webhook.
  };

  return (
    <>
      <div className="fixed left-4 bottom-4 z-50 flex items-end pointer-events-auto">
        {/* compact tab that is always visible */}
        {!open && (
          <button
            className="flex items-center gap-2 bg-card/95 backdrop-blur-md px-3 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
            onClick={() => setOpen(true)}
            aria-label="Abrir gerenciador de consentimento"
          >
            <span className="text-sm font-medium">Privacidade</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        )}

        {/* slide-up panel when open */}
        {open && (
          <div className="w-80 bg-card/95 backdrop-blur-md rounded-t-lg shadow-lg overflow-hidden transform transition-all duration-300">
            <div className="p-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-semibold">Gerenciar consentimento</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {consentGiven === true && acceptedAt ? `Aceito em ${new Date(acceptedAt).toLocaleString()}` : consentGiven === false ? 'Você recusou o consentimento' : 'Ainda não decidiu sobre o consentimento'}
                  </p>
                </div>
                <div className="ml-2">
                  <button aria-label="fechar" onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-slate-100">
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowModal(true)}>Gerenciar</Button>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/privacidade')}>Política</Button>
                  {consentGiven && <Button variant="destructive" size="sm" onClick={handleRevoke}>Revogar</Button>}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Você pode aceitar, recusar ou revogar o uso dos seus dados para comunicações e promoções.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConsentModal open={showModal} onAccept={() => {
        const at = new Date().toISOString();
        try { localStorage.setItem('seca21_consent', JSON.stringify({ acceptedAt: at, version: 'v1', given: true })); } catch (e) {}
        setConsentGiven(true);
        setAcceptedAt(at);
        setShowModal(false);
      }} onDecline={async () => {
        const decidedAt = new Date().toISOString();
        try { localStorage.setItem('seca21_consent', JSON.stringify({ given: false, decidedAt })); } catch (e) {}
        setConsentGiven(false);
        setAcceptedAt(null);
        setShowModal(false);
        // Consent refusal recorded locally; no external call — quiz data will be sent only on Kiwify CTA
        // If you want to track refusals server-side, add a fetch here pointing to your webhook.
      }} consentGiven={consentGiven ?? false} acceptedAt={acceptedAt} onRevoke={async () => {
        const decidedAt = new Date().toISOString();
        try { localStorage.setItem('seca21_consent', JSON.stringify({ given: false, decidedAt })); } catch (e) {}
        setConsentGiven(false);
        setAcceptedAt(null);
        setShowModal(false);
        // Consent revocation recorded locally; no external call — quiz data will be sent only on Kiwify CTA
        // If you want to track revocations server-side, add a fetch here pointing to your webhook.
      }} />
    </>
  );
};

export default ConsentWidget;
